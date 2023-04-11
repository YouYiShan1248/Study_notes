# Vue3

## 1.文件目录

**与vue2对比**

**Vue2项目的main.js**

```javascript
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

vm里有大量各种方法，包括很多用不上的私有方法，多且杂。

**Vue3项目中的main.js**

```JavaScript
// 引入的不再是Vue构造函数了，引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用实例对象——app(类似于之前Vue2中的vm，但app比vm更“轻”)
const app = createApp(App)
console.log(app)
// 挂载
app.mount('#app')
```

在vue3中，这个app里存放的属性和方法精炼了很多

并且在**App.vue**

在`template`标签里可以没有根标签了

```html
<template>
	<!-- Vue3组件中的模板结构可以没有根标签 -->
	<img alt="Vue logo" src="./assets/logo.png">
	<HelloWorld msg="Welcome to Your Vue.js App"/>
</template>
```

## 2. Composition API

### 2.1 setup



1. 理解：Vue3.0中一个新的配置项，值为一个函数。
2. `setup`是所有**Composition API（组合API）**表演的舞台，定义属性、方法、生命周期等等均要配置在`setup`当中 （生命周期函数可以不定义在`setup`里，但是`setup`中的生命周期函数在同种生命周期状态时会先执行`setup`中的生命周期函数）。
3. `setup`函数的两种返回值：
   1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
   2. 若返回一个渲染函数：则可以自定义渲染内容。（了解） (不常用)

```html
<template>
  <h1>博主的信息</h1>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <h2>性别：{{gender}}</h2>
  <button @click="sayInfo">显示信息</button>
</template>

<script>
// import {h} from 'vue'
export default {
  name: "App",
  //此处只是测试一下setup，暂时不考虑响应式的问题。
  setup(){
    // 数据
    let name = "佑一山"
    let age = 23
    let gender = "男"

    // 方法
    function sayInfo(){
      alert(`你好${name}，你太厉害了吧`)
    }
    return {
      name,age, gender,sayInfo
    }
    // return ()=> h('h1','佑一山')
  }
};
</script>
```

如果返回的是渲染函数

那在`template`里写的模板都不奏效了，页面渲染的就是写的`h`函数中的内容

注意点：

1. 尽量不要与Vue2.x配置混用
   - Vue2.x配置（`data`、`methos`、`computed`...）中**可以访问到**`setup`中的属性、方法。
   - 但在setup中**不能访问到**Vue2.x配置（`data`、`methos`、`computed`...）。
   - 如果有重名, `setup`优先。
2. `setup`不能是一个`async`函数，因为返回值不再是对象, 而是`promise`, 模板看不到`return`对象中的属性。（后期也可以返回一个`Promise`实例，但需要`Suspense`和异步组件的配合）



### 2.2 状态响应式

#### ref 函数

- 作用: 定义一个**响应式**的数据

- 语法:

  ```
  const xxx = ref(initValue)
  ```

  - 创建一个包含响应式数据的**引用对象（reference对象，简称ref对象）**。
  - JS中操作数据： `xxx.value`
  - 模板中读取数据: 不需要`.value`，直接：`<div>{{xxx}}</div>`

- 备注：

  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依靠的是类上的`getter`与`setter`完成的（我们等下看下源码你就知道了）。
  - 对象类型的数据：内部 *“ 求助 ”* 了Vue3.0中的一个新函数—— `reactive`函数。



**ref全家桶**

  在Vue中一般很少会用到直接操作DOM，但不可避免有时候需要用到，这时我们可以通过ref和$refs这两个来实现

**ref**

​	接受一个内部值并返回一个响应式且可变的 `ref` 对象。`ref` 对象仅有一个 `.value property`，指向该内部值。 `ref` 被用来给元素或子组件注册引用信息， 引用信息将会注册在父组件的 `$refs` 对象上，如果是在普通的`DOM`元素上使用，引用指向的就是 `DOM` 元素，如果是在子组件上，引用就指向组件的实例。

​	通过`ref`进行响应式管理，会得到一个对象，在使用的时候需要通过`.value`的方式来读取数值

**$refs**

 `$refs` 是一个对象，持有已注册过 ref 的所有的子组件。

**isRef**

判断是不是一个ref对象

**shallowRef**

创建一个跟踪自身 `.value` 变化的 ref，但不会使其值也变成响应式的

**triggerRef** 

强制更新页面DOM

**customRef**

自定义ref 

`customRef` 是个工厂函数要求我们返回一个对象 并且实现 get 和 set 适合去做防抖。

```vue
<template>
 
  <div ref="div">Ref</div>
  <hr>
  <div>
    {{ name }}
  </div>
  <hr>
  <button @click="change">修改 customRef</button>
 
