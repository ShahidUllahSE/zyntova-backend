import type { UserDocument } from '../models/User.model.js'
import type { UserPublic } from '../types/user.js'

export function toUserPublic(user: UserDocument): UserPublic {
  return {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    contactNumber: user.contactNumber ?? '',
    location: user.location ?? '',
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }
}
