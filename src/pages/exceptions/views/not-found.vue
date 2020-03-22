<template>
  <div class="page notfound-page">
    <h2 class="title">404</h2>
    <p class="message">Page not found!</p>
  </div>
</template>

<script>
export default {
  name: 'not-found',
  mounted() {
    document.dispatchEvent(new Event('custom-render-ready'))
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/page.scss';

.notfound-page {
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
