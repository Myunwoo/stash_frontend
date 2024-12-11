import { resolve } from 'path'
import Checker from 'vite-plugin-checker'

export default defineNuxtConfig({
  alias: {
    '@api': resolve(__dirname, './utils/api-utils')
  },
  typescript: {
    typeCheck: false // 타입 검사 비활성화
  },
  build: {
    transpile: ['vuetify']
  },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      prefetch: false,
      preload: false
    }
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/common.scss" as *;'
        }
      }
    },
    plugins: [
      Checker({
        vueTsc: false, // vue-tsc 체크 비활성화
        typescript: false, // TypeScript 체크 비활성화
      }),
    ],
  },
  nitro: {
    devProxy: {
      '/api': {
        target: `http://localhost:8080`,
        changeOrigin: true,
        autoRewrite: true
      }
    }
  },
  modules: [
    '@pinia/nuxt',
  ],
  imports: {
    dirs: ['stores'],
  },
  plugins: ['@/plugins/dompurify.ts'],
  compatibilityDate: "2024-10-26"
})
