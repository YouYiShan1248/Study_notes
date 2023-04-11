#  1. vue基础知识和原理

## 1.1 初识Vue

- 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象
- demo容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法
- demo容器里的代码被称为【Vue模板】
- Vue实例和容器是一一对应的
- 真实开发中只有一个Vue实例，并且会配合着组件一起使用
- {{xxx}}是Vue的语法：插值表达式，{{xxx}}可以读取到data中的所有属性
- 一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新(Vue实现的响应式)

> 初始示例代码

```vue
<!-- 准备好一个容器 -->
<div id="demo">
	<h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
</div>

<script type="text/javascript" >
	Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

	//创建Vue实例
	new Vue({
		el:'#demo', //el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串。
		data:{ //data中用于存储数据，数据供el所指定的容器去使用，值我们暂时先写成一个对象。
			name:'hello,world',
			address:'北京'
		}
	});
</script>
```

##  1.2 模板语法

Vue模板语法有2大类:

- 插值语法：

  功能：用于解析标签体内容

  写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性

- 指令语法:

  功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）

  举例：v-bind:href="xxx" 或 简写为 :href="xxx"，xxx同样要写js表达式，且可以直接读取到data中的所有属性

> 代码

```vue
<div id="root">
	<h1>插值语法</h1>
	<h3>你好，{{name}}</h3>
	<hr/>
	<h1>指令语法</h1>
    <!-- 这里是展示被Vue指令绑定的属性，引号内写的是js表达式 -->
	<a :href="school.url.toUpperCase()" x="hello">点我去{{school.name}}学习1</a>
	<a :href="school.url" x="hello">点我去{{school.name}}学习2</a>
</div>

<script>
    new Vue({
		el:'#root',
		data:{
			name:'jack',
			school:{
				name:'百度',
				url:'http://www.baidu.com',
			}
        }
	})
</script>
```

##  1.3 数据绑定

Vue中有2种数据绑定的方式：

- 单向绑定(v-bind)：数据只能从data流向页面

- 双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data

  > tips:
  >
  > 1.双向绑定一般都应用在表单类元素上（如：input、select等）
  >
  > 2.v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值

> 代码

```
<div id="root">
	<!-- 普通写法 单向数据绑定 -->
    单向数据绑定：<input type="text" v-bind:value="name"><br/>
    双向数据绑定：<input type="text" v-model:value="name"><br/>
    
    <!-- 简写 v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值-->
    单向数据绑定：<input type="text" :value="name"><br/>
    双向数据绑定：<input type="text" v-model="name"><br/>
</div>

<script>
    new Vue({
		el:'#root',
		data:{
			name:'jack',
        }
	})
</script>
```

## 1.4 el与data的两种写法

el有2种写法

- new Vue时候配置el属性
- 先创建Vue实例，随后再通过vm.$mount('#root')指定el的值

> 代码

```
<script>
   	// 第一种 
	const vm = new Vue({
		el:'#root',
		data:{
			name:'jack',
        }
	})
    
    // 第二种
    vm.$mount('#root')
</script>
```

data有2种写法

- 对象式

- 函数式

  > 在组件中，data必须使用函数式

> 代码

```
<script>
    new Vue({
		el:'#root',
        // 第一种
		data:{
			name:'jack',
        }
        
        // 第二种
        data() {
        	return {
                name: 'jack'
            }
    	}
	})
</script>
```

## 1.6 数据代理

> vue2数据响应式原理（Object.defineProperty）

建议学习文章地址：

[https://zh.javascript.info/property-descriptors](https://gitee.com/link?target=https%3A%2F%2Fzh.javascript.info%2Fproperty-descriptors)

[https://zh.javascript.info/property-accessors](https://gitee.com/link?target=https%3A%2F%2Fzh.javascript.info%2Fproperty-accessors)

这里简单介绍一下：

```JavaScript
let person = {
    name:"张三",
    sex:"男"
}
Object.defineProperty(person,"age",{
    value:18,
    enumerable:true,	//控制属性是否可以枚举，默认false
    writable:true,	//控制属性是否可以被修改，默认false
    configurable:true,	//控制属性是否可以被删除，默认false
    
    //当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
    get:function(){
        return 19
    }
    
    //当有人修改person的age属性时，set函数(setter)就会被调用，且会受到修改的具体值
    set(value){
    console.log("有人修改了age属性，且值为",value)
}
})
```

**属性标志**:

对象属性（properties），除 **`value`** 外，还有三个特殊的特性（attributes），也就是所谓的“标志”

- **`writable`** — 如果为 `true`，则值可以被修改，否则它是只可读的
- **`enumerable`** — 如果为 `true`，则表示是可以遍历的，可以在for.. .in Object.keys()中遍历出来
- **`configurable`** — 如果为 `true`，则此属性可以被删除，这些特性也可以被修改，否则不可以

**Object.getOwnPropertyDescriptor(obj, propertyName)**

> 这个方法是查询有关属性的完整信息 obj是对象， propertyName是属性名

```
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');


console.log(descriptor)

/* 属性描述符：
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

> 打印结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/09b4bf67bb7843388fecd7da1572901f.png)

**Object.defineProperty**(obj, prop, descriptor)

> obj：要定义属性的对象。
>
> prop：要定义或修改的属性的名称
>
> descriptor：要定义或修改的属性描述符

```
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false
});

user.name = "Pete";

// 打印后还是显示 'John',无法修改name值
```



**访问器属性：**

本质上是用于获取和设置值的函数，但从外部代码来看就像常规属性。

访问器属性由 “getter” 和 “setter” 方法表示。在对象字面量中，它们用 `get` 和 `set` 表示：

```
let obj = {
    get name() {
        // 当读取 obj.propName 时，getter 起作用
    },
    set name() {
        // 当执行 obj.name = value 操作时，setter 起作用
    }
}
```

**更复杂一点的使用**

```
let user = {
	surname: 'gao',
    name: 'han'
    
    get fullName() {
        return this.name + this.surname;
    }
}

console.log(user.fullName)
```

从外表看，访问器属性看起来就像一个普通属性。这就是访问器属性的设计思想。我们不以函数的方式 **调用** `user.fullName`，我们正常 **读取** 它：getter 在幕后运行。

> vue的计算属性的底层构造感觉用到了这种思想，我目前还没看过源码，是这样猜想的。

截至目前，`fullName` 只有一个 getter。如果我们尝试赋值操作 `user.fullName=`，将会出现错误：

```
user.fullName = "Test"; // Error（属性只有一个 getter）
```

为 `user.fullName` 添加一个 setter 来修复它：

```javascript
let user = {
	surname: 'gao',
    name: 'han'
    
    get fullName() {
        return this.name + ' ' + this.surname;
    }

	set fullName(value) {
        // 这个用到了新语法 结构赋值
        [this.surname, this.name] = value.split(' ');
    }
}

user.fullName = 'Li Hua'

console.log(user.name);
console.log(user.surname);
```

**对数据代理的理解**：

数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）

案例：

```javascript
let obj = {
    x: 100
}

let obj2 = {
    y: 200
}
```

这时候提一个需求：我们想要访问 **obj** 中的 **x** 的值，但我们最好不要直接去访问 **obj** ,而是想要通过 **obj2** 这个代理对象去访问。

这时候就可以用上 **Object.defineProperty()**，给 **obj2** 添加上访问器属性（也就是getter和setter）

> 代码

```
let obj = {
    x: 100
}

let obj2 = {
    y: 200
}

Object.defineProperty(obj2, 'x', {
    get() {
        return obj.x;
    },
    set(value) {
        obj.x = value;
    }
})
```

> 这就是数据代理

**接下来介绍Vue中的数据代理**

- Vue中的数据代理：通过vm对象来代理data对象中属性的操作（读/写）
- Vue中数据代理的好处：更加方便的操作data中的数据
- 基本原理：
  - 通过Object.defineProperty()把data对象中所有属性添加到vm上。
  - 为每一个添加到vm上的属性，都指定一个getter/setter。
  - 在getter/setter内部去操作（读/写）data中对应的属性。

我来用一个案例来详细解释这一个过程。

```
<!-- 准备好一个容器-->
<div id="root">
	<h2>学校名称：{{name}}</h2>
	<h2>学校地址：{{address}}</h2>
</div>

<script>
	const vm = new Vue({
        el: '#root',
        data: {
            name: '成都锦城学院',
            address: '成都高新区'
        }
    })
</script>
```

我们在控制台打印 new 出来的 vm

![在这里插入图片描述](https://img-blog.csdnimg.cn/ea14682958924e37bf950f3960ee998e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)

可以看到，写在配置项中的 data 数据被 绑定到了 vm 对象上，我先来讲结果，是 Vue 将 _data 中的 name，address 数据 代理到 vm 本身上。

> 一脸懵逼？

先来解释下_data 是啥， _data 就是 vm 身上的 _data 属性，就是下图那个

![在这里插入图片描述](https://img-blog.csdnimg.cn/bc4efbf50f414b1a9c1db2ff3581d228.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)

这个 _data 是从哪来的？

```
<script>
    
	const vm = new Vue({
        el: '#root',
        // 我们在Vue 初始化的配置项中写了 data 属性。
        data: {
            name: '浙江师范大学',
            address: '浙江金华'
        }
    })
</script>
```

new Vue 时， Vue 通过一系列处理， 将匹配项上的 data 数据绑定到了 _data 这个属性上，并对这个属性进行了处理（数据劫持），但这个属性就是来源于配置项中的 data，我们可以来验证一下。

```
<script>
    
    let data1 = {
        name: '浙江师范大学',
        address: '浙江金华'
    }
    
	const vm = new Vue({
        el: '#root',
        // 我们在Vue 初始化的配置项中写了 data 属性。
        data: data1
    })
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/e0051173ac224b408d037fda33de6410.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_18,color_FFFFFF,t_70,g_se,x_16)

> 打印结果为true，说明两者就是同一个

好了，再回到数据代理上来，将 **vm._data** 中的值，再代理到 vm 本身上来，用vm.name 代替 **vm._data.name**。这就是 Vue 的数据代理

![在这里插入图片描述](https://img-blog.csdnimg.cn/66b4020fbc5143aa8ddf3f6fd86af0ea.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_19,color_FFFFFF,t_70,g_se,x_16)

这一切都是通过 Object.defineProperty() 来完成的，我来模拟一下这个过程

```javascript
Object.defineProperty(vm, 'name', {
    get() {
        return vm._data.name;
    },
    set(value) {
        vm._data.name = value
    }
})
```

> 这样有啥意义？明明通过 vm._data.name 也可以访问 name 的值，为啥费力去这样操作？

在插值语法中，{{ name }} 取到的值就相当于 {{ vm.name }}，不用数据代理的话，在插值语法就要这样去写了。

{{ _data. name }} 这不符合直觉，怪怪的。vue 这样设计更利于开发者开发，我们在研究原理会觉得有些复杂

![在这里插入图片描述](https://img-blog.csdnimg.cn/8ccad88c5e40497587dadb3db07e1821.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)

## 1.7 事件处理

事件的基本使用：

- 使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名
- 事件的回调需要配置在methods对象中，最终会在vm上
- methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>欢迎来到{{name}}学习</h2>
    <!-- <button v-on:click="showInfo">点我提示信息</button> -->
    <button @click="showInfo1">点我提示信息1（不传参）</button>
    <!-- 主动传事件本身 -->
    <button @click="showInfo2($event,66)">点我提示信息2（传参）</button>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            name:'vue',
        },
        methods:{
            // 如果vue模板没有写event，会自动传 event 给函数
            showInfo1(event){
                // console.log(event.target.innerText)
                // console.log(this) //此处的this是vm
                alert('同学你好！')
            },
            showInfo2(event,number){
                console.log(event,number)
                // console.log(event.target.innerText)
                // console.log(this) //此处的this是vm
                alert('同学你好！！')
            }
        }
	});
</script>
```

**Vue中的事件修饰符**

- prevent：阻止默认事件（常用）
- stop：阻止事件冒泡（常用）
- once：事件只触发一次（常用）

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>欢迎来到{{name}}学习</h2>
    <!-- 阻止默认事件（常用） -->
	<a href="http://www.baidu.com" @click.prevent="showInfo">点我提示信息</a>
    <!-- 阻止事件冒泡（常用） -->
    <div class="demo1" @click="showInfo">
        <button @click.stop="showInfo">点我提示信息</button>
        <!-- 修饰符可以连续写 -->
        <!-- <a href="http://www.atguigu.com" @click.prevent.stop="showInfo">点我提示信息</a> -->
    </div>
    <!-- 事件只触发一次（常用） -->
    <button @click.once="showInfo">点我提示信息</button>
</div>
```

## 1.8 键盘事件

键盘事件语法糖：@keydown，@keyup

Vue中常用的按键别名：

- 回车 => enter
- 删除 => delete
- 退出 => esc
- 空格 => space
- 换行 => tab (特殊，必须配合keydown去使用)

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>欢迎来到{{name}}学习</h2>
    <input type="text" placeholder="按下回车提示输入" @keydown.enter="showInfo">
</div>

<script>
    new Vue({
        el:'#root',
        data:{
            name:'成都锦城学院'
        },
        methods: {
            showInfo(e){
                // console.log(e.key,e.keyCode)
                console.log(e.target.value)
            }
        },
    })
