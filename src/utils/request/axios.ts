import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { CreateAxiosOptions } from '#/axios'
import type { Response } from '#/request'
import { message } from 'antd'

export class CAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptor()
  }

  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config)
  }

  private getInterceptor() {
    const { interceptor } = this.options
    return interceptor
  }

  getInstance() {
    return this.axiosInstance
  }

  setInstanceConfig(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return
    }
    this.createAxios(config)
  }

  setHeader(headers: any) {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  setupInterceptor() {
    const interceptor = this.getInterceptor()
    if (!interceptor) {
      return false
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = interceptor

    // set request interceptors
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        requestInterceptors &&
          isFunction(requestInterceptors) &&
          (config = requestInterceptors(config, this.options))
        return config
      },
      undefined
    )

    // set request error capture
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch
      )

    // set response interceptor
    this.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      responseInterceptors &&
        isFunction(responseInterceptors) &&
        (response = responseInterceptors(response))
      return response
    }, undefined)

    // set response error capture
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, error => {
        return responseInterceptorsCatch(error, this.axiosInstance)
      })
  }

  async get<T = any>(config: AxiosRequestConfig): Promise<Response<T>> {
    return await this.request({ ...config, method: 'GET' })
  }

  async post<T = any>(config: AxiosRequestConfig): Promise<Response<T>> {
    return await this.request({ ...config, method: 'POST' })
  }

  request<T = any>(config: AxiosRequestConfig): Promise<Response<T>> {
    const interceptor = this.getInterceptor()
    const { transformResponseHook, requestCatchHook } = interceptor || {}
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<T>(config)
        .then((result: AxiosResponse<T, AxiosRequestConfig>) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const transformRes = transformResponseHook(result)
              resolve(transformRes)
            } catch (error) {
              reject(error || new Error('request error!'))
            }
            return true
          }
          resolve(result.data as unknown as Promise<Response<T>>)
        })
        .catch((error: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(error))
            return false
          }
          message.error(error.message)
        })
    })
  }
}
