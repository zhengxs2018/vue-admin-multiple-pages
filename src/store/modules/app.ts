import { Module } from 'vuex'

interface MenuItem {
  text: string
  link: string
  target: string
  rel: string
}

export interface NavIem extends MenuItem {
  children: NavIem[]
}

export interface SideItem extends MenuItem {
  collapse: boolean
  children: SideItem[]
}

export type AppState = {
  /* 站点信息 */
  site: {
    logo: string
    title: string
  }
  /* 布局配置 */
  layout: {
    /* 顶部导航 */
    nav: NavIem[]
    /* 侧边栏菜单 */
    sidebar: SideItem[]
    /* 是否收起侧边栏菜单 */
    collapsed: boolean
  }
}

export default {
  namespaced: true,
  state(): AppState {
    return {
      site: {
        logo: require('@/assets/images/logo.png'),
        title: process.env.VUE_APP_NAME || ''
      },
      layout: {
        nav: [],
        sidebar: [],
        collapsed: false
      }
    }
  },
  mutations: {
    toggleLayoutCollapsed(state) {
      const layout = state.layout

      layout.collapsed = !layout.collapsed
    }
  }
} as Module<AppState, any>
