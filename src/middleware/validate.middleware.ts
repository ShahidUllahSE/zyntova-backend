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
    // Express 5: req.query is read-only — store parsed query separately.
    if (part === 'query') {
      req.validatedQuery = result.data
    } else {
      req[part] = result.data
    }
    next()
  }
}
