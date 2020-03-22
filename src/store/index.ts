import Vue from 'vue'
import Vuex, { Store, Plugin } from 'vuex'
import createLogger from 'vuex/dist/logger'

import app, { AppState } from './modules/app'

Vue.use(Vuex)

export type RootState = {
  app: AppState
}

const plugins: Plugin<RootState>[] = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

const store = new Store<RootState>({
  strict: process.env.NODE_ENV === 'development',
  modules: { app },
  plugins: plugins
})

// 仅允许调试使用
if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.store = store
}

export default store
