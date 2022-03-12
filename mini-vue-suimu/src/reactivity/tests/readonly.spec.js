import { readonly, isReadonly, isProxy } from '../reactive'
describe('readonly', () => {
  it('happy path and should make nested values readonly', () => {
    // 和reactive没有其他区别，只是readonly没有set
    // 也就是他不需要触发依赖，也就不需要依赖收集
    const original = { foo: 1, bar: { baz: 2 } }
    const wrapped = readonly(original)
    expect(wrapped).not.toBe(original)
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(original)).toBe(false)
    expect(isReadonly(wrapped.bar)).toBe(true)
    expect(isReadonly(original.bar)).toBe(false)
    expect(isProxy(wrapped)).toBe(true)

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
