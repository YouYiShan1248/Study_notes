## ES6+

### 关键字

#### let关键字

**使用let关键字声明的变量具有块级作用域**

```javascript
/* -------
在一个大括号中 使用let关键字声明的变量才具有块级作用域 var关键字是不具备这个特点的
--------- */

if (true) {
 let num = 100;
 var abc = 200;
}
console.log(abc);	// 200
console.log(num)	//	error
```

**防止循环变量变成全局变量**

```javascript
for (let i = 0; i < 2; i++) {}
console.log(i);	//	error
```

**使用let关键字声明的变量没有变量提升**

```javascript
 console.log(a);	//	error
 let a = 100;
```

**使用let关键字声明的变量具有暂时性死区特性**

```javascript
var num = 10
if (true) {
	console.log(num);	//	error
	let num = 20;
}
```

#### const关键字

**使用const关键字声明的常量具有块级作用域**

```JavaScript
if (true) {
 	const a = 10;
 	if (true) {
 		const a = 20;
 		console.log(a);	// 20
 	}
 	console.log(a);	// 10
 }
 console.log(a);	// error
```

**使用const关键字声明的常量必须赋初始值**

```javascript
const pi;	// error
const PI = 3.14;	// 3.14
```

**常量声明后值不可更改** 

```javascript
const PI = 3.14;
PI = 100;	// error

const ary = [100, 200];
ary[0] = 123;
console.log(ary); 	// [123,200]
ary = [1, 2]
console.log(ary);	// error
```



### 模板字符串

使用模板字符串来拼接实现数据描述

```javascript
//原先的方式拼接字符串
let name ="xiaoming"
let age = 20
{
    let info = name + " is " + age + "years old"
    console.log(info)
}

//使用模板字符串
{
    let info = `${name} is ${age} years old`;//插值运算符
    console.log(info)
}
```



### 解构

#### 数组解构

数组解构允许我们按照一一对应的关系从数组中提取值 然后将值赋值给变量

```javascript
let ary = [1,2,3];
let [a, b, c, d, e] = ary;
console.log(a)	// 1
console.log(b)	// 2
console.log(c)	// 3
console.log(d)	// undefined
console.log(e)	// undefined
```

#### 对象解构

对象解构允许我们使用变量的名字匹配对象的属性 匹配成功 将对象属性的值赋值给变量

```javascript
let person = {name: 'lisi', age: 30, sex: '男'};
let { name, age, sex } = person;
console.log(name)	// lisi
console.log(age)	// 30
console.log(sex)	// 男
//将name属性赋值给myName变量
let {name: myName} = person;
console.log(myName)		// lisi
```



### 箭头函数

箭头函数是用来简化函数定义语法的

```JavaScript
const fn = () => {
	console.log(123)
}
fn();
```



```JavaScript
// 在箭头函数中 如果函数体中只有一句代码 并且代码的执行结果就是函数的返回值 函数体大括号可以省略
const sum = (n1, n2) => n1 + n2;	 
const result = sum(10, 20);
console.log(result)
		
// 在箭头函数中 如果形参只有一个 形参外侧的小括号也是可以省略的
const fn = v => {
 	alert(v);
}
fn(20)
```

**箭头函数不绑定this**

箭头函数不绑定this 箭头函数没有自己的this关键字 如果在箭头函数中使用this ，this关键字将指向箭头函数定义位置中的this

```javascript
function fn () {
	console.log(this);	// {name: 'zhangsan'}
	return () => {
		console.log(this)	// {name: 'zhangsan'}
	}
}

const obj = {name: 'zhangsan'};
const resFn = fn.call(obj); //使用call方法改变this的指向
resFn();
```

```javascript
var age = 100;
var obj = {
	age: 20,
	say: () => {
		alert(this.age)	// 100
	}
}
obj.say();
```



### class类

```JavaScript
//class 类
class Student {
// 构造函数
	constructor(name, age) {
        this.age = age;
        this.name = name;
      }
      show() {
        console.log(`${this.name} is ${this.age} years old`);
      }
}
    let s1 = new Student("小明", 20);
    s1.show();
```



### 对象字面量简写

