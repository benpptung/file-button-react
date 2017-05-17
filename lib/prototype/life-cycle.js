'use strict';

/**
 * scope instances
 */
var prototype = exports.prototype = {};

/**
 * @protected
 */
prototype.componentDidMount = prototype.componentDidUpdate = function() {
  this.injectInput();
};

/**
 * @protected
 */
prototype.componentWillUnmount = function() {
  this.detachInput();
};

/**
 * @param {object} next_props
 */
prototype.componentWillReceiveProps = function(next_props) {
  if (!this.fileinput) return;
  if (next_props.disabled === this.props.disabled) return;

  this.fileinput.style.display = next_props.disabled === true ? 'none' : '';
};

