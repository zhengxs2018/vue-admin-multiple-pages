import { expand } from './expand'
import { escape, isEmptyString } from './utils'

function braces(pattern: string): string[] {
  if (isEmptyString(pattern)) return []
  if (/\{.*\}/.test(pattern)) {
    return expand(escape(pattern))
  }
  return [pattern]
}

export default braces
