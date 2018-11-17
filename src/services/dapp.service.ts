import request from "request-promise-native"
import { Dapp } from "../models/dapp.model"
import { DappItem } from "../types"

export class DappService {
  static fetchDapps = async () => {
    const result: DappItem[] = []
    let count = 0
    while (true) {
      try {
        const res = await request.get("https://dappradar.com/api/eos/dapps/list/" + count, {
          json: true,
          timeout: 10000
        })
        if (res.data && res.data.list) {
          const dapps: DappItem[] = res.data.list.map((x: any) => ({
            dappId: x.id,
            title: x.title,
            category: x.category,
            url: x.url
          }))
          result.push(...dapps)
          console.log("dapps", dapps.length)
        } else {
          break
        }
      } catch (err) {
        break
      }
      if (++count > 30) break
    }
    await upsertDapps(result)
    return result
  }

  static getDapps = async () => Dapp.find().sort({ createdAt: -1 })

  static getDapp = async (id: string) => Dapp.findById(id)

  static setAnalyzed = async (id: string) => Dapp.findByIdAndUpdate(id, { $set: { analyzed: true } })

  static unsetAnalyzed = async (id: string) => Dapp.findByIdAndUpdate(id, { $set: { analyzed: false } })

  static setAllAnalyzed = async () => Dapp.updateMany({}, { $set: { analyzed: true } })

  static updateNotes = async (id: string, notes: string) => Dapp.findByIdAndUpdate(id, { $set: { notes } })
}

const upsertDapps = async (dapps: DappItem[]) => {
  for (const d of dapps) {
    console.log({ d })
    const dapp = await Dapp.findOne({ dappId: d.dappId })
    if (dapp) {
      dapp.title = d.title
      dapp.category = d.category
      dapp.url = d.url
    } else {
      await Dapp.create(d)
    }
  }
}
