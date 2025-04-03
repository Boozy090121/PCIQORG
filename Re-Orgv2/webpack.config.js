const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
<<<<<<< HEAD
=======
const CopyWebpackPlugin = require('copy-webpack-plugin');
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@store': path.resolve(__dirname, 'src/store')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
<<<<<<< HEAD
      template: './public/index.html'
    })
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000
=======
      template: './public/index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: './src/styles/global.css', 
          to: 'styles.css' 
        },
        {
          from: './public',
          to: '',
          globOptions: {
            ignore: ['**/index.html']
          }
        }
      ]
    })
  ],
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94
  }
}; 