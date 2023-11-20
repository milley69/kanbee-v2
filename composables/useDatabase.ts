import type { User } from '@/types'
export const useDatabase = () => {
  const { $URL } = useNuxtApp()
  const { user, accessToken } = storeToRefs(useUser())
  const { validateUsername } = useValidator()
  const { setToast } = useToast()

  const updateCycleTimer = async () => {
    if (!user.value) return
    await $fetch(`${$URL}/user/timer`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
    })
    user.value.cycleTimer += 1
  }

  const changeUsername = async (username: string) => {
    if (!user.value) return { done: false }
    const { error } = validateUsername(username)
    if (error) {
      setToast('error', error[0].message)
      return { done: false }
    }
    try {
      const _user = user.value
      _user.username = username
      const newUser = await $fetch<User>(`${$URL}/user/`, {
        method: 'PATCH',
        credentials: 'include',
        mode: 'cors',
        headers: { Authorization: accessToken.value },
        body: { user: _user },
      })
      if (!newUser) throw error
      setToast('success', `Congratulations, your name is now ${username}`)
      return { done: true }
    } catch (error) {
      console.log('error: ', error)
      setToast('error', 'Oops, there was an error, try again later.')
      return { done: false }
    }
  }

  const searchUsers = async (emailOrUsername: string) => {
    const users = await $fetch<User[]>(`${$URL}/user/search/${emailOrUsername}`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: { Authorization: accessToken.value },
    })
    return users
  }

  const getFullMembers = async (ids: string[]): Promise<User[]> => {
    const data = await $fetch<User[]>(`${$URL}/user/get-members`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { Authorization: accessToken.value },
      body: { ids },
    })
    return data
  }

  return { updateCycleTimer, changeUsername, searchUsers, getFullMembers }
}
