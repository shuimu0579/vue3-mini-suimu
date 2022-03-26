import {h} from '../../lib/guide-mini-vue.esm.js'

export const Foo = {
    setup(props, { emit }){
        // props.count
        console.log('props', props);

        // props shallowreadonly
        props.count++;
        console.log('props', props);

        const emitAdd = () => {
            emit("add", 1, 2)
            emit("add-foo")
        }

        return {
            emitAdd
        }
    },
    render(){
        const btn = h("button", {
            onClick: this.emitAdd
        }, "emitAdd")
        const foo = h("p", {}, "foo: " + this.count);
        return h('div', {}, [foo, btn])
    }
}