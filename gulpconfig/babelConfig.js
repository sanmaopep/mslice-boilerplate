var babel = require('gulp-babel'),
	gulp = require("gulp"),
	path = require('path'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	babelify = require('babelify'),
	glob = require('glob'),
	es = require('event-stream');

module.exports = {
	complieBabel: () => {
		return gulp.src('./app/js/*.js')
			.pipe(sourcemaps.init())
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('./build/js/'));
	},
	compileBabelWithBroswerify: () => {
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
	}
};