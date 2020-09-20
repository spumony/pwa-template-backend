const webpackNodeExternals = require('webpack-node-externals');

const rules = require('./rules');
const {
  packageVersionPlugin, envPlugin, webpackShellPlugin
} = require('./plugins');

const mode = 'development';

console.log('Development build..');

module.exports = () => ({
  mode,
  target: 'node',
  externals: [webpackNodeExternals()],
  devtool: 'false',
  entry: {
    'server': './src/server.js',
  },
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    envPlugin(mode),
    packageVersionPlugin(),
    webpackShellPlugin({
      onBuildEnd: ['npm run swagger-build']
    })
  ],
  module: {
    rules
  }
});
