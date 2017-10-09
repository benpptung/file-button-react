'use strict'

/**
 * Module Dependencies
 */
const React = require('react')
const inherits = require('inherits')
const _proto = require('./prototype')
const styl_wrapper = require('./style').wrapper

module.exports = wrapper
wrapper.styl = styl_wrapper

/**
 * @param {ReactComponent} Wrapped
 * @param {object} opt
 * @return {ReactComponent}
 */
function wrapper(Wrapped, opt) {

  /**
   * inherits and scope instances
   */
  opt = opt === Object(opt) ? opt : {}
  Object.assign(FileButton, require('./static'))
  inherits(FileButton, React.Component)
  var prototype = Object.assign(FileButton.prototype, _proto)

  /**
   * @constructor
   */
  function FileButton(props) {
    React.Component.call(this, props)

    this._ref = null
    this.root = null
    this.fileinput = null
    this.onInputChange = this._onInputChange()
    this.catchRef = ref=> {
      this._ref = ref
    }

    Object.defineProperties(this, {
      multiple: { get: _=> opt.multiple !== false },
      accept: { get: _=> typeof opt.accept == 'string' ? opt.accept : null },
      fieldName: {
        get: _=> {
          return typeof opt.fieldName == 'string' && opt.fieldName.length > 0
            ? opt.fieldName : 'ajaxfile'
        }
      },
      depth: { get: _=> /^\d+$/.test(opt.depth) ? opt.depth : 0 }
    })
  }

  /**
   * @public
   */
  prototype.render = function() {

    var {onFileInput, ...props} = this.props

    return (
      <Wrapped {...props} ref={this.catchRef} />
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    FileButton.displayName = 'FileButton'
  }

  return FileButton
}
