import { hasOwn } from "../shared/index";

const publicPropertiesMap = {
    $el: (i) => i.vnode.el,
    // $slot
    $slots: (i) => i.slots 
}

export const PublicInstanceProxyHandlers = {
    get({_:instance}, key){
        // setupState
        const { setupState, props} = instance;
        if(hasOwn(setupState, key)){
            return setupState[key];
        }else if(hasOwn(props, key)){
            return props[key]
        }
        // key -> $el
        const publicGetter = publicPropertiesMap[key];
        if(publicGetter){
            return publicGetter(instance)
        }

        //$data
        
    }
}