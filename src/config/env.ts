import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

function normalizeBasePath(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return '/api'
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withLeading.replace(/\/+$/, '') || '/api'
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
  APP_URL: z.string().url().optional(),
  API_BASE_PATH: z.string().default('/api').transform(normalizeBasePath),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  CLIENT_ORIGIN: z.string().url().default('http://localhost:5173'),
  JWT_SECRET: z.string().min(1).optional(),
  JWT_EXPIRES_IN: z.string().default('7d'),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().min(6).optional(),
  ADMIN_FIRST_NAME: z.string().default('Admin'),
  ADMIN_LAST_NAME: z.string().default('User'),
  PASSWORD_RESET_EXPIRES_MINUTES: z.coerce.number().int().positive().default(60),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_SECURE: z
    .string()
    .optional()
    .transform((v) => v === 'true' || v === '1'),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().email().optional(),
  SMTP_FROM_NAME: z.string().default('Zyntova AI'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors)
  process.exit(1)
}

const base = parsed.data

if (!base.JWT_SECRET && base.NODE_ENV === 'production') {
  console.error('JWT_SECRET is required when NODE_ENV=production')
  process.exit(1)
}

export const env = {
  ...base,
  JWT_SECRET: base.JWT_SECRET ?? 'zyntova-dev-jwt-secret-change-in-production',
  APP_URL: base.APP_URL ?? `http://localhost:${base.PORT}`,
  get apiBaseUrl(): string {
    return `${this.APP_URL}${this.API_BASE_PATH}`
  },
}
