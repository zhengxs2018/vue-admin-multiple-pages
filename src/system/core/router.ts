import Vue from 'vue'
import VueRouter, { RouterOptions } from 'vue-router'

import { dynamicLoader } from '../utils/functional'

Vue.use(VueRouter)

export function loadRoutes(context: __WebpackModuleApi.RequireContext) {
  return dynamicLoader({
    context,
    resolver(routes, current) {
      // @ts-ignore
      return routes.concat(current || [])
    }
  })
}

export function createRouter(options: RouterOptions) {
  const router = new VueRouter({
    mode: 'history',
    ...options
  })

  // 仅允许调试使用
  if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    window.router = router
  }

  return router
}
