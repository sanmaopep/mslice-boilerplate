var babel = require('gulp-babel'),
	gulp = require("gulp"),
	path = require('path'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	gutil = require('gulp-util'),
	webpack = require('webpack'),
	webpackConfig = require('./webpack.config.js');

var myDevConfig = Object.create(webpackConfig);
var devCompiler = webpack(myDevConfig);

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
	runWebPack: (cb) => {
		devCompiler.run(function(err, stats) {
			if (err) throw new gutil.PluginError("webpack:build-js", err);
			gutil.log("[webpack:build-js]", stats.toString({
				colors: true
			}));
			cb();
		});
	}
};