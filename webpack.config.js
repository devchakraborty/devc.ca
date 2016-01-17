var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

var env = process.env.NODE_ENV;

module.exports = {
	entry: {
		javascript: './src/js/index.js',
		html: './src/index.html'
	},
	output: {
		path: './build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.(html)$/, loader: 'file?name=[name].[ext]'
			},
			{
				test: /\.(png|jpg|jpeg|svg|eot|ttf|woff|woff2|pdf)$/, loader: 'url?limit=8192'
			},
			{
				test: /\.js$/, exclude: /node_modules/, loader: (env=='production'?'':'source-map!')+'babel'
			},
			{
				test: /\.(css|scss)$/, loader: 'style!css!postcss!sass'
			}
		]
	},
	devServer: {
		contentBase: './build',
		historyApiFallback: true,
		port: 7000
	},
	postcss: function() {
		return [autoprefixer];
	},
	plugins: env == 'production' ? [new webpack.optimize.UglifyJsPlugin({minimize:true, comments:false})] : []
};

if (env == 'production')
	module.exports.devtool = 'source-map';
