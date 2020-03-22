import { RouteConfig } from 'vue-router'

import List from '../views/product/list.vue'

export default [
  {
    name: 'product-list',
    path: '/product/list',
    component: List,
    meta: {
      layout: {
        name: 'user'
      },
      cache: true
    }
  }
] as RouteConfig[]
