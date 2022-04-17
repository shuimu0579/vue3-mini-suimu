// mini-vue 的出口
export * from './runtime-dom/index';

import {baseCompiler} from './compiler-core/src'
import * as runtimeDom from './runtime-dom'
import {registerRuntimeCompiler} from './runtime-dom'
function compilerToFunction(template){
  const {code} =  baseCompiler(template)
  const render = new Function("Vue", code)(runtimeDom)
  return render;
}
registerRuntimeCompiler(compilerToFunction)

