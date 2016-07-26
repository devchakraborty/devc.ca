var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

var env = process.env.NODE_ENV;

module.exports = {
	entry: {
    html: './src/index.html',
		javascript: './src/js/index.js',
    css: './src/sass/index.sass'
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
				test: /\.(png|jpg|svg|eot|ttf|woff|woff2|pdf)$/, loader: 'url?limit=8192'
			},
			{
				test: /\.js$/, exclude: /node_modules/, loader: (env=='production'?'':'source-map!')+'babel'
			},
			{
				test: /\.(css|scss|sass)$/, loader: 'file?name=bundle.css!postcss!sass'
			},
      {
        test: /\.rive$/, loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.json$/, loader: 'json'
      }
		]
	},
	devServer: {
		contentBase: './build',
		historyApiFallback: true,
		port: 8000
	},
	postcss: function() {
		return [autoprefixer];
	},
	plugins: env == 'production' ? [new webpack.optimize.UglifyJsPlugin({minimize:true, comments:false})] : []
};

if (env == 'production')
	module.exports.devtool = 'source-map';
