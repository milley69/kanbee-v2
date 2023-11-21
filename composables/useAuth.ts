import type { DoneError, User } from '@/types'

export const useAuth = () => {
  const { setUser, removeUser, setAccess } = useUser()
  const { accessToken } = storeToRefs(useUser())
  // const { initProject } = useProjects()
  const { removeProjects } = useProjectsStore()
  const { $URL } = useNuxtApp()
  const { setToast } = useToast()
  const { initProjects } = useProjects()
  const { WSProject } = useProjects()

  const signUp = async (email: string, password: string, username: string) => {
    const { done, error } = await $fetch<DoneError>(`${$URL}/auth/sign-up`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({ email, password, username }),
    })

    if (done) return done
    setToast('error', error)
    return false
  }

  const signIn = async (email: string, password: string) => {
    try {
      const data = await $fetch<Record<'accessToken', string>>(`${$URL}/auth/sign-in`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({ email, password }),
      })
      if (data.accessToken) {
        setAccess(data.accessToken)
        await getUser()
        return true
      }
    } catch (error: any) {
      console.log(error.toString())
      return false
    }
  }
  const signInGithub = async () => {
    // const data = await $fetch(`${$URL}/auth/github`, {
    //   method: 'GET',
    //   credentials: 'include',
    //   mode: 'cors',
    //   redirect: 'follow',
    // }).then((res: any) => {
    //   if (res.redirected) {
    //     window.location.href = res.url
    //   }
    // })
    // console.log('data ', data)
    window.location.assign(`${$URL}/auth/github`)
  }

  const logOut = async () => {
    await $fetch<Record<'accessToken', string>>(`${$URL}/auth/logout`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    })
    removeUser()
    removeProjects()
  }

  const amIAuth = async () => {
    const data = await $fetch<string>(`${$URL}/auth/am-i-auth`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    })
    if (!data) return
    setAccess(data)
    getUser(true)
  }

  const getUser = async (isMounted = false) => {
    const data = await $fetch<User>(`${$URL}/user/init`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { Authorization: accessToken.value },
    })
    if (!data) return
    setUser(data)
    if (isMounted) {
      initProjects()
      WSProject(data)
    }
  }

  return { signIn, signUp, signInGithub, logOut, amIAuth, getUser }
}