</template>
 
<script setup lang='ts'>
import { ref, reactive, onMounted, shallowRef, customRef } from 'vue'
 
function myRef<T = any>(value: T) {
  let timer:any;
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newVal) {
        clearTimeout(timer)
        timer =  setTimeout(() => {
          console.log('触发了set')
          value = newVal
          trigger()
        },500)
      }
    }
  })
}
const name = myRef<string>('佑一山')
 
const change = () => {
  name.value = '一山'
}
</script>
<style scoped>
</style>
```



**源码与原理**

`packages\reactivity\src\ref.ts`

ref部分实现源码细节：

```typescript
function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue, shallow)
}
```

​	在`createRef()`方法中，会先判断传入的对象是不是一个`ref`对象（通过`isRef`判断），如果是就返回对象本身，如果不是就创建一个`ref`对象，把这个`rawValue`和`shallow`传入这个对象。



```typescript
class RefImpl<T> {
  private _value: T
  private _rawValue: T

  public dep?: Dep = undefined
  public readonly __v_isRef = true

  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._rawValue = __v_isShallow ? value : toRaw(value)
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newVal) {
    const useDirectValue =
      this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
    newVal = useDirectValue ? newVal : toRaw(newVal)
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = useDirectValue ? newVal : toReactive(newVal)
      triggerRefValue(this, newVal)
    }
  }
}
```

在`RefImpl`类里，通过`constructor`接收，对这个`value`和`isShallow`（刚刚传递的false）做判断，如果为`true`，就直接返回这个`value`，如果为`false`，就会调用`toReactive()`这个方法



```typescript
export const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? reactive(value) : value
```

​	这个`toReactive`方法做了一个判断，判断这个value的类型是不是引用数据类型，如果是，就会调用`reactive()`，如果不是就把这个值给返回。

​	所以在`vue`内部，我们调用`ref`传的是一个数组或者对象，在ref内部会进行判断去调用`reactive()`，如果传的是数值等原始数据类型，就会直接把值给返回，也就是直接使用`ref()`来进行响应式管理。



```typescript
declare const ShallowRefMarker: unique symbol

export type ShallowRef<T = any> = Ref<T> & { [ShallowRefMarker]?: true }