</script>
```

## 1.9 计算属性

- 定义：要用的属性不存在，要通过已有属性计算得来
- 原理：底层借助了Objcet.defineProperty方法提供的getter和setter
- get函数什么时候执行？
  - (1).初次读取时会执行一次
  - (2).当依赖的数据发生改变时会被再次调用
- 优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便
- 备注：
  - 计算属性最终会出现在vm上，直接读取使用即可
  - 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变

> 计算属性完整版写法

```html
<!-- 准备好一个容器-->
<div id="root">
    姓：<input type="text" v-model="firstName">
    名：<input type="text" v-model="lastName"> 
    全名：<span>{{fullName}}</span>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            firstName:'张',
            lastName:'三',
        }
        computed:{
            fullName:{
                //get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
                //get什么时候调用？1.初次读取fullName时。2.所依赖的数据发生变化时。
                get(){
                    console.log('get被调用了')
                    return this.firstName + '-' + this.lastName
                },
                //set什么时候调用? 当fullName被修改时。
                // 可以主动在控制台修改fullName来查看情况
                set(value){
                    console.log('set',value)
                    const arr = value.split('-')
                    this.firstName = arr[0]
                    this.lastName = arr[1]
                }
            }
        }
    })
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/0acfc64ee54d44418ff0a2750a6c4ffd.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_17,color_FFFFFF,t_70,g_se,x_16)

> 计算属性简写

```html
<!-- 准备好一个容器-->
<div id="root">
    姓：<input type="text" v-model="firstName">
    名：<input type="text" v-model="lastName"> 
    全名：<span>{{fullName}}</span>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            firstName:'张',
            lastName:'三',
        }
        computed:{
            fullName() {
        		console.log('get被调用了')
				return this.firstName + '-' + this.lastName
    		}
        }
    })
</script>
```

## 1.10 监视属性

监视属性watch：

- 当被监视的属性变化时, 回调函数自动调用, 进行相关操作
- 监视的属性必须存在，才能进行监视
- 监视的两种写法：
  - (1).new Vue时传入watch配置
  - (2).通过vm.$watch监视

> 第一种写法

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>今天天气很{{ info }}</h2>
    <button @click="changeWeather">切换天气</button>
</div>


<script>
	const vm = new Vue({
        el:'#root',
        data:{
            isHot:true,
        },
        computed:{
            info(){
                return this.isHot ? '炎热' : '凉爽'
            }
        },
        methods: {
            changeWeather(){
                this.isHot = !this.isHot
            }
        },
        watch:{
            isHot:{
                immediate: true, // 初始化时让handler调用一下
                // handler什么时候调用？当isHot发生改变时。
                handler(newValue, oldValue){
                    console.log('isHot被修改了',newValue,oldValue)
                }
            }
        } 
    })
</script>
```

> 第二种写法

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>今天天气很{{ info }}</h2>
    <button @click="changeWeather">切换天气</button>
</div>


<script>
	const vm = new Vue({
        el:'#root',
        data:{
            isHot:true,
        },
        computed:{
            info(){
                return this.isHot ? '炎热' : '凉爽'
            }
        },
        methods: {
            changeWeather(){
                this.isHot = !this.isHot
            }
        }
    })
    
    vm.$watch('isHot',{
        immediate:true, //初始化时让handler调用一下
        //handler什么时候调用？当isHot发生改变时。
        handler(newValue,oldValue){
            console.log('isHot被修改了',newValue,oldValue)
        }
    })
</script>
```

**深度监视：**

- (1).Vue中的watch默认不监测对象内部值的改变（一层）
- (2).配置deep:true可以监测对象内部值改变（多层）

> 备注：
>
> (1).Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以
>
> (2).使用watch时根据数据的具体结构，决定是否采用深度监视

```html
<!-- 准备好一个容器-->
<div id="root">
    {{numbers.c.d.e}}
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
    const vm = new Vue({
        el:'#root',
        data:{
            numbers:{
                c:{
                    d:{
                        e:100
                    }
                }
            }
        },
        watch:{
            //监视多级结构中某个属性的变化
            /* 'numbers.a':{
					handler(){
						console.log('a被改变了')
					}
				} */
            //监视多级结构中所有属性的变化
            numbers:{
                deep:true,
                handler(){
                    console.log('numbers改变了')
                }
            }
        }
    });
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/b5a0d88990404a5e90bea2788788ec39.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_14,color_FFFFFF,t_70,g_se,x_16)

> 监视属性简写

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>今天天气很{{info}}</h2>
    <button @click="changeWeather">切换天气</button>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            isHot:true,
        },
        computed:{
            info(){
                return this.isHot ? '炎热' : '凉爽'
            }
        },
        methods: {
            changeWeather(){
                this.isHot = !this.isHot
            }
        },
        watch:{
            //简写
            isHot(newValue, oldValue) {
					console.log('isHot被修改了', newValue, oldValue, this)
			} 
        }
    })
</script>
```

**computed和watch之间的区别：**

- computed能完成的功能，watch都可以完成
- watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作

> 两个重要的小原则：
>
> 1.所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象
>
> 2.所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，这样this的指向才是vm 或 组件实例对象

```html
<!-- 准备好一个容器-->
<div id="root">
    姓：<input type="text" v-model="firstName"> <br/><br/>
    名：<input type="text" v-model="lastName"> <br/><br/>
    全名：<span>{{fullName}}</span> <br/><br/>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            firstName:'张',
            lastName:'三',
            fullName:'张-三'
        },
        watch:{
            // watch 监视器里可以写 异步函数
            firstName(val){
                setTimeout(()=>{
                    console.log(this)
                    this.fullName = val + '-' + this.lastName
                },1000);
            },
            lastName(val){
                this.fullName = this.firstName + '-' + val
            }
        }
    })
</script>
```



## 1.11 绑定样式

### **class样式**

写法：:class="xxx"    xxx可以是字符串、对象、数。

所以分为三种写法，字符串写法，数组写法，对象写法



**字符串写法**

字符串写法适用于：类名不确定，要动态获取。

```html
<style>
	.normal{
        background-color: skyblue;
    }
</style>

<!-- 准备好一个容器-->
<div id="root">
    <!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
    <div class="basic" :class="mood" @click="changeMood">{{name}}</div>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            mood:'normal'
        }
    })
</script>
```





**数组写法**

数组写法适用于：要绑定多个样式，个数不确定，名字也不确定。

```html
<style>
    .atguigu1{
        background-color: yellowgreen;
    }
    .atguigu2{
        font-size: 30px;
        text-shadow:2px 2px 10px red;
    }
    .atguigu3{
        border-radius: 20px;
    }
</style>

<!-- 准备好一个容器-->
<div id="root">
    <!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
	<div class="basic" :class="classArr">{{name}}</div>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            classArr: ['atguigu1','atguigu2','atguigu3']
        }
    })
</script>
```





**对象写法**

对象写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。

```html
<style>
    .atguigu1{
        background-color: yellowgreen;
    }
    .atguigu2{
        font-size: 30px;
        text-shadow:2px 2px 10px red;
    }
</style>

<!-- 准备好一个容器-->
<div id="root">
    <!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
	<div class="basic" :class="classObj">{{name}}</div>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            classObj:{
                atguigu1:false,
                atguigu2:false,
			}
        }
    })
</script>
```



### **style样式**

有两种写法，对象写法，数组写法

**对象写法**

```html
<!-- 准备好一个容器-->
<div id="root">
    <!-- 绑定style样式--对象写法 -->
	<div class="basic" :style="styleObj">{{name}}</div>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            styleObj:{
                fontSize: '40px',
                color:'red',
			}
        }
    })
</script>
```



**数组写法**

```html
<!-- 准备好一个容器-->
<div id="root">
    <!-- 绑定style样式--数组写法 -->
	<div class="basic" :style="styleArr">{{name}}</div>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            styleArr:[
                {
                    fontSize: '40px',
                    color:'blue',
                },
                {
                    backgroundColor:'gray'
                }
            ]
        }
    })
</script>
```





## 1.12 条件渲染

### v-if

* 写法：

  (1).v-if="表达式" 

  (2).v-else-if="表达式"

  (3).v-else="表达式"

* 适用于：切换频率较低的场景

* 特点：不展示的DOM元素直接被移除

* 注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”



```html
<!-- 准备好一个容器-->
<div id="root">
    <!-- 使用v-if做条件渲染 -->
    <h2 v-if="false">欢迎来到{{name}}</h2>
    <h2 v-if="1 === 1">欢迎来到{{name}}</h2>
    
    
    <!-- v-else和v-else-if -->
    <div v-if="n === 1">Angular</div>
    <div v-else-if="n === 2">React</div>
    <div v-else-if="n === 3">Vue</div>
    <div v-else>哈哈</div>
    
    
    <!-- v-if与template的配合使用 -->
    <!-- 就不需要写好多个判断，写一个就行 -->
    <!-- 这里的思想就像事件代理的使用 -->
    <template v-if="n === 1">
        <h2>你好</h2>
        <h2>尚硅谷</h2>
        <h2>北京</h2>
    </template>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            styleArr:[
                {
                    fontSize: '40px',
                    color:'blue',
                },
                {
                    backgroundColor:'gray'
                }
            ]
        }
    })
</script>
```



### **v-show**

* 写法：v-show="表达式"
* 适用于：切换频率较高的场景
* 特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉(display:none)



> 备注：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到
>
> v-if 是实打实地改变dom元素，v-show 是隐藏或显示dom元素

```html
<!-- 准备好一个容器-->
<div id="root">
    <!-- 使用v-show做条件渲染 -->
    <h2 v-show="false">欢迎来到{{name}}</h2>
    <h2 v-show="1 === 1">欢迎来到{{name}}</h2>
</div>
```





## 1.13 列表渲染

### v-for指令

* 用于展示列表数据
* 语法：v-for="(item, index) in xxx" :key="yyy"
* 可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）



```html
<div id="root">
    <!-- 遍历数组 -->
    <h2>人员列表（遍历数组）</h2>
    <ul>
        <li v-for="(p,index) of persons" :key="index">
            {{p.name}}-{{p.age}}
        </li>
    </ul>

    <!-- 遍历对象 -->
    <h2>汽车信息（遍历对象）</h2>
    <ul>
        <li v-for="(value,k) of car" :key="k">
            {{k}}-{{value}}
        </li>
    </ul>

    <!-- 遍历字符串 -->
    <h2>测试遍历字符串（用得少）</h2>
    <ul>
        <li v-for="(char,index) of str" :key="index">
            {{char}}-{{index}}
        </li>
    </ul>

    <!-- 遍历指定次数 -->
    <h2>测试遍历指定次数（用得少）</h2>
    <ul>
        <li v-for="(number,index) of 5" :key="index">
            {{index}}-{{number}}
        </li>
    </ul>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data: {
			persons: [
				{ id: '001', name: '张三', age: 18 },
				{ id: '002', name: '李四', age: 19 },
				{ id: '003', name: '王五', age: 20 }
			],
			car: {
				name: '奥迪A8',
				price: '70万',
				color: '黑色'
			},
			str: 'hello'
		}
    })
</script>
```



### **key的原理**

vue中的key有什么作用？（key的内部原理）

了解vue中key的原理需要一些前置知识。

就是vue的虚拟dom，vue会根据 data中的数据生成虚拟dom，如果是第一次生成页面，就将虚拟dom转成真实dom，在页面展示出来。

虚拟dom有啥用？每次vm._data 中的数据更改，都会触发生成新的虚拟dom，新的虚拟dom会跟旧的虚拟dom进行比较，如果有相同的，在生成真实dom时，这部分相同的就不需要重新生成，只需要将两者之间不同的dom转换成真实dom，再与原来的真实dom进行拼接。我的理解是虚拟dom就是起到了一个dom复用的作用，还有避免重复多余的操作，下文有详细解释。



而key有啥用？

key是虚拟dom的标识。



先来点预备的知识：啥是真实 DOM？真实 DOM 和 虚拟 DOM 有啥区别？如何用代码展现真实 DOM 和 虚拟 DOM

#### 真实`DOM`和其解析流程

这里参考超级英雄大佬：https://juejin.cn/post/6844903895467032589

`webkit` 渲染引擎工作流程图

