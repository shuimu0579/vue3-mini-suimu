//props涉及到3个功能
// 1、在setup中接收props
// 2、在render函数里面，通过this可以访问到props里某一个key的值
// 3、props必须是一个shallowReadonly的值
export function initProps(instance, rawProps){
    instance.props = rawProps || {}
}