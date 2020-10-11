/**
 * Actions are similar to mutations, the differences being that:
 * Instead of mutating the state, actions commit mutations.
 * Actions can contain arbitrary asynchronous operations.
 */
import { http } from '@/core/services/fetch'
import { MyInterface } from '@/core/typings'
import { ActionTree } from 'vuex'

import { AppStore } from '../..'
import { AppModuleActions, AppModuleActionTypes, AppModuleMutationTypes, AppModuleState } from '../../typings/app.module.interface'

const actions: ActionTree<AppModuleState, AppStore> & AppModuleActions = {
  [AppModuleActionTypes.FETCH_MANDATORY_DATA]: ({ commit }) =>
    new Promise((resolve, reject) => {
      const requests: [Promise<MyInterface[]>] = [
        http.get<MyInterface[]>('/api/myInterfaces'),
      ]

      Promise.all(requests)
        .then(([myInterfaces]) => {
          commit(AppModuleMutationTypes.SET_MY_INTERFACES, { myInterfaces: [...myInterfaces] })
          resolve()
        })
        .catch((error) => {
          console.error(error)
          reject(error)
        })
    }),
}

export default actions
