import http from '@/system/lib/http'

export type User = {
  id: number
  avatar: string
  username: string
  nickname: string
}

export function getLoginUser(): Promise<User> {
  return http.get('/api/user/info')
}
