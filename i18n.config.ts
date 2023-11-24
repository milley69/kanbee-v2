import { default as en_US } from '@/src/i18n/en_US.json'
import { default as ru_RU } from '@/src/i18n/ru_RU.json'

export default defineI18nConfig(() => ({
  legacy: false,
  globalInjection: true,
  locale: 'en_US',
  messages: { en_US, ru_RU },
  availableLocales: ['ru_RU', 'en_US'],
}))
