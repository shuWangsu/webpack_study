const { resolve } = require('path')
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname,'build')
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        use: [
          // style-loader作用：创建style标签，将样式放入
          // 'style-loader',
          // 这个loader 取代style-loader，作用：提取js中的css成单独的文件
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      // 对输出的文件进行重命名
      filename: 'css/main.css'
    })
  ],
  mode:'development',
  devServer:{
    contentBase: resolve(__dirname,'build'),
    compress: true,
    port:3000,
    open:true
  }
}