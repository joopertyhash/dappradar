import dateFns from "date-fns"
import fs from "fs"
import mongoose from "mongoose"
import util from "util"
import { logger } from "../logger"
import { SystemMessage, SystemMessageType } from "../models/system-message.model"

export class SystemService {
  static exitIfRequiredEnvIsMissing = (vars: string[]) => {
    for (const env of vars) {
      if (!process.env[env]) {
        console.error("Required env var is missing: " + env)
        process.exit(1)
      }
    }
  }

  static readLog = async (logFile: string) => util.promisify(fs.readFile)(logFile, "utf8")

  static cleanLog = async (logFile: string) => {
    await util.promisify(fs.writeFile)(logFile, "")
    logger.info("log file was cleaned")
    return true
  }

  static createSystemMessage = async (type: SystemMessageType, data?: object) => SystemMessage.create({ type, data })

  static getSystemMessages = async (req: { type?: string; createdAt?: string; limit?: string }) => {
    const query: any = {}
    if (req.type) query.type = req.type
    if (req.createdAt)
      query.createdAt = {
        $gte: dateFns.subMinutes(req.createdAt, 1),
        $lte: dateFns.addMinutes(req.createdAt, 1)
      }
    return SystemMessage.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(req.limit || "100", 10))
  }

  static getSystemMessagesStats = async () => {
    const result = []
    for (const type of Object.values(SystemMessageType)) {
      const count = await SystemMessage.find({ type }).countDocuments()
      if (count === 0) continue
      result.push({ type, count })
    }
    return result
  }

  static getSystemMessage = async (id: number) => SystemMessage.findById(id)

  static deleteSystemMessagesByType = async (type: string) => SystemMessage.deleteMany({ type })

  static getDbStats = async () => {
    const result: any = {}
    const collections = (await mongoose.connection.db.listCollections().toArray()).map(x => x.name)
    const count: { [key: string]: number } = {}
    for (const coll of collections) {
      count[coll] = await mongoose.connection.db.collection(coll).countDocuments()
    }
    result.count = count
    return result
  }
}
