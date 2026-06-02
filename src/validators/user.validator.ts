import { z } from 'zod'

export const registerSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  contactNumber: z.string().min(1).max(30),
  location: z.string().min(1).max(200),
  password: z.string().min(6).max(128),
})

export const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(1).max(128),
})

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  email: z.string().email().max(255).optional(),
  contactNumber: z.string().min(1).max(30).optional(),
  location: z.string().min(1).max(200).optional(),
  password: z.string().min(6).max(128).optional(),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(128),
  newPassword: z.string().min(6).max(128),
})

export const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  role: z.enum(['admin', 'user']).optional(),
  search: z.string().max(100).optional(),
})

export const updateUserByIdSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  email: z.string().email().max(255).optional(),
  contactNumber: z.string().min(1).max(30).optional(),
  location: z.string().min(1).max(200).optional(),
  role: z.enum(['admin', 'user']).optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(6).max(128).optional(),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>
export type UpdateUserByIdInput = z.infer<typeof updateUserByIdSchema>
