const path = require('path')

const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = {
  entry: './demo/index.tsx',
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'src': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: [resolve('demo'), resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.(tsx?|jsx)$/,
        include: [resolve('demo'), resolve('src')],
        use: 'ts-loader'
      }
    ]
  }
}
