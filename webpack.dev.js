const { merge } = require('webpack-merge');
const config = require('./webpack.config');
const path = require('path');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'source-map',
  watch: true
});
