import { Module } from 'vuex'
import { Route } from 'vue-router'

import { TreeNode, rowToTree, eachTree } from '@/system/utils/tree'

export interface MenuItem extends TreeNode {
  text: string
  path: string
  target: string
  children: MenuItem[]
}

export type AppState = {
  /* 站点信息 */
  site: {
    logo: string
    title: string
  }
  /* 布局配置 */
  layout: {
    /* 侧边栏菜单 */
    sidebar: MenuItem[]
    /* 面包屑导航 */
    breadcrumb: Route[]
    /* 是否收起侧边栏菜单 */
    collapsed: boolean
  }
}

const cache: Record<string, any> = {}

export default {
  namespaced: true,
  state(): AppState {
    return {
      site: {
        logo: require('@/assets/images/logo.png'),
        title: process.env.VUE_APP_NAME || ''
      },
      layout: {
        sidebar: [],
        breadcrumb: [],
        collapsed: false
      }
    }
  },
  mutations: {
    onRouteChange(state, route: Route) {
      const path = route.path
      const menuCache = cache.menus

      if (path in menuCache) {
        state.layout.breadcrumb = menuCache[path]
      } else {
        state.layout.breadcrumb = []
      }
    },
    onMenuLoad(state, payload) {
      const sidebar = rowToTree<MenuItem>(payload)
      const pathsMapping: Record<string, MenuItem[]> = {}

      eachTree<MenuItem>(sidebar, (node, parents) => {
        pathsMapping[node.path] = parents.concat(node)
      })

      cache.menus = pathsMapping
      state.layout.sidebar = sidebar
    },
    onToggleCollapsed(state) {
      const layout = state.layout

      layout.collapsed = !layout.collapsed
    }
  }
} as Module<AppState, any>
