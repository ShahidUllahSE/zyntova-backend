import type { RequestHandler } from 'express'
import { ApiError } from '../utils/ApiError.js'
import { verifyToken } from '../utils/jwt.js'
import type { UserRole } from '../types/index.js'

function extractBearerToken(authorization: string | undefined): string | null {
  if (!authorization?.startsWith('Bearer ')) return null
  const token = authorization.slice(7).trim()
  return token.length > 0 ? token : null
}

export const requireAuth: RequestHandler = (req, _res, next) => {
  const token = extractBearerToken(req.headers.authorization)
  if (!token) {
    next(new ApiError(401, 'Authentication required'))
    return
  }

  try {
    req.auth = verifyToken(token)
    next()
  } catch {
    next(new ApiError(401, 'Invalid or expired token'))
  }
}

export function requireRole(...roles: UserRole[]): RequestHandler {
  return (req, _res, next) => {
    if (!req.auth) {
      next(new ApiError(401, 'Authentication required'))
      return
    }
    if (!roles.includes(req.auth.role)) {
      next(new ApiError(403, 'Insufficient permissions'))
      return
    }
    next()
  }
}

export const requireAdmin = requireRole('admin')
