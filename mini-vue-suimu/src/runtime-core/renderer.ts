import { ShapeFlags } from '../shared/ShapeFlags';
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  //patch
  patch(vnode, container)
}

function patch(vnode, container) {
  // TODO 判断一下是不是element类型
  // 如果是一个element, 那个就应该处理一个element

  // 思考：如何去区分是element类型还是component类型
  // shapeFlags
  console.log(vnode.type)

  const { shapeFlag } = vnode;

  if (shapeFlag & ShapeFlags.ELEMENT) {
    //去处理元素
    processElement(vnode, container)
  } else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT){
    // 去处理组件
    processComponent(vnode, container)
  }
}

function processComponent(vnode: any, container: any) {
  //挂载组件
  mountComponent(vnode, container)
}

function mountComponent(initialVNode: any, container) {
  const instance = createComponentInstance(initialVNode)

  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance: any, initialVNode, container: any) {
  const { proxy } = instance;
  // subTree 就是vnode
  const subTree = instance.render.call(proxy);

  // initialVNode -> patch
  // initialVNode -> element -> mountElement

  patch(subTree, container)

  // this.$el 实现的关键点：就是我们在什么时机可以获取到在初始化完成之后的el
  // element -> mount
  // 
  // 此处的initialVNode是当前组件(比如App.vue组件)的虚拟节点。
  // 这里的subTree.el就是mountElement()里面的vnode.el
  // 此时，subTree.el已经是创建出的真实DOM节点了
  initialVNode.el = subTree.el;
}
function processElement(vnode: any, container: any) {
    //挂载元素
    mountElement(vnode, container)
}

function mountElement(vnode, container) {
    const { type, props, children, shapeFlag } = vnode;

    // vnode -> element -> div
    // 这里的vnode.el就是setupRenderEffect()里面的subTree.el
    const el = (vnode.el = document.createElement(type));

    if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
        el.textContent = children;
    }else if(shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
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

