<template>
  <div class="page login-page">
    This is local login page.
  </div>
</template>

<script>
export default {
  name: 'Login',
  mounted() {
    document.dispatchEvent(new Event('custom-render-ready'))
  }
}
</script>

<style lang="scss"></style>
