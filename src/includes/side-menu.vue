<template>
  <i-menu
    class="side-menu"
    :active-name="$route.name"
    width="auto"
    accordion
    @on-select="onMenuActive"
  >
    <i-menu-item name="home">
      <i-icon type="ios-home"></i-icon>
      <span>首页</span>
    </i-menu-item>
    <i-menu-item name="product-list">
      <i-icon type="ios-home"></i-icon>
      <span>产品列表</span>
    </i-menu-item>
  </i-menu>
</template>

<script>
import { mapState } from 'vuex'

import { Menu, MenuItem, Icon } from 'view-design'

export default {
  name: 'side-menu',
  computed: mapState('app', {
    isCollapsed(state) {
      return state.layout.collapsed
    }
  }),
  methods: {
    onMenuActive(name) {
      if (this.$route.name === name) return
      this.$router.push({ name })
    }
  },
  components: {
    'i-menu': Menu,
    'i-menu-item': MenuItem,
    'i-icon': Icon
  }
}
</script>

<style lang="scss">
.side-menu {
  height: 100%;
}
</style>
