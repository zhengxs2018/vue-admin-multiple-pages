// See .env
const siteTitle = process.env.VUE_APP_TITLE || document.title

/**
 * 设置文档标题
 *
 * @param {String} title  标题
 */
export function setTitle(title: string): void {
  document.title = title ? `${title} - ${siteTitle}` : siteTitle
}

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
