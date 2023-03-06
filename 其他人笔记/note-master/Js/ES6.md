# 1. ES6中数组新增了哪些扩展？

![img](https://static.vue-js.com/a156b8d0-53c5-11eb-85f6-6fac77c0c9b3.png)



## Rest 参数与 Spread 语法

在 JavaScript 中，很多内建函数都支持传入任意数量的参数。

例如：

- `Math.max(arg1, arg2, ..., argN)` —— 返回参数中的最大值。
- `Object.assign(dest, src1, ..., srcN)` —— 依次将属性从 `src1..N` 复制到 `dest`。
- ……等。

在本章中，我们将学习如何编写支持传入任意数量参数的函数，以及如何将数组作为参数传递给这类函数。

### Rest 参数 `...`

在 JavaScript 中，无论函数是如何定义的，你都可以在调用它时传入任意数量的参数。

例如：

```javascript
function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

虽然这里这个函数不会因为传入过多的参数而报错。但是，当然，只有前两个参数被求和了。

我们可以在函数定义中声明一个数组来收集参数。语法是这样的：`...变量名`，这将会声明一个数组并指定其名称，其中存有剩余的参数。这三个点的语义就是“收集剩余的参数并存进指定数组中”。

例如，我们需要把所有的参数都放到数组 `args` 中：

```javascript
function sumAll(...args) { // 数组名为 args
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

我们也可以选择将第一个参数获取为变量，并将剩余的参数收集起来。

下面的例子把前两个参数获取为变量，并把剩余的参数收集到 `titles` 数组中：

```javascript
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // 剩余的参数被放入 titles 数组中
  // i.e. titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

**Rest 参数必须放到参数列表的末尾**

Rest 参数会收集剩余的所有参数，因此下面这种用法没有意义，并且会导致错误：

```javascript
function f(arg1, ...rest, arg2) { // arg2 在 ...rest 后面？！
  // error
}
```

`...rest` 必须写在参数列表最后。

### “arguments” 变量

有一个名为 `arguments` 的特殊类数组对象可以在函数中被访问，该对象以参数在参数列表中的索引作为键，存储所有参数。

例如：

```javascript
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // 它是可遍历的
  // for(let arg of arguments) alert(arg);
}

// 依次显示：2，Julius，Caesar
showName("Julius", "Caesar");

// 依次显示：1，Ilya，undefined（没有第二个参数）
showName("Ilya");
```

在过去，JavaScript 中不支持 rest 参数语法，而使用 `arguments` 是获取函数所有参数的唯一方法。现在它仍然有效，我们可以在一些老代码里找到它。

但缺点是，尽管 `arguments` 是一个类数组，也是可迭代对象，但它终究不是数组。它不支持数组方法，因此我们不能调用 `arguments.map(...)` 等方法。

此外，它始终包含所有参数，我们不能像使用 rest 参数那样只截取参数的一部分。

因此，当我们需要这些功能时，最好使用 rest 参数。

**箭头函数没有 `"arguments"`**

如果我们在箭头函数中访问 `arguments`，访问到的 `arguments` 并不属于箭头函数，而是属于箭头函数外部的“普通”函数。

举个例子：

```javascript
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```

我们已经知道，箭头函数没有自身的 `this`。现在我们知道了它们也没有特殊的 `arguments` 对象。

### Spread 语法

我们刚刚看到了如何从参数列表中获取数组。

有时候我们也需要做与之相反的事。

例如，内建函数 [Math.max](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Math/max) 会返回参数中最大的值：

```javascript
alert( Math.max(3, 5, 1) ); // 5
```

如果我们有一个数组 `[3, 5, 1]`，我们该如何用它调用 `Math.max` 呢？

直接“原样”传入这个数组是不会奏效的，因为 `Math.max` 期望的是列表形式的数值型参数，而不是一个数组：

```javascript
let arr = [3, 5, 1];

alert( Math.max(arr) ); // NaN
```

毫无疑问，我们不能手动地去一一设置参数 `Math.max(arg[0], arg[1], arg[2])`，因为我们不确定这儿有多少个。在代码执行时，参数数组中可能有很多个元素，也可能一个都没有。而且，这样的代码也很不优雅。

**Spread 语法** 可以解决这个问题！它看起来和 rest 参数很像，也使用 `...`，但是二者的用途完全相反。

当在函数调用中使用 `...arr` 时，它会把可迭代对象 `arr` “展开”到参数列表中。

以 `Math.max` 为例：

```javascript
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5（spread 语法把数组转换为参数列表）
```

我们还可以通过这种方式传入多个可迭代对象：

```javascript
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

我们甚至还可以将 spread 语法与常规值结合使用：

```javascript
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

并且，我们还可以使用 spread 语法来合并数组：

```javascript
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

let merged = [0, ...arr, 2, ...arr2];

alert(merged); // 0,3,5,1,2,8,9,15（0，然后是 arr，然后是 2，然后是 arr2）
```

在上面的示例中，我们使用数组展示了 spread 语法，其实我们可以用 spread 语法这样操作任何可迭代对象。

例如，在这儿我们使用 spread 语法将字符串转换为字符数组：

```javascript
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

Spread 语法内部使用了迭代器来收集元素，与 `for..of` 的方式相同。

因此，对于一个字符串，`for..of` 会逐个返回该字符串中的字符，`...str` 也同理会得到 `"H","e","l","l","o"` 这样的结果。随后，字符列表被传递给数组初始化器 `[...str]`。

对于这个特定任务，我们还可以使用 `Array.from` 来实现，因为该方法会将一个可迭代对象（如字符串）转换为数组：

```javascript
let str = "Hello";

// Array.from 将可迭代对象转换为数组
alert( Array.from(str) ); // H,e,l,l,o
```

运行结果与 `[...str]` 相同。

不过 `Array.from(obj)` 和 `[...obj]` 存在一个细微的差别：

- `Array.from` 适用于类数组对象也适用于可迭代对象。
- Spread 语法只适用于可迭代对象。

因此，对于将一些“东西”转换为数组的任务，`Array.from` 往往更通用。

### 复制 array/object

还记得我们 [之前讲过的](https://zh.javascript.info/object-copy#ke-long-yu-he-bing-objectassign) `Object.assign()` 吗？

使用 spread 语法也可以做同样的事情（译注：也就是进行浅拷贝）。

```javascript
let arr = [1, 2, 3];

let arrCopy = [...arr]; // 将数组 spread 到参数列表中
                        // 然后将结果放到一个新数组

// 两个数组中的内容相同吗？
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// 两个数组相等吗？
alert(arr === arrCopy); // false（它们的引用是不同的）

// 修改我们初始的数组不会修改副本：
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

并且，也可以通过相同的方式来复制一个对象：

```javascript
let obj = { a: 1, b: 2, c: 3 };

let objCopy = { ...obj }; // 将对象 spread 到参数列表中
                          // 然后将结果返回到一个新对象

// 两个对象中的内容相同吗？
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// 两个对象相等吗？
alert(obj === objCopy); // false (not same reference)

// 修改我们初始的对象不会修改副本：
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

这种方式比使用 `let arrCopy = Object.assign([], arr)` 复制数组，或使用 `let objCopy = Object.assign({}, obj)` 复制对象来说更为简便。因此，只要情况允许，我们倾向于使用它。

### 总结

当我们在代码中看到 `"..."` 时，它要么是 rest 参数，要么是 spread 语法。

有一个简单的方法可以区分它们：

- 若 `...` 出现在函数参数列表的最后，那么它就是 rest 参数，它会把参数列表中剩余的参数收集到一个数组中。
- 若 `...` 出现在函数调用或类似的表达式中，那它就是 spread 语法，它会把一个数组展开为列表。

使用场景：

- Rest 参数用于创建可接受任意数量参数的函数。
- Spread 语法用于将数组传递给通常需要含有许多参数的函数。

我们可以使用这两种语法轻松地互相转换列表与参数数组。

旧式的 `arguments`（类数组且可迭代的对象）也依然能够帮助我们获取函数调用中的所有参数。

## 构造函数新增的方法

关于构造函数，数组新增的方法有如下：

- Array.from()
- Array.of()

### Array.from()

将两类对象转为真正的数组：类似数组的对象和可遍历`（iterable）`的对象（包括 `ES6` 新增的数据结构 `Set` 和 `Map`）

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

还可以接受第二个参数，用来对每个元素进行处理，将处理后的值放入返回的数组

```js
Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```

### Array.of()

用于将一组值，转换为数组

```js
Array.of(3, 11, 8) // [3,11,8]
```

没有参数的时候，返回一个空数组

当参数只有一个的时候，实际上是指定数组的长度

参数个数不少于 2 个时，`Array()`才会返回由参数组成的新数组

```js
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```

## 实例对象新增的方法

关于数组实例对象新增的方法有如下：

- copyWithin()
- find()、findIndex()
- fill()
- entries()，keys()，values()
- includes()
- flat()，flatMap()

### copyWithin()

将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组

参数如下：

- target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

```js
[1, 2, 3, 4, 5].copyWithin(0, 3) // 将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2
// [4, 5, 3, 4, 5] 
```

### find()、findIndex()

`find()`用于找出第一个符合条件的数组成员

参数是一个回调函数，接受三个参数依次为当前的值、当前的位置和原数组

```js
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```

`findIndex`返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1

```js
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

这两个方法都可以接受第二个参数，用来绑定回调函数的`this`对象。

```js
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```

### fill()

使用给定值，填充一个数组

```javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```

还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置

```js
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

注意，如果填充的类型为对象，则是浅拷贝

### entries()，keys()，values()

`keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历

```js
or (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
```

### includes()

用于判断数组是否包含给定的值

```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

方法的第二个参数表示搜索的起始位置，默认为`0`

参数为负数则表示倒数的位置

```js
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```

### flat()，flatMap()

将数组扁平化处理，返回一个新数组，对原数据没有影响

```js
[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]
```

`flat()`默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将`flat()`方法的参数写成一个整数，表示想要拉平的层数，默认为1

```js
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]
```

`flatMap()`方法对原数组的每个成员执行一个函数相当于执行`Array.prototype.map()`，然后对返回值组成的数组执行`flat()`方法。该方法返回一个新数组，不改变原数组

```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
```

`flatMap()`方法还可以有第二个参数，用来绑定遍历函数里面的this

### 四、数组的空位

数组的空位指，数组的某一个位置没有任何值

ES6 则是明确将空位转为`undefined`，包括`Array.from`、扩展运算符、`copyWithin()`、`fill()`、`entries()`、`keys()`、`values()`、`find()`和`findIndex()`

建议大家在日常书写中，避免出现空位

### 五、排序稳定性

将`sort()`默认设置为稳定的排序算法

```js
const arr = [
  'peach',
  'straw',
  'apple',
  'spork'
];

const stableSorting = (s1, s2) => {
  if (s1[0] < s2[0]) return -1;
  return 1;
};

arr.sort(stableSorting)
// ["apple", "peach", "straw", "spork"]
```

排序结果中，`straw`在`spork`的前面，跟原始顺序一致





# 2. ES6中对象新增了哪些扩展？

![img](https://static.vue-js.com/4da4dd40-5427-11eb-ab90-d9ae814b240d.png)

## 一、属性的简写

ES6中，当对象键名与对应值名相等的时候，可以进行简写

```js
const baz = {foo:foo}

// 等同于
const baz = {foo}
```

方法也能够进行简写

```js
const o = {
  method() {
    return "Hello!";
  }
};

// 等同于

const o = {
  method: function() {
    return "Hello!";
  }
}
```

在函数内作为返回值，也会变得方便很多

```js
function getPoint() {
  const x = 1;
  const y = 10;
  return {x, y};
}

getPoint()
// {x:1, y:10}
```

注意：简写的对象方法不能用作构造函数，否则会报错

```js
const obj = {
  f() {
    this.foo = 'bar';
  }
};

new obj.f() // 报错
```



## 二、实例属性和方法

```js
class Person{
  // 实例属性
  temp = 'briup';
  constructor(name,age){
    // 实例属性  常用
    this.name = name;
    this.age = age;
    // 实例方法  不常用
    this.sayName = function(){
      console.log("i am ",this.name);
    }
  }
}
let p1 = new Person('Ronda',22);
let p2 = new Person('Fairy',23);
console.log(p1.sayName === p2.sayName);  // false 因为是实例方法，所有每个实例内都会有自己的方法
console.log(p1.name);  // Ronda
console.log(p1.temp);  // briup
p1.sayName();  // i am Ronda
```

## 三、原型属性和方法

原型属性和方法顾名思义就是在构造函数的原型对象上存在的属性和方法。

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  // 原型方法 常用
  sayName() {
    console.log("i am ", this.name);
  }
}
// 原型属性 不常用
Person.prototype.temp = 'briup';
let p1 = new Person('Ronda', 22);
let p2 = new Person('Fairy', 23);
p1.sayName();   // i am  Ronda
console.log(p1.sayName === p2.sayName);  // true
console.log(p1.temp);  // briup
console.log(p2.temp);  // briup
```

### 静态属性和方法

通过**`static`**关键字来定义静态属性和静态方法。静态属性和静态方法是定义在类上的，所以可以通过类直接访问。在静态方法中，`this`指向当前类。

```js
class Person {
  // 静态属性
  static num = 200;
  // 静态方法
  static number() {
    console.log(this); // [class Person] { num: 200 }
    return this.num;
  }
}
console.log(Person);  // [class Person] { num: 200 }
console.log(Person.number());	//200
console.log(Person.num);	//200
```



## 四、super关键字

`this`关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字`super`，指向当前对象的原型对象

```javascript
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto); // 为obj设置原型对象
obj.find() // "hello"
```

## 五、扩展运算符的应用

在解构赋值中，未被读取的可遍历的属性，分配到指定的对象上面

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

注意：解构赋值必须是最后一个参数，否则会报错

解构赋值是浅拷贝

```js
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2; // 修改obj里面a属性中键值
x.a.b // 2，影响到了结构出来x的值
```

对象的扩展运算符等同于使用`Object.assign()`方法

## 六、属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性。

- for...in：循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）
- Object.keys(obj)：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名
- Object.getOwnPropertyNames(obj)：回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
- Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有 Symbol 属性的键名
- Reflect.ownKeys(obj)：返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

上述遍历，都遵守同样的属性遍历的次序规则：

- 首先遍历所有数值键，按照数值升序排列
- 其次遍历所有字符串键，按照加入时间升序排列
- 最后遍历所有 Symbol 键，按照加入时间升序排

```js
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```

## 七、对象新增的方法

关于对象新增的方法，分别有以下：

- Object.is()
- Object.assign()
- Object.getOwnPropertyDescriptors()
- Object.setPrototypeOf()，Object.getPrototypeOf()
- Object.keys()，Object.values()，Object.entries()
- Object.fromEntries()

### Object.is()

严格判断两个值是否相等，与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是`+0`不等于`-0`，二是`NaN`等于自身

```js
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

### Object.assign()

`Object.assign()`方法用于对象的合并，将源对象`source`的所有可枚举属性，复制到目标对象target

`Object.assign()`方法的第一个参数是目标对象，后面的参数都是源对象

```javascript
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

注意：`Object.assign()`方法是浅拷贝，遇到同名属性会进行替换

### Object.getOwnPropertyDescriptors()

返回指定对象所有自身属性（非继承属性）的描述对象

```js
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```

### Object.setPrototypeOf()

`Object.setPrototypeOf`方法用来设置一个对象的原型对象

```js
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null);
```

### Object.getPrototypeOf()

用于读取一个对象的原型对象

```js
Object.getPrototypeOf(obj);
```

### Object.keys()

返回自身的（不含继承的）所有可遍历（enumerable）属性的键名的数组

```js
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
```

### Object.values()

返回自身的（不含继承的）所有可遍历（enumerable）属性的键对应值的数组

```js
const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]
```

### Object.entries()

返回一个对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对的数组

```js
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```

### Object.fromEntries()

用于将一个键值对数组转为对象

```js
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```







# 3. ES6中函数新增了哪些扩展？

![img](https://static.vue-js.com/54a04a10-5569-11eb-85f6-6fac77c0c9b3.png)

## 一、参数

`ES6`允许为函数的参数设置默认值

```js
function log(x, y = 'World') {
  console.log(x, y);
}