export function shallowRef<T extends object>(
  value: T
): T extends Ref ? T : ShallowRef<T>
export function shallowRef<T>(value: T): ShallowRef<T>
export function shallowRef<T = any>(): ShallowRef<T | undefined>
export function shallowRef(value?: unknown) {
  return createRef(value, true)
}
```

`ShallowRef`也调用了`createRef`，不过区别在于，传入的值中，把第二个状态设为true，所以通过调用`ShallowRef`都会返回这个`value`，不会去做`reactive`的判断。所以通过`ShallowRef`调用的是数组或者对象，是不会响应的。

```typescript
export function shallowRef<T extends object>(
  value: T
): T extends Ref ? T : ShallowRef<T>
export function shallowRef<T>(value: T): ShallowRef<T>
export function shallowRef<T = any>(): ShallowRef<T | undefined>
export function shallowRef(value?: unknown) {
  return createRef(value, true)
}
```

在实际开发过程中，如果将`ref`和`ShallowRef`写到一块，是会影响`ShallowRef`的，因为`triggerRef`可以强制更新`ShallowRef`的值，因为ref跟`triggerRef`底层都是调用的`triggerRefValue`，`triggerRefValue`会去调用`triggerEffects`做依赖的更新，就会把`ShallowRef`的依赖一起更新了，所以`ref`和`ShallowRef`不要写到一块。





#### reactive函数

- 作用: 定义一个**对象类型**的响应式数据（基本类型不要用它，要用`ref`函数）
- 语法：`const 代理对象= reactive(源对象)`接收一个对象（或数组），返回一个**代理对象（`Proxy`的实例对象，简称`proxy`对象）**
- `reactive`定义的响应式数据是“深层次的”。
- 内部基于 ES6 的 `Proxy` 实现，通过代理对象操作源对象内部数据进行操作。

**reactive全家桶**

用来绑定复杂的数据类型 例如 对象 数组。

```typescript
import { reactive } from 'vue'
let person = reactive({
   name:"一山"
})
person.name = "佑一山"
```



`reactive` 源码约束了类型，是不可以绑定普通的数据类型的，如果用`ref`去绑定对象或者数组等复杂的数据类型，源码里面其实也是去调用`reactive`

```typescript
export function reactive<T extends object>(target: T): UnwrapNestedRefs<T>	//做了泛型约束，类型为object
export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (isReadonly(target)) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  )
}
```

使用`reactive` 去修改值无须使用`.value`

在数组异步赋值的时候，赋值页面是不会发生变化的，因为会脱离响应式。

例如：

```typescript
let person = reactive<number[]>([])
setTimeout(() => {
  person = [1, 2, 3]
  console.log(person);
},1000)

//	解决办法1	通过push方法在内部进行解构的方法
setTimeout(() => {
  const arr = [1, 2, 3]
  person.push(...arr)
  console.log(person);
},1000)

//	解决办法2	包裹一层对象
type Person = {
  list?:Array<number>
}
let person = reactive<Person>({
   list:[]
})
setTimeout(() => {
  const arr = [1, 2, 3]
  person.list = arr;
  console.log(person);
  
},1000)
```

**readonly**

拷贝一份proxy对象将其设置为只读

```typescript
import { reactive ,readonly} from 'vue'
const person = reactive({count:1})
const copy = readonly(person)
 
 //person.count++ 
 copy.count++
