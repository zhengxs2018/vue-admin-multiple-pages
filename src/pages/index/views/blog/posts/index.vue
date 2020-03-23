<template>
  <ux-page class="posts-page">
    <include-breadcrumb slot="header" />

    <i-card :bordered="false" dis-hover style="height: 100%;">
      This is posts page.
    </i-card>
  </ux-page>
</template>

<script>
import { Card } from 'view-design'

import UxPage from '@/system/components/page'
import Breadcrumb from '@/includes/breadcrumb'

export default {
  name: 'posts-page',
  components: {
    'i-card': Card,
    'ux-page': UxPage,
    'include-breadcrumb': Breadcrumb
  }
}
</script>

<style lang="scss" scoped></style>
