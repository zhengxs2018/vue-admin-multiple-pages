import { RouteConfig } from 'vue-router'

export default [
  {
    path: '/apps/index',
    component() {
      return import('../views/apps/index.vue')
    },
    meta: {
      layout: {
        name: 'user'
      },
      cache: true
    }
  }
] as RouteConfig[]
