// 组件 provide 和 inject 功能
import {
  h,
  provide,
  inject,
} from '../../lib/guide-mini-vue.esm.js'

const Provider = {
  name:"Provider",
  setup() {
    provide("foo", "fooVal");
    provide("bar", "barVal");
  },
  render(){
    return h("div", {}, [h("p", {}, "Provider"), h(ProviderTwo)]);
  }
};

const ProviderTwo = {
  name:"ProviderTwo",
  setup() {
    provide("foo", "fooTwo")
    const foo = inject("foo");
    return {
      foo
    }
  },
  render(){
    return h("div", {}, [h("p", {}, `ProviderTwo foo:${this.foo}`), h(Consumer)]);
  }
};

const Consumer = {
  name:"Consumer",
  setup() {
    const foo = inject("foo");
    const bar = inject("bar");
    // const baz = inject("baz", "bazDefault")
    const baz = inject("baz", () => "bazDefault")
    return{
      foo,
      bar,
      baz
    }
  },

  // template模板 最终生成的是 render(){}函数
  // template模板的解析，涉及3种类型的编译：element类型、插值类型、text类型
  // https://vue-next-template-explorer.netlify.app/#eyJzcmMiOiI8ZGl2PkhlbGxvIFdvcmxkPC9kaXY+Iiwib3B0aW9ucyI6e319
  template:`<div>Consumer: xxx</div>`,

  render(){
    return h("div", {}, `Consumer: - ${this.foo} - ${this.bar}-${this.baz}`);
  }
};

export default {
  name: "App",
  setup() {
  },
  render(){
    return h("div", {}, [h("p", {}, "apiInject"), h(Provider)]);
  }
};
