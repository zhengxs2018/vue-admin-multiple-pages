<template>
  <i-layout class="layout basic-layout">
    <i-header class="layout-header">
      <navbar>
        <template slot="left">
          <toggle-button />
        </template>
      </navbar>
    </i-header>
    <i-layout>
      <i-sider
        :value="isCollapsed"
        class="layout-aside"
        collapsible
        hide-trigger
      >
        <side-menu />
      </i-sider>
      <i-layout>
        <i-content>
          <slot />
        </i-content>
      </i-layout>
    </i-layout>
  </i-layout>
</template>

<script>
import { mapState } from 'vuex'

import { Sider } from 'view-design'

import ToggleButton from '@/includes/toggle-button.vue'
import SideMenu from '@/includes/side-menu.vue'

import BaseLayout from './classes/layout'

export default {
  name: 'basic',
  extends: BaseLayout,
  computed: mapState('app', {
    isCollapsed(state) {
      return state.layout.collapsed
    }
  }),
  components: {
    'i-sider': Sider,
    'toggle-button': ToggleButton,
    'side-menu': SideMenu
  }
}
</script>
