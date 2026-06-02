export const CONSULTATION_STATUSES = [
  'submitted',
  'reviewing',
  'in_progress',
  'responded',
  'closed',
] as const

export type ConsultationStatus = (typeof CONSULTATION_STATUSES)[number]
