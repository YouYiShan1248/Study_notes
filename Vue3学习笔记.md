# Vue3

### diff算法

vue3的diff算法与flutter的key原理类似

![img](https://img-blog.csdnimg.cn/cc4039e8dadd4cbc8011ea4467776a50.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5ruhenM=,size_20,color_FFFFFF,t_70,g_se,x_16)



### 状态响应式

#### ref全家桶

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

customRef 是个工厂函数要求我们返回一个对象 并且实现 get 和 set 适合去做防抖。

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



##### 源码与原理

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

​	在createRef()方法中，会先判断传入的对象是不是一个ref对象（通过isRef判断），如果是就返回对象本身，如果不是就创建一个ref对象，把这个`rawValue`和`shallow`传入这个对象。



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

​	所以在vue内部，我们调用ref传的是一个数组或者对象，在ref内部会进行判断去调用`reactive()`，如果传的是数值等原始数据类型，就会直接把值给返回，也就是直接使用ref()来进行响应式管理。



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



#### reactive全家桶

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

##### 源码与原理

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

##### 源码原理

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

### 响应式原理

Vue2使用的是 `Object.defineProperty` ，Vue3 使用的是 `Proxy`

