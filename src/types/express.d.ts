import type { AuthPayload } from './user.js'

declare global {
  namespace Express {
    interface Request {
      auth?: AuthPayload
    }
  }
}

export {}
