import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import { Module } from 'vuex'
import { AppStore } from '../..'
import { AppModuleState } from '../../typings/app.module.interface'

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
} as Module<AppModuleState, AppStore>
