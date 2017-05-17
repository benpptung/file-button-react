'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
const RaisedButton = require('material-ui/RaisedButton').default;
const wrapper = require('./lib/');

/*jshint ignore:start */
var mountnode = document.getElementById('mountnode');
if (mountnode) {

  let opt = {
    multiple: true,
    accept: null,
    fieldName: 'ajaxfile'
  };

  let FileButton = wrapper(RaisedButton, opt);

  ReactDOM.render(
    <MuiThemeProvider>
      <FileButton label="click me" primary={true} />
    </MuiThemeProvider>,
    mountnode);
}