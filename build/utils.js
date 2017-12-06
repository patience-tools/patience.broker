'use strict'
const path = require('path')

const _ = module.exports = {}

_.cwd = (file) => {
  return path.join(process.cwd(), file || '')
}

_.outputPath = path.join(__dirname, '../dist')

_.outputIndexPath = path.join(__dirname, '../dist/index.html')

_.target = 'web'

// https://github.com/egoist/vbuild/blob/master/lib/vue-loaders.js
_.loadersOptions = {
  minimize: process.env.NODE_ENV === 'production',
  options: {
    // css-loader relies on context
    context: process.cwd(),
    vue: {
      loaders: {
        js: 'babel-loader'
      }
    }
  }
}
