import fs from "fs"
import path from "path"

export const APP_PORT = parseInt(process.env.APP_PORT as string, 10)
export const DATABASE_URL = process.env.DATABASE_URL as string
export const DATA_DIR = (process.env.DATA_DIR as string) || "/data"
export const LOGS_DIR = path.join(DATA_DIR, "logs")
export const LOG_FILE = path.join(LOGS_DIR, "app.log")
export const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN as string
export const TELEGRAM_CHAT_IDS = (process.env.TELEGRAM_CHAT_IDS as string).split(",").map(a => parseInt(a.trim(), 10))
export const IS_PRODUCTION = process.env.NODE_ENV === "production"

export const initDirs = (dataDir: string, logsDir: string) => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true })
  }
}
