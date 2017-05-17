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

  let styl = Object.assign(wrapper.styl, {marginRight: '5px'});

  ReactDOM.render(
    <MuiThemeProvider>
      <div>
        <FileButton label="click me" primary={true} onFileInput={onFileInput} style={styl} />
        <RaisedButton label="catch me" secondary={true} style={styl} />
        <RaisedButton label="catch me too" secondary={true} style={styl} />
      </div>
    </MuiThemeProvider>,
    mountnode);
}

function onFileInput(fileinput) {
  console.log(fileinput);
  console.log(fileinput.files);
}