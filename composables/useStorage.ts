import type { User } from '~/types'

export const useStorage = () => {
  const { $URL } = useNuxtApp()
  const { accessToken } = storeToRefs(useUser())
  const { setUser } = useUser()

  const updateAvatar = async (formData: FormData) => {
    const user = await $fetch<User>(`${$URL}/files/upload`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { Authorization: accessToken.value },
      body: formData,
    })
    if (!user) return false
    setUser(user)
    return true
  }

  return { updateAvatar }
}
