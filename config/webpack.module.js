const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: './src/DataDisplay.tsx',
  output: {
    path: path.join(__dirname, '..', 'lib'),
    filename: 'DataDisplay.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  externals: {
    react: ['react'],
    antd: ['antd']
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new CleanWebpackPlugin(
      ['lib'],
      {
        root: path.resolve(__dirname, '..'),
        verbose: false
      }
    ),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/DataDisplay.d.ts')
      }
    ])
  ]
})
