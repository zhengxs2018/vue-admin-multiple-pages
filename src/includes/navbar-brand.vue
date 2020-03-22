<template>
  <div
    class="navbar-brand"
    :class="{ 'navbar-brand--collapsed': layout.collapsed }"
    @click="goHome()"
  >
    <img class="logo" :src="site.logo" />
    <span class="title">{{ site.title }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'navbar-brand',
  computed: mapState('app', ['site', 'layout']),
  methods: {
    goHome() {
      window.location.href = '/'
    }
  }
}
</script>

<style lang="scss">
.navbar-brand {
  width: 200px;
  padding-left: 8px;
  padding-right: 8px;
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  &--collapsed {
    width: 64px;
  }

  .logo {
    display: inline-block;
    padding-right: 8px;
    height: 32px;
    vertical-align: -10px;
    max-height: 100%;
  }

  .title {
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
