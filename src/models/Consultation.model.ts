import { Schema, model, type HydratedDocument, type InferSchemaType, type Types } from 'mongoose'
import { CONSULTATION_STATUSES } from '../constants/consultationStatus.js'

const consultationSchema = new Schema(
  {
    ownerEmail: { type: String, required: true, lowercase: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true, default: '' },
    businessType: { type: String, trim: true, default: '' },
    message: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: CONSULTATION_STATUSES,
      default: 'submitted',
    },
    adminNote: { type: String, trim: true, default: '' },
    adminReply: { type: String, trim: true, default: '' },
    repliedAt: { type: Date, default: null },
    userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
)

consultationSchema.index({ ownerEmail: 1, createdAt: -1 })
consultationSchema.index({ email: 1, createdAt: -1 })
consultationSchema.index({ status: 1 })

export type ConsultationDocument = HydratedDocument<InferSchemaType<typeof consultationSchema>> & {
  userId?: Types.ObjectId | null
}

export const Consultation = model('Consultation', consultationSchema)
