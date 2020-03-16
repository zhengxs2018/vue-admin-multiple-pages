import {
  ESCAPE_SLASH,
  ESCAPE_OPEN,
  ESCAPE_CLOSE,
  ESCAPE_COMMA,
  ESCAPE_PERIOD
} from './constants'

export function escape(str: string): string {
  return str
    .split('\\\\')
    .join(ESCAPE_SLASH)
    .split('\\{')
    .join(ESCAPE_OPEN)
    .split('\\}')
    .join(ESCAPE_CLOSE)
    .split('\\,')
    .join(ESCAPE_COMMA)
    .split('\\.')
    .join(ESCAPE_PERIOD)
}

export function unescape(str: string): string {
  return str
    .split(ESCAPE_SLASH)
    .join('\\')
    .split(ESCAPE_OPEN)
    .join('{')
    .split(ESCAPE_CLOSE)
    .join('}')
    .split(ESCAPE_COMMA)
    .join(',')
    .split(ESCAPE_PERIOD)
    .join('.')
}

export function embrace(str: string): string {
  return '{' + str + '}'
}

export function isEmptyString(value: string): boolean {
  return typeof value !== 'string' || value.length === 0
}
