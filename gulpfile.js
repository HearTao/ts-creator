const gulp = require('gulp')
const ts = require('gulp-typescript')
const webpack = require('webpack-stream')
const configs = require('./webpack.config')
const del = require('del')
const through = require('through2')
const vfs = require('memory-fs')
const requireFromString = require('require-from-string')
const diff = require('diff')
const prettier = require('gulp-prettier')
const tsPlugin = require('prettier/parser-typescript')

gulp.task('clean', function() {
  return del(['./dist/', './coverage/'])
})

gulp.task('build:umd', function() {
  return gulp
    .src('src/index.ts')
    .pipe(webpack(configs.umdConfig))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('build:web', function() {
  return gulp
    .src('src/index.ts')
    .pipe(webpack(configs.webConfig))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('build:standalone', function() {
  return gulp
    .src('src/index.ts')
    .pipe(webpack(configs.standaloneConfig))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('build:cli', function() {
  return gulp
    .src('src/index.ts')
    .pipe(webpack(configs.cliConfig))
    .pipe(gulp.dest('./dist/'))
})

const fs = new vfs()
const tsconfig = {
  module: 'commonjs',
  target: 'esnext',
  lib: ['es2015']
}
const prettierOptions = {
  parser: 'typescript',
  plugins: [tsPlugin],
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  bracketSpacing: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'none',
  proseWrap: 'preserve'
}

function tsCreatorPipe(options = {}) {
  return through.obj(function(vinylFile, encoding, callback) {
    const file = vinylFile.clone()
    const code = vinylFile.contents.toString()
    const creator = require('./dist').default
    const factoryCode = creator(code, { target: 'esmodule', ...options })
    file.contents = new Buffer(factoryCode)
    callback(null, file)
  })
}

function runFactoryPipe(tsx = false) {
  return through.obj(function(vinylFile, encoding, callback) {
    const file = vinylFile.clone()
    const code = vinylFile.contents.toString()
    const result = requireFromString(code).default
    file.contents = new Buffer(result)
    file.extname = tsx ? '.tsx' : '.ts'
    callback(null, file)
  })
}

function writeToVfs() {
  return through.obj(function(vinylFile, encoding, callback) {
    fs.mkdirpSync(vinylFile.dirname)
    fs.writeFileSync(vinylFile.path, vinylFile.contents.toString())
    callback(null, vinylFile)
  })
}

function compareFromVfs(fs) {
  return through.obj(function(vinylFile, encoding, callback) {
    const oldCode = fs.readFileSync(vinylFile.path).toString()
    const code = vinylFile.contents.toString()
    const diffs = diff.diffWords(oldCode, code)
    if (diffs.some(diff => !!(diff.added || diff.removed))) {
      callback(new Error('test failed: ' + vinylFile.path), vinylFile)
    }
    callback(null, vinylFile)
  })
}

gulp.task('build:coverage', function() {
  return gulp
    .src('src/index.ts')
    .pipe(webpack(configs.coverageConfig))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('cases', function() {
  return gulp
    .src(['tests/cases/**/*.ts', 'tests/cases/**/*.tsx'])
    .pipe(prettier(prettierOptions))
    .pipe(writeToVfs())
})

gulp.task('compare:ts', function() {
  return gulp
    .src('tests/cases/**/*.ts')
    .pipe(tsCreatorPipe())
    .pipe(ts(tsconfig))
    .pipe(runFactoryPipe())
    .pipe(prettier(prettierOptions))
    .pipe(compareFromVfs(fs))
})

gulp.task('compare:tsx', function() {
  return gulp
    .src('tests/cases/**/*.tsx')
    .pipe(tsCreatorPipe({ tsx: true }))
    .pipe(ts(tsconfig))
    .pipe(runFactoryPipe(true))
    .pipe(prettier(prettierOptions))
    .pipe(compareFromVfs(fs))
})

gulp.task('compare', gulp.series(['compare:ts', 'compare:tsx']))

gulp.task(
  'test',
  gulp.series([
    'clean',
    'build:umd',
    'cases',
    'compare'
  ])
)

gulp.task(
  'coverage',
  gulp.series([
    'clean',
    'build:coverage',
    'cases',
    'compare'
  ])
)

gulp.task(
  'build',
  gulp.series(['build:umd', 'build:web', 'build:standalone', 'build:cli'])
)

gulp.task('default', gulp.series(['clean', 'build']))
