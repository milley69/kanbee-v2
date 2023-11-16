import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuth } = storeToRefs(useUser())

  if (!isAuth.value && to.path !== '/sign-in') {
    return navigateTo('/sign-in')
  }

  return true
})
