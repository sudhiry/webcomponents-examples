var path = require('path');
var webpack = require('webpack');

var examples = path.resolve(__dirname, 'examples');


module.exports = {
  devtool: 'eval',
  mode: 'development',
  entry: {
    'react-web-component': path.resolve(examples, 'react-web-component/src/index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      include: examples
    }]
  }
};