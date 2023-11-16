export * from './project'
export * from './promises'
export * from './user'

/* PROFILE STATS */

export interface IStats {
  title: string
  value?: string | number
  desc: string
}

/* QUOTES */

export interface Quotes {
  text: string
  username: string
  avatar: string
}

/* TIMER */

export interface ITimer {
  pomodoro: number
  break: number
  longBreak: number
}

export type StatusTimer = 'pomodoro' | 'break' | 'longBreak'

/* TOAST */

export interface Toast {
  message: string
  type: ToastType
  duration: number
  id: number
}

export type ToastType = 'info' | 'success' | 'warning' | 'error'
