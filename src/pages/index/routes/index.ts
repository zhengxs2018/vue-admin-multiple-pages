import { RouteConfig } from 'vue-router'

import Home from '../views/index/home.vue'

export default [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: {
      cache: true
    }
  }
] as RouteConfig[]
