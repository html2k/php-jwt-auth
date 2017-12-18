/* https://github.com/imlinus/Dime/ */

export { dime }

function dime(opts) {
  return new Dime(opts)
}

class Dime {
  constructor(sel, cb) {
    this.el = (document.querySelectorAll(sel) || cb)
    this.length = this.el.length
  }

  each(cb) {
    for(let i = 0; i < this.length; i++) cb(this.el[i], i, this.el)
    return this
  }

  append(body) {
    this.each(el => { el.insertAdjacentHTML('beforeend', body) })
    return this
  }

  prepend(body) {
    this.each(el => { el.insertAdjacentHTML('afterbegin', body) })
    return this
  }

  addClass(name) {
    this.each(el => { el.classList.add(name) })
    return this
  }

  hasClass(name) {
    let has = false
    this.each(el => {
      name.split(' ').forEach(val => {
        if(el.classList.contains(val)) has = true
      }, this)
    })
    return has
  }

  toggleClass(name) {
    this.each(el => { el.classList.toggle(name) })
  }

  removeClass(name) {
    this.each(el => { el.classList.remove(name.split(' ')) })
  }

  attr(name, val) {
    if(val) this.each(el => { el.setAttribute(name, val) })
    else if(!val) return this.el[0].getAttribute(name)
    return this
  }

  val(val) {
    if(val) this.each(el => { el.value = val })
    else return this.el[0].value
  }

  on(evt, cb) {
    this.each(el => { el.addEventListener(evt, cb) })
    return this
  }

  remove() {
    this.each(el => { el.parentNode.removeChild(el) })
  }
}