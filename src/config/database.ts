import mongoose from 'mongoose'
import { env } from './env.js'
import { seedAdminIfConfigured } from './seedAdmin.js'
import { seedContentIfEmpty } from './contentSeed.js'
import { logger } from '../utils/logger.js'

export async function connectDatabase(): Promise<void> {
  mongoose.set('strictQuery', true)

  await mongoose.connect(env.MONGODB_URI)
  logger.info('MongoDB connected', { uri: env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@') })
  await seedAdminIfConfigured()
  await seedContentIfEmpty()
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect()
  logger.info('MongoDB disconnected')
}
