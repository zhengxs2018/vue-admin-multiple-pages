import { zipWith, forEach } from 'lodash-es'

import { balanced } from './balanced'

import { isEmptyString, embrace, unescape } from './utils'

// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(value: string): string[] {
  if (isEmptyString(value)) return []

  const m = balanced(value)
  if (m === undefined) return value.split(',')

  const { pre, body, post } = m
  const parts = pre.split(',')

  parts.splice(parts.length - 1, 1, embrace(body))

  if (post.length > 0) {
    const postParts: string[] = parseCommaParts(post)
    return parts.concat(postParts.slice(1))
  }

  return parts
}

export function expand(value: string): string[] {
  const result = balanced(value)
  if (result === undefined) return [unescape(value)]

  const { pre, body, post } = result
  if (body.indexOf(',') === -1) {
    return [unescape(pre + body)]
  }

  const parts: string[] = parseCommaParts(body)
  const prefixes = post.length ? expand(post) : ['']

  const expansions: string[] = []

  forEach(parts, part => {
    zipWith(prefixes, expand(part), (prefix = '', value = '') => {
      expansions.push(unescape(pre + value + prefix))
    })
  })

  return expansions
}
