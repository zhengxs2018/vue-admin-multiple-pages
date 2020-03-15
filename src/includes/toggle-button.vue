<template>
  <div class="toggle-button" @click="toggleLayoutCollapsed()">
    <i-icon class="toggle-button__icon" type="ios-menu" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import { Icon } from 'view-design'

export default {
  name: 'toggle-button',
  computed: mapState('app', {
    isCollapsed(state) {
      return state.layout.collapsed
    }
  }),
  methods: mapMutations('app', ['toggleLayoutCollapsed']),
  components: {
    'i-icon': Icon
  }
}
</script>

<style lang="scss">
.toggle-button {
  display: inline-block;
  width: 40px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;

  &__icon {
    display: block;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
  }
}
</style>