```JavaScript
//原始方法
let x = 20;
let y = 40;
// 简写法
let [a, b] = [20, 40];

// 原始方法
let point = { x: x, y: y };
// 简写法
let spoint = { x, y };
```



### 剩余参数

`...args`是单个参数则表示将剩余参数以数组的形式存入args数组变量中

```javascript
const sum = (...args) => {
 	let total = 0;
 	args.forEach(item => total += item);
 	return total;
};

console.log(sum(10, 20));	// 30
console.log(sum(10, 20, 30));	// 60

//剩余参数与解构配合使用
let ary1 = ['张三' , '李四', '王五'];
let [s1, ...s2] = ary1;
console.log(s1)	// 张三
console.log(s2)	// [李四，王五]
```



### 扩展运算符

`...ary`如果是一个数组对象，则将会把数组拆分成以逗号分隔的参数序列

```
		// 扩展运算符可以将数组拆分成以逗号分隔的参数序列
let ary = ["a", "b", "c"];
...ary // "a", "b", "c"
console.log(...ary)	// a b c
console.log("a", "b", "c")	// a b c
		
		// 扩展运算符应用于数组合并
let ary1 = [1, 2, 3];
let ary2 = [4, 5, 6];
let ary3 = [...ary1, ...ary2];	// 使用...ary1,...ary2将两个数组拆分成序列然后重新组装
console.log(ary3)	// [1,2,3,4,5,6]

		// 合并数组的第二种方法
let ary1 = [1, 2, 3];
let ary2 = [4, 5, 6];

ary1.push(...ary2);
console.log(ary1)	// [1,2,3,4,5,6]
		
		// 利用扩展运算符将伪数组转换为真正的数组
var oDivs = document.getElementsByTagName('div');
console.log(oDivs)
var ary = [...oDivs];
ary.push('a');
console.log(ary);
```



### Symbol

它一种新的数据类型，表示独一无二的值，类似于字符串的数据类型。

- 它的值是唯一的，用来解决命名冲突的问题。
- 它的值不能于其他数据进行运算。
- 它定义的对象属性不能使用for…in 循环遍历，但是可以使用Reflect.ownKeys来获取对象的所有键名。

```JavaScript
let game={
    //假如有很多代码很多变量名
}

//声明一个对象
let data={
    //Symbol保证了up和down的属性名是独一无二的，
    // 所以添加进去也不怕也不怕有属性名冲突
    up:Symbol(),//up属性的数据类型为Symbol
    down:Symbol()
};

//第一种添加方式
//把这个Symbol添加到game方法中
game[data.up]=function(){
    console.log('我会飞'); //安全的向这个对象中添加了两个方法
}
game[data.down]=function(){
    console.log('我会爬');
}
console.log(game);


//////////////////////////////////////
//第二种添加方式
let play={
    name='run',
    [Symbol('say')]:function(){
        console.log('我会说话');
    },
    [Symbol('sleep')]:function(){
        console.log('我会睡觉');
    }
}
console.log(paly);
```





### 迭代器

迭代器(lterator)是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署lterator接口，就可以完成遍历操作。

**具备iterator接口的数据类型**

- Array
- Argunments
- Set
- Map
- String
- TypedArray
- NodeList

这个接口就是对象里面的一个属性，属性的名字叫Symbol.iterator，也可以自己对结构进行布置iterator接口。

**工作原理**

- 先创建一个指针对象，指向当前数据结构的起始位置
- 第一次调用对象的next方法，指针自动指向数据结构的第一个成员
- 接下来不断调用next方法，指针一直往后移动，直到指向最后一个成员
- 每次调用next方法就会返回一个包含value和done属性（是否完成）的对象

```JavaScript
const xiyou=['AA','BB','CC','DD'];
// for(let v of xiyou){
//     console.log(v)  // 'AA','BB','CC','DD'  //for in保存的是键名，for of保存的是键值
// }
let iterator = xiyou[Symbol.iterator]();
console.log(iterator.next()); //{{value:'唐僧'，done:false}}
console.log(iterator.next()); //{{value:'孙悟空'，done:false}}

```

**自定义迭代器**

