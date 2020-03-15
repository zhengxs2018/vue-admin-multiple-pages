import { createRouter, loadRoutes } from '@/system/core/router'

import NotFound from '@/pages/exceptions/views/NotFound.vue'

const router = createRouter({
  routes: loadRoutes(require.context('./routes', true, /\.ts$/))
})

router.addRoutes([{ path: '*', component: NotFound }])

export default router
