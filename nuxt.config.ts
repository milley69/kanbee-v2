// https://nuxt.com/docs/api/configuration/nuxt-config
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
// import fs from 'fs'
import { dirname, resolve } from 'node:path'
// import path from 'path'
import { fileURLToPath } from 'url'

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
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/pwa/ios/32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/pwa/ios/16.png' },
        { rel: 'manifest', href: '/pwa/site.webmanifest' },
      ],
      meta: [
        /* PWA */
        { name: 'msapplication-TileColor', content: '#242b33' },
        { name: 'theme-color', content: '#ffffff' },
        {
          name: 'description',
          content: 'Kanbee is a handy collaboration tool that helps you organize projects in the form of boards.',
        },
        { property: 'og:title', content: 'Kanbee' },
        {
          property: 'og:description',
          content: 'Kanbee is a handy collaboration tool that helps you organize projects in the form of boards.',
        },
        { property: 'og:url', content: 'https://kanbee.milley.uno' },
        { property: 'og:image', content: '/pwa/ios/128.png' },
        { property: 'og:site_name', content: 'Kanbee' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image:alt', content: 'Kanbee' },
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
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [resolve(dirname(fileURLToPath(import.meta.url)), '~/locales/*.json')],
      }),
    ],
  },
  extensions: ['.ts', '.vue', '.js'],
  // devServer: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, '.https/localhost-key.pem')).toString(),
  //     cert: fs.readFileSync(path.resolve(__dirname, '.https/localhost.pem')).toString(),
  //   },
  // },
})
