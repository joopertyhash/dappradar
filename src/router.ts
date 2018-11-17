import Router from "koa-router"
import { DappController } from "./controllers/dapp.controller"
import { SystemController } from "./controllers/system.controller"

export const router = new Router()

router
  .get("/", SystemController.welcomePage)
  .get("/system-actions", SystemController.systemActionsPage)
  .get("/system-messages", SystemController.systemMessagesPage)
  .get("/log", SystemController.log)
  .get("/clean-log", SystemController.cleanLog)
  .get("/view-system-message/:id", SystemController.viewSystemMessage)
  .get("/delete-system-message-by-type/:type", SystemController.deleteSystemMessageByType)
  .get("/scheduler", SystemController.scheduler)
  .get("/db-stats", SystemController.dbStats)

  .get("/fetch-dapps", DappController.fetchDapps)