![img](https://img-blog.csdnimg.cn/img_convert/b32d88931ee775d57b382d7585de3ad8.png)

> 中文版

![img](https://img-blog.csdnimg.cn/img_convert/cd1757feee540ef20c50b81af16d75ca.png)



 所有的浏览器渲染引擎工作流程大致分为5步：创建 `DOM` 树 —> 创建 `Style Rules` -> 构建 `Render` 树 —> 布局 `Layout` -—> 绘制 `Painting`。

* 第一步，构建 DOM 树：当浏览器接收到来自服务器响应的HTML文档后，会遍历文档节点，生成DOM树。需要注意的是在DOM树生成的过程中有可能会被CSS和JS的加载执行阻塞，渲染阻塞下面会讲到。

* 第二步，生成样式表：用 CSS 分析器，分析 CSS 文件和元素上的 inline 样式，生成页面的样式表；

* 渲染阻塞：当浏览器遇到一个script标签时，DOM构建将暂停，直到脚本加载执行，然后继续构建DOM树。每次去执行Javascript脚本都会严重阻塞DOM树构建，如果JavaScript脚本还操作了CSSOM，而正好这个CSSOM没有下载和构建，那么浏览器甚至会延迟脚本执行和构建DOM，直到这个CSSOM的下载和构建。所以，script标签引入很重要，实际使用时可以遵循下面两个原则：

  * css优先：引入顺序上，css资源先于js资源

  * js后置：js代码放在底部，且js应尽量少影响DOM构建

    > 还有一个小知识：当解析html时，会把新来的元素插入dom树里，同时去查找css，然后把对应的样式规则应用到元素上，查找样式表是按照从右到左的顺序匹配的例如：div p {...}，会先寻找所有p标签并判断它的父标签是否为div之后才决定要不要采用这个样式渲染。所以平时写css尽量用class或者id，不要过度层叠

* 第三步，构建渲染树：通过DOM树和CSS规则我们可以构建渲染树。浏览器会从DOM树根节点开始遍历每个可见节点(注意是可见节点)对每个可见节点，找到其适配的CSS规则并应用。渲染树构建完后，每个节点都是可见节点并且都含有其内容和对应的规则的样式。这也是渲染树和DOM树最大的区别所在。渲染是用于显示，那些不可见的元素就不会在这棵树出现了。除此以外，display none的元素也不会被显示在这棵树里。visibility hidden的元素会出现在这棵树里。

* 第四步，**渲染布局**：布局阶段会从渲染树的根节点开始遍历，然后确定每个节点对象在页面上的确切大小与位置，布局阶段的输出是一个盒子模型，它会精确地捕获每个元素在屏幕内的确切位置与大小。

* 第五步，**渲染树绘制**：在绘制阶段，遍历渲染树，调用渲染器的paint()方法在屏幕上显示其内容。渲染树的绘制工作是由浏览器的UI后端组件完成的。

**注意点：**

**1、`DOM` 树的构建是文档加载完成开始的？** 构建 `DOM` 树是一个渐进过程，为达到更好的用户体验，渲染引擎会尽快将内容显示在屏幕上，它不必等到整个 `HTML` 文档解析完成之后才开始构建 `render` 树和布局。

**2、`Render` 树是 `DOM` 树和 `CSS` 样式表构建完毕后才开始构建的？** 这三个过程在实际进行的时候并不是完全独立的，而是会有交叉，会一边加载，一边解析，以及一边渲染。

**3、`CSS` 的解析注意点？** `CSS` 的解析是从右往左逆向解析的，嵌套标签越多，解析越慢。

**4、`JS` 操作真实 `DOM` 的代价？**传统DOM结构操作方式对性能的影响很大，原因是频繁操作DOM结构操作会引起页面的重排(reflow)和重绘(repaint)，浏览器不得不频繁地计算布局，重新排列和绘制页面元素，导致浏览器产生巨大的性能开销。直接操作真实`DOM`的性能特别差，我们可以来演示一遍。

```js
<div id="app"></div>
<script>
    // 获取 DIV 元素
    let box = document.querySelector('#app');
    console.log(box);

    // 真实 DOM 操作
    console.time('a');
    for (let i = 0; i <= 10000; i++) {
        box.innerHTML = i;
    }
    console.timeEnd('a');

    // 虚拟 DOM 操作
    let num = 0;
    console.time('b');
    for (let i = 0; i <= 10000; i++) {
        num = i;
    }
    box.innerHTML = num;
    console.timeEnd('b');

</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/0740cb16f1354358bed6ef638b90ebfe.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_19,color_FFFFFF,t_70,g_se,x_16)


>从结果中可以看出，操作真实 DOM 的性能是非常差的，所以我们要尽可能的复用，减少 DOM 操作。





#### **虚拟 DOM 的好处**

​	虚拟 `DOM` 就是为了解决浏览器性能问题而被设计出来的。如前，若一次操作中有 10 次更新 `DOM` 的动作，虚拟 `DOM` 不会立即操作 `DOM`，而是将这 10 次更新的 `diff` 内容保存到本地一个 `JS` 对象中，最终将这个 `JS` 对象一次性 `attch` 到 `DOM` 树上，再进行后续操作，避免大量无谓的计算量。所以，用 `JS` 对象模拟 `DOM` 节点的好处是，页面的更新可以先全部反映在 `JS` 对象(虚拟 `DOM` )上，操作内存中的 `JS` 对象的速度显然要更快，等更新完成后，再将最终的 `JS` 对象映射成真实的 `DOM`，交由浏览器去绘制。

​	虽然这一个虚拟 DOM 带来的一个优势，但并不是全部。虚拟 DOM 最大的优势在于抽象了原本的渲染过程，实现了跨平台的能力，而不仅仅局限于浏览器的 DOM，可以是安卓和 IOS 的原生组件，可以是近期很火热的小程序，也可以是各种GUI。

​	回到最开始的问题，虚拟 DOM 到底是什么，说简单点，就是一个普通的 JavaScript 对象，包含了 `tag`、`props`、`children` 三个属性。

> 接下来我们手动实现下 虚拟 DOM。
>
> 分两种实现方式：
>
> 一种原生 js DOM 操作实现；
>
> 另一种主流虚拟 DOM 库（snabbdom、virtual-dom）的实现（用h函数渲染）（暂时还不理解）



**算法实现**

**（1）**用 JS 对象模拟 DOM 树：

```html
<div id="virtual-dom">
    <p>Virtual DOM</p>
    <ul id="list">
      <li class="item">Item 1</li>
      <li class="item">Item 2</li>
      <li class="item">Item 3</li>
    </ul>
    <div>Hello World</div>
</div> 
```

我们用 `JavaScript` 对象来表示 `DOM` 节点，使用对象的属性记录节点的类型、属性、子节点等。

```js
/**
 * Element virdual-dom 对象定义
 * @param {String} tagName - dom 元素名称
 * @param {Object} props - dom 属性
 * @param {Array<Element|String>} - 子节点
 */
function Element(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
    // dom 元素的 key 值，用作唯一标识符
    if (props.key) {
        this.key = props.key
    }
}
function el(tagName, props, children) {
    return new Element(tagName, props, children);
}
```

构建虚拟的  `DOM`  ，用 javascript 对象来表示

```js
let ul = el('div', { id: 'Virtual DOM' }, [
    el('p', {}, ['Virtual DOM']),
    el('ul', { id: 'list' }, [
        el('li', { class: 'item' }, ['Item 1']),
        el('li', { class: 'item' }, ['Item 2']),
        el('li', { class: 'item' }, ['Item 3'])
    ]),
    el('div', {}, ['Hello, World'])
])
```

现在 `ul` 就是我们用 `JavaScript` 对象表示的 `DOM` 结构，我们输出查看 `ul` 对应的数据结构如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/9fb2a6336a61477c8ea39677716d1f52.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


**（2）**将用 js 对象表示的虚拟 DOM 转换成真实 DOM：需要用到 js 原生操作 DOM 的方法。

```js
/**
 * render 将virdual-dom 对象渲染为实际 DOM 元素
 */
Element.prototype.render = function () {
    // 创建节点
    let el = document.createElement(this.tagName);

    let props = this.props;
    // 设置节点的 DOM 属性
    for (let propName in props) {
        let propValue = props[propName];
        el.setAttribute(propName, propValue)
    }

    let children = this.children || []
    for (let child of children) {
        let childEl = (child instanceof Element)
        ? child.render() // 如果子节点也是虚拟 DOM, 递归构建 DOM 节点
        : document.createTextNode(child) // 如果是文本，就构建文本节点

        el.appendChild(childEl);
    }

    return el;
}
```

我们通过查看以上 `render` 方法，会根据 `tagName` 构建一个真正的 `DOM` 节点，然后设置这个节点的属性，最后递归地把自己的子节点也构建起来。

我们将构建好的 `DOM` 结构添加到页面 `body` 上面，如下：

```js
let ulRoot = ul.render();
document.body.appendChild(ulRoot);
```

这样，页面 `body` 里面就有真正的 `DOM` 结构，效果如下图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/41bf566f214f4c1f943b9a3dddfc6f19.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_19,color_FFFFFF,t_70,g_se,x_16)




> 我们知道虚拟 DOM 的好处和虚拟 DOM 的实现后就要讲讲 key 的作用了。
>
> 贴一下上面实现地完整代码

```html
<script>
    /**
         * Element virdual-dom 对象定义
         * @param {String} tagName - dom 元素名称
         * @param {Object} props - dom 属性
         * @param {Array<Element|String>} - 子节点
         */
    function Element(tagName, props, children) {
        this.tagName = tagName;
        this.props = props;
        this.children = children;
        // dom 元素的 key 值，用作唯一标识符
        if (props.key) {
            this.key = props.key
        }
    }

    function el(tagName, props, children) {
        return new Element(tagName, props, children);
    }

    let ul = el('div', { id: 'Virtual DOM' }, [
        el('p', {}, ['Virtual DOM']),
        el('ul', { id: 'list' }, [
            el('li', { class: 'item' }, ['Item 1']),
            el('li', { class: 'item' }, ['Item 2']),
            el('li', { class: 'item' }, ['Item 3'])
        ]),
        el('div', {}, ['Hello, World'])
    ])

    /**
             * render 将virdual-dom 对象渲染为实际 DOM 元素
             */
    Element.prototype.render = function () {
        // 创建节点
        let el = document.createElement(this.tagName);

        let props = this.props;
        // 设置节点的 DOM 属性
        for (let propName in props) {
            let propValue = props[propName];
            el.setAttribute(propName, propValue)
        }

        let children = this.children || []
        for (let child of children) {
            let childEl = (child instanceof Element)
            ? child.render() // 如果子节点也是虚拟 DOM, 递归构建 DOM 节点
            : document.createTextNode(child) // 如果是文本，就构建文本节点

            el.appendChild(childEl);
        }

        return el;
    }

    let ulRoot = ul.render();
    document.body.appendChild(ulRoot);
    console.log(ul);
</script>
```







#### **虚拟DOM中key的作用**

key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

* 旧虚拟DOM中找到了与新虚拟DOM相同的key：
  * ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
  * ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
* 旧虚拟DOM中未找到与新虚拟DOM相同的key
  * 创建新的真实DOM，随后渲染到到页面。



> 好了，我们知道了最简单的key的原理，如果要继续研究下去就要涉及到vue的核心之一-Diff算法，后面会详细介绍。



### 用index作为key可能会引发的问题

**若对数据进行：逆序添加、逆序删除等破坏顺序操作：**

会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。



> 案例

```html
<!-- 准备好一个容器-->
<div id="root">
    <!-- 遍历数组 -->
    <h2>人员列表（遍历数组）</h2>
    <button @click.once="add">添加一个老刘</button>
    <ul>
        <li v-for="(p,index) of persons" :key="index">
            {{p.name}}-{{p.age}}
            <input type="text">
        </li>
    </ul>
</div>

<script type="text/javascript">
	Vue.config.productionTip = false

	new Vue({
		el: '#root',
		data: {
			persons: [
				{ id: '001', name: '张三', age: 18 },
				{ id: '002', name: '李四', age: 19 },
				{ id: '003', name: '王五', age: 20 }
			]
		},
		methods: {
			add() {
				const p = { id: '004', name: '老刘', age: 40 }
				this.persons.unshift(p)
			}
		},
	});
</script>
```

> 解释：

初始数据

persons: [
		{ id: '001', name: '张三', age: 18 },
		{ id: '002', name: '李四', age: 19 },
		{ id: '003', name: '王五', age: 20 }
]

**vue根据数据生成虚拟 DOM**

初始虚拟 DOM 

```html
<li key='0'>张三-18<input type="text"></li>
<li key='1'>李四-19<input type="text"></li>
<li key='2'>王五-20<input type="text"></li>
```

**将虚拟 DOM 转为 真实 DOM** 

![在这里插入图片描述](https://img-blog.csdnimg.cn/ac320c177da8496785f7b94e54dd938a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_13,color_FFFFFF,t_70,g_se,x_16)


`this.persons.unshift({ id: '004', name: '老刘', age: 40 })`

在 persons 数组最前面添加上 { id: '004', name: '老刘', age: 40 }

新数据：

persons: [

​		{ id: '004', name: '老刘', age: 40 },

​		{ id: '001', name: '张三', age: 18 },
​		{ id: '002', name: '李四', age: 19 },
​		{ id: '003', name: '王五', age: 20 }
]

**vue根据数据生成虚拟 DOM**

新虚拟 DOM

```html
<li key='0'>老刘-30<input type="text"></li>
<li key='1'>张三-18<input type="text"></li>
<li key='3'>李四-19<input type="text"></li>
<li key='4'>王五-20<input type="text"></li>
```

**将虚拟 DOM 转为 真实 DOM** 

![在这里插入图片描述](https://img-blog.csdnimg.cn/2ec092bf1dca430c9d9b7bf932587501.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_15,color_FFFFFF,t_70,g_se,x_16)




因为老刘被插到第一个，重刷了 key 的值，vue Diff 算法 根据 key 的值 判断 虚拟DOM 全部发生了改变，然后全部重新生成新的 真实 DOM。实际上，张三，李四，王五并没有发生更改，是可以直接复用之前的真实 DOM，而因为 key 的错乱，导致要全部重新生成，造成了性能的浪费。

> 来张尚硅谷的图

![在这里插入图片描述](https://img-blog.csdnimg.cn/ec80a7ae139642d09d70e77ca37e0a52.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)




**如果结构中还包含输入类的DOM：**

会产生错误DOM更新 ==> 界面有问题。

> 这回造成的就不是性能浪费了，会直接导致页面的错误

![在这里插入图片描述](https://img-blog.csdnimg.cn/c89eb1802c7a4698ba5b14ab0ab654d8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_16,color_FFFFFF,t_70,g_se,x_16)




### 结论

* 最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值
* 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的



> 来张尚硅谷的图，正经使用 key

![在这里插入图片描述](https://img-blog.csdnimg.cn/e5b3f8a66d7441e5bcff0a2525266759.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)



## 1.14 vue 监测data 中的 数据

### 列表过滤

```html
<title>列表过滤</title>
<script type="text/javascript" src="../js/vue.js"></script>
<div id="root">
  <h2>人员列表</h2>
  <input type="text" placeholder="请输入名字" v-model="keyWord">
  <ul>
    <li v-for="(p,index) of filPersons" :key="p.id">
      {{ p.name }}-{{ p.age }}-{{ p.sex }}
    </li>
  </ul>
</div>
<script type="text/javascript">
  Vue.config.productionTip = false
  // 用 watch 实现
  // #region 
  /* new Vue({
			el: '#root',
			data: {
				keyWord: '',
				persons: [
					{ id: '001', name: '马冬梅', age: 19, sex: '女' },
					{ id: '002', name: '周冬雨', age: 20, sex: '女' },
					{ id: '003', name: '周杰伦', age: 21, sex: '男' },
					{ id: '004', name: '温兆伦', age: 22, sex: '男' }
				],
				filPersons: []
			},
			watch: {
				keyWord: {
					immediate: true,
					handler(val) {
						this.filPersons = this.persons.filter((p) => {
							return p.name.indexOf(val) !== -1
						})
					}
				}
			}
		}) */
  //#endregion
  // 用 computed 实现
  new Vue({
    el: '#root',
    data: {
      keyWord: '',
      persons: [
        { id: '001', name: '马冬梅', age: 19, sex: '女' },
        { id: '002', name: '周冬雨', age: 20, sex: '女' },
        { id: '003', name: '周杰伦', age: 21, sex: '男' },
        { id: '004', name: '温兆伦', age: 22, sex: '男' }
      ]
    },
    computed: {
      filPersons() {
        return this.persons.filter((p) => {
          return p.name.indexOf(this.keyWord) !== -1
        })
      }
    }
  }) 
</script>
```

### 列表排序

```html
<title>列表排序</title>
<script type="text/javascript" src="../js/vue.js"></script>
<div id="root">
  <h2>人员列表</h2>
  <input type="text" placeholder="请输入名字" v-model="keyWord">
  <button @click="sortType = 2">年龄升序</button>
  <button @click="sortType = 1">年龄降序</button>
  <button @click="sortType = 0">原顺序</button>
  <ul>
    <li v-for="(p,index) of filPersons" :key="p.id">
      {{p.name}}-{{p.age}}-{{p.sex}}
      <input type="text">
    </li>
  </ul>
</div>
<script type="text/javascript">
  Vue.config.productionTip = false
  new Vue({
    el: '#root',
    data: {
      keyWord: '',
      sortType: 0, // 0原顺序 1降序 2升序
      persons: [
        { id: '001', name: '马冬梅', age: 30, sex: '女' },
        { id: '002', name: '周冬雨', age: 31, sex: '女' },
        { id: '003', name: '周杰伦', age: 18, sex: '男' },
        { id: '004', name: '温兆伦', age: 19, sex: '男' }
      ]
    },
    computed: {
      filPersons() {
        const arr = this.persons.filter((p) => {
          return p.name.indexOf(this.keyWord) !== -1
        })
        //判断一下是否需要排序
        if (this.sortType) {
          arr.sort((p1, p2) => {
            return this.sortType === 1 ? p2.age - p1.age : p1.age - p2.age
          })
        }
        return arr
      }
    }
  })

</script>


```



### 数据监测原理

先来个案例引入一下：

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>人员列表</h2>
    <button @click="updateMei">更新马冬梅的信息</button>
    <ul>
        <li v-for="(p,index) of persons" :key="p.id">
            {{p.name}}-{{p.age}}-{{p.sex}}
        </li>
    </ul> 
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    const vm = new Vue({
        el:'#root',
        data:{
            persons:[
                {id:'001',name:'马冬梅',age:30,sex:'女'},
                {id:'002',name:'周冬雨',age:31,sex:'女'},
                {id:'003',name:'周杰伦',age:18,sex:'男'},
                {id:'004',name:'温兆伦',age:19,sex:'男'}
            ]
        },
        methods: {
            updateMei(){
                // this.persons[0].name = '马老师' //奏效
                // this.persons[0].age = 50 //奏效
                // this.persons[0].sex = '男' //奏效
                this.persons[0] = {id:'001',name:'马老师',age:50,sex:'男'} //不奏效
                // this.persons.splice(0,1,{id:'001',name:'马老师',age:50,sex:'男'})
            }
        }
    }) 

</script>
```

点击更新马冬梅的信息，马冬梅的数据并没有发生改变。

![在这里插入图片描述](https://img-blog.csdnimg.cn/6f16b316d8824ca897e55c70884463de.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


我们来看看控制台：
![在这里插入图片描述](https://img-blog.csdnimg.cn/145a2298bba942c78f8d23f03fb21bdf.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


控制台上的数据发生了改变，说明，这个更改的数据并没有被 vue 监测到。

所以我们来研究一下 Vue 监测的原理。

我们先研究 Vue 如何监测 对象里的数据

> 代码

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    const vm = new Vue({
        el:'#root',
        data:{
            name:'浙江师范大学',
            address:'金华',
            student:{
                name:'tom',
                age:{
                    rAge:40,
                    sAge:29,
                },
                friends:[
                    {name:'jerry',age:35}
                ]
            }
        }
    })
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/024cbd8a706c451e9a1f6cc3916e426e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


> 讲一下解析模板后面的操作---》调用 set 方法时，就会去解析模板----->生成新的虚拟 DOM----->新旧DOM 对比 -----> 更新页面

模拟一下 vue 中的 数据监测

```html
<script type="text/javascript" >

    let data = {
        name:'尚硅谷',
        address:'北京',
    }

    //创建一个监视的实例对象，用于监视data中属性的变化
    const obs = new Observer(data)		
    console.log(obs)	

    //准备一个vm实例对象
    let vm = {}
    vm._data = data = obs

    function Observer(obj){
        //汇总对象中所有的属性形成一个数组
        const keys = Object.keys(obj)
        //遍历
        keys.forEach((k) => {
            Object.defineProperty(this, k, {
                get() {
                    return obj[k]
                },
                set(val) {
                    console.log(`${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`)
                    obj[k] = val
                }
            })
        })
    }
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/250a6e7fa0da45608997f2688e143d45.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


**Vue.set 的使用**

Vue.set(target，propertyName/index，value) 或

vm.$set(target，propertyName/index，value)

**用法**：

向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 `vm.myObject.newProperty = 'hi'`)

> 代码

```html
<!-- 准备好一个容器-->
<div id="root">
    <h1>学生信息</h1>
    <button @click="addSex">添加性别属性，默认值：男</button> <br/>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    const vm = new Vue({
        el:'#root',
        data:{
            student:{
                name:'tom',
                age:18,
                hobby:['抽烟','喝酒','烫头'],
                friends:[
                    {name:'jerry',age:35},
                    {name:'tony',age:36}
                ]
            }
        },
        methods: {
            addSex(){
                // Vue.set(this.student,'sex','男')
                this.$set(this.student,'sex','男')
            }
        }
    })
</script>
```

Vue.set() 或 vm.$set 有缺陷：

![在这里插入图片描述](https://img-blog.csdnimg.cn/954f0312289748c189bac545b4463c63.png)


> 就是 vm 和 _data 



看完了 vue 监测对象中的数据，再来看看 vue 如何监测 数组里的数据

> 先写个代码案例

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>爱好</h2>
    <ul>
        <li v-for="(h,index) in student.hobby" :key="index">
            {{h}}
        </li>
    </ul>
    <h2>朋友们</h2>
    <ul>
        <li v-for="(f,index) in student.friends" :key="index">
            {{f.name}}--{{f.age}}
        </li>
    </ul>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    const vm = new Vue({
        el:'#root',
        data:
            student:{
                name:'tom',
                age:{
                    rAge:40,
                    sAge:29,
                },
                hobby:['抽烟','喝酒','烫头'],
                friends:[
                    {name:'jerry',age:35},
                    {name:'tony',age:36}
                ]
            }
        },
        methods: {
            
        }
    })
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/b2f270e6fed4408fb6709e960aea7953.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


> 所以我们通过 vm._data.student.hobby[0] = 'aaa' // 不奏效
>
> vue 监测在数组那没有 getter 和 setter，所以监测不到数据的更改，也不会引起页面的更新

![在这里插入图片描述](https://img-blog.csdnimg.cn/0e4c3d70f3e3492baaa2f391b0c26ec0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)

既然 vue 在对数组无法通过 getter 和 setter 进行数据监视，那 vue 到底如何监视数组数据的变化呢？

vue对数组的监测是通过 包装数组上常用的用于修改数组的方法来实现的。

vue官网的解释：

![在这里插入图片描述](https://img-blog.csdnimg.cn/b003a83d94dd44e0ae93a87da8ab43d9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


 **总结：**

Vue监视数据的原理：

* vue会监视data中所有层次的数据

* 如何监测对象中的数据？

  通过setter实现监视，且要在new Vue时就传入要监测的数据。

  * 对象中后追加的属性，Vue默认不做响应式处理

  * 如需给后添加的属性做响应式，请使用如下API：

    Vue.set(target，propertyName/index，value) 或 

    vm.$set(target，propertyName/index，value)

* 如何监测数组中的数据？

  通过包裹数组更新元素的方法实现，本质就是做了两件事：

  * 调用原生对应的方法对数组进行更新
  * 重新解析模板，进而更新页面

* 在Vue修改数组中的某个元素一定要用如下方法：

  * 使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
  * Vue.set() 或 vm.$set()



> 特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！



## 1.15收集表单数据



```html
    <div id="app">
      <form @submit.prevent="upForm">
        账号：<input type="text" v-model.trim="userInfo.account" /> <br /><br />
        密码：<input type="password" v-model.trim="userInfo.password" />
        <br /><br />
        年龄 <input type="number" v-model.number="age" /><br /><br />
        性别: 男
        <input type="radio" name="sex" value="male" v-model="userInfo.sex" />
        女
        <input type="radio" name="sex" value="female" v-model="userInfo.sex" />
        <br /><br />
        爱好: 学习
        <input type="checkbox" value="study" v-model="userInfo.hobby" />
        打游戏<input type="checkbox" value="game" v-model="userInfo.hobby" />
        吃饭<input type="checkbox" value="eat" v-model="userInfo.hobby" />
        <br /><br />
        所属校区
        <select v-model="userInfo.city">
          <option value="">请选择</option>
          <option value="chengdu">成都</option>
          <option value="beijing">北京</option>
          <option value="shanghai">上海</option>
        </select>
        <br /><br />
        其他信息
        <textarea v-model.lazy="userInfo.other"></textarea><br /><br />
        <input type="checkbox" v-model="userInfo.agree" />
        阅读并接受
        <a href="#">《用户协议》</a><br /><br />
        <button>提交</button>
      </form>
    </div>
  <script>
    new Vue({
      el: "#app",
      data: {
        userInfo: {
          account: "",
          password: "",
          age: "",
          sex: "",
          hobby: [],
          city: "",
          other: "",
          agree: "",
        },
      },
      methods: {
        upForm() {
          console.log(this.userInfo);
        },
      },
    });
  </script>
```


> 备注：v-model的三个修饰符：
>
> lazy：失去焦点再收集数据
>
> number：输入字符串转为有效的数字
>
> trim：输入首尾空格过滤

## 1.16内置指令

常见内置指令：

`v-bind`:单向绑定解析表达式，可简写为 `:xxx`

`v-model`:双向数据绑定

`v-for`:遍历数组/对象/字符串

`v-on:`绑定事件监听，可简写为@

`v-if`:条件渲染(动态控制节点是否**存在**)

`v-else`:条件渲染(动态控制节点是否**存在**)

`v-show`:条件渲染(动态控制节点是否**展示**)



## 1.17 自定义指令

需求1：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大10倍。

需求2：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。

**语法：**

局部指令：

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

全局指令：

```html
<script>
    // 注册一个全局自定义指令 `v-focus`
    Vue.directive('focus', {
        // 当被绑定的元素插入到 DOM 中时……
        inserted: function (el) {
            // 聚焦元素
            el.focus()
        }
    })
</script>
```

配置对象中常用的3个回调：

* bind：指令与元素成功绑定时调用。
* inserted：指令所在元素被插入页面时调用。
* update：指令所在模板结构被重新解析时调用。

> 理解这三个的调用时机，需要进一步了解 vue 的生命周期，下面会介绍。



定义全局指令

```html
<!-- 准备好一个容器-->
<div id="root">
    <input type="text" v-fbind:value="n">
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    //定义全局指令
    Vue.directive('fbind', {
        // 指令与元素成功绑定时（一上来）
        bind(element, binding){
            element.value = binding.value
        },
        // 指令所在元素被插入页面时
        inserted(element, binding){
            element.focus()
        },
        // 指令所在的模板被重新解析时
        update(element, binding){
            element.value = binding.value
        }
    })
    
    new Vue({
        el:'#root',
        data:{
            name: '尚硅谷',
            n: 1
        }
    })

</script>
```



局部指令：

```js
new Vue({
    el: '#root',
    data: {
        name:'尚硅谷',
        n:1
    },
    directives: {
        // big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
        /* 'big-number'(element,binding){
					// console.log('big')
					element.innerText = binding.value * 10
				}, */
        big (element,binding){
            console.log('big',this) //注意此处的this是window
            // console.log('big')
            element.innerText = binding.value * 10
        },
        fbind: {
            //指令与元素成功绑定时（一上来）
            bind (element,binding){
                element.value = binding.value
            },
            //指令所在元素被插入页面时
            inserted (element,binding){
                element.focus()
            },
            //指令所在的模板被重新解析时
            update (element,binding){
                element.value = binding.value
            }
        }
    }
})
```



## 1.18生命周期

**生命周期**
	1.又名生命周期回调函数、生命周期函数、生命周期钩子
	2.是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数
	3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的
	4.生命周期函数中的 this 指向是vm或组件实例对象

![生命周期.png](https://cdn.nlark.com/yuque/0/2022/png/1379492/1643297176928-5d5ac765-237c-462d-9188-84935e6c3c69.png?x-oss-process=image%2Fresize%2Cw_937%2Climit_0)

**总结**
**常用的生命周期钩子**
	1.`mounted`发送ajax请求、启动定时器、绑定自定义事件、订阅消息等初始化操作 
	2.`beforeDestroy`清除定时器、解绑自定义事件、取消订阅消息等收尾工作 
**关于销毁Vue实例**
	1.销毁后借助Vue开发者工具看不到任何信息
	2.销毁后自定义事件会失效，但原生DOM事件依然有效
	3.一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了

# 2.组件化编程

## 2.1非单文件组件

### 基本使用

**Vue中使用组件的三大步骤** 
**1.定义组件**
使用Vue.extend(options)创建，其中options和new Vue(options)时传入的options几乎一样，但也有点区别
	el不要写，因为最终所有的组件都要经过一个vm的管理，由vm中的el才决定服务哪个容器
	data必须写成函数，避免组件被复用时，数据存在引用关系
**2.注册组件**
局部注册：new Vue()的时候options传入components选项
全局注册：Vue.component('组件名',组件)
**3.使用组件**
编写组件标签	如 <school></school> 

```html
<title>基本使用</title>
<script type="text/javascript" src="../js/vue.js"></script>

<div id="root">
  <h2>{{msg}}</h2><hr>
  <!-- 第三步：编写组件标签 -->
  <school></school><hr>
  <student></student><hr>
  <hello></hello><hr>
</div>

<div id="root2">
  <hello></hello>
</div>

<script type="text/javascript">
  Vue.config.productionTip = false
  //第一步：创建school组件
  const school = Vue.extend({
    // el:'#root', //组件定义时，一定不要写el配置项，
    // 因为最终所有的组件都要被一个vm管理，由vm决定服务于哪个容器
    template: `
			<div class="demo">
				<h3>学校名称：{{schoolName}}</h3>
				<h3>学校地址：{{address}}</h3>
				<button @click="showName">点我提示学校名</button>	
  			</div>
			`,
    data() {
      return {
        schoolName: '成都锦城学院',
        address: '成都'
      }
    },
    methods: {
      showName() {
        alert(this.schoolName)
      }
    },
  })
  //第一步：创建student组件
  const student = Vue.extend({
    template: `
			<div>
				<h3>学生姓名：{{studentName}}</h3>
				<h3>学生年龄：{{age}}</h3>
  			</div>
			`,
    data() {
      return {
        studentName: '张三',
        age: 18
      }
    }
  })
  //第一步：创建hello组件
  const hello = Vue.extend({
    template: `
				<div>	
					<h3>你好啊！{{name}}</h3>
  			</div>
			`,
    data() {
      return {
        name: 'cess'
      }
    }
  })
  //第二步：全局注册组件
  Vue.component('hello', hello)
  //创建vm
  new Vue({
    el: '#root',
    data: {
      msg: '你好啊！'
    },
    //第二步：注册组件（局部注册）
    components: {
      school,
      student
    }
  })
</script>
```

#### 组件的嵌套

```html
<titel>组件的嵌套</title>
    <script type="text/javascript" src="../js/vue.js"></script>

    <div id="root"></div>

    <script type="text/javascript">
        Vue.config.productionTip = false

        //定义student组件
        const student = Vue.extend({
            name: 'student',
            template: `
                <div>
                    <h4>学生姓名：{{name}}</h4>	
                    <h4>学生年龄：{{age}}</h4>	
            	</div>
            `,
            data() { return { name: '尚硅谷', age: 18 } }
        })

        //定义school组件
        const school = Vue.extend({
            name: 'school',
            template: `
                <div>
                    <h3>学校名称：{{name}}</h3>	
                    <h3>学校地址：{{address}}</h3>	
                    <student></student>
              	</div>
            `,
            data() { return { name: '成都锦城学院', address: '成都' } },
            //注册组件（局部）
            components: { student }
        })

        //定义hello组件
        const hello = Vue.extend({
            template: `<h3>{{msg}}</h3>`,
            data() { return { msg: '欢迎来到成都锦城学院！' } }
        })

        //定义app组件
        const app = Vue.extend({
            template: `
                <div>	
                    <hello></hello>
                    <school></school>
            	</div>
            `,
            components: { school, hello }
        })

        //创建vm
        new Vue({
            el: '#root',
            template: '<app></app>',
            //注册组件（局部）
            components: { app }
        })
    </script>
```

## 2.2 VueComponent

### **关于 VueComponent**

1. `school` 组件本质是一个名为`VueComponent`的构造函数，且不是程序员定义的，而是 `Vue.extend()` 生成的 
2. 我们只需要写 `<school/>` 或 `<school></school>`，Vue 解析时会帮我们创建 `school` 组件的实例对象，即Vue帮我们执行的`new VueComponent(options)` 
3. 每次调用`Vue.extend`，返回的都是一个全新的`VueComponent`，即不同组件是不同的对象
4. 关于 `this` 指向 
   1. 组件配置中`data`函数、`methods`中的函数、`watch`中的函数、`computed`中的函数 它们的 `this` 均是 `VueComponent`实例对象
   2. `new Vue(options)`配置中：`data`函数、`methods`中的函数、watch中的函数、`computed`中的函数 它们的 `this` 均是 `Vue`实例对象
5. `VueComponent`的实例对象，以后简称vc（组件实例对象）Vue的实例对象，以后简称vm  

```html
<title>VueComponent</title>
<script type="text/javascript" src="../js/vue.js"></script>

<div id="root">
  <school></school>
  <hello></hello>
</div>

<script type="text/javascript">
  Vue.config.productionTip = false;

  // 定义school组件
  const school = Vue.extend({
    name: "school",
    template: `
                <div>
                    <h2>学校名称：{{name}}</h2>	
                    <h2>学校地址：{{address}}</h2>	
                    <button @click="showName">点我提示学校名</button>
            	</div>
            `,
    data() {
      return { name: "成都锦城学院", address: "成都" };
    },
    methods: {
      showName() {
        console.log("showName", this);
      },
    },
  });

  const test = Vue.extend({
    template: `<span>atguigu</span>`,
  });

  // 定义hello组件
  const hello = Vue.extend({
    template: `
                <div>
                    <h2>{{msg}}</h2>
                    <test></test>	
            </div>
            `,
    data() {
      return { msg: "你好啊！" };
    },
    components: { test },
  });

  // console.log('@',school)
  // console.log('#',hello)

  // 创建vm
  const vm = new Vue({
    el: "#root",
    components: { school, hello },
  });
</script>

```

### 内置关系

![image.png](https://lark-assets-prod-aliyun.oss-cn-hangzhou.aliyuncs.com/yuque/0/2022/png/1379492/1643034116880-0c7ffd4b-f0ed-47b2-9638-3bb71344c4f1.png?x-oss-process=image%2Fresize%2Cw_937%2Climit_0&date=1679295710270)

**一个重要的内置关系：**`VueComponent.prototype.__proto__ === Vue.prototype`
**为什么要有这个关系：**让组件实例对象vc可以访问到 Vue原型上的属性、方法。



## 2.3单文件组件

**文件说明：**

​	我们定义了`school.vue`和`student.vue`两个不同的单文件组件，然后将`App.vue`作为根组件，`import`导入了两个组件并且进行了`components`注册，利用`main.js`来创建了一个`Vue`实例对象，注册了`App.vue`组件，并声明了挂载的对象，最后在`index.html`中创建了DOM元素

**School.vue**

```vue
<template>
  <div id="Demo">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="showName">点我提示学校名</button>
  </div>
</template>

<script>
  export default {
    name: "School",
    data() {
      return {
        name: "UESTC",
        address: "成都",
      };
    },
    methods: {
      showName() {
        alert(this.name);
      },
    },
  };
</script>

<style>
  #Demo {
    background: orange;
  }
</style>

```

**Student.vue**

```vue
<template>
  <div>
    <h2>学生姓名：{{name}}</h2>
    <h2>学生年龄：{{age}}</h2>
  </div>
</template>

<script>
  export default {
    name: "Student",
    data() {
      return {
        name: "cess",
        age: 20,
      };
    },
  };
</script>

```

**App.vue**

```vue
<template>
  <div>
    <School></School>
    <Student></Student>
  </div>
</template>

<script>
  import School from "./School.vue";
  import Student from "./Student.vue";

  export default {
    name: "App",
    components: {
      School,
      Student,
    },
  };
</script>

```

**main.js**

```javascript
import App from './App.vue'

new Vue({
    template:`<App></App>`,
    el:'#root',
    components:{App}
})
```

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>单文件组件练习</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="../../js/vue.js"></script>
    <script src="./main.js"></script>
  </body>
</html>

```



# 3. ref 、props、 mixin、 plugin、 scoped

## 3.1 ref属性

`ref`被用来给元素或子组件注册引用信息（id的替代者）

- 应用在html标签上获取的是真实DOM元素，应用在组件标签上获取的是组件实例对象vc

- 使用方式 

  - 打标识：`<h1 ref="xxx"></h1>`或`<School ref="xxx"></School>`

  - 获取：`this.$refs.xxx`

**注：**我们获取元素的属性，其实是因为这个`this`指向的是当前`vue`或者`vc`的实例对象，实例对象下的`$refs`属性是存放了对应元素的内容，所以我们可以通过获取对象的方法，取到想要的内容。

```vue
<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <button ref="btn" @click="showDOM">点我输出上方的DOM元素</button>
    <School ref="sch" />
  </div>
</template>

<script>
  import School from "./components/School";

  export default {
    name: "App",
    components: { School },
    data() {
      return {
        msg: "欢迎学习Vue！",
      };
    },
    methods: {
      showDOM() {
        console.log(this.$refs.title); // 真实DOM元素
        console.log(this.$refs.btn); // 真实DOM元素
        console.log(this.$refs.sch); // School组件的实例对象（vc）
      },
    },
  };
</script>

```

感想：以前死记硬背的东西，在了解原理过后瞬间豁然开朗

## 3.2 props配置项

`props`让组件接收外部传过来的数据 

- 传递数据

  - `<Demo name="xxx" :age="18"/>`这里age前加`:`,通过v-bind使得里面的18是`Number`

- 接收数据

  -  第一种方式（只接收）`props:['name', 'age']` 

  -  第二种方式（限制类型）`props:{name:String, age:Number}`

  -  第三种方式（限制类型、限制必要性、指定默认值） 

    ```javascript
    props:{
      name:{     
        type: String, // 类型
        required: true,// 必要性     
        default: 'cess'// 默认值   
      }
    }
    ```

​	**备注：**`props`是只读的，`Vue`底层会监测你对`props`的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么需要复制`props`的内容到`data`中，然后去修改`data`中的数据。也就是说需要在`data`中定义一个新的变量来接收`props`中的数据来作为中转。

​	**使用方式举例：**我们定义了一个`student`组件，组件中包含了需要展示的内容，但是并没有将所有展示内容写死，而是通过`props`来定义内容的变量，通过`props`传递给使用组件的父组件,也就是这里的`App.vue`，告诉父组件他在使用组件时需要配置哪些数据。

**App.vue**

```vue
<template>
  <div>
    <Student name="李四" sex="女" :age="18" />
    <Student name="王五" sex="男" :age="18" />
  </div>
</template>

<script>
  import Student from "./components/Student";

  export default {
    name: "App",
    components: { Student },
  };
</script>

```

**Student.vue**

```vue
<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <h2>学生年龄：{{ myAge + 1 }}</h2>
    <button @click="updateAge">尝试修改收到的年龄</button>
  </div>
</template>

<script>
  export default {
    name: "Student",
    data() {
      console.log(this);
      return {
        msg: "我是一个成都锦城学院的学生",
        myAge: this.age,
      };
    },
    methods: {
      updateAge() {
        this.myAge++;
      },
    },
    // 简单声明接收
    // props:['name','age','sex']

    // 接收的同时对数据进行类型限制
    //   props: {
    //     name: String,
    //     age: Number,
    //     sex: String,
    //   }

    // 接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
    props: {
      name: {
        type: String, //name的类型是字符串
        required: true, //name是必要的
      },
      age: {
        type: Number,
        default: 99, //默认值
      },
      sex: {
        type: String,
        required: true,
      },
    },
  };
</script>

```

## 3.3 mixin混入

**功能：**可以把多个组件共用的配置提取成一个混入对象 
**使用方式：**

- 定义混入

  ```JavaScript
  const mixin = {
      data() {....},
      methods: {....}
      ....
  }
  ```

- 使用混入
  - 全局混入 `Vue.mixin(xxx)`
  - 局部混入 `mixins:['xxx']`

**特点：**

- 组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”，在发生冲突时以组件优先，例如：

  ```JavaScript
  var mixin = {
      data: function () {
          return {
              message: 'hello',
              foo: 'abc'
          }
      }
  }
  
  new Vue({
      mixins: [mixin],
      data () {
          return {
              message: 'goodbye',
                  bar: 'def'
          }
      },
      created () {
          console.log(this.$data)
          // => { message: "goodbye", foo: "abc", bar: "def" }
      }
  })
  
  //在mixin中定义了数据message的内容，而使用mixins的组件数据中也有message，当组件混入后，会以厡数据优先，mixin的数据不会更改原数据
  ```

- 同名生命周期钩子将合并为一个数组，因此**都将被调用**。另外，混入对象的钩子将在组件自身钩子之前调用

  ```javascript
  var mixin = {
      created () {
          console.log('混入对象的钩子被调用')
      }
  }
  
  new Vue({
      mixins: [mixin],
      created () {
          console.log('组件钩子被调用')
      }
  })
  
  // => "混入对象的钩子被调用"
  // => "组件钩子被调用"
  ```

**使用方式例子：**

- 局部混入：	

  ​	对于两个组件`School.vue` 和 `Student.vue`都共有的方法或数据，我们定义了一个新的js文件，名为`mixin`,在`minxin.js`里我们`export`暴露出两个不同的对象`mix1`和`mix2`,然后在分别在两个组件中`import`导入我们的`mixin.js`，然后对组件设置`mixins`属性，`mixins`作为数组存放各种`mixin`，这样组件就有了`mixin`混入的属性和方法

- 全局混入：

  ​	全局混入时，我们可以在`main.js`中，也就是我们vue实例化的根文件中，引入我们的`mixin.js`文件利用`Vue.mixin(xxx)`来进行全局混入，这样整个`vue`实例下的所有组件都会有`mixin`的属性



**mixin.js**

```javascript
export const mix1 = {
  methods: {
    showName() {
      alert(this.name);
    },
  },
  mounted() {
    console.log("你好啊！");
  },
};

export const mix2 = {
  data() {
    return {
      x: 100,
      y: 200,
    };
  },
};
```

**School.vue**

```vue
<template>
  <div>
    <h2 @click="showName">学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
  //引入一个mixin
  import { mix1, mix2 } from "../mixin";

  export default {
    name: "School",
    data() {
      return {
        name: "成都锦城学院",
        address: "成都",
        x: 666,
      };
    },
    mixins: [mix1, mix2], // 局部混入
  };
</script>

```

**Student.vue**

```vue
<template>
  <div>
    <h2 @click="showName">学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
  </div>
</template>

<script>
  import { mix1, mix2 } from "../mixin";

  export default {
    name: "Student",
    data() {
      return {
        name: "张三",
        sex: "男",
      };
    },
    mixins: [mix1, mix2], // 局部混入
  };
</script>

```

**App.vue**

```vue
<template>
  <div>
    <School />
    <hr />
    <Student />
  </div>
</template>

<script>
  import School from "./components/School";
  import Student from "./components/Student";

  export default {
    name: "App",
    components: { School, Student },
  };
</script>

```

**main.js**

```javascript
import Vue from 'vue'
import App from './App.vue'
// import {mixin} from './mixin'

Vue.config.productionTip = false
// Vue.mixin(mix1)		// 全局混合引入
// Vue.mixin(mix2)	// 全局混合

new Vue({
    el:"#app",
    render: h => h(App)
})
```



## 3.4 plugin插件

- **功能：**用于增强Vue
- **本质：**包含`install`方法的一个对象，`install`的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据
- **定义插件**（见 plugin.js）
- **使用插件：**`Vue.use()`



**代码说明：**

​	在`plugin.js`中我们`export`暴露出一个对象,其中有一个`install()`方法，当我们使用`Vue.use()`时，vue会调用这个`install()`，在这个方法里，我们可以定义一些全局的方法和工具，例如全局的过滤器、全局的指令、全局的`mixin`、或者给vue的原型上添加一些属性和方法，让vue实例可以使用。这样我们就写好了一个插件，对于使用，就需要在`main.js`中通过`Vue.use()`使用插件，之后在编写组件时就可以使用`plugin.js`中定义的工具（插件）了

**plugin.js**

```JavaScript
export default {
  install(Vue, x, y, z) {
    console.log(x, y, z);//1,2,3
    //全局过滤器
    Vue.filter("mySlice", function (value) {
      return value.slice(0, 4);
    });

    //定义全局指令
    Vue.directive("fbind", {
      //指令与元素成功绑定时（一上来）
      bind(element, binding) {
        element.value = binding.value;
      },
      //指令所在元素被插入页面时
      inserted(element, binding) {
        element.focus();
      },
      //指令所在的模板被重新解析时
      update(element, binding) {
        element.value = binding.value;
      },
    });

    //定义混入
    Vue.mixin({
      data() {
        return { x: 100, y: 200 };
      },
    });

    //给Vue原型上添加一个方法（vm和vc就都能用了）
    Vue.prototype.hello = () => {
      alert("你好啊");
    };
  },
};

```

**main.js**

```javascript
import Vue from "vue";
import App from "./App.vue";
import plugins from "./plugins"; // 引入插件

Vue.config.productionTip = false;

Vue.use(plugins, 1, 2, 3); // 应用（使用）插件

new Vue({
  el: "#app",
  render: (h) => h(App),
});

```



## 3.5 scoped样式

**作用：**样式局部生效，挺简单没什么好说的，写`style`的时候后面加一个`scoped`就行了
**写法：**`<style scoped>`



# 4 Todo-List案例

**组件化编码流程**

1. 拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突
2. 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用
   - 一个组件在用：放在组件自身即可
   - **一些组件在用：放在他们共同的父组件上**（*状态提升*）
3. 实现交互：从绑定事件开始

**props适用于**

- 父组件 ==> 子组件 通信
- 子组件 ==> 父组件 通信（要求父组件先给子组件一个函数）



# 5 Vue 本地存储 自定义事件

## 本地存储

存储内容大小一般支持 5MB 左右（不同浏览器可能不一样） 
浏览器端通过`Window.sessionStorage`和`Window.localStorage`属性来实现本地存储机制 
**相关API**

- `xxxStorage.setItem('key', 'value')`该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值
- `xxxStorage.getItem('key')`该方法接受一个键名作为参数，返回键名对应的值
- `xxxStorage.removeItem('key')`该方法接受一个键名作为参数，并把该键名从存储中删除
- `xxxStorage.clear()`该方法会清空存储中的所有数据

**备注**

- `SessionStorage`存储的内容会随着浏览器窗口关闭而消失
- `LocalStorage`存储的内容，需要手动清除才会消失
- `xxxStorage.getItem(xxx)`如果 `xxx` 对应的 `value` 获取不到，那么`getItem()`的返回值是`null`
- `JSON.parse(null)`的结果依然是`null`

**localStorage**

```html
<h2>localStorage</h2>
<button onclick="saveDate()">点我保存数据</button><br />
<button onclick="readDate()">点我读数据</button><br />
<button onclick="deleteDate()">点我删除数据</button><br />
<button onclick="deleteAllDate()">点我清空数据</button><br />

<script>
  let person = { name: "JOJO", age: 20 };

  function saveDate() {
    localStorage.setItem("msg", "localStorage");
    localStorage.setItem("person", JSON.stringify(person));
  }
  function readDate() {
    console.log(localStorage.getItem("msg"));
    const person = localStorage.getItem("person");
    console.log(JSON.parse(person));
  }
  function deleteDate() {
    localStorage.removeItem("msg");
    localStorage.removeItem("person");
  }
  function deleteAllDate() {
    localStorage.clear();
  }
</script>

```



**sessionStorage**

```html
<h2>sessionStorage</h2>
<button onclick="saveDate()">点我保存数据</button><br />
<button onclick="readDate()">点我读数据</button><br />
<button onclick="deleteDate()">点我删除数据</button><br />
<button onclick="deleteAllDate()">点我清空数据</button><br />

<script>
  let person = { name: "JOJO", age: 20 };

  function saveDate() {
    sessionStorage.setItem("msg", "sessionStorage");
    sessionStorage.setItem("person", JSON.stringify(person));
  }
  function readDate() {
    console.log(sessionStorage.getItem("msg"));
    const person = sessionStorage.getItem("person");
    console.log(JSON.parse(person));
  }
  function deleteDate() {
    sessionStorage.removeItem("msg");
    sessionStorage.removeItem("person");
  }
  function deleteAllDate() {
    sessionStorage.clear();
  }
</script>

```



## 自定义事件

- 一种组件间通信的方式，适用于：**子组件 ===> 父组件**
- 使用场景：**子组件**想给**父组件**传数据，那么就要在**父组件中给子组件绑定自定义事件**（事件的回调在父组件中）
- 绑定自定义事件
  - 第一种方式，在父组件中`<Demo @事件名="方法"/>`或`<Demo v-on:事件名="方法"/>`
  - 第二种方式，在父组件中`this.$refs.demo.$on('事件名',方法)`

```vue
<Demo ref="demo"/>
  ......
  mounted(){	
     this.$refs.demo.$on('atguigu',this.test)
  }
```

-  若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法 
-  触发自定义事件`this.$emit('事件名',数据)` 
-  解绑自定义事件`this.$off('事件名')` 
- 组件上也可以绑定原生DOM事件，需要使用native修饰符  `@click.native="show"`上面绑定自定义事件，即使绑定的是原生事件也会被认为是自定义的，需要加native，加了后就将此事件给组件的根元素
- 注意：通过`this.$refs.xxx.$on('事件名',回调函数)`绑定自定义事件时，回调函数要么配置在methods中，要么用箭头函数，否则 `this` 指向会出问题



# 6 全局事件总线

**一种可以在任意组件间通信的方式**，在vue2中可以使用，vue3中没有了。本质上就是一个对象，它必须满足以下条件

1. 所有的组件对象都必须能看见他 
2. 这个对象必须能够使用$on$emit$off方法去绑定、触发和解绑事件

**使用步骤：**

1.定义全局事件总线

```JavaScript
new Vue({
    ...
    beforeCreate() {
        Vue.prototype.$bus = this // 安装全局事件总线，$bus 就是当前应用的 vm
    },
    ...
})
```

2.使用事件总线

- 接收数据：A组件想接收数据，则在A组件中给`$bus`绑定自定义事件，事件的回调留在A组件自身

```JavaScript
export default {
    methods(){
        demo(data){...}
    }
    ...
    mounted() {
        this.$bus.$on('xxx',this.demo)
    }
}
```

- 提供数据：`this.$bus.$emit('xxx',data)` 

3.最好在`beforeDestroy`钩子中，用`$off()`去解绑当前组件所用到的事件



**使用说明：**

​	我们再`main.js`文件中，在`beforeCreate`生命周期中将`vue`的实例对象赋值给`vue`的原型对象上所声明的`$bus`，这样vm和vc都可以访问这个共有的原型对象，也就是安装了全局事件总线。在`App.vue`文件中使用了两个子组件`school`和`student`，我们让`school`组件接收来自`student`组件传来的数据，因此，我们在school组件中配置在`mounted`生命周期中绑定了接收的自定义事件`this.$bus.$on("hello")`,并在生命周期 `beforeDestroy()`时通过`this.$bus.$off("hello");`销毁了事件监听。而在student组件中，我们将发送数据的事件作为点击事件触发，通过用户点击触发 `this.$bus.$emit('hello', this.name)`，将发送的对象名称和内容传给了`school`组件。

**main.js**

```javascript
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  el:'#app',
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this // 安装全局事件总线
  }
})
```

**App.vue**

```vue
<template>
    <div class="app">
        <School/>
        <Student/>
    </div>
</template>

<script>
    import Student from './components/Student'
    import School from './components/School'

    export default {
        name:'App',
        components:{ School, Student }
    }
</script>

<style scoped>.app{background-color: gray;padding: 5px;}</style>
```

**School.vue**

```vue
<template>
  <div class="school">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
  export default {
    name: "School",
    data() {
      return {
        name: "成都锦城学院",
        address: "成都",
      };
    },
    mounted() {  //🔴
      // console.log('School',this)
      this.$bus.$on("hello", (data) => {
        console.log("我是School组件，收到了数据", data);
      });
    },
    beforeDestroy() {  //🔴
      this.$bus.$off("hello");
    },
  };
</script>

<style scoped>.school {background-color: skyblue;padding: 5px;}</style>
```

**Student.vue**

```vue
<template>
  <div class="student">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <button @click="sendStudentName">把学生名给School组件</button> //🔴
  </div>
</template>

<script>
  export default {
    name:'Student',
    data() {
      return {
        name:'张三',
        sex:'男'
      }
    },
    methods: {  //🔴
      sendStudentName(){
        this.$bus.$emit('hello', this.name)
      }
    }
  }
</script>

<style scoped>.student{background-color: pink;padding: 5px;margin-top: 30px;}</style>
```



## 消息订阅与发布

消息订阅与发布（pubsub）消息订阅与发布是一种组件间通信的方式，适用于任意组件间通信 
**使用步骤**

- 安装pubsub：`npm i pubsub-js` 
- 引入：`import pubsub from 'pubsub-js'` 
- 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身  

```JavaScript
export default {
    methods: {
        demo(msgName, data) {...}
    }
    ...
    mounted() {
            this.pid = pubsub.subscribe('xxx',this.demo)
    }
}
```

- 提供数据：`pubsub.publish('xxx',data)` 
- 5最好在`beforeDestroy`钩子中，使用`pubsub.unsubscribe(pid)`取消订阅



**School.vue**

```vue
<template>
    <div class="school">
        <h2>学校名称：{{name}}</h2>
        <h2>学校地址：{{address}}</h2>
    </div>
</template>

<script>
    import pubsub from 'pubsub-js'

    export default {
        name: 'School',
        data() {
            return {
                name:'成都锦城学院',
                address:'成都',
            }
        },
        methods: {
            demo(msgName, data) {
                console.log('我是School组件，收到了数据：',msgName, data)
            }
        },
        mounted() {
            this.pubId = pubsub.subscribe('demo', this.demo) // 订阅消息
        },
        beforeDestroy() {
            pubsub.unsubscribe(this.pubId) // 取消订阅
        }
    }
</script>

<style scoped>
    .school{
        background-color: skyblue;
        padding: 5px;
    }
</style>
```

**student.vue**

```vue
<template>
  <div class="student">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <button @click="sendStudentName">把学生名给School组件</button>
  </div>
</template>

<script>
  import pubsub from 'pubsub-js'

  export default {
    name:'Student',
    data() {
      return {
        name:'JOJO',
        sex:'男',
      }
    },
    methods: {
      sendStudentName(){
        pubsub.publish('demo', this.name) // 发布消息
      }
    }
  }
</script>

<style scoped>
  .student{
    background-color: pink;
    padding: 5px;
    margin-top: 30px;
  }
</style>
```

# $nextTick 过渡与动画

## $nextTick

**这是一个生命周期钩子**
`this.$nextTick(回调函数)`在下一次DOM更新结束后执行其指定的回调
什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在`nextTick`所指定的回调函数中执行

例如：当我们对dom节点进行了修改，但是我们需要对修改后新的dom节点进行一些操作例如对新的dom节点的input框获取焦点，如果直接使用`this.$refs.inputTitle.focus();`获取焦点，dom还没有更新，最后渲染后不会获取焦点，我们需要在dom更新以后再执行`this.$refs.inputTitle.focus();`获取焦点，就可以使用`this.$nextTick`在回调中指定更新dom元素以后我们的操作。（也可以用定时器将所需要执行的语句放入执行栈中来延迟执行，类似于同步异步问题）

```JavaScript
this.$nextTick(function () {
  	this.$refs.inputTitle.focus();
});
```

## 过渡与动画

`Vue`封装的过度与动画：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名

![image.png](https://lark-assets-prod-aliyun.oss-cn-hangzhou.aliyuncs.com/yuque/0/2022/png/1379492/1643034414605-e2a3f595-ac72-4c74-9f11-12e7578592c9.png?date=1680251346425)

写法

1. 准备好样式
   - 元素进入的样式
     - v-enter		 	进入的起点
     - v-enter-active	进入过程中
     - v-enter-to	 	进入的终点
   - ○ 元素离开的样式
     - v-leave			离开的起点
     - v-leave-active	离开过程中
     - v-leave-to		离开的终点
2. 使用`<transition>`包裹要过度的元素，并配置`name`属性，此时需要将上面样式名的`v`换为`name`
3. 要让页面一开始就显示动画，需要添加`appear`

```vue
<transition name="hello" appear>
  <h1 v-show="isShow">你好啊！</h1>
</transition>

<style>
  .hello-enter-active{
    animation: hello 0.5s linear;
  }

  .hello-leave-active{
    animation: hello 0.5s linear reverse;
  }

  @keyframes hello {
    from{
      transform: translateX(-100%);
    }
    to{
      transform: translateX(0px);
    }
  }
</style>
```

备注：若有多个元素需要过度，则需要使用`<transition-group>`，且每个元素都要指定`key`值

```vue
<transition-group name="hello" appear>
  <h1 v-show="!isShow" key="1">你好啊！</h1>
  <h1 v-show="isShow" key="2">尚硅谷！</h1>
</transition-group>
```



# Vue中的配置代理和slot插件

### Vue脚手架配置代理

`vue.config.js` 是一个可选的配置文件，如果项目的 (和 `package.json` 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。也可以使用 package.json 中的 vue 字段，但是注意这种写法需要你严格遵照 JSON 的格式来写

**方法一**

在`vue.config.js`中添加如下配置

```JavaScript
module.exports = {
  devServer:{
    proxy:"http://localhost:5000"
  }
}
```

说明

1. 优点：配置简单，请求资源时直接发给前端（8080）即可
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，才会将请求会转发给服务器 （优先匹配前端资源）

**方法二**

编写`vue.config.js`配置具体代理规则

```JavaScript
module.exports = {
    devServer: {
      proxy: {
      '/api1': {		// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',	// 代理目标的基础路径
        pathRewrite: {'^/api1':''},		// 代理往后端服务器的请求去掉 /api1 前缀
        ws: true,				// WebSocket
        changeOrigin: true,
        
      },
      '/api2': {
        target: 'http://localhost:5001',
        pathRewrite: {'^/api2': ''},
        changeOrigin: true
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```



## slot插槽

 `<slot>`插槽：让父组件可以向子组件指定位置插入`html`结构，也是一种组件间通信的方式，
      适用于 **父组件** ===> **子组件**

1. 分类：默认插槽、具名插槽、作用域插槽 

2. 使用方式

   - 默认插槽

   ```vue
   父组件中：
           <Category>
              <div>html结构1</div>
           </Category>
   子组件中：Category
           <template>
               <div>
                  <!-- 定义插槽 -->
                  <slot>插槽默认内容...</slot>
               </div>
           </template>
   ```

   

   - 具名插槽
     父组件指明放入子组件的哪个插槽`slot="footer"`，如果是`template`可以写成`v-slot:footer`

     ```vue
     父组件中：
             <Category>
                 <template slot="center">
                   <div>html结构1</div>
                 </template>
     
                 <template v-slot:footer>
                    <div>html结构2</div>
                 </template>
             </Category>
     子组件中：
             <template>
                 <div>
                    <!-- 定义插槽 -->
                    <slot name="center">插槽默认内容...</slot>
                    <slot name="footer">插槽默认内容...</slot>
                 </div>
             </template>
     ```

     

   - 作用域插槽
     `scope`用于父组件往子组件插槽放的`html`结构接收子组件的数据
     理解：**数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定**
     （`games`数据在`Category`组件中，但使用数据所遍历出来的结构由`App`组件决定）

     ```vue
     父组件中：
             <Category>
                 <template scope="scopeData">
                     <!-- 生成的是ul列表 -->
                     <ul>
                       <li v-for="g in scopeData.games" :key="g">{{g}}</li>
                     </ul>
                 </template>
             </Category>
     
             <Category>
                 <template slot-scope="scopeData">
                     <!-- 生成的是h4标题 -->
                     <h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
                 </template>
             </Category>
     子组件中：
             <template>
                 <div>
                     <slot :games="games"></slot>
                 </div>
             </template>
             
             <script>
                 export default {
                     name:'Category',
                     props:['title'],
                     //数据在子组件自身
                     data() {
                         return {
                             games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                         }
                     },
                 }
             </script>
     ```

   - 注意：关于样式，既可以写在父组件中，解析后放入子组件插槽；也可以放在子组件中，传给子组件再解析

### 默认插槽

**App.vue**

```vue
<template>
    <div class="container">
        <Category title="美食" >
            <img src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="">
        </Category>

        <Category title="游戏" >
            <ul>
                <li v-for="(g,index) in games" :key="index">{{g}}</li>
            </ul>
        </Category>

        <Category title="电影">
            <video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
        </Category>
    </div>
</template>

<script>
    import Category from './components/Category'
    export default {
        name:'App',
        components:{ Category },
        data() {
            return {
                foods:['火锅','烧烤','小龙虾','牛排'],
                games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
                films:['《教父》','《拆弹专家》','《你好，李焕英》','《尚硅谷》']
            }
        },
    }
</script>

<style scoped>.container{display: flex;justify-content: space-around;}</style>
```

**Category.vue**

```vue
<template>
    <div class="category">
        <h3>{{ title }}分类</h3>
        <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
        <slot>我是一些默认值，当使用者没有传递具体结构时，我会出现</slot>
    </div>
</template>

<script>
    export default {
        name:'Category',
        props:['title']
    }
</script>

<style scoped>
    .category {background-color: skyblue;width: 200px;height: 300px;}
    h3 {text-align: center;background-color: orange;}
    video {width: 100%;}
    img {width: 100%;}
</style>
```

![img](https://lark-assets-prod-aliyun.oss-cn-hangzhou.aliyuncs.com/yuque/0/2022/png/1379492/1643034535338-68fd72c0-7463-4f5a-a1f7-cdffb884c99e.png?x-oss-process=image%2Fresize%2Cw_937%2Climit_0&date=1680252818435)



### 具名插槽

**App.vue**

```vue
<template>
    <div class="container">
        <Category title="美食" >
            <img slot="conter" src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="">
            <a slot="footer" href="http://www.atguigu.com">更多美食</a>
        </Category>

        <Category title="游戏" >
            <ul slot="center">
                <li v-for="(g,index) in games" :key="index">{{g}}</li>
            </ul>
            <div class="foot" slot="footer">
                <a href="http://www.atguigu.com">单机游戏</a>
                <a href="http://www.atguigu.com">网络游戏</a>
            </div>
        </Category>

        <Category title="电影">
            <video slot="center" controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
            <template v-slot:footer>
                <div class="foot">
                    <a href="http://www.atguigu.com">经典</a>
                    <a href="http://www.atguigu.com">热门</a>
                    <a href="http://www.atguigu.com">推荐</a>
                </div>
                <h4>欢迎前来观影</h4>
            </template>
        </Category>
    </div>
</template>

<script>
    import Category from './components/Category'
    export default {
        name:'App',
        components:{Category},
        data() {
            return {
                foods:['火锅','烧烤','小龙虾','牛排'],
                games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
                films:['《教父》','《拆弹专家》','《你好，李焕英》','《尚硅谷》']
            }
        },
    }
</script>

<style scoped>
    .container,.foot{display: flex;justify-content: space-around;}
    h4{text-align: center;}
</style>
```

**Category.vue**

```vue
<template>
    <div class="category">
        <h3>{{title}}分类</h3>
        <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
        <slot name="center">我是一些默认值，当使用者没有传递具体结构时，我会出现1</slot>
        <slot name="footer">我是一些默认值，当使用者没有传递具体结构时，我会出现2</slot>
    </div>
</template>

<script>
    export default {
        name:'Category',
        props:['title']
    }
</script>

<style scoped>
    .category{background-color: skyblue;width: 200px;height: 300px;}
    h3{text-align: center;background-color: orange;}
    video{width: 100%;}
    img{width: 100%;}
</style>
```



# VueX

## Vuex 概念

​	专门在`Vue`中实现集中式状态（数据）管理的一个`Vue`插件，对`Vue`应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

![img](https://lark-assets-prod-aliyun.oss-cn-hangzhou.aliyuncs.com/yuque/0/2022/png/1379492/1643034632699-15503880-2c10-44e1-bf8f-c088d0896ba6.png?x-oss-process=image%2Fresize%2Cw_937%2Climit_0&date=1680425542013)

![img](https://lark-assets-prod-aliyun.oss-cn-hangzhou.aliyuncs.com/yuque/0/2022/png/1379492/1643034632949-1f50dc65-b44d-4b00-bed1-10222a2e87e5.png?x-oss-process=image%2Fresize%2Cw_937%2Climit_0&date=1680425542016)

**什么时候使用 Vuex**

- 多个组件依赖于同一状态
- 来自不同组件的行为需要变更同一状态



## Vuex工作原理

![image.png](https://lark-assets-prod-aliyun.oss-cn-hangzhou.aliyuncs.com/yuque/0/2022/png/1379492/1643034632508-417c8676-569a-41e1-b7db-223fafbedfd7.png?date=1680425542034)



##  搭建vuex环境

1. 创建文件：```src/store/index.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)
   
   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state
   })
   ```

2. 在```main.js```中创建vm时传入```store```配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
   ```

##    基本使用

1. 初始化数据、配置```actions```、配置```mutations```，操作文件```store.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
   	jia(context,value){
   		// console.log('actions中的jia被调用了',miniStore,value)
   		context.commit('JIA',value)
   	},
   }
   
   const mutations = {
       //执行加
   	JIA(state,value){
   		// console.log('mutations中的JIA被调用了',state,value)
   		state.sum += value
   	}
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state,
   })
   ```

2. 组件中读取vuex中的数据：```$store.state.sum```

3. 组件中修改vuex中的数据：```$store.dispatch('action中的方法名',数据)```或 ```$store.commit('mutations中的方法名',数据)```

   >  备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```



具体案例：

**index.js**

```js
//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions——用于响应组件中的动作
const actions = {
	/* jia(context,value){
		console.log('actions中的jia被调用了')
		context.commit('JIA',value)
	},
	jian(context,value){
		console.log('actions中的jian被调用了')
		context.commit('JIAN',value)
	}, */
	jiaOdd(context,value){
		console.log('actions中的jiaOdd被调用了')
		if(context.state.sum % 2){
			context.commit('JIA',value)
		}
	},
	jiaWait(context,value){
		console.log('actions中的jiaWait被调用了')
		setTimeout(()=>{
			context.commit('JIA',value)
		},500)
	}
}
//准备mutations——用于操作数据（state）
const mutations = {
	JIA(state,value){
		console.log('mutations中的JIA被调用了')
		state.sum += value
	},
	JIAN(state,value){
		console.log('mutations中的JIAN被调用了')
		state.sum -= value
	}
}
//准备state——用于存储数据
const state = {
	sum:0 //当前的和
}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
})
```

**Count.vue**

```html
<template>
	<div>
		<h1>当前求和为：{{$store.state.sum}}</h1>
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
		<button @click="increment">+</button>
		<button @click="decrement">-</button>
		<button @click="incrementOdd">当前求和为奇数再加</button>
		<button @click="incrementWait">等一等再加</button>
	</div>
</template>

<script>
	export default {
		name:'Count',
		data() {
			return {
				n:1, //用户选择的数字
			}
		},
		methods: {
			increment(){
                // commit 是操作 mutations
				this.$store.commit('JIA',this.n)
			},
			decrement(){
                // commit 是操作 mutations
				this.$store.commit('JIAN',this.n)
			},
			incrementOdd(){
                // dispatch 是操作 actions
				this.$store.dispatch('jiaOdd',this.n)
			},
			incrementWait(){
                // dispatch 是操作 actions
				this.$store.dispatch('jiaWait',this.n)
			},
		},
		mounted() {
			console.log('Count',this)
		},
	}
</script>

<style lang="css">
	button{
		margin-left: 5px;
	}
</style>
```

## getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

2. 在```store.js```中追加```getters```配置

   ```js
   ......
   
   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：```$store.getters.bigSum```



## 四个map方法的使用

导入

```js
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
```

1. <strong>mapState方法：</strong>用于帮助我们映射```state```中的数据为计算属性

   ```js
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. <strong>mapGetters方法：</strong>用于帮助我们映射```getters```中的数据为计算属性

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

3. <strong>mapActions方法：</strong>用于帮助我们生成与```actions```对话的方法，即：包含```$store.dispatch(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. <strong>mapMutations方法：</strong>用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则传的参数是事件对象(event)。

具体案例：

```html
<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
    <h3>当前求和放大10倍为：{{ bigSum }}</h3>
    <h3>年龄：{{ age }}</h3>
    <h3>姓名：{{name}}</h3>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
	<!-- 用了mapActions 和 mapMutations 的话要主动传参 -->
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前求和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: "Count",
  data() {
    return {
      n: 1, //用户选择的数字
    };
  },
  computed: {
	...mapState(['sum', 'age', 'name']),
	...mapGetters(['bigSum'])  
  },
  methods: {
    ...mapActions({incrementOdd: 'sumOdd', incrementWait: 'sumWait'}),
    ...mapMutations({increment: 'sum', decrement: 'reduce'})
  },
  mounted() {
    console.log("Count", this);
  },
};
</script>

<style lang="css">
button {
  margin-left: 5px;
}
</style>

```

## 模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。
2. 修改`store.js`
   为了解决不同模块命名冲突的问题，将不同模块的`namespaced: true`，之后在不同页面中引入`getteractionsmutations`时，需要加上所属的模块名

```JavaScript
const countAbout = {
  namespaced: true,	// 开启命名空间
  state: {x:1},
  mutations: { ... },
  actions: { ... },
  getters: {
    bigSum(state){ return state.sum * 10 }
  }
}
```

开启命名空间以后，组件读取数据要简单点儿

```JavaScript
// 方式一：自己直接读取
this.$store.state.personAbout.list
// 方式二：借助mapState读取：
...mapState('countAbout',['sum','school','subject']),
```

要是具体忘了怎么用，到时候再查一下，这部分就不详细记录了



# Vue Router

## 相关理解 基本路由 多级路由

 **vue-router 的理解** 

`vue`的一个插件库，专门用来实现SPA应用

 **对SPA应用的理解** 

- 单页Web应用（single page web application，SPA）
- 整个应用只有一个完整的页面
- 点击页面中的导航链接不会刷新页面，只会做页面的局部更新
- 数据需要通过ajax请求获取



**路由的理解**

1. 什么是路由? 
   - 一个路由就是一组映射关系（`key - value`）
   - `key`为路径，`value`可能是`function`或`componen`
2. 路由分类
   1. 后端路由
      - 理解：`value`是`function`，用于处理客户端提交的请求
      - 工作过程：服务器接收到一个请求时，根据请求路径找到匹配的函数来处理请求，返回响应数据
   2. 前端路由
      - 理解：`value`是`component`，用于展示页面内容
      - 工作过程：当浏览器的路径改变时，对应的组件就会显示



 **基本路由**

1. 安装`vue-router`，命令`npm i vue-router`
2. 应用插件`Vue.use(VueRouter)`
3. 编写`router`配置项

```JavaScript
import VueRouter from 'vue-router'			// 引入VueRouter
import About from '../components/About'	// 路由组件
import Home from '../components/Home'		// 路由组件

// 创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
    routes:[
        {
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home
        }
    ]
})

//暴露router
export default router
```

实现切换

- `<router-link></router-link>`浏览器会被替换为`a`标签
- `active-class`可配置高亮样式

```vue
<router-link active-class="active" to="/about">About</router-link>
```

指定展示位`<router-view></router-view>`

**使用说明：**

`src/router/index.js`该文件专门用于创建整个应用的路由器

```javascript
import VueRouter from 'vue-router'
// 引入组件
import About from '../components/About'
import Home from '../components/Home'

// 创建并暴露一个路由器
export default new VueRouter({
    routes:[
        {
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home
        }
    ]
})
```

**main.js**

```javascript
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'	// 引入VueRouter
import router from './router'				// 引入路由器

Vue.config.productionTip = false

Vue.use(VueRouter)	// 应用插件

new Vue({
    el:'#app',
    render: h => h(App),
    router:router
})

```

**App.vue**

```vue
<template>
  <div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header"><h2>Vue Router Demo</h2></div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
                    <!-- 原始html中我们使用a标签实现页面的跳转 -->
          <!-- <a class="list-group-item active" href="./about.html">About</a> -->
          <!-- <a class="list-group-item" href="./home.html">Home</a> -->

                    <!-- Vue中借助router-link标签实现路由的切换 -->
                    <router-link class="list-group-item" 
                       active-class="active" to="/about">About</router-link>
          <router-link class="list-group-item" 
                       active-class="active" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
                        <!-- 指定组件的呈现位置 -->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name:'App'
    }
</script>
```

**注意事项**

1. 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹
2. 通过切换，“**隐藏**”了的路由组件，**默认是被销毁掉的，需要的时候再去挂载**
3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息
4. 整个应用只有一个`router`，可以通过组件的`$router`属性获取到



**多级路由**

配置路由规则，使用`children`配置项

```JavaScript
router:[
    { 
        path: '\about', 
        component: About,
    },
    {
    	path: '\home',
        component: Home,
    	children: [						\\ 通过children配置子级路由
			{
        		path: 'news', 			\\此处一定不要带斜杠，写成 \news
                component: News
    		}, 
            { 
            	path: 'message', 		\\ 此处一定不要写成 \message
                component: Message 
            }
         ]
	}
]
```

跳转（要写完整路径）

```vue
<router-link to="/home/news">News</router-link>
```



## query 命名路由 params props

**路由的 query 参数**

传递参数

```vue
<!-- 跳转并携带query参数，to的字符串写法 -->
<router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">跳转</router-link>
                
<!-- 跳转并携带query参数，to的对象写法（推荐） -->
<router-link 
    :to="{
        path:'/home/message/detail',
        query:{
           id: m.id,
       	title: m.title
        }
    }"
>跳转</router-link>
```

接收参数

```JavaScript
$route.query.id
$route.query.title
```



**命名路由**

1. 作用：可以简化路由的跳转

2. 如何使用

   1. 给路由命名 

      ```JavaScript
      {
          path:'/demo',
          component:Demo,
          children:[
              {
                  path:'test',
                  component:Test,
                  children:[
                      {
                name:'hello' // 给路由命名
                          path:'welcome',
                          component:Hello,
                      }
                  ]
              }
          ]
      }
      
      ```

   2. 简化跳转

      ```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
          :to="{
              name:'hello',
              query:{
                  id:666,
              title:'你好'
              }
          }"
      >跳转</router-link>
      ```

      

**路由的 params 参数**

1. 配置路由，声明接收`params`参数

   ```JavaScript
   {
       path:'/home',
       component:Home,
       children:[
           {
               path:'news',
               component:News
           },
           {
               component:Message,
               children:[
                   {
                       name:'xiangqing',
                       path:'detail/:id/:title', // 🔴使用占位符声明接收params参数
                       component:Detail
                   }
               ]
           }
       ]
   }
   ```

2. 传递参数
   特别注意：路由携带`params`参数时，若使用`to`的对象写法，则**不能使用**`path`配置项，**必须使用**`name`**配置！**

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
                   
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
       :to="{
           name:'xiangqing',
           params:{
              id:666,
          title:'你好'
           }
       }"
   >跳转</router-link>
   ```

3. 接收参数

   ```JavaScript
   $route.params.id
   $route.params.title
   ```

   

**路由的 props 配置**

`props`作用：让路由组件更方便的收到参数

```JavaScript
{
    name:'xiangqing',
    path:'detail/:id',
    component:Detail,

    //第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
    // props:{a:900}

    //第二种写法：props值为布尔值，为true时，则把路由收到的所有params参数通过props传给Detail组件
    // props:true
    
    //第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
    props($route){
        return {
            id: $route.query.id,
            title: $route.query.title
        }
    }
}
```

**index.js**

```javascript
import VueRouter from "vue-router";
import Home from '../pages/Home'
import About from '../pages/About'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

export default new VueRouter({
  routes:[
    {
      path: '/about',
      component: About
    },
    {
      path:'/home',
      component:Home,
      children:[
        {
          path:'news',
          component:News
        },
        {
          path:'message',
          component:Message,
          children:[
            {
              name:'xiangqing',
              path:'detail/:id/:title',
              component:Detail,
              // props的第一种写法，值为对象，
              // 该对象中的所有key-value都会以props的形式传给Detail组件
              // props:{a:1,b:'hello'}

              // props的第二种写法，值为布尔值，
              // 若布尔值为真，会把该路由组件收到的所有params参数，以props的形式传给Detail组件
              // props:true

              // props的第三种写法，值为函数
              props($route) { // 这里可以使用解构赋值
                return {
                  id: $route.query.id,
                  title: $route.query.title,
                }
              }
            }
          ]
        }
      ]
    }
  ]
})
```



## 编程式路由导航 缓存路由组件

**作用**：不借助`<router-link>`实现路由跳转，让路由跳转更加灵活
`this.$router.push({})`	内传的对象与`<router-link>`中的to相同
`this.$router.replace({})`	替换
`this.$router.forward()`	前进
`this.$router.back()`		后退
`this.$router.go(n)`		可前进也可后退，n为正数前进n，为负数后退



```JavaScript
this.$router.push({
    name:'xiangqing',
  params:{
    id:xxx,
    title:xxx
  }
})

this.$router.replace({
    name:'xiangqing',
  params:{
    id:xxx,
    title:xxx
  }
})
```

**缓存路由组件**

作用：让不展示的路由组件保持挂载，不被销毁


```vue
<!-- 缓存一个路由组件 -->
<keep-alive include="News"> include中存放想要缓存的组件名，不写表示全部缓存
    <router-view></router-view>
</keep-alive>

<!-- 缓存多个路由组件 -->
<keep-alive :include="['News', 'Message']">
    <router-view></router-view>
</keep-alive>
```

