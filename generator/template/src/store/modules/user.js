import { USERINFOKEY } from 'config/constant'
import { getStorage, setStorage, removeStorage } from 'utils/index.js'
import { Login, Logout } from 'apis/user'

let userinfo = getStorage(USERINFOKEY)

const state = {
  info: userinfo || null
}
const getters = {
  // role: (state, getters) => state.info && state.info.role
}

const mutations = {
  setUserInfo (state, info) {
    info ? setStorage(USERINFOKEY, info) : removeStorage(USERINFOKEY)
    state.info = info || null
  }
}
const actions = {
  login ({ commit }, query) {
    return Login(query).then(data => {
      commit('setUserInfo', data)
      return data
    })
  },
  logout ({ commit }) {
    return Logout().then(() => {
      commit('setUserInfo')
    })
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}
