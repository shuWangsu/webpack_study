/**
 * 开发环境配置：能让代码运行
 * 运行项目指令：
 * webpack 会将打包结果输出出去
 * npx webpack-dev-server 只会在内存中编译打包，没有输出
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/built.js',
    path:resolve(__dirname,'build')
  },
  module: {
    rules: [
      // loader的配置
      {
        test: /\.less$/,
        use: ['style-loader','css-loader','less-loader']
      },
      {
        test:/\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        // 处理图片资源
        test:/\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8*1024,
          name:'[hash:10].[ext]',
          // 关闭es6模块化
          esModule:false,
          outputPath:'imgs'
        }
      },
      {
        // 处理HTML中的img
        test: /\.html$/,
        loader:'html-loader'
      },
      {
        // 处理其他的资源
        exclude:/\.(html|js|css|less|jpg|png|gif)$/,
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]',
          outputPath:'media'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode:'development',
  // 开发服务器devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动DevServer指令为：npx webpack-dev-server
  devServer: {
    // contentBase 代表要运行的项目的目录
    contentBase: resolve(__dirname,'build'),
    // 启动gzip压缩
    compress:true,
    // 端口号
    port:3000,
    // 自动打开浏览器
    open:true
  }
}