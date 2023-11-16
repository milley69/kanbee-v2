import type { Quotes } from '~/types'

export const useQuotes = () => {
  const { $URL } = useNuxtApp()

  const getQuotes = async () => {
    const quote = await $fetch<Quotes>($URL + '/quotes')
    if (!quote) return null
    return quote
  }

  return { getQuotes }
}
