
export function generate(ast){
  const context = createCodegenContext()
  const {push} = context
  push("return ")

  const functionName = "render"
  const args = ["_ctx", "_cache"]
  const signature = args.join(", ")
  push(`function ${functionName}(${signature}){`)

  push(`return `)
  genNode(ast.codegenNode, context)
  push("}")

  return {
    // code: `
    
    // return function render(_ctx, _cache, $props, $setup, $data, $options) {
    //   return "hi"
    // }
    
    // `

    code: context.code
  }
}

function createCodegenContext(): any{
  const context = {
    code:"",
    push(source){
      console.log('source',source)
      context.code += source
    }
  }
  return context
}

function genNode(node: any, context){
  const { push } = context
  push(`'${node.content}'`)
}
