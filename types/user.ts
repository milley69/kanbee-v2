export interface UserPinia {
  user: User | null
  accessToken: string
  status: authStatus
  errorForm: userForm
}

export interface User {
  id: string
  email: string
  username: string
  avatar: string
  cycleTimer: number
  createdProjects: number
  projectsId: number[]
  invites: Invites[]
  createdAt: Date
  roles: Roles[]
  provider: Provider | null
}

export interface Invites {
  id: number
  title: string
}

export enum Roles {
  USER,
  ADMIN,
}

export type Provider = 'GOOGLE' | 'GITHUB'

export type userForm = Record<'name' | 'email' | 'password', string>
export type authStatus = 'authenticated' | 'unauthenticated' | 'loading'
