Another implementation of [file-button](https://www.npmjs.com/package/file-button).
A [HOC](https://facebook.github.io/react/docs/higher-order-components.html) for reusing component to add file upload feature.

# Example

in the `rendering.js` to wrap [material-ui](http://www.material-ui.com)'s [RaisedButton](http://www.material-ui.com/#/components/raised-button)
```
const React = require('react');
const ReactDOM = require('react-dom');
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const RaisedButton = require('material-ui/RaisedButton').default;
const wrap = require('file-button-react');
const request = require('superagent');

var mountnode = document.getElementById('mountnode');
if (mountnode) {

  let opt = { multiple: false };
  let FileButton = wrap(RaisedButton, opt);
  
  ReactDOM.render(
    <MuiThemeProvider>
      <FileButton label="upload" primary=true onFileInput={upload} />
    </MuiThemeProvider>,
    mountnode
  )
}

function upload(fileinput) {
  var req = request.post('/upload/');
  var files = fileinput.files;
    
  for(let i = 0, len = files.length; i < len; ++i){
    let file = files[i];
    req.attach('ajaxfile-' + i, file, file.name);
  }
    
  req
    .on('progress', function(e){
      
      if (e.lengthComputable) {
        // handle progress bar here
      }
    })
    .end(function(err, res) {
      
      if (res.ok) {     
        // handle successful result here
      }
    });
}
```

# API

###wrap(ReactComponent, option)

`option` is same as [file-button](https://www.npmjs.com/package/file-button) module

return a ReactComponet with two additional properties 

### properties

All properties are sent to the wrapped component except `onFileInput`.

##### onFileInput: {function}

recieve `<input type="file" />`

##### diabled: {Boolean}

default to `false`
The wrapped component will recieve this prop, so it can re-style itself as `disabled`.
