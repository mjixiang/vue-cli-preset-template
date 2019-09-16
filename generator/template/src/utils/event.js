export default class Event {
  constructor () {
    this._events = Object.create(null)
  }
  $on = (event, fn) => {
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.$on(event[i], fn)
      }
    } else {
      (this._events[event] || (this._events[event] = [])).push(fn)
    }
    return this
  }
  $once = (event, fn) => {
    function on () {
      this.$off(event, on)
      fn.apply(this, arguments)
    }
    on.fn = fn
    this.$on(event, on)
    return this
  }
  $off = (event, fn) => {
    if (!event) {
      this._events = Object.create(null)
    } else if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.$off(event[i], fn)
      }
    } else if (!fn) {
      this._events[event] = null
    } else {
      const cbs = this._events[event]
      if (!cbs) return this
      this._events[event] = cbs.filter(cb => cb !== fn || cb.fn === fn)
    }
    return this
  }
  $emit = (event, ...args) => {
    let cbs = this._events[event]
    if (cbs) {
      cbs.forEach(cb => {
        cb.apply(this, args)
      })
    }
    return this
  }
}
