var gulp = require("gulp"),
	plumber = require('gulp-plumber'),
	less = require("gulp-less"),
	rename = require('gulp-rename'),
	path = require('path'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps');

// AutoPreFixer兼容浏览器列表
var broswerList = ['> 1%', 'last 2 versions', 'Firefox >= 20'];

module.exports = {
	compileLess: () => {
		return gulp.src('./app/less/*.less')
			.pipe(sourcemaps.init())
			// .pipe(plumber())
			.pipe(less())
			.pipe(autoprefixer({
				browsers: broswerList
			}))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('./build/css/'));
	}
};