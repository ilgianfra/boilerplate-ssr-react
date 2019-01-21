const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, './../.env') });
const LoadablePlugin = require('@loadable/webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(dotenv.parsed) }),
    new LoadablePlugin()
  ],
});
