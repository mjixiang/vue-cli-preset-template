import L from 'leaflet'

export function CreateMap (container, options = {}) {
  let tileKeys = options.tileKeys || ['satellite', 'cn_name']
  let sign = options.sign || ''
  let defaultOptions = {
    renderer: L.canvas(),
    preferCanvas: true,
    center: [37.4400, 104.2383],
    zoom: 5,
    zoomControl: false,
    attributionControl: false,
    zoomAnimation: true,
    boxZoom: false,
    minZoom: 3,
    maxZoom: 23,
    keyboard: false,
    editable: true
  }
  let map = L.map(container, Object.assign({}, defaultOptions, options))
  return ObserverMapTiles(map, tileKeys, sign)
}

const urls = {
  satellite: 'http://mt{s}.google.cn/vt/lyrs=s&gl=en&x={x}&y={y}&z={z}',
  black: 'https://api.mapbox.com/styles/v1/maxjixiang/cjnphl17l04jy2rmz0rskayol/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWF4aml4aWFuZyIsImEiOiJjamd5cHBzNW0wNmVlMnhtemZrZTJ6dGI3In0.PJFx1QnbKf7FwaZY0iDe7g',
  cn_name: 'http://t{s}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=d29e6dbe443138767f824c9461b138df',
  en_name: 'http://t{s}.tianditu.com/DataServer?T=eia_w&x={x}&y={y}&l={z}&tk=d29e6dbe443138767f824c9461b138df',
  high: `http://tile{s}.agis.xaircraft.com/data/hmap/public/{z}/{x}/{y}`
}

function ObserverMapTiles (map, tileKeys, sign) {
  map.tiles = {
    satellite: L.tileLayer(urls.satellite, {
      maxZoom: 21,
      subdomains: '0123',
      zIndex: 1
    }),
    black: L.tileLayer(urls.black, {
      maxZoom: 21,
      zIndex: 11
    }),
    cn_name: L.tileLayer(urls.cn_name, {
      maxZoom: 18,
      subdomains: '01234567',
      zIndex: 10
    }),
    en_name: L.tileLayer(urls.en_name, {
      maxZoom: 18,
      subdomains: '01234567',
      zIndex: 10
    }),
    high: L.tileLayer(urls.high, {
      maxZoom: 23,
      minZoom: 10,
      zIndex: 2,
      subdomains: '123456'
    })
  }
  Object.defineProperty(map, 'tileKeys', {
    get: () => tileKeys,
    set: (keys) => {
      tileKeys = keys
      Object.keys(map.tiles).forEach(key => {
        let _layer = map.tiles[key]
        let _isShow = map.hasLayer(_layer)
        let _shouldShow = tileKeys.includes(key)
        if (_shouldShow && !_isShow) {
          map.addLayer(_layer)
        } else if (!_shouldShow && _isShow) {
          map.removeLayer(_layer)
        }
      })
      if (keys.includes('satellite')) {
        map._container.classList.remove('black')
      } else {
        map._container.classList.add('black')
      }
    },
    enumerable: true,
    configurable: true
  })
  map.tileKeys = tileKeys
  Object.defineProperty(map, 'sign', {
    get: () => sign || '',
    set: (_sign) => {
      sign = _sign
      map.tiles.high.setUrl(urls.high + _sign)
    },
    enumerable: true,
    configurable: true
  })
  map.sign = sign
  return map
}

export function CreateDeviceIcon (className) {
  return L.divIcon({
    html: ``,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    className: `xag-leaflet-device ${className}`
  })
}

export function CreateDeviceActiveIcon (className) {
  return L.divIcon({
    html: ``,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    className: `xag-leaflet-device ${className}`
  })
}

export {
  L
}

// (https://github.com/mapbox/geojson-area)
var RADIUS = 6378137
// 获取多边形面积
export function RingArea (coords) {
  // eslint-disable-next-line one-var
  let p1, p2, p3, lowerIndex, middleIndex, upperIndex, i, area = 0
  var coordsLength = coords.length

  if (coordsLength > 2) {
    for (i = 0; i < coordsLength; i++) {
      if (i === coordsLength - 2) { // i = N-2
        lowerIndex = coordsLength - 2
        middleIndex = coordsLength - 1
        upperIndex = 0
      } else if (i === coordsLength - 1) { // i = N-1
        lowerIndex = coordsLength - 1
        middleIndex = 0
        upperIndex = 1
      } else { // i = 0 to N-3
        lowerIndex = i
        middleIndex = i + 1
        upperIndex = i + 2
      }
      p1 = coords[lowerIndex]
      p2 = coords[middleIndex]
      p3 = coords[upperIndex]
      area += (rad(p3[0]) - rad(p1[0])) * Math.sin(rad(p2[1]))
    }

    area = area * RADIUS * RADIUS / 2
  }
  return parseFloat(Math.abs(area).toFixed(2))
}

function rad (_) {
  return _ * Math.PI / 180
}

/**
 * 获取多边形ClipPath，可用于css3 clip-path
 * @param {Array<L.Point>} points
 */
export function GetLatlngsClipPath (points) {
  let lats = points.map(item => item.x)
  let lngs = points.map(item => item.y)
  let t = Math.min.apply(Math, lats)
  let a = Math.min.apply(Math, lngs)
  let n = Math.max.apply(Math, lats)
  let r = Math.max.apply(Math, lngs)
  let o = points.map(item => {
    let { x, y } = item
    return `${_r(x, t, n)}% ${_r(y, a, r)}%`
  })
  return `polygon(${o.join(', ')})`
}
function _r (e, t, a) {
  return (100 * (e - t) / (a - t)).toFixed(2)
}
