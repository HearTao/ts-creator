const path = require('path')
const merge = require('webpack-merge')

module.exports = []

module.exports.umdConfig = {
  mode: process.env.NODE_ENV || 'development',
  target: 'node',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'tsCreator',
    libraryTarget: 'umd'
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

module.exports.webConfig = merge(module.exports.umdConfig, {
  target: 'web',
  output: {
    filename: 'index.web.js',
  }
})

module.exports.standaloneConfig = merge(module.exports.umdConfig, {
  target: 'web',
  output: {
    filename: 'index.standalone.js',
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

module.exports.cliConfig = merge(module.exports.umdConfig, {
  entry: './src/cli.ts',
  node: false,
  output: {
    filename: 'cli.js',
    library: 'tsCreatorCli',
    libraryTarget: 'commonjs2'
  },
  externals: [
    'yargs', 
    'cardinal',
    'prettier',
    'get-stdin',
    './'
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        resolve: {
          extensions: [".ts", ".tsx", ".js"],
        },
        options: {
          compilerOptions : {
            strict: false,
            target: 'esnext',
            module: 'commonjs'
          }
        }
      }
    ]
  }
})

module.exports.push(module.exports.umdConfig, module.exports.webConfig, module.exports.standaloneConfig, module.exports.cliConfig)
