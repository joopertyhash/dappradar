import { Document, model, Schema } from "mongoose"

import { logger } from "../logger"

export interface DappModel extends Document {
  id: string
  createdAt: Date
  dappId: number
  title: string
  category: string
  url: string
  notes: string
  analyzed: boolean
}

const schema = new Schema(
  {
    createdAt: { type: Date, required: true, default: Date.now },
    dappId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    url: { type: String, required: true },
    notes: { type: String, default: "" },
    analyzed: { type: Boolean, required: true, default: false }
  },
  { collection: "dapps" }
)

schema.index({ createdAt: -1 })

export const Dapp = model<DappModel>("Dapp", schema)

Dapp.on("index", err => {
  if (err) {
    logger.error("Dapp.index error: %s", err.message)
    logger.error(err.stack)
  }
})
