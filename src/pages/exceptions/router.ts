import { createRouter } from '@/system/core/router'

import ServerError from '@/pages/exceptions/views/server-error.vue'
import NotFound from '@/pages/exceptions/views/not-found.vue'

const router = createRouter({
  routes: [
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '/500',
      component: ServerError
    }
  ]
})

router.addRoutes([
  // fallback
  { path: '*', redirect: '/404' }
])

export default router
