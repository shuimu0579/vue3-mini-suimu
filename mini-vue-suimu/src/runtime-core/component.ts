import { proxyRefs } from "../reactivity";
import { shallowReadonly } from "../reactivity/reactive";
import { emit } from "./componentEmit";
import { initProps } from "./componentProps";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";
import { initSlots } from "./componentSlots";

export function createComponentInstance(vnode, parent){
    // console.log("currentComponentInstanceParent", parent)
    const component = {
        vnode,
        type: vnode.type,
        next: null,
        setupState: {},
        props: {},
        slots:{},
        provides: parent ? parent.provides : {},
        parent,
        isMounted: false,
        subTree: {},
        emit: () => {}
    }

    component.emit = emit.bind(null, component) as any;

    return component;
}

export function setupComponent(instance){
    initProps(instance, instance.vnode.props);
    initSlots(instance, instance.vnode.children);
    setupStatefulComponent(instance);
    

}

function setupStatefulComponent(instance: any) {
    const Component = instance.type;

    // ctx
    instance.proxy = new Proxy(
        {_: instance},
        PublicInstanceProxyHandlers
    )

    const { setup } = Component;
    if(setup) {
        setCurrentInstance(instance);
        const setupResult = setup(shallowReadonly(instance.props), {
            emit: instance.emit
        });
        setCurrentInstance(null);
        handleSetupResult(instance, setupResult)
    }
}

function handleSetupResult(instance, setupResult: any) {
     // setupResult 为 function 或者 Object
     // TODO function
     if(typeof setupResult === 'object'){
        instance.setupState = proxyRefs(setupResult);
     }
     finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
    const Component = instance.type;

    // render和template同时存在的话，先执行render函数
    // template
    if(compiler && !Component.render){
        if(Component.template){
            Component.render = compiler(Component.template)
        }
    }
    
    instance.render = Component.render;
}

let currentInstance = null;

export function getCurrentInstance(){
    return currentInstance
}

export function setCurrentInstance(instance){
    currentInstance = instance
}

let compiler;
export function registerRuntimeCompiler(_compiler){
    compiler = _compiler
}

