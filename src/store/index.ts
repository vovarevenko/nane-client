import {
  CommitOptions,
  createStore,
  DispatchOptions,
  Store as VuexStore,
} from 'vuex'
import { Actions, actions } from './actions'
import { Getters, getters } from './getters'
import { Mutations, mutations } from './mutations'
import { State, state } from './state'
import persistentState from './plugins/persistentState'

export { ActionType } from './actions'
export { MutationType } from './mutations'

export const store: Store = createStore<State>({
  state,
  getters,
  mutations,
  actions,

  plugins: [persistentState],
})

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
} & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<Actions[K]>
}
