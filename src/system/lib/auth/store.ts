import { forEach, set, get, stubTrue, stubFalse } from 'lodash-es'

import timed from '@/system/decorators/timed'

export type AuthValidator = (...args: any[]) => boolean

export type Permission = {
  /** 权限名称 */
  name: string
  /** 权限描述 */
  description: string
  /** 自定义验证器 */
  validator?: AuthValidator
}

@timed('auth.store', ['init'])
export class AuthStore {
  private data: object = {}

  init(items: Permission[]) {
    const data = this.data

    forEach(items, ({ name, validator }) => {
      set(data, name, validator || stubTrue)
    })
  }

  get(expr: string) {
    return get(this.data, expr, stubFalse)
  }
}
