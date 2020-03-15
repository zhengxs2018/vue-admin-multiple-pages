<template>
  <i-layout class="layout user-layout">
    <i-header class="layout-header">
      <navbar />
    </i-header>
    <i-layout>
      <i-content>
        <slot />
      </i-content>
    </i-layout>
  </i-layout>
</template>

<script>
import BaseLayout from './classes/layout'

export default {
  name: 'user',
  extends: BaseLayout
}
</script>
