module.exports = [
  {
    name: 'react',
    nature: 'js',
    files: [
      'site/react.js',
      'site/react-dom.js',
      'prop-types',
      'core-js/modules/es6.object.assign.js'
    ],
    browserify: {
      // Cannot use `*` here, because `*` automatically expose npm module name.
      // In this stack, we have to do some tricks to build react
      exposes: 'react.js:react, react-dom.js:react-dom, prop-types'
    }
  },
  {
    name: 'bundle',
    nature: 'js',
    files: [
      'inherits',

      // following React Add-Ons do not have internal dependency to React,
      // so no more multiple React copies loaded error.
      // Remove the followings, if they are extraneous
      'react-addons-css-transition-group',
      'react-addons-update',
      'react-addons-transition-group',
      'react-addons-shallow-compare',
      'react-addons-pure-render-mixin',
      'react-addons-linked-state-mixin',
      'react-addons-clone-with-props',
      'react-addons-create-fragment',

      // add needed material-ui components here
      'material-ui/styles/MuiThemeProvider',
      'material-ui/styles/getMuiTheme',
      'material-ui/RaisedButton'
    ],
    browserify: {
      exposes: '*', externals: ['react', 'react-dom', 'prop-types']
    }
  },
  {
    name: 'file-button',
    nature: 'js',
    files: 'rendering.js',
    watch: 'rendering.js, lib/**/*.*',
    browserify: {
      // add React Add-Ons, if this component needs them
      externals: ['react', 'react-dom', 'inherits',
        'prop-types',
        'material-ui/styles/MuiThemeProvider',
        'material-ui/styles/getMuiTheme',
        'material-ui/RaisedButton'
      ]
    }
  }
]