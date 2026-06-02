import type { RequestHandler } from 'express'
import type { ZodSchema } from 'zod'

type RequestPart = 'body' | 'query' | 'params'

export function validate(schema: ZodSchema, part: RequestPart = 'body'): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req[part])
    if (!result.success) {
      next(result.error)
      return
    }
    req[part] = result.data
    next()
  }
}