```JavaScript
//声明一个对象
const data={
    name:'zzl',
    lis:[
        'wxl',
        'll',
        'hll'
    ],
    //自己给某些结构加上iterator接口
    [Symbol.iterator](){
        //索引变量
        let index=0;
        let _this=this;
        return {//返回一个指针对象，即创建一个指针对象
            next:function(){ //创建对象的next方法
                // 返回一个包含value和done属性（是否完成）的对象
                if(index<_this.lis.length){
                    const result= {value:_this.lis[index],done:false};
                    index++;
                    return result;
                }else{                   
                    return {value:undefined,done:true};
                }
            }
        };
    }
}
//自定义遍历这个对象
for(let v of data){
    console.log(v);
}
console.log('--------------------')
console.log(data);
```

### 生成器

生成器就是一个特殊的函数，是异步编程新的解决方案。

```JavaScript
//	生成器函数写法
function * fun(){	//函数名和function中间有一个 * 
    console.log('zzl');
}
let a=fun();
// console.log(a);//输出一个迭代器对象（有next方法）
a.next();//输出zzl
```

```JavaScript
function * fun(){
    console.log('zzl');
    console.log('wxl');
}
let a=fun();
// console.log(a);//输出一个迭代器对象（有next方法）
a.next();//输出zzl wxl 即全部输出
```

```JavaScript
function * fun(){
    console.log('zzl');
    yield '我要暂停'	//yield是函数代码的分隔符
    console.log('wxl');
}
let a=fun();
// console.log(a);//输出一个迭代器对象（有next方法）
a.next();//输出zzl 我要暂停
```

```JavaScript
function * fun(){
    console.log('zzl');
    yield '我要暂停'
    console.log('wxl');
}
let a=fun();
// console.log(a);//输出一个迭代器对象（有next方法）
a.next();//输出zzl
a.next();//输出wxl
```

#### 生成器的参数传递

```JavaScript
function * fun(arg){
    console.log(arg);//输出aaa
    let one=yield 111;
    console.log(one);//输出bbb
    let two=yield 222;
    console.log(two);//输出ccc
    let three=yield 333;
    console.log(three);//输出ddd
}
let a=fun('aaa');
console.log(a.next());//第一次调用next
//next方法可以传入实参
//第二次调用next的实参将作为第一个yield的整体返回结果
console.log(a.next('bbb'))//输出{value: 222, done: false}
console.log(a.next('ccc'))
console.log(a.next('ddd'))
```

#### 异步编程

**回调地狱**

需求：1s后控制台输出111 然后 2s后控制台输出222 然后 3s后控制台输出333

```JavaScript
//	回调地狱
// setTimeout(() => {
//     console.log(111);
//     setTimeout(() => {
//         console.log(222);
//         setTimeout(() => {
//             console.log(333);
//         }, 3000);
//     }, 2000);
// }, 1000);

//	用生成器函数方式解决 回调地狱 问题
function one(){
    setTimeout(()=>{
        console.log(111);
        a.next();//定时器运行完调用下一个，实现了异步编程
    },1000)
}
function two(){
    setTimeout(()=>{
        console.log(222);
        a.next();
    },2000)
}
function three(){
    setTimeout(()=>{
        console.log(333);
        a.next();
    },3000)
}
function *fun(){
    yield one();
    yield two();
    yield three();
}
//调用生成器函数
let a=fun();
a.next();
```

**模拟异步获取数据**

```JavaScript
function one(){
    setTimeout(()=>{
        let data='用户数据';
        a.next(data);//第二次调用next的实参将作为第一个yield的整体返回结果
    },1000)
}
function two(){
    setTimeout(()=>{
        let data='订单数据';
        a.next(data);
    },1000)
}
function three(){
    setTimeout(()=>{
        let data='商品数据';
        a.next(data);
    },1000)
}
function *fun(){
    let users= yield one(); //用户数据 作为第一个yield的整体返回结果
    console.log(users);		//	用户数据
    let orders= yield two();
    console.log(orders);	//	订单数据
    let goods= yield three();
    console.log(goods);		//	商品数据
}
//调用生成器函数
let a=fun();
a.next();
```

### Promise

它是es6中异步编程的新的解决方案。相当于一个构造函数。

