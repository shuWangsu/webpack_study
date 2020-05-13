/**
 * 1.webpack能处理js/json资源，不能处理css/img等其他资源
 * 2.生产环境和开发环境将ES6模块编译成浏览器能识别的模块化
 * 3.生产环境和开发环境对一个压缩代码
 */

import data from './data.json'
import './index.css'
console.log(data)
function add (x,y){
  return x+y
}
console.log(add(5,8))