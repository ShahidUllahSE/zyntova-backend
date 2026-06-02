import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose'

const teamMemberSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    role: { type: String, required: true, trim: true, maxlength: 160 },
    bio: { type: String, required: true, trim: true, maxlength: 2000 },
    initials: { type: String, required: true, trim: true, maxlength: 8 },
    image: { type: String, required: true, trim: true },
    imageAlt: { type: String, required: true, trim: true, maxlength: 200 },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export type TeamMemberDocument = HydratedDocument<InferSchemaType<typeof teamMemberSchema>>

export const TeamMember = model('TeamMember', teamMemberSchema)
