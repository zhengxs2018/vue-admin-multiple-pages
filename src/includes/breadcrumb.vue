<template>
  <div class="include-breadcrumb">
    <i-breadcrumb>
      <i-breadcrumb-item to="/">
        <i-icon type="ios-home-outline" />
      </i-breadcrumb-item>
      <i-breadcrumb-item v-for="item in layout.breadcrumb" :key="item.id">
        {{ item.text }}
      </i-breadcrumb-item>
    </i-breadcrumb>
    <div class="include-breadcrumb-extra">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Breadcrumb, BreadcrumbItem, Icon } from 'view-design'

export default {
  name: 'include-breadcrumb',
  computed: mapState('app', ['layout']),
  components: {
    'i-breadcrumb': Breadcrumb,
    'i-breadcrumb-item': BreadcrumbItem,
    'i-icon': Icon
  }
}
</script>

<style lang="scss">
.include-breadcrumb {
  display: flex;
  width: 100%;
  height: 35px;
  line-height: 35px;
  padding: 0 16px;
  background: #fff;
  box-sizing: border-box;

  .ivu-breadcrumb {
    flex: 1;
  }

  &-extra {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