#### 基本特性

```javascript
function fun(){
    return new Promise((resolve,reject)=>{
        //如果成功就调用resolve
        let data='数据库中的数据';
        resolve(data); //promise状态变为成功
        //如果失败就调用reject
        let err='数据库读取失败';
        reject(err);//promise状态变为失败
    })
}
var promise = fun()
promise.then(//调用then方法
    function(success){//promise状态变为成功后then会调用第一个回调函数
        console.log(success);
    },function(err){//promise状态变为失败后then会调用第二个回调函数
        console.log(err);
    }
)
```

#### Promise.then（）

```JavaScript
    const p =new Promise((resolve, reject) =>{
        setTimeout(()=>{
            resolve('用户数据');
        })
    });

//then（）函数返回的实际也是一个Promise对象
//1.当回调后，返回的是非Promise类型的属性时，状态为fulfilled，then（）函数的返回值为对象的成功值，如reutnr 123，返回的Promise对象值为123，如果没有返回值，是undefined

//2.当回调后，返回的是Promise类型的对象时，then（）函数的返回值为这个Promise对象的状态值

//3.当回调后，如果抛出的异常，则then（）函数的返回值状态也是rejected
    let result = p.then(value => {
        console.log(value)
        // return 123;
        // return new Promise((resolve, reject) => {
        //     resolve('ok')
        // })
        throw 123
    },reason => {
        console.log(reason)
    })
    console.log(result);


```

#### Promise.catch（）

```JavaScript
//catch（）函数只有一个回调函数，意味着如果Promise对象状态为失败就会调用catch（）方法并且调用回调函数
<script>
    const p = new Promise((resolve, reject) => {
        setTimeout(()=>{
            reject('出错啦')
        },1000)
    })

    p.catch(reason => {
        console.log(reason)
    })
</script>

```

### proxy

proxy可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

proxy实际上重载了点运算符，即用自己的定义覆盖了语言的原始定义

ES6原生提供proxy构造函数，用来生成proxy实例

```javascript
//target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为
var proxy = new Proxy(target,handler);
```

**get方法**

​	用于拦截某个属性的读取操作，可以接受三个参数，依次为，目标对象、属性名、proxy实例本身（严格来说，是操作行为所针对的对象），其中最后一个参数可选。

```JavaScript
//如果访问目标对象不存在的属性，会抛出一个错误，如果没有这个拦截函数，访问不存在的属性，会返回undefined

var person ={
    name:"张三"
}
var proxy = new Proxy(person,{
    get(target,propKey){
        if(propKey in target){
            return target[propKey];
        }else{
            throw new ReferenceError("Prop name \"" + propKey +"\"does not exist. ")
        }
    }
});

proxy.name // "张三"
proxy.age //抛出一个错误
```

**set方法**

​	用来拦截某个属性的赋值操作，可以接受四个参数，依次为，目标对象、属性名、属性值、Proxy实例本身，其中最后一个参数可选。

```JavaScript
//假定Person对象有一个age属性，改属性应该是一个不大于200的整数，那么可以使用Proxy保证age的属性值符合要求。
let validator = {
	set(obj,prop,value){
        if(prop === "age"){
            if(!Number.isInteger(value)){
                throw new TypeError("The age is not an integer");
            }
            if(value >200){
                throw new TypeError("The age seems invalid");
            }
        }
        //对于满足条件的age属性以及其他属性，直接保存
        obj[prop] = value;
        return true;   
    }
};

let person = new Proxy({},validator);
person.age = 100;
person.age;	//100

person.age = "young";	//报错
person.age = 300;	//报错
```

**has方法**

用来拦截`HasProperty`操作，即判断对象是否具有某个属性时，这个方法会生效。







# ES6新增Set、Map两种数据结构

