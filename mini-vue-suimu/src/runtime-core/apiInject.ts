import { getCurrentInstance } from "./component";

export function provide(key:any, value:any){
    // 存
    // key value
    const currentInstance:any = getCurrentInstance();
    if(currentInstance){
        let { provides } = currentInstance;
        const parentProvides = currentInstance.parent.provides;

        // init
        // 当前实例的provides的原型 就指向 parentProvides
        if(provides === parentProvides){
            provides = currentInstance.provides = Object.create(parentProvides)
        }
        provides[key] = value;
    }
}

export function inject(key:any, defaultValue){
    // 取
    const currentInstance:any = getCurrentInstance()
    if(currentInstance){
        const parentProvides = currentInstance.parent.provides;

        if(key in parentProvides){
            return parentProvides[key]
        }else if(defaultValue){
            if(typeof defaultValue === 'function'){
                return defaultValue()
            }
            return defaultValue
        }
    }
}