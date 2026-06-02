import { TeamMember, ServiceContent, Testimonial } from '../models/index.js'
import { ApiError } from '../utils/ApiError.js'
import {
  toTeamMemberDto,
  toServiceSummaryDto,
  toTestimonialDto,
} from '../utils/contentMappers.js'
import type {
  TeamMemberBody,
  ServiceContentBody,
  TestimonialBody,
} from '../validators/content.validator.js'

function makeKey(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export async function getPublicContent() {
  const [teamMembers, serviceSummaries, testimonials] = await Promise.all([
    TeamMember.find().sort({ sortOrder: 1, createdAt: 1 }),
    ServiceContent.find().sort({ sortOrder: 1, createdAt: 1 }),
    Testimonial.find().sort({ sortOrder: 1, createdAt: 1 }),
  ])

  return {
    teamMembers: teamMembers.map(toTeamMemberDto),
    serviceSummaries: serviceSummaries.map(toServiceSummaryDto),
    testimonials: testimonials.map(toTestimonialDto),
  }
}

export async function getAllTeamMembers() {
  const docs = await TeamMember.find().sort({ sortOrder: 1, createdAt: 1 })
  return docs.map(toTeamMemberDto)
}

export async function createTeamMember(input: TeamMemberBody) {
  const key = input.id?.trim() || makeKey('member')
  const existing = await TeamMember.findOne({ key })
  if (existing) throw new ApiError(409, 'Team member id already exists')

  const initials =
    input.initials.trim() ||
    input.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

  const doc = await TeamMember.create({
    key,
    name: input.name.trim(),
    role: input.role.trim(),
    bio: input.bio.trim(),
    initials,
    image: input.image.trim(),
    imageAlt: input.imageAlt.trim() || `${input.name.trim()}, ${input.role.trim()}`,
  })
  return toTeamMemberDto(doc)
}

export async function updateTeamMemberById(id: string, input: TeamMemberBody) {
  const doc = await TeamMember.findOne({ key: id })
  if (!doc) throw new ApiError(404, 'Team member not found')

  const initials =
    input.initials.trim() ||
    input.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

  doc.name = input.name.trim()
  doc.role = input.role.trim()
  doc.bio = input.bio.trim()
  doc.initials = initials
  doc.image = input.image.trim()
  doc.imageAlt = input.imageAlt.trim() || `${doc.name}, ${doc.role}`
  await doc.save()
  return toTeamMemberDto(doc)
}

export async function deleteTeamMemberById(id: string) {
  const doc = await TeamMember.findOneAndDelete({ key: id })
  if (!doc) throw new ApiError(404, 'Team member not found')
}

export async function getAllServiceSummaries() {
  const docs = await ServiceContent.find().sort({ sortOrder: 1, createdAt: 1 })
  return docs.map(toServiceSummaryDto)
}

export async function getServiceSummaryById(id: string) {
  const doc = await ServiceContent.findOne({ key: id })
  if (!doc) throw new ApiError(404, 'Service not found')
  return toServiceSummaryDto(doc)
}

export async function updateServiceById(id: string, input: ServiceContentBody) {
  const doc = await ServiceContent.findOne({ key: id })
  if (!doc) throw new ApiError(404, 'Service not found')

  doc.title = input.title.trim()
  doc.shortTitle = input.shortTitle.trim()
  doc.description = input.description.trim()
  doc.detail = input.detail.trim()
  doc.overviewImage = input.overviewImage
  await doc.save()
  return toServiceSummaryDto(doc)
}

export async function getAllTestimonials() {
  const docs = await Testimonial.find().sort({ sortOrder: 1, createdAt: 1 })
  return docs.map(toTestimonialDto)
}

export async function createTestimonial(input: TestimonialBody) {
  const key = input.id?.trim() || makeKey('t')
  const existing = await Testimonial.findOne({ key })
  if (existing) throw new ApiError(409, 'Testimonial id already exists')

  const doc = await Testimonial.create({
    key,
    quote: input.quote.trim(),
    name: input.name.trim(),
    role: input.role.trim(),
    avatar: input.avatar.trim(),
    featured: input.featured ?? false,
  })
  return toTestimonialDto(doc)
}

export async function updateTestimonialById(id: string, input: TestimonialBody) {
  const doc = await Testimonial.findOne({ key: id })
  if (!doc) throw new ApiError(404, 'Testimonial not found')

  doc.quote = input.quote.trim()
  doc.name = input.name.trim()
  doc.role = input.role.trim()
  doc.avatar = input.avatar.trim()
  doc.featured = input.featured ?? false
  await doc.save()
  return toTestimonialDto(doc)
}

export async function deleteTestimonialById(id: string) {
  const doc = await Testimonial.findOneAndDelete({ key: id })
  if (!doc) throw new ApiError(404, 'Testimonial not found')
}
