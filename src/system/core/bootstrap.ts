import 'reflect-metadata'

import Vue from 'vue'

import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false

type Main = () => Promise<Vue> | Vue

export async function setup(main: Main): Promise<void> {
  const app = await main()

  if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    window.app = app
  }

  app.$mount('#app')
}
