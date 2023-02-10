import { deepMerge } from './../index'
import { CAxios } from './axios'
import type { AxiosInterceptor, CreateAxiosOptions } from '#/axios'

const interceptor: AxiosInterceptor = {}

const createAxios = (options?: Partial<CreateAxiosOptions>) => {
  return new CAxios(
    deepMerge(
      {
        timeout: 6000,
        interceptor,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      },
      options || {}
    )
  )
}
const request = createAxios()

export default request
