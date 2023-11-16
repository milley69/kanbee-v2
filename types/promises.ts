import type { Project } from './project'
import type { User } from './user'

export interface DoneError {
  done: boolean
  error: any
}

export interface UserProject {
  user: User
  project: Project
}
export interface UserError {
  user: User | null
  error: any
}