![img](https://static.vue-js.com/2b947d00-560c-11eb-85f6-6fac77c0c9b3.png)

如果要用一句来描述，我们可以说

`Set`是一种叫做集合的数据结构，`Map`是一种叫做字典的数据结构

什么是集合？什么又是字典？

- 集合
  是由一堆无序的、相关联的，且不重复的内存结构【数学中称为元素】组成的组合
- 字典
  是一些元素的集合。每个元素有一个称作key 的域，不同元素的key 各不相同

区别？

- 共同点：集合、字典都可以存储不重复的值
- 不同点：集合是以[值，值]的形式存储元素，字典是以[键，值]的形式存储

## Set

`Set`是`es6`新增的数据结构，类似于数组，但是成员的值都是唯一的，没有重复的值，我们一般称为集合

`Set`本身是一个构造函数，用来生成 Set 数据结构

```js
const s = new Set();
```

### 增删改查

`Set`的实例关于增删改查的方法：

- add()
- delete()
- has()
- clear()

### add()

添加某个值，返回 `Set` 结构本身

当添加实例中已经存在的元素，`set`不会进行处理添加

```js
s.add(1).add(2).add(2); // 2只被添加了一次
```

### delete()

删除某个值，返回一个布尔值，表示删除是否成功

```js
s.delete(1)
```

### has()

返回一个布尔值，判断该值是否为`Set`的成员

```js
s.has(2)
```

### clear()

清除所有成员，没有返回值

```js
s.clear()
```

### 遍历

`Set`实例遍历的方法有如下：

关于遍历的方法，有如下：

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

`Set`的遍历顺序就是插入顺序

`keys`方法、`values`方法、`entries`方法返回的都是遍历器对象

```javascript
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

`forEach()`用于对每个成员执行某种操作，没有返回值，键值、键名都相等，同样的`forEach`方法有第二个参数，用于绑定处理函数的this

```js
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

扩展运算符和`Set` 结构相结合实现数组或字符串去重

```javascript
// 数组
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)]; // [3, 5, 2]

// 字符串
let str = "352255";
let unique = [...new Set(str)].join(""); // "352"
```

实现并集、交集、和差集

```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

## Map

`Map`类型是键值对的有序列表，而键和值都可以是任意类型

`Map`本身是一个构造函数，用来生成 `Map` 数据结构

```js
const m = new Map()
```

### 增删改查

`Map` 结构的实例针对增删改查有以下属性和操作方法：

- size 属性
- set()
- get()
- has()
- delete()
- clear()

### size

`size`属性返回 Map 结构的成员总数。

```javascript
const map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
```

### set()

设置键名`key`对应的键值为`value`，然后返回整个 Map 结构

如果`key`已经有值，则键值会被更新，否则就新生成该键

同时返回的是当前`Map`对象，可采用链式写法

```javascript
const m = new Map();

m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined
m.set(1, 'a').set(2, 'b').set(3, 'c') // 链式操作
```

### get()

`get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`

```js
const m = new Map();

const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello)  // Hello ES6!
```

### has()

`has`方法返回一个布尔值，表示某个键是否在当前 Map 对象之中

```javascript
const m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition')     // true
m.has('years')       // false
m.has(262)           // true
m.has(undefined)     // true
```

### delete()

```
delete`方法删除某个键，返回`true`。如果删除失败，返回`false
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)     // true

m.delete(undefined)
m.has(undefined)       // false
```

### clear()

`clear`方法清除所有成员，没有返回值

```javascript
let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0
```

### 遍历

`Map`结构原生提供三个遍历器生成函数和一个遍历方法：

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回所有成员的遍历器
- forEach()：遍历 Map 的所有成员

遍历顺序就是插入顺序

```javascript
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});
```

## WeakSet 和 WeakMap

从前面的 [垃圾回收](https://zh.javascript.info/garbage-collection) 章节中知道，JavaScript 引擎在值“可达”和可能被使用时会将其保持在内存中。

例如：

```javascript
let john = { name: "John" };

// 该对象能被访问，john 是它的引用

// 覆盖引用
john = null;

// 该对象将会被从内存中清除
```

通常，当对象、数组之类的数据结构在内存中时，它们的子元素，如对象的属性、数组的元素都被认为是可达的。

例如，如果把一个对象放入到数组中，那么只要这个数组存在，那么这个对象也就存在，即使没有其他对该对象的引用。

就像这样:

```javascript
let john = { name: "John" };

let array = [ john ];

john = null; // 覆盖引用

