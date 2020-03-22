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

setup(async () => {
  return createApp({ router, store, layouts })
})
