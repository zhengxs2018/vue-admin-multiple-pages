<template>
  <ux-menu
    class="side-menu"
    :active-name="$route.path"
    :items="layout.sidebar"
    :index-key="getIndexKey"
    width="auto"
    accordion
    @on-select="onMenuActive"
  >
  </ux-menu>
</template>

<script lang="ts">
import { mapState } from 'vuex'

import { MenuItem } from '@/store/modules/app'

import UXMenu from '@/system/components/menu'

export default {
  name: 'side-menu',
  computed: mapState('app', ['layout']),
  methods: {
    getIndexKey(type: string, props: MenuItem) {
      return type === 'submenu' ? props['id'] : props['path']
    },
    onMenuActive(this: Vue, path: string) {
      if (this.$route.path === path) return
      this.$router.push(path)
    }
  },
  components: {
    'ux-menu': UXMenu
  }
}
</script>

<style lang="scss">
.side-menu {
  height: 100%;
}
</style>
