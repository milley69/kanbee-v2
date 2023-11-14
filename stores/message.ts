import { defineStore } from 'pinia'

export const useMessage = defineStore('MessagePinia', () => {
  const messages = ref<any[]>([])

  const addMessage = (message: any) => {
    messages.value.push(message)
  }

  return { messages, addMessage }
})
