<template>
  <div style="overflow: auto;">
    <div style="margin: 15px;">
      <pre class="success">
        <div v-for="item in items" :key="item.key">{{ item.key }}: {{ item.value }}</div>
      </pre>
    </div>
    <div style="margin: 15px;">
      <pre class="error" v-if="errorText">{{ errorText }}</pre>
      <pre class="success" v-if="position">
        <div>Lat: {{ position.lat }}</div>
        <div>Lng: {{ position.lng }}</div>
        <div>Altitude: {{ position.altitude }} m</div>
        <div>Accuracy: {{ position.accuracy }} m</div>
      </pre>
    </div>
    <div style="margin: 15px;">
      <div @click="onClear" class="xag-button large xag-bg-theme">清除缓存</div>
    </div>
    <div style="margin: 15px;">
      <div @click="onLocate" class="xag-button large xag-bg-orange"><i v-show="isLocating" class="weui-loading"></i> 获取位置</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'debug',
  data () {
    return {
      items: [
        { key: 'WIDTH', value: document.documentElement.clientWidth + ' px' },
        { key: 'HEIGHT', value: document.documentElement.clientHeight + ' px' },
        { key: 'language', value: navigator.language },
        { key: 'userAgent', value: navigator.userAgent }
      ],
      errorText: '',
      isLocating: false,
      position: null
    }
  },
  methods: {
    onClear () {
      localStorage.clear()
      sessionStorage.clear()
      document.cookie = 'xa_token=;expires=' + new Date(Date.now() - 3000).toGMTString()
      alert('操作成功！')
    },
    onLocate () {
      this.isLocating = true
      navigator.geolocation.getCurrentPosition((res) => {
        console.log(res)
        this.isLocating = false
        this.position = { lat: res.coords.longitude, lng: res.coords.latitude, accuracy: res.coords.accuracy }
      }, err => {
        this.isLocating = false
        this.errorText = err.message
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
pre {
  background-color: #f2f2f2;
  padding: 10px 15px;
  white-space: normal;
  &.error {
    box-shadow: inset 3px 0 0 $theme_red;
  }
  &.success {
    box-shadow: inset 3px 0 0 $theme_green;
  }
}
</style>
