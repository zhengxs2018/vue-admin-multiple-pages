const debug = process.env.NODE_ENV === 'development'

export default function timed(name: string, methods: string[]) {
  return function decorator(constructor: Function) {
    if (!debug) return
    const prop = constructor.prototype
    methods.forEach(methodName => {
      const original = prop[methodName]
      const label = `[timed] ${name}.${methodName} exec`
      prop[methodName] = function(...args: any[]): any {
        console.time(label)
        const result = original.apply(this, args)
        console.timeEnd(label)
        return result
      }
    })
  }
}
