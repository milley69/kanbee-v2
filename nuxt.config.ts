// https://nuxt.com/docs/api/configuration/nuxt-config
// import fs from 'fs'
// import path from 'path'

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/color-mode', '@formkit/auto-animate/nuxt', '@vueuse/nuxt'],
  css: ['@/assets/css/tailwind.css'],
  tailwindcss: {
    configPath: '@/tailwind.config.ts',
    injectPosition: 'first',
    viewer: false,
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    dataValue: 'theme',
    storageKey: 'kanbee-color-mode',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css', rel: 'stylesheet' },
        /* PWA */
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/pwa/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/pwa/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/pwa/favicon-16x16.png' },
        { rel: 'manifest', href: '/pwa/site.webmanifest' },
      ],
      meta: [
        /* PWA */
        { name: 'msapplication-TileColor', content: '#242b33' },
        { name: 'theme-color', content: '#ffffff' },
      ],
    },
  },
  imports: {
    dirs: ['stores'],
  },
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: false,
  },
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  extensions: ['.ts', '.vue', '.js'],
  // devServer: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, '.https/localhost-key.pem')).toString(),
  //     cert: fs.readFileSync(path.resolve(__dirname, '.https/localhost.pem')).toString(),
  //   },
  // },
})
