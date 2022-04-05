// 老的是array
// 新的是array

import {ref, h} from '../../lib/guide-mini-vue.esm.js'
const nextChildren = [h("div", {}, "C"), h("div", {}, "D")];
const prevChildren = [h("div", {}, "A"), h("div", {}, "B")];

export default {
    name: "ArrayToArray",
    setup(){
        const isChange = ref(false);
        // 将isChange挂载在window上，就可以通过Console控制台来改变isChange
        // Console面板里面输入isChange.value = true
        window.isChange = isChange;
        return {
            isChange,
        };
    },
    render(){
        const self = this;
        return self.isChange === true
            ? h("div", {}, nextChildren)
            : h("div", {}, prevChildren)
    }
}