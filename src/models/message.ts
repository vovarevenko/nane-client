export interface Message {
  room: string
  created: string
  sender: {
    username: string
  }
  text: string
}
