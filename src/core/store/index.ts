import { createStore, createLogger } from 'vuex'

import app from './modules/App'
import { AppModuleState } from './typings/app.module.interface'

export interface AppStore {
  app: AppModuleState
}

const debug = process.env.NODE_ENV !== 'production'

export default createStore<AppStore>({
  modules: {
    app,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