//reactive可以影响到readonly
```

**shallowReactive**

只能对浅层的数据 如果是深层的数据只会改变值 不会改变视图

对ref的更改会触发重新渲染，但是shallowRef不会，但是在重新渲染期间，所有模板组件更新为最新数据

**源码与原理**

`packages\reactivity\src\reactive.ts`

```typescript
export function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (isReadonly(target)) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  )
}
```

首先`reactive`做了一个泛型约束，我们只能传object`类型`对象。在`reactive`里面先做了一个判断，判断这个引用类型是不是只读的，如果是直接返回这个对象，否则就会调用`createReactiveObject`函数。

```typescript
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>
  //WeakMap 的键值只能是一个object类型的数据，并且WeakMap的键名所指向的对象，不计入垃圾回收机制，它的键名所引用的对象都是弱引用，垃圾回收机制不将此类引用考虑在内，所以，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。一旦不再需要，WeakMap里面的键名对象和所对应的键值都会自动消失，不用手动删除
) {
  //在这个函数内先进行判断，如果我们传入的是普通的基本数据类型，就会报错，不做任何处理直接将传入的target进行返回。
  if (!isObject(target)) {
    if (__DEV__) {
      console.warn(`value cannot be made reactive: ${String(target)}`)
    }
    return target
  }
  // target is already a Proxy, return it.
  // exception: calling readonly() on a reactive object
  //如果target已经被代理过了，并且不是为了将响应式对象变为只读，则直接返回。
  if (
    target[ReactiveFlags.RAW] &&
    !(isReadonly && target[ReactiveFlags.IS_REACTIVE])
  ) {
    return target
  }
  // target already has corresponding Proxy
  // existingProxy是从缓存中查找，如果已经被代理过了就直接返回。这个proxyMap就是上面提到的WeakMap
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  // only specific value types can be observed.
  // 如果传入对象在白名单，将直接返回
  const targetType = getTargetType(target)
  if (targetType === TargetType.INVALID) {
    return target
  }
      
  // 如果以上条件都没触发，就会创建一个proxy代理
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  )
  // 缓存新代理以后的对象
  proxyMap.set(target, proxy)
  return proxy
}
```

### reactive与ref的对比

- 从**定义**数据角度对比
  - `ref`用来定义：**基本类型数据**。
  - `reactive`用来定义：**对象（或数组）类型数据**。
  - 备注：`ref`也可以用来定义**对象（或数组）类型数据**, 它内部会自动通过`reactive`转为**代理对象**。

------

- 从**原理**角度对比
  - `ref`通过类中的的`getter`与`setter`来实现响应式（数据劫持）。
  - `reactive`通过使用**Proxy**来实现响应式（数据劫持）, 并通过**Reflect**操作**源对象**内部的数据。

------

- 从**使用**角度对比
  - `ref`定义的数据：操作数据**需要**`.value`，读取数据时模板中直接读取**不需要**`.value`。
  - reactive定义的数据：操作数据与读取数据：**均不需要**`.value`。

#### to系列全家桶

**toRef**

`ref`可以用于创建一个响应式数据，而`toRef`也可以创建一个响应式数据，他们之间的区别在于，如果利用`ref`函数将某个对象中的属性变成响应式数据，修改响应式数据是不会影响到原始数据。

```typescript
import {ref} from 'vue';
export default {
  name:'App'
  setup(){
    let obj = {name : 'alice', age : 12};
    let newObj= ref(obj.name);
    function change(){
      newObj.value = 'Tom';
      console.log(obj,newObj)
    }
    return {newObj,change}
  }
}
```

当change执行的时候，响应式数据发生改变，而原始数据obj并不会改变。

**原因在于，`ref`的本质是拷贝，与原始数据没有引用关系**

而如果使用`toRef`将某个对象中的属性变成响应式数据，修改响应式数据是会影响到原始数据的。但是需要注意，如果修改通过`toRef`创建的响应式数据，并不会触发`UI`界面的更新。

**所以，toRef的本质是引用，与原始数据有关联**

```typescript
import {toRef} from 'vue';
export default {
  name:'App'
  setup(){
    let obj = {name : 'alice', age : 12};
    let newObj= toRef(obj, 'name');
    function change(){
      newObj.value = 'Tom';
      console.log(obj,newObj)
    }
    return {newObj,change}
  }
}
```

当change执行的时候，响应式数据发生改变，原始数据obj并不会改变，但是UI界面不会更新

ref和toRef的区别

1. ref本质是拷贝，修改响应式数据不会影响原始数据；toRef的本质是引用关系，修改响应式数据会影响原始数据

2. ref数据发生改变，界面会自动更新；toRef当数据发生改变是，界面不会自动更新

3. toRef传参与ref不同；toRef接收两个参数，第一个参数是哪个对象，第二个参数是对象的哪个属性

所以如果想让响应式数据和以前的数据关联起来，并且想在更新响应式数据的时候不更新`UI`，那么就使用`toRef`

**foRefs**

有的时候，我们希望将对象的多个属性都变成响应式数据，并且要求响应式数据和原始数据关联，并且更新响应式数据的时候不更新界面，就可以使用`toRefs`，用于批量设置多个数据为响应式数据。(toRef一次仅能设置一个数据)
 `toRefs`接收一个对象作为参数，它会遍历对象身上的所有属性，然后挨个调用`toRef`执行

```typescript
import {toRefs} from 'vue';
export default {
  name:'App'
  setup(){
    let obj = {name : 'alice', age : 12};
    let newObj= toRefs(obj);
    function change(){
      newObj.name.value = 'Tom';
      newObj.age.value = 18;
      console.log(obj,newObj)
    }
    return {newObj,change}
  }
}
```

**toRaw**

将响应式对象转化为普通对象

```typescript
import { reactive, toRaw } from 'vue'
const obj = reactive({
   foo: 1,
   bar: 1
})
const state = toRaw(obj)
// 响应式对象转化为普通对象

