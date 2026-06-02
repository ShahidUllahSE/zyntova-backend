import { User } from '../models/User.model.js'
import { ApiError } from '../utils/ApiError.js'
import { hashPassword, verifyPassword } from '../utils/password.js'
import { signToken } from '../utils/jwt.js'
import { toUserPublic } from '../utils/userMapper.js'
import type { AuthResponse } from '../types/user.js'
import type {
  RegisterInput,
  LoginInput,
  UpdateProfileInput,
  ChangePasswordInput,
  ListUsersQuery,
  UpdateUserByIdInput,
} from '../validators/user.validator.js'

async function buildAuthResponse(userId: string): Promise<AuthResponse> {
  const user = await User.findById(userId)
  if (!user || !user.isActive) {
    throw new ApiError(401, 'Invalid credentials')
  }
  const publicUser = toUserPublic(user)
  const token = signToken({
    sub: publicUser.id,
    email: publicUser.email,
    role: publicUser.role,
  })
  return { user: publicUser, token }
}

export async function register(input: RegisterInput): Promise<AuthResponse> {
  const email = input.email.trim().toLowerCase()
  const existing = await User.findOne({ email })
  if (existing) {
    throw new ApiError(409, 'An account with this email already exists')
  }

  const passwordHash = await hashPassword(input.password)
  const user = await User.create({
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email,
    contactNumber: input.contactNumber.trim(),
    location: input.location.trim(),
    passwordHash,
    role: 'user',
  })

  return buildAuthResponse(user._id.toString())
}

export async function login(input: LoginInput): Promise<AuthResponse> {
  const email = input.email.trim().toLowerCase()
  const user = await User.findOne({ email }).select('+passwordHash')
  if (!user || !user.isActive) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const valid = await verifyPassword(input.password, user.passwordHash as string)
  if (!valid) {
    throw new ApiError(401, 'Invalid email or password')
  }

  return buildAuthResponse(user._id.toString())
}

export async function getCurrentUser(userId: string) {
  const user = await User.findById(userId)
  if (!user || !user.isActive) {
    throw new ApiError(404, 'User not found')
  }
  return toUserPublic(user)
}

export async function updateCurrentUser(userId: string, input: UpdateProfileInput) {
  const user = await User.findById(userId)
  if (!user || !user.isActive) {
    throw new ApiError(404, 'User not found')
  }

  if (input.email) {
    const email = input.email.trim().toLowerCase()
    const taken = await User.findOne({ email, _id: { $ne: userId } })
    if (taken) {
      throw new ApiError(409, 'Email is already in use')
    }
    user.email = email
  }

  if (input.firstName !== undefined) user.firstName = input.firstName.trim()
  if (input.lastName !== undefined) user.lastName = input.lastName.trim()
  if (input.contactNumber !== undefined) user.contactNumber = input.contactNumber.trim()
  if (input.location !== undefined) user.location = input.location.trim()
  if (input.password) {
    user.passwordHash = await hashPassword(input.password)
  }

  await user.save()
  return toUserPublic(user)
}

export async function changeCurrentUserPassword(userId: string, input: ChangePasswordInput) {
  const user = await User.findById(userId).select('+passwordHash')
  if (!user || !user.isActive) {
    throw new ApiError(404, 'User not found')
  }

  const valid = await verifyPassword(input.currentPassword, user.passwordHash as string)
  if (!valid) {
    throw new ApiError(400, 'Current password is incorrect')
  }

  user.passwordHash = await hashPassword(input.newPassword)
  await user.save()
}

export async function getAllUsers(query: ListUsersQuery) {
  const filter: Record<string, unknown> = {}
  if (query.role) filter.role = query.role
  if (query.search) {
    const term = query.search.trim()
    filter.$or = [
      { email: { $regex: term, $options: 'i' } },
      { firstName: { $regex: term, $options: 'i' } },
      { lastName: { $regex: term, $options: 'i' } },
      { contactNumber: { $regex: term, $options: 'i' } },
      { location: { $regex: term, $options: 'i' } },
    ]
  }

  const skip = (query.page - 1) * query.limit
  const [items, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(query.limit),
    User.countDocuments(filter),
  ])

  return {
    users: items.map(toUserPublic),
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit) || 1,
    },
  }
}

export async function getUserById(userId: string) {
  const user = await User.findById(userId)
  if (!user) {
    throw new ApiError(404, 'User not found')
  }
  return toUserPublic(user)
}

export async function updateUserById(
  targetUserId: string,
  actingAdminId: string,
  input: UpdateUserByIdInput,
) {
  const user = await User.findById(targetUserId)
  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  if (input.email) {
    const email = input.email.trim().toLowerCase()
    const taken = await User.findOne({ email, _id: { $ne: targetUserId } })
    if (taken) {
      throw new ApiError(409, 'Email is already in use')
    }
    user.email = email
  }

  if (input.firstName !== undefined) user.firstName = input.firstName.trim()
  if (input.lastName !== undefined) user.lastName = input.lastName.trim()
  if (input.contactNumber !== undefined) user.contactNumber = input.contactNumber.trim()
  if (input.location !== undefined) user.location = input.location.trim()
  if (input.role !== undefined) user.role = input.role
  if (input.isActive !== undefined) {
    if (targetUserId === actingAdminId && input.isActive === false) {
      throw new ApiError(400, 'You cannot deactivate your own account')
    }
    user.isActive = input.isActive
  }
  if (input.password) {
    user.passwordHash = await hashPassword(input.password)
  }

  await user.save()
  return toUserPublic(user)
}

export async function deleteUserById(targetUserId: string, actingAdminId: string) {
  if (targetUserId === actingAdminId) {
    throw new ApiError(400, 'You cannot delete your own account')
  }

  const user = await User.findById(targetUserId)
  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  if (user.role === 'admin') {
    const adminCount = await User.countDocuments({ role: 'admin', isActive: true })
    if (adminCount <= 1) {
      throw new ApiError(400, 'Cannot delete the last active admin')
    }
  }

  await User.findByIdAndDelete(targetUserId)
}
