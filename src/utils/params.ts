import type { Request } from 'express'
import { ApiError } from './ApiError.js'

export function getParamId(req: Request, key = 'id'): string {
  const value = req.params[key]
  const id = Array.isArray(value) ? value[0] : value
  if (!id?.trim()) {
    throw new ApiError(400, `Missing route parameter: ${key}`)
  }
  return id.trim()
}
