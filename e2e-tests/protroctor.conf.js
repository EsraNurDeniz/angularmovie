// jshint strict: false
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config.js');
 
let server;
 
exports.config = {
  allScriptsTimeout: 11000,
 
  specs: ['*.js'],
 
  capabilities: {
    browserName: 'chrome',
  },
 
  baseUrl: 'http://localhost:8000/',
 
  beforeLaunch: () => {
    const compiler = webpack(webpackConfig);
    server = new WebpackDevServer(compiler, {
      publicPath: '/bundle',
      contentBase: path.resolve(__dirname, './'), // New
      compress: true,
      watchContentBase: true,
      watchOptions: {
        poll: true,
      },
    });
    server.listen(8000, () => {});
  },
 
  framework: 'jasmine',
 
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
  },
};