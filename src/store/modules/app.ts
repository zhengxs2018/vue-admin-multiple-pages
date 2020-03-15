import { Module } from 'vuex'

export type AppState = {
  site: {
    title: string
  }
  layout: {
    collapsed: boolean
  }
}

export default {
  namespaced: true,
  state(): AppState {
    return {
      site: {
        title: process.env.VUE_APP_NAME || ''
      },
      layout: {
        collapsed: false
      }
    }
  },
  mutations: {
    toggleLayoutCollapsed(state) {
      const layout = state.layout
      const collapsed = layout.collapsed

      layout.collapsed = !collapsed
    }
  }
} as Module<AppState, any>
