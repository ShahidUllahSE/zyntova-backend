import { Router } from 'express'
import {
  register,
  login,
  getCurrentUser,
  updateCurrentUser,
  changeCurrentUserPassword,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/user.controller.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { validate } from '../middleware/validate.middleware.js'
import { requireAuth, requireAdmin } from '../middleware/auth.middleware.js'
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
  listUsersQuerySchema,
  updateUserByIdSchema,
} from '../validators/user.validator.js'

const router = Router()

// Public
router.post('/register', validate(registerSchema), asyncHandler(register))
router.post('/login', validate(loginSchema), asyncHandler(login))

// Authenticated — static paths before /:id
router.get('/me', requireAuth, asyncHandler(getCurrentUser))
router.patch('/me', requireAuth, validate(updateProfileSchema), asyncHandler(updateCurrentUser))
router.patch(
  '/me/password',
  requireAuth,
  validate(changePasswordSchema),
  asyncHandler(changeCurrentUserPassword),
)

// Admin
router.get('/', requireAuth, requireAdmin, validate(listUsersQuerySchema, 'query'), asyncHandler(getAllUsers))
router.get('/:id', requireAuth, requireAdmin, asyncHandler(getUserById))
router.patch('/:id', requireAuth, requireAdmin, validate(updateUserByIdSchema), asyncHandler(updateUserById))
router.delete('/:id', requireAuth, requireAdmin, asyncHandler(deleteUserById))

export default router
