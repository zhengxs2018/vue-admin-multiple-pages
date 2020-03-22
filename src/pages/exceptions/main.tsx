import Vue from 'vue'

import { setup } from '@/system/core/bootstrap'

import router from './router'

function createApp() {
  return new Vue({
    router,
    render() {
      return (
        <div id="app">
          <router-view></router-view>
        </div>
      )
    }
  })
}

setup(async () => {
  return createApp()
})
