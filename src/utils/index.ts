import { cloneDeep, isObject } from 'lodash'

export const deepMerge = <T = any>(source = {}, target: any = {}): T => {
  let key: string
  const result: any = cloneDeep(source)

  for (key in target) {
    result[key] = isObject(result[key])
      ? deepMerge(result[key], target[key])
      : target[key]
  }

  return result as T
}

export const mergeClassName = (classList: string[]): string =>
  classList.join(' ')
