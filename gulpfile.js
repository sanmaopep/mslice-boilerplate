"use strict"

var gulp = require("gulp");
var path = require('path');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var less = require("gulp-less");
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var jade = require("gulp-jade");
var babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');

//默认开发模式
gulp.task('default',['dev']);

// 设置监控
gulp.task('dev',['lessDev','jadeDev','babelDev','imgMin'],function () {
	gulp.watch('./app/img/*',['imgMin','browser-reload']);
	gulp.watch('./app/less/*.less',['lessDev','browser-reload']);
	gulp.watch('./app/*.jade',['jadeDev','browser-reload']);
	gulp.watch('./app/js/*.js',['babelDev','browser-reload']);
});

// 编译Less
gulp.task('lessDev',function () {
	console.log('less compiling...');

	return gulp.src('./app/less/*.less')
	  .pipe(sourcemaps.init())
	  .pipe(less({
	      paths: [ path.join(__dirname, 'less', 'includes') ]
	    }))
	  .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
	  .pipe(sourcemaps.write('.'))
	  .pipe(gulp.dest('./build/css/'));
});

//编译jade
gulp.task('jadeDev',function () {
	console.log('jade compiling...');
	var YOUR_LOCALS = {};

	return gulp.src('./app/*.jade')
	 .pipe(jade({locals: YOUR_LOCALS}))
	 .pipe(gulp.dest('./build/'));
});

// 编译ES6
gulp.task('babelDev',function () {
	console.log('ES6 compiling...');

	gulp.src('./app/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/js/'));  
});

// 图片压缩
gulp.task('imgMin', function () {
	console.log('image is mining');

	return gulp.src('./app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'))
});

// 搭建静态服务器
gulp.task('browser-start', function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
});

// 服务器重载（刷新）
gulp.task('browser-reload', function() {
    browserSync.reload();
});