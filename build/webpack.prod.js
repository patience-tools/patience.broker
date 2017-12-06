'use strict'
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const rm = require('rimraf')
const base = require('./webpack.base')

// remove dist folder in web app mode
rm.sync('dist/*')
// use source-map in web app mode
base.devtool = 'source-map'

// use hash filename to support long-term caching
base.output.filename = '[name].[chunkhash:8].js'
// add webpack plugins
base.plugins.push(
  new ProgressPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new UglifyJSPlugin({ uglifyOptions: {
    sourceMap: true,
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }}),
  // extract vendor chunks
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => {
      return module.resource && /\.(js|css|es6)$/.test(module.resource) && module.resource.indexOf('node_modules') !== -1
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }),
  // progressive web app
  // it uses the publicPath in webpack config
  new OfflinePlugin({
    relativePaths: false,
    ServiceWorker: {
      events: true,
      navigateFallbackURL: '/'
    },
    AppCache: {
      events: true,
      FALLBACK: { '/': '/' }
    }
  })
)

// minimize webpack output
base.stats = {
  // Add children information
  children: false,
  // Add chunk information (setting this to `false` allows for a less verbose output)
  chunks: false,
  // Add built modules information to chunk information
  chunkModules: false,
  chunkOrigins: false,
  modules: false
}

module.exports = base
