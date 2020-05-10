const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devServer = {
  port: 4000,
  open: true,
  disableHostCheck: true,
  historyApiFallback: true,
  overlay: true,
  stats: 'minimal',
  inline: true,
  compress: true,
  contentBase: '/',
}

const VENDOR_LIBS = [
  '@material-ui/core',
  '@material-ui/icons',
  '@material-ui/styles',
  'axios',
  'react',
  'react-dom',
  'react-redux',
  'react-router-dom',
  'react-toastify',
  'redux',
  'redux-form',
  'redux-saga',
  'redux-thunk',
  'classnames',
]

const optimization = {
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all',
      },
    },
  },
  runtimeChunk: {
    name: 'manifest',
  },
}

module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    // chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: '/node_modules',
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      },
      {
        loader: 'file-loader',
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/,
      },
    ],
  },
  optimization: optimization,
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  devServer,
}
