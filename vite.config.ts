import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { loadEnv, createProxy } from './src/utils/dotenv'
import { resolve } from 'path'

const { VITE_APP_API_BASE_URL } = loadEnv(process.env.NODE_ENV)

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4396,
    host: '0.0.0.0',
    cors: true,
    proxy: createProxy(VITE_APP_API_BASE_URL, '/api')
  },
  plugins: [
    react(),
    AutoImport({
      include: [/.[tj]sx?$/],
      imports: ['react', 'react-router-dom', 'ahooks'],
      dirs: [
        './src/utils',
        './src/utils/request',
        './src/hook',
        './src/config',
        './src/apis'
      ],
      dts: true,
      defaultExportByFilename: false
    }),
    UnoCSS()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '#': resolve(__dirname, './src/typings')
    }
  }
})
