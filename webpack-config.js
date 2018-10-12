var path = require('path');
var webpack = require('webpack');
var gulpConfig = require('./gulp-config.json');

module.exports = function(production) {
  var config = {
    resolve: {
      root: [path.resolve(__dirname, 'assets/javascripts')],
      extensions: ['', '.js']
    },
    entry: gulpConfig.src.webpack,
    output: gulpConfig.dest.webpack,
    module: {
      loaders: [
        {
          loader: 'babel',
          exclude: /(node_modules|bower_components)/,
          test: /\.jsx?$/,
          query: {
            presets: ['env']
          }
        }
      ]
    }
  };

  if (production) {
    // Minify
    config.plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: {
          warnings: false
        }
      })
    ];
  }
  else {
    // Write sourcemaps
    config.devtool = '#source-map';
  }

  return config;

};
