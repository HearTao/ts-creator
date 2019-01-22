const path = require('path')
const configs = require('./webpack.config')
const merge = require('webpack-merge')

module.exports = merge(configs.umdConfig, {
  entry: "./tests/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist/tests'),
    filename: 'index.js',
  }
})
