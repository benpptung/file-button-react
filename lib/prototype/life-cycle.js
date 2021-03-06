'use strict'

const ReactDOM = require('react-dom')
const styl_wrapper = require('../style').wrapper
const styles = require('../utils').styles

/**
 * scope instances
 */
var prototype = exports.prototype = {}

/**
 * componentDidUpdate() and componentWillUpdate seems useless,
 * but just leave them there to be defensive.
 */

/**
 * @protected
 */
prototype.componentDidMount = prototype.componentDidUpdate = function() {

  var that = this
  run()
  function run() {
    setTimeout(that.init(run), 10)
  }
}

prototype.init = function(run) {
  return _=> {
    if (!this._ref) return run()
    this.root = ReactDOM.findDOMNode(this._ref)
    if (this.root) styles(this.root, styl_wrapper)
    this.injectInput()
  }
}

/**
 * @protected
 */
prototype.componentWillUnmount = prototype.componentWillUpdate = function() {
  this.detachInput()
}

/**
 * @param {object} next_props
 */
prototype.componentWillReceiveProps = function(next_props) {
  if (!this.fileinput) return
  if (next_props.disabled === this.props.disabled) return

  this.fileinput.style.display = next_props.disabled === true ? 'none' : ''
}
