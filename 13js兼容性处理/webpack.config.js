/**
 * js兼容性处理：使用 babel-loader
 * 1.需要下载  babel-loader @babel/preset-env @babel/core
 * 存在问题：只能转换基本语法，如 promise 不能转换
 * 2.全部js兼容性处理    @babel/polyfill
 * 下载完 @babel/polyfill 这个包后，直接在要使用高级语法的 js文件前面 引入即可
 *  import '@babel/polyfill'
 * 问题：使用 @babel/polyfill 是将所有兼容性代码全部引入了，而我只要解决部分兼容性问题，体积太大了
  3.需要做兼容性处理的就做：按需加载
    需要下载：  core-js
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js的版本
                corejs: {
                  version: 3,
                },
                // 指定兼容性做到哪个版本的浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  edge: '17',
                },
              },
            ],
          ],
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
