const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'none',
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:5].js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src']
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss|less)$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader?singleton',
          use: [
            'css-loader?modules=false&localIdentName=[path][name]-[local]-[hash:5]',
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: false,
        removeAttributeQuotes: false
      },
      //chunks: ['app'],
      inject: true
    }),
    new ExtractTextPlugin({
      filename: '[name]-[hash:5].css'
    }),
    new CleanPlugin()
  ]
}