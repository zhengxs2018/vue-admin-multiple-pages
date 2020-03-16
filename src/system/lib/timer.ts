const debug = process.env.NODE_ENV === 'development'

export function createTimer<T = any>(methodName: string, callback: () => T): T {
  if (debug) {
    const label = `[timer] ${methodName}`
    console.time(label)
    const result = callback()
    console.timeEnd(label)
    return result
  }
  return callback()
}
