import { useSocket } from '@/stores/socket'

export const useConnectSocket = () => {
  const { $URL } = useNuxtApp()
  const { createConnection } = useSocket()

  const connectSocket = () => {
    createConnection($URL)
  }

  return { connectSocket }
}
