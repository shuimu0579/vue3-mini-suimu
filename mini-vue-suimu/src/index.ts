// mini-vue 的出口
export * from './runtime-dom/index';

import {baseCompiler} from './compiler-core/src'
import * as runtimeDom from './runtime-dom'
import {registerRuntimeCompiler} from './runtime-dom'
function compilerToFunction(template){
  const {code} =  baseCompiler(template)

  console.log('runtimeDom', runtimeDom)
  console.log('code', code)
  // Function构造新函数的使用 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function
  // Function允许我们将任意字符串变为函数,也就是将code这个字符串，变为函数render
  const render = new Function("Vue", code)(runtimeDom)
  return render;
}
registerRuntimeCompiler(compilerToFunction)

