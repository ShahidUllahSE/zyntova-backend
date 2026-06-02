import type { Request, Response } from 'express'
import * as userService from '../services/user.service.js'
import { getParamId } from '../utils/params.js'
import type {
  RegisterInput,
  LoginInput,
  UpdateProfileInput,
  ChangePasswordInput,
  ListUsersQuery,
  UpdateUserByIdInput,
} from '../validators/user.validator.js'

export async function register(req: Request, res: Response): Promise<void> {
  const data = await userService.register(req.body as RegisterInput)
  res.status(201).json({ success: true, data })
}

export async function login(req: Request, res: Response): Promise<void> {
  const data = await userService.login(req.body as LoginInput)
  res.json({ success: true, data })
}

export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  const user = await userService.getCurrentUser(req.auth!.sub)
  res.json({ success: true, data: { user } })
}

export async function updateCurrentUser(req: Request, res: Response): Promise<void> {
  const user = await userService.updateCurrentUser(req.auth!.sub, req.body as UpdateProfileInput)
  res.json({ success: true, data: { user } })
}

export async function changeCurrentUserPassword(req: Request, res: Response): Promise<void> {
  await userService.changeCurrentUserPassword(req.auth!.sub, req.body as ChangePasswordInput)
  res.json({ success: true, data: { message: 'Password updated successfully' } })
}

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  const data = await userService.getAllUsers(req.query as unknown as ListUsersQuery)
  res.json({ success: true, data })
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  const user = await userService.getUserById(getParamId(req))
  res.json({ success: true, data: { user } })
}

export async function updateUserById(req: Request, res: Response): Promise<void> {
  const user = await userService.updateUserById(
    getParamId(req),
    req.auth!.sub,
    req.body as UpdateUserByIdInput,
  )
  res.json({ success: true, data: { user } })
}

export async function deleteUserById(req: Request, res: Response): Promise<void> {
  await userService.deleteUserById(getParamId(req), req.auth!.sub)
  res.json({ success: true, data: { message: 'User deleted successfully' } })
}