const change = () => {
   console.log(obj, state);
}
```

**源码原理**

**toRef源码解析**

```typescript
export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K,
  defaultValue?: T[K]
): ToRef<T[K]> {
  const val = object[key]
  return isRef(val)
    ? val
    : (new ObjectRefImpl(object, key, defaultValue) as any)
}
```

​	在toRef函数里，要传入一个对象和对象的一个key，如果是ref 对象直接返回 否则 调用 `ObjectRefImpl` 创建一个类ref 对象



```typescript
class ObjectRefImpl<T extends object, K extends keyof T> {
  public readonly __v_isRef = true

  constructor(
    private readonly _object: T,
    private readonly _key: K,
    private readonly _defaultValue?: T[K]
  ) {}

  get value() {
    const val = this._object[this._key]
    return val === undefined ? (this._defaultValue as T[K]) : val
  }

  set value(newVal) {
    this._object[this._key] = newVal
  }
}
```

​	在`ObjectRefImpl`中只对值做了处理，没有收集依赖和触发依赖的过程，这与`RefImpl`类做一个对比。在`get value()`中`RefImpl`多了一个`trackRefValue(this)`来进行收集依赖。在`get value()`中进行了`triggerRefValue(this, newVal)`触发依赖的操作。这在`ObjectRefImpl`中是没有的。所以对于非响应式的对象是不会去更新视图的，而响应式对象是使用的`reactive`，在`reactive`中会调用`proxy`，在那里做了收集依赖和触发依赖的操作，所以在`ObjectRefImpl`中不需要再去实现这两个操作，否则会触发两次。因为是在`reactive`中会调用，所以原始数据对象就不会更新视图，也就是为什么`toRef`需要传入一个对象。

```typescript
class RefImpl<T> {
  private _value: T
  private _rawValue: T

  public dep?: Dep = undefined
  public readonly __v_isRef = true

  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._rawValue = __v_isShallow ? value : toRaw(value)
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    trackRefValue(this)	// <-----------------------------this
    return this._value	
  }

  set value(newVal) {
    const useDirectValue =
      this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
    newVal = useDirectValue ? newVal : toRaw(newVal)
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = useDirectValue ? newVal : toReactive(newVal)
      triggerRefValue(this, newVal)	// <-----------------------------this
    }
  }
}
```



**toRefs源码解析**

简而言之就是把`reactive` 对象的每一个属性都变成了`ref` 对象循环调用了`toRef`

```typescript
export type ToRefs<T = any> = {
  [K in keyof T]: ToRef<T[K]>
}
export function toRefs<T extends object>(object: T): ToRefs<T> {
  if (__DEV__ && !isProxy(object)) {
    console.warn(`toRefs() expects a reactive object but received a plain one.`)
  }
  const ret: any = isArray(object) ? new Array(object.length) : {}
  for (const key in object) {
    ret[key] = toRef(object, key)
  }
  return ret
}
```

先判断是不是一个数组，如果是数组的话就进行初始化，如果不是数组就定义一个对象。然后对每一个属性调用`toRef`后返回。



**toRaw源码解析**

在`packages\reactivity\src\reactive.ts`中

```typescript
export function toRaw<T>(observed: T): T {
  const raw = observed && (observed as Target)[ReactiveFlags.RAW]
  return raw ? toRaw(raw) : observed
}
```

从`observed`这个对象中去取了一个属性`[ReactiveFlags.RAW]`，这个`ReactiveFlags`是定义的一个枚举，拿取的`.RAW`的值。

```typescript
export const enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  IS_SHALLOW = '__v_isShallow',
  RAW = '__v_raw'
}
```

通过 `ReactiveFlags` 枚举值 取出 `proxy` 对象的 原始对象。

### 2.3 响应式原理

#### Vue2的响应式

- 实现原理

  - 对象类型：通过`Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）。

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```JavaScript
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })
    ```

