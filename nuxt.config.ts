import { resolve } from 'path'

export default defineNuxtConfig({
  alias: {
    '@api': resolve(__dirname, './utils/api-utils')
  },
  typescript: {
    typeCheck: true
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
    }
  },
  nitro: {
    // local CORS error 해결
    devProxy: {
      '/api': {
        target: `http://localhost:8080`,
        changeOrigin: true,
        autoRewrite: true
      }
    }
  },
  modules: [
    '@pinia/nuxt', // Pinia 모듈 추가
  ],
  imports: {
    dirs: ['stores'], // 스토어 폴더를 자동으로 인식
  },
  plugins: ['@/plugins/dompurify.ts'],
  compatibilityDate: "2024-10-26"
})