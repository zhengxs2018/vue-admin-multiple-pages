import { RouteConfig } from 'vue-router'

import Home from '../views/index/home.vue'

export default [
  {
    name: 'product-list',
    path: '/product/list',
    component: Home,
    meta: {
      layout: 'user'
    }
  }
] as RouteConfig[]
