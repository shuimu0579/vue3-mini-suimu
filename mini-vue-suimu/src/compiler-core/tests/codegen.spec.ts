import { baseParse } from "../src/parse"
import { generate } from "../src/codegen"
import { transform } from "../src/transform"
import { transformExpression } from "../src/transforms/transformExpress"
import { transformElement } from "../src/transforms/transformElement"

describe("codegen", () => {
  it("string", () => {
    const ast = baseParse('hi')

    transform(ast)
    const {code} = generate(ast)

    // 快照(string) yarn test codegen
    // 更新快照(加u) yarn test codegen -u
    expect(code).toMatchSnapshot()
  })

  it("interpolation", () => {
    const ast = baseParse('{{message}}')
    transform(ast, {
      nodeTransforms: [transformExpression]
    })
    const {code} = generate(ast)
    expect(code).toMatchSnapshot() 
  })

  it("element", () => {
    const ast = baseParse('<div></div>')
    transform(ast, {
      nodeTransforms: [transformElement]
    })
    const {code} = generate(ast)
    expect(code).toMatchSnapshot() 
  })
})


