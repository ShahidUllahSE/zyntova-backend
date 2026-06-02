import { Router } from 'express'
import {
  getPublicContent,
  getAllTeamMembers,
  createTeamMember,
  updateTeamMemberById,
  deleteTeamMemberById,
  getAllServices,
  getServiceById,
  updateServiceById,
  getAllTestimonials,
  createTestimonial,
  updateTestimonialById,
  deleteTestimonialById,
} from '../controllers/content.controller.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { validate } from '../middleware/validate.middleware.js'
import { requireAuth, requireAdmin } from '../middleware/auth.middleware.js'
import {
  teamMemberBodySchema,
  serviceContentBodySchema,
  testimonialBodySchema,
} from '../validators/content.validator.js'

const router = Router()

router.get('/', asyncHandler(getPublicContent))

const teamRouter = Router()
teamRouter.get('/', asyncHandler(getAllTeamMembers))
teamRouter.post('/', requireAuth, requireAdmin, validate(teamMemberBodySchema), asyncHandler(createTeamMember))
teamRouter.patch('/:id', requireAuth, requireAdmin, validate(teamMemberBodySchema), asyncHandler(updateTeamMemberById))
teamRouter.delete('/:id', requireAuth, requireAdmin, asyncHandler(deleteTeamMemberById))
router.use('/team', teamRouter)

const servicesRouter = Router()
servicesRouter.get('/', asyncHandler(getAllServices))
servicesRouter.get('/:id', asyncHandler(getServiceById))
servicesRouter.patch('/:id', requireAuth, requireAdmin, validate(serviceContentBodySchema), asyncHandler(updateServiceById))
router.use('/services', servicesRouter)

const testimonialsRouter = Router()
testimonialsRouter.get('/', asyncHandler(getAllTestimonials))
testimonialsRouter.post('/', requireAuth, requireAdmin, validate(testimonialBodySchema), asyncHandler(createTestimonial))
testimonialsRouter.patch('/:id', requireAuth, requireAdmin, validate(testimonialBodySchema), asyncHandler(updateTestimonialById))
testimonialsRouter.delete('/:id', requireAuth, requireAdmin, asyncHandler(deleteTestimonialById))
router.use('/testimonials', testimonialsRouter)

export default router