console.log('Hello') // Hello World
console.log('Hello', 'China') // Hello China
console.log('Hello', '') // Hello
```

函数的形参是默认声明的，不能使用`let`或`const`再次声明

```js
function foo(x = 5) {
    let x = 1; // error
    const x = 2; // error
}
```

参数默认值可以与解构赋值的默认值结合起来使用

```js
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined
```

上面的`foo`函数，当参数为对象的时候才能进行解构，如果没有提供参数的时候，变量`x`和`y`就不会生成，从而报错，这里设置默认值避免

```js
function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5
```

参数默认值应该是函数的尾参数，如果不是非尾部的参数设置默认值，实际上这个参数是没发省略的

```javascript
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // 报错
f(undefined, 1) // [1, 1]
```

## 二、属性

### 函数的length属性

`length`将返回没有指定默认值的参数个数

```js
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```

`rest` 参数也不会计入`length`属性

```js
(function(...args) {}).length // 0
```

如果设置了默认值的参数不是尾参数，那么`length`属性也不再计入后面的参数了

```js
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
```

### name属性

返回该函数的函数名

```js
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"
```

如果将一个具名函数赋值给一个变量，则 `name`属性都返回这个具名函数原本的名字

```js
const bar = function baz() {};
bar.name // "baz"
```

```
Function`构造函数返回的函数实例，`name`属性的值为`anonymous
(new Function).name // "anonymous"
```

`bind`返回的函数，`name`属性值会加上`bound`前缀

```javascript
function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "
```

## 三、作用域

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域

等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的

下面例子中，`y=x`会形成一个单独作用域，`x`没有被定义，所以指向全局变量`x`

```js
let x = 1;

