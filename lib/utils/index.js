'use strict';

exports.isWinSafari = isWinSafari();
function isWinSafari() {
  /*jshint -W117*/
  var ua = navigator.userAgent.toLowerCase();

  // browser detection for windows safari
  // black berry safari might also has issue
  return  !!(~ua.indexOf("windows") && ~ua.indexOf("safari/") && !~ua.indexOf("chrome"));
}

/**
 *
 * @param el
 * @param styl
 * @return {HTMLElement}
 */
exports.styles = function(el, styl) {
  var i;
  if (typeof styl.opacity == "number" && typeof el.style.opacity !== 'string'){
    // for IE
    // cannot use typeof to detect elm.filters
    styl.filter = 'alpha(opacity=' + Math.round(100 * styl.opacity) + ')';
  }
  for(i in styl){
    if(styl.hasOwnProperty(i)) el.style[i] = styl[i];
  }
  return el;
};

/*jshint -W030*/

/**
 * Listen to change event
 * @param {HTMLElement} el
 * @param {Function} fn
 * @public
 */

exports.listenTo = function(el, fn) {
  el.addEventListener ? el.addEventListener('change', fn) : el.attachEvent('onchange', fn);
};

/**
 * Unlisten to change event
 * @param {HTMLElement} el
 * @param fn
 * @public
 */

exports.unlistenTo = function(el, fn) {
  el.removeEventListener ? el.removeEventListener('change', fn) : el.detachEvent('onchange', fn);
};