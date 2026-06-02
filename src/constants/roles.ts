import type { UserRole } from '../types/index.js'

export const USER_ROLES: UserRole[] = ['admin', 'user']

export const CONSULTATION_STATUSES = ['new', 'in_review', 'responded', 'closed'] as const
