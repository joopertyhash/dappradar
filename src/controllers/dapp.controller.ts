import { Context } from "koa"
import { DappService } from "../services/dapp.service"

export class DappController {
  // Pages

  // Actions
  static fetchDapps = async (ctx: Context) => (ctx.body = await DappService.fetchDapps())
}
