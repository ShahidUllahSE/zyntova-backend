import type { AuthPayload } from './user.js'

declare global {
  namespace Express {
    interface Request {
      auth?: AuthPayload
      /** Set by validate() when part is "query" (Express 5 req.query is read-only). */
      validatedQuery?: unknown
    }
  }
}

export {}
