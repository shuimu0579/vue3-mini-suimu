import { baseParse } from "../src/parse"
import { generate } from "../src/codegen"
import { transform } from "../src/transform"

describe("codegen", () => {
  it("string", () => {
    const ast = baseParse('hi')

    transform(ast)
    const {code} = generate(ast)

    // 快照(string) yarn test codegen
    // 更新快照(加u) yarn test codegen -u
    expect(code).toMatchSnapshot()
  })
})


