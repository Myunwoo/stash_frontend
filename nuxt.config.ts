import { resolve } from 'path'

export default defineNuxtConfig({
  alias: {
    '@api': resolve(__dirname, './utils/api-utils')
  },
  typescript: {
    typeCheck: false
  },
  css: [
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
  },
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.API_BASE_URL,
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
