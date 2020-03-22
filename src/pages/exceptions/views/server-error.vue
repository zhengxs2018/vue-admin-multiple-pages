<template>
  <div class="page server-error-page">
    <h2 class="title">500</h2>
    <p class="message">Server error.</p>
  </div>
</template>

<script>
export default {
  name: 'server-error',
  mounted() {
    document.dispatchEvent(new Event('custom-render-ready'))
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/page.scss';

.server-error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 30px;
  text-align: center;
}

.message {
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
}
</style>
