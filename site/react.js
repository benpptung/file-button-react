'use strict';

// ReactDOM has lots of internal dependencies to React,
// and react-tap-event-plugin has internal dependency to ReactDOM
// so, we have to do this hack
const React = require('react/lib/ReactWithAddons.js');
module.exports = React;
