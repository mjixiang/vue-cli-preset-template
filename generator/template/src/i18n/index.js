import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import { SETTINGS } from 'config/constant'
// import { getStorage } from 'utils/index.js'
// import ELEMENT_CN from 'element-ui/lib/umd/locale/zh-CN'
// import ELEMENT_EN from 'element-ui/lib/umd/locale/en'
import APP_CN from './cn.json'
import APP_EN from './en.json'

Vue.use(VueI18n)

// let settings = getStorage(SETTINGS)

const CN = {
  '语言': 'CN',
  ...APP_CN,
  // ...ELEMENT_CN
}

const EN = {
  '语言': 'EN',
  ...APP_EN
  // ...ELEMENT_EN
}

const i18n = new VueI18n({
  // locale: settings ? settings.lang : 'CN',
  locale: 'CN',
  fallbackLocale: 'CN',
  messages: { CN, EN }
})

// ELEMENT.i18n((key, value) => i18n.t(key, value))

export default i18n
