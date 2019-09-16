import Vue from 'vue'
import Router from 'vue-router'
import { setDocumentTitle } from 'utils/index'
import entry from './entry'
import home from './home'
import store from '../store'

Vue.use(Router)

let router = new Router({
  // mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    ...entry,
    ...home,
    {
      path: '/debug',
      name: 'debug',
      component: resolve => require(['views/debug'], resolve),
      meta: {
        title: '调试'
      }
    },
    {
      path: '*',
      name: '404',
      component: resolve => require(['views/404'], resolve),
      meta: {
        title: '404'
      }
    }
  ]
})

const loginWhiteList = ['login', 'register', '404', 'debug']
router.beforeEach((to, from, next) => {
  if (!loginWhiteList.includes(to.name) && !store.state.user.info) {
    next({ name: 'login', query: { goto: to.fullPath } })
    setDocumentTitle('登录', '{{VUE_APP_TITLE}}')
  } else {
    next()
  }
})

export default router
