"use strict"

var gulp = require("gulp"),
	browserSync = require('browser-sync').create(),
	jade = require("gulp-jade"),
	browserify = require('browserify'),
	babel = require('./gulpconfig/babelConfig.js'),
	less = require('./gulpconfig/lessConfig.js'),
	imagemin = require('gulp-imagemin');

/**********************************************************
	开发模式(默认)
**********************************************************/
gulp.task('default', ['dev']);

// 设置监控 
gulp.task('dev', ['lessDev', 'jadeDev', 'babelDev', 'imgDev', 'browser-start', 'libDev'], function() {
	console.log("开启开发模式_(:з)∠)_");

	gulp.watch('./app/img/*', ['imgDev']);
	gulp.watch('./app/less/img/*', ['imgDev']);
	gulp.watch('./app/less/*.less', ['lessDev']);
	gulp.watch('./app/*.jade', ['jadeDev']);
	gulp.watch('./app/js/*.js', ['babelDev']);

	//监控build文件下的变化
	gulp.watch('./build/**', ['browser-reload']);
});

// 编译Less
gulp.task('lessDev', function() {
	console.log('LESS在编译_(:з)∠)_');
	return less.compileLess();
});

// 编译ES6,未根据CommanJS打包
gulp.task('babelDev', function(done) {
	console.log('ES6在编译_(:з)∠)_');
	return babel.complieBabel();
});

// 编译Jade
gulp.task('jadeDev', function() {
	console.log('JADE在编译_(:з)∠)_');
	var YOUR_LOCALS = {};
	return gulp.src('./app/*.jade')
		.pipe(jade({
			locals: YOUR_LOCALS
		}))
		.pipe(gulp.dest('./build/'));
});

// 图片处理
gulp.task('imgDev', function() {
	console.log('图片在复制_(:з)∠)_');
	gulp.src('./app/less/img/*')
		.pipe(gulp.dest('./build/css/img/'));
	return gulp.src('./app/img/*')
		.pipe(gulp.dest('./build/img'));
});

// 复制第三方库
gulp.task('libDev', function() {
	console.log('第三方Lib也在复制_(:з)∠)_');
	return gulp.src('./app/lib/**')
		.pipe(gulp.dest('./build/lib/'));
});

/**********************************************************
	搭建静态服务器
**********************************************************/
gulp.task('browser-start', function() {
	console.log('服务器开启,等服务器提供IP吧_(:з)∠)_');
	return browserSync.init({
		server: {
			baseDir: "./build/"
		}
	});
});

// 服务器重载（刷新）
gulp.task('browser-reload', function() {
	console.log('浏览器刷新_(:з)∠)_');
	browserSync.reload();
});

/**********************************************************
	生产模式
**********************************************************/

// 图片压缩 发布模式
gulp.task('imgMinPublish', function() {
	console.log('图片在压缩_(:з)∠)_');
	return gulp.src('./app/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./build/img'));
});