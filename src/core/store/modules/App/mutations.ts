/**
 * The only way to actually change state in a Vuex store is by committing a mutation.
 */
import { MutationTree } from 'vuex'
import { AppModuleMutations, AppModuleMutationTypes, AppModuleState } from '../../typings/app.module.interface'

const mutations: MutationTree<AppModuleState> & AppModuleMutations = {
  [AppModuleMutationTypes.SET_MY_INTERFACES] (state, payload) {
    state.myInterfaces = payload?.myInterfaces || []
  },
}

export default mutations
