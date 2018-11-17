import { Context } from "koa"
import { TelegramService } from "../services/telegram.service"

export class TelegramController {
  // Actions
  static testTelegram = async (ctx: Context) =>
    (ctx.body = await TelegramService.sendMessage("dappradar-monitor: test message"))
}
