const path = require('path')

const baseConfig = require('./webpack.base.config')

const resolve = dir => path.resolve(__dirname, '../', dir)

module.exports = {
   mode: 'production',
   output: {
      path: resolve('dist'),
      filename: 'js/[name].js'
   },
   ...baseConfig
}