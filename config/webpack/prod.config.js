const webpackNodeExternals = require('webpack-node-externals');

const rules = require('./rules');
const {
  packageVersionPlugin,
  envPlugin,
  terserPlugin,
  webpackShellPlugin,
} = require('./plugins');

const mode = 'production';

console.log('Production build..');

module.exports = () => ({
  mode,
  target: 'node',
  externals: [webpackNodeExternals()],
  entry: {
    'server': './src/server.js',
  },
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'false',
  optimization: {
    minimizer: [
      terserPlugin
    ],
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
