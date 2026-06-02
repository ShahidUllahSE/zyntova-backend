import type { Request, Response } from 'express'
import * as consultationService from '../services/consultation.service.js'
import { getParamId } from '../utils/params.js'
import type {
  CreateConsultationInput,
  UpdateConsultationInput,
} from '../validators/content.validator.js'

export async function createConsultation(req: Request, res: Response): Promise<void> {
  const userId = req.auth?.sub
  const userEmail = req.auth?.email?.trim().toLowerCase()
  const body = req.body as CreateConsultationInput
  const consultation = await consultationService.createConsultation(
    {
      ...body,
      ownerEmail: userEmail ?? body.ownerEmail,
      email: userEmail ?? body.email,
    },
    userId,
  )
  res.status(201).json({ success: true, data: { consultation } })
}

export async function getMyConsultations(req: Request, res: Response): Promise<void> {
  const email = req.auth?.email ?? String(req.query.email ?? '').trim().toLowerCase()
  if (!email) {
    res.status(400).json({ success: false, message: 'Email is required' })
    return
  }
  const consultations = await consultationService.getConsultationsForUser(email)
  res.json({ success: true, data: { consultations } })
}

export async function getAllConsultations(_req: Request, res: Response): Promise<void> {
  const consultations = await consultationService.getAllConsultations()
  res.json({ success: true, data: { consultations } })
}

export async function getConsultationById(req: Request, res: Response): Promise<void> {
  const consultation = await consultationService.getConsultationById(getParamId(req))
  res.json({ success: true, data: { consultation } })
}

export async function updateConsultationById(req: Request, res: Response): Promise<void> {
  const consultation = await consultationService.updateConsultationById(
    getParamId(req),
    req.body as UpdateConsultationInput,
  )
  res.json({ success: true, data: { consultation } })
}

export async function replyToConsultationById(req: Request, res: Response): Promise<void> {
  const { message } = req.body as { message: string }
  const consultation = await consultationService.replyToConsultationById(
    getParamId(req),
    message,
  )
  res.json({ success: true, data: { consultation } })
}

export async function deleteConsultationById(req: Request, res: Response): Promise<void> {
  await consultationService.deleteConsultationById(getParamId(req))
  res.json({ success: true, data: { message: 'Consultation deleted' } })
}
