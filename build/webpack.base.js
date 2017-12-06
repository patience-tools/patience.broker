'use strict'

const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const _ = require('./utils')

module.exports = {
  entry: {
    'patience.broker': './app/index.js'
  },
  output: {
    path: _.outputPath,
    filename: '[name].js',
    publicPath: config.publicPath,
    // Point sourcemap entries to original disk location
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  resolve: {
    extensions: [ '.js', '.json' ],
    alias: {
      root: path.join(__dirname, '../app')
    },
    modules: [
      _.cwd('node_modules'),
      // this meanse you can get rid of dot hell
      // for example import 'components/Foo' instead of import '../../components/Foo'
      _.cwd('app')
    ]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['babel-preset-stage-2'],
            ['babel-preset-env']
          ]
        }
      }
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin(_.loadersOptions)
  ],
  target: _.target
}
