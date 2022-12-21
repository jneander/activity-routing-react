const path = require('path')

const webpack = require('webpack')

const pkgPath = path.join(__dirname, '..')
const srcPath = path.join(pkgPath, 'src')

module.exports = {
  devtool: 'eval',

  mode: 'none',

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',

                  {
                    corejs: {
                      proposals: false,
                      version: 3,
                    },

                    modules: false,

                    targets: {
                      browsers: require('./browserslist'),
                    },

                    useBuiltIns: 'usage',
                  },
                ],

                '@babel/preset-typescript',
                '@babel/react',
              ],
            },
          },
        ],
      },
    ],
  },

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },

  output: {
    filename: 'js/[name].js',
    path: path.join(pkgPath, '__build__'),
    pathinfo: false,
    publicPath: '/',
  },

  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [srcPath, 'node_modules'],
  },

  stats: {
    colors: true,
  },
}
