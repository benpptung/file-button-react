'use strict';

const PropTypes = require('prop-types');

exports.displayName = 'FileButton';

exports.defaultProps = {

  onFileInput: nop,

  disabled: false
};

exports.propTypes = {

  onFileInput: PropTypes.func,

  disabled: PropTypes.bool
};

function nop(){}