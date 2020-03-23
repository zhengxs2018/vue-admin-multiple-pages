import { RouteConfig } from 'vue-router'

export default [
  {
    path: '/blog/posts',
    component() {
      return import('../views/blog/posts/index.vue')
    },
    meta: {
      cache: true
    }
  },
  {
    path: '/blog/topics',
    component() {
      return import('../views/blog/topics/index.vue')
    },
    meta: {
      cache: true
    }
  }
] as RouteConfig[]
