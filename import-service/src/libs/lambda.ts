import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"

export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser())
}

export const middyfyS3 = (handler) => {
  return middy(handler)
}
