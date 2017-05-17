Another implementation of [file-button](https://www.npmjs.com/package/file-button).
A [HOC](https://facebook.github.io/react/docs/higher-order-components.html) for reusing component as a `file input button`. There is no limitation the wrapped component is third party component or created by ourselves.

# Example

wrap [material-ui](http://www.material-ui.com)'s [RaisedButton](http://www.material-ui.com/#/components/raised-button)
```
const React = require('react');
const ReactDOM = require('react-dom');
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const request = require('superagent');


const wrap = require('file-button-react');
const RaisedButton = require('material-ui/RaisedButton').default;


var mountnode = document.getElementById('mountnode');
if (mountnode) {

  let opt = { depth: 1 };
  let FileButton = wrap(RaisedButton, opt);
  
  ReactDOM.render(
    <MuiThemeProvider>
      <FileButton label="upload" primary={true} onFileInput={upload} />
      <RaisedButton label="catch me" secondary={true} style={wrap.styl} />
      <RaisedButton label="catch me too" secondary={true} style={wrap.styl} />
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

## wrap(ReactComponent, options)

This function returns a ReactComponet with two additional properties 

`options` is same as [file-button](https://www.npmjs.com/package/file-button) module with the following additional option.

##### depth: {Unsigned Integer}

defaults to `0`.
 
`file-button-react` injects DOM element `<input type="file" />` to React component, which we cannot control. This is useful if we want to re-use third-party component, although it is discouraged. So, sometimes it may fail depends on the component. In that case, we can increase `depth` value to append `<input type="file" />` to child node's child node...


## properties

All properties are sent to the wrapped component except `onFileInput`.

##### onFileInput: {function}

recieve `<input type="file" />`

##### diabled: {Boolean}

default to `false`
The wrapped component will recieve this prop, so it can re-style itself as `disabled`.

## wrap.styl: {position:'relative', overflow:'hidden'}

A React style object, which is the style applied to the root DOM. If layout got problem after using this component, can try to apply this style to other buttons like this example.
