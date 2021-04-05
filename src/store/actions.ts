import camelcaseKeys from 'camelcase-keys'
import { ActionContext as BaseActionContext, ActionTree } from 'vuex'
import { router } from '@/router'
import { Getters } from '@/store/getters'
import { Mutations, MutationType } from '@/store/mutations'
import { State } from '@/store/state'
import { useAxios } from '@/use/axios'
import { useSocket } from '@/use/socket'

const axios = useAxios()

export enum ActionType {
  Bootstrap = 'BOOTSTRAP',

  FetchSettings = 'FETCH_SETTINGS',
  FetchRooms = 'FETCH_ROOMS',
  FetchHistory = 'FETCH_HISTORY',

  SendMessage = 'SEND_MESSAGE',
  CreateRoom = 'CREATE_ROOM',
  ChangeUsername = 'CHANGE_USERNAME',
}

type ActionContext = {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
  ): ReturnType<Actions[K]>
} & Omit<BaseActionContext<State, State>, 'getters' | 'commit' | 'dispatch'>

interface SendMessagePayload {
  roomName: string
  text: string
}

export type Actions = {
  [ActionType.Bootstrap](ctx: ActionContext): Promise<void>

  [ActionType.FetchSettings](ctx: ActionContext): Promise<void>
  [ActionType.FetchRooms](ctx: ActionContext): Promise<void>
  [ActionType.FetchHistory](ctx: ActionContext, roomName: string): Promise<void>

  [ActionType.SendMessage](
    ctx: ActionContext,
    payload: SendMessagePayload,
  ): Promise<void>

  [ActionType.CreateRoom](ctx: ActionContext, name: string): Promise<void>

  [ActionType.ChangeUsername](
    ctx: ActionContext,
    username: string,
  ): Promise<void>
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionType.Bootstrap]({ commit, dispatch, getters }) {
    await dispatch(ActionType.FetchSettings)
    await dispatch(ActionType.FetchRooms)

    if (getters.username) {
      if (!getters.username.trim()) {
        commit(MutationType.SetUsername, undefined)
        router.push('/login')
      } else {
        useSocket(getters.username)
      }
    }
  },

  async [ActionType.FetchSettings]({ commit }) {
    try {
      const res = await axios.get('settings')
      commit(MutationType.SetSettings, camelcaseKeys(res.data.result))
    } catch (error) {
      console.error(error)
    }
  },

  async [ActionType.FetchRooms]({ commit }) {
    try {
      const res = await axios.get('rooms')
      commit(MutationType.SetRooms, camelcaseKeys(res.data.result))
    } catch (error) {
      console.error(error)
    }
  },

  async [ActionType.FetchHistory]({ commit }, roomName) {
    try {
      const res = await axios.get(`rooms/${roomName}/history`)
      commit(MutationType.SetHistory, camelcaseKeys(res.data.result))
    } catch (error) {
      console.error(error)
    }
  },

  async [ActionType.SendMessage](_, { roomName, text }) {
    const socket = useSocket()

    if (!socket) throw new Error('No socket connection')

    socket.send(JSON.stringify({ room: roomName, text }))
  },

  async [ActionType.CreateRoom]({ dispatch }, name) {
    await dispatch(ActionType.SendMessage, {
      roomName: name,
      text: 'Я создал комнату!',
    })
  },

  async [ActionType.ChangeUsername]({ commit }, username) {
    commit(MutationType.SetUsername, username)
    useSocket(username)
  },
}
