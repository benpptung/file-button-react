'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const RaisedButton = require('material-ui/RaisedButton').default;
const wrapper = require('./lib/');

/*jshint ignore:start */
var mountnode = document.getElementById('mountnode');
if (mountnode) {

  let opt = {
    multiple: true,
    accept: null,
    fieldName: 'ajaxfile',
    depth: 1
  };

  let FileButton = wrapper(RaisedButton, opt);

  ReactDOM.render(
    <MuiThemeProvider>
      <div>
        <FileButton label="click me" primary={true} disabled={true} onFileInput={onFileInput} />
        <RaisedButton label="catch me" secondary={true} style={wrapper.styl} />
        <RaisedButton label="catch me too" secondary={true} style={wrapper.styl} />
      </div>
    </MuiThemeProvider>,
    mountnode);
}

function onFileInput(fileinput) {
  console.log(fileinput);
  console.log(fileinput.files);
}