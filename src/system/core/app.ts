import Vue, { ComponentOptions } from 'vue'
import VueRouter from 'vue-router'

import App from '../components/App'

import ViewCache from './view-cache'

export interface AppConfig extends ComponentOptions<Vue> {
  router: VueRouter
  layouts: Record<string, any>
}

export async function createApp(config: AppConfig): Promise<Vue> {
  const { router, layouts, ...options } = config
  const viewCache = new ViewCache(router)

  return new Vue({
    router,
    ...options,
    render: h => {
      return h(App, {
        props: { viewCache, layouts }
      })
    }
  })
}
