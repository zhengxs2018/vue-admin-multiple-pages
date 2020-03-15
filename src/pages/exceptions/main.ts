import Vue from 'vue'

import { AbstractAppBootHooks, startup } from '@/system/core/bootstrap'

import App from './app'
import router from './router'

class AppBootHooks extends AbstractAppBootHooks {
  createApp() {
    return new Vue({
      router,
      render: h => h(App)
    })
  }
}

startup(new AppBootHooks())
