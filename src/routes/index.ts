import { Router } from 'express'
import healthRoutes from './health.routes.js'
import userRoutes from './user.routes.js'
import contentRoutes from './content.routes.js'
import consultationRoutes from './consultation.routes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/users', userRoutes)
router.use('/content', contentRoutes)
router.use('/consultations', consultationRoutes)

export default router
