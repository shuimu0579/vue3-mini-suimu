class ReactiveEffect {
    private _fn : any;

    constructor(fn, public scheduler?){
        this._fn = fn
    }
    run(){
        activeEffect = this
        return this._fn();
    }
}

const targetMap = new Map();
export function track(target, key){
    // targetMap(target -> depsMap(key -> dep)), 
    // 其中targetMap建立target和depsMap的关系
    // depsMap建立key和dep之间的关系

    //dep是一个数组，其中包含了多个fn(effect函数调用时候的传参)

    let depsMap = targetMap.get(target)
    if(!depsMap){
        depsMap = new Map()
        targetMap.set(target,depsMap)
    }

    let dep = depsMap.get(key)
    if(!dep){
        dep = new Set()
        depsMap.set(key, dep)
    }

    dep.add(activeEffect)
}

export function trigger(target,key){
    let depsMap = targetMap.get(target)
    let dep = depsMap.get(key)
    for(let effect of dep){
        if(effect.scheduler){
            effect.scheduler()
        }else{
            effect.run()
        } 
    }
}

let activeEffect;  //记录当前ReactiveEffect的实例对象
export function effect(fn, options:any = {}){
    const _effect = new ReactiveEffect(fn, options.scheduler);
    console.log('_effect',_effect)
    _effect.run()

    return _effect.run.bind(_effect)
}