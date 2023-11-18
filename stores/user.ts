import { Roles, type User, type UserPinia, type authStatus } from '@/types'
import { defineStore } from 'pinia'

export const useUser = defineStore('UserPinia', {
  state: (): UserPinia => ({
    user: null,
    accessToken: '',
    status: 'unauthenticated',
    errorForm: {
      name: '',
      email: '',
      password: '',
    },
  }),
  getters: {
    isAuth({ status, accessToken }): boolean {
      return accessToken.length > 0
    },
    isAdmin({ user }): boolean {
      return user ? user.roles.includes(Roles.ADMIN) : false
    },
  },
  actions: {
    changeStatus(status: authStatus) {
      this.status = status
    },
    setAccess(token: string) {
      this.accessToken = token
      this.changeStatus('authenticated')
    },
    setUser(user: User) {
      this.user = user
      this.changeStatus('authenticated')
    },
    removeUser() {
      this.user = null
      this.accessToken = ''
      this.changeStatus('unauthenticated')
      useRouter().push('/sign-in')
    },
    setError(to: 'name' | 'email' | 'password', error: string) {
      this.errorForm[to] = error
    },
    removeError() {
      this.errorForm = { name: '', email: '', password: '' }
    },
  },
})
