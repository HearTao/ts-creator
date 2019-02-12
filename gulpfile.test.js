const gulp = require('gulp');
const ts = require('gulp-typescript');
const webpack = require('webpack-stream');
const configs = require('./webpack.config')
const del = require('del')
const through = require('through2');
const vfs = require('memory-fs')
const requireFromString = require('require-from-string');
const composer = require('gulp-uglify/composer');
const uglifyjs = require('uglify-es')
const uglify = composer(uglifyjs);

const fs = new vfs()
const tsconfig = {
    module: 'commonjs',
    target: 'esnext',
    lib: ['es2015']
}
const uglifyConfig = {
    compress: false
}

function tsCreatorPipe() {
    return through.obj(function (vinylFile, encoding, callback) {
        const file = vinylFile.clone()
        const code = vinylFile.contents.toString()
        const creator = require('./dist').default
        const factoryCode = creator(code, { target: 'esmodule' })
        file.contents = new Buffer(factoryCode)
        callback(null, file);
    });
}

function runFactoryPipe() {
    return through.obj(function (vinylFile, encoding, callback) {
        const file = vinylFile.clone()
        const code = vinylFile.contents.toString()
        const result = requireFromString(code).default
        file.contents = new Buffer(result)
        file.extname = '.ts'
        callback(null, file);
    });
}

function writeToVfs() {
    return through.obj(function (vinylFile, encoding, callback) {
        fs.mkdirpSync(vinylFile.dirname)
        fs.writeFileSync(vinylFile.path, vinylFile.contents.toString())
        callback(null, vinylFile);
    });
}

function compareFromVfs(fs) {
    return through.obj(function (vinylFile, encoding, callback) {
        const oldCode = fs.readFileSync(vinylFile.path).toString()
        const code = vinylFile.contents.toString()
        if (oldCode !== code) {
            throw new Error('test failed: ' + vinylFile.path)
        }
        callback(null, vinylFile);
    });
}

gulp.task('clean', function () {
    return del('./dist/')
})

gulp.task('build', function () {
    return gulp.src('src/index.ts')
        .pipe(webpack(configs.umdConfig))
        .pipe(gulp.dest('./dist/'))
})

gulp.task('cases', function () {
    return gulp.src('tests/cases/**/*.ts')
        .pipe(ts(tsconfig))
        .pipe(uglify(uglifyConfig))
        .pipe(writeToVfs())
})

gulp.task('compare', function () {
    return gulp.src('tests/cases/**/*.ts')
        .pipe(tsCreatorPipe())
        .pipe(ts(tsconfig))
        .pipe(runFactoryPipe())
        .pipe(ts(tsconfig))
        .pipe(uglify(uglifyConfig))
        .pipe(compareFromVfs(fs))
})

gulp.task('default', gulp.series(['clean', 'build', 'cases', 'compare', 'clean']));