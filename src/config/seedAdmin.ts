import { env } from './env.js'
import { User } from '../models/User.model.js'
import { hashPassword } from '../utils/password.js'
import { logger } from '../utils/logger.js'

export async function seedAdminIfConfigured(): Promise<void> {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) return

  const email = env.ADMIN_EMAIL.toLowerCase()
  const existing = await User.findOne({ email })
  if (existing) return

  const passwordHash = await hashPassword(env.ADMIN_PASSWORD)
  await User.create({
    firstName: env.ADMIN_FIRST_NAME,
    lastName: env.ADMIN_LAST_NAME,
    email,
    passwordHash,
    role: 'admin',
  })
  logger.info(`Seeded admin user: ${email}`)
}