// 前面由 john 所引用的那个对象被存储在了 array 中
// 所以它不会被垃圾回收机制回收
// 我们可以通过 array[0] 获取到它
```

类似的，如果我们使用对象作为常规 `Map` 的键，那么当 `Map` 存在时，该对象也将存在。它会占用内存，并且不会被（垃圾回收机制）回收。

例如：

```javascript
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // 覆盖引用

// john 被存储在了 map 中，
// 我们可以使用 map.keys() 来获取它
```

`WeakMap` 在这方面有着根本上的不同。它不会阻止垃圾回收机制对作为键的对象（key object）的回收。

让我们通过例子来看看这指的到底是什么。

### [WeakMap](https://zh.javascript.info/weakmap-weakset#weakmap)

`WeakMap` 和 `Map` 的第一个不同点就是，`WeakMap` 的键必须是对象，不能是原始值：

```javascript
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // 正常工作（以对象作为键）

// 不能使用字符串作为键
weakMap.set("test", "Whoops"); // Error，因为 "test" 不是一个对象
```

现在，如果我们在 weakMap 中使用一个对象作为键，并且没有其他对这个对象的引用 —— 该对象将会被从内存（和map）中自动清除。

```javascript
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 覆盖引用

// john 被从内存中删除了！
```

与上面常规的 `Map` 的例子相比，现在如果 `john` 仅仅是作为 `WeakMap` 的键而存在 —— 它将会被从 map（和内存）中自动删除。

`WeakMap` 不支持迭代以及 `keys()`，`values()` 和 `entries()` 方法。所以没有办法获取 `WeakMap` 的所有键或值。

`WeakMap` 只有以下的方法：

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

为什么会有这种限制呢？这是技术的原因。如果一个对象丢失了其它所有引用（就像上面示例中的 `john`），那么它就会被垃圾回收机制自动回收。但是在从技术的角度并不能准确知道 **何时会被回收**。

这些都是由 JavaScript 引擎决定的。JavaScript 引擎可能会选择立即执行内存清理，如果现在正在发生很多删除操作，那么 JavaScript 引擎可能就会选择等一等，稍后再进行内存清理。因此，从技术上讲，`WeakMap` 的当前元素的数量是未知的。JavaScript 引擎可能清理了其中的垃圾，可能没清理，也可能清理了一部分。因此，暂不支持访问 `WeakMap` 的所有键/值的方法。

那么，在哪里我们会需要这样的数据结构呢？

### [使用案例：额外的数据](https://zh.javascript.info/weakmap-weakset#shi-yong-an-li-ewai-de-shu-ju)

`WeakMap` 的主要应用场景是 **额外数据的存储**。

假如我们正在处理一个“属于”另一个代码的一个对象，也可能是第三方库，并想存储一些与之相关的数据，那么这些数据就应该与这个对象共存亡 —— 这时候 `WeakMap` 正是我们所需要的利器。

我们将这些数据放到 `WeakMap` 中，并使用该对象作为这些数据的键，那么当该对象被垃圾回收机制回收后，这些数据也会被自动清除。

```javascript
weakMap.set(john, "secret documents");
// 如果 john 消失，secret documents 将会被自动清除
```

例如，我们有用于处理用户访问计数的代码。收集到的信息被存储在 map 中：一个用户对象作为键，其访问次数为值。当一个用户离开时（该用户对象将被垃圾回收机制回收），这时我们就不再需要他的访问次数了。

下面是一个使用 `Map` 的计数函数的例子：

```javascript
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// 递增用户来访次数
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

下面是其他部分的代码，可能是使用它的其它代码：

```javascript
// 📁 main.js
let john = { name: "John" };

countUser(john); // count his visits

// 不久之后，john 离开了
john = null;
```

现在，`john` 这个对象应该被垃圾回收，但它仍在内存中，因为它是 `visitsCountMap` 中的一个键。

当我们移除用户时，我们需要清理 `visitsCountMap`，否则它将在内存中无限增大。在复杂的架构中，这种清理会成为一项繁重的任务。

我们可以通过使用 `WeakMap` 来避免这样的问题：

