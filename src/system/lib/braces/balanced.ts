export type Balanced = {
  start: number
  end: number
  pre: string
  body: string
  post: string
}

export function balanced(
  value: string,
  open = '{',
  close = '}'
): Balanced | void {
  const start = value.indexOf(open)
  if (start === -1) return

  const end = value.lastIndexOf(close)
  if (end === -1) return

  return {
    start: start,
    end: end,
    pre: value.slice(0, start),
    body: value.slice(start + open.length, end),
    post: value.slice(end + close.length)
  }
}
