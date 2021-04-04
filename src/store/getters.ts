import { Message, Room, Settings } from '@/models'
import { GetterTree } from 'vuex'
import { State } from './state'

export interface Getters {
  username(state: State): string | undefined

  settings(state: State): Settings | undefined
  rooms(state: State): Room[] | undefined
  history(state: State): Message[] | undefined

  currentRoom(state: State): Room | undefined
}

export const getters: GetterTree<State, State> & Getters = {
  username: state => state.username,

  settings: state => state.settings,
  rooms: state => state.rooms?.sort(sortRooms),
  history: state => state.history,

  currentRoom: state => state.currentRoom,
}

function sortRooms(a: Room, b: Room) {
  return a.lastMessage.created > b.lastMessage.created ? 0 : 1
}
