import { Consultation } from '../models/index.js'
import { ApiError } from '../utils/ApiError.js'
import { toConsultationDto } from '../utils/contentMappers.js'
import type {
  CreateConsultationInput,
  UpdateConsultationInput,
} from '../validators/content.validator.js'

export async function createConsultation(input: CreateConsultationInput, userId?: string) {
  const ownerEmail = input.ownerEmail.trim().toLowerCase()
  const doc = await Consultation.create({
    ownerEmail,
    firstName: input.firstName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim() ?? '',
    businessType: input.businessType?.trim() ?? '',
    message: input.message?.trim() ?? '',
    status: 'submitted',
    userId: userId ?? null,
  })
  return toConsultationDto(doc)
}

export async function getConsultationsForUser(email: string) {
  const key = email.trim().toLowerCase()
  const docs = await Consultation.find({
    $or: [{ ownerEmail: key }, { email: key }],
  }).sort({ createdAt: -1 })
  return docs.map(toConsultationDto)
}

export async function getAllConsultations() {
  const docs = await Consultation.find().sort({ createdAt: -1 })
  return docs.map(toConsultationDto)
}

export async function getConsultationById(id: string) {
  const doc = await Consultation.findById(id)
  if (!doc) throw new ApiError(404, 'Consultation not found')
  return toConsultationDto(doc)
}

export async function updateConsultationById(id: string, input: UpdateConsultationInput) {
  const doc = await Consultation.findById(id)
  if (!doc) throw new ApiError(404, 'Consultation not found')

  if (input.status !== undefined) doc.status = input.status
  if (input.adminNote !== undefined) doc.adminNote = input.adminNote
  if (input.adminReply !== undefined) {
    doc.adminReply = input.adminReply
    if (input.adminReply.trim()) {
      doc.repliedAt = new Date()
      if (doc.status !== 'closed') doc.status = 'responded'
    }
  }

  await doc.save()
  return toConsultationDto(doc)
}

export async function replyToConsultationById(id: string, message: string) {
  const text = message.trim()
  if (!text) throw new ApiError(400, 'Reply message is required')

  const doc = await Consultation.findById(id)
  if (!doc) throw new ApiError(404, 'Consultation not found')

  doc.adminReply = text
  doc.repliedAt = new Date()
  doc.status = 'responded'
  await doc.save()
  return toConsultationDto(doc)
}

export async function deleteConsultationById(id: string) {
  const doc = await Consultation.findByIdAndDelete(id)
  if (!doc) throw new ApiError(404, 'Consultation not found')
}
