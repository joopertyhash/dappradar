import { Context } from "koa"
import { DappService } from "../services/dapp.service"

export class DappController {
  // Pages
  static dappsPage = async (ctx: Context) => ctx.render("dapps", { dapps: await DappService.getDapps() })

  static notesPage = async (ctx: Context) => ctx.render("notes", { dapp: await DappService.getDapp(ctx.params.id) })

  // Actions
  static fetchDapps = async (ctx: Context) => (ctx.body = await DappService.fetchDapps())

  static viewDapp = async (ctx: Context) => (ctx.body = await DappService.getDapp(ctx.params.id))

  static setAnalyzed = async (ctx: Context) => (ctx.body = await DappService.setAnalyzed(ctx.params.id))

  static unsetAnalyzed = async (ctx: Context) => (ctx.body = await DappService.unsetAnalyzed(ctx.params.id))

  static setAllAnalyzed = async (ctx: Context) => (ctx.body = await DappService.setAllAnalyzed())

  static updateNotes = async (ctx: Context) =>
    (ctx.body = await DappService.updateNotes(ctx.params.id, ctx.request.body.notes))
}
