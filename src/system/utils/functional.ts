import { isFunction } from 'lodash-es'

type LoaderOptions<U, T> = {
  initialValue?: T
  context: __WebpackModuleApi.RequireContext
  resolver: (previousValue: T, currentValue: U, filename: string) => T
}

/**
 * 动态加载文件
 *
 * @param options 可选项
 */
export function dynamicLoader<U = {}, T = never[]>(
  options: LoaderOptions<U, T>
): T {
  const { context, resolver, initialValue } = options
  return context.keys().reduce((previousValue, filename) => {
    return resolver(previousValue as T, context(filename).default, filename)
  }, initialValue || []) as T
}

export function unwrap<T = any>(value: Function | T, ...args: any[]): T {
  return isFunction(value) ? value(...args) : value
}
