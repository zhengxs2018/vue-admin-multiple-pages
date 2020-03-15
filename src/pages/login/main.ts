import Vue from 'vue'

import { AbstractAppBootHooks, startup } from '@/system/core/bootstrap'

import App from './app'

class AppBootHooks extends AbstractAppBootHooks {
  createApp() {
    return new Vue({
      render: h => h(App)
    })
  }
}

startup(new AppBootHooks())
