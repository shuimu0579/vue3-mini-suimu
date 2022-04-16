
import { NodeTypes } from "../src/ast"
import { baseParse } from "../src/parse"
import { transform } from "../src/transform"


describe('transform', () => {
  it("happy path", () => {
    const ast = baseParse("<div>hi,{{message}}</div>")
    console.log('ast',ast);

    // plugin代表可变部分，这样程序的可扩展性是非常强的
    const plugin = (node) =>{
      if(node.type === NodeTypes.TEXT){
        node.content = node.content + " mini-vue";
      }
    }
    transform(ast, {
      nodeTransforms: [plugin]
    })
    const nodeText = ast.children[0].children[0]
    expect(nodeText.content).toBe('hi, mini-vue')
  })
})
