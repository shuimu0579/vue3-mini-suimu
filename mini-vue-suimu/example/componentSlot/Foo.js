import { h, renderSlots } from '../../lib/guide-mini-vue.esm.js'

export const Foo = {
    setup(){
        return {}
    },
    render(){
        const foo = h("p", {}, "foo");
        // Foo .vnode .children
        console.log(this.$slots);

        // renderSlots
        //具名插槽：怎么做到定点渲染？
        //获取到要渲染的元素1
        //获取到要渲染的位置2

        //作用域插槽
        const age = 18;
        return h('div', {}, [
            renderSlots(this.$slots, "header", {
                age
            }),
            foo, 
            renderSlots(this.$slots, "footer")
        ])
    }
}