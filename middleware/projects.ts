import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to, from) => {
  const { projectsTitles } = storeToRefs(useProjectsStore())

  if (!projectsTitles.value.includes(to.path.slice(2))) {
    return navigateTo('/')
  }
})
