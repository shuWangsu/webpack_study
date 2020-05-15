const { resolve } = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-asset-webpack-plugin')
// 定义nodejs 环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

// 复用 loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')()
      ]
    }
  }
]
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    /**
     * 正常来讲，一个文件只能被一个loader处理
     * 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
     */
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          ...commonCssLoader
        ],
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          ...commonCssLoader,
          'less-loader',
        ],
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        // 优先执行
        enforce:'pre',
        loader:'eslint-loader',
        options:{
          fix: true
        }
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
          presets: [
            [
              '@babel/preser-env',
              {
                useBuiltIns:'usage',
                corejs:{version:3},
                targets:{
                  chrome:'60',
                  firefox:'50'
                }
              }
            ]
          ]
        }
      },
      {
        test:/\.(jpg|png|gif)$/,
        loader:'url-loader',
        options: {
          limit: 8*1024,
          name:'[hash:10].[ext]',
          outputPath:'imgs',
          esModule:false
        }
      },
      {
        test:/\.html$/,
        loader:'html-loader'
      },
      {
        exclude:/\.(js|png|css|less|html|gif|jpg)$/,
        loader:'file-loader',
        options:{
          outputPath:'media'
        }
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.css',
    }),
    new OptimizeCssAssetWebpackPlugin(),
    new HtmlWebpackPlugins({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    })
  ],
  mode: 'production',
};
