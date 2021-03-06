# vue3-mini 手动实践版

## miniVueList

### **reactivity**

- [x] 01-Vue3 源码结构的介绍(<https://www.wolai.com/cuixiaorui/23WMeqeAapVBDUafSD9aj4>)
- [x] 02-reactivity 的核心流程(<https://www.wolai.com/cuixiaorui/n2EvkBcn8QqvM4pTM8ynZV>)
- [x] 03-runtime-core 初始化的核心流程(<https://www.wolai.com/cuixiaorui/3X3LNU8Nx4ePJUHwV3L6b3>)
- [x] 04-runtime-core 更新的核心流程(<https://www.wolai.com/cuixiaorui/3AktpMCc7WwzgbdFFFkVY8>)
- [x] 05-setup 环境-集成 jest 做单元测试-集成 ts(<https://www.wolai.com/cuixiaorui/cT93w5k6X5XyoHHEdapNmU>)
- [x] 06-实现 effect & reactive & 依赖收集 & 触发依赖(<https://www.wolai.com/cuixiaorui/aRc4nqAHFEHCJYQWcL1TgN>)
- [x] 07-实现 effect 返回 runner(<https://www.wolai.com/cuixiaorui/iJpwSLP51QJQYpNFxoMqK7>)
- [x] 08-实现 effect 的 scheduler 功能(<https://www.wolai.com/cuixiaorui/pHm5WXQpt27uVcKsDLXarc>)
- [x] 09-实现 effect 的 stop 功能(<https://www.wolai.com/cuixiaorui/uBpJGpPxCADoefdnjm71U6>)
- [x] 10-实现 readonly 功能(<https://www.wolai.com/cuixiaorui/6nSFnxZ27qUDeKEumeMJjX>)
- [x] 11-实现 isReactive 和 isReadonly(<https://www.wolai.com/cuixiaorui/r2jXLLLbv9BD4vN7RsjR4t>)
- [x] 12-优化 stop 功能(<https://www.wolai.com/cuixiaorui/fmMhWmeoec5gV7bdDnfq3B>)
- [x] 13-实现 reactive 和 readonly 嵌套对象转换功能(<https://www.wolai.com/cuixiaorui/jrVBS2gxaCnMXcEWYS4zri>)
- [x] 14-实现 shallowReadonly 功能(<https://www.wolai.com/cuixiaorui/guEb2A7u2cBEeJoncDoM85>)
- [x] 15-实现 isProxy 功能(<https://www.wolai.com/cuixiaorui/7bq8UqCCXPucNhX1JsGEff>)
- [x] 16-实现 ref 功能(<https://www.wolai.com/cuixiaorui/dttsX17sdmWJ3FZUaqVUeV>)
- [x] 17-实现 isRef 和 unRef 功能(<https://www.wolai.com/cuixiaorui/3JsfQLYNPRroJz2joDEUCT>)
- [x] 18-实现 proxyRefs 功能(<https://www.wolai.com/cuixiaorui/sb17oVvRXvBVTc147sfrms>)
- [x] 19-实现 computed 计算属性(<https://www.wolai.com/cuixiaorui/qXpgZ28WnPLpswSgytQGVd>)

### **runtime-core 初始化**

- [x] 20-实现初始化 component 主流程(<https://www.wolai.com/cuixiaorui/gwMSFanKJExqPGef9GRnHx>)
- [x] 21-使用 rollup 打包库(<https://www.wolai.com/cuixiaorui/ZTgHwy4gNUnP1T8ev8PV5>)
- [x] 22-实现初始化 element 主流程(<https://www.wolai.com/cuixiaorui/oHbdAYnX1PGTkE762Syu5b>)
- [x] 23-实现组件代理对象(<https://www.wolai.com/cuixiaorui/aEYKuncuPSYboi3juJDmit>)
- [x] 24-实现 shapeFlags(<https://www.wolai.com/cuixiaorui/i9eGGRQTwnEbjatX2MJ61z>)
- [x] 25-实现注册事件功能(<https://www.wolai.com/cuixiaorui/vNt3RPcoSnNq5J5gbRMFzT>)
- [x] 26-实现组件 props 功能(<https://www.wolai.com/cuixiaorui/q2bDQrVotT4XmXvfBHgsLo>)
- [x] 27-实现组件 emit 功能(<https://www.wolai.com/cuixiaorui/5C9nAe8Vvg3eTXNVmLf3C6>)
- [x] 28-实现组件 slots 功能(<https://www.wolai.com/cuixiaorui/4EqgLa7wucKGrQoW4kiykB>)
- [x] 29-实现 Fragment 和 Text 类型节点(<https://www.wolai.com/cuixiaorui/rQpih2Gb1gfw93ECnQzvRF>)
- [x] 30-实现 getCurrentInstance(<https://www.wolai.com/cuixiaorui/5aVXno4MnPrYJeS172YJWE>)
- [x] 31-实现 provide-inject 功能(<https://www.wolai.com/cuixiaorui/wi47AmRck7wBduZVbSZFfH>)
- [x] 32-实现自定义渲染器 custom renderer(<https://www.wolai.com/cuixiaorui/pNB836Crjs6MCMWvPwNrGh>)

### **runtime-core 更新**

- [x] 33-更新 element 流程搭建(<https://www.wolai.com/cuixiaorui/xwgF2KkpFaDNDs9WaUv7zU>)
- [x] 34-更新 element 的 props(<https://www.wolai.com/cuixiaorui/bgZmbJvcLpkxUEuYWnJbXA>)
- [x] 35-更新 element 的 children(<https://www.wolai.com/cuixiaorui/nUhjPAGZnw6VkHijUhoszp>)
- [x] 36-更新 element 的 children - 双端对比 diff 算法 （1）(<https://www.wolai.com/cuixiaorui/rTkUAEBvoUoyRYmXSqYgJh>)
- [x] 37-更新 element 的 children - 双端对比 diff 算法 （2）(<https://www.wolai.com/cuixiaorui/wvSS2d2mAnEkgEUk1s3phk>)
- [x] 38-更新 element 的 children - 双端对比 diff 算法 （3）(<https://www.wolai.com/cuixiaorui/sKQToUaYg1PqqSviX3HH8Y>)
- [x] 39-学习尤大解决 bug 的处理方式(<https://www.wolai.com/cuixiaorui/53bqrdewhonhXEQhbbvMKc>)
- [x] 40-实现组件更新功能(<https://www.wolai.com/cuixiaorui/vufH9HJd8bARgQt4efk9aq>)
- [x] 41-实现 nextTick 功能(<https://www.wolai.com/cuixiaorui/nAdCJ5pGkvnuYkDMYf1psU>)

### **compiler-core**

- [x] 42-编译模块概述(<https://www.wolai.com/cuixiaorui/bfiFZ6vw4Qata8YVYgkDVj>)

- [x] 43-实现解析插值功能(<https://www.wolai.com/cuixiaorui/j26JU4icjcmsNud8YucuRo>)(19m30s)
- [x] 44-实现解析 element(<https://www.wolai.com/cuixiaorui/pmGS9y5FHLSrzPm54CYLAu>)(10m45s)
- [x] 45-实现解析 text 功能(<https://www.wolai.com/cuixiaorui/enpjs4iruLcP7zhrExXHfi>)(9m27s)
- [x] 46-实现解析三种联合类型(<https://www.wolai.com/cuixiaorui/9vFkrjs2MWa9ocaQM6LcEA>)(39m49s)
- [x] 47-parse 的实现原理&有限状态机(<https://www.wolai.com/cuixiaorui/tixMXMjFrabriT2EypTbAE>)(19m15s)

- [x] 48-实现 transform 功能(<https://www.wolai.com/cuixiaorui/iWTPNf67tfM6RpBrFn1awg>)(19m15s)

- [x] 49-实现代码生成 string 类型(<https://www.wolai.com/cuixiaorui/u2PbH192xGKCBHCrAdFk2e>)(14m34s)
- [x] 50-实现代码生成插值类型(<https://www.wolai.com/cuixiaorui/73zPZQNyhuAfPBnVkMSaGZ>)(30m20s)
- [x] 51-实现代码生成element类型及其三种联合类型(<https://www.wolai.com/cuixiaorui/qq6dS7cYU2w6McSBRSVA9Y>)(43m05s)

- [x] 52-实现编译 template 成 render 函数（大结局）(<https://www.wolai.com/cuixiaorui/dmS3GKXVnfaMh5EodPXS38>)(20m33s)

### vue3 源码实战课相关资料

- [vue3 源码实战课--观看指南](https://www.wolai.com/cuixiaorui/f3suaYxX5iu7FD6mQUhHuW)

- [vue3 源码实战课 PC 版视频观看地址](https://appewiejl9g3764.h5.xiaoeknow.com/v1/course/column/p_61fb595ce4b0beaee4275e1e?type=3)

- [vue3-mini 代码 commit](https://github.com/cuixiaorui/teach-vue-practice/commits/main)

### vue3 番外资料

- [vue3 官方文档](https://v3.cn.vuejs.org/)

- [vue3 源码](https://github.com/vuejs/core)

- [vue-mini-cxr 实现](https://github.com/cuixiaorui/mini-vue)
