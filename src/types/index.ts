export type UserRole = 'admin' | 'user'

export type ApiSuccessResponse<T> = {
  success: true
  data: T
}

export type ApiErrorResponse = {
  success: false
  message: string
  details?: unknown
}
