import { createLogger, format, transports } from "winston"

const { combine, timestamp, splat, printf } = format

const myFormat = printf(info => {
  return `${info.timestamp} [${info.level}]: ${info.message}`
})

export const logger = createLogger({
  level: "debug",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), splat(), myFormat),
  exitOnError: false
})

process.on("uncaughtException", err => {
  logger.error("uncaught exception: %s", err.message)
  logger.error(err.stack!)
})
process.on("unhandledRejection", (reason, p) => logger.error("unhandled rejection: %s, %s", reason, p))

export const initLogger = (isProduction: boolean, logFile: string) => {
  logger.add(new transports.Console({ level: isProduction ? "info" : "debug" }))
  logger.add(
    new transports.File({
      filename: logFile,
      level: "info",
      maxsize: 10 * 1024 * 1024,
      maxFiles: 3
    })
  )
}
