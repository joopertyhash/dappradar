import { uniq } from "ramda"

export const stringToArray = (
  str?: string,
  options: { toLowerCase?: boolean; removeComments?: boolean; unique?: boolean; firstWordOnly?: boolean } = {
    toLowerCase: false,
    removeComments: false,
    unique: false,
    firstWordOnly: false
  }
) => {
  if (!str) return []
  let arr = str
    .split(options.removeComments ? /\n/ : /\s+/)
    .map(x => x.trim())
    .filter(x => x)
  if (options.toLowerCase) arr = arr.map(x => x.toLowerCase())
  if (options.removeComments) arr = arr.map(x => x.split("#")[0].trim()).filter(x => x)
  if (options.firstWordOnly) arr = arr.map(x => x.split(/\s+/)[0].trim()).filter(x => x)
  return options.unique ? uniq(arr) : arr
}
