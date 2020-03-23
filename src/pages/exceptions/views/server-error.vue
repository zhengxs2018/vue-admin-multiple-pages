<template>
  <ux-page>
    <div class="msg">
      <h2 class="msg-title">500</h2>
      <p class="msg-text">Server error.</p>
    </div>
  </ux-page>
</template>

<script>
import UxPage from '@/system/components/page'

export default {
  name: 'server-error-page',
  mounted() {
    document.dispatchEvent(new Event('custom-render-ready'))
  },
  components: {
    'ux-page': UxPage
  }
}
</script>

<style lang="scss">
.msg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}

.msg-title {
  font-size: 180px;
  text-align: center;
}

.msg-text {
  font-size: 40px;
  text-align: center;
}
</style>
