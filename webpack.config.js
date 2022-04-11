const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
var nodeEnv = process.env.NODE_ENV || 'development';
var isDev = (nodeEnv !== 'production');

var config = {
  mode: 'development',
  watch: true,
  // entry: './src/index.ts',
  entry: {
    dist: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'react-slideshow.js',
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]',
          },
        },
      ],
    },
    {
      test: /\.(WAV|mp3)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'assets/audio/[contenthash].[ext]',
          },
        },
      ],
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.json', '.css' ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/**.json',
          to: '[name][ext]'
        },
        {
          from: './',
          to: '../H5P.ReactSlideshow'
        }
      ]
    })
  ]
};

if(isDev) {
  config.devtool = 'inline-source-map';
}

module.exports = config
