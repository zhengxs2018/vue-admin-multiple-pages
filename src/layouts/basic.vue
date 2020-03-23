<template>
  <i-layout class="layout basic-layout">
    <i-header class="layout-header">
      <include-navbar>
        <!-- <include-toggle-button slot="left" /> -->
      </include-navbar>
    </i-header>
    <i-layout>
      <i-sider
        :value="layout.collapse"
        class="layout-aside"
        collapsible
        hide-trigger
      >
        <include-side-menu />
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

import { Layout, Header, Sider, Content } from 'view-design'

// import ToggleButton from '@/includes/toggle-button.vue'
import SideMenu from '@/includes/side-menu.vue'
import Navbar from '@/includes/navbar.vue'

export default {
  name: 'basic-layout',
  computed: mapState('app', ['layout']),
  components: {
    'i-layout': Layout,
    'i-header': Header,
    'i-sider': Sider,
    'i-content': Content,
    // 'include-toggle-button': ToggleButton,
    'include-side-menu': SideMenu,
    'include-navbar': Navbar
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/layout.scss';
</style>
