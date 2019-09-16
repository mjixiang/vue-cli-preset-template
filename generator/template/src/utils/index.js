function formatNumber (n) {
  return n > 9 ? n : '0' + n
}
export { formatNumber }

export function formatTime (ix, template = 'm:s') {
  var sec = formatNumber(ix % 60)
  var min = formatNumber(Math.floor(ix / 60))
  return template.replace('m', min).replace('s', sec)
}

export function formatDateTime (timestamp, template = 'Y-M-D h:m:s') {
  let date = timestamp ? new Date(timestamp) : new Date()
  let ds = {
    Y: date.getFullYear(),
    M: formatNumber(date.getMonth() + 1),
    D: formatNumber(date.getDate()),
    h: formatNumber(date.getHours()),
    m: formatNumber(date.getMinutes()),
    s: formatNumber(date.getSeconds())
  }
  return template.replace(/[YMDhms]/g, s => ds[s])
}

export function formatDateString (str, template = 'Y-M-D') {
  if (!str) return ''
  let [_date, _time] = str.split(' ')
  let [Y, M, D] = _date.split('-')
  let [h, m, s] = _time.split(':')
  return template
    .replace('Y', Y)
    .replace('M', M)
    .replace('D', D)
    .replace('h', h)
    .replace('m', m)
    .replace('s', s)
}

export function timeString2timestamp (str) {
  if (!str) return 0
  let [_date, _time = ''] = str.split(' ')
  let [Y, M, D] = _date.split('-')
  let [h = 0, m = 0, s = 0] = _time.split(':')
  return new Date(Y, parseInt(M) - 1, D, h, m, s).getTime()
}

export function formatHourTime (ix) {
  var sec = formatNumber(ix % 60)
  var hour = formatNumber(Math.floor(ix / 3600))
  var min = formatNumber(Math.floor((ix - hour * 3600) / 60))
  return hour + ':' + min + ':' + sec
}

export function setStorage (key, value, type = 'localStorage') {
  window[type].setItem(
    key,
    typeof value === 'object' ? JSON.stringify(value) : value
  )
}

export function getStorage (key, type = 'localStorage') {
  var value = window[type].getItem(key)
  try {
    if (value) return JSON.parse(value)
    return value
  } catch (err) {
    return value
  }
}

export function removeStorage (key, type = 'localStorage') {
  window[type].removeItem(key)
}

export function copy (obj) {
  return typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj
}

export function setSessionStorage (key, value) {
  setStorage(key, value, 'sessionStorage')
}

export function getSessionStorage (key) {
  return getStorage(key, 'sessionStorage')
}

export function removeSessionStorage (key) {
  return removeStorage(key, 'sessionStorage')
}

export function urlQueryString (url, params) {
  let querys = []
  for (let key in params) {
    let value = params[key]
    if (value !== undefined && value !== null) querys.push(`${key}=${value}`)
  }
  return url + (querys.length ? '?' + querys.join('&') : '')
}

export function setDocumentTitle (title, subtitle = '') {
  if (subtitle && (title + '').indexOf(subtitle) === -1) {
    title = `${title}-${subtitle}`
  }
  document.title = title
}
