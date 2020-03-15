<template>
  <div class="navbar">
    <navbar-brand></navbar-brand>
    <div class="nav">
      <slot name="left"></slot>
    </div>
    <div class="nav">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import NavbarBrand from './navbar-brand.vue'

export default {
  name: 'navbar',
  components: {
    'navbar-brand': NavbarBrand
  }
}
</script>

<style lang="scss">
.navbar {
  position: relative;
  z-index: 3;
  display: flex;
  height: 50px;
  line-height: 50px;
}

.nav {
  flex: 1;
}
</style>
