import { createRouter } from '@/system/core/router'

import Login from './views/auth/Login.vue'

const router = createRouter({
  routes: [
    {
      path: '/login',
      component: Login
    }
  ]
})

router.addRoutes([
  // fallback
  { path: '*', redirect: to => ({ path: '/login', query: to.query }) }
])

export default router
