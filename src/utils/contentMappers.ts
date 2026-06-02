import type { TeamMemberDocument } from '../models/TeamMember.model.js'
import type { ServiceContentDocument } from '../models/ServiceContent.model.js'
import type { TestimonialDocument } from '../models/Testimonial.model.js'
import type { ConsultationDocument } from '../models/Consultation.model.js'

export type TeamMemberDto = {
  id: string
  name: string
  role: string
  bio: string
  initials: string
  image: string
  imageAlt: string
}

export type ServiceSummaryDto = {
  id: string
  title: string
  shortTitle: string
  description: string
  detail: string
  overviewImage: { src: string; alt: string }
}

export type TestimonialDto = {
  id: string
  quote: string
  name: string
  role: string
  avatar: string
  featured: boolean
}

export type ConsultationDto = {
  id: string
  ownerEmail: string
  firstName: string
  email: string
  phone: string
  businessType: string
  message: string
  status: string
  adminNote: string
  adminReply: string
  repliedAt: string
  createdAt: string
  updatedAt: string
}

export function toTeamMemberDto(doc: TeamMemberDocument): TeamMemberDto {
  return {
    id: doc.key,
    name: doc.name,
    role: doc.role,
    bio: doc.bio,
    initials: doc.initials,
    image: doc.image,
    imageAlt: doc.imageAlt,
  }
}

export function toServiceSummaryDto(doc: ServiceContentDocument): ServiceSummaryDto {
  return {
    id: doc.key,
    title: doc.title,
    shortTitle: doc.shortTitle,
    description: doc.description,
    detail: doc.detail,
    overviewImage: {
      src: doc.overviewImage.src,
      alt: doc.overviewImage.alt,
    },
  }
}

export function toTestimonialDto(doc: TestimonialDocument): TestimonialDto {
  return {
    id: doc.key,
    quote: doc.quote,
    name: doc.name,
    role: doc.role,
    avatar: doc.avatar,
    featured: doc.featured,
  }
}

export function toConsultationDto(doc: ConsultationDocument): ConsultationDto {
  return {
    id: doc._id.toString(),
    ownerEmail: doc.ownerEmail,
    firstName: doc.firstName,
    email: doc.email,
    phone: doc.phone ?? '',
    businessType: doc.businessType ?? '',
    message: doc.message ?? '',
    status: doc.status,
    adminNote: doc.adminNote ?? '',
    adminReply: doc.adminReply ?? '',
    repliedAt: doc.repliedAt ? doc.repliedAt.toISOString() : '',
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  }
}
