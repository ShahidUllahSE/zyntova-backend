import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose'
import type { UserRole } from '../types/index.js'

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 100 },
    lastName: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    contactNumber: { type: String, trim: true, default: '', maxlength: 30 },
    location: { type: String, trim: true, default: '', maxlength: 200 },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'user'] satisfies UserRole[], default: 'user' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export type UserDocument = HydratedDocument<InferSchemaType<typeof userSchema>>

export const User = model('User', userSchema)
