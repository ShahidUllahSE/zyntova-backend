import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose'

const testimonialSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    quote: { type: String, required: true, trim: true, maxlength: 3000 },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    role: { type: String, required: true, trim: true, maxlength: 160 },
    avatar: { type: String, required: true, trim: true },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export type TestimonialDocument = HydratedDocument<InferSchemaType<typeof testimonialSchema>>

export const Testimonial = model('Testimonial', testimonialSchema)
