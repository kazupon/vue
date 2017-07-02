var webpack = require('webpack')
var base = require('./karma.base.config.js')

base.webpack.plugins = [
  new webpack.DefinePlugin({
    __WEEX__: false,
    'process.env': {
      NODE_ENV: '"development"',
      // for Chrome headless mode
      TRANSITION_DURATION: 75,
      TRANSITION_BUFFER: 15
    }
  })
]

module.exports = function (config) {
  var options = Object.assign(base, {
    browsers: ['ChromeHeadless'],
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: '../../coverage', subdir: '.' },
        { type: 'text-summary', dir: '../../coverage', subdir: '.' }
      ]
    },
    singleRun: true,
    plugins: base.plugins.concat([
      'karma-coverage',
      'karma-chrome-launcher'
    ])
  })

  // add babel-plugin-istanbul for code intrumentation
  options.webpack.module.rules[0].options = {
    plugins: [['istanbul', {
      exclude: [
        'test/',
        'src/compiler/parser/html-parser.js',
        'src/core/instance/proxy.js',
        'src/sfc/deindent.js'
      ]
    }]]
  }

  config.set(options)
}
