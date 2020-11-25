const baseConfig = require('./webpack.base.config')

module.exports = {
   mode: 'development',
   devServer: {
      watchOptions: {
         ignored: /node_modules/
      },
      host: 'localhost',
      port: 8080,
      open: true
   },
   ...baseConfig
}