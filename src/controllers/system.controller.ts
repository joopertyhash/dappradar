import { Context } from "koa"
import { LOG_FILE } from "../config"
import { Scheduler } from "../scheduler"
import { SystemService } from "../services/system.service"

export class SystemController {
  // Pages
  static welcomePage = async (ctx: Context) => ctx.render("welcome")

  static systemActionsPage = async (ctx: Context) => ctx.render("system-actions")

  static systemMessagesPage = async (ctx: Context) =>
    ctx.render("system-messages", {
      systemMessages: await SystemService.getSystemMessages(ctx.query),
      stats: await SystemService.getSystemMessagesStats(),
      filter: ctx.query
    })

  // Actions
  static log = async (ctx: Context) => (ctx.body = await SystemService.readLog(LOG_FILE))

  static cleanLog = async (ctx: Context) => (ctx.body = await SystemService.cleanLog(LOG_FILE))

  static viewSystemMessage = async (ctx: Context) => (ctx.body = await SystemService.getSystemMessage(ctx.params.id))

  static deleteSystemMessageByType = async (ctx: Context) => {
    await SystemService.deleteSystemMessagesByType(ctx.params.type)
    ctx.redirect("/system-messages")
  }

  static scheduler = async (ctx: Context) => (ctx.body = Scheduler.getJobsInfo())

  static dbStats = async (ctx: Context) => (ctx.body = await SystemService.getDbStats())
}
