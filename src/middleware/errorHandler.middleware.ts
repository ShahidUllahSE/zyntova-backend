import type { ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'
import { ZodError } from 'zod'
import { ApiError } from '../utils/ApiError.js'
import { env } from '../config/env.js'
import { logger } from '../utils/logger.js'

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      details: Object.fromEntries(
        Object.entries(err.errors).map(([key, val]) => [key, val.message]),
      ),
    })
    return
  }

  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ success: false, message: 'Invalid id' })
    return
  }

  if (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code: number }).code === 11000
  ) {
    res.status(409).json({ success: false, message: 'Duplicate value' })
    return
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      details: err.flatten().fieldErrors,
    })
    return
  }

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.details !== undefined && { details: err.details }),
    })
    return
  }

  logger.error('Unhandled error', err)

  res.status(500).json({
    success: false,
    message:
      env.NODE_ENV === 'production'
        ? 'Internal server error'
        : err instanceof Error
          ? err.message
          : 'Internal server error',
  })
}
