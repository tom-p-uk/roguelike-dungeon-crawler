const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = ['react', 'react-dom'];

module.exports = {
  entry: {
    // i want to output a file called bundle and i want to start with index.js
    bundle: './src/index.js',
    // output a file called vendor and use the vendor strings in the VENDOR_LIBS arr
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, '/dist'),
    // allocate output filenames based on the contents of 'entry', & chunk hash creates unique name for caching purposes
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      },
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: [
          {
            loader: 'url-loader',
            options: { limit: 4000 }
          },
          'image-webpack-loader'
        ],
        test: /\.(jpe?g|png|gif|svg)$/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
    //   // if any dependency modules are the same in both output files, pull them out and add only to vendor (name: 'vendor')
    //   name: 'vendor'

      // create manifest.js to better tell the browser whether vendor.js has actually changed. see below
      names: ['vendor', 'manifest']
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
