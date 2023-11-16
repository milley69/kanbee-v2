export const useLocales = () => {
  const getLocale = () => {
    if (navigator.languages !== undefined) return navigator.languages[0]
    return navigator.language
  }
  return { getLocale }
}