```javascript
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count

// 递增用户来访次数
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

现在我们不需要去清理 `visitsCountMap` 了。当 `john` 对象变成不可达时，即便它是 `WeakMap` 里的一个键，它也会连同它作为 `WeakMap` 里的键所对应的信息一同被从内存中删除。

### [使用案例：缓存](https://zh.javascript.info/weakmap-weakset#shi-yong-an-li-huan-cun)

另外一个常见的例子是缓存。我们可以存储（“缓存”）函数的结果，以便将来对同一个对象的调用可以重用这个结果。

为了实现这一点，我们可以使用 `Map`（非最佳方案）：

```javascript
// 📁 cache.js
let cache = new Map();

// 计算并记住结果
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculations of the result for */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 现在我们在其它文件中使用 process()

// 📁 main.js
let obj = {/* 假设我们有个对象 */};

let result1 = process(obj); // 计算完成

// ……稍后，来自代码的另外一个地方……
let result2 = process(obj); // 取自缓存的被记忆的结果

// ……稍后，我们不再需要这个对象时：
obj = null;

alert(cache.size); // 1（啊！该对象依然在 cache 中，并占据着内存！）
```

对于多次调用同一个对象，它只需在第一次调用时计算出结果，之后的调用可以直接从 `cache` 中获取。这样做的缺点是，当我们不再需要这个对象的时候需要清理 `cache`。

如果我们用 `WeakMap` 替代 `Map`，便不会存在这个问题。当对象被垃圾回收时，对应缓存的结果也会被自动从内存中清除。

```javascript
// 📁 cache.js
let cache = new WeakMap();

// 计算并记结果
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// ……稍后，我们不再需要这个对象时：
obj = null;

// 无法获取 cache.size，因为它是一个 WeakMap，
// 要么是 0，或即将变为 0
// 当 obj 被垃圾回收，缓存的数据也会被清除
```

### [WeakSet](https://zh.javascript.info/weakmap-weakset#weakset)

`WeakSet` 的表现类似：

- 与 `Set` 类似，但是我们只能向 `WeakSet` 添加对象（而不能是原始值）。
- 对象只有在其它某个（些）地方能被访问的时候，才能留在 `WeakSet` 中。
- 跟 `Set` 一样，`WeakSet` 支持 `add`，`has` 和 `delete` 方法，但不支持 `size` 和 `keys()`，并且不可迭代。

变“弱（weak）”的同时，它也可以作为额外的存储空间。但并非针对任意数据，而是针对“是/否”的事实。`WeakSet` 的元素可能代表着有关该对象的某些信息。

例如，我们可以将用户添加到 `WeakSet` 中，以追踪访问过我们网站的用户：

```javascript
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John 访问了我们
visitedSet.add(pete); // 然后是 Pete
visitedSet.add(john); // John 再次访问

// visitedSet 现在有两个用户了

// 检查 John 是否来访过？
alert(visitedSet.has(john)); // true

// 检查 Mary 是否来访过？
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet 将被自动清理(即自动清除其中已失效的值 john)
```

`WeakMap` 和 `WeakSet` 最明显的局限性就是不能迭代，并且无法获取所有当前内容。那样可能会造成不便，但是并不会阻止 `WeakMap/WeakSet` 完成其主要工作 —— 为在其它地方存储/管理的对象数据提供“额外”存储。

### [总结](https://zh.javascript.info/weakmap-weakset#zong-jie)

`WeakMap` 是类似于 `Map` 的集合，它仅允许对象作为键，并且一旦通过其他方式无法访问这些对象，垃圾回收便会将这些对象与其关联值一同删除。

`WeakSet` 是类似于 `Set` 的集合，它仅存储对象，并且一旦通过其他方式无法访问这些对象，垃圾回收便会将这些对象删除。

它们的主要优点是它们对对象是弱引用，所以被它们引用的对象很容易地被垃圾收集器移除。

这是以不支持 `clear`、`size`、`keys`、`values` 等作为代价换来的……

`WeakMap` 和 `WeakSet` 被用作“主要”对象存储之外的“辅助”数据结构。一旦将对象从主存储器中删除，如果该对象仅被用作 `WeakMap` 或 `WeakSet` 的键，那么该对象将被自动清除。

```js
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}
```

