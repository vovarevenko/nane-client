import { Message } from '@/models'
import { MutationType, store } from '@/store'

let socket: WebSocket

export function useSocket(username?: string): WebSocket | undefined {
  if (username) {
    const url = `${process.env.VUE_APP_SOCKET}?username=${username}`

    if (socket) {
      if (socket.url === url) {
        return socket
      } else {
        socket.close()
      }
    }

    socket = new WebSocket(url)
    socket.onmessage = socketOnMessage
  }

  return socket
}

function socketOnMessage(msg: MessageEvent): void {
  const message = JSON.parse(msg.data) as Message
  store.commit(MutationType.ProcessMessage, {
    roomName: message.room,
    message,
  })
}
