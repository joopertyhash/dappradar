import mongoose from "mongoose"
import { SystemMessage } from "./models/system-message.model"

// https://github.com/Automattic/mongoose/issues/6890
mongoose.set("useFindAndModify", false)
mongoose.set("useCreateIndex", true)

const models: Array<mongoose.Model<mongoose.Document>> = [SystemMessage]

export const initDatabase = async (url: string) => {
  await mongoose.connect(
    url,
    { useNewUrlParser: true }
  )
  for (const model of models) {
    await model.createIndexes()
  }
}
