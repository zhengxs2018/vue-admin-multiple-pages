<template>
  <i-layout class="layout basic-layout">
    <i-header class="layout-header">
      <include-navbar></include-navbar>
    </i-header>
    <i-content>
      <slot />
    </i-content>
  </i-layout>
</template>

<script>
import { mapState } from 'vuex'

import { Layout, Header, Content } from 'view-design'

import Navbar from '@/includes/navbar.vue'

export default {
  name: 'user-layout',
  computed: mapState('app', ['layout']),
  components: {
    'i-layout': Layout,
    'i-header': Header,
    'i-content': Content,
    'include-navbar': Navbar
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/layout.scss';
</style>
