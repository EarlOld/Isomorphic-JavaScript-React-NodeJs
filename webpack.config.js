const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = () => {
  return ({
    entry: ['babel-polyfill', './src/client.js'],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css/,
          use: [ 'css-hot-loader' ].concat(ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [ 'css-loader' ]
          }))
        },
        {
          test: /\.styl/,
          use: [ 'css-hot-loader' ].concat(ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'stylus-loader']
          }))
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader'
            }
          ]
        },
        {
          test: /\.svg/,
          use: [ 'url-loader?limit=26000&mimetype=image/svg+xml' ]
        },
        {
          test: /\.(woff|woff2|ttf|eot)/,
          use: [ 'url-loader?limit=1' ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' }
    },
    plugins: [
      new ExtractTextPlugin('bundle.css'),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          BROWSER:  JSON.stringify(true),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
      })
    ]
  })
}
