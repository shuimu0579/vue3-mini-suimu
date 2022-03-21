import { isObject } from '../shared/index'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  //patch
  patch(vnode, container)
}

function patch(vnode, container) {
  // TODO 判断一下是不是element类型
  // 如果是一个element, 那个就应该处理一个element

  // 思考：如何去区分是element类型还是component类型
  //
  console.log(vnode.type)
  if (typeof vnode.type === 'string') {
    //去处理元素
    processElement(vnode, container)
  } else if(isObject(vnode.type)){
    // 去处理组件
    processComponent(vnode, container)
  }
}

function processComponent(vnode: any, container: any) {
  //挂载组件
  mountComponent(vnode, container)
}

function mountComponent(vnode: any, container) {
  const instance = createComponentInstance(vnode)

  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance: any, container: any) {
  const { proxy } = instance;
  // subTree 就是vnode
  const subTree = instance.render.call(proxy);

  // vnode -> patch
  // vnode -> element -> mountElement

  patch(subTree, container)
}
function processElement(vnode: any, container: any) {
    //挂载元素
    mountElement(vnode, container)
}

function mountElement(vnode, container) {
    const { type, props, children } = vnode;

    const el = document.createElement(type);

    if(typeof children === 'string'){
        el.textContent = children;
    }else if(Array.isArray(children)) {
        mountChildren(vnode, el)
    }

    for(const key in props){
        const val = props[key];
        el.setAttribute(key, val);
    }

    container.append(el);

}

function mountChildren(vnode, container){
    vnode.children.forEach(v =>{
        patch(v, container);
    })
}

