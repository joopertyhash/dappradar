import Koa from "koa"
import body from "koa-body"
import Pug from "koa-pug"
import serve from "koa-static"
import path from "path"
import { IS_PRODUCTION } from "./config"
import * as helpers from "./helpers"
import { logger } from "./logger"
import { router } from "./router"

export const app = new Koa()

// @ts-ignore
const pug = new Pug({
  app,
  viewPath: path.join(__dirname, "../templates"),
  helperPath: [helpers],
  noCache: !IS_PRODUCTION
})

app.on("error", err => {
  if (err.message !== "Unauthorized") {
    logger.error("koa error handler: %s", err.message)
    logger.error(err.stack)
  }
})

app.use(body())

app.use(serve(path.join(__dirname, "../public")))
app.use(router.routes())
