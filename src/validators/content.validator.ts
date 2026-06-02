import { z } from 'zod'
import { CONSULTATION_STATUSES } from '../constants/consultationStatus.js'

const imageSchema = z.object({
  src: z.string().min(1).max(2000),
  alt: z.string().min(1).max(300),
})

export const teamMemberBodySchema = z.object({
  id: z.string().min(1).max(80).optional(),
  name: z.string().min(1).max(120),
  role: z.string().min(1).max(160),
  bio: z.string().min(1).max(2000),
  initials: z.string().max(8).optional().default(''),
  image: z.string().min(1).max(2000),
  imageAlt: z.string().max(200).optional().default(''),
})

export const serviceContentBodySchema = z.object({
  title: z.string().min(1).max(200),
  shortTitle: z.string().min(1).max(80),
  description: z.string().min(1).max(2000),
  detail: z.string().min(1).max(4000),
  overviewImage: imageSchema,
})

export const testimonialBodySchema = z.object({
  id: z.string().min(1).max(80).optional(),
  quote: z.string().min(1).max(3000),
  name: z.string().min(1).max(120),
  role: z.string().min(1).max(160),
  avatar: z.string().min(1).max(2000),
  featured: z.boolean().optional().default(false),
})

export const createConsultationSchema = z.object({
  ownerEmail: z.string().email(),
  firstName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional().default(''),
  businessType: z.string().max(100).optional().default(''),
  message: z.string().max(5000).optional().default(''),
})

export const updateConsultationSchema = z.object({
  status: z.enum(CONSULTATION_STATUSES).optional(),
  adminNote: z.string().max(5000).optional(),
  adminReply: z.string().max(5000).optional(),
})

export const replyConsultationSchema = z.object({
  message: z.string().min(1).max(5000),
})

export type TeamMemberBody = z.infer<typeof teamMemberBodySchema>
export type ServiceContentBody = z.infer<typeof serviceContentBodySchema>
export type TestimonialBody = z.infer<typeof testimonialBodySchema>
export type CreateConsultationInput = z.infer<typeof createConsultationSchema>
export type UpdateConsultationInput = z.infer<typeof updateConsultationSchema>
