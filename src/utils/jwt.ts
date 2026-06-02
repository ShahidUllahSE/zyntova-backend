import jwt, { type SignOptions } from 'jsonwebtoken'
import { env } from '../config/env.js'
import type { AuthPayload } from '../types/user.js'

export function signToken(payload: AuthPayload): string {
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] }
  return jwt.sign(payload, env.JWT_SECRET, options)
}

export function verifyToken(token: string): AuthPayload {
  const decoded = jwt.verify(token, env.JWT_SECRET)
  if (typeof decoded !== 'object' || decoded === null || !('sub' in decoded)) {
    throw new Error('Invalid token payload')
  }
  return decoded as AuthPayload
}
