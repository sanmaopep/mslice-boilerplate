var babel = require('gulp-babel'),
	gulp = require("gulp"),
	gutil = require('gulp-util'),
	webpack = require('webpack'),
	webpackConfig = require('./webpack.config.js'),
	publishConfig = require('./webpack.publish.config.js');

var myDevConfig = Object.create(webpackConfig);
var myPublishConfig = Object.create(publishConfig);
var devCompiler = webpack(myDevConfig);
var publishCompiler = webpack(myPublishConfig);

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
	},
	publishWebPack: (cb) => {
		publishCompiler.run(function(err, stats) {
			if (err) throw new gutil.PluginError("webpack:build-js", err);
			gutil.log("[webpack:build-js]", stats.toString({
				colors: true
			}));
			cb();
		});
	}
};