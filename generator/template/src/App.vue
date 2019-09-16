<template>
  <transition :name="slideAnimate">
    <router-view id="app"></router-view>
  </transition>
</template>

<script>
export default {
  name: 'xag-app',
  data () {
    return {
      slideAnimate: 'fade'
    }
  }
}
</script>
