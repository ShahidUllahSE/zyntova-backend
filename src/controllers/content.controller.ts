import type { Request, Response } from 'express'
import * as contentService from '../services/content.service.js'
import { getParamId } from '../utils/params.js'
import type {
  TeamMemberBody,
  ServiceContentBody,
  TestimonialBody,
} from '../validators/content.validator.js'

export async function getPublicContent(_req: Request, res: Response): Promise<void> {
  const data = await contentService.getPublicContent()
  res.json({ success: true, data })
}

export async function getAllTeamMembers(_req: Request, res: Response): Promise<void> {
  const teamMembers = await contentService.getAllTeamMembers()
  res.json({ success: true, data: { teamMembers } })
}

export async function createTeamMember(req: Request, res: Response): Promise<void> {
  const member = await contentService.createTeamMember(req.body as TeamMemberBody)
  res.status(201).json({ success: true, data: { member } })
}

export async function updateTeamMemberById(req: Request, res: Response): Promise<void> {
  const member = await contentService.updateTeamMemberById(
    getParamId(req),
    req.body as TeamMemberBody,
  )
  res.json({ success: true, data: { member } })
}

export async function deleteTeamMemberById(req: Request, res: Response): Promise<void> {
  await contentService.deleteTeamMemberById(getParamId(req))
  res.json({ success: true, data: { message: 'Team member deleted' } })
}

export async function getAllServices(_req: Request, res: Response): Promise<void> {
  const serviceSummaries = await contentService.getAllServiceSummaries()
  res.json({ success: true, data: { serviceSummaries } })
}

export async function getServiceById(req: Request, res: Response): Promise<void> {
  const service = await contentService.getServiceSummaryById(getParamId(req))
  res.json({ success: true, data: { service } })
}

export async function updateServiceById(req: Request, res: Response): Promise<void> {
  const service = await contentService.updateServiceById(
    getParamId(req),
    req.body as ServiceContentBody,
  )
  res.json({ success: true, data: { service } })
}

export async function getAllTestimonials(_req: Request, res: Response): Promise<void> {
  const testimonials = await contentService.getAllTestimonials()
  res.json({ success: true, data: { testimonials } })
}

export async function createTestimonial(req: Request, res: Response): Promise<void> {
  const testimonial = await contentService.createTestimonial(req.body as TestimonialBody)
  res.status(201).json({ success: true, data: { testimonial } })
}

export async function updateTestimonialById(req: Request, res: Response): Promise<void> {
  const testimonial = await contentService.updateTestimonialById(
    getParamId(req),
    req.body as TestimonialBody,
  )
  res.json({ success: true, data: { testimonial } })
}

export async function deleteTestimonialById(req: Request, res: Response): Promise<void> {
  await contentService.deleteTestimonialById(getParamId(req))
  res.json({ success: true, data: { message: 'Testimonial deleted' } })
}
