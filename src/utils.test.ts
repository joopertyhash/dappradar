import { stringToArray } from "./utils"

describe("utils", () => {
  test("stringToArray", () => {
    expect(stringToArray(" v1    V2 v3  ")).toEqual(["v1", "V2", "v3"])
    expect(stringToArray(" v1    V2 v3 v2 ", { toLowerCase: true, unique: true })).toEqual(["v1", "v2", "v3"])
    expect(stringToArray(" v1    V2 v3  ", { toLowerCase: true })).toEqual(["v1", "v2", "v3"])
    expect(stringToArray("v1\n\n\n\nv2\nv3 ")).toEqual(["v1", "v2", "v3"])
    expect(
      stringToArray(
        `
    v1 # first comment
    v2 # second comment # bla
    v3
    # third comment`,
        { removeComments: true }
      )
    ).toEqual(["v1", "v2", "v3"])
    expect(
      stringToArray(
        `
    v1 first comment
    v2 second comment # bla
    v3
    # third comment`,
        { firstWordOnly: true, removeComments: true }
      )
    ).toEqual(["v1", "v2", "v3"])
  })
})
