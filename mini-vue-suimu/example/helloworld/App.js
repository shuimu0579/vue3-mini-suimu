import {h} from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js'

window.self = null;

export const App = {
    name:"App",
    render(){
        window.self = this;
        // ui
        return h(
            'div', 
            {
                id: "root",
                class: ["red", "hard"],
                onClick(){
                    console.log('click');
                },
                onMousedown(){
                    console.log('mousedown')
                }
            }, 
            [h("div", {}, "hi," + this.msg), h(Foo, {count: 1})]
            // string
            // setupState
            // this.$el -> get 当前组件的 root  element
            // 'hi, ' + this.msg
            // 'hi, mini-vue'
            // array
            // [h('p',{ class:"red" }, 'hi'), h('p', {class:'blue'}, 'mini-vue')]
        );
    },
    setup() {
        // composition api
        return {
            msg: "mini-vue"
        }
    }
}