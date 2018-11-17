import { omit } from "ramda"
import { Lock } from "semaphore-async-await"
import { logger } from "./logger"

interface Job {
  name: string
  interval: number // in milliseconds
  timer: NodeJS.Timer
  lastAt?: Date
  diff?: number
  count: number
}

const jobs: Job[] = []

export class Scheduler {
  static start = () => {
    addJob("dummyJob", 1000, async () => {
      const wait = (ms: number) => new Promise(r => setTimeout(r, ms))
      await wait(2000)
    })
  }

  static stop = () => jobs.forEach(j => clearInterval(j.timer))

  static getJobsInfo = () => jobs.map(j => omit(["timer"], j))
}

const addJob = (name: string, interval: number, func: () => void) => {
  const lock = new Lock()
  const timer = setInterval(async () => {
    const job = await jobs.find(j => j.name === name)
    if (!job) throw new Error("Unknown job: " + name)
    await lock.acquire()
    try {
      await func()
    } catch (err) {
      logger.error(`Scheduler.${name} error: ${err.message}`)
      logger.error(err)
    } finally {
      lock.release()
      if (job.lastAt) {
        job.diff = new Date().getTime() - job.lastAt.getTime()
      }
      job.lastAt = new Date()
      job.count++
    }
  }, interval)
  jobs.push({ name, interval, timer, count: 0 })
}
