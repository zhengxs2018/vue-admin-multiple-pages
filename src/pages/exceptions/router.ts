import { createRouter } from '@/system/core/router'

import NotFound from '@/pages/exceptions/views/NotFound.vue'

const router = createRouter({
  routes: [
    {
      name: 'notfound',
      path: '/404',
      component: NotFound
    }
  ]
})

router.addRoutes([
  {
    path: '*',
    redirect(to) {
      return { name: 'notfound', query: { next: to.fullPath } }
    }
  }
])

export default router
