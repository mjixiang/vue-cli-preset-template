import Vue from 'vue'
import store from './store'
import router from './router'
<%_ if (i18n) { _%>
import i18n from './i18n'
<%_ } _%>
import * as Utils from './utils'
import * as Runtime from './utils/runtime'
import './assets/common.scss'

import App from './App'

Vue.prototype.$utils = Utils
Vue.prototype.$runtime = Runtime

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  <%_ if (i18n) { _%>
  i18n,
  <%_ } _%>
  template: '<App/>',
  components: { App }
})

if (!sessionStorage.getItem('console_logo')) {
  console.log('%c ', 'background: url(http://assets.mjixiang.top/xag.png) no-repeat center/cover;padding-left: 280px;padding-top:40px;')
  sessionStorage.setItem('console_logo', 'yes')
}
