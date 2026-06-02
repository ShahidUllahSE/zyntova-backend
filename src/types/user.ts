import type { UserRole } from './index.js'

export type UserPublic = {
  id: string
  firstName: string
  lastName: string
  email: string
  contactNumber: string
  location: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type AuthPayload = {
  sub: string
  email: string
  role: UserRole
}

export type AuthResponse = {
  user: UserPublic
  token: string
}
