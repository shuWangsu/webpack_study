/**
 * css兼容性处理：需要用到postcss ,postcss需要postcss-loader
 * 还需要 postcss-preset-env插件（能够帮助postcss识别某些环境）
 * postcss-preset-env插件帮postcss找到package.json中的browserslist
 * 所以需要在package.json中的设置browserslist
 *   "browserslist":{
    "development":[
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
        ],
        "production":[
          ">0.2%",
          "not dead",
          "not op_mini all"
        ]
      }
 * 里面的配置，通过配置加载指定的css兼容性样式
 */
const { resolve } = require('path')
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 设置node环境变量
process.env.NODE_ENV = 'production'
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
          'css-loader',
          // 'postcss-loader' ---> 使用loader的默认配置
          // 修改loader的配置
          {
            loader:'postcss-loader',
            options: {
              ident:'postcss',
              plugins:() => [
                // postcss 的插件
                require('postcss-preset-env')
              ]
            }
          }
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