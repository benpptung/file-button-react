'use strict';

exports.isWinSafari = isWinSafari();
function isWinSafari() {

  console.log('got called');

  var support;

  // browser detection for windows safari
  // black berry safari might also has issue
  support = true;
  return _=> support;
}