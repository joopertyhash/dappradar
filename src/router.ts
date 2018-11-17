import Router from "koa-router"
import { DappController } from "./controllers/dapp.controller"
import { SystemController } from "./controllers/system.controller"
import { TelegramController } from "./controllers/telegram.controller"

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

  .get("/dapps", DappController.dappsPage)
  .get("/notes/:id", DappController.notesPage)
  .get("/fetch-dapps", DappController.fetchDapps)
  .get("/view-dapp/:id", DappController.viewDapp)
  .get("/set-analyzed/:id", DappController.setAnalyzed)
  .get("/unset-analyzed/:id", DappController.unsetAnalyzed)
  .get("/set-all-analyzed", DappController.setAllAnalyzed)
  .post("/update-notes/:id", DappController.updateNotes)

  .get("/test-telegram", TelegramController.testTelegram)
