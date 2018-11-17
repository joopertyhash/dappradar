import { format } from "date-fns"

export const json = (data: any) => JSON.stringify(data, null, 2)

export const timestamp = (time?: Date) => (time ? format(time, "YYYY-MM-DD HH:mm:ss") : "")
