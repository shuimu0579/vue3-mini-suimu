class ReactiveEffect {
    constructor(fn){
        this._fn = fn
    }
    static run(){
        activeEffect = this
        // console.log('this...', this)
        this._fn();
    }
}

let activeEffect
const _effect = new ReactiveEffect(()=>{});
// console.log('_effect',_effect)
let res = _effect.run()
// console.log('res...', res)