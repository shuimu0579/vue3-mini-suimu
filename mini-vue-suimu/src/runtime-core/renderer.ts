import { effect } from '../reactivity/effect'
import { ShapeFlags } from '../shared/ShapeFlags'
import { createComponentInstance, setupComponent } from './component'
import { createAppAPI } from './createApp'
import { Fragment, Text } from './vnode'

export function createRenderer(options) {

  const { createElement:hostCreateElement, patchProp:hostPatchProp, insert:hostInsert } = options

  function render(n2, container) {
    //patch
    patch(null, n2, container, null)
  }

  // n1 -> 老的
  // n2 -> 新的
  function patch(n1, n2, container, parentComponent) {
    // TODO 判断一下是不是element类型
    // 如果是一个element, 那个就应该处理一个element

    // 思考：如何去区分是element类型还是component类型
    // shapeFlags
    // console.log(n2.type)

    const { type, shapeFlag } = n2

    // Fragment -> 只渲染 children
    switch (type) {
      case Fragment:
        processFlagment(n1, n2, container, parentComponent)
        break
      case Text:
        processText(n1, n2, container)
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          //去处理元素
          processElement(n1, n2, container, parentComponent)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          // 去处理组件
          processComponent(n1,n2, container, parentComponent)
        }
        break
    }
  }

  function processFlagment(n1, n2: any, container: any, parentComponent) {
    mountChildren(n2, container, parentComponent)
  }

  function processComponent(n1, n2: any, container: any, parentComponent) {
    //挂载组件
    mountComponent(n2, container, parentComponent)
  }

  function mountComponent(initialVNode: any, container, parentComponent) {
    const instance = createComponentInstance(initialVNode, parentComponent)

    setupComponent(instance)
    setupRenderEffect(instance, initialVNode, container)
  }

  function setupRenderEffect(instance: any, initialVNode, container: any) {
    effect(() => {
      if(!instance.isMounted){
        console.log('init')
        const { proxy } = instance
        // subTree 就是vnode
        const subTree = (instance.subTree = instance.render.call(proxy))
        console.log('subTree',subTree);
  
        // initialVNode -> patch
        // initialVNode -> element -> mountElement
  
        patch(null, subTree, container, instance)
  
        // this.$el 实现的关键点：就是我们在什么时机可以获取到在初始化完成之后的el
        // element -> mount
        //
        // 此处的initialVNode是当前组件(比如App.vue组件)的虚拟节点。
        // 这里的subTree.el就是mountElement()里面的vnode.el
        // 此时，subTree.el已经是创建出的真实DOM节点了
        initialVNode.el = subTree.el

        instance.isMounted = true;
      } else {
        console.log("update");
        const { proxy } = instance
        // subTree 就是vnode
        const subTree = instance.render.call(proxy)
        const prevSubTree = instance.subTree
        instance.subTree = subTree

        patch(prevSubTree, subTree, container, instance)
      }
    })
  }
  function processElement(n1, n2: any, container: any, parentComponent) {
    if(!n1){
      //init 挂载元素
      mountElement(n2, container, parentComponent)
    }else{
      //update 更新元素
      patchElement(n1, n2, container)
    }
  }

  function patchElement(n1, n2: any, container: any){
    console.log('patchElement');
    console.log('n1');
    console.log('n2');

    // props
    // children
  }

  function mountElement(n2, container, parentComponent) {
    const { props, children, shapeFlag } = n2

    // n2 -> element -> div
    // 这里的n2.el就是setupRenderEffect()里面的subTree.el
    const el = (n2.el = hostCreateElement(n2.type))

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(n2, el, parentComponent)
    }

    // props
    for (const key in props) {
      const val = props[key]
      // console.log(key)  
      hostPatchProp(el, key, val)
    }

    // container.append(el);
    hostInsert(el, container)
  }

  function mountChildren(n2, container, parentComponent) {
    n2.children.forEach((v) => {
      patch(null, v, container, parentComponent)
    })
  }

  function processText(n1, n2: any, container: any) {
    const { children } = n2
    const textNode = (n2.el = document.createTextNode(children))
    container.append(textNode)
  }

  return {
    createApp: createAppAPI(render)
  }
}
