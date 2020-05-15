/**
 * 语法检查：eslint-loader eslint
 * 注意只检查自己写的代码，第三方的库是不用检查的
 * 设置检查规则：在package.json中的eslintConfig中设置
 * "eslintConfig": {
    "extends": "airbub-base"
    }
 * 需要下载 eslint-config-airbnb-base  eslint  eslint-plugin-import三个库
 */
const { resolve } = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误
          fix: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugins({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
};
