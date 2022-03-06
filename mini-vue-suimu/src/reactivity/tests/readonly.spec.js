import { readonly } from '../reactive'
describe('readonly', () => {
  it('happy path', () => {
    // 和reactive没有其他区别，只是readonly没有set
    // 也就是他不需要触发依赖，也就不需要依赖收集
    const original = { foo: 1, bar: { baz: 2 } }
    const wrapped = readonly(original)
    expect(wrapped).not.toBe(original)
    expect(wrapped.foo).toBe(1)
  })

  it('warn when call set', () => {
    // mock 数据
    console.warn = jest.fn()

    const user = readonly({
      age: 10,
    })
    user.age = 11
    expect(console.warn).toBeCalled()
  })
})