function f(y = x) { 
  // 等同于 let y = x  
  let x = 2; 
  console.log(y);
}

f() // 1
```

## 四、严格模式

只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错

```js
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```



## 五、“箭头”（`=>`）定义函数

```js
var f = v => v;

// 等同于
var f = function (v) {
  return v;
};
```

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分

```js
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用`return`语句返回

```js
var sum = (num1, num2) => { return num1 + num2; }
```

如果返回对象，需要加括号将对象包裹

```js
let getTempItem = id => ({ id: id, name: "Temp" });
```

注意点：

- 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象
- 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误
- 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替
- 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数





# 4. 怎么理解ES6新增Set、Map两种数据结构的？

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

## 一、Set

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

## 二、Map

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

## 三、WeakSet 和 WeakMap

我们从前面的 [垃圾回收](https://zh.javascript.info/garbage-collection) 章节中知道，JavaScript 引擎在值“可达”和可能被使用时会将其保持在内存中。

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

让我们来看一个例子。

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







# 5. 你是怎么理解ES6中 Generator的？使用场景？

![img](https://static.vue-js.com/7db499b0-5947-11eb-ab90-d9ae814b240d.png)

## 一、介绍

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同

回顾下上文提到的解决异步的手段：

- 回调函数
- promise

那么，上文我们提到`promsie`已经是一种比较流行的解决异步方案，那么为什么还出现`Generator`？甚至`async/await`呢？

该问题我们留在后面再进行分析，下面先认识下`Generator`

### Generator函数

执行 `Generator` 函数会返回一个遍历器对象，可以依次遍历 `Generator` 函数内部的每一个状态

形式上，`Generator`函数是一个普通函数，但是有两个特征：

- `function`关键字与函数名之间有一个星号
- 函数体内部使用`yield`表达式，定义不同的内部状态

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
```

## 二、使用

`Generator` 函数会返回一个遍历器对象，即具有`Symbol.iterator`属性，并且返回给自己

```javascript
function* gen(){
  // some code
}

var g = gen();

g[Symbol.iterator]() === g
// true
```

通过`yield`关键字可以暂停`generator`函数返回的遍历器对象的状态

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();
```

上述存在三个状态：`hello`、`world`、`return`

通过`next`方法才会遍历到下一个内部状态，其运行逻辑如下：

- 遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。
- 下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式
- 如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。
- 如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`

```javascript
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

`done`用来判断是否存在下个状态，`value`对应状态值

`yield`表达式本身没有返回值，或者说总是返回`undefined`

通过调用`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值

```javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

正因为`Generator`函数返回`Iterator`对象，因此我们还可以通过`for...of`进行遍历

```javascript
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

原生对象没有遍历接口，通过`Generator`函数为它加上这个接口，就能使用`for...of`进行遍历了

```javascript
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

## 三、异步解决方案

回顾之前展开异步解决的方案：

- 回调函数
- Promise 对象
- generator 函数
- async/await

这里通过文件读取案例，将几种解决异步的方案进行一个比较：

### 回调函数

所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，再调用这个函数

```javascript
fs.readFile('/etc/fstab', function (err, data) {
  if (err) throw err;
  console.log(data);
  fs.readFile('/etc/shells', function (err, data) {
    if (err) throw err;
    console.log(data);
  });
});
```

`readFile`函数的第三个参数，就是回调函数，等到操作系统返回了`/etc/passwd`这个文件以后，回调函数才会执行

### Promise

`Promise`就是为了解决回调地狱而产生的，将回调函数的嵌套，改成链式调用

```js
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};


readFile('/etc/fstab').then(data =>{
    console.log(data)
    return readFile('/etc/shells')
}).then(data => {
    console.log(data)
})
```

这种链式操作形式，使异步任务的两段执行更清楚了，但是也存在了很明显的问题，代码变得冗杂了，语义化并不强

### generator

`yield`表达式可以暂停函数执行，`next`方法用于恢复函数执行，这使得`Generator`函数非常适合将异步任务同步化

```javascript
const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

### async/await

将上面`Generator`函数改成`async/await`形式，更为简洁，语义化更强了

```js
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

### 区别：

通过上述代码进行分析，将`promise`、`Generator`、`async/await`进行比较：

- `promise`和`async/await`是专门用于处理异步操作的
- `Generator`并不是为异步而设计出来的，它还有其他功能（对象迭代、控制输出、部署`Interator`接口...）
- `promise`编写代码相比`Generator`、`async`更为复杂化，且可读性也稍差
- `Generator`、`async`需要与`promise`对象搭配处理异步情况
- `async`实质是`Generator`的语法糖，相当于会自动执行`Generator`函数
- `async`使用上更为简洁，将异步代码以同步的形式进行编写，是处理异步编程的最终方案

## 四、使用场景

`Generator`是异步解决的一种方案，最大特点则是将异步操作同步化表达出来

```js
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()

// 卸载UI
loader.next()
```

包括`redux-saga`中间件也充分利用了`Generator`特性

```js
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;
```

还能利用`Generator`函数，在对象上实现`Iterator`接口

```js
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// foo 3
// bar 7
```





# 6. 你是怎么理解ES6中Proxy的？使用场景?

![img](https://static.vue-js.com/6f656e30-59f5-11eb-85f6-6fac77c0c9b3.png)

## 一、介绍

**定义：** 用于定义基本操作的自定义行为

**本质：** 修改的是程序默认形为，就形同于在编程语言层面上做修改，属于元编程`(meta programming)`

元编程（Metaprogramming，又译超编程，是指某类计算机程序的编写，这类计算机程序编写或者操纵其它程序（或者自身）作为它们的数据，或者在运行时完成部分本应在编译时完成的工作

一段代码来理解

```bash
#!/bin/bash
# metaprogram
echo '#!/bin/bash' >program
for ((I=1; I<=1024; I++)) do
    echo "echo $I" >>program
done
chmod +x program
```

这段程序每执行一次能帮我们生成一个名为`program`的文件，文件内容为1024行`echo`，如果我们手动来写1024行代码，效率显然低效

- 元编程优点：与手工编写全部代码相比，程序员可以获得更高的工作效率，或者给与程序更大的灵活度去处理新的情形而无需重新编译

`Proxy` 亦是如此，用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

## 二、用法

`Proxy`为 构造函数，用来生成 `Proxy`实例

```javascript
var proxy = new Proxy(target, handler)
```

### 参数

`target`表示所要拦截的目标对象（任何类型的对象，包括原生数组，函数，甚至另一个代理））

`handler`通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为

### handler解析

关于`handler`拦截属性，有如下：

- get(target,propKey,receiver)：拦截对象属性的读取
- set(target,propKey,value,receiver)：拦截对象属性的设置
- has(target,propKey)：拦截`propKey in proxy`的操作，返回一个布尔值
- deleteProperty(target,propKey)：拦截`delete proxy[propKey]`的操作，返回一个布尔值
- ownKeys(target)：拦截`Object.keys(proxy)`、`for...in`等循环，返回一个数组
- getOwnPropertyDescriptor(target, propKey)：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象
- defineProperty(target, propKey, propDesc)：拦截`Object.defineProperty(proxy, propKey, propDesc）`，返回一个布尔值
- preventExtensions(target)：拦截`Object.preventExtensions(proxy)`，返回一个布尔值
- getPrototypeOf(target)：拦截`Object.getPrototypeOf(proxy)`，返回一个对象
- isExtensible(target)：拦截`Object.isExtensible(proxy)`，返回一个布尔值
- setPrototypeOf(target, proto)：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值
- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作
- construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作

### Reflect

若需要在`Proxy`内部调用对象的默认行为，建议使用`Reflect`，其是`ES6`中操作对象而提供的新 `API`

基本特点：

- 只要`Proxy`对象具有的代理方法，`Reflect`对象全部具有，以静态方法的形式存在
- 修改某些`Object`方法的返回结果，让其变得更合理（定义不存在属性行为的时候不报错而是返回`false`）
- 让`Object`操作都变成函数行为

下面我们介绍`proxy`几种用法：

### get()

`get`接受三个参数，依次为目标对象、属性名和 `proxy` 实例本身，最后一个参数可选

```javascript
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, propKey) {
    return Reflect.get(target,propKey)
  }
});

proxy.name // "张三"
```

`get`能够对数组增删改查进行拦截，下面是试下你数组读取负数的索引

```js
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] // c
```

注意：如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则会报错

```js
const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  },
});

const handler = {
  get(target, propKey) {
    return 'abc';
  }
};

const proxy = new Proxy(target, handler);

proxy.foo
// TypeError: Invariant check failed
```

### set()

`set`方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 `Proxy` 实例本身

假定`Person`对象有一个`age`属性，该属性应该是一个不大于 200 的整数，那么可以使用`Proxy`保证`age`的属性值符合要求

```js
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```

如果目标对象自身的某个属性，不可写且不可配置，那么`set`方法将不起作用

```javascript
const obj = {};
Object.defineProperty(obj, 'foo', {
  value: 'bar',
  writable: false,
});

const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = 'baz';
  }
};

const proxy = new Proxy(obj, handler);
proxy.foo = 'baz';
proxy.foo // "bar"
```

注意，严格模式下，`set`代理如果没有返回`true`，就会报错

```javascript
'use strict';
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
    // 无论有没有下面这一行，都会报错
    return false;
  }
};
const proxy = new Proxy({}, handler);
proxy.foo = 'bar';
// TypeError: 'set' on proxy: trap returned falsish for property 'foo'
```

### deleteProperty()

`deleteProperty`方法用于拦截`delete`操作，如果这个方法抛出错误或者返回`false`，当前属性就无法被`delete`命令删除

```javascript
var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    Reflect.deleteProperty(target,key)
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`无法删除私有属性`);
  }
}

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: 无法删除私有属性
```

注意，目标对象自身的不可配置（configurable）的属性，不能被`deleteProperty`方法删除，否则报错

### 取消代理

```text
Proxy.revocable(target, handler);
```

## 三、使用场景

`Proxy`其功能非常类似于设计模式中的代理模式，常用功能如下：

- 拦截和监视外部对对象的访问
- 降低函数或类的复杂度
- 在复杂操作前对操作进行校验或对所需资源进行管理

使用 `Proxy` 保障数据类型的准确性

```js
let numericDataStore = { count: 0, amount: 1234, total: 14 };
numericDataStore = new Proxy(numericDataStore, {
    set(target, key, value, proxy) {
        if (typeof value !== 'number') {
            throw Error("属性只能是number类型");
        }
        return Reflect.set(target, key, value, proxy);
    }
});

numericDataStore.count = "foo"
// Error: 属性只能是number类型

numericDataStore.count = 333
// 赋值成功
```

声明了一个私有的 `apiKey`，便于 `api` 这个对象内部的方法调用，但不希望从外部也能够访问 `api._apiKey`

```js
let api = {
    _apiKey: '123abc456def',
    getUsers: function(){ },
    getUser: function(userId){ },
    setUser: function(userId, config){ }
};
const RESTRICTED = ['_apiKey'];
api = new Proxy(api, {
    get(target, key, proxy) {
        if(RESTRICTED.indexOf(key) > -1) {
            throw Error(`${key} 不可访问.`);
        } return Reflect.get(target, key, proxy);
    },
    set(target, key, value, proxy) {
        if(RESTRICTED.indexOf(key) > -1) {
            throw Error(`${key} 不可修改`);
        } return Reflect.get(target, key, value, proxy);
    }
});

console.log(api._apiKey)
api._apiKey = '987654321'
// 上述都抛出错误
```

还能通过使用`Proxy`实现观察者模式

观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行

`observable`函数返回一个原始对象的 `Proxy` 代理，拦截赋值操作，触发充当观察者的各个函数

```javascript
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}
```

观察者函数都放进`Set`集合，当修改`obj`的值，在会`set`函数中拦截，自动执行`Set`所有的观察者



# 7. 你是怎么理解javascript中Module的？使用场景？

## CommonJs

`CommonJS` 是一套 `Javascript` 模块规范，用于服务端

```js
// a.js
module.exports={ foo , bar}

// b.js
const { foo,bar } = require('./a.js')
```

其有如下特点：

- 所有代码都运行在模块作用域，不会污染全局作用域
- 模块是同步加载的，即只有加载完成，才能执行后面的操作
- 模块在首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存
- `require`返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值



Node.js 中根据模块来源的不同，将模块分为了 3 大类，分别是： 

* 内置模块（内置模块是由 Node.js 官方提供的，例如 fs、path、http 等）
* 自定义模块（用户创建的每个 .js 文件，都是自定义模块） 
* 第三方模块（由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载）



### 加载模块

> CommonJS的加载方法

使用强大的 require() 方法，可以加载需要的内置模块、用户自定义模块、第三方模块进行使用。例如：


![请添加图片描述](https://img-blog.csdnimg.cn/a67358f77de24a19ba0a6f0658a44b2d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)



> 注意：使用 require() 方法加载其它模块时，会执行被加载模块中的代码。





### 模块作用域

和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做模块 作用域。

![请添加图片描述](https://img-blog.csdnimg.cn/4503f023adf140d694ba9b2666324cc9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)




**好处：**

防止了全局变量污染的问题





### module和module.exports

module模块存储了和当前模块有关的信息


![在这里插入图片描述](https://img-blog.csdnimg.cn/6dd5f0223dea435c9f75d411a010520e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)



**module.exports**

在自定义模块中，可以使用 module.exports 对象，将模块内的成员共享出去，供外界使用。 

外界用 require() 方法导入自定义模块时，得到的就是 module.exports 所指向的对象。



> 使用 require() 方法导入模块时，导入的结果，永远以 module.exports 指向的对象为准。

![在这里插入图片描述](https://img-blog.csdnimg.cn/c08106f05aa044a38397bee668e44710.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)






由于 module.exports 单词写起来比较复杂，为了简化向外共享成员的代码，Node 提供了 exports 对象。默认情况 下，exports 和 module.exports 指向同一个对象。最终共享的结果，还是以 module.exports 指向的对象为准。

![在这里插入图片描述](https://img-blog.csdnimg.cn/645064e0aae24e9d9f6c62df44bdcc58.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)





exports 和 module.exports 的使用误区

![在这里插入图片描述](https://img-blog.csdnimg.cn/ceac321aba184829b820bbb25be0a38d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)


> 注意：为了防止混乱，建议大家不要在同一个模块中同时使用 exports 和 module.exports





### node.js中的模块化规范

Node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了模块的特性和各模块之间如何相互依赖。

CommonJS 规定： 

① 每个模块内部，module 变量代表当前模块。 

② module 变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。 

③ 加载某个模块，其实是加载该模块的 module.exports 属性。require() 方法用于加载模块。





### npm与包

Node.js 中的第三方模块又叫做包。

由于 Node.js 的内置模块仅提供了一些底层的 API，导致在基于内置模块进行项目开发的时，效率很低。 

包是基于内置模块封装出来的，提供了更高级、更方便的 API，极大的提高了开发效率。 包和内置模块之间的关系，类似于 jQuery 和 浏览器内置 API 之间的关系。



基本示例代码：

```js
// 导入 moment包
// 在导包前需要先下载包
const moment = require('moment')

// 调用moment()方法，得到当前时间
// 针对当前的时间，调用format() 方法，按照指定的格式进行时间的格式化
const dt = moment().format('YYYY-MM-DD HH:mm:ss')

console.log(dt);
```



如果想在项目中安装指定名称的包，需要运行如下的命令：

```js
npm i 完整的包名称
```

初次装包完成后，在项目文件夹下多一个叫做 node_modules 的文件夹和 package-lock.json 的配置文件。



**其中：** 

node_modules 文件夹用来存放所有已安装到项目中的包。require() 导入第三方包时，就是从这个目录中查找并加载包。 

package-lock.json 配置文件用来记录 node_modules 目录下的每一个包的下载信息，例如包的名字、版本号、下载地址等。

> 注意：程序员不要手动修改 node_modules 或 package-lock.json 文件中的任何代码，npm 包管理工具会自动维护它们。



**安装指定版本的包**

默认情况下，使用 npm install 命令安装包的时候，会自动安装最新版本的包。如果需要安装指定版本的包，可以在包 名之后，通过 @ 符号指定具体的版本，例如:

```js
npm i moment@2.22.2
```



**包的语义化版本规范**

包的版本号是以“点分十进制”形式进行定义的，总共有三位数字，例如 2.24.0 其中每一位数字所代表的的含义如下： 

第1位数字：大版本 

第2位数字：功能版本 

第3位数字：Bug修复版本

> 版本号提升的规则：只要前面的版本号增长了，则后面的版本号归零。





**包管理配置文件**

npm 规定，在项目根目录中，必须提供一个叫做 package.json 的包管理配置文件。用来记录与项目有关的一些配置 信息。例如：

* 项目的名称、版本号、描述等 
* 项目中都用到了哪些包 
* 哪些包只在开发期间会用到 
* 那些包在开发和部署时都需要用到



在项目根目录中，创建一个叫做 package.json 的配置文件，即可用来记录项目中安装了哪些包。从而方便剔除 node_modules 目录之后，在团队成员之间共享项目的源代码。

> 注意：今后在项目开发中，一定要把 node_modules 文件夹，添加到 .gitignore 忽略文件中。





**快速创建 package.json**



npm 包管理工具提供了一个快捷命令，可以在执行命令时所处的目录中，快速创建 package.json 这个包管理 配置文件：

```js
// 作用：在执行命令所处的目录中，快速新建package.json文件
npm init -y
```

**注意：**

> ① 上述命令只能在英文的目录下成功运行！所以，项目文件夹的名称一定要使用英文命名，不要使用中文，不能出现空格。 
>
> ② 运行 npm install 命令安装包的时候，npm 包管理工具会自动把包的名称和版本号，记录到 package.json 中。





**dependencies 节点**

package.json 文件中，有一个 dependencies 节点，专门用来记录您使用 npm install  命令安装了哪些包。


![在这里插入图片描述](https://img-blog.csdnimg.cn/e5eec838f67a46d9828065a749db8d7c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)




**一次性安装所有的包**

当我们拿到一个剔除了 node_modules 的项目之后，需要先把所有的包下载到项目中，才能将项目运行起来。 否则会报类似于下面的错误：

```js
// 由于项目运行依赖moment这个包，如果没有提前安装好这个包，就会报如下的错误
Error: Cannot find module 'moment'
```



可以运行 npm install 命令（或 npm i）一次性安装所有的依赖包：

```js
// 执行npm install 命令时， npm 包管理工具会先读取 package.json中 dependencies节点，读取到记录的所有依赖包名称和版本号之后，npm包管理工具会把这些包一次性下载到项目中
npm install 
```



**卸载包**

可以运行 npm uninstall 命令，来卸载指定的包：

```js
// 使用npm uninstall 具体的包名 来卸载包
npm uninstall moment
```

> 注意：npm uninstall 命令执行成功后，会把卸载的包，自动从 package.json 的 dependencies 中移除掉





**devDependencies 节点**

如果某些包只在项目开发阶段会用到，在项目上线之后不会用到，则建议把这些包记录到 devDependencies 节点中。 

与之对应的，如果某些包在开发和项目上线之后都需要用到，则建议把这些包记录到 dependencies 节点中。



您可以使用如下的命令，将包记录到 devDependencies 节点中：

```js
// 安装指定的包，并记录到devDenoendencies节点中
npm i 包名 -D
// 注意：上述命令时简写形式，等价于下面完整的写法
npm install 包名 --save-dev
```



**切换 npm 的下包镜像源**

**nrm**

为了更方便的切换下包的镜像源，我们可以安装 nrm 这个小工具，利用 nrm 提供的终端命令，可以快速查看和切换下 包的镜像源。

```js
// 通过 npm 包管理器，将nrm安装为全局可用的工具
npm i nrm -g
// 查看所有镜像源
nrm ls
// 将下包的镜像切换为tapbao镜像
nrm use taobao
```





**包的分类**

使用 npm 包管理工具下载的包，共分为两大类，分别是： 

* 项目包 
* 全局包



**项目包** 那些被安装到项目的 node_modules 目录中的包，都是项目包。

项目包又分为两类，分别是： 

* 开发依赖包（被记录到 devDependencies 节点中的包，只在开发期间会用到） 
* 核心依赖包（被记录到 dependencies 节点中的包，在开发期间和项目上线之后都会用到）

```js
npm i 包名 -D # 开发依赖包
npm i 包名   # 核心依赖包
```



**全局包**

在执行 npm install 命令时，如果提供了 -g 参数，则会把包安装为全局包。 全局包会被安装到 

C:\Users\用户目录\AppData\Roaming\npm\node_modules 目录下。

```js
// 全局安装指定的包
npm i 包名 -g
// 卸载全局安装的包
npm uninstall 包名 -g
```

注意： 

> ① 只有工具性质的包，才有全局安装的必要性。因为它们提供了好用的终端命令。 
>
> ② 判断某个包是否需要全局安装后才能使用，可以参考官方提供的使用说明即可。





**规范的包结构**

在清楚了包的概念、以及如何下载和使用包之后，接下来，我们深入了解一下包的内部结构。

一个规范的包，它的组成结构，必须符合以下 3 点要求： 

① 包必须以单独的目录而存在 

② 包的顶级目录下要必须包含 package.json 这个包管理配置文件 

③ package.json 中必须包含 name，version，main 这三个属性，分别代表包的名字、版本号、包的入口。



### 开发属于自己的包

**初始化包的基本结构**

① 新建 gaohan-tools 文件夹，作为包的根目录 

② 在 gaohan-tools 文件夹中，新建如下三个文件： 

* package.json （包管理配置文件） 
* index.js （包的入口文件） 
* README.md （包的说明文档）



**初始化 package.json**

```json
{
  "name": "gaohan-tools",
  "version": "1.1.0",
  "main": "index.js",
  "description": "提供了格式化时间、HTMLEscape相关的功能",
  "keywords": [
    "itheima",
    "dateFormat",
    "escape"
  ],
  "license": "ISC"
}
```



**模块化拆分**

① 将格式化时间的功能，拆分到 src -> dateFormat.js 中 

② 将处理 HTML 字符串的功能，拆分到 src -> htmlEscape.js 中 

③ 在 index.js 中，导入两个模块，得到需要向外共享的方法 

④ 在 index.js 中，使用 module.exports 把对应的方法共享出去



**日期格式化** dateFormat.js

```js
// 定义格式化时间的函数
function dateFormat(dateStr) {
  const dt = new Date(dateStr)

  const y = dt.getFullYear()
  const m = padZero(dt.getMonth() + 1)
  const d = padZero(dt.getDate())

  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

// 定义一个补零的函数
function padZero(n) {
  return n > 9 ? n : '0' + n
}

module.exports = {
  dateFormat
}
```



**html格式化**  htmlEscape.js

```js
// 定义转义 HTML 字符的函数
function htmlEscape(htmlstr) {
  return htmlstr.replace(/<|>|"|&/g, match => {
    switch (match) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      case '&':
        return '&amp;'
    }
  })
}

// 定义还原 HTML 字符串的函数
function htmlUnEscape(str) {
  return str.replace(/&lt;|&gt;|&quot;|&amp;/g, match => {
    switch (match) {
      case '&lt;':
        return '<'
      case '&gt;':
        return '>'
      case '&quot;':
        return '"'
      case '&amp;':
        return '&'
    }
  })
}

module.exports = {
  htmlEscape,
  htmlUnEscape
}

```





**index.js 是包入口文件**

```js
// 这是包的入口文件

const date = require('./src/dateFormat')
const escape = require('./src/htmlEscape')

// 向外暴露需要的成员
module.exports = {
  ...date,
  ...escape
}
```





**编写包的说明文档**

包根目录中的 README.md 文件，是包的使用说明文档。通过它，我们可以事先把包的使用说明，以 markdown 的 格式写出来，方便用户参考。 

README 文件中具体写什么内容，没有强制性的要求；只要能够清晰地把包的作用、用法、注意事项等描述清楚即可。 

我们所创建的这个包的 README.md 文档中，会包含以下 6 项内容： 

安装方式、导入方式、格式化时间、转义 HTML 中的特殊字符、还原 HTML 中的特殊字符、开源协议



### 发布包

**注册 npm 账号**

① 访问 https://www.npmjs.com/ 网站，点击 sign up 按钮，进入注册用户界面 

② 填写账号相关的信息：Full Name、Public Email、Username、Password 

③ 点击 Create an Account 按钮，注册账号 

④ 登录邮箱，点击验证链接，进行账号的验证



**登录 npm 账号**

npm 账号注册完成后，可以在终端中执行 npm login 命令，依次输入用户名、密码、邮箱后，即可登录成功。

![在这里插入图片描述](https://img-blog.csdnimg.cn/39f183cc03454c189ff52271c13c93dc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)


> 注意：在运行 npm login 命令之前，必须 先把下包的服务器地址切换为 npm 的官方 服务器。否则会导致发布包失败！





**把包发布到 npm 上**

将终端切换到包的根目录之后，运行 npm publish 命令，即可将包发布到 npm 上（注意：包名不能雷同）。





**删除已发布的包**

运行 npm unpublish 包名 --force 命令，即可从 npm 删除已发布的包。

**注意：** 

① npm unpublish 命令只能删除 72 小时以内发布的包 

② npm unpublish 删除的包，在 24 小时内不允许重复发布 

③ 发布包的时候要慎重，尽量不要往 npm 上发布没有意义的包！





### 模块的加载机制

**优先从缓存中加载**

模块在第一次加载后会被缓存。 这也意味着多次调用 require() 不会导致模块的代码被执行多次。

> 注意：不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率。





**内置模块的加载机制**

内置模块是由 Node.js 官方提供的模块，内置模块的加载优先级最高。 

例如，require('fs') 始终返回内置的 fs 模块，即使在 node_modules 目录下有名字相同的包也叫做 fs。





**自定义模块的加载机制**

使用 require() 加载自定义模块时，必须指定以 ./ 或 ../ 开头的路径标识符。在加载自定义模块时，如果没有指定 ./ 或 ../  这样的路径标识符，则 node 会把它当作内置模块或第三方模块进行加载。



同时，在使用 require() 导入自定义模块时，如果省略了文件的扩展名，则 Node.js 会按顺序分别尝试加载以下的文件： 

① 按照确切的文件名进行加载 

② 补全 .js 扩展名进行加载 

③ 补全 .json 扩展名进行加载 

④ 补全 .node 扩展名进行加载 

⑤ 加载失败，终端报错





**第三方模块的加载机制**

如果传递给 require() 的模块标识符不是一个内置模块，也没有以 ‘./’ 或 ‘../’ 开头，则 Node.js 会从当前模块的父 目录开始，尝试从 /node_modules 文件夹中加载第三方模块。

如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。

例如，假设在 'C:\Users\itheima\project\foo.js' 文件里调用了 require('tools')，则 Node.js 会按以下顺序查找：

① C:\Users\itheima\project\node_modules\tools 

② C:\Users\itheima\node_modules\tools 

③ C:\Users\node_modules\tools 

④ C:\node_modules\tools





既然存在了`AMD`以及`CommonJs`机制，`ES6`的`Module`又有什么不一样？

ES6 在语言标准的层面上，实现了`Module`，即模块功能，完全可以取代 `CommonJS`和 `AMD`规范，成为浏览器和服务器通用的模块解决方案

`CommonJS` 和`AMD` 模块，都只能在运行时确定这些东西。比如，`CommonJS`模块就是对象，输入时必须查找对象属性

```javascript
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

`ES6`设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上述代码，只加载3个方法，其他方法不加载，即 `ES6` 可以在编译时就完成模块加载

由于编译加载，使得静态分析成为可能。包括现在流行的`typeScript`也是依靠静态分析实现功能





## ES6 Moudle

`ES6`模块内部自动采用了严格模式，这里就不展开严格模式的限制，毕竟这是`ES5`之前就已经规定好

模块功能主要由两个命令构成：

- `export`：用于规定模块的对外接口
- `import`：用于输入其他模块提供的功能

### export

#### 分别暴露

```js
// 分别暴露模块
export function foo() {
    console.log('foo()');
}

export function bar() {
    console.log('bar()');
}

export let arr = [1, 2, 3, 4, 5]
```

#### 统一暴露

```js
// 统一暴露
function fun() {
    console.log('fun()');
}

function fun2() {
    console.log('fun2()');
}

export { fun, fun2 }
```

#### **默认暴露**

```js
// 默认暴露
export default {
    msg: 'hello......',
    fun: () => {
        console.log('aaaaaaaaaaaaa');
    }
}
```

### import

#### **引入模块**

```js
// 引入其他的模块
// 如果是单个的js文件 引入时要加上后缀
// 引入的是一个npm下载的包，就不需要加后缀
import {foo, bar} from './module1.js'
import {fun, fun2} from './module2.js'
import module3 from './module3.js'
import $ from 'jquery'
import express from 'express'

foo();
bar();
fun();
fun2();
console.log(module3.msg);;
console.log(module3.fun());
```

#### 模块作用域

每个模块都有自己的顶级作用域（top-level scope）。换句话说，一个模块中的顶级作用域变量和函数在其他脚本中是不可见的。

#### 模块代码仅在第一次导入时被解析

如果同一个模块被导入到多个其他位置，那么它的代码只会执行一次，即在第一次被导入时。


#### 在一个模块中，“this” 是 undefined

这是一个小功能，但为了完整性，我们应该提到它。

在一个模块中，顶级 this 是 undefined。

将其与非模块脚本进行比较会发现，非模块脚本的顶级 this 是全局对象：

```js
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

#### Import *

通常，我们把要导入的东西列在花括号 import {...} 中，就像这样：

```js
// 📁 main.js
import {sayHi, sayBye} from './say.js';

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

但是如果有很多要导入的内容，我们可以使用 import * as <obj> 将所有内容导入为一个对象，例如：

```js
// 📁 main.js
import * as say from './say.js';

say.sayHi('John');
say.sayBye('John');
```

乍一看，“通通导入”看起来很酷，写起来也很短，但是我们通常为什么要明确列出我们需要导入的内容？

比如说，我们向我们的项目里添加一个第三方库 say.js，它具有许多函数：
这里有几个原因。

* 现代的构建工具（webpack 和其他工具）将模块打包到一起并对其进行优化，以加快加载速度并删除未使用的代码。
  比如说，我们向我们的项目里添加一个第三方库 say.js，它具有许多函数：

  ```js
  // 📁 say.js
  export function sayHi() { ... }
  export function sayBye() { ... }
  export function becomeSilent() { ... }
  ```

  现在，如果我们只在我们的项目里使用了 say.js 中的一个函数：


  ```js
  // 📁 main.js
  import {sayHi} from './say.js';
  ```

  那么，优化器（optimizer）就会检测到它，并从打包好的代码中删除那些未被使用的函数，从而使构建更小。这就是所谓的“摇树（tree-shaking）”。

* 明确列出要导入的内容会使得名称较短：sayHi() 而不是 say.sayHi()。

* 导入的显式列表可以更好地概述代码结构：使用的内容和位置。它使得代码支持重构，并且重构起来更容易。

> 不用花括号的导入看起来很酷。刚开始使用模块时，一个常见的错误就是忘记写花括号。所以，请记住，import 命名的导出时需要花括号，而 import 默认的导出时不需要花括号。

![在这里插入图片描述](https://img-blog.csdnimg.cn/f5375fa15b484912ae514b64eb232618.png)



## 使用场景

如今，`ES6`模块化已经深入我们日常项目开发中，像`vue`、`react`项目搭建项目，组件化开发处处可见，其也是依赖模块化实现

`vue`组件

```js
<template>
  <div class="App">
      组件化开发 ---- 模块化
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
```

`react`组件

```js
function App() {
  return (
    <div className="App">
		组件化开发 ---- 模块化
    </div>
  );
}

export default App;
```

包括完成一些复杂应用的时候，我们也可以拆分成各个模块





# 8. 你是怎么理解ES6中 Decorator 的？使用场景？

![img](https://static.vue-js.com/7df43560-5ba5-11eb-85f6-6fac77c0c9b3.png)

## 一、介绍

Decorator，即装饰器，从名字上很容易让我们联想到装饰者模式

简单来讲，装饰者模式就是一种在不改变原类和使用继承的情况下，动态地扩展对象功能的设计理论。

`ES6`中`Decorator`功能亦如此，其本质也不是什么高大上的结构，就是一个普通的函数，用于扩展类属性和类方法

这里定义一个士兵，这时候他什么装备都没有

```js
class soldier{ 
}
```

定义一个得到 AK 装备的函数，即装饰器

```js
function strong(target){
    target.AK = true
}
```

使用该装饰器对士兵进行增强

```js
@strong
class soldier{
}
```

这时候士兵就有武器了

```js
soldier.AK // true
```

上述代码虽然简单，但也能够清晰看到了使用`Decorator`两大优点：

- 代码可读性变强了，装饰器命名相当于一个注释
- 在不改变原有代码情况下，对原来功能进行扩展

## 二、用法

`Docorator`修饰对象为下面两种：

- 类的装饰
- 类属性的装饰

### 类的装饰

当对类本身进行装饰的时候，能够接受一个参数，即类本身

将装饰器行为进行分解，大家能够有个更深入的了解

```js
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
```

下面`@testable`就是一个装饰器，`target`就是传入的类，即`MyTestableClass`，实现了为类添加静态属性

```js
@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true
```

如果想要传递参数，可以在装饰器外层再封装一层函数

```js
function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true

@testable(false)
class MyClass {}
MyClass.isTestable // false
```

### 类属性的装饰

当对类属性进行装饰的时候，能够接受三个参数：

- 类的原型对象
- 需要装饰的属性名
- 装饰属性名的描述对象

首先定义一个`readonly`装饰器

```js
function readonly(target, name, descriptor){
  descriptor.writable = false; // 将可写属性设为false
  return descriptor;
}
```

使用`readonly`装饰类的`name`方法

```javascript
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}
```

相当于以下调用

```js
readonly(Person.prototype, 'name', descriptor);
```

如果一个方法有多个装饰器，就像洋葱一样，先从外到内进入，再由内到外执行

```javascript
function dec(id){
    console.log('evaluated', id);
    return (target, property, descriptor) =>console.log('executed', id);
}

class Example {
    @dec(1)
    @dec(2)
    method(){}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1
```

外层装饰器`@dec(1)`先进入，但是内层装饰器`@dec(2)`先执行

### 注意

装饰器不能用于修饰函数，因为函数存在变量声明情况

```js
var counter = 0;

var add = function () {
  counter++;
};

@add
function foo() {
}
```

编译阶段，变成下面

```js
var counter;
var add;

@add
function foo() {
}

counter = 0;

add = function () {
  counter++;
};
```

意图是执行后`counter`等于 1，但是实际上结果是`counter`等于 0

## 三、使用场景

基于`Decorator`强大的作用，我们能够完成各种场景的需求，下面简单列举几种：

使用`react-redux`的时候，如果写成下面这种形式，既不雅观也很麻烦

```js
class MyReactComponent extends React.Component {}

export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);
```

通过装饰器就变得简洁多了

```js
@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}
```

将`mixins`，也可以写成装饰器，让使用更为简洁了

```js
function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}

// 使用
const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // "foo"
```

下面再讲讲`core-decorators.js`几个常见的装饰器

### @antobind

`autobind`装饰器使得方法中的`this`对象，绑定原始对象

```javascript
import { autobind } from 'core-decorators';

class Person {
  @autobind
  getPerson() {
    return this;
  }
}

let person = new Person();
let getPerson = person.getPerson;

getPerson() === person;
// true
```

### @readonly

`readonly`装饰器使得属性或方法不可写

```javascript
import { readonly } from 'core-decorators';

class Meal {
  @readonly
  entree = 'steak';
}

var dinner = new Meal();
dinner.entree = 'salmon';
// Cannot assign to read only property 'entree' of [object Object]
```

### @deprecate

`deprecate`或`deprecated`装饰器在控制台显示一条警告，表示该方法将废除

```javascript
import { deprecate } from 'core-decorators';

class Person {
  @deprecate
  facepalm() {}

  @deprecate('功能废除了')
  facepalmHard() {}
}

let person = new Person();

person.facepalm();
// DEPRECATION Person#facepalm: This function will be removed in future versions.

person.facepalmHard();
// DEPRECATION Person#facepalmHard: 功能废除了
```







# 9. let,var,const 的区别

**（1）块级作用域：** 块作用域由 `{ }`包括，let和const具有块级作用域，var不存在块级作用域。块级作用域解决了ES5中的两个问题：

- 内层变量可能覆盖外层变量
- 用来计数的循环变量泄露为全局变量

**（2）变量提升：** var存在变量提升，let和const不存在变量提升，即在变量只能在声明之后使用，否在会报错。

**（3）给全局添加属性：** 浏览器的全局对象是window，Node的全局对象是global。var声明的变量为全局变量，并且会将该变量添加为全局对象的属性，但是let和const不会。

**（4）重复声明：** var声明变量时，可以重复声明变量，后声明的同名变量会覆盖之前声明的遍历。const和let不允许重复声明变量。

**（5）暂时性死区：** 在使用let、const命令声明变量之前，该变量都是不可用的。这在语法上，称为**暂时性死区**。使用var声明的变量不存在暂时性死区。

**（6）初始值设置：** 在变量声明时，var 和 let 可以不用设置初始值。而const声明变量必须设置初始值。

**（7）指针指向：** let和const都是ES6新增的用于创建变量的语法。 let创建的变量是可以更改指针指向（可以重新赋值）。但const声明的变量是不允许改变指针的指向。

