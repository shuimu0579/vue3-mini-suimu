# mini-vue各模块调试方法

## reactivity模块调试(src/reactivity)

vscode中jest插件，reactive.spec.ts(src/reactivity/__tests__/reactive.spec.ts)里面打断点

## runtime-core初始化的核心流程调试(example/helloWorld/main.js)

在整个mini-vue项目中，根目录下开启live-server，然后点开example/helloWorld/index.html,可以在console面板里面看到先后执行的打印输出

在console面板打印的数据的右侧，点击能够调到Sources面板里面，打断点一下下调试了。