import { forEach, set, get, stubTrue, stubFalse } from 'lodash-es'

import { createTimer } from '@/system/lib/timer'

export type AuthValidator = (...args: any[]) => boolean

export type Permission = {
  /** 权限名称 */
  name: string
  /** 权限描述 */
  description: string
  /** 自定义验证器 */
  validator?: AuthValidator
}

export class AuthStore {
  private data: object = {}

  init(items: Permission[]) {
    const data = this.data

    createTimer<void>('auth.store.init', () => {
      forEach(items, ({ name, validator }) => {
        set(data, name, validator || stubTrue)
      })
    })
  }

  get(expr: string) {
    return get(this.data, expr, stubFalse)
  }
}
