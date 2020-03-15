import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import app, { AppState } from './modules/app'

Vue.use(Vuex)

export type RootState = {
  app: AppState
}

const store = new Store<RootState>({
  strict: process.env.NODE_ENV === 'development',
  modules: { app }
})

// 仅允许调试使用
if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.store = store
}

export default store
