/**
  生产环境下会自动压缩 js 代码

  要压缩 HTML代码的话，直接在 plugins 里面设置
  new HtmlWebpackPlugins({
      template: './src/index.html',
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      },
    })
 */
const { resolve } = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugins({
      template: './src/index.html',
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
  ],
  mode: 'production',
};
