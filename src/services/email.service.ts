import nodemailer from 'nodemailer'
import { env } from '../config/env.js'
import { logger } from '../utils/logger.js'

type SendPasswordResetEmailInput = {
  to: string
  firstName: string
  resetUrl: string
}

function smtpConfigured(): boolean {
  return Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS)
}

function createTransport() {
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  })
}

export async function sendPasswordResetEmail(input: SendPasswordResetEmailInput): Promise<void> {
  const subject = 'Reset your Zyntova AI password'
  const text = [
    `Hi ${input.firstName},`,
    '',
    'We received a request to reset your password.',
    'Open the link below to choose a new password. This link expires in 1 hour.',
    '',
    input.resetUrl,
    '',
    'If you did not request this, you can ignore this email.',
    '',
    '— Zyntova AI',
  ].join('\n')

  const html = `
    <p>Hi ${input.firstName},</p>
    <p>We received a request to reset your password.</p>
    <p><a href="${input.resetUrl}">Reset your password</a></p>
    <p>This link expires in 1 hour. If you did not request this, you can ignore this email.</p>
    <p>— Zyntova AI</p>
  `

  if (!smtpConfigured()) {
    logger.info('Password reset email (SMTP not configured — link logged for development)', {
      to: input.to,
      resetUrl: input.resetUrl,
    })
    return
  }

  const transport = createTransport()
  await transport.sendMail({
    from: `"${env.SMTP_FROM_NAME}" <${env.SMTP_FROM}>`,
    to: input.to,
    subject,
    text,
    html,
  })
}
