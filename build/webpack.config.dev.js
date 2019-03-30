'use strict'

const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    './gh-pages/src/app.js'
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new CopyPlugin([
      {
        from: './gh-pages/static/**/*',
        transformPath(targetPath) {
          const prefix = path.normalize('./gh-pages/');
          return targetPath.replace(new RegExp(`^${prefix.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&')}`),'');
        }
      },
      {
        from: './gh-pages/src/index.html',
        to: 'index.html'
      }
    ])
  ],
  output: {
    path: path.resolve(__dirname, '../gh-pages/build')
  }
};