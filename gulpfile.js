"use strict"

var gulp = require("gulp"),
	path = require('path'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync').create(),
	less = require("gulp-less"),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	jade = require("gulp-jade"),
	babel = require('gulp-babel'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	babelify = require('babelify'),
	glob = require('glob'),
	es = require('event-stream'),
	imagemin = require('gulp-imagemin');

// AutoPreFixer兼容浏览器列表
var broswerList = ['> 1%', 'last 2 versions', 'Firefox >= 20'];

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

/**********************************************************
	编译Less
**********************************************************/
gulp.task('lessDev', function() {
	console.log('LESS在编译_(:з)∠)_');

	return gulp.src('./app/less/*.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(autoprefixer({
			browsers: broswerList
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./build/css/'));
});

/**********************************************************
	编译Jade
**********************************************************/
gulp.task('jadeDev', function() {
	console.log('JADE在编译_(:з)∠)_');
	var YOUR_LOCALS = {};

	return gulp.src('./app/*.jade')
		.pipe(jade({
			locals: YOUR_LOCALS
		}))
		.pipe(gulp.dest('./build/'));
});

/**********************************************************
	编译ES6,未根据CommanJS打包
**********************************************************/
gulp.task('babelDev', function(done) {
	console.log('ES6在编译_(:з)∠)_');

	// glob('./app/js/*.js', function(err, files) {
	// 	if (err) done(err);

	// 	var tasks = files.map(function(entry) {
	// 		console.log('编译JS文件入口:'+entry);
	// 		return browserify({
	// 				entries: [entry],
	// 				debug: true
	// 			})
	// 			.transform(babelify,{presets: ['es2015']})
	// 			.bundle()
	// 			.pipe(source(entry))
	// 			.pipe(rename({
	// 				extname: '.bundle.js'
	// 			}))
	// 			.pipe(gulp.dest('./build/js/'));
	// 	});
	// 	es.merge(tasks).on('end', done);
	// });
	return gulp.src('./app/js/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./build/js/'));
});

/**********************************************************
	图片处理
**********************************************************/
gulp.task('imgDev', function() {
	console.log('图片在复制_(:з)∠)_');

	gulp.src('./app/less/img/*')
		.pipe(gulp.dest('./build/css/img/'));

	return gulp.src('./app/img/*')
		.pipe(gulp.dest('./build/img'));
});
// 图片压缩 发布模式
gulp.task('imgMinPublish', function() {
	console.log('图片在压缩_(:з)∠)_');

	return gulp.src('./app/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./build/img'));
});

/**********************************************************
	复制第三方库
**********************************************************/
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