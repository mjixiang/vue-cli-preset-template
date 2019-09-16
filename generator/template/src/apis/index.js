import axios from 'axios'
import qs from 'qs'
import router from '../router/index'

export function Get (url) {
  return (params, headers = {}) => _request({
    url,
    method: 'get',
    params: params || null,
    headers: Object.assign({
      'Accept': 'application/json'
    }, headers)
  })
}

export function Post (url) {
  return (body, headers = {}) => _request({
    url,
    method: 'post',
    headers: Object.assign({
      'Accept': 'application/json'
    }, headers),
    data: body
  })
}

export function Delete (url) {
  return (body, headers = {}) => _request({
    url,
    method: 'delete',
    headers: Object.assign({
      'Accept': 'application/json'
    }, headers),
    data: body
  })
}

export function Put (url) {
  return (body, headers = {}) => _request({
    url,
    method: 'put',
    headers: Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, headers),
    data: body
  })
}

async function _request (options) {
  return new Promise((resolve, reject) => {
    var _routerName = router.currentRoute.name
    axios(options).then(({ data }) => {
      (data.status === 200 || data.success === true) ? resolve(data.data) : reject(new Error(data.msg || '未知错误'))
    }).catch(res => {
      if (!res.response) {
        reject(new Error(res.message.includes('timeout') ? '请求超时' : '网络连接失败'))
      } else {
        if (res.response.status === 403) {
          let _currentRouterName = router.currentRoute.name
          if (_routerName !== _currentRouterName) return
          if (_currentRouterName !== 'login') {
            router.replace({ name: 'login', query: { goto: router.currentRoute.fullPath } })
          }
        }
        reject(new Error(typeof res.response.data === 'object' ? res.response.data.msg : res.message))
      }
    })
  })
}

export function querySourceData (method, url) {
  return (params = {}, config = {}) => new Promise((resolve, reject) => {
    if (['get', 'delete'].indexOf(method.toLowerCase()) > -1) {
      params = Object.assign({ params }, config)
    } else {
      params = qs.stringify(params)
    }
    return axios[method](url, params, config).then(({ data }) => {
      resolve(data)
    }).catch((err) => {
      reject(new Error(getErrMessage(err)))
    })
  })
}

function getErrMessage (err) {
  var message = ''
  if (err.message === 'Network Error') {
    message = '网络连接失败，请检查网络状态！'
  } else if (err.response) {
    message = err.response.status === 404 ? '接口地址不存在' : (err.response.status === 400 && err.response.data && err.response.data.message)
  } else {
    message = err.message || '通讯异常'
  }
  return message
}
