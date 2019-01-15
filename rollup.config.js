const typescript = require('rollup-plugin-typescript2')

module.exports = {
  input: 'src/index.ts',
  output: {
    name: 'ts-creator',
    file: './dist/index.js',
    format: 'umd',
    exports: 'named',
    globals: {
      typescript: 'ts'
    }
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
    })
  ]
}