import http from '@/system/lib/http'

export type LoginForm = {
  username: string
  password: string
}

export type LoginResult = {
  error: 0 | 1
  errMsg: string
}

export function login(formData: LoginForm): Promise<LoginResult> {
  return http.post('/api/auth/login', formData)
}
