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
gulp.task('dev',['lessDev','jadeDev','babelDev','imgMin','browser-start'],function () {
	console.log("开启开发模式_(:з)∠)_");

	gulp.watch('./app/img/*',['imgMin']);
	gulp.watch('./app/less/*.less',['lessDev']);
	gulp.watch('./app/*.jade',['jadeDev']);
	gulp.watch('./app/js/*.js',['babelDev']);

	//监控build文件下的变化
	gulp.watch('./build/**',['browser-reload']);
});

// 编译Less
gulp.task('lessDev',function () {
	console.log('LESS在编译_(:з)∠)_');

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
	console.log('JADE在编译_(:з)∠)_');
	var YOUR_LOCALS = {};

	return gulp.src('./app/*.jade')
	 .pipe(jade({locals: YOUR_LOCALS}))
	 .pipe(gulp.dest('./build/'));
});

// 编译ES6
gulp.task('babelDev',function () {
	console.log('ES6在编译_(:з)∠)_');

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
	console.log('图片在压缩_(:з)∠)_');

	return gulp.src('./app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'))
});

// 搭建静态服务器
gulp.task('browser-start', function() {
	console.log('服务器开启,等服务器提供IP吧_(:з)∠)_');

    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
});

// 服务器重载（刷新）
gulp.task('browser-reload', function() {
	console.log('浏览器刷新_(:з)∠)_')
    browserSync.reload();
});