# 一、简介

2020年9月18日，Vue.js发布3.0版本，代号：One Piece（海贼王）

[github.com/vuejs/vue-n…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-next%2Freleases%2Ftag%2Fv3.0.0)

### 1.性能的提升

- 打包大小减少**41%**
- 初次渲染快**55%**, 更新渲染快**133%**
- 内存减少**54%**

### 2.源码的升级

- 使用`Proxy`代替`defineProperty`实现响应式
- 重写虚拟`DOM`的实现和`Tree-Shaking`

### 3.拥抱TypeScript

- Vue3可以更好的支持`TypeScript`

### 4.新的特性

1. Composition API（组合API）
   - `setup`配置
   - `ref`与`reactive`
   - `watch`与`watchEffect`
   - `provide`与 `inject`
2. 新的内置组件
   - `Fragment `
   - `Teleport`
   - `Suspense`
3. 其他改变
   - 新的生命周期钩子
   - `data `选项应始终被声明为一个函数
   - 移除`keyCode`支持作为 `v-on` 的修饰符

# 二、创建一个Vue项目

## 1. 使用 vue-cli 创建

官方文档：[cli.vuejs.org/zh/guide/cr…](https://link.juejin.cn?target=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fguide%2Fcreating-a-project.html%23vue-create)

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建Vue项目，选择Vue3
vue create vue3_test
## 启动
cd vue_test
npm run serve
```



## 2. 使用 vite 创建

官方文档：[v3.cn.vuejs.org/guide/insta…](https://link.juejin.cn?target=https%3A%2F%2Fv3.cn.vuejs.org%2Fguide%2Finstallation.html%23vite)

vite官网：[vitejs.cn](https://link.juejin.cn?target=https%3A%2F%2Fvitejs.cn)

- 什么是vite？—— 是Vue团队打造的新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。
- 传统构建 与 vite构建对比图

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af5f8d4493f3423087d6b9e6c5e60fa1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

传统构建模式，是将所有资源都打包好，再上线

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c57d4d695fe64014b78610ff2a5cd2b6~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp) 而Vite是按需加载

接下来我们就用Vite来创建一个Vue3的项目

```powershell
## 创建工程
npm init vite-app vue3_test-vite
## 进入工程目录
cd vue3_test-vite
## 安装依赖
npm install
## 运行
npm run dev
```

# 三、分析文件目录

## main.js

Vue2项目的main.js

```javascript
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

我们再来看看Vue3项目中的main.js

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

分析一下

```js
// 引入的不再是Vue构造函数了，引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用实例对象——app(类似于之前Vue2中的vm，但app比vm更“轻”)
const app = createApp(App)
console.log(app)
// 挂载
app.mount('#app')
```

## App.vue

我们再来看看组件

在`template`标签里可以没有根标签了

```html
<template>
	<!-- Vue3组件中的模板结构可以没有根标签 -->
	<img alt="Vue logo" src="./assets/logo.png">
	<HelloWorld msg="Welcome to Your Vue.js App"/>
</template>
```