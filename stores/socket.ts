import { defineStore } from 'pinia'
import type { Socket } from 'socket.io-client'
import io from 'socket.io-client'

export const useSocket = defineStore('SocketPinia', () => {
  const socket = ref<Socket | null>(null)
  const isConnect = ref<boolean>(true)

  const createConnection = (url: string) => {
    socket.value = io(url)

    socket.value.on('connect', () => {
      isConnect.value = true
    })
    socket.value.on('disconnect', () => {
      isConnect.value = false
    })
  }

  return { socket, isConnect, createConnection }
})
