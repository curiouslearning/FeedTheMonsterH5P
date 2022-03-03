const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
      use: ["style-loader", "css-loader"]
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      use: ["style-loader", "css-loader"]
    }]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.json' ],
  },
  output: {
    filename: 'react-slideshow.js',
    path: path.resolve(__dirname, './H5P.ReactSlideshow/'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/**.json',
          to: '[name][ext]'
        },
        {
          from: 'src/content',
          to: './content/'
        }
      ]
    })
  ]
};
