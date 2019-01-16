const path = require('path')
const merge = require('webpack-merge')

const cjsConfig = {
  mode: process.env.NODE_ENV || 'none',
  target: 'node',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  optimization: {
    minimize: false
  }
}

const umdConfig = merge(cjsConfig, {
  output: {
    filename: 'index.umd.js',
    library: 'tsCreator',
    libraryTarget: 'umd'
  }
})

const standaloneConfig = merge(cjsConfig, {
  target: 'web',
  output: {
    filename: 'index.standalone.js',
    library: 'tsCreator',
    libraryTarget: 'umd'
  },
  externals: {
    typescript: 'ts',
    prettier: 'prettier',
  }
})

module.exports = [cjsConfig, umdConfig, standaloneConfig]