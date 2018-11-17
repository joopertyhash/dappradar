process.env.NTBA_FIX_319 = "1" // https://github.com/yagop/node-telegram-bot-api/issues/319

import "dotenv/config"
import mongoose from "mongoose"
import { Server } from "net"
import {
  APP_PORT,
  DATA_DIR,
  DATABASE_URL,
  initDirs,
  IS_PRODUCTION,
  LOG_FILE,
  LOGS_DIR,
  TELEGRAM_CHAT_IDS,
  TELEGRAM_TOKEN
} from "./config"
import { initDatabase } from "./database"
import { app } from "./koa"
import { initLogger, logger } from "./logger"
import { Scheduler } from "./scheduler"
import { SystemService } from "./services/system.service"
import { TelegramService } from "./services/telegram.service"

let server: Server

const main = async () => {
  SystemService.exitIfRequiredEnvIsMissing([
    "APP_PORT",
    "DATA_DIR",
    "DATABASE_URL",
    "TELEGRAM_TOKEN",
    "TELEGRAM_CHAT_IDS"
  ])
  initDirs(DATA_DIR, LOGS_DIR)
  initLogger(IS_PRODUCTION, LOG_FILE)
  await initDatabase(DATABASE_URL)
  TelegramService.initBot(TELEGRAM_TOKEN, TELEGRAM_CHAT_IDS)
  server = app.listen(APP_PORT, () => logger.info(`App is started on ${APP_PORT}`))
  Scheduler.start()
}

main().catch(err => logger.error(err))

const exit = async () => {
  Scheduler.stop()
  server.close()
  await mongoose.connection.close()
  logger.info("App is finished")
  process.exit()
}

process.on("SIGTERM", exit)
process.on("SIGHUP", exit)
process.on("SIGINT", exit)
