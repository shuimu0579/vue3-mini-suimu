import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container){
    //patch
    patch(vnode, container);
}

function patch(vnode, container){

    // TODO 判断一下是不是element类型
    // 如果是一个element, 那个就应该处理一个element

    // 思考：如何去区分是element类型还是component类型
    // processElement()

    // 去处理组件
    processComponent(vnode, container)
}

function processComponent(vnode: any, container: any) {
    
    //挂载组件
    mountComponent(vnode, container);
}

function mountComponent(vnode: any, container) {
    const instance = createComponentInstance(vnode);

    setupComponent(instance);
    setupRenderEffect(instance, container); 
}

function setupRenderEffect(instance: any, container: any) {
    // subTree 就是vnode
    const subTree = instance.render();

    // vnode -> patch
    // vnode -> element -> mountElement

    patch(subTree, container);
}

