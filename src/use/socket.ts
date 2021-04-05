import { Message } from '@/models'
import { MutationType, store } from '@/store'

let socket: WebSocket
let url: string

export function useSocket(username?: string): WebSocket | undefined {
  if (username) {
    url = `${process.env.VUE_APP_SOCKET}?username=${username}`

    if (socket) {
      if (socket.url !== url) {
        socket.close()
      }

      return socket
    }

    socket = connect(url)
  }

  return socket
}

function connect(url: string): WebSocket {
  const socket = new WebSocket(url)
  socket.onmessage = socketOnMessage
  socket.onclose = socketOnClose
  socket.onerror = socketOnError
  return socket
}

function socketOnMessage(msg: MessageEvent): void {
  const message = JSON.parse(msg.data) as Message
  store.commit(MutationType.ProcessMessage, {
    roomName: message.room,
    message,
  })
}

function socketOnClose(error: CloseEvent): void {
  console.error(
    'Socket is closed. Reconnect will be attempted in 1 second.',
    error.reason,
  )
  setTimeout(() => {
    socket = connect(url)
  }, 1000)
}

function socketOnError(): void {
  console.error('Socket error. Closing...')
  socket.close()
}
