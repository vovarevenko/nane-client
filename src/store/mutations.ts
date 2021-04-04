import { Message, Room, Settings } from '@/models'
import { MutationTree } from 'vuex'
import { State } from './state'

export enum MutationType {
  SetUsername = 'SET_USERNAME',

  SetSettings = 'SET_SETTINGS',
  SetRooms = 'SET_ROOMS',
  SetHistory = 'SET_HISTORY',

  SetCurrentRoom = 'SET_CURRENT_ROOM',
  CreateRoom = 'CREATE_ROOM',
  ProcessMessage = 'PROCESS_MESSAGE',
}

interface UpdateLastMessagePayload {
  roomName: string
  message: Message
}

export type Mutations = {
  [MutationType.SetUsername](state: State, username: string | undefined): void

  [MutationType.SetSettings](state: State, settings: Settings | undefined): void
  [MutationType.SetRooms](state: State, rooms: Room[] | undefined): void
  [MutationType.SetHistory](state: State, history: Message[] | undefined): void

  [MutationType.SetCurrentRoom](state: State, room: Room | undefined): void
  [MutationType.ProcessMessage](
    state: State,
    payload: UpdateLastMessagePayload,
  ): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetUsername](state, username) {
    state.username = username
  },

  [MutationType.SetSettings](state, settings) {
    state.settings = settings
  },

  [MutationType.SetRooms](state, rooms) {
    state.rooms = rooms
  },

  [MutationType.SetHistory](state, history) {
    state.history = history
  },

  [MutationType.SetCurrentRoom](state, room) {
    state.currentRoom = room
  },

  [MutationType.ProcessMessage](state, { roomName, message }) {
    if (!state.rooms) return

    const roomIndex = state.rooms?.findIndex(el => el.name === roomName)

    if (roomIndex !== -1) {
      state.rooms[roomIndex].lastMessage = message
    } else {
      state.rooms.push({ name: roomName, lastMessage: message })
    }

    if (state.currentRoom?.name === roomName) {
      state.history?.push(message)
    }
  },
}
