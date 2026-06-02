import { Router } from 'express'
import {
  createConsultation,
  getMyConsultations,
  getAllConsultations,
  getConsultationById,
  updateConsultationById,
  replyToConsultationById,
  deleteConsultationById,
} from '../controllers/consultation.controller.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { validate } from '../middleware/validate.middleware.js'
import { requireAuth, requireAdmin } from '../middleware/auth.middleware.js'
import {
  createConsultationSchema,
  updateConsultationSchema,
  replyConsultationSchema,
} from '../validators/content.validator.js'

const router = Router()

router.post('/', requireAuth, validate(createConsultationSchema), asyncHandler(createConsultation))
router.get('/mine', requireAuth, asyncHandler(getMyConsultations))
router.get('/', requireAuth, requireAdmin, asyncHandler(getAllConsultations))
router.get('/:id', requireAuth, requireAdmin, asyncHandler(getConsultationById))
router.patch('/:id', requireAuth, requireAdmin, validate(updateConsultationSchema), asyncHandler(updateConsultationById))
router.post('/:id/reply', requireAuth, requireAdmin, validate(replyConsultationSchema), asyncHandler(replyToConsultationById))
router.delete('/:id', requireAuth, requireAdmin, asyncHandler(deleteConsultationById))

export default router
