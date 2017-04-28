var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var env = process.env.NODE_ENV;

module.exports = {
	entry: {
		'bundle.js': './src/js/index.js',
		'bundle.css': './src/scss/index.scss'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name]'
	},
	module: {
		loaders: [
			{
				test: /\.(html)$/, loader: 'file-loader?name=[name].[ext]'
			},
			{
				test: /\.js$/, exclude: /node_modules/, loader: (env=='production'?'':'source-map-loader!')+'babel-loader'
			},
			{
				test: /\.(css|scss)$/, loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader!sass-loader'
				})
			}
		]
	},
	devServer: {
		contentBase: './build',
		historyApiFallback: true,
		port: 7000
	},
	plugins: [
		new ExtractTextPlugin('bundle.css')
	]
};

if (env == 'production')
	module.exports.devtool = 'source-map';