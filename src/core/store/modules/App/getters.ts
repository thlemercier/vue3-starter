/**
 * compute derived state based on store state
 * a getter's result is cached based on its dependencies, and will only re-evaluate when some of its dependencies have changed.
 */
import { GetterTree } from 'vuex'
import { AppStore } from '../..'
import { AppModuleGetters, AppModuleState } from '../../typings/app.module.interface'

const getters: GetterTree<AppModuleState, AppStore> & AppModuleGetters = {
  // doubledCounter: (state) => {
  //   return state.counter * 2
  // },
}

export default getters
