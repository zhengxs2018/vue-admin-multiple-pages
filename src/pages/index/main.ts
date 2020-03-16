import Vue from 'vue'

import { AbstractAppBootHooks, startup } from '@/system/core/bootstrap'
import { AuthManager } from '@/system/lib/auth/manager'

import store from '@/store'

import App from './app'
import router from './router'

class AppBootHooks extends AbstractAppBootHooks {
  async init() {
    const auth = new AuthManager({
      data: []
    })
    auth.has('user.create')
  }
  createApp() {
    return new Vue({
      store,
      router,
      render: h => h(App)
    })
  }
}

startup(new AppBootHooks())
