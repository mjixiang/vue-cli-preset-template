import { SETTINGS } from 'config/constant'
import { getStorage, setStorage } from 'utils/index.js'
// import i18n from '../../i18n'
const timezone = -(new Date().getTimezoneOffset() / 60)
let storage = getStorage(SETTINGS)
const state = Object.assign({
  version: '0.1.0',
  theme: 'default',
  lang: 'CN',
  timezone
}, storage || {})
const getters = {
}

const mutations = {
  changeTheme (state, themeName) {
    state.config.theme = themeName || 'default'
    setStorage(SETTINGS, state.config)
    document.documentElement.className = state.config.theme
  },
  initTheme (state) {
    document.documentElement.className = state.config.theme === 'default' ? '' : state.config.theme
  }
  // changeLanguage (state, lang) {
  //   state.lang = lang
  //   i18n.locale = lang
  //   setStorage(SETTINGS, { ...state, lang })
  // }
}
const actions = {
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}
