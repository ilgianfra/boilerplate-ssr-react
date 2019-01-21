const path = require('path');

module.exports = {
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  entry: { client: './src/client/index.js' },
  output: {
    path: path.resolve(__dirname, './../public'),
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  },
  optimization: {
    // named attributes set to true in order to avoid download of inexisting chunks
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      // chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        }
      }
    },
  }
};
