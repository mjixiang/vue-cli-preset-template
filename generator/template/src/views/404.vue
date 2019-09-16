<template>
  <div style="text-align: center;">
    <h2 class="txt-404">404</h2>
    <router-link class="xag-button xag-bg-theme" :to="{ path: '/' }"
      >{{ $t('返回首页') }}</router-link
    >
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.txt-404 {
  text-align: center;
  margin: 120px 0;
  font-size: 40px;
}
.xag-button {
  display: inline-block;
  border-radius: 32px;
  margin-top: 20px;
}
</style>
