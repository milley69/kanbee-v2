import type { Toast, ToastType } from '@/types'
import { defineStore } from 'pinia'

export const useToast = defineStore('toastPinia', () => {
  const toasts = ref(<Toast[]>[])

  const toastsLen = computed(() => toasts.value.length)

  const setToast = (type: ToastType, messageOrError: unknown, duration: number = 4000) => {
    let message: string = ''
    const durationToast = duration * (toastsLen.value + 1)
    if (messageOrError instanceof Error) message = messageOrError.message
    if (typeof messageOrError === 'string') message = messageOrError

    const toast: Toast = {
      message,
      type,
      id: Math.floor(Number(new Date()) * Math.random()),
      duration: durationToast,
    }

    toasts.value.push(toast)
    setTimeout(removeToast.bind(this), durationToast, toast)
  }
  const setToastWithoutDuration = (type: ToastType, message: string) => {
    const durationToast = 0 * (toastsLen.value + 1)

    const toast: Toast = {
      message,
      type,
      id: Math.floor(Number(new Date()) * Math.random()),
      duration: durationToast,
    }
    toasts.value.push(toast)

    return toast
  }

  const removeToast = (toast: Toast) => {
    toasts.value = toasts.value.filter((t) => t.id != toast.id)
  }

  return { toasts, setToast, removeToast, setToastWithoutDuration }
})
