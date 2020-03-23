import http from '@/system/lib/http'

import { createApp } from '@/system/core/app'
import { setup } from '@/system/core/bootstrap'

import BasicLayout from '@/layouts/basic.vue'
import UserLayout from '@/layouts/user.vue'

import store from '@/store'

import router from './router'

const layouts = {
  basic: BasicLayout,
  user: UserLayout
}

async function initialState() {
  store.commit('app/onMenuLoad', await http.get('/api/v1/admin/menus'))
}

setup(async () => {
  await initialState()
  return createApp({ router, store, layouts })
})