- 存在问题

  - **新增**属性、**删除**属性, 界面不会更新。
  - 直接通过**下标修改**数组, 界面不会自动更新。

- 解决方案

  - 使用`Vue.set`、`Vue.delete`或者`vm.$set`、`vm.$delete`这些API

模拟Vue2中实现响应式

```JavaScript
//源数据
let person = {
	name:'张三',
	age:18
}
//模拟Vue2中实现响应式
let p = {}
Object.defineProperty(p,'name',{
	configurable:true,
	get(){ //有人读取name时调用
		return person.name
	},
	set(value){ //有人修改name时调用
		console.log('有人修改了name属性，我发现了，我要去更新界面！')
		person.name = value
	}
})
Object.defineProperty(p,'age',{
	get(){ //有人读取age时调用
		return person.age
	},
	set(value){ //有人修改age时调用
		console.log('有人修改了age属性，我发现了，我要去更新界面！')
		person.age = value
	}
})
```

#### Vue3的响应式

```html
<template>
  <h1>博主的信息</h1>
  <h2>姓名：{{ yk.name }}</h2>
  <h2 v-show="yk.age">年龄：{{ yk.age }}</h2>
  <h2 v-show="yk.gender">性别：{{ yk.gender }}</h2>
  <h2>职业： {{ yk.job.type }}</h2>
  <h2>工资：{{ yk.job.salary }}</h2>
  <h2>爱好：{{ yk.hobby }}</h2>
  <h3>测试数据：{{ yk.job.a.b.c }}</h3>
  <button @click="changeInfo">修改信息</button>
  <button @click="addGender">增加性别</button>
  <button @click="deleteAge">删除年龄</button>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "App",
  setup() {
    // 数据
    let yk = reactive({
      name: "张三",
      age: 18,
      hobby: ["写博客", "学习", "看书"],
      job: {
        type: "前端工程师",
        salary: "30K",
        a: {
          b: {
            c: 666,
          },
        },
      },
    });

    // 方法
    function changeInfo() {
      yk.name = "张三";
      yk.age = 48;
      yk.job.type = "工程师";
      yk.job.salary = "200K";
      yk.a.b.c = 888;
      yk.hobby[0] = "写小说";
    }

    function addGender() {
      yk.gender = "男";
    }
    function deleteAge() {
      delete yk.age;
    }

    return {
      yk,
      changeInfo,
      addGender,
      deleteAge,
    };
  },
};
</script>
```

**实现原理**

- 通过	`Proxy`（代理）:  拦截对象中任意属性的变化, 包括：**属性值的读写、属性的添加、属性的删除**等。
- 通过`Reflect`（反射）:  对源对象的属性进行操作。
- MDN文档中描述的`Proxy`与`Reflect`
  - Proxy：[developer.mozilla.org/zh-CN/docs/…](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy)
  - Reflect：[developer.mozilla.org/zh-CN/docs/…](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FReflect)

