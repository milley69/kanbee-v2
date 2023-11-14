import { useMessage } from '~/stores/message'
import { useSocket } from '~/stores/socket'

export const useConnectSocket = () => {
  const { $URL } = useNuxtApp()
  const { createConnection } = useSocket()
  const { addMessage } = useMessage()
  const { socket } = storeToRefs(useSocket())

  const connectSocket = () => {
    createConnection($URL)

    socket.value?.on('client-path', (data) => {
      addMessage(JSON.stringify(data))
    })
  }

  return { connectSocket }
}
