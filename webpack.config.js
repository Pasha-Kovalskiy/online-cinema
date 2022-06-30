const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const fileName = (extension) => {
   return isDev ? `bundle.${extension}` : `bundle.[hash].${extension}`;
};

module.exports = {
   mode: 'development',
   entry: path.resolve(__dirname, 'src', 'index.js'),
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: fileName('js'),
   },
   devtool: isDev ? 'source-map' : false,
   devServer: {
      port: 8000,
      hot: isDev,
      open: isDev,
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
               },
            },
         },
         {
            test: /\.(s[ac]ss|css)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
         },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         filename: isDev ? 'index.html' : 'index.[hash].html',
         template: path.resolve(__dirname, 'public', 'index.html'),
         favicon: path.resolve(__dirname, 'public', 'favicon.png'),
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
         filename: fileName('css'),
      }),
   ],
};
