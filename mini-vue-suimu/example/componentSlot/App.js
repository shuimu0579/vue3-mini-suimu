import { h, createTextVNode } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js'

export const App = {
  name: 'App',
  render() {
    const app = h('div', {}, 'App')
    // 单个 vnode
    // const foo = h(Foo, {}, h('p', {}, "000"));
    // array
    // const fooArray = h(Foo, {}, [h('p', {}, "123"), h('p', {}, "456")]);
    
    // object key
    const fooObject = h(
      Foo, 
      {}, 
      {
        header: ({age}) => [h('p', {}, "header" + age), createTextVNode("你好呀")], 
        footer: () => h('p', {}, "footer")
      }
    );
    // return h('div', {}, [app, foo, fooArray])
    return h('div', {}, [app, fooObject])
  },
  setup() {
    return {}
  },
}
