import { Message, Room, Settings } from '@/models'

export interface State {
  username?: string

  settings?: Settings
  rooms?: Room[]
  history?: Message[]

  currentRoom?: Room
}

export const state: State = {}
