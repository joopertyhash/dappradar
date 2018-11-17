import { Document, model, Schema } from "mongoose"

import { logger } from "../logger"

export enum SystemMessageType {
  UNKNOWN = "UNKNOWN"
}

export interface SystemMessageModel extends Document {
  id: string
  createdAt: Date
  type: SystemMessageType
  data?: object
}

const schema = new Schema(
  {
    createdAt: { type: Date, required: true, default: Date.now },
    type: { type: String, required: true, enum: Object.values(SystemMessageType) },
    data: { type: Object }
  },
  { collection: "systemMessages" }
)

schema.index({ createdAt: -1 })
schema.index({ type: 1 })

export const SystemMessage = model<SystemMessageModel>("SystemMessage", schema)

SystemMessage.on("index", err => {
  if (err) {
    logger.error("SystemMessage.index error: %s", err.message)
    logger.error(err.stack)
  }
})
