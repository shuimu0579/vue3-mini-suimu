import { extend } from "../shared";

let activeEffect;  //记录当前ReactiveEffect的实例对象
let shouldTrack;
export class ReactiveEffect {
    private _fn : any;
    deps = [];
    active = true;
    onStop?: () => void;

    constructor(fn, public scheduler?){
        this._fn = fn
    }
    run(){
        if(!this.active){
            return this._fn();
        }

        shouldTrack = true;
        activeEffect = this

        const result = this._fn();
        // reset
        shouldTrack = false;

        return result;
    }
    stop(){
        if(this.active){
            cleanupEffect(this);
            if(this.onStop){
                this.onStop()
            }
            this.active = false;
        } 
    }
}

function cleanupEffect(effect){
    effect.deps.forEach((dep:any) => {
        dep.delete(effect)
    });
    effect.deps.length = 0;
}

const targetMap = new Map();
export function track(target, key){
    if(!isTracking()) return;

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

    trackEffects(dep)
}

export function trackEffects(dep:any){
    if (dep.has(activeEffect)) return;
    dep.add(activeEffect);
    (activeEffect as any).deps.push(dep);
}


export function trigger(target,key){
    let depsMap = targetMap.get(target)
    let dep = depsMap.get(key)
    triggerEffects(dep)
}

export function triggerEffects(dep:any){
    for(let effect of dep){
        if(effect.scheduler){
            effect.scheduler()
        }else{
            effect.run()
        } 
    } 
}

export function effect(fn, options:any = {}){
    const _effect = new ReactiveEffect(fn, options.scheduler);

    //extend 公共方法
    extend(_effect,options)

    // console.log('_effect',_effect)
    _effect.run()

    const runner:any = _effect.run.bind(_effect)
    runner.effect = _effect;
    return runner
    
}

export function stop(runner:any){
    runner.effect.stop()
} 

export function isTracking(){
    return shouldTrack && activeEffect !== undefined
}
