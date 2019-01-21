const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, './../.env') });
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // eslint-disable-line
const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(dotenv.parsed) }),
    new LoadablePlugin(),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimizer: [new UglifyJSPlugin({
      parallel: true,
      uglifyOptions: {
        compress: {
          pure_funcs: ['console.log']
        }
      }
    })],
  },
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './../dist'),
    filename: '[name].js',
  }
});
