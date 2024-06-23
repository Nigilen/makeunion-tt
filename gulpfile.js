const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mediaquery = require('postcss-combine-media-query');
const cssnano = require('cssnano');
const gulpPug = require('gulp-pug');
const htmlMinify = require('html-minifier');
const cssimport = require("gulp-cssimport");


function html() {
	const options = {
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      sortClassName: true,
      useShortDoctype: true,
      collapseWhitespace: true,
      minifyCSS: true,
      keepClosingSlash: true
  };
  return gulp.src('src/pages/*.html')
    .pipe(plumber())
		.on('data', function(file) {
      const buferFile = Buffer.from(htmlMinify.minify(file.contents.toString(), options));
      return file.contents = buferFile;
    })
    .pipe(gulp.dest('dist/'))
}

exports.html = html;

function pageCss() {
	const plugins = [
    autoprefixer(),
    mediaquery(),
		cssnano()
	];
  return gulp.src('src/styles/*.css')
    .pipe(plumber())
    .pipe(cssimport())
		.pipe(postcss(plugins))
    .pipe(gulp.dest('dist/styles'))
}

exports.css = css;

function css() {
	const plugins = [
    autoprefixer(),
    mediaquery(),
		cssnano()
	];
  return gulp.src('src/layouts/*.css')
    .pipe(plumber())
    .pipe(concat('bundle.css'))
		.pipe(postcss(plugins))
    .pipe(gulp.dest('dist/'))
}

exports.css = css;

function images() {
  return gulp.src('src/images/*.{jpg,png,svg,gif,ico,webp,avif}', {encoding: false})
            .pipe(gulp.dest('dist/images'))
}

exports.images = images;

function js() {
  return gulp.src('src/scripts/*.js')
            .pipe(gulp.dest('dist/scripts/'))
}

exports.js = js;

function clean() {
  return del('dist');
}

exports.clean = clean;

function pug() {
  return gulp.src('src/pages/**/*.pug')
        .pipe(gulpPug(	{
          pretty: true
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

exports.pug = pug;

function watchFiles() {
  gulp.watch(['src/**/*.pug'], pug);
  gulp.watch(['src/pages/*.css'], pageCss);
  gulp.watch(['src/layouts/*.css'], css);
  gulp.watch(['src/scripts/*.js'], js);
  gulp.watch(['src/images/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}


const build = gulp.series(clean, gulp.parallel(pug, pageCss, css, images, js));

exports.build = build;

const watchapp = gulp.parallel(build, watchFiles, serve);

exports.default = watchapp;