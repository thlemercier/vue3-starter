import { ActionContext } from 'vuex'
import { AppStore } from '@/core/store'
import { MyInterface } from '@/core/typings'

// State
export interface AppModuleState {
  myInterfaces: MyInterface[]
}

// Mutations
export enum AppModuleMutationTypes {
  SET_MY_INTERFACES = 'SET_MY_INTERFACES',
}

export type AppModuleMutations<S = AppModuleState> = {
  [AppModuleMutationTypes.SET_MY_INTERFACES](state: S, payload: { myInterfaces: MyInterface[] }): void
}

// Actions
type AugmentedActionContext = {
  commit<K extends keyof AppModuleMutations>(
    key: K,
    payload: Parameters<AppModuleMutations[K]>[1]
  ): ReturnType<AppModuleMutations[K]>
} & Omit<ActionContext<AppModuleState, AppStore>, 'commit'>

export enum AppModuleActionTypes {
  FETCH_MANDATORY_DATA = 'FETCH_MANDATORY_DATA'
}

export interface AppModuleActions {
  [AppModuleActionTypes.FETCH_MANDATORY_DATA]: (
    { commit }: AugmentedActionContext
    // payload: number
  ) => Promise<unknown>
}

// Getters
export type AppModuleGetters = {
  // doubledCounter(state: State): number
}
