export default defineNuxtPlugin((nuxtApp) => {
  const URL: string = import.meta.env.VITE_NEST_URL
  return { provide: { URL } }
})
