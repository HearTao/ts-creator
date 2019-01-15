const typescript = require('rollup-plugin-typescript2')

module.exports = {
  input: 'src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'cjs',
    exports: 'named',
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
    })
  ]
}