​	`Reflect`和`object`同样都可以完成的操作，但是当出现了对同名属性进行操作的时候，使用object的相关方法会直接报错，而使用`Reflect`的相关方法，代码还是依照第一次对数据的操作为准，返回操作的`true`或`false`，通过得到操作是否成功，这对于做一些架构开发和封装的时候如果使用`object`就会导致代码中大量出现`try` `catch` 包裹的方法，否则很容易因为报错导致代码不执行。而使用`Reflect`可以提高代码质量。

### 2.4 computed 函数

```JavaScript
import {computed} from 'vue'

setup(){
    ...
	//计算属性 —— 简写
    let fullName = computed(()=>{
        return person.firstName + '-' + person.lastName
    })
    //计算属性 —— 完整
    let fullName = computed({
        get(){
            return person.firstName + '-' + person.lastName
        },
        set(value){
            const nameArr = value.split('-')
            person.firstName = nameArr[0]
            person.lastName = nameArr[1]
        }
    })
}
```

### 2.5 watch 函数

- 两个小“坑”：
  - 监视`reactive`定义的响应式数据时：`oldValue`无法正确获取、强制开启了深度监视（`deep`配置失效）。
  - 监视`reactive`定义的响应式数据中某个属性时：`deep`配置有效。

**情况一**：监视ref定义的响应式数据

```javascript
//情况一：监视ref定义的响应式数据
watch(sum,(newValue,oldValue)=>{
	console.log('sum变化了',newValue,oldValue)
},{immediate:true})
复制代码
```

如果用ref定义了一个对象

```javascript
watch(person.value,(newValue,oldValue)=>{
	console.log('person变化了',newValue,oldValue)
}) 
复制代码
```

或者这样

```javascript
watch(person,(newValue,oldValue)=>{
	console.log('person变化了',newValue,oldValue)
},{deep: true}) 
复制代码
```

**情况二**：监视多个ref定义的响应式数据

```javascript
//情况二：监视多个ref定义的响应式数据
watch([sum,msg],(newValue,oldValue)=>{
	console.log('sum或msg变化了',newValue,oldValue)
}) 
复制代码
```

**情况三**：监视reactive定义的响应式数据

- 若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
- 若watch监视的是reactive定义的响应式数据，则强制开启了深度监视

```javascript
watch(person,(newValue,oldValue)=>{
	console.log('person变化了',newValue,oldValue)
},{immediate:true,deep:false}) //此处的deep配置不再奏效
复制代码
```

**情况四**：监视reactive定义的响应式数据中的某个属性

```javascript
//情况四：监视reactive定义的响应式数据中的某个属性
watch(()=>person.job,(newValue,oldValue)=>{
	console.log('person的job变化了',newValue,oldValue)
},{immediate:true,deep:true}) 
复制代码
```

**情况五**：监视reactive定义的响应式数据中的某些属性

```javascript
//情况五：监视reactive定义的响应式数据中的某些属性
watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
	console.log('person的job变化了',newValue,oldValue)
},{immediate:true,deep:true})
复制代码
```

**特殊情况**

```javascript
//特殊情况
watch(()=>person.job,(newValue,oldValue)=>{
    console.log('person的job变化了',newValue,oldValue)
},{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
复制代码
```

#### watchEffect函数

- `watch`的套路是：既要指明监视的属性，也要指明监视的回调。
- `watchEffect`的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。
- `watchEffect`有点像`computed`：
  - 但`computed`注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而`watchEffect`更注重的是过程（回调函数的函数体），所以不用写返回值。

```javascript
//watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
watchEffect(()=>{
    const x1 = sum.value
    const x2 = person.age
    console.log('watchEffect配置的回调执行了')
})
```

## 3. 生命周期

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18732d5f4bc54f1eba4e1baa18851ed0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
  - `beforeDestroy`改名为 `beforeUnmount`
  - `destroyed`改名为 `unmounted`

可以直接已配置项的形式使用生命周期钩子，也可以使用组合式API的形式使用，尽量统一

一般来说，组合式API里的钩子会比配置项的钩子先执行，组合式API的钩子名字有变化

- Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`
