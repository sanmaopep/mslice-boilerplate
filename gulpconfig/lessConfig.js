var gulp = require("gulp"),
	plumber = require('gulp-plumber'),
	less = require("gulp-less"),
	rename = require('gulp-rename'),
	path = require('path'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps');

// AutoPreFixer兼容浏览器列表
var devBroswerList = ['> 1%', 'last 2 versions', 'Firefox >= 20'];
var publishBroswerList = ['> 1%', 'last 2 versions', 'Firefox >= 20'];

module.exports = {
	compileLess: () => {
		return gulp.src('./app/less/*.less')
			.pipe(sourcemaps.init())
			// .pipe(plumber())
			.pipe(less())
			.pipe(autoprefixer({
				browsers: devBroswerList
			}))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('./build/css/'));
	},
	publishLess: () => {
		return gulp.src('./app/less/*.less')
			// .pipe(plumber())
			.pipe(less())
			.pipe(autoprefixer({
				browsers: publishBroswerList
			}))
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(gulp.dest('./public/css/'));
	}
};