'use strict';

/**
 * modules
 */
const styl = require('../style').input;
const utils = require('../utils');


/**
 * scope instances
 */
var prototype = exports.prototype = {};
var isWinSafari = utils.isWinSafari;

/**
 * @return {Function}
 * @private
 */
prototype._onInputChange = function() {
  return event=> {
    var fileinput = this.detachInput();
    if (fileinput) this.props.onFileInput(fileinput);
    this.injectInput();
  }
};

/***
 * @private
 */
prototype.injectInput = function() {
  this.detachInput();

  var root = this.root;
  if (!root) throw new ReferenceError('no root to inject input');

  this.fileinput = this.createInput();
  root.insertBefore(this.fileinput, root.firstChild);
  utils.listenTo(this.fileinput, this.onInputChange);
};

/**
 * @return {Node}
 */
prototype.detachInput = function() {
  if (!this.fileinput) return;

  var fileinput = this.fileinput;

  utils.unlistenTo(fileinput, this.onInputChange);
  if (fileinput.parentNode) {
      fileinput.parentNode.removeChild(fileinput);
  }

  this.fileinput = null;
  return fileinput;
};

/**
 * @private
 * @return {Element}
 */
prototype.createInput = function() {

  /*jshint -W117*/
  var input = document.createElement('input');

  if (this.multiple && 'multiple' in input && !isWinSafari) {
    input.setAttribute('multiple', 'multiple');
  }

  if (this.accept) {
    input.setAttribute('accept', this.accept);
  }

  if (this.props.disabled === true) {
    input.style.display = 'none';
  }

  input.type = 'file';
  input.name = this.fieldName;

  utils.styles(input, styl);

  // enlarge the file input button
  if (typeof input.style.transform == 'string'){
    input.style.transform = "scale(30)";
    input.style.transformOrigin = "99% 50%";
  }
  else {
    if (typeof input.style.msTransform == 'string'){
      // fix IE9, IE10 double click to open window problem, because
      // IE only the file input button could use, the value input is double click required
      input.style.msTransform = "scale(30)";
      input.style.msTransformOrigin = "99% 50%";
    }
    else if (typeof input.style.webkitTransform == 'string') {
      input.style.webkitTransform = "scale(30)";
      input.style.webkitTransformOrigin = "99% 50%";
    }
    else if (typeof input.mozTransform == 'string') {
      input.style.mozTransform = "scale(30)";
      input.style.mozTransformOrigin = '99% 50%';
    }
    else {
      input.style.fontSize = '208px';
    }
  }

  return input;
};