'use strict'

exports.isWinSafari = isWinSafari()
function isWinSafari() {
  /*jshint -W117*/
  var ua = navigator.userAgent.toLowerCase()

  // browser detection for windows safari
  // black berry safari might also has issue
  return !!(~ua.indexOf('windows') && ~ua.indexOf('safari/') && !~ua.indexOf('chrome'))
}

/**
 *
 * @param el
 * @param styl
 * @return {HTMLElement}
 */
exports.styles = function(el, styl) {
  var i
  if (typeof styl.opacity == 'number' && typeof el.style.opacity !== 'string'){
    // for IE
    // cannot use typeof to detect elm.filters
    styl.filter = 'alpha(opacity=' + Math.round(100 * styl.opacity) + ')'
  }
  for (i in styl){
    if (styl.hasOwnProperty(i)) el.style[i] = styl[i]
  }
  return el
}

/*jshint -W030*/

/**
 * Listen to change event
 * @param {HTMLElement} el
 * @param {Function} fn
 * @public
 */

exports.listenTo = function(el, fn) {
  el.addEventListener ? el.addEventListener('change', fn) : el.attachEvent('onchange', fn)
}

/**
 * Unlisten to change event
 * @param {HTMLElement} el
 * @param fn
 * @public
 */

exports.unlistenTo = function(el, fn) {
  el.removeEventListener ? el.removeEventListener('change', fn) : el.detachEvent('onchange', fn)
}

exports.hasChild = function(el) {
  if (!el.hasChildNodes || !el.hasChildNodes()) return false

  var children = el.childNodes
  var childs = []
  for (let i = 0, len = children.length; i < len; ++i) {
    if (isValidBox(children[i])) {
      childs.push(children[i])
    }
  }

  if (!childs.length) return false
  return childs[0]
}

function isValidBox(el) {
  // it seems for unknown reason, react or material-ui might add <span> with
  // pointer-events, if <input type = "file" /> inserted
  // to avoid new input inserted into the wrong,
  // add the following defensive codes
  var val = getStyle(el, 'pointer-events')
  return val != 'none'
}

function getStyle(el, styleProp) {
  var value
  var defaultView = (el.ownerDocument || document).defaultView
  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase()
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp)
  }
  else if (el.currentStyle) { // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) { // eslint-disable-line no-useless-escape
      return letter.toUpperCase()
    })
    value = el.currentStyle[styleProp]
    // convert other units to pixels on IE
    if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
      return (function(value) {
        var oldLeft = el.style.left
        var oldRsLeft = el.runtimeStyle.left
        el.runtimeStyle.left = el.currentStyle.left
        el.style.left = value || 0
        value = el.style.pixelLeft + 'px'
        el.style.left = oldLeft
        el.runtimeStyle.left = oldRsLeft
        return value
      })(value)
    }
    return value
  }
}
