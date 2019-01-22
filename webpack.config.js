const path = require('path')
const merge = require('webpack-merge')

module.exports = []

module.exports.cjsConfig = {
  mode: process.env.NODE_ENV || 'none',
  target: 'node',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        resolve: {
          extensions: [".ts", ".tsx", ".js"],
        },
      }
    ]
  }
}

module.exports.webCjsConfig = merge(module.exports.cjsConfig, {
  output: {
    filename: 'index.web.js',
  }
})

module.exports.umdConfig = merge(module.exports.cjsConfig, {
  output: {
    filename: 'index.umd.js',
    library: 'tsCreator',
    libraryTarget: 'umd'
  }
})

module.exports.standaloneConfig = merge(module.exports.cjsConfig, {
  target: 'web',
  output: {
    filename: 'index.standalone.js',
    library: 'tsCreator',
    libraryTarget: 'umd'
  },
  externals: {
    typescript: 'ts',
    prettier: 'prettier',
    "prettier/parser-typescript": {
      commonjs: '',
      commonjs2: 'prettier/parser-typescript',
      root: ['prettierPlugins', 'typescript']
    }
  }
})

module.exports.push(module.exports.cjsConfig, module.exports.webCjsConfig, module.exports.umdConfig, module.exports.standaloneConfig)
