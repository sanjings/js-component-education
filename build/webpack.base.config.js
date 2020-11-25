const path = require('path')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const terserWebpackPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const resolve = dir => path.resolve(__dirname, '../', dir)

module.exports = {
   entry: {
      index: resolve('./src/pages/Home/index.js'),
      list: resolve('./src/pages/List/index.js')
   },
   resolve: {
      alias: {
         '@': resolve('src'),
         'components': resolve('src/components'),
         'pages': resolve('src/pages'),
         'assets': resolve('src/assets'),
         'utils': resolve('src/utils'),
         'apis': resolve('src/apis')
      }
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: resolve('node_modules')
         },
         {
            test: /\.css$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                     hmr: process.env.NODE_ENV === 'development'
                  }
               },
               // 'style-loader',
               'css-loader',
               {
                  loader: 'postcss-loader',
                  options: {
                     plugins: () => [autoprefixer('last 5 versions')]
                  }
               }
            ]
         },
         {
            test: /\.scss$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                     hmr: process.env.NODE_ENV === 'development'
                  }
               },
               // 'style-loader',
               'css-loader',
               {
                  loader: 'postcss-loader',
                  options: {
                     plugins: () => [autoprefixer('last 5 versions')]
                  }
               },
               'sass-loader',
               {
                  loader: 'sass-resources-loader',
                  options: {
                     resources: [
                        resolve('src/assets/styles/variables.scss'),
                        resolve('src/assets/styles/common.scss')
                     ]
                  }
               }
            ]
         },
         {
            test: /\.(tpl|ejs)$/i,
            use: 'ejs-loader'
         },
         {
            test: /\.(jpg|jpeg|gif|png|ico)$/i,
            use: [
               {
                  loader: 'url-loader',
                  query: {
                     limit: 1024,
                     name: 'images/[name]-[hash:16].[ext]',
                     publicPath: '../'
                  }
               },
               'image-webpack-loader'
            ]
         },
         {
            test: /\.(woff2?|eot|ttf|oft|svg)(\?.*)?$/i,
            use: [
               {
                  loader: 'url-loader',
                  query: {
                     name: 'fonts/[name].[ext]',
                     publicPath: '../'
                  }
               }
            ]
         }

      ]
   },
   plugins: [
      new CleanWebpackPlugin(),
      new terserWebpackPlugin({
         cache: true,
         terserOptions: {
            compress: {
               drop_console: true,
               drop_debugger: true
            }
         }
      }),
      new MiniCssExtractPlugin({
         filename: 'css/[name].css'
      }),
      new OptimizeCssAssetsPlugin({}),
      new HtmlWebpackPlugin({
         minify: {
            removeComments: true,
            collapseWhitespace: true
         },
         filename: 'index.html',
         template: resolve('./src/pages/Home/index.html'),
         chunks: ['index'],
         chunksSortMode: 'manual',
         excludeChunks: ['node_modules'],
         hash: true
      }),
      new HtmlWebpackPlugin({
         minify: {
            removeComments: true,
            collapseWhitespace: true
         },
         filename: 'list.html',
         template: resolve('./src/pages/List/index.html'),
         chunks: ['list'],
         chunksSortMode: 'manual',
         excludeChunks: ['node_modules'],
         hash: true
      })
   ]
}