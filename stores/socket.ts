import { defineStore } from 'pinia'
import type { Socket } from 'socket.io-client'
import io from 'socket.io-client'

export const useSocket = defineStore('SocketPinia', () => {
  const socket = ref<Socket | null>(null)

  const createConnection = (url: string) => {
    socket.value = io(url)

    socket.value.on('connect', () => {
      console.log('connect')
    })
    socket.value.on('disconnect', (err) => {
      console.log('disconnect')
    })
  }

  return { socket, createConnection }
})
