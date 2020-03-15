import Vue from 'vue'

import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false

export abstract class AbstractAppBootHooks {
  init(): Promise<void> | void {
    // pass
  }

  abstract createApp(): Vue

  mounted(): Promise<void> | void {
    // pass
  }

  catchError(error: Error): void {
    console.log('[error]', error.message)
  }
}

function mountApp(app: Vue): Vue {
  if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    window.app = app
  }
  return app.$mount('#app')
}

export async function startup(hooks: AbstractAppBootHooks): Promise<void> {
  try {
    await hooks.init()
    mountApp(await hooks.createApp())
    await hooks.mounted()
  } catch (error) {
    hooks.catchError(error)
  }
}
