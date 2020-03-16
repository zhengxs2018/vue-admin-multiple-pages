import braces from '@/system/lib/braces/index'

import timed from '@/system/decorators/timed'

import { AuthStore, AuthValidator, Permission } from './store'

export type AuthOptions = {
  data?: Permission[]
}

@timed('auth.manager', ['parse', 'has', 'check'])
export class AuthManager {
  private store: AuthStore = new AuthStore()

  constructor(options?: AuthOptions) {
    this.store.init(options?.data || [])
  }

  parse(pattern: string): AuthValidator[] {
    const store = this.store
    return braces(pattern).map(expr => store.get(expr))
  }

  has(code: string, ...args: any[]): boolean {
    return this.parse(code).some(fn => fn(...args))
  }

  check(code: string, ...args: any[]): boolean {
    return this.parse(code).every(fn => fn(...args))
  }
}
