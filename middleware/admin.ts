import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAdmin } = storeToRefs(useUser())

  if (!isAdmin) return navigateTo('/')
})
