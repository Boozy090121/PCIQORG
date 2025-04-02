const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript'
            ]
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@core': path.resolve(__dirname, '../src/components/Core'),
      '@ui': path.resolve(__dirname, '../src/components/UI'),
      '@features': path.resolve(__dirname, '../src/features'),
      '@services': path.resolve(__dirname, '../src/services'),
      '@models': path.resolve(__dirname, '../src/models'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@config': path.resolve(__dirname, '../config')
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../public')
    },
    port: 3000,
    hot: true,
    historyApiFallback: true
  },
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false
}; 