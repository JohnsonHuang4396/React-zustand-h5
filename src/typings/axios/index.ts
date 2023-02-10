import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  interceptor?: AxiosInterceptor
}

export interface AxiosInterceptor {
  /**
   * @description: 处理响应数据
   */
  transformResponseHook?: <T>(res: AxiosResponse<T>) => any
  /**
   * @description: 响应错误处理
   */
  requestCatchHook?: (e: Error) => Promise<any>
  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (
    config: InternalAxiosRequestConfig,
    options: CreateAxiosOptions
  ) => InternalAxiosRequestConfig

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (
    error: Error,
    axiosInstance?: AxiosInstance
  ) => void
}
