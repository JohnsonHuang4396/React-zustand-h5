const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export function isDate(val: unknown): val is Date {
  return is(val, 'Date')
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

export const isNumber = (target: unknown): target is Number => {
  return typeof target === 'number'
}

export const isString = (target: unknown): target is String => {
  return typeof target === 'string'
}

export const isBoolean = (target: unknown): target is Boolean => {
  return typeof target === 'boolean'
}

export const isFunction = (target: unknown): target is Function => {
  return typeof target === 'function'
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName
}
