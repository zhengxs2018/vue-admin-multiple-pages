import { overSome, overEvery } from 'lodash-es'

import braces from '@/system/lib/braces/index'

import { createTimer } from '@/system/lib/timer'

import { AuthStore, AuthValidator, Permission } from './store'

export type AuthOptions = {
  data?: Permission[]
}

function braceExpand(pattern: string): string[] {
  return createTimer<string[]>('braces.expand', () => braces(pattern))
}

export class AuthManager {
  private store: AuthStore = new AuthStore()

  constructor(options?: AuthOptions) {
    this.store.init(options?.data || [])
  }

  parse(code: string): AuthValidator[] {
    const store = this.store
    const expressions = braceExpand(code)

    return createTimer<AuthValidator[]>('auth.manager.parse', () => {
      return expressions.map(expr => store.get(expr))
    })
  }

  has(code: string): boolean {
    return createTimer<boolean>('auth.manager.has', overSome(this.parse(code)))
  }

  check(code: string): boolean {
    return createTimer<boolean>(
      'auth.manager.check',
      overEvery(this.parse(code))
    )
  }
}
