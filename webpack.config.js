var path              = require('path');
var webpack           = require('webpack');
var precss            = require('precss');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var rootPath          = path.resolve( __dirname );

module.exports = {
  entry: {
    site: [
      './javascripts/site/index.jsx',
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://0.0.0.0:8080'
    ],
    platform: [
      './javascripts/platform/index.jsx',
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://0.0.0.0:8080'
    ]
  },
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: "[name].js",
    publicPath: '/'
  },
  module: {
     loaders: [
       {
         test: /\.jsx?$/,
         exclude: /(node_modules)/,
         loaders: ['react-hot', 'babel']
       },
       {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
       },
       {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
       },
       {
        test: /\.(svg|png|jpe?g|gif|ico|svg)$/,
        loader: 'file-loader?name=assets/images/[name].[ext]'
       },
       {
        test: /\.(svg\?inline)$/i,
        loader: 'svg-inline'
       },
       {
        test: /\.(mp4|mov|webm)$/,
        loader: 'file-loader?name=assets/videos/[name].[ext]'
       },
       {
        test: /\.(ttf|eot|otf|woff(2)?)(\w+)?$/,
        loader: 'file-loader?name=assets/fonts/[name].[ext]'
       }
     ]
   },
   resolve: {
     root: [
       path.resolve('./assets'),
       path.resolve('./javascripts'),
       path.resolve('./stylesheets')
     ],
     extensions: ['', '.js', '.jsx', '.scss', '.svg']
   },
   plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['site'],
      template: './layouts/site.html',
      filename: 'site.html',
      title: 'Site Template'
    }),
    new HtmlWebpackPlugin({
      chunks: ['platform'],
      template: './layouts/platform.html',
      filename: 'platform.html',
      title: 'Platform Template'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': process.env.NODE_ENV
      }
    }),
    new ExtractTextPlugin("[name].css")
   ]
};