import { default as en } from '@/src/i18n/en_US.json'
import { default as ru } from '@/src/i18n/ru_RU.json'
import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: { en, ru },
  })
  vueApp.use(i18n)
})
