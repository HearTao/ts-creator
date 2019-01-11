module.exports = {
  mode: "development",
  entry: './src/index.ts',
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  target: 'node',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
}
