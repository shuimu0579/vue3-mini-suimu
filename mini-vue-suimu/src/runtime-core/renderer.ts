import { effect } from '../reactivity/effect'
import { EMPTY_OBJ } from '../shared'
import { ShapeFlags } from '../shared/ShapeFlags'
import { createComponentInstance, setupComponent } from './component'
import { createAppAPI } from './createApp'
import { Fragment, Text } from './vnode'

export function createRenderer(options) {

  const { createElement:hostCreateElement, patchProp:hostPatchProp, insert:hostInsert, remove:hostRemove, setElementText:hostSetElementText } = options

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
    mountChildren(n2.children, container, parentComponent)
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
        // console.log('subTree',subTree);
  
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
      patchElement(n1, n2, container, parentComponent)
    }
  }

  function patchElement(n1, n2: any, container: any, parentComponent){
    console.log('patchElement');
    console.log('n1');
    console.log('n2');
    
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;

    const el = (n2.el = n1.el);

    patchChildren(n1,n2, el, parentComponent);
    patchProps(el, oldProps, newProps);
  } 

  function patchChildren(n1, n2, container, parentComponent){
    const prevShapeFlag = n1.shapeFlag;
    const c1 = n1.children;
    const { shapeFlag } = n2;
    const c2 = n2.children;

    if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
      if(prevShapeFlag & ShapeFlags.ARRAY_CHILDREN){
        // ArrayToText
        // 1.把老的children清空
        unmountChildren(n1.children);
      }
      if(c1 !== c2){
        // 设置text
        hostSetElementText(container, c2); 
      }
    }else{
      // 新的vnode是一个array
      if(prevShapeFlag & ShapeFlags.TEXT_CHILDREN){
        // TextToArray
        // 1.清空文本
        hostSetElementText(container, "");
        // 2.挂载新的vnode
        mountChildren(c2, container, parentComponent)
      }
    }
  }

  function unmountChildren(children){
    for (let i = 0; i < children.lengtht; i++) {
      const el = children[i].el;
      // remove
      hostRemove(el);
    }
  }


  function patchProps(el, oldProps, newProps){
    if(oldProps !== newProps){
      for (const key in newProps) {
        const prevProp = oldProps[key]
        const nextProp = newProps[key]
  
        if(prevProp !== nextProp){
          hostPatchProp(el, key, prevProp, nextProp)
        }
      }

      if(oldProps !== EMPTY_OBJ){
        for (const key in oldProps) {
          if(!(key in newProps)){
            hostPatchProp(el, key, oldProps[key], null)
          }
        }
      }
    }
  }

  function mountElement(vnode, container, parentComponent) {
    const { props, children, shapeFlag } = vnode

    // vnode -> element -> div
    // 这里的vnode.el就是setupRenderEffect()里面的subTree.el
    const el = (vnode.el = hostCreateElement(vnode.type))

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode.children, el, parentComponent)
    }

    // props
    for (const key in props) {
      const val = props[key]
      // console.log(key)  
      hostPatchProp(el, key, null, val)
    }

    // container.append(el);
    hostInsert(el, container)
  }

  function mountChildren(children, container, parentComponent) {
    children.forEach((v) => {
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
