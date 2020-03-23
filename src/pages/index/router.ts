import { createRouter, loadRoutes } from '@/system/core/router'

import store from '@/store'

import NotFound from '@/pages/exceptions/views/not-found.vue'

const router = createRouter({
  routes: loadRoutes(require.context('./routes', true, /\.ts$/))
})

router.afterEach(to => {
  store.commit('app/onRouteChange', to)
})

router.addRoutes([
  // fallback
  { path: '*', component: NotFound, meta: { layout: 'user' } }
])

export default router
