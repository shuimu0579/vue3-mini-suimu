'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const publicPropertiesMap = {
    $el: (i) => i.vnode.el,
};
const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        // setupState
        const { setupState } = instance;
        if (key in setupState) {
            return setupState[key];
        }
        // key -> $el
        const publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
        //$data
    }
};

function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {}
    };
    return component;
}
function setupComponent(instance) {
    // initProps()
    // initSlots()
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const Component = instance.type;
    // ctx
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);
    const { setup } = Component;
    if (setup) {
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    // setupResult 为 function 或者 Object
    // TODO function
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    instance.render = Component.render;
}

function render(vnode, container) {
    //patch
    patch(vnode, container);
}
function patch(vnode, container) {
    // TODO 判断一下是不是element类型
    // 如果是一个element, 那个就应该处理一个element
    // 思考：如何去区分是element类型还是component类型
    // shapeFlags
    console.log(vnode.type);
    const { shapeFlag } = vnode;
    if (shapeFlag & 1 /* ELEMENT */) {
        //去处理元素
        processElement(vnode, container);
    }
    else if (shapeFlag & 2 /* STATEFUL_COMPONENT */) {
        // 去处理组件
        processComponent(vnode, container);
    }
}
function processComponent(vnode, container) {
    //挂载组件
    mountComponent(vnode, container);
}
function mountComponent(initialVNode, container) {
    const instance = createComponentInstance(initialVNode);
    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
}
function setupRenderEffect(instance, initialVNode, container) {
    const { proxy } = instance;
    // subTree 就是vnode
    const subTree = instance.render.call(proxy);
    // initialVNode -> patch
    // initialVNode -> element -> mountElement
    patch(subTree, container);
    // this.$el 实现的关键点：就是我们在什么时机可以获取到在初始化完成之后的el
    // element -> mount
    // 
    // 此处的initialVNode是当前组件(比如App.vue组件)的虚拟节点。
    // 这里的subTree.el就是mountElement()里面的vnode.el
    // 此时，subTree.el已经是创建出的真实DOM节点了
    initialVNode.el = subTree.el;
}
function processElement(vnode, container) {
    //挂载元素
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    const { type, props, children, shapeFlag } = vnode;
    // vnode -> element -> div
    // 这里的vnode.el就是setupRenderEffect()里面的subTree.el
    const el = (vnode.el = document.createElement(type));
    if (shapeFlag & 4 /* TEXT_CHILDREN */) {
        el.textContent = children;
    }
    else if (shapeFlag & 8 /* ARRAY_CHILDREN */) {
        mountChildren(vnode, el);
    }
    for (const key in props) {
        const val = props[key];
        el.setAttribute(key, val);
    }
    container.append(el);
}
function mountChildren(vnode, container) {
    vnode.children.forEach(v => {
        patch(v, container);
    });
}

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
        shapeFlag: getShapeFlag(type),
        el: null,
    };
    // children
    if (typeof children === "string") {
        vnode.shapeFlag = vnode.shapeFlag | 4 /* TEXT_CHILDREN */;
    }
    else if (Array.isArray(children)) {
        vnode.shapeFlag = vnode.shapeFlag | 8 /* ARRAY_CHILDREN */;
    }
    return vnode;
}
function getShapeFlag(type) {
    return typeof type === "string" ? 1 /* ELEMENT */ : 2 /* STATEFUL_COMPONENT */;
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // 先转换成虚拟节点vnode
            // component -> vnode
            // 所有的逻辑操作都会基于vnode做处理
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        }
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;
