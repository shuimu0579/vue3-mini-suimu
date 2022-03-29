import { ShapeFlags } from '../shared/ShapeFlags'
import { createComponentInstance, setupComponent } from './component'
import { createAppAPI } from './createApp'
import { Fragment, Text } from './vnode'

export function createRenderer(options) {

  const { createElement:hostCreateElement, patchProp:hostPatchProp, insert:hostInsert } = options

  function render(vnode, container) {
    //patch
    patch(vnode, container, null)
  }

  function patch(vnode, container, parentComponent) {
    // TODO 判断一下是不是element类型
    // 如果是一个element, 那个就应该处理一个element

    // 思考：如何去区分是element类型还是component类型
    // shapeFlags
    console.log(vnode.type)

    const { type, shapeFlag } = vnode

    // Fragment -> 只渲染 children
    switch (type) {
      case Fragment:
        processFlagment(vnode, container, parentComponent)
        break
      case Text:
        processText(vnode, container)
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          //去处理元素
          processElement(vnode, container, parentComponent)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          // 去处理组件
          processComponent(vnode, container, parentComponent)
        }
        break
    }
  }

  function processFlagment(vnode: any, container: any, parentComponent) {
    mountChildren(vnode, container, parentComponent)
  }

  function processComponent(vnode: any, container: any, parentComponent) {
    //挂载组件
    mountComponent(vnode, container, parentComponent)
  }

  function mountComponent(initialVNode: any, container, parentComponent) {
    const instance = createComponentInstance(initialVNode, parentComponent)

    setupComponent(instance)
    setupRenderEffect(instance, initialVNode, container)
  }

  function setupRenderEffect(instance: any, initialVNode, container: any) {
    const { proxy } = instance
    // subTree 就是vnode
    const subTree = instance.render.call(proxy)

    // initialVNode -> patch
    // initialVNode -> element -> mountElement

    patch(subTree, container, instance)

    // this.$el 实现的关键点：就是我们在什么时机可以获取到在初始化完成之后的el
    // element -> mount
    //
    // 此处的initialVNode是当前组件(比如App.vue组件)的虚拟节点。
    // 这里的subTree.el就是mountElement()里面的vnode.el
    // 此时，subTree.el已经是创建出的真实DOM节点了
    initialVNode.el = subTree.el
  }
  function processElement(vnode: any, container: any, parentComponent) {
    //挂载元素
    mountElement(vnode, container, parentComponent)
  }

  function mountElement(vnode, container, parentComponent) {
    const { props, children, shapeFlag } = vnode

    // vnode -> element -> div
    // 这里的vnode.el就是setupRenderEffect()里面的subTree.el
    const el = (vnode.el = hostCreateElement(vnode.type))

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode, el, parentComponent)
    }

    // props
    for (const key in props) {
      const val = props[key]
      console.log(key)  
      hostPatchProp(el, key, val)
    }

    // container.append(el);
    hostInsert(el, container)
  }

  function mountChildren(vnode, container, parentComponent) {
    vnode.children.forEach((v) => {
      patch(v, container, parentComponent)
    })
  }

  function processText(vnode: any, container: any) {
    const { children } = vnode
    const textNode = (vnode.el = document.createTextNode(children))
    container.append(textNode)
  }

  return {
    createApp: createAppAPI(render)
  }
}
