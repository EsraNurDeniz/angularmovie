//  jshint strict: false
const webpackConfig = require('./webpack.config.js');
webpackConfig.mode = 'development';
module.exports = function(config) {
  config.set({

    basePath: './app/src',

    files: [
      '../../node_modules/angular/angular.js',
      '../../node_modules/angular-mocks/angular-mocks.js',
      '**/*.module.js',
      '*!(.module|.spec).js',
      '**/*.spec.js',
    ],

    preprocessors: {
 
      '**/*.module.js': ['webpack'],
      '*!(.module|.spec).js': ['webpack'],
      '**/*.spec.js': ['webpack'],
    },
    // eslint-disable-next-line global-require
    webpack: webpackConfig,

    webpackMiddleware: {
      writeToDisk: true,
    },

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'ChromeHeadless'],

    customLaunchers: {
			ChromeHeadless: {
				base: 'Chrome',
				flags: [ '--headless', '--disable-gpu', '--disable-translate', '--disable-extensions', '--remote-debugging-port=9223', '--no-sandbox' ]
			},
			ChromeDebugging: {
				base: 'Chrome',
				flags: [ '--disable-translate', '--disable-extensions', '--remote-debugging-port=9333' ]
			}
		},
    port: 9976,
    plugins: ['karma-webpack',
              'karma-chrome-launcher',
              'karma-jasmine',
              'karma-coverage' ],

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      includeAllSources: true,
      dir: '../coverage/',
      reporters: ['html', { type: 'text-summary' }],
    }

  });
};
