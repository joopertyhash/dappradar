import TelegramBot from "node-telegram-bot-api"

let bot: TelegramBot
let ids: number[]

export class TelegramService {
  static initBot = (token: string, chatIds: number[]) => {
    bot = new TelegramBot(token)
    ids = chatIds
  }

  static sendMessage = async (message: string) => {
    for (const chatId of ids) {
      await bot.sendMessage(chatId, message)
    }
  }
}
