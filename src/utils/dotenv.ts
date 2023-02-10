import * as dotenv from 'dotenv'
import { ProxyOptions } from 'vite'
export interface ViteEnv {
  VITE_URL: string
  VITE_APP_API_BASE_URL: string
  VITE_ZIP_NAME: string
}

// 通过dotenv配置 需要加载指定.env文件 这样process.env打印到得就是对应得文件了
// 这里的mode是我们启动时候的参数 npm run dev:prc 得到的mode就是prc
export function loadEnv(mode: string): ViteEnv {
  const ret: any = {}
  // 在使用之前我们先指定加载哪个环境变量
  dotenv.config({
    path: `.env.${mode}` // .env.prc
  })

  for (const envName of Object.keys(process.env)) {
    let realName = (process.env as any)[envName].replace(/\\n/g, '\n')
    ret[envName] = realName
    // 向process.env上扩展我们定义的VITE环境变量
    process.env[envName] = realName
  }

  return ret
}

//   根据环境变量返回指定得proxy
export function createProxy(
  targetProxyUrl: string,
  baseUrl: string
): Record<string, string | ProxyOptions> {
  return {
    [`${baseUrl}`]: {
      target: targetProxyUrl,
      changeOrigin: true,
      secure: false,
      rewrite: (path: string) => path.replace(baseUrl, '')
    }
  }
}
