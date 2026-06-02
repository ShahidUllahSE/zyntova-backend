import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose'

const imageSchema = new Schema(
  {
    src: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true, maxlength: 300 },
  },
  { _id: false },
)

const serviceContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    shortTitle: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    detail: { type: String, required: true, trim: true, maxlength: 4000 },
    overviewImage: { type: imageSchema, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export type ServiceContentDocument = HydratedDocument<
  InferSchemaType<typeof serviceContentSchema>
>

export const ServiceContent = model('ServiceContent', serviceContentSchema)
