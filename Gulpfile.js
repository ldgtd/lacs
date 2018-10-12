'use strict';

/**
 * Load dependencies
 */
var config             = require('./gulp-config.json'),
    gulp               = require('gulp'),
    $                  = require('gulp-load-plugins')(),
    browserSync        = require('browser-sync').create(),
    reload             = browserSync.reload,
    argv               = require('yargs').argv,
    runSequence        = require('run-sequence'),
    webpackConfig      = require('./webpack-config.js')(argv.production),
    webpack            = require('webpack')(webpackConfig);

/**
 * Pack JavaScript modules
 */
gulp.task('webpack', function(done) {
  webpack.run(function(err, stats) {
    if(err) throw new $.util.PluginError('webpack', err);
    $.util.log('[webpack]', stats.toString());
    done();
  });

  gulp.watch(config.src.javascript, ['webpack']);
});

/**
 * Build for production
 */
gulp.task('build', ['webpack']);

/**
 * Default task build, watch & serve
 */
gulp.task('default', function(cb) {
  runSequence('build', cb);
});
