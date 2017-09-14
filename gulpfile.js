var gulp = require('gulp')
var connect = require('gulp-connect') //Runs a local dev server
var open = require('gulp-open') // Open a URL in a web browser
var browserify = require('browserify') // Bundles JS
var reactify = require('reactify') // Transforms React JSC to JS
var source = require('vinyl-source-stream') // Use conventional text streams with Gulp
var concat = require('gulp-concat') // Concatenates files
var lint = require('gulp-eslint') // List JS files, including JSX

var config = {
  port: 3005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'src/css/**/*.css'
    ],
    dist: './dist',
    mainJS: './src/main.js'
  }
}

gulp.task('connect', () => {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  })
})

gulp.task('open', ['connect'], () => {
  gulp.src('dist/index.html')
    .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }))
})

gulp.task('html', () => {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload())
})

gulp.task('js', () => {
  browserify(config.paths.mainJS)
  .transform(reactify)
  .bundle()
  .on('error', console.error.bind(console))
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(config.paths.dist + '/scripts'))
  .pipe(connect.reload())
})

gulp.task('css', () => {
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
    .pipe(connect.reload())
})

gulp.task('lint', () => {
  return gulp.src(config.paths.js)
    .pipe(lint({configFile: 'eslintrc.json'}))
    .pipe(lint.format())
})

gulp.task('watch', () => {
  gulp.watch(config.paths.html, ['html'])
  gulp.watch(config.paths.js, ['js', 'lint'])
  gulp.watch(config.paths.css, ['css'])
})

gulp.task('default', ['html', 'js', 'css', 'lint', 'open', 'watch'])
