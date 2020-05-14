const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        // 要使用多个loader处理用use
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // 处理图片资源,但存在一个问题，就是默认处理不了 HTML中的img图片
        test: /\.(jpg|png|gif)$/,
        // 使用一个loader的时候，直接用loader
        // 需要下载两个包 url-loader file-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于 8 kb ，就会被base64处理
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 问题：因为url-loader 默认使用ES6模块化解析，而html-loader引入图片是commonJS
          // 解析时会出问题
          // 解决：关闭url-loader的ES6模块化，使用commonjs解析
          esModule:false,
          // 给图片进行重命名
          // [hash:10]取图片的hash的前10位
          // [ext]取文件原来扩展名
          name:'[hash:10].[ext]'
        }     
      },
      {
        test:/\.html$/,
        // 专门处理HTML文件中的img图片（负责引入img，从而能被url-loader进行处理）
        loader:'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}