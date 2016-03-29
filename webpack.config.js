var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

var data = require('./data');

module.exports = {
  entry: './entry.js',

  output: {
    filename: 'bundle.js',
    path: './build',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/, loader: 'babel'
      },
      {
        test: /\.scss$/, loader: 'style!css!sass'
      }
    ]
  },

  plugins: [
    new StaticSiteGeneratorPlugin('bundle.js', data.routes, data)
  ],

  devServer: {
		contentBase: './build',
		historyApiFallback: true,
		port: 8080
	}
}
