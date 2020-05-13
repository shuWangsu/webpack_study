/**
 * webpack.config.js webpack 的配置文件
 * 作用:指示webpack 干那些活 (当你运行webpack指令时，会加载里面的配置)
  所有构件工具都是基于nodejs平台运行的 模块化默认采用common.js
 */
// resolve用来拼接绝对路径
const { resolve } = require('path')
module.exports = {
  // webpack 配置
  // 入口起点
  entry:'./src/index.js',
  // 输出
  output: {
    // 输出文件名
    filename:'built.js',
    // 输出路径
    path:resolve(__dirname,'build')
  },
  module: {
    rules: [
      // 详细loader配置
      // 不同文件必须配置不同的loader处理
      {
        // 配置哪些文件
        test:/\.css$/,
        // 使用哪些loader进行处理
        use:[
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          // 将css文件变成 commonjs模块加载js中，里面内容是样式字符串        
          'css-loader'
        ]
      },
      {
        test:/\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          // 需要下载 less-loader 和less
          'less-loader'
        ]
      }
    ]
  },
  // plugins的配置
  plugins: [
    // 详细plugins的配置
  ],
  // 模式
  mode:'development'
}