# 1. javascript中的数据类型

在`JavaScript`中，我们可以分成两种类型：

- 基本类型
- 复杂类型

两种类型的区别是：存储位置不同



## 一、基本类型

基本类型主要为以下6种：

- Number
- String
- Boolean
- Undefined
- null
- symbol

### Number

数值最常见的整数类型格式则为十进制，还可以设置八进制（零开头）、十六进制（0x开头）

```js
let intNum = 55 // 10进制的55
let num1 = 070 // 8进制的56
let hexNum1 = 0xA //16进制的10
```

浮点类型则在数值汇总必须包含小数点，还可通过科学计数法表示

```js
let floatNum1 = 1.1;
let floatNum2 = 0.1;
let floatNum3 = .1; // 有效，但不推荐
let floatNum = 3.125e7; // 等于 31250000
```

在数值类型中，存在一个特殊数值`NaN`，意为“不是数值”，用于表示本来要返回数值的操作失败了（而不是抛出错误）

```js
console.log(0/0); // NaN
console.log(-0/+0); // NaN
```

### Undefined

`Undefined` 类型只有一个值，就是特殊值 `undefined`。当使用 `var`或 `let`声明了变量但没有初始化时，就相当于给变量赋予了 `undefined`值

```js
let message;
console.log(message == undefined); // true
```

包含`undefined` 值的变量跟未定义变量是有区别的

```js
let message; // 这个变量被声明了，只是值为 undefined

console.log(message); // "undefined"
console.log(age); // 没有声明过这个变量，报错
```

### String

字符串可以使用双引号（"）、单引号（'）或反引号（`）标示

```js
let firstName = "John";
let lastName = 'Jacob';
let lastName = `Jingleheimerschmidt`
```

字符串是不可变的，意思是一旦创建，它们的值就不能变了

```js
let lang = "Java";
lang = lang + "Script";  // 先销毁再创建
```

### Null

`Null`类型同样只有一个值，即特殊值 `null`

逻辑上讲， null 值表示一个空对象指针，这也是给`typeof`传一个 `null` 会返回 `"object"` 的原因

```js
let car = null;
console.log(typeof car); // "object"
```

`undefined` 值是由 `null`值派生而来

```js
console.log(null == undefined); // true
```

只要变量要保存对象，而当时又没有那个对象可保存，就可用 `null`来填充该变量

### Boolean

`Boolean`（布尔值）类型有两个字面值： `true` 和`false`

通过`Boolean`可以将其他类型的数据转化成布尔值

规则如下：

```js
数据类型      				转换为 true 的值      				转换为 false 的值
 String        				 非空字符串          					"" 
 Number 				非零数值（包括无穷值）						0 、 NaN 
 Object 					 任意对象 							   null
Undefined 					N/A （不存在） 						undefined
```

### Symbol

Symbol （符号）是原始值，且符号实例是唯一、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险

```js
let genericSymbol = Symbol();
let otherGenericSymbol = Symbol();
console.log(genericSymbol == otherGenericSymbol); // false

let fooSymbol = Symbol('foo');
let otherFooSymbol = Symbol('foo');
console.log(fooSymbol == otherFooSymbol); // false
```




## 二、引用类型

复杂类型统称为`Object`，我们这里主要讲述下面三种：

- Object
- Array
- Function

### Object

创建`object`常用方式为对象字面量表示法，属性名可以是字符串或数值

```js
let person = {
    name: "Nicholas",
    "age": 29,
    5: true
};
```

### Array

`JavaScript`数组是一组有序的数据，但跟其他语言不同的是，数组中每个槽位可以存储任意类型的数据。并且，数组也是动态大小的，会随着数据添加而自动增长

```js
let colors = ["red", 2, {age: 20 }]
colors.push(2)
```

### Function

函数实际上是对象，每个函数都是 `Function`类型的实例，而 `Function`也有属性和方法，跟其他引用类型一样

函数存在三种常见的表达方式：

- 函数声明

```js
// 函数声明
function sum (num1, num2) {
    return num1 + num2;
}
```

- 函数表达式

```js
let sum = function(num1, num2) {
    return num1 + num2;
};
```

- 箭头函数

函数声明和函数表达式两种方式

```js
let sum = (num1, num2) => {
    return num1 + num2;
};
```

### 其他引用类型

除了上述说的三种之外，还包括`Date`、`RegExp`、`Map`、`Set`等......

## 三、存储区别

基本数据类型和引用数据类型存储在内存中的位置不同：

- 基本数据类型存储在栈中
- 引用类型的对象存储于堆中

当我们把变量赋值给一个变量时，解析器首先要确认的就是这个值是基本类型值还是引用类型值

下面来举个例子

### 基本类型

```js
let a = 10;
let b = a; // 赋值操作
b = 20;
console.log(a); // 10值
```

`a`的值为一个基本类型，是存储在栈中，将`a`的值赋给`b`，虽然两个变量的值相等，但是两个变量保存了两个不同的内存地址

下图演示了基本类型赋值的过程：

![img](https://static.vue-js.com/906ffb90-6463-11eb-85f6-6fac77c0c9b3.png)

### 引用类型

```js
var obj1 = {}
var obj2 = obj1;
obj2.name = "Xxx";
console.log(obj1.name); // xxx
```

引用类型数据存放在堆中，每个堆内存对象都有对应的引用地址指向它，引用地址存放在栈中。

`obj1`是一个引用类型，在赋值操作过程汇总，实际是将堆内存对象在栈内存的引用地址复制了一份给了`obj2`，实际上他们共同指向了同一个堆内存对象，所以更改`obj2`会对`obj1`产生影响

下图演示这个引用类型赋值过程

![img](https://static.vue-js.com/a34bdd10-6463-11eb-ab90-d9ae814b240d.png)

### 小结

- 声明变量时不同的内存地址分配：
  - 简单类型的值存放在栈中，在栈中存放的是对应的值
  - 引用类型对应的值存储在堆中，在栈中存放的是指向堆内存的地址
- 不同的类型数据导致赋值变量时的不同：
  - 简单类型赋值，是生成相同的值，两个对象对应不同的地址
  - 复杂类型赋值，是将保存对象的内存地址赋值给另一个变量。也就是两个变量指向堆内存中同一个对象





# 2. 数组的常用方法

![image-20220726122853941](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726122853941.png)

## 一、操作方法

数组基本操作可以归纳为 增、删、改、查，需要留意的是哪些方法会对原数组产生影响，哪些方法不会

下面对数组常用的操作方法做一个归纳

### 增

下面前三种是对原数组产生影响的增添方法，第四种则不会对原数组产生影响

- push()
- unshift()
- splice()
- concat()

#### push()

`push()`方法接收任意数量的参数，并将它们添加到数组末尾，返回数组的最新长度

```js
let colors = []; // 创建一个数组
let count = colors.push("red", "green"); // 推入两项
console.log(count) // 2
```

#### unshift()

unshift()在数组开头添加任意多个值，然后返回新的数组长度

```js
let colors = new Array(); // 创建一个数组
let count = colors.unshift("red", "green"); // 从数组开头推入两项
alert(count); // 2
```

#### splice

传入三个参数，分别是开始位置、0（要删除的元素数量）、插入的元素，返回空数组

```js
let colors = ["red", "green", "blue"];
let removed = colors.splice(1, 0, "yellow", "orange")
console.log(colors) // red,yellow,orange,green,blue
console.log(removed) // []
```

#### concat()

首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组，不会影响原始数组

```js
let colors = ["red", "green", "blue"];
let colors2 = colors.concat("yellow", ["black", "brown"]);
console.log(colors); // ["red", "green","blue"]
console.log(colors2); // ["red", "green", "blue", "yellow", "black", "brown"]
```

### 删

下面三种都会影响原数组，最后一项不影响原数组：

- pop()
- shift()
- splice()
- slice()

#### pop()

`pop()` 方法用于删除数组的最后一项，同时减少数组的`length` 值，返回被删除的项

```js
let colors = ["red", "green"]
let item = colors.pop(); // 取得最后一项
console.log(item) // green
console.log(colors.length) // 1
```

#### shift()

`shift()`方法用于删除数组的第一项，同时减少数组的`length` 值，返回被删除的项

```js
let colors = ["red", "green"]
let item = colors.shift(); // 取得第一项
console.log(item) // red
console.log(colors.length) // 1
```

#### splice()

传入两个参数，分别是开始位置，删除元素的数量，返回包含删除元素的数组

```js
let colors = ["red", "green", "blue"];
let removed = colors.splice(0,1); // 删除第一项
console.log(colors); // green,blue
console.log(removed); // red，只有一个元素的数组
```

#### slice()

slice() 用于创建一个包含原有数组中一个或多个元素的新数组，不会影响原始数组

```js
let colors = ["red", "green", "blue", "yellow", "purple"];
let colors2 = colors.slice(1);
let colors3 = colors.slice(1, 4);
console.log(colors)   // red,green,blue,yellow,purple
concole.log(colors2); // green,blue,yellow,purple
concole.log(colors3); // green,blue,yellow
```

### 改

即修改原来数组的内容，常用`splice`

#### splice()

传入三个参数，分别是开始位置，要删除元素的数量，要插入的任意多个元素，返回删除元素的数组，对原数组产生影响

```js
let colors = ["red", "green", "blue"];
let removed = colors.splice(1, 1, "red", "purple"); // 插入两个值，删除一个元素
console.log(colors); // red,red,purple,blue
console.log(removed); // green，只有一个元素的数组
```

### 查

即查找元素，返回元素坐标或者元素值

- indexOf()
- includes()
- find()

#### indexOf()

返回要查找的元素在数组中的位置，如果没找到则返回 -1

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.indexOf(4) // 3
```

#### includes()

返回要查找的元素在数组中的位置，找到返回`true`，否则`false`

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.includes(4) // true
```

#### find()

返回第一个匹配的元素

```js
const people = [
    {
        name: "Matt",
        age: 27
    },
    {
        name: "Nicholas",
        age: 29
    }
];
people.find((element, index, array) => element.age < 28) // // {name: "Matt", age: 27}
```

## 二、排序方法

数组有两个方法可以用来对元素重新排序：

- reverse()
- sort()

### reverse()

顾名思义，将数组元素方向反转

```js
let values = [1, 2, 3, 4, 5];
values.reverse();
alert(values); // 5,4,3,2,1
```



### sort()

sort()方法接受一个比较函数，用于判断哪个值应该排在前面

```js
function compare(a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
}
let values = [0, 1, 5, 10, 15];
values.sort(compare);
alert(values); // 0,1,5,10,15
```



## 三、转换方法

常见的转换方法有：

### join()

join() 方法接收一个参数，即字符串分隔符，返回包含所有项的字符串

```js
let colors = ["red", "green", "blue"];
alert(colors.join(",")); // red,green,blue
alert(colors.join("||")); // red||green||blue
```

## 四、迭代方法

常用来迭代数组的方法（都不改变原数组）有如下：

- some()
- every()
- forEach()
- filter()
- map()

### some()

对数组每一项都运行传入的测试函数，如果至少有1个元素返回 true ，则这个方法返回 true

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let someResult = numbers.some((item, index, array) => item > 2);
console.log(someResult) // true
```

### every()

对数组每一项都运行传入的测试函数，如果所有元素都返回 true ，则这个方法返回 true

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let everyResult = numbers.every((item, index, array) => item > 2);
console.log(everyResult) // false
```

### forEach()

对数组每一项都运行传入的函数，没有返回值

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.forEach((item, index, array) => {
    // 执行某些操作
});
```

### filter()

对数组每一项都运行传入的函数，函数返回 `true` 的项会组成数组之后返回

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let filterResult = numbers.filter((item, index, array) => item > 2);
console.log(filterResult); // 3,4,5,4,3
```

### map()

对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let mapResult = numbers.map((item, index, array) => item * 2);
console.log(mapResult) // 2,4,6,8,10,8,6,4,2
```





# 3. 字符串常用方法

![image-20220726123002506](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123002506.png)

## 一、操作方法

我们也可将字符串常用的操作方法归纳为增、删、改、查，需要知道字符串的特点是一旦创建了，就不可变

### 增

这里增的意思并不是说直接增添内容，而是创建字符串的一个副本，再进行操作

除了常用`+`以及`${}`进行字符串拼接之外，还可通过`concat`

#### concat

用于将一个或多个字符串拼接成一个新字符串

```js
let stringValue = "hello ";
let result = stringValue.concat("world");
console.log(result); // "hello world"
console.log(stringValue); // "hello"
```

### 删

这里的删的意思并不是说删除原字符串的内容，而是创建字符串的一个副本，再进行操作

常见的有：

- slice()
- substr()
- substring()

这三个方法都返回调用它们的字符串的一个子字符串，而且都接收一或两个参数。

```js
let stringValue = "hello world";
console.log(stringValue.slice(3)); // "lo world"
console.log(stringValue.substring(3)); // "lo world"
console.log(stringValue.substr(3)); // "lo world"
console.log(stringValue.slice(3, 7)); // "lo w"
console.log(stringValue.substring(3,7)); // "lo w"
console.log(stringValue.substr(3, 7)); // "lo worl"
```

### 改

这里改的意思也不是改变原字符串，而是创建字符串的一个副本，再进行操作

常见的有：

- trim()、trimLeft()、trimRight()
- repeat()
- padStart()、padEnd()
- toLowerCase()、 toUpperCase()

#### trim()、trimLeft()、trimRight()

删除前、后或前后所有空格符，再返回新的字符串

```js
let stringValue = " hello world ";
let trimmedStringValue = stringValue.trim();
console.log(stringValue); // " hello world "
console.log(trimmedStringValue); // "hello world"
```

#### repeat()

接收一个整数参数，表示要将字符串复制多少次，然后返回拼接所有副本后的结果

```js
let stringValue = "na ";
let copyResult = stringValue.repeat(2) // na na 
```

#### padEnd()

复制字符串，如果小于指定长度，则在相应一边填充字符，直至满足长度条件

```js
let stringValue = "foo";
console.log(stringValue.padStart(6)); // " foo"
console.log(stringValue.padStart(9, ".")); // "......foo"
```

#### toLowerCase()、 toUpperCase()

大小写转化

```js
let stringValue = "hello world";
console.log(stringValue.toUpperCase()); // "HELLO WORLD"
console.log(stringValue.toLowerCase()); // "hello world"
```

### 查

除了通过索引的方式获取字符串的值，还可通过：

- chatAt()
- indexOf()
- startWith()
- includes()

#### charAt()

返回给定索引位置的字符，由传给方法的整数参数指定

```js
let message = "abcde";
console.log(message.charAt(2)); // "c"
```

#### indexOf()

从字符串开头去搜索传入的字符串，并返回位置（如果没找到，则返回 -1 ）

```js
let stringValue = "hello world";
console.log(stringValue.indexOf("o")); // 4
```

#### startWith()、includes()

从字符串中搜索传入的字符串，并返回一个表示是否包含的布尔值

```js
let message = "foobarbaz";
console.log(message.startsWith("foo")); // true
console.log(message.startsWith("bar")); // false
console.log(message.includes("bar")); // true
console.log(message.includes("qux")); // false
```

## 二、转换方法

### split

把字符串按照指定的分割符，拆分成数组中的每一项

```js
let str = "12+23+34"
let arr = str.split("+") // [12,23,34]
```

## 三、模板匹配方法

针对正则表达式，字符串设计了几个方法：

- match()
- search()
- replace()

### match()

接收一个参数，可以是一个正则表达式字符串，也可以是一个`RegExp`对象，返回数组

```js
let text = "cat, bat, sat, fat";
let pattern = /.at/;
let matches = text.match(pattern);
console.log(matches[0]); // "cat"
```

### search()

接收一个参数，可以是一个正则表达式字符串，也可以是一个`RegExp`对象，找到则返回匹配索引，否则返回 -1

```js
let text = "cat, bat, sat, fat";
let pos = text.search(/at/);
console.log(pos); // 1
```

### replace()

接收两个参数，第一个参数为匹配的内容，第二个参数为替换的元素（可用函数）

```js
let text = "cat, bat, sat, fat";
let result = text.replace("at", "ond");
console.log(result); // "cond, bat, sat, fat"
```





# 4. javascript中的类型转换机制

![image-20220726123044978](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123044978.png)

## 一、概述

前面我们讲到，`JS`中有六种简单数据类型：`undefined`、`null`、`boolean`、`string`、`number`、`symbol`，以及引用类型：`object`

但是我们在声明的时候只有一种数据类型，只有到运行期间才会确定当前类型

```js
let x = y ? 1 : a;
```

上面代码中，`x`的值在编译阶段是无法获取的，只有等到程序运行时才能知道

虽然变量的数据类型是不确定的，但是各种运算符对数据类型是有要求的，如果运算子的类型与预期不符合，就会触发类型转换机制

常见的类型转换有：

- 强制转换（显示转换）
- 自动转换（隐式转换）

## 二、显示转换

显示转换，即我们很清楚可以看到这里发生了类型的转变，常见的方法有：

- Number()
- parseInt()
- String()
- Boolean()

### Number()

将任意类型的值转化为数值

先给出类型转换规则：

![image-20220726123059024](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123059024.png)

实践一下：

```js
Number(324) // 324

// 字符串：如果可以被解析为数值，则转换为相应的数值
Number('324') // 324

// 字符串：如果不可以被解析为数值，返回 NaN
Number('324abc') // NaN

// 空字符串转为0
Number('') // 0

// 布尔值：true 转成 1，false 转成 0
Number(true) // 1
Number(false) // 0

// undefined：转成 NaN
Number(undefined) // NaN

// null：转成0
Number(null) // 0

// 对象：通常转换成NaN(除了只包含单个数值的数组)
Number({a: 1}) // NaN
Number([1, 2, 3]) // NaN
Number([5]) // 5
```

从上面可以看到，`Number`转换的时候是很严格的，只要有一个字符无法转成数值，整个字符串就会被转为`NaN`

### parseInt()

`parseInt`相比`Number`，就没那么严格了，`parseInt`函数逐个解析字符，遇到不能转换的字符就停下来

```js
parseInt('32a3') //32
```

### String()

可以将任意类型的值转化成字符串

给出转换规则图：

![image-20220726123113748](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123113748.png)

实践一下：

```js
// 数值：转为相应的字符串
String(1) // "1"

//字符串：转换后还是原来的值
String("a") // "a"

//布尔值：true转为字符串"true"，false转为字符串"false"
String(true) // "true"

//undefined：转为字符串"undefined"
String(undefined) // "undefined"

//null：转为字符串"null"
String(null) // "null"

//对象
String({a: 1}) // "[object Object]"
String([1, 2, 3]) // "1,2,3"
```

### Boolean()

可以将任意类型的值转为布尔值，转换规则如下：

![image-20220726123124136](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123124136.png)

实践一下：

```js
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean(NaN) // false
Boolean('') // false
Boolean({}) // true
Boolean([]) // true
Boolean(new Boolean(false)) // true
```

## 三、隐式转换

在隐式转换中，我们可能最大的疑惑是 ：何时发生隐式转换？

我们这里可以归纳为两种情况发生隐式转换的场景：

- 比较运算（`==`、`!=`、`>`、`<`）、`if`、`while`需要布尔值地方
- 算术运算（`+`、`-`、`*`、`/`、`%`）

除了上面的场景，还要求运算符两边的操作数不是同一类型

### 自动转换为布尔值

在需要布尔值的地方，就会将非布尔值的参数自动转为布尔值，系统内部会调用`Boolean`函数

可以得出个小结：

- undefined
- null
- false
- +0
- -0
- NaN
- ""

除了上面几种会被转化成`false`，其他都换被转化成`true`

### 自动转换成字符串

遇到预期为字符串的地方，就会将非字符串的值自动转为字符串

具体规则是：先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串

常发生在`+`运算中，一旦存在字符串，则会进行字符串拼接操作

```js
'5' + 1 // '51'
'5' + true // "5true"
'5' + false // "5false"
'5' + {} // "5[object Object]"
'5' + [] // "5"
'5' + function (){} // "5function (){}"
'5' + undefined // "5undefined"
'5' + null // "5null"
```

### 自动转换成数值

除了`+`有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值

> null`转为数值时，值为`0` 。`undefined`转为数值时，值为`NaN



# 5. == 和 === 的区别，分别在什么情况下使用

## 一、等于操作符

等于操作符用两个等于号（ == ）表示，如果操作数相等，则会返回 `true`

前面文章，我们提到在`JavaScript`中存在隐式转换。等于操作符（==）在比较中会先进行类型转换，再确定操作数是否相等

遵循以下规则：

如果任一操作数是布尔值，则将其转换为数值再比较是否相等

```js
let result1 = (true == 1); // true
```

如果一个操作数是字符串，另一个操作数是数值，则尝试将字符串转换为数值，再比较是否相等

```js
let result1 = ("55" == 55); // true
```

如果一个操作数是对象，另一个操作数不是，则调用对象的 `valueOf()`方法取得其原始值，再根据前面的规则进行比较

```js
let obj = {valueOf:function(){return 1}}
let result1 = (obj == 1); // true
```

`null`和`undefined`相等

```js
let result1 = (null == undefined ); // true
```

如果有任一操作数是 `NaN` ，则相等操作符返回 `false`

```js
let result1 = (NaN == NaN ); // false
```

如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回`true`

```js
let obj1 = {name:"xxx"}
let obj2 = {name:"xxx"}
let result1 = (obj1 == obj2 ); // false
```

下面进一步做个小结：

- 两个都为简单类型，字符串和布尔值都会转换成数值，再比较
- 简单类型与引用类型比较，对象转化成其原始类型的值，再比较
- 两个都为引用类型，则比较它们是否指向同一个对象
- null 和 undefined 相等
- 存在 NaN 则返回 false

## 二、全等操作符

全等操作符由 3 个等于号（ === ）表示，只有两个操作数在不转换的前提下相等才返回 `true`。即类型相同，值也需相同

```js
let result1 = ("55" === 55); // false，不相等，因为数据类型不同
let result2 = (55 === 55); // true，相等，因为数据类型相同值也相同
```

`undefined` 和 `null` 与自身严格相等

```js
let result1 = (null === null)  //true
let result2 = (undefined === undefined)  //true
```

## 三、区别

相等操作符（==）会做类型转换，再进行值的比较，全等运算符不会做类型转换

```js
let result1 = ("55" === 55); // false，不相等，因为数据类型不同
let result2 = (55 === 55); // true，相等，因为数据类型相同值也相同
```

```js
null` 和 `undefined` 比较，相等操作符（==）为`true`，全等为`false
let result1 = (null == undefined ); // true
let result2 = (null  === undefined); // false
```

### 小结

相等运算符隐藏的类型转换，会带来一些违反直觉的结果

```js
'' == '0' // false
0 == '' // true
0 == '0' // true

false == 'false' // false
false == '0' // true

false == undefined // false
false == null // false
null == undefined // true

' \t\r\n' == 0 // true
```

但在比较`null`的情况的时候，我们一般使用相等操作符`==`

```js
const obj = {};

if(obj.x == null){
  console.log("1");  //执行
}
```

等同于下面写法

```js
if(obj.x === null || obj.x === undefined) {
    ...
}
```

使用相等操作符（==）的写法明显更加简洁了

所以，除了在比较对象属性为`null`或者`undefined`的情况下，我们可以使用相等操作符（==），其他情况建议一律使用全等操作符（===）





# 6. 深拷贝和浅拷贝的区别，完成一个深拷贝

## 一、数据类型存储

前面文章我们讲到，`JavaScript`中存在两大数据类型：

- 基本类型
- 引用类型

基本类型数据保存在在栈内存中

引用类型数据保存在堆内存中，引用数据类型的变量是一个指向堆内存中实际对象的引用，存在栈中

## 二、浅拷贝

浅拷贝，指的是创建新的数据，这个数据有着原始数据属性值的一份精确拷贝

如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址

即浅拷贝是拷贝一层，深层次的引用类型则共享内存地址

下面简单实现一个浅拷贝

```js
function shallowClone(obj) {
    const newObj = {};
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop)){
            newObj[prop] = obj[prop];
        }
    }
    return newObj;
}
```

在`JavaScript`中，存在浅拷贝的现象有（内部属性是浅拷贝的）：

- `Object.assign`
- `Array.prototype.slice()`, `Array.prototype.concat()`
- 使用拓展运算符实现的复制

> 下面的案例其实不好，在对象中，浅拷贝的现象是出现在内部属性中的。

### Object.assign

```js
var obj = {
    age: 18,
    nature: ['smart', 'good'],
    names: {
        name1: 'fx',
        name2: 'xka'
    },
    love: function () {
        console.log('fx is a great girl')
    }
}
var newObj = Object.assign({}, Obj);
```

### slice()

```js
const fxArr = ["One", "Two", "Three"]
const fxArrs = fxArr.slice(0)
fxArrs[1] = "love";
console.log(fxArr) // ["One", "Two", "Three"]
console.log(fxArrs) // ["One", "love", "Three"]
```

### concat()

```js
const fxArr = ["One", "Two", "Three"]
const fxArrs = fxArr.concat()
fxArrs[1] = "love";
console.log(fxArr) // ["One", "Two", "Three"]
console.log(fxArrs) // ["One", "love", "Three"]
```

### 拓展运算符

```js
const fxArr = ["One", "Two", "Three"]
const fxArrs = [...fxArr]
fxArrs[1] = "love";
console.log(fxArr) // ["One", "Two", "Three"]
console.log(fxArrs) // ["One", "love", "Three"]
```

## 三、深拷贝

深拷贝开辟一个新的栈，两个对象属完成相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性

常见的深拷贝方式有：

- _.cloneDeep()
- jQuery.extend()
- JSON.stringify()
- 手写循环递归

### _.cloneDeep()

```js
const _ = require('lodash');
const obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
const obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);// false
```

### jQuery.extend()

```js
const $ = require('jquery');
const obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
const obj2 = $.extend(true, {}, obj1);
console.log(obj1.b.f === obj2.b.f); // false
```

### JSON.stringify()

```js
const obj2=JSON.parse(JSON.stringify(obj1));
```

但是这种方式存在弊端，会忽略`undefined`、`symbol`和`函数`

```js
const obj = {
    name: 'A',
    name1: undefined,
    name3: function() {},
    name4:  Symbol('A')
}
const obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj2); // {name: "A"}
```

### (TODO)循环递归（需要复习下 weakMap的知识）

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
```

## 四、区别

下面首先借助两张图，可以更加清晰看到浅拷贝与深拷贝的区别

![image-20220726123229941](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123229941.png)

从上图发现，浅拷贝和深拷贝都创建出一个新的对象，但在复制对象属性的时候，行为就不一样

浅拷贝只复制属性指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存，修改对象属性会影响原对象

```js
// 浅拷贝
const obj1 = {
    name : 'init',
    arr : [1,[2,3],4],
};
const obj3=shallowClone(obj1) // 一个浅拷贝方法
obj3.name = "update";
obj3.arr[1] = [5,6,7] ; // 新旧对象还是共享同一块内存

console.log('obj1',obj1) // obj1 { name: 'init',  arr: [ 1, [ 5, 6, 7 ], 4 ] }
console.log('obj3',obj3) // obj3 { name: 'update', arr: [ 1, [ 5, 6, 7 ], 4 ] }
```

但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象

```js
// 深拷贝
const obj1 = {
    name : 'init',
    arr : [1,[2,3],4],
};
const obj4=deepClone(obj1) // 一个深拷贝方法
obj4.name = "update";
obj4.arr[1] = [5,6,7] ; // 新对象跟原对象不共享内存

console.log('obj1',obj1) // obj1 { name: 'init', arr: [ 1, [ 2, 3 ], 4 ] }
console.log('obj4',obj4) // obj4 { name: 'update', arr: [ 1, [ 5, 6, 7 ], 4 ] }
```

### 小结

前提为拷贝类型为引用类型的情况下：

- 浅拷贝是拷贝一层，属性为对象时，浅拷贝是复制，两个对象指向同一个地址
- 深拷贝是递归拷贝深层次，属性为对象时，深拷贝是新开栈，两个对象指向不同的地址







# (*)7. 对闭包的理解，闭包的使用场景

## 一、是什么

当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包。 

在 `JavaScript`中，每当创建一个函数，闭包就会在函数创建的同时被创建出来，作为函数内部与外部连接起来的一座桥梁

下面给出一个简单的例子

```js
function foo() {
    var a = 2;
    function bar() { 
        console.log(a);
    }
    bar();
}
foo();
```

基于词法作用域的查找规则，函数bar() 可以访问外部作用域中的变量 a（这个例子中的是一个 RHS 引用查询）

这是闭包吗？ 

技术上来讲，也许是。但根据前面的定义，确切地说并不是。我认为最准确地用来解释 bar() 对 a 的引用的方法是词法作用域的查找规则，而这些规则只是闭包的一部分。（但却是非常重要的一部分！） 

从纯学术的角度说，在上面的代码片段中，函数 bar() 具有一个涵盖 foo() 作用域的闭包（事实上，涵盖了它能访问的所有作用域，比如全局作用域）。也可以认为 bar() 被封闭在 了 foo() 的作用域中。为什么呢？原因简单明了，因为 bar() 嵌套在 foo() 内部。

但是通过这种方式定义的闭包并不能直接进行观察，也无法明白在这个代码片段中闭包是如何工作的。我们可以很容易地理解词法作用域，而闭包则隐藏在代码之后的神秘阴影里，并不那么容易理解。

下面我们来看一段代码，清晰地展示了闭包：

```js
function foo() {
    var a = 2;
    function bar() {
        console.log(a);
    }
    return bar;
}
var baz = foo();
baz(); // 2 这就是闭包的效果
```

函数 bar() 的词法作用域能够访问 foo() 的内部作用域。然后我们将 bar() 函数本身当作一个值类型进行传递。在这个例子中，我们将 bar 所引用的函数对象本身当作返回值。

在 foo() 执行后，其返回值（也就是内部的 bar() 函数）赋值给变量 baz 并调用 baz()，实际上只是通过不同的标识符引用调用了内部的函数 bar()。bar() 显然可以被正常执行。但是在这个例子中，它在自己定义的词法作用域以外的地方执行。在 foo() 执行后，通常会期待 foo() 的整个内部作用域都被销毁，因为我们知道引擎有垃圾回收器用来释放不再使用的内存空间。由于看上去 foo() 的内容不会再被使用，所以很自然地会考虑对其进行回收。

而闭包的“神奇”之处正是可以阻止这件事情的发生。事实上内部作用域依然存在，因此没有被回收。谁在使用这个内部作用域？原来是 bar() 本身在使用。

拜 bar() 所声明的位置所赐，它拥有涵盖 foo() 内部作用域的闭包，使得该作用域能够一直存活，以供 bar() 在之后任何时间进行引用。 

bar() 依然持有对该作用域的引用，而这个引用就叫作闭包。

因此，在几微秒之后变量 baz 被实际调用（调用内部函数 bar），不出意料它可以访问定义时的词法作用域，因此它也可以如预期般访问变量 a。 

这个函数在定义时的词法作用域以外的地方被调用。闭包使得函数可以继续访问定义时的词法作用域。 

当然，无论使用何种方式对函数类型的值进行传递，当函数在别处被调用时都可以观察到闭包。

```js
function foo() {
    var a = 2;
    function baz() {
        console.log(a); // 2
    }
    bar(baz);
}
function bar(fn) {
    fn(); // 这就是闭包
}
```

把内部函数 baz 传递给 bar，当调用这个内部函数时（现在叫作 fn），它涵盖的 foo() 内部作用域的闭包就可以观察到了，因为它能够访问 a。 

传递函数当然也可以是间接的。

```js
var fn;
function foo() {
    var a = 2;
    function baz() {
        console.log(a);
    }
    fn = baz; // 将baz分配给全局变量
}
function bar() {
    fn(); // 这就是闭包
}
foo();
bar(); // 2
```

无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。

 

## 二、使用场景

前面的代码片段有点死板，并且为了解释如何使用闭包而人为地在结构上进行了修饰。但我保证闭包绝不仅仅是一个好玩的玩具。你已经写过的代码中一定到处都是闭包的身影。 现在让我们来搞懂这个事实。

```js
function wait(message) {
    setTimeout(function timer() {
        console.log(message)
    }, 1000);
}
wait('hello, closure!');
```

将一个内部函数（名为 timer）传递给 setTimeout(..)。timer 具有涵盖 wait(..) 作用域的闭包，因此还保有对变量 message 的引用。

wait(..) 执行 1000 毫秒后，它的内部作用域并不会消失，timer 函数依然保有 wait(..) 作用域的闭包。 

深入到引擎的内部原理中，内置的工具函数 setTimeout(..) 持有对一个参数的引用，这个参数也许叫作 fn 或者 func，或者其他类似的名字。引擎会调用这个函数，在例子中就是内部的 timer 函数，而词法作用域在这个过程中保持完整。

这就是闭包。

或者，如果你很熟悉 jQuery（或者其他能说明这个问题的 JavaScript 框架），可以思考下面的代码：

```js
function setupBot(name, selector) {
    $(selector).click(function activator() {
        console.log('Activating:' + name)
    });
}
setupBot('Closure Bot 1', '#bot_1');
setupBot('Closure Bot 2', '#bot_2');
```

本质上无论何时何地，如果将函数（访问它们各自的词法作用域）当作第一级的值类型并到处传递，你就会看到闭包在这些函数中的应用。在定时器、事件监听器、 Ajax 请求、跨窗口通信、Web Workers 或者任何其他的异步（或者同步）任务中，只要使用了回调函数，实际上就是在使用闭包！

之前介绍了 IIFE 模式。通常认为 IIFE 是典型的闭包例子，但根据先前对闭包的定义，我并不是很同意这个观点。

```js
var a = 2;
(function IIFE() {
    console.log(a);
})();
```

虽然这段代码可以正常工作，但严格来讲它并不是闭包。为什么？因为函数（示例代码中的 IIFE）并不是在它本身的词法作用域以外执行的。它在定义时所在的作用域中执行（而外部作用域，也就是全局作用域也持有 a）。a 是通过普通的词法作用域查找而非闭包被发现的。

尽管 IIFE 本身并不是观察闭包的恰当例子，但它的确创建了闭包，并且也是最常用来创建可以被封闭起来的闭包的工具。因此 IIFE 的确同闭包息息相关，即使本身并不会真的使用闭包。 

要说明闭包，for 循环是最常见的例子。

```js
for(var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i);
    }, 1000 * i);
}
```

由于很多开发者对闭包的概念认识得并不是很清楚，因此当循环内部包含函数定义时，代码格式检查器经常发出警告。我们在这里介绍如何才能正确地使用闭包并发挥它的威力，但是代码格式检查器并没有那么灵敏，它会假设你并不真正了解自己在做什么，所以无论如何都会发出警告。

正常情况下，我们对这段代码行为的预期是分别输出数字 1~5，每秒一次，每次一个。 

但实际上，这段代码在运行时会以每秒一次的频率输出五次 6。

这是为什么？ 

首先解释 6 是从哪里来的。这个循环的终止条件是 i 不再 <=5。条件首次成立时 i 的值是 6。因此，输出显示的是循环结束时 i 的最终值。 

仔细想一下，这好像又是显而易见的，延迟函数的回调会在循环结束时才执行。事实上， 当定时器运行时即使每个迭代中执行的是 setTimeout(.., 0)，所有的回调函数依然是在循环结束后才会被执行，因此会每次输出一个 6 出来。 

这里引伸出一个更深入的问题，代码中到底有什么缺陷导致它的行为同语义所暗示的不一致呢？

缺陷是我们试图假设循环中的每个迭代在运行时都会给自己“捕获”一个 i 的副本。但是根据作用域的工作原理，实际情况是尽管循环中的五个函数是在各个迭代中分别定义的，但是它们都被封闭在一个共享的全局作用域中，因此实际上只有一个 i。

这样说的话，当然所有函数共享一个 i 的引用。循环结构让我们误以为背后还有更复杂的机制在起作用，但实际上没有。如果将延迟函数的回调重复定义五次，完全不使用循环， 那它同这段代码是完全等价的。 

下面回到正题。缺陷是什么？我们需要更多的闭包作用域，特别是在循环的过程中每个迭代都需要一个闭包作用域。

之间介绍过，IIFE 会通过声明并立即执行一个函数来创建作用域。

我们来试一下：

```js
for (var i = 1; i <= 5; i++) {
  (function () {
    setTimeout(function timer() {
      console.log(i);
    }, 1000 * i);
  })();
}
```

这样能行吗？试试吧，我等着你。

我不卖关子了。这样不行。但是为什么呢？我们现在显然拥有更多的词法作用域了。的确每个延迟函数都会将 IIFE 在每次迭代中创建的作用域封闭起来。

如果作用域是空的，那么仅仅将它们进行封闭是不够的。仔细看一下，我们的 IIFE 只是一个什么都没有的空作用域。它需要包含一点实质内容才能为我们所用。

它需要有自己的变量，用来在每个迭代中储存 i 的值：

```js
for(var i = 1; i <= 5; i++) {
    (function() {
        var j = i;
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000)
    })();
}
```

行了！它能正常工作了！。

可以对这段代码进行一些改进：

```js
for(var i = 1; i <= 5; i++) {
    (function(j) {
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000)
    })(i);
}
```

当然，这些 IIFE 也不过就是函数，因此我们可以将 i 传递进去，如果愿意的话可以将变量名定为 j，当然也可以还叫作 i。无论如何这段代码现在可以工作了。

在迭代内使用 IIFE 会为每个迭代都生成一个新的作用域，使得延迟函数的回调可以将新的作用域封闭在每个迭代内部，每个迭代中都会含有一个具有正确值的变量供我们访问。



### 重返块作用域

仔细思考我们对前面的解决方案的分析。我们使用 IIFE 在每次迭代时都创建一个新的作用域。换句话说，每次迭代我们都需要一个块作用域。之前介绍了 let 声明，可以用来 **劫持** 块作用域，并且在这个块作用域中声明一个变量。

本质上这是将一个块转换成一个可以被关闭的作用域。因此，下面这些看起来很酷的代码就可以正常运行了：

```js
for (var i = 1; i <= 5; i++) {
  let j = i;
  setTimeout(function timer() {
    console.log(j);
  }, 1000 * j);
}
```

但是，这还不是全部！for 循环头部的 let 声明还会有一个特殊的行为。这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明。随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量。

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, 1000 * i);
}
```





### 模块

还有其他的代码模式利用闭包的强大威力，但从表面上看，它们似乎与回调无关。下面一起来研究其中最强大的一个：模块。

```js
function foo() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join("!"));
  }
}
```

正如在这段代码中所看到的，这里并没有明显的闭包，只有两个私有数据变量 something 和 another，以及 doSomething() 和 doAnother() 两个内部函数，它们的词法作用域（而这就是闭包）也就是 foo() 的内部作用域。 

接下来考虑以下代码：

```js
function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join("!"));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  }
}

var foo = CoolModule();
foo.doSomething();
foo.doAnother();
```

这个模式在 JavaScript 中被称为模块。最常见的实现模块模式的方法通常被称为模块暴露，这里展示的是其变体。

我们仔细研究一下这些代码。

首先，CoolModule() 只是一个函数，必须要通过调用它来创建一个模块实例。如果不执行外部函数，内部作用域和闭包都无法被创建。

其次，CoolModule() 返回一个用对象字面量语法 { key: value, ... } 来表示的对象。这个返回的对象中含有对内部函数而不是内部数据变量的引用。我们保持内部数据变量是隐藏且私有的状态。可以将这个对象类型的返回值看作本质上是模块的公共 API。

这个对象类型的返回值最终被赋值给外部的变量 foo，然后就可以通过它来访问 API 中的属性方法，比如 foo.doSomething()。 

> 从模块中返回一个实际的对象并不是必须的，也可以直接返回一个内部函数。jQuery 就是一个很好的例子。jQuery 和 $ 标识符就是 jQuery 模块的公 
>
> 共 API，但它们本身都是函数（由于函数也是对象，它们本身也可以拥有属性）。 

doSomething() 和 doAnother() 函数具有涵盖模块实例内部作用域的闭包（通过调用 CoolModule() 实现）。当通过返回一个含有属性引用的对象的方式来将函数传递到词法作用域外部时，我们已经创造了可以观察和实践闭包的条件。 

如果要更简单的描述，模块模式需要具备两个必要条件。



1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）。 

2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。 



上一个示例代码中有一个叫作 CoolModule() 的独立的模块创建器，可以被调用任意多次， 每次调用都会创建一个新的模块实例。当只需要一个实例时，可以对这个模式进行简单的改进来实现单例模式：

```js
var foo = (function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join("!"));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  }
})();


foo.doSomething();
foo.doAnother();
```

我们将模块函数转换成了 IIFE，立即调用这个函数并将返回值直接赋值给单例的模块实例标识符 foo。

模块也是普通的函数，因此可以接受参数：

```js
function CoolModule(id) {

  function identify() {
    console.log(id);
  }

  return {
    identify: identify
  };
}

var foo1 = CoolModule(1);
var foo2 = CoolModule(2);

foo1.identify(); // 1
foo2.identify(); // 2
```

模块模式另一个简单但强大的变化用法是，命名将要作为公共 API 返回的对象：

```js
var foo = (function CoolModule(id) {
  
  function identify1() {
    console.log(id);
  }

  function identify2() {
    console.log(id.toUpperCase());
  }

  function change() {
    publicAPI.identify = identify2;
  }

  var publicAPI = {
    change: change,
    identify: identify1,
  }

  return publicAPI;
})(' foo module');

foo.identify();
foo.change();
foo.identify();


```

通过在模块实例的内部保留对公共 API 对象的内部引用，可以从内部对模块实例进行修改，包括添加或删除方法和属性，以及修改它们的值。 





任何闭包的使用场景都离不开这两点：

- 创建私有变量
- 延长变量的生命周期

> 一般函数的词法环境在函数返回后就被销毁，但是闭包会保存对创建时所在词法环境的引用，即便创建时所在的执行上下文被销毁，但创建时所在词法环境依然存在，以达到延长变量的生命周期的目的

### 柯里化函数

柯里化的目的在于避免频繁调用具有相同参数函数的同时，又能够轻松的重用

```js
// 假设我们有一个求长方形面积的函数
function getArea(width, height) {
    return width * height
}
// 如果我们碰到的长方形的宽老是10
const area1 = getArea(10, 20)
const area2 = getArea(10, 30)
const area3 = getArea(10, 40)

// 我们可以使用闭包柯里化这个计算面积的函数
function getArea(width) {
    return height => {
        return width * height
    }
}

const getTenWidthArea = getArea(10)
// 之后碰到宽度为10的长方形就可以这样计算面积
const area1 = getTenWidthArea(20)

// 而且如果遇到宽度偶尔变化也可以轻松复用
const getTwentyWidthArea = getArea(20)
```

### 使用闭包模拟私有方法

在`JavaScript`中，没有支持声明私有变量，但我们可以使用闭包来模拟私有方法

下面举个例子：

```js
var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
})();

var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /* logs 2 */
Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
console.log(Counter2.value()); /* logs 0 */
```

上述通过使用闭包来定义公共函数，并令其可以访问私有函数和变量，这种方式也叫模块方式

两个计数器 `Counter1` 和 `Counter2` 是维护它们各自的独立性的，每次调用其中一个计数器时，通过改变这个变量的值，会改变这个闭包的词法环境，不会影响另一个闭包中的变量

### 其他

例如计数器、延迟调用、回调等闭包的应用，其核心思想还是创建私有变量和延长变量的生命周期

## 三、注意事项

如果不是某些特定任务需要使用闭包，在其它函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响

例如，在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。

原因在于每个对象的创建，方法都会被重新赋值

```js
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function() {
    return this.name;
  };

  this.getMessage = function() {
    return this.message;
  };
}
```

上面的代码中，我们并没有利用到闭包的好处，因此可以避免使用闭包。修改成如下：

```js
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype.getName = function() {
  return this.name;
};
MyObject.prototype.getMessage = function() {
  return this.message;
};
```





# 8. 对作用域的理解

## 一、作用域

作用域是一套规则，用于确定在何处以及如何查找变量(标识符)。如果查找的目的是对变量进行赋值，那么就会使用LHS查询;

如果目的是获取变量的值，就会使用RHS查询。

赋值操作符会导致LHS查询。= 操作符 或 调用函数时传入参数的操作都会导致关联作用域的赋值操作。

JavaScript引擎首先会在代码执行前对其进行编译，在这个过程中，像var a = 2这样的声明会被分解成两个独立的步骤:

* 首先，var a 在其作用域中声明新变量。这会在最开始的阶段，也就是代码执行前进行。
* 接下来，a = 2 会查询(LHS查询) 变量a并对其进行赋值。

LHS 和 RHS 查询都会在当前执行作用域中开始，如果有需要(也就是说它们没有找到所需的标识符)，就会向上级作用域继续查找目标标识符，这样每次上升一级作用域(一层楼)，最后抵达全局作用域(顶层)， 无论找到或没找到都将停止。

不成功的 RHS 引用会导致抛出 ReferenceError 异常。不成功的LHS引用会导致自动隐式地创建一一个全局变量(非严格模式下)，该变量使用LHS引用的目标作为标识符，或者拋出ReferenceError异常(严格模式下)。

### LHS 查询 和 RHS 查询

我打赌你一-定能猜到“L”和“R”的含义，它们分别代表左侧和右侧。

什么东西的左侧和右侧？是一个赋值操作的左侧和右侧。

换句话说，当变量出现在赋值操作的左侧时进行LHS查询，出现在右侧时进行RHS查询。

讲得更准确一点，RHS查询与简单地查找某个变量的值别无二致，而LHS查询则是试图找到变量的容器本身，从而可以对其赋值。

从这个角度说，RHS并不是真正意义上的“赋值操作的右侧”，更准确地说是“非左侧”。

你可以将RHS理解成retrieve his source value ( 取到它的源值)，这意味着“得到某某的值”。

考虑以下代码：

`console.log(a);`

其中对a的引用是一个RHS引用，因为这里a并没有赋予任何值。相应地，需要查找并取得a的值，这样才能将值传递给console.log(..)。

相比之下，例如：

`a = 2;`

这里对a的引用则是LHS引用，因为实际上我们并不关心当前的值是什么，只是想要为 =2 这个赋值操作找到一个目标。

> LHS和RHS的含义是  “ 赋值操作的左侧或右侧”  并不一定意味着就是 “ = 赋值操作符的左侧或右侧”  。
>
> 赋值操作还有其他几种形式，因此在概念上最好将其理解为  “赋值操作的目标是谁(LHS)”   以及    “谁是赋值操作的源头(RHS)”。



```js
function myFunction() {
    let inVariable = "函数内部变量";
}
myFunction();//要先执行这个函数，否则根本不知道里面是啥
console.log(inVariable); // Uncaught ReferenceError: inVariable is not defined
```

上述例子中，函数`myFunction`内部创建一个`inVariable`变量，当我们在全局访问这个变量的时候，系统会报错

这就说明我们在全局是无法获取到（闭包除外）函数内部的变量

我们一般将作用域分成：

- 全局作用域
- 函数作用域
- 块级作用域

### 全局作用域

任何不在函数中或是大括号中声明的变量，都是在全局作用域下，全局作用域下声明的变量可以在程序的任意位置访问

```js
// 全局变量
var greeting = 'Hello World!';
function greet() {
  console.log(greeting);
}
// 打印 'Hello World!'
greet();
```

### 函数作用域

函数作用域也叫局部作用域，如果一个变量是在函数内部声明的它就在一个函数作用域下面。这些变量只能在函数内部访问，不能在函数以外去访问

```js
function greet() {
  var greeting = 'Hello World!';
  console.log(greeting);
}
// 打印 'Hello World!'
greet();
// 报错： Uncaught ReferenceError: greeting is not defined
console.log(greeting);
```

可见上述代码中在函数内部声明的变量或函数，在函数外部是无法访问的，这说明在函数内部定义的变量或者方法只是函数作用域

> tips: 你不知道的JavaScript

对函数的传统认知就是先声明一个函数，然后再向里面添加代码。但反过来想也可以带来 一些启示：从所写的代码中挑选出一个任意的片段，然后用函数声明对它进行包装，实际 上就是把这些代码“隐藏”起来了。

实际的结果就是在这个代码片段的周围创建了一个作用域气泡，也就是说这段代码中的任 何声明（变量或函数）都将绑定在这个新创建的包装函数的作用域中，而不是先前所在的 作用域中。换句话说，可以把变量和函数包裹在一个函数的作用域中，然后用这个作用域 来“隐藏”它们。

**为什么“隐藏”变量和函数是一个有用的技术？**

> 有很多原因促成了这种基于作用域的隐藏方法。它们大都是从最小特权原则中引申出来 的，也叫最小授权或最小暴露原则。这个原则是指在软件设计中，应
>
> 该最小限度地暴露必 要内容，而将其他内容都“隐藏”起来，比如某个模块或对象的 API 设计。

这个原则可以延伸到如何选择作用域来包含变量和函数。如果所有变量和函数都在全局作 用域中，当然可以在所有的内部嵌套作用域中访问到它们。但这样会破坏前面提到的最小 特权原则，因为可能会暴漏过多的变量或函数，而这些变量或函数本应该是私有的，正确 的代码应该是可以阻止对这些变量或函数进行访问的。

例如：

```javascript
function doSomething(a) { 
    b = a + doSomethingElse( a * 2 ); 
    console.log( b * 3 ); 
}
function doSomethingElse(a) {
    return a - 1; 
}
var b; 
doSomething( 2 ); // 15
```

在这个代码片段中，变量 b 和函数 doSomethingElse(..) 应该是 doSomething(..) 内部具体 实现的“私有”内容。给予外部作用域对 b 和 doSomethingElse(..) 的   “访问权限”   不仅 没有必要，而且可能是“危险”的，因为它们可能被有意或无意地以非预期的方式使用， 从而导致超出了 doSomething(..) 的适用条件。更“合理”的设计会将这些私有的具体内 容隐藏在 doSomething(..) 内部，例如：

```javascript
function doSomething(a) {
	function doSomethingElse(a) {
		return a - 1; 
   	}
    var b; 
    b = a + doSomethingElse( a * 2 ); 
    console.log( b * 3 ); 
}
doSomething( 2 ); // 15
```

现在，b 和 doSomethingElse(..) 都无法从外部被访问，而只能被 doSomething(..) 所控制。 功能性和最终效果都没有受影响，但是设计上将具体内容私有化了，设计良好的软件都会 依此进行实现。



#### 优化

虽然这种技术可以解决一些问题，但是它并不理想，因为会导致一些额外的问题。首先， 必须声明一个具名函数 foo()，意味着 foo 这个名称本身“污染”了所在作用域（在这个例子中是全局作用域）。其次，必须显式地通过函数名（foo()）调用这个函数才能运行其中的代码。

如果函数不需要函数名（或者至少函数名可以不污染所在作用域），并且能够自动运行，这将会更加理想。

幸好，JavaScript 提供了能够同时解决这两个问题的方案

```js
var a = 2;
(function foo() {
    var a = 3;
    console.loh(a); // 3
})();
console.log(2) // 2
```

 首先，包装函数的声明以 (function... 而不仅是以 function... 开始。尽管看上去这并不是一个很显眼的细节，但实际上却是非常重要的区别。函数会被当作函数表达式而不是一个标准的函数声明来处理。

区分函数声明和表达式最简单的方法是看 function 关键字出现在声明中的位置（不仅仅是一行代码，而是整个声明中的位置）。如果 function 是声明中的第一个词，那么就是一个函数声明，否则就是一个函数表达式。

函数声明和函数表达式之间最重要的区别是它们的名称标识符将会绑定在何处。

`(function foo(){ .. })` 作为函数表达式意味着 foo 只能在 .. 所代表的位置中被访问，外部作用域则不行。foo 变量名被隐藏在自身中意味着不会非必要地污染外部作用域。 

由于函数被包含在一对 ( ) 括号内部，因此成为了一个表达式，通过在末尾加上另外一个 ( ) 可以立即执行这个函数，比如 `(function foo(){ .. })()`。第一个 ( ) 将函数变成表 达式，第二个 ( ) 执行了这个函数。 

这种模式很常见，几年前社区给它规定了一个术语：IIFE，代表立即执行函数表达式

IIFE 的另一个非常普遍的进阶用法是把它们当作函数调用并传递参数进去。

```js
var a = 2; 
(function IIFE( global ) {
	var a = 3; 
    console.log( a ); // 3 console.log( global.a ); // 2 
})( window ); 
console.log( a ); // 2
```

我们将 window 对象的引用传递进去，但将参数命名为 global，因此在代码风格上对全局 对象的引用变得比引用一个没有“全局”字样的变量更加清晰。当然可以从外部作用域传递任何你需要的东西，并将变量命名为任何你觉得合适的名字。这对于改进代码风格是非常有帮助的。



### 块级作用域

ES6引入了`let`和`const`关键字,和`var`关键字不同，在大括号中使用`let`和`const`声明的变量存在于块级作用域中。在大括号之外不能访问这些变量

```js
{
  // 块级作用域中的变量
  let greeting = 'Hello World!';
  var lang = 'English';
  console.log(greeting); // Prints 'Hello World!'
}
// 变量 'English'
console.log(lang);
// 报错：Uncaught ReferenceError: greeting is not defined
console.log(greeting);
```

## 二、词法作用域

在上面的作用域介绍中，我们将作用域定义为一套规则，这套规则来管理浏览器引擎如何在当前作用域以及嵌套的作用域中根据变量（标识符）进行变量查找。

> 词法作用域是一套关于引擎如何寻找变量以及会在何处找到变量的规则。
>
> 词法作用域最重要的特征是它的定义过程发生在代码的书写阶段（假设你没有使用 eval() 或 with）。

我们在前面有抛出一个概念：“词法作用域是作用域的一种工作模型”，作用域有两种工作模型，在JavaScript中的词法作用域是比较主流的一种，另一种动态作用域（比较少的语言在用）。

所谓的词法作用域就是**在你写代码时将变量和块作用域写在哪里来决定，也就是词法作用域是静态的作用域，在你书写代码时就确定了**。

请看以下代码：

```js
var a = 2;
function foo(){
    console.log(a)
}
function bar(){
    var a = 3;
    foo();
}
bar()
```

上述代码改变成一张图

![image-20220726123335258](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123335258.png)

由于`JavaScript`遵循词法作用域，相同层级的 `foo` 和 `bar` 就没有办法访问到彼此块作用域中的变量，所以输出2

> JavaScript 中有两个机制可以“欺骗”词法作用域：eval(..) 和 with。(不建议使用)



## 三、动态作用域

在之前，我们对比了动态作用域和词法作用域模型，JavaScript 中的作用域就是词法作用域（事实上大部分语言都是基于词法作用域的）。

我们会简要地分析一下动态作用域，重申它与词法作用域的区别。但实际上动态作用域是 JavaScript 另一个重要机制 this 的表亲，本书第二部分  “this 和对象原型”  中会有详细 介绍。

从第 2 章中可知，词法作用域是一套关于引擎如何寻找变量以及会在何处找到变量的规 则。词法作用域最重要的特征是它的定义过程发生在代码的书写阶段（假设你没有使用 eval() 或 with）

动态作用域似乎暗示有很好的理由让作用域作为一个在运行时就被动态确定的形式，而不是在写代码时进行静态确定的形式，事实上也是这样的。我们通过示例代码来说明：

```js
function foo() { 
    console.log( a ); // 2 
}
                
function bar() {
	var a = 3; foo(); 
}
                
var a = 2; 
bar();
```

词法作用域让 foo() 中的 a 通过 RHS 引用到了全局作用域中的 a，因此会输出 2。

而动态作用域并不关心函数和作用域是如何声明以及在何处声明的，只关心它们从何处调用。换句话说，作用域链是基于调用栈的，而不是代码中的作用域嵌套。

因此，如果 JavaScript 具有动态作用域，理论上，下面代码中的 foo() 在执行时将会输出 3。

```js
function foo() { 
    console.log( a ); // 3（不是 2 ！） 
}

function bar() {
	var a = 3; 
    foo(); 
}

var a = 2; 
bar();
```

为什么会这样？因为当 foo() 无法找到 a 的变量引用时，会顺着调用栈在调用 foo() 的地方查找 a，而不是在嵌套的词法作用域链中向上查找。由于 foo() 是在 bar() 中调用的， 引擎会检查 bar() 的作用域，并在其中找到值为 3 的变量 a。

很奇怪吧？现在你可能会这么想。

但这其实是因为你可能只写过基于词法作用域的代码（或者至少以词法作用域为基础进行了深入的思考），因此对动态作用域感到陌生。如果你只用基于动态作用域的语言写过代码，就会觉得这是很自然的，而词法作用域看上去才怪怪的。

需要明确的是，事实上 JavaScript 并不具有动态作用域。它只有词法作用域，简单明了。但是 this 机制某种程度上很像动态作用域。

主要区别：词法作用域是在写代码或者说定义时确定的，而动态作用域是在运行时确定的。（this 也是！）词法作用域关注函数在何处声明，而动态作用域关注函数从何处调用。 



## 四、作用域链

当在`Javascript`中使用一个变量的时候，首先`Javascript`引擎会尝试在当前作用域下去寻找该变量，如果没找到，再到它的上层作用域寻找，以此类推直到找到该变量或是已经到了全局作用域

如果在全局作用域里仍然找不到该变量，它就会在全局范围内隐式声明该变量(非严格模式下)或是直接报错

这里拿《你不知道的Javascript(上)》中的一张图解释：

把作用域比喻成一个建筑，这份建筑代表程序中的嵌套作用域链，第一层代表当前的执行作用域，顶层代表全局作用域

![image-20220726123348425](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123348425.png)

变量的引用会顺着当前楼层进行查找，如果找不到，则会往上一层找，一旦到达顶层，查找的过程都会停止

下面代码演示下：

```js
var sex = '男';
function person() {
    var name = '张三';
    function student() {
        var age = 18;
        console.log(name); // 张三
        console.log(sex); // 男 
    }
    student();
    console.log(age); // Uncaught ReferenceError: age is not defined
}
person();
```

上述代码主要主要做了以下工作：

- `student`函数内部属于最内层作用域，找不到`name`，向上一层作用域`person`函数内部找，找到了输出“张三”
- `student`内部输出`sex`时找不到，向上一层作用域`person`函数找，还找不到继续向上一层找，即全局作用域，找到了输出“男”
- 在`person`函数内部输出`age`时找不到，向上一层作用域找，即全局作用域，还是找不到则报错





# 9. JavaScript原型和原型链

## 一、原型

`JavaScript` 常被描述为一种基于原型的语言——每个对象拥有一个原型对象

当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾

准确地说，这些属性和方法定义在Object的构造器函数（constructor functions）之上的`prototype`属性上，而非实例对象本身

下面举个例子：

函数可以有属性。 每个函数都有一个特殊的属性叫作原型`prototype`

```js
function doSomething(){}
console.log( doSomething.prototype );
```

控制台输出

```js
{
    constructor: ƒ doSomething(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
    }
}
```

上面这个对象，就是大家常说的原型对象

可以看到，原型对象有一个自有属性`constructor`，这个属性指向该函数，如下图关系展示

![img](https://static.vue-js.com/56d87250-725e-11eb-ab90-d9ae814b240d.png)

## 二、原型链

原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法

在对象实例和它的构造器之间建立一个链接（它是`__proto__`属性，是从构造函数的`prototype`属性派生的），之后通过上溯原型链，在构造器中找到这些属性和方法

下面举个例子：

```js
function Person(name) {
    this.name = name;
    this.age = 18;
    this.sayName = function() {
        console.log(this.name);
    }
}
// 第二步 创建实例
var person = new Person('person')
```

根据代码，我们可以得到下图

![image-20220726123453255](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123453255.png)

下面分析一下：

- 构造函数`Person`存在原型对象`Person.prototype`
- 构造函数生成实例对象`person`，`person`的`__proto__`指向构造函数`Person`原型对象
- `Person.prototype.__proto__` 指向内置对象(Object.prototype)，因为 `Person.prototype` 是个对象，默认是由 `Object`函数作为类创建的，而 `Object.prototype` 为内置对象
- `Person.__proto__` 指向内置匿名函数 `anonymous`，因为 Person 是个函数对象，默认由 Function 作为类创建
- `Function.prototype` 和 `Function.__proto__`同时指向内置匿名函数 `anonymous`，这样原型链的终点就是 `null`

## 三、总结

下面首先要看几个概念：

`__proto__`作为不同对象之间的桥梁，用来指向创建它的构造函数的原型对象的

![image-20220726123507080](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123507080.png)

每个对象的`__proto__`都是指向它的构造函数的原型对象`prototype`的

```js
person1.__proto__ === Person.prototype
```

构造函数是一个函数对象，是通过 `Function`构造器产生的

```js
Person.__proto__ === Function.prototype
```

原型对象本身是一个普通对象，而普通对象的构造函数都是`Object`

```js
Person.prototype.__proto__ === Object.prototype
```

刚刚上面说了，所有的构造器都是函数对象，函数对象都是 `Function`构造产生的

```js
Object.__proto__ === Function.prototype
```

`Object`的原型对象也有`__proto__`属性指向`null`，`null`是原型链的顶端

```js
Object.prototype.__proto__ === null
```

下面作出总结：

- 一切对象都是继承自`Object`对象，`Object` 对象直接继承根源对象`null`
- 一切的函数对象（包括 `Object` 对象），都是继承自 `Function` 对象
- `Object` 对象直接继承自 `Function` 对象
- `Function`对象的`__proto__`会指向自己的原型对象，最终还是继承自`Object`对象





# 10. JavaScript 实现继承

## 一、是什么

继承（inheritance）是面向对象软件技术当中的一个概念。

如果一个类别B“继承自”另一个类别A，就把这个B称为“A的子类”，而把A称为“B的父类别”也可以称“A是B的超类”

- 继承的优点

继承可以使得子类具有父类别的各种属性和方法，而不需要再次编写相同的代码

在子类别继承父类别的同时，可以重新定义某些属性，并重写某些方法，即覆盖父类别的原有属性和方法，使其获得与父类别不同的功能

虽然`JavaScript`并不是真正的面向对象语言，但它天生的灵活性，使应用场景更加丰富

关于继承，我们举个形象的例子：

定义一个类（Class）叫汽车，汽车的属性包括颜色、轮胎、品牌、速度、排气量等

```js
class Car{
    constructor(color,speed){
        this.color = color
        this.speed = speed
        // ...
    }
}
```

由汽车这个类可以派生出“轿车”和“货车”两个类，在汽车的基础属性上，为轿车添加一个后备厢、给货车添加一个大货箱

```js
// 货车
class Truck extends Car{
    constructor(color,speed){
        super(color,speed)
        this.Container = true // 货箱
    }
}
```

这样轿车和货车就是不一样的，但是二者都属于汽车这个类，汽车、轿车继承了汽车的属性，而不需要再次在“轿车”中定义汽车已经有的属性

在“轿车”继承“汽车”的同时，也可以重新定义汽车的某些属性，并重写或覆盖某些属性和方法，使其获得与“汽车”这个父类不同的属性和方法

```js
class Truck extends Car{
    constructor(color,speed){
        super(color,speed)
        this.color = "black" //覆盖
        this.Container = true // 货箱
    }
}
```

从这个例子中就能详细说明汽车、轿车以及卡车之间的继承关系

## 二、实现方式

下面给出`JavaScripy`常见的继承方式：

- 原型链继承
- 构造函数继承（借助 call）
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合式继承

### 原型链继承

原型链继承是比较常见的继承方式之一，其中涉及的构造函数、原型和实例，三者之间存在着一定的关系，即每一个构造函数都有一个原型对象，原型对象又包含一个指向构造函数的指针，而实例则包含一个原型对象的指针

举个例子

```js
function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function () {
  return this.property;
}

function SubType() {
  this.subproperty = false;
}

// 继承SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function () {
  return this.subproperty;
}

let instance1 = new SubType();
instance1.property = false;
let instance2 = new SubType();
console.log(instance1.getSuperValue()); // false
console.log(instance2.getSuperValue()); // true 
```

![image-20220718153404429](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220718153404429.png)

**原型链继承的问题**

原型中包含的引用值会在所有实例间共享，这也是为什么属性通常会在构造函数中定义而不会定义在原型上的原因。在使用原型实现继承时，原型实际上变成了另一个类型的实例。这意味着原先实例的属性摇身一变成为了原型属性。

下面的例子揭示了这个问题

```js
function SuperType() {
  this.colors = ['red', 'green', 'yellow']
}
function SubType() {
}

// 继承SuperType
SubType.prototype = new SuperType();

let instance1 = new SubType();
instance1.colors.push('black')
console.log(instance1.colors); // [ 'red', 'green', 'yellow', 'black' ]
let instance2 = new SubType();
console.log(instance2.colors); // [ 'red', 'green', 'yellow', 'black' ]
```

在这个例子中，superType 构造函数定义了一一个colors属性，其中包含一个数组 (引用值)。每个supeerTType的实例都会有自己的colors属性，包含自己的数组。但是，当 SubType 通过原型继承 SuperType 后，subType.prototype变成了superType的一个实例，因而也获得了自己的 colors属性。这类似于创建了SubType.prototype. colors属性。

最终结果是，SubType 的所有实例都会共享这个colors 属性。这一点通过instance1. colors.上的修改 也能反映到instance2 .colors上就可以看出来。

### 盗用构造函数继承

为了解决原型包含引用值导致的继承问题，一种叫作“ 盗用构造函数”( constructor stealing) 的技术在开发社区流行起来(这种技术有时也称作“对象伪装”或“经典继承”)。

基本思路很简单:在子类构造函数中调用父类构造函数。因为毕竟函数就是在特定上下文中执行代码的简单对象，所以可以使用 **apply()** 和 **call()** 方法以新创建的对象为上下文执行构造函数。来看下面的例子:

```js
function SuperType() {
  this.colors = ['red', 'green', 'yellow']
}
function SubType() {
  SuperType.call(this)
}

let instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1.colors); // [ 'red', 'green', 'yellow', 'black' ]

let instance2 = new SubType();
console.log(instance2.colors); // [ 'red', 'green', 'yellow' ]
```

示例中加粗的代码展示了盜用构造函数的调用。通过使用 call() (或  apply()  )方法,  SuperType  构造函数在为  SubType 的实例创建的新对象的上下文中执行了。

这相当于新的SubType对象上运行了SuperType ()函数中的所有初始化代码。结果就是每个实例都会有自己的colors属性。

相比于使用原型链, 盗用构造函数的一个优点就是可以在子类构造函数中向父类构造函数传参。

**盗用构造函数的问题**

盗用构造函数的主要缺点，也是使用构造函数模式自定义类型的问题：必须在构造函数中定义方法，因此函数不能重用。此外，子类也不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模式。

由于存在这些问题，盗用构造函数基本上也不能单独使用。

### 组合继承

组合继承(有时候也叫伪经典继承)综合了原型链和盗用构造函数,将两者的优点集中了起来。基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。

这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。

来看下面的例子: 

```js
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'green', 'yellow']
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
}

function SubType(name, age) {
  // 继承属性
  SuperType.call(this, name)
  this.age = age;
}

// 继承方法
SubType.prototype = new SuperType();

SubType.prototype.sayAge = function () {
  console.log(this.age);
}

let instance1 = new SubType('Nicholas', 29);
instance1.colors.push('black');
console.log(instance1.colors); // [ 'red', 'green', 'yellow', 'black' ]
instance1.sayName(); // 'Nicholas'
instance1.sayAge(); // 29

let instance2 = new SubType('Greg', 27);
console.log(instance2.colors); // [ 'red', 'green', 'yellow' ]
instance2.sayName(); // 'Greg'
instance2.sayAge(); // 27
```

在这个例子中，SuperType 构造函数定义了两个属性，name和colors,而它的原型上也定义了一个方法叫sayName()。SubType构造函数调用了SuperType 构造函数，传人了name 参数,然后又定义了自己的属性age。

此外，SubType.prototype也被赋值为SuperType的实例。原型赋值之后，又在这个原型上添加了新方法sayAge()。这样，就可以创建两个SubType实例，让这两个实例都有自己的属性，包括colors,同时还共享相同的方法。

组合继承弥补了原型链和盗用构造函数的不足，是JavaScript中使用最多的继承模式。

### 原型式继承

这里主要借助`Object.create`方法实现普通对象的继承

同样举个例子

```js
let parent4 = {
    name: "parent4",
    friends: ["p1", "p2", "p3"],
    getName: function() {
        return this.name;
    }
};

let person4 = Object.create(parent4);
person4.name = "tom";
person4.friends.push("jerry");

let person5 = Object.create(parent4);
person5.friends.push("lucy");

console.log(person4.name); // tom
console.log(person4.name === person4.getName()); // true
console.log(person5.name); // parent4
console.log(person4.friends); // ["p1", "p2", "p3","jerry","lucy"]
console.log(person5.friends); // ["p1", "p2", "p3","jerry","lucy"]
```

这种继承方式的缺点也很明显，因为`Object.create`方法实现的是浅拷贝，多个实例的引用类型属性指向相同的内存，存在篡改的可能

### 寄生式继承

与原型式继承比较接近的一种继承方式是寄生式继承( parasitic inheritance )，也是Crockford首倡的一种模式。

寄生式继承背后的思路类似于寄生构造函数和工厂模式：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。基本的寄生继承模式如下:

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function createAnother(original) {
  let clone = object(original); // clone里有 original 浅拷贝后的值
  clone.sayHi = function () { // 增强这个对象
    console.log('Hi');
  }
  return clone; // 返回这个对象
}
```

在这段代码中，createAnother () 函数接收一个参数，就是新对象的基准对象。这个对象original 会被传给object() 函数，然后将返回的新对象赋值给clone。

接着给clone对象添加一个新方法 sayHi() 。最后返回这个对象。可以像下面这样使用createAnother () 函数：

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function createAnother(original) {
  let clone = object(original); // clone里有 original 浅拷贝后的值
  clone.sayHi = function () { // 增强这个对象
    console.log('Hi');
  }
  return clone; // 返回这个对象
}

let person = {
  name: 'John',
  friends: ['aaa', 'bbb', 'ccc']
}

let anotherPerson = createAnother(person);
anotherPerson.sayHi(); // Hi
```

这个例子基于person对象返回了一个新对象。新返回的 anotherPerson 对象具有 person 的所有属性和方法，还有一一个新方法叫sayHi ()。

寄生式继承同样适合主要关注对象，而不在乎类型和构造函数的场景。object ()函数不是寄生式继承所必需的，任何返回新对象的函数都可以在这里使用。

> 通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式类似。



### 寄生组合式继承

组合继承其实也存在效率问题。最主要的效率问题就是父类构造函数始终会被调用两次：一次在是创建子类原型时调用，另--次是在子类构造函数中调用。

本质上，子类原型最终是要包含超类对象的所有实例属性，子类构造函数只要在执行时重写自己的原型就行了。再来看一看这 个组合继承的例子：

```js
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'green', 'yellow']
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
}

function SubType(name, age) {
  // 继承属性
  SuperType.call(this, name) // 第二次调用 SuperType()
  this.age = age;
}

// 继承方法
SubType.prototype = new SuperType(); // 第一次调用 SuperType()
SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function () {
  console.log(this.age);
}
```

代码中加粗的部分是调用SuperType构造函数的地方。在上面的代码执行后，SubType.prototype 上会有两个属性: name 和 colors。

它们都是SuperType的实例属性，但现在成为了SubType的原型属性。在调用SubType构造函数时，也会调用SuperType构造函数，这一次会在新对象上创建实例属性name和colors。这两个实例属性会遮蔽原型上同名的属性。图展示了这个过程。

![image-20220718153531667](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220718153531667.png)

![image-20220718153548871](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220718153548871.png)

如图所示，有两组name和colors属性：一组在实例上，另一组在SubType的原型上。这是调用两次SuperType构造函数的结果。好在有办法解决这个问题。

寄生式组合继承通过盗用构造函数继承属性，但使用混合式原型链继承方法。基本思路是不通过调用父类构造函数给子类原型赋值，而是取得父类原型的一个 副本。

说到底就是使用寄生式继承来继承父类原型，然后将返回的新对象赋值给子类原型。寄生式组合继承的基本模式如下所示：

```js
function inheritPrototype(subType, superType) {
  let prototype = object(superType.prototype); // 创建对象
  prototype.constructor = subType; // 增强对象
  subType.prototype = prototype; // 赋值对象
}
```

这个inheritPrototype () 函数实现了寄生式组合继承的核心逻辑。这个函数接收两个参数：子类构造函数和父类构造函数。在这个函数内部，第一步是创建父类原型的一个副本。

然后，给返回的 prototype 对象设置 constructor 属性，解决由于重写原型导致默认constructor丢失的问题。

最后将新创建的对象赋值给子类型的原型。如下例所示，调用inheritPrototype () 就可以实现前面例子中的子类型原型赋值：

```js
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'green', 'yellow']
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
}

function SubType(name, age) {
  // 继承属性
  SuperType.call(this, name) // 第二次调用 SuperType()
  this.age = age;
}

// 继承方法
inheritPrototype(SubType,  SuperType);

SubType.prototype.sayAge = function () {
  console.log(this.age);
}
```

这里只调用了一次SuperType构造函数，避免了SubType.prototype上不必要也用不到的属性，因此可以说这个例子的效率更高。而且，原型链仍然保持不变，因此 instanceof 操作符和 isPrototypeOf() 方法正常有效。寄生式组合继承可以算是引用类型继承的最佳模式。

利用`babel`工具进行转换，我们会发现`extends`实际采用的也是寄生组合继承方式，因此也证明了这种方式是较优的解决继承的方式。

## 三、总结

下面以一张图作为总结：

![image-20220726123548246](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123548246.png)

通过`Object.create` 来划分不同的继承方式，最后的寄生式组合继承方式是通过组合继承改造之后的最优继承方式，而 `extends` 的语法糖和寄生组合继承的方式基本类似



# 11. this 对象

## 一、为什么要用this

如果对于有经验的 JavaScript 开发者来说 this 都是一种非常复杂的机制，那它到底有用在哪里呢？真的值得我们付出这么大的代价学习吗？的确，在介绍怎么做之前我们需要先明白为什么。

下面我们来解释一下为什么要使用 this：

```js
function identify() {
  return this.name.toUpperCase();
}

function speak() {
  var greeting = "Hello, I'm" + identify.call(this);
  console.log(greeting);
}

var me = {
  name: 'Kyle'
}

var you = {
  name: 'Reader'
}

identify.call(me); // KYLE
identify.call(you); // READER

speak.call(me); // Hello, 我是 KYLE
speak.call(you); // Hello, 我是 READER

```

看不懂这段代码？不用担心！我们很快就会讲解。现在请暂时抛开这些问题，专注于为什么。

这段代码可以在不同的上下文对象（me 和 you）中重复使用函数 identify() 和 speak()， 不用针对每个对象编写不同版本的函数。 

如果不使用 this，那就需要给 identify() 和 speak() 显式传入一个上下文对象。

```js
function identify(context) {
	return context.name.toUpperCase(); 
}
function speak(context) {
	var greeting = "Hello, I'm " + identify( context ); 
    console.log( greeting ); 
}
identify( you ); // READER 
speak( me ); //hello, 我是 KYLE
```

然而，this 提供了一种更优雅的方式来隐式“传递”一个对象引用，因此可以将 API 设计得更加简洁并且易于复用。 

随着你的使用模式越来越复杂，显式传递上下文对象会让代码变得越来越混乱，使用 this 则不会这样。当我们介绍对象和原型时，你就会明白函数可以自动引用合适的上下文对象有多重要。



### 误解

我们之后会解释 this 到底是如何工作的，但是首先需要消除一些关于 this 的错误认识。

太拘泥于 “this”的字面意思就会产生一些误解。有两种常见的对于 this 的解释，但是它们都是错误的。



#### 指向自身

人们很容易把 this 理解成指向函数自身，这个推断从英语的语法角度来说是说得通的。

那么为什么需要从函数内部引用函数自身呢？常见的原因是递归（从函数内部调用这个函数）或者可以写一个在第一次被调用后自己解除绑定的事件处理器。

JavaScript 的新手开发者通常会认为，既然函数看作一个对象（JavaScript 中的所有函数都是对象），那就可以在调用函数时存储状态（属性的值）。这是可行的，有些时候也确实有用，但是在本书即将介绍的许多模式中你会发现，除了函数对象还有许多更合适存储状态的地方。

不过现在我们先来分析一下这个模式，让大家看到 this 并不像我们所想的那样指向函数本身。

我们想要记录一下函数 foo 被调用的次数，思考一下下面的代码：

```js
function foo(num) {
  console.log("foo:" + num);

  // 记录 foo 被调用的次数
  this.count++;
}

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i);
  }
}

// foo 被调用了多少次？
console.log( foo.count ); // 0 -- WTF?
```

console.log 语句产生了 4 条输出，证明 foo(..) 确实被调用了 4 次，但是 foo.count 仍然是 0。显然从字面意思来理解 this 是错误的。

执行 foo.count = 0 时，的确向函数对象 foo 添加了一个属性 count。但是函数内部代码 this.count 中的 this 并不是指向那个函数对象，所以虽然属性名相同，根对象却并不相同，困惑随之产生。

> 负责的开发者一定会问“如果我增加的 count 属性和预期的不一样，那我增加的是哪个 count ？”实际上，如果他深入探索的话，就会发现这段代码在无意中创建了一个全局变量 count（原理参见后面），它的值为 NaN。当然， 如果他发现了这个奇怪的结果，那一定会接着问：“为什么它是全局的，为什么它的值是 NaN 而不是其他更合适的值？”（参见后面。）

如果要从函数对象内部引用它自身，那只使用 this 是不够的。一般来说你需要通过一个指向函数对象的词法标识符（变量）来引用它。

```js
function foo() { 
    foo.count = 4; 
    // foo 指向它自身 
}
setTimeout( function(){ 
   // 匿名（没有名字的）函数无法指向自身 
}, 10 );
```

第一个函数被称为具名函数，在它内部可以使用 foo 来引用自身。 

但是在第二个例子中，传入 setTimeout(..) 的回调函数没有名称标识符（这种函数被称为匿名函数），因此无法从函数内部引用自身。

> 还有一种传统的但是现在已经被弃用和批判的用法，是使用 arguments.callee 来引用当前正在运行的函数对象。这是唯一一种可以从匿名函数对象内部引用自身的方法。然而，更好的方式是避免使用匿名函数，至少在需要自引用时使用具名函数（表达式）。arguments.callee 已经被弃用，不应该再使用它。





## 一、定义

之前我们说过 this 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息。this 就是记录的其中一个属性，会在函数执行的过程中用到。 

在理解 this 的绑定过程之前，首先要理解调用位置：调用位置就是函数在代码中被调用的位置（而不是声明的位置）。只有仔细分析调用位置才能回答这个问题：这个 this 到底引用的是什么？ 

通常来说，寻找调用位置就是寻找“函数被调用的位置”，但是做起来并没有这么简单，因为某些编程模式可能会隐藏真正的调用位置。 

最重要的是要分析调用栈（就是为了到达当前执行位置所调用的所有函数）。我们关心的调用位置就在当前正在执行的函数的前一个调用中。

下面我们来看看到底什么是调用栈和调用位置：

```js
function baz() {
    // 当前调用栈是：baz
    // 因此，当前调用位置是全局作用域
    
    console.log( "baz" );
    bar(); // <-- bar的调用位置
}

function bar() {
    // 当前调用栈是：baz --> bar
    // 因此，当前调用位置在baz中
    
    console.log( "bar" );
    foo(); // <-- foo的调用位置
}

function foo() {
    // 当前调用栈是：baz --> bar --> foo
    // 因此，当前调用位置在bar中
    
    console.log( "foo" );
}

baz(); // <-- baz的调用位置
```

## 二、绑定规则

我们来看看在函数的执行过程中调用位置如何决定 this 的绑定对象。

你必须找到调用位置，然后判断需要应用下面四条规则中的哪一条。我们首先会分别解释这四条规则，然后解释多条规则都可用时它们的优先级如何排列。

- 默认绑定
- 隐式绑定
- new绑定
- 显示绑定

### 默认绑定

首先要介绍的是最常用的函数调用类型：独立函数调用。可以把这条规则看作是无法应用其他规则时的默认规则。 

思考一下下面的代码：

```js
function foo() { 
    console.log( this.a ); 
}
var a = 2; 
foo(); // 2
```

你应该注意到的第一件事是，声明在全局作用域中的变量（比如 var a = 2）就是全局对象的一个同名属性。

接下来我们可以看到当调用 foo() 时，this.a 被解析成了全局变量 a。为什么？因为在本例中，函数调用时应用了 this 的默认绑定，因此 this 指向全局对象。

那么我们怎么知道这里应用了默认绑定呢？可以通过分析调用位置来看看 foo() 是如何调用的。在代码中，foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。

如果使用严格模式（strict mode），那么全局对象将无法使用默认绑定，因此 this 会绑定到 undefined：

```js
function foo() { 
    "use strict"; 
    console.log( this.a ); 
}
var a = 2; 
foo(); // TypeError: this is undefined
```



### 隐式绑定

另一条需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含，不过这种说法可能会造成一些误导。

思考下面的代码：

```js
function foo() { 
    console.log( this.a ); 
}
var obj = { 
    a: 2, 
    foo: foo 
};
obj.foo(); // 2
```

首先需要注意的是 foo() 的声明方式，及其之后是如何被当作引用属性添加到 obj 中的。 

但是无论是直接在 obj 中定义还是先定义再添加为引用属性，这个函数严格来说都不属于 obj 对象。

然而，调用位置会使用 obj 上下文来引用函数，因此你可以说函数被调用时 obj 对象“拥有”或者“包含”它。

无论你如何称呼这个模式，当 foo() 被调用时，它的落脚点确实指向 obj 对象。当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。因为调用 foo() 时 this 被绑定到 obj，因此 this.a 和 obj.a 是一样的。

对象属性引用链中只有最后一层会影响调用位置。举例来说：

```js
function foo() { 
    console.log( this.a ); 
}
var obj2 = { 
    a: 42, 
    foo: foo 
};
var obj1 = { 
    a: 2, 
    obj2: obj2 
};
obj1.obj2.foo(); // 42
```

#### 隐式丢失

一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上，取决于是否是严格模式。

思考下面的代码：

```js
function foo() { 
    console.log( this.a ); 
}
var obj = { 
    a: 2, 
    foo: foo 
};
var bar = obj.foo; // 函数别名！
var a = "oops, global"; // a 是全局对象的属性 
bar(); // "oops, global"
```

虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的 bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

一种更微妙、更常见并且更出乎意料的情况发生在传入回调函数时：

```js
function foo() { 
    console.log( this.a ); 
}
function doFoo(fn) { 
    // fn 其实引用的是 foo 
    fn(); // <-- 调用位置！ 
}
var obj = { 
    a: 2, 
    foo: foo 
};
var a = "oops, global"; // a 是全局对象的属性 
doFoo( obj.foo ); // "oops, global"
```

参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值，所以结果和上一个例子一样。 

如果把函数传入语言内置的函数而不是传入你自己声明的函数，会发生什么呢？结果是一样的，没有区别：

```js
function foo() { 
    console.log( this.a );
}
var obj = { 
    a: 2, 
    foo: foo 
};
var a = "oops, global"; // a 是全局对象的属性
setTimeout( obj.foo, 100 ); // "oops, global"
```

JavaScript 环境中内置的 setTimeout() 函数实现和下面的伪代码类似：

```js
function setTimeout(fn,delay) { // 等待 delay 毫秒 
    fn(); // <-- 调用位置！ 
}
```

就像我们看到的那样，回调函数丢失 this 绑定是非常常见的。除此之外，还有一种情况 this 的行为会出乎我们意料：调用回调函数的函数可能会修改 this。在一些流行的 JavaScript 库中事件处理器常会把回调函数的 this 强制绑定到触发事件的 DOM 元素上。 这在一些情况下可能很有用，但是有时它可能会让你感到非常郁闷。遗憾的是，这些工具通常无法选择是否启用这个行为。 

无论是哪种情况，this 的改变都是意想不到的，实际上你无法控制回调函数的执行方式， 因此就没有办法控制会影响绑定的调用位置。之后我们会介绍如何通过固定 this 来修复 （这里是双关，“修复”和“固定”的英语单词都是 fixing）这个问题。 

### 显示绑定

`apply()、call()、bind()`是函数的一个方法，它们的第一个参数是一个对象，它们会把这个对象绑定到 this，接着在调用函数时指定这个 this。因为你可以直接指定 this 的绑定对象，因此我们称之为显式绑定。

思考下面的代码：

```js
function foo() { 
    console.log( this.a ); 
}
var obj = { 
    a:2 
};
foo.call( obj ); // 2
```

通过 foo.call(..)，我们可以在调用 foo 时强制把它的 this 绑定到 obj 上。

> 如果你传入了一个原始值（字符串类型、布尔类型或者数字类型）来当作 this 的绑定对象，这个原始值会被转换成它的对象形式（也就是 new String(..)、new Boolean(..) 或者 new Number(..)）。这通常被称为“装箱”。

从 this 绑定的角度来说，call(..) 和 apply(..) 是一样的，它们的区别体现在其他的参数上，但是现在我们不用考虑这些。

> 可惜，显式绑定仍然无法解决我们之前提出的丢失绑定问题。 

#### 硬绑定（绑死了）

但是显式绑定的一个变种可以解决这个问题。

思考下面的代码：

```js
function foo() { 
    console.log( this.a ); 
}
var obj = { 
    a:2 
};
var bar = function() { 
    foo.call( obj ); 
};
bar(); // 2 
setTimeout( bar, 100 ); // 2
// 硬绑定的 bar 不可能再修改它的 this 
bar.call( window ); // 2
```

我们来看看这个变种到底是怎样工作的。我们创建了函数 bar()，并在它的内部手动调用了 foo.call(obj)，因此强制把 foo 的 this 绑定到了 obj。无论之后如何调用函数 bar，它总会手动在 obj 上调用 foo。这种绑定是一种显式的强制绑定，因此我们称之为硬绑定。

硬绑定的典型应用场景就是创建一个包裹函数，传入所有的参数并返回接收到的所有值：

```js
function foo(something) { 
    console.log( this.a, something );
	return this.a + something; 
}
var obj = { 
    a:2 
};
var bar = function() {
	return foo.apply( obj, arguments ); 
};
var b = bar( 3 ); // 2 3 
console.log( b ); // 5
```

另一种使用方法是创建一个 i 可以重复使用的辅助函数：

```js
function foo(something) { 
    console.log( this.a, something );
    return this.a + something; 
}
// 简单的辅助绑定函数
function bind(fn, obj) {
	return function() {
		return fn.apply( obj, arguments ); 
    }; 
}
var obj = { 
    a:2 
};
var bar = bind( foo, obj );
var b = bar( 3 ); // 2 3 
console.log( b ); // 5
```

由于硬绑定是一种非常常用的模式，所以在 ES5 中提供了内置的方法 Function.prototype.bind，它的用法如下：

```js
function foo(something) { 
    console.log( this.a, something ); 
    return this.a + something; 
}
var obj = { 
    a:2 
};
var bar = foo.bind( obj );
var b = bar( 3 ); // 2 3 
console.log( b ); // 5
```

> bind(..) 会返回一个硬编码的新函数，它会把参数设置为 this 的上下文并调用原始函数。

#### API调用的“上下文”

第三方库的许多函数，以及 JavaScript 语言和宿主环境中许多新的内置函数，都提供了一个可选的参数，通常被称为“上下文”（context），其作用和 bind(..) 一样，确保你的回调函数使用指定的 this。

举例来说：

```js
function foo(el) { 
    console.log( el, this.id ); 
}
var obj = { 
    id: "awesome" 
};
// 调用 foo(..) 时把 this 绑定到 obj 
[1, 2, 3].forEach( foo, obj ); 
// 1 awesome 2 awesome 3 awesome
```

这些函数实际上就是通过 call(..) 或者 apply(..) 实现了显式绑定，这样你可以少些一些代码。 

### new绑定

这是第四条也是最后一条 this 的绑定规则，在讲解它之前我们首先需要澄清一个非常常见的关于 JavaScript 中函数和对象的误解。

在传统的面向类的语言中，“构造函数”是类中的一些特殊方法，使用 new 初始化类时会调用类中的构造函数。通常的形式是这样的：

`something = new MyClass(..);`

JavaScript 也有一个 new 操作符，使用方法看起来也和那些面向类的语言一样，绝大多数开发者都认为 JavaScript 中 new 的机制也和那些语言一样。然而，JavaScript 中 new 的机制实际上和面向类的语言完全不同。

首先我们重新定义一下 JavaScript 中的 “构造函数” 。在 JavaScript 中，构造函数只是一些使用 new 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上，它们甚至都不能说是一种特殊的函数类型，它们只是被 new 操作符调用的普通函数而已。

举例来说，思考一下 Number(..) 作为构造函数时的行为，ES5.1 中这样描述它：

> 15.7.2 Number 构造函数 
> 当 Number 在 new 表达式中被调用时，它是一个构造函数：它会初始化新创建的 对象。

所以，包括内置对象函数（比如 Number(..)）在内的所有函数都可 以用 new 来调用，这种函数调用被称为构造函数调用。这里有一个重要但是非常细微的区别：实际上并不存在所谓的 “构造函数” ，只有对于函数的  “构造调用”  。

使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。 

1. 创建（或者说构造）一个全新的对象。 

2. 这个新对象会被执行 [[ 原型 ]] 连接。 

3. 这个新对象会绑定到函数调用的 this。 

4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。



思考下面的代码：

```js
function foo(a) {
	this.a = a; 
}
var bar = new foo(2); 
console.log( bar.a ); // 2
```

使用 new 来调用 foo(..) 时，我们会构造一个新对象并把它绑定到 foo(..) 调用中的 this 上。new 是最后一种可以影响函数调用时 this 绑定行为的方法，我们称之为 new 绑定。

## 三、箭头函数

箭头函数并不是使用 function 关键字定义的，而是使用被称为“胖箭头”的操作符 => 定义的。箭头函数不使用 this 的四种标准规则，而是根据外层（函数或者全局）作用域来决定 this。 

我们来看看箭头函数的词法作用域：

```JS
function foo() { // 返回一个箭头函数
	return (a) => { 
        //this 继承自 foo() 
        console.log( this.a ); 
    }; 
}
var obj1 = { 
    a:2 
};
var obj2 = { 
    a:3
};
var bar = foo.call( obj1 ); 
bar.call( obj2 ); // 2, 不是 3 ！
```

foo() 内部创建的箭头函数会捕获调用时 foo() 的 this。由于 foo() 的 this 绑定到 obj1， bar（引用箭头函数）的 this 也会绑定到 obj1，箭头函数的绑定无法被修改。（new 也不行！） 

箭头函数最常用于回调函数中，例如事件处理器或者定时器：

```JS
function foo() { 
    setTimeout(() => { 
        // 这里的 this 在此法上继承自 foo() 
        console.log( this.a ); 
    },100); 
}
var obj = { 
    a:2 
};
foo.call( obj ); // 2
```

箭头函数可以像 bind(..) 一样确保函数的 this 被绑定到指定对象，此外，其重要性还体现在它用更常见的词法作用域取代了传统的 this 机制。实际上，在 ES6 之前我们就已经在使用一种几乎和箭头函数完全一样的模式。

```js
function foo() {
	var self = this; // lexical capture of this 
    setTimeout( function(){ 
        console.log( self.a ); 
    }, 100 ); 
}
var obj = { 
    a: 2 
};
foo.call( obj ); // 2
```

虽然 self = this 和箭头函数看起来都可以取代 bind(..)，但是从本质上来说，它们想替代的是 this 机制。 

虽然箭头函数的`this`能够在编译的时候就确定了`this`的指向，但也需要注意一些潜在的坑

下面举个例子：

绑定事件监听

```js
const button = document.getElementById('mngb');
button.addEventListener('click', ()=> {
    console.log(this === window) // true
    this.innerHTML = 'clicked button'
})
```

上述可以看到，我们其实是想要`this`为点击的`button`，但此时`this`指向了`window`

包括在原型上添加方法时候，此时`this`指向`window`

```js
Cat.prototype.sayName = () => {
    console.log(this === window) //true
    return this.name
}
const cat = new Cat('mm');
cat.sayName()
```

同样的，箭头函数不能作为构建函数

## 四、优先级

### 隐式绑定 VS 显式绑定

```js
function foo() {
    console.log( this.a );
}

var obj1 = {
    a: 2,
    foo: foo
};

var obj2 = {
    a: 3,
    foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```

显然，显示绑定的优先级更高

### new绑定 VS 隐式绑定

```js
function foo(something) {
    this.a = something;
}

var obj1 = {
    foo: foo
};

var obj2 = {};

obj1.foo( 2 );
console.log( obj1.a ); // 2

obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3

var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4
```

可以看到 new 绑定比隐式绑定优先级高。但是 new 绑定和显式绑定谁的优先级更高呢？

### `new`绑定 VS 显式绑定

new 和 call/apply 无法一起使用，因此无法通过 new foo.call(obj1) 来直接进行测试。但是我们可以使用硬绑定来测试它俩的优先级。

> 在看代码之前先回忆一下硬绑定是如何工作的。Function.prototype.bind(..) 会创建一个新的包装函数，这个函数会忽略它当前的 this 绑定（无论绑定的对象是什么），并把我们提供的对象绑定到 this 上。 

这样看起来硬绑定（也是显式绑定的一种）似乎比 new 绑定的优先级更高，无法使用 new 来控制 this 绑定。 

```js
function foo(something) {
    this.a = something;
}

var obj1 = {};

var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2

var baz = new bar( 3 );
console.log( obj1.a ); // 2
console.log( baz.a ); // 3
```

`bar`被绑定到obj1上，但是`new bar(3)` 并没有像我们预计的那样把`obj1.a`修改为3。相反，new 修改了硬绑定（到 obj1 的）调用 bar(..) 中的 this。因为使用了 new 绑定，我们得到了一个名字为 baz 的新对象，并且 baz.a 的值是 3。

再来看看我们之前介绍的“裸”辅助函数 bind：

```JS
function bind(fn, obj) {
	return function() { 
        fn.apply( obj, arguments ); 
    }; 
}
```

非常令人惊讶，因为看起来在辅助函数中 new 操作符的调用无法修改 this 绑定，但是在刚才的代码中 new 确实修改了 this 绑定。

实际上，ES5 中内置的 Function.prototype.bind(..) 更加复杂。下面是 MDN 提供的一种bind(..) 实现，为了方便阅读我们对代码进行了排版：

```JS
if (!Function.prototype.bind) { 
    Function.prototype.bind = function(oThis) {
		if (typeof this !== "function") { 
            // 与 ECMAScript 5 最接近的 
            // 内部 IsCallable 函数
			throw new TypeError( 
                "Function.prototype.bind - what is trying " + 
                "to be bound is not callable"
            );
        }
        var aArgs = Array.prototype.slice.call( arguments, 1 ), 
            fToBind = this, 
            fNOP = function(){}, 
            fBound = function(){
				return fToBind.apply( 
                    (
						this instanceof fNOP && 
                        oThis ? this : oThis 
                    ),
                    aArgs.concat( 
                        Array.prototype.slice.call( arguments ) 
                    ); 
            } 
        ;
        fNOP.prototype = this.prototype; 
        fBound.prototype = new fNOP(); 
        return fBound;
    };
}
```

> 这种 bind(..) 是一种 polyfill 代码（polyfill 就是我们常说的刮墙用的腻子，polyfill 代码主要用于旧浏览器的兼容，比如说在旧的浏览器中并没有内置 bind 函数，因此可以使用 polyfill 代码在旧浏览器中实现新的功能），对于 new 使用的硬绑定函数来说，这段 polyfill 代码和 ES5 内置的bind(..) 函数并不完全相同（后面会介绍为什么要在 new 中使用硬绑定函数）。由于 polyfill 并不是内置函数，所以无法创建一个不包含 .prototype 的函数，因此会具有一些副作用。如果你要在 new 中使用硬绑定函数并且依赖 polyfill 代码的话，一定要非常小心。

下面是 new 修改 this 的相关代码：

```js
this instanceof fNOP && 
oThis ? this : oThis 
// ... 以及： 
fNOP.prototype = this.prototype; 
fBound.prototype = new fNOP();
```

我们并不会详细解释这段代码做了什么（这非常复杂并且不在我们的讨论范围之内），不过简单来说，这段代码会判断硬绑定函数是否是被 new 调用，如果是的话就会使用新创建的 this 替换硬绑定的 this。

那么，为什么要在 new 中使用硬绑定函数呢？直接使用普通函数不是更简单吗？之所以要在 new 中使用硬绑定函数，主要目的是预先设置函数的一些参数，这样在使用 new 进行初始化时就可以只传入其余的参数。bind(..) 的功能之一就是可以把除了第一个参数（第一个参数用于绑定 this）之外的其他参数都传给下层的函数（这种技术称为 “部分应用” ，是 “柯里化” 的一种）。举例来说：

```js
function foo(p1, p2) {
	this.val = p1 + p2; 
}
// 之所以使用 null 是因为在本例中我们并不关心硬绑定的 this 是什么 
// 反正使用 new 时 this 会被修改
var bar = foo.bind( null, "p1" );
var baz = new bar( "p2" ); 
baz.val; // p1 p2
```



### 判断this

现在我们可以根据优先级来判断函数在某个调用位置应用的是哪条规则。可以按照下面的顺序来进行判断：





1. 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。 

   var bar = new foo() 

2. 函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是指定的对象。 

   var bar = foo.call(obj2) 

3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上下文对象。

   var bar = obj1.foo()

4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到全局对象。

   var bar = foo()



就是这样。对于正常的函数调用来说，理解了这些知识你就可以明白 this 的绑定原理了。 

不过……凡事总有例外。 



### 绑定例外 

规则总有例外，这里也一样。

在某些场景下 this 的绑定行为会出乎意料，你认为应当应用其他绑定规则时，实际上应用的可能是默认绑定规则。



#### 被忽略的this

如果你把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值在调用时会被忽略，实际应用的是默认绑定规则：

```js
function foo() { 
    console.log( this.a ); 
}
var a = 2; 
foo.call( null ); // 2
```

那么什么情况下你会传入 null 呢？

一种非常常见的做法是使用 apply(..) 来“展开”一个数组，并当作参数传入一个函数。 类似地，bind(..) 可以对参数进行柯里化（预先设置一些参数），这种方法有时非常有用：

```js
function foo(a,b) { 
    console.log( "a:" + a + ", b:" + b ); 
}
// 把数组“展开”成参数 
// 在ES6 被 ...运算符替代
foo.apply( null, [2, 3] ); // a:2, b:3
// 使用 bind(..) 进行柯里化
var bar = foo.bind( null, 2 ); 
bar( 3 ); // a:2, b:3
```

这两种方法都需要传入一个参数当作 this 的绑定对象。如果函数并不关心 this 的话，你仍然需要传入一个占位值，这时 null 可能是一个不错的选择，就像代码所示的那样。 

> 尽管本书中未提到，但在 ES6 中，可以用 ... 操作符代替 apply(..) 来 “展开” 数组，foo(...[1,2]) 和 foo(1,2) 是一样的，这样可以避免不必要的 this 绑定。可惜，在 ES6 中没有柯里化的相关语法，因此还是需要使用 bind(..)。

然而，总是使用 null 来忽略 this 绑定可能产生一些副作用。如果某个函数确实使用了 this（比如第三方库中的一个函数），那默认绑定规则会把 this 绑定到全局对象（在浏览器中这个对象是 window），这将导致不可预计的后果（比如修改全局对象）。

显而易见，这种方式可能会导致许多难以分析和追踪的 bug。

**更安全的this**

一种“更安全”的做法是传入一个特殊的对象，把 this 绑定到这个对象不会对你的程序产生任何副作用。就像网络（以及军队）一样，我们可以创建一个“DMZ”（demilitarized zone，非军事区）对象——它就是一个空的非委托的对象（委托在第 5 章和第 6 章介绍）。

如果我们在忽略 this 绑定时总是传入一个 DMZ 对象，那就什么都不用担心了，因为任何对于 this 的使用都会被限制在这个空对象中，不会对全局对象产生任何影响。

由于这个对象完全是一个空对象，我自己喜欢用变量名 ø（这是数学中表示空集合符号的小写形式）来表示它。在大多数键盘（比如说 Mac 的 US 布局键盘）上都可以使用⌥ +o Option-o）来打出这个符号。有些系统允许你为特殊符号设定快捷键。如果你不喜欢 ø 符号或者你的键盘不太容易打出这个符号，那你可以换一个喜欢的名字来称呼它。

无论你叫它什么，在 JavaScript 中创建一个空对象最简单的方法都是 Object.create(null) （ 详 细 介 绍 请 看 第 5 章 ）。Object.create(null) 和 {} 很 像， 但 是 并 不 会 创 建 Object.prototype 这个委托，所以它比 {}“更空”：

```js
function foo(a,b) { 
    console.log( "a:" + a + ", b:" + b ); 
}
// 我们的 DMZ 空对象 
var ø = Object.create( null ); 
// 把数组展开成参数 
foo.apply( ø, [2, 3] ); // a:2, b:3 
// 使用 bind(..) 进行柯里化
var bar = foo.bind( ø, 2 ); 
bar( 3 ); // a:2, b:3
```

使用变量名 ø 不仅让函数变得更加“安全”，而且可以提高代码的可读性，因为 ø 表示 “我希望 this 是空”，这比 null 的含义更清楚。不过再说一遍，你可以用任何喜欢的名字来命名 DMZ 对象。





#### 间接引用

另一个需要注意的是，你有可能（有意或者无意地）创建一个函数的“间接引用”，在这种情况下，调用这个函数会应用默认绑定规则。 

间接引用最容易在赋值时发生：

```js
function foo() { 
    console.log( this.a ); 
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 }; 
o.foo(); // 3 
(p.foo = o.foo)(); // 2
```

赋值表达式 p.foo = o.foo 的返回值是目标函数的引用，因此调用位置是 foo() 而不是 p.foo() 或者 o.foo()。根据我们之前说过的，这里会应用默认绑定。 

> 注意：对于默认绑定来说，决定 this 绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式。如果函数体处于严格模式，this 会被绑定到 undefined，否则this 会被绑定到全局对象。



#### (TODO)软绑定

之前我们已经看到过，硬绑定这种方式可以把 this 强制绑定到指定的对象（除了使用 new 时），防止函数调用应用默认绑定规则。问题在于，硬绑定会大大降低函数的灵活性，使用硬绑定之后就无法使用隐式绑定或者显式绑定来修改 this。 

如果可以给默认绑定指定一个全局对象和 undefined 以外的值，那就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显式绑定修改 this 的能力。

可以通过一种被称为软绑定的方法来实现我们想要的效果：

```js
if (!Function.prototype.softBind) { 
    Function.prototype.softBind = function(obj) { 
        var fn = this; 
        // 捕获所有 curried 参数
		var curried = [].slice.call( arguments, 1 );
		var bound = function() {
			return fn.apply( 
                (!this || this === (window || global)) ? 
                	obj : this
				curried.concat.apply( curried, arguments ) 
            ); 
        };
        bound.prototype = Object.create( fn.prototype );
		return bound; 
    }; 
}
```

除了软绑定之外，softBind(..) 的其他原理和 ES5 内置的 bind(..) 类似。它会对指定的函数进行封装，首先检查调用时的 this，如果 this 绑定到全局对象或者 undefined，那就把指定的默认对象 obj 绑定到 this，否则不会修改 this。此外，这段代码还支持可选的柯里化（详情请查看之前和 bind(..) 相关的介绍）

下面我们看看 softBind 是否实现了软绑定功能：

```js
function foo() { 
    console.log("name: " + this.name); 
}
var obj = { name: "obj" }, 
    obj2 = { name: "obj2" }, 
    obj3 = { name: "obj3" };
var fooOBJ = foo.softBind( obj ); 
fooOBJ(); // name: obj 
obj2.foo = foo.softBind(obj); 
obj2.foo(); // name: obj2 <---- 看！！！ 
fooOBJ.call( obj3 ); // name: obj3 <---- 看！ 
setTimeout( obj2.foo, 10 ); 
// name: obj <---- 应用了软绑定
```

可以看到，软绑定版本的 foo() 可以手动将 this 绑定到 obj2 或者 obj3 上，但如果应用默认绑定，则会将 this 绑定到 obj。 

# 12. JavaScript中执行上下文和执行栈

## 一、执行上下文

作用域是在函数声明的时候就确定的一套变量访问规则，而执行上下文是函数执行时才产生的一系列变量的环境。也就是说作用域定义了执行上下文中的变量的访问规则，执行上下文在这个作用域规则的前提下进行变量查找，函数引用等具体操作。

简单的来说，执行上下文是一种对`Javascript`代码执行环境的抽象概念，也就是说只要有`Javascript`代码运行，那么它就一定是运行在执行上下文中

执行上下文的类型分为三种：

- 全局执行上下文：只有一个，浏览器中的全局对象就是 `window`对象，`this` 指向这个全局对象
- 函数执行上下文：存在无数个，只有在函数被调用的时候才会被创建，每次调用函数都会创建一个新的执行上下文
- Eval 函数执行上下文： 指的是运行在 `eval` 函数中的代码，很少用而且不建议使用

下面给出全局上下文和函数上下文的例子：

![image-20220726123636781](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123636781.png)

紫色框住的部分为全局上下文，蓝色和橘色框起来的是不同的函数上下文。只有全局上下文（的变量）能被其他任何上下文访问

可以有任意多个函数上下文，每次调用函数创建一个新的上下文，会创建一个私有作用域，函数内部声明的任何变量都不能在当前函数作用域外部直接访问

## 二、生命周期

执行上下文的生命周期包括三个阶段：创建阶段 → 执行阶段 → 回收阶段

### 创建阶段

创建阶段即当函数被调用，但未执行任何其内部代码之前

创建阶段做了三件事：

- 确定 this 的值，也被称为 `This Binding`
- LexicalEnvironment（词法环境） 组件被创建
- VariableEnvironment（变量环境） 组件被创建

伪代码如下：

```js
ExecutionContext = {  
  ThisBinding = <this value>,     // 确定this 
  LexicalEnvironment = { ... },   // 词法环境
  VariableEnvironment = { ... },  // 变量环境
}
```

#### This Binding

确定`this`的值我们前面讲到，`this`的值是在执行的时候才能确认，定义的时候不能确认

#### 词法环境

词法环境有两个组成部分：

- 全局环境：是一个没有外部环境的词法环境，其外部环境引用为`null`，有一个全局对象，`this` 的值指向这个全局对象
- 函数环境：用户在函数中定义的变量被存储在环境记录中，包含了`arguments` 对象，外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境

伪代码如下：

```js
GlobalExectionContext = {  // 全局执行上下文
  LexicalEnvironment: {       // 词法环境
    EnvironmentRecord: {     // 环境记录
      Type: "Object",           // 全局环境
      // 标识符绑定在这里 
      outer: <null>           // 对外部环境的引用
  }  
}

FunctionExectionContext = { // 函数执行上下文
  LexicalEnvironment: {     // 词法环境
    EnvironmentRecord: {    // 环境记录
      Type: "Declarative",      // 函数环境
      // 标识符绑定在这里      // 对外部环境的引用
      outer: <Global or outer function environment reference>  
  }  
}
```

#### 变量环境

变量环境也是一个词法环境，因此它具有上面定义的词法环境的所有属性

在 ES6 中，词法环境和变量环境的区别在于前者用于存储函数声明和变量（ `let` 和 `const` ）绑定，而后者仅用于存储变量（ `var` ）绑定

举个例子

```js
let a = 20;  
const b = 30;  
var c;

function multiply(e, f) {  
 var g = 20;  
 return e * f * g;  
}

c = multiply(20, 30);
```

执行上下文如下：

```js
GlobalExectionContext = {

  ThisBinding: <Global Object>,

  LexicalEnvironment: {  // 词法环境
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里  
      a: < uninitialized >,  
      b: < uninitialized >,  
      multiply: < func >  
    }  
    outer: <null>  
  },

  VariableEnvironment: {  // 变量环境
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里  
      c: undefined,  
    }  
    outer: <null>  
  }  
}

FunctionExectionContext = {  
   
  ThisBinding: <Global Object>,

  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里  
      Arguments: {0: 20, 1: 30, length: 2},  
    },  
    outer: <GlobalLexicalEnvironment>  
  },

  VariableEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里  
      g: undefined  
    },  
    outer: <GlobalLexicalEnvironment>  
  }  
}
```

留意上面的代码，`let`和`const`定义的变量`a`和`b`在创建阶段没有被赋值，但`var`声明的变量从在创建阶段被赋值为`undefined`

这是因为，创建阶段，会在代码中扫描变量和函数声明（整体扫描一遍），然后将函数声明存储在环境中

但变量会被初始化为`undefined`(`var`声明的情况下)和保持`uninitialized`(未初始化状态)(使用`let`和`const`声明的情况下)

**这就是变量提升的实际原因**

### 执行阶段

在这阶段，执行变量赋值、代码执行

如果 `Javascript` 引擎在源代码中声明的实际位置找不到变量的值，那么将为其分配 `undefined` 值

### 回收阶段

执行上下文出栈等待虚拟机回收执行上下文

## 三、执行栈

执行栈，也叫调用栈，具有 LIFO（后进先出）结构，用于存储在代码执行期间创建的所有执行上下文

![image-20220726123734951](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123734951.png)

当`Javascript`引擎开始执行你第一行脚本代码的时候，它就会创建一个全局执行上下文然后将它压到执行栈中

每当引擎碰到一个函数的时候，它就会创建一个函数执行上下文，然后将这个执行上下文压到执行栈中

引擎会执行位于执行栈栈顶的执行上下文(一般是函数执行上下文)，当该函数执行结束后，对应的执行上下文就会被弹出，然后控制流程到达执行栈的下一个执行上下文

举个例子：

```js
let a = 'Hello World!';
function first() {
  console.log('Inside first function');
  second();
  console.log('Again inside first function');
}
function second() {
  console.log('Inside second function');
}
first();
console.log('Inside Global Execution Context');
```

转化成图的形式

![image-20220726123747319](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123747319.png)

简单分析一下流程：

- 创建全局上下文请压入执行栈
- `first`函数被调用，创建函数执行上下文并压入栈
- 执行`first`函数过程遇到`second`函数，再创建一个函数执行上下文并压入栈
- `second`函数执行完毕，对应的函数执行上下文被推出执行栈，执行下一个执行上下文`first`函数
- `first`函数执行完毕，对应的函数执行上下文也被推出栈中，然后执行全局上下文
- 所有代码执行完毕，全局上下文也会被推出栈中，程序结束





# 13. JavaScript中的事件模型

## 一、事件与事件流

`javascript`中的事件，可以理解就是在`HTML`文档或者浏览器中发生的一种交互操作，使得网页具备互动性， 常见的有加载事件、鼠标事件、自定义事件等

由于`DOM`是一个树结构，如果在父子节点绑定事件时候，当触发子节点的时候，就存在一个顺序问题，这就涉及到了事件流的概念

事件流都会经历三个阶段：

- 事件捕获阶段(capture phase)
- 处于目标阶段(target phase)
- 事件冒泡阶段(bubbling phase)

![image-20220726123810441](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123810441.png)

事件冒泡是一种从下往上的传播方式，由最具体的元素（触发节点）然后逐渐向上传播到最不具体的那个节点，也就是`DOM`中最高层的父节点

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Event Bubbling</title>
    </head>
    <body>
        <button id="clickMe">Click Me</button>
    </body>
</html>
```

然后，我们给`button`和它的父元素，加入点击事件

```js
var button = document.getElementById('clickMe');

button.onclick = function() {
  console.log('1.Button');
};
document.body.onclick = function() {
  console.log('2.body');
};
document.onclick = function() {
  console.log('3.document');
};
window.onclick = function() {
  console.log('4.window');
};
```

点击按钮，输出如下

```js
1.button
2.body
3.document
4.window
```

点击事件首先在`button`元素上发生，然后逐级向上传播

事件捕获与事件冒泡相反，事件最开始由不太具体的节点最早接受事件, 而最具体的节点（触发节点）最后接受事件

## 二、事件模型

事件模型可以分为三种：

- 原始事件模型（DOM0级）
- 标准事件模型（DOM2级）
- IE事件模型（基本不用）

### 原始事件模型

事件绑定监听函数比较简单, 有两种方式：

- HTML代码中直接绑定

```js
<input type="button" onclick="fun()">
```

- 通过`JS`代码绑定

```js
var btn = document.getElementById('.btn');
btn.onclick = fun;
```

#### 特性

- 绑定速度快

`DOM0`级事件具有很好的跨浏览器优势，会以最快的速度绑定，但由于绑定速度太快，可能页面还未完全加载出来，以至于事件可能无法正常运行

- 只支持冒泡，不支持捕获
- 同一个类型的事件只能绑定一次

```js
<input type="button" id="btn" onclick="fun1()">

var btn = document.getElementById('btn');
btn.onclick = fun2;
```

如上，当希望为同一个元素绑定多个同类型事件的时候（上面的这个`btn`元素绑定2个点击事件），是不被允许的，后绑定的事件会覆盖之前的事件

删除 `DOM0` 级事件处理程序只要将对应事件属性置为`null`即可

```js
btn.onclick = null;
```

### 标准事件模型

在该事件模型中，一次事件共有三个过程:

- 事件捕获阶段：事件从`document`一直向下传播到目标元素, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行
- 事件处理阶段：事件到达目标元素, 触发目标元素的监听函数
- 事件冒泡阶段：事件从目标元素冒泡到`document`, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行

事件绑定监听函数的方式如下:

```js
addEventListener(eventType, handler, useCapture)
```

事件移除监听函数的方式如下:

```text
removeEventListener(eventType, handler, useCapture)
```

参数如下：

- `eventType`指定事件类型(不要加on)
- `handler`是事件处理函数
- `useCapture`是一个`boolean`用于指定是否在捕获阶段进行处理，一般设置为`false`与IE浏览器保持一致

举个例子：

```js
var btn = document.getElementById('btn');
btn.addEventListener(‘click’, showMessage, false);
btn.removeEventListener(‘click’, showMessage, false);
```

#### 特性

- 可以在一个`DOM`元素上绑定多个事件处理器，各自并不会冲突

```js
btn.addEventListener(‘click’, showMessage1, false);
btn.addEventListener(‘click’, showMessage2, false);
btn.addEventListener(‘click’, showMessage3, false);
```

- 执行时机

当第三个参数(`useCapture`)设置为`true`就在捕获过程中执行，反之在冒泡过程中执行处理函数

下面举个例子：

```js
<div id='div'>
    <p id='p'>
        <span id='span'>Click Me!</span>
    </p >
</div>
```

设置点击事件

```js
var div = document.getElementById('div');
var p = document.getElementById('p');

function onClickFn (event) {
    var tagName = event.currentTarget.tagName;
    var phase = event.eventPhase;
    console.log(tagName, phase);
}

div.addEventListener('click', onClickFn, false);
p.addEventListener('click', onClickFn, false);
```

上述使用了`eventPhase`，返回一个代表当前执行阶段的整数值。1为捕获阶段、2为事件对象触发阶段、3为冒泡阶段

点击`Click Me!`，输出如下

```js
P 3
DIV 3
```

可以看到，`p`和`div`都是在冒泡阶段响应了事件，由于冒泡的特性，裹在里层的`p`率先做出响应

如果把第三个参数都改为`true`

```js
div.addEventListener('click', onClickFn, true);
p.addEventListener('click', onClickFn, true);
```

输出如下

```js
DIV 1
P 1
```

两者都是在捕获阶段响应事件，所以`div`比`p`标签先做出响应

### IE事件模型

IE事件模型共有两个过程:

- 事件处理阶段：事件到达目标元素, 触发目标元素的监听函数。
- 事件冒泡阶段：事件从目标元素冒泡到`document`, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行

事件绑定监听函数的方式如下:

```text
attachEvent(eventType, handler)
```

事件移除监听函数的方式如下:

```text
detachEvent(eventType, handler)
```

举个例子：

```js
var btn = document.getElementById('.btn');
btn.attachEvent(‘onclick’, showMessage);
btn.detachEvent(‘onclick’, showMessage);
```







# 14. typeof 与 instanceof 区别

## 一、typeof

`typeof` 操作符返回一个字符串，表示未经计算的操作数的类型

使用方法如下：

```js
typeof operand
typeof(operand)
```

`operand`表示对象或原始值的表达式，其类型将被返回

举个例子

```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof null // 'object'
typeof [] // 'object'
typeof {} // 'object'
typeof console // 'object'
typeof console.log // 'function'
```

从上面例子，前6个都是基础数据类型。虽然`typeof null`为`object`，但这只是`JavaScript` 存在的一个悠久 `Bug`，不代表`null`就是引用数据类型，并且`null`本身也不是对象

所以，`null`在 `typeof`之后返回的是有问题的结果，不能作为判断`null`的方法。如果你需要在 `if` 语句中判断是否为 `null`，直接通过`===null`来判断就好

同时，可以发现引用类型数据，用`typeof`来判断的话，除了`function`会被识别出来之外，其余的都输出`object`

如果我们想要判断一个变量是否存在，可以使用`typeof`：(不能使用`if(a)`， 若`a`未声明，则报错 ReferenceError)

```js
if(typeof a != 'undefined'){
    //变量存在
}
```

## 二、instanceof

`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上

使用如下：

```js
object instanceof constructor
```

`object`为实例对象，`constructor`为构造函数

构造函数通过`new`可以实例对象，`instanceof`能判断这个对象是否是之前那个构造函数生成的对象

```js
// 定义构建函数
let Car = function() {}
let benz = new Car()
benz instanceof Car // true
let car = new String('xxx')
car instanceof String // true
let str = 'xxx'
str instanceof String // false
```

关于`instanceof`的实现原理，可以参考下面：

```js
function myInstanceof(left, right) {
    // 这里先用typeof来判断基础数据类型，如果是，直接返回false
    if(typeof left !== 'object' || left === null) return false;
    // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left);
    while(true) {                  
        if(proto === null) return false;
        if(proto === right.prototype) return true;//找到相同原型对象，返回true
        proto = Object.getPrototypeof(proto);
    }
}
```

也就是顺着原型链去找，直到找到相同的原型对象，返回`true`，否则为`false`

## 三、区别

`typeof`与`instanceof`都是判断数据类型的方法，区别如下：

- `typeof`会返回一个变量的基本类型，`instanceof`返回的是一个布尔值
- `instanceof` 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型
- 而`typeof` 也存在弊端，它虽然可以判断基础数据类型（`null` 除外），但是引用数据类型中，除了`function` 类型以外，其他的也无法判断

可以看到，上述两种方法都有弊端，并不能满足所有场景的需求

如果需要通用检测数据类型，可以采用`Object.prototype.toString`，调用该方法，统一返回格式`“[object Xxx]”`的字符串

如下

```js
Object.prototype.toString({})       // "[object Object]"
Object.prototype.toString.call({})  // 同上结果，加上call也ok
Object.prototype.toString.call(1)    // "[object Number]"
Object.prototype.toString.call('1')  // "[object String]"
Object.prototype.toString.call(true)  // "[object Boolean]"
Object.prototype.toString.call(function(){})  // "[object Function]"
Object.prototype.toString.call(null)   //"[object Null]"
Object.prototype.toString.call(undefined) //"[object Undefined]"
Object.prototype.toString.call(/123/g)    //"[object RegExp]"
Object.prototype.toString.call(new Date()) //"[object Date]"
Object.prototype.toString.call([])       //"[object Array]"
Object.prototype.toString.call(document)  //"[object HTMLDocument]"
Object.prototype.toString.call(window)   //"[object Window]"
```

了解了`toString`的基本用法，下面就实现一个全局通用的数据类型判断方法

```js
function getType(obj){
  let type  = typeof obj;
  if (type !== "object") {    // 先进行typeof判断，如果是基础数据类型，直接返回
    return type;
  }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1'); 
}
```

使用如下

```js
getType([])     // "Array" typeof []是object，因此toString返回
getType('123')  // "string" typeof 直接返回
getType(window) // "Window" toString返回
getType(null)   // "Null"首字母大写，typeof null是object，需toString来判断
getType(undefined)   // "undefined" typeof 直接返回
getType()            // "undefined" typeof 直接返回
getType(function(){}) // "function" typeof能判断，因此首字母小写
getType(/123/g)      //"RegExp" toString返回
```





# 15. 什么是事件代理？应用场景？

## 一、是什么

事件代理，俗地来讲，就是把一个元素响应事件（`click`、`keydown`......）的函数委托到另一个元素

前面讲到，事件流的都会经过三个阶段： 捕获阶段 -> 目标阶段 -> 冒泡阶段，而事件委托就是在冒泡阶段完成

事件委托，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，而不是目标元素

当事件响应到目标元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数

下面举个例子：

比如一个宿舍的同学同时快递到了，一种笨方法就是他们一个个去领取

较优方法就是把这件事情委托给宿舍长，让一个人出去拿好所有快递，然后再根据收件人一一分发给每个同学

在这里，取快递就是一个事件，每个同学指的是需要响应事件的 `DOM`元素，而出去统一领取快递的宿舍长就是代理的元素

所以真正绑定事件的是这个元素，按照收件人分发快递的过程就是在事件执行中，需要判断当前响应的事件应该匹配到被代理元素中的哪一个或者哪几个

## 二、应用场景

如果我们有一个列表，列表之中有大量的列表项，我们需要在点击列表项的时候响应一个事件

```js
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  ......
  <li>item n</li>
</ul>
```

如果给每个列表项一一都绑定一个函数，那对于内存消耗是非常大的

```js
// 获取目标元素
const lis = document.getElementsByTagName("li")
// 循环遍历绑定事件
for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = function(e){
        console.log(e.target.innerHTML)
    }
}
```

这时候就可以事件委托，把点击事件绑定在父级元素`ul`上面，然后执行事件的时候再去匹配目标元素

```js
// 给父层元素绑定事件
document.getElementById('list').addEventListener('click', function (e) {
    // 兼容性处理
    var event = e || window.event;
    var target = event.target || event.srcElement;
    // 判断是否匹配目标元素
    if (target.nodeName.toLocaleLowerCase === 'li') {
        console.log('the content is: ', target.innerHTML);
    }
});
```

还有一种场景是上述列表项并不多，我们给每个列表项都绑定了事件

但是如果用户能够随时动态的增加或者去除列表项元素，那么在每一次改变的时候都需要重新给新增的元素绑定事件，给即将删去的元素解绑事件

如果用了事件委托就没有这种麻烦了，因为事件是绑定在父层的，和目标元素的增减是没有关系的，执行到目标元素是在真正响应执行事件函数的过程中去匹配的

举个例子：

下面`html`结构中，点击`input`可以动态添加元素

```html
<input type="button" name="" id="btn" value="添加" />
<ul id="ul1">
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
    <li>item 4</li>
</ul>
```

使用事件委托

```js
const oBtn = document.getElementById("btn");
const oUl = document.getElementById("ul1");
const num = 4;

//事件委托，添加的子元素也有事件
oUl.onclick = function (ev) {
    ev = ev || window.event;
    const target = ev.target || ev.srcElement;
    if (target.nodeName.toLowerCase() == 'li') {
        console.log('the content is: ', target.innerHTML);
    }

};

//添加新节点
oBtn.onclick = function () {
    num++;
    const oLi = document.createElement('li');
    oLi.innerHTML = `item ${num}`;
    oUl.appendChild(oLi);
};
```

可以看到，使用事件委托，在动态绑定事件的情况下是可以减少很多重复工作的

## 三、总结

适合事件委托的事件有：`click`，`mousedown`，`mouseup`，`keydown`，`keyup`，`keypress`

从上面应用场景中，我们就可以看到使用事件委托存在两大优点：

- 减少整个页面所需的内存，提升整体性能
- 动态绑定，减少重复工作

但是使用事件委托也是存在局限性：

- `focus`、`blur`这些事件没有事件冒泡机制，所以无法进行委托绑定事件
- `mousemove`、`mouseout`这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的

如果把所有事件都用事件代理，可能会出现事件误判，即本不该被触发的事件被绑定上了事件



# 16. new 操作符具体干了什么

## 一、是什么

在`JavaScript`中，`new`操作符用于创建一个给定构造函数的实例对象

例子

```js
function Person(name, age){
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function () {
    console.log(this.name)
}
const person1 = new Person('Tom', 20)
console.log(person1)  // Person {name: "Tom", age: 20}
t.sayName() // 'Tom'
```

从上面可以看到：

- `new` 通过构造函数 `Person` 创建出来的实例可以访问到构造函数中的属性
- `new` 通过构造函数 `Person` 创建出来的实例可以访问到构造函数原型链中的属性（即实例与构造函数通过原型链连接了起来）

现在在构建函数中显式加上返回值，并且这个返回值是一个原始类型

```js
function Test(name) {
  this.name = name
  return 1
}
const t = new Test('xxx')
console.log(t.name) // 'xxx'
```

可以发现，构造函数中返回一个原始值，然而这个返回值并没有作用

下面在构造函数中返回一个对象

```js
function Test(name) {
  this.name = name
  console.log(this) // Test { name: 'xxx' }
  return { age: 26 }
}
const t = new Test('xxx')
console.log(t) // { age: 26 }
console.log(t.name) // 'undefined'
```

从上面可以发现，构造函数如果返回值为一个对象，那么这个返回值会被正常使用

## 二、流程

从上面介绍中，我们可以看到`new`关键字主要做了以下的工作：

- 创建一个新的对象`obj`
- 将对象与构造函数通过原型链连接起来
- 将构建函数中的`this`绑定到新建的对象`obj`上
- 根据构造函数返回类型作判断，如果是原始值则被忽略，如果是返回对象，需要正常处理

举个例子：

```js
function Person(name, age){
    this.name = name;
    this.age = age;
}
const person1 = new Person('Tom', 20)
console.log(person1)  // Person {name: "Tom", age: 20}
t.sayName() // 'Tom'
```

流程图如下：

![image-20220726123853986](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123853986.png)

## 三、手写new操作符

现在我们已经清楚地掌握了`new`的执行过程

那么我们就动手来实现一下`new`

```js
function mynew(Func, ...args) {
    // 1.创建一个新对象
    const obj = {}
    // 2.新对象原型指向构造函数原型对象
    obj.__proto__ = Func.prototype
    // 3.将构建函数的this指向新对象
    let result = Func.apply(obj, args)
    // 4.根据返回值判断
    return result instanceof Object ? result : obj
}
```

测试一下

```js
function mynew(func, ...args) {
    const obj = {}
    obj.__proto__ = func.prototype
    let result = func.apply(obj, args)
    return result instanceof Object ? result : obj
}
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.say = function () {
    console.log(this.name)
}

let p = mynew(Person, "huihui", 123)
console.log(p) // Person {name: "huihui", age: 123}
p.say() // huihui
```

可以发现，代码虽然很短，但是能够模拟实现`new`









# (!)17. ajax原理是什么？如何实现？

## 一、是什么

`AJAX`全称是：Asynchronous JavaScript And XML，翻译过来就是“异步的 Javascript 和 XML”。

很多小伙伴可能会误以为 Ajax 是发请求的一种方式，或者把 XMLHttpRequest 与 Ajax 划等号，其实这是错误和片面的。

正解：

>Ajax 是一个技术统称，是一个概念模型，它囊括了很多技术，并不特指某一技术，它很重要的特性之一就是让页面实现局部刷新。

特点：

* 局部刷新页面，无需重载整个页面。

简单来说，Ajax 是一种思想，XMLHttpRequest 只是实现 Ajax 的一种方式。其中 XMLHttpRequest 模块就是实现 Ajax 的一种很好的方式，这也是很多面试官喜欢让面试者手撕的代码之一。

`Ajax`的原理简单来说通过`XmlHttpRequest`对象来向服务器发异步请求，从服务器获得数据，然后用`JavaScript`来操作`DOM`而更新页面

流程图如下：

![img](https://static.vue-js.com/af42de10-7b2a-11eb-85f6-6fac77c0c9b3.png)

## 二、实现过程

实现 `Ajax`异步交互需要服务器逻辑进行配合，需要完成以下步骤：

- 创建 `Ajax`的核心对象 `XMLHttpRequest`对象
- 通过 `XMLHttpRequest` 对象的 `open()` 方法与服务端建立连接
- 构建请求所需的数据内容，并通过`XMLHttpRequest` 对象的 `send()` 方法发送给服务器端
- 通过 `XMLHttpRequest` 对象提供的 `onreadystatechange` 事件监听服务器端你的通信状态
- 接受并处理服务端向客户端响应的数据结果
- 将处理结果更新到 `HTML`页面中

### 创建XMLHttpRequest对象

通过`XMLHttpRequest()` 构造函数用于初始化一个 `XMLHttpRequest` 实例对象

```js
// 1. 创建 XHR 对象
const xhr = new XMLHttpRequest();
```

### 与服务器建立连接

通过 `XMLHttpRequest` 对象的 `open()` 方法与服务器建立连接

```js
xhr.open(method, url, [async][, user][, password])
// 2. 调用 open 函数，指定 请求方式 与 URL地址
xhr.open('GET', 'http://www.liulongbin.top:3006/api/getbooks')
```

参数说明：

- `method`：表示当前的请求方式，常见的有`GET`、`POST`
- `url`：服务端地址
- `async`：布尔值，表示是否异步执行操作，默认为`true`
- `user`: 可选的用户名用于认证用途；默认为`null
- `password`: 可选的密码用于认证用途，默认为`null

### 给服务端发送数据

通过 `XMLHttpRequest` 对象的 `send()` 方法，将客户端页面的数据发送给服务端

```js
xhr.send([body])
// 3. 调用 send 函数，发起 Ajax 请求
xhr.send()
```

```
body`: 在 `XHR` 请求中要发送的数据体，如果不传递数据则为 `null
```

如果使用`GET`请求发送数据的时候，需要注意如下：

- 将请求数据添加到`open()`方法中的`url`地址中
- 发送请求数据中的`send()`方法中参数设置为`null`

### 绑定onreadystatechange事件

`onreadystatechange` 事件用于监听服务器端的通信状态，主要监听的属性为`XMLHttpRequest.readyState` ,

关于`XMLHttpRequest.readyState`属性有五个状态，如下图显示

![image-20220726123926416](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726123926416.png)

只要 `readyState`属性值一变化，就会触发一次 `readystatechange` 事件

`XMLHttpRequest.responseText`属性用于接收服务器端的响应结果

举个例子：

```js
const request = new XMLHttpRequest()
request.onreadystatechange = function(e){
    if(request.readyState === 4){ // 整个请求过程完毕
        if(request.status >= 200 && request.status <= 300){
            console.log(request.responseText) // 服务端返回的结果
        }else if(request.status >=400){
            console.log("错误信息：" + request.status)
        }
    }
}
request.open('POST','http://xxxx')
request.send()
```

### 使用xhr发起带参数的GET请求

```js
// ...省略不必要的代码
xhr.open('GET', 'http://www.liulongbin.top:3006/api/getbooks?id=1')
// ...省略不必要的代码
```

这种在 URL 地址后面拼接的参数，叫做**查询字符串**。

### 查询字符串

定义：查询字符串（URL 参数）是指在 URL 的末尾加上用于向服务器发送信息的字符串（变量）。

格式：将英文的 **?** 放在URL 的末尾，然后再加上 **参数＝值** ，想加上多个参数的话，使用 **&** 符号进行分隔。以这个形式，可以将想要发送给服务器的数据添加到 URL 中。

```js
// 不带参数的 URL 地址
http://www.liulongbin.top:3006/api/getbooks
// 带一个参数的 URL 地址
http://www.liulongbin.top:3006/api/getbooks?id=1
// 带两个参数的 URL 地址
http://www.liulongbin.top:3006/api/getbooks?id=1&bookname=西游记
```



### GET请求携带参数的本质

无论使用 $.ajax()，还是使用 $.get()，又或者直接使用 xhr 对象发起 GET 请求，当需要携带参数的时候，本质上，都是直接将参数以查询字符串的形式，追加到 URL 地址的后面，发送到服务器的。

```js
$.get('url', {name: 'zs', age: 20}, function() {})
// 等价于
$.get('url?name=zs&age=20', function() {})

$.ajax({ method: 'GET', url: 'url', data: {name: 'zs', age: 20}, success: function() {} })
// 等价于
$.ajax({ method: 'GET', url: 'url?name=zs&age=20', success: function() {} })
```



### 使用xhr发起POST请求

```js
// 1. 创建 xhr 对象
var xhr = new XMLHttpRequest()
// 2. 调用 open()
xhr.open('POST', 'http://www.liulongbin.top:3006/api/addbook')
// 3. 设置 Content-Type 属性（固定写法）
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
// 4. 调用 send()，同时将数据以查询字符串的形式，提交给服务器
xhr.send('bookname=水浒传&author=施耐庵&publisher=天津图书出版社')
// 5. 监听 onreadystatechange 事件
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText)
    }
}
```





### XMLHttpRequest Level2

**旧版**XMLHttpRequest**的缺点**

* 只支持文本数据的传输，无法用来读取和上传文件
* 传送和接收数据时，没有进度信息，只能提示有没有完成





**XMLHttpRequest** **Level2**的新功能

* 可以设置 HTTP 请求的时限
* 可以使用 FormData 对象管理表单数据
* 可以上传文件
* 可以获得数据传输的进度信息



#### 设置HTTP请求时限

有时，Ajax 操作很耗时，而且无法预知要花多少时间。如果网速很慢，用户可能要等很久。新版本的 XMLHttpRequest 对象，增加了 timeout 属性，可以设置 HTTP 请求的时限：

```js
xhr.timeout = 3000
```

上面的语句，将最长等待时间设为 3000 毫秒。过了这个时限，就自动停止HTTP请求。与之配套的还有一个 timeout 事件，用来指定回调函数：

```js
 xhr.ontimeout = function(event){
     alert('请求超时！')
 }
```



#### **FormData**对象管理表单数据

Ajax 操作往往用来提交表单数据。为了方便表单处理，HTML5 新增了一个 FormData 对象，可以模拟表单操作：

```js
// 1. 新建 FormData 对象
var fd = new FormData()
// 2. 为 FormData 添加表单项
fd.append('uname', 'zs')
fd.append('upwd', '123456')
// 3. 创建 XHR 对象
var xhr = new XMLHttpRequest()
// 4. 指定请求类型与URL地址
xhr.open('POST', 'http://www.liulongbin.top:3006/api/formdata')
// 5. 直接提交 FormData 对象，这与提交网页表单的效果，完全一样
xhr.send(fd)
```

FormData对象也可以用来获取网页表单的值，示例代码如下：

```js
// 获取表单元素
 var form = document.querySelector('#form1')
 // 监听表单元素的 submit 事件
 form.addEventListener('submit', function(e) {
    e.preventDefault()
     // 根据 form 表单创建 FormData 对象，会自动将表单数据填充到 FormData 对象中
     var fd = new FormData(form)
     var xhr = new XMLHttpRequest()
     xhr.open('POST', 'http://www.liulongbin.top:3006/api/formdata')
     xhr.send(fd)
     xhr.onreadystatechange = function() {}
})
```





## 三、封装

通过上面对`XMLHttpRequest`对象的了解，下面来封装一个简单的`ajax`请求

```js
//封装一个ajax请求
function ajax(options) {
    //创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest()


    //初始化参数的内容
    options = options || {}
    options.type = (options.type || 'GET').toUpperCase()
    options.dataType = options.dataType || 'json'
    const params = options.data

    //发送请求
    if (options.type === 'GET') {
        xhr.open('GET', options.url + '?' + params, true)
        xhr.send(null)
    } else if (options.type === 'POST') {
        xhr.open('POST', options.url, true)
        xhr.send(params)

    //接收请求
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let status = xhr.status
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML)
            } else {
                options.fail && options.fail(status)
            }
        }
    }
}
```

使用方式如下

```js
ajax({
    type: 'post',
    dataType: 'json',
    data: {},
    url: 'https://xxxx',
    success: function(text,xml){//请求成功后的回调函数
        console.log(text)
    },
    fail: function(status){////请求失败后的回调函数
        console.log(status)
    }
})
```





## 四、Fetch

Fetch 是在 ES6 出现的，它使用了 ES6 提出的 promise 对象。它是 XMLHttpRequest 的替代品。

很多小伙伴会把它与 Ajax 作比较，其实这是不对的，我们通常所说的 Ajax 是指使用 XMLHttpRequest 实现的 Ajax，所以真正应该和 XMLHttpRequest 作比较。

正解：

> Fetch 是一个 API，它是真实存在的，它是基于 promise 的。


特点：

使用 promise，不使用回调函数。
采用模块化设计，比如 rep、res 等对象分散开来，比较友好。
通过数据流对象处理数据，可以提高网站性能。

所以这里就和 Ajax 又很大不同了，一个是思想，一个是真实存在的 API，不过它们都是用来给网络请求服务的，我们一起来看看利用 Fetch 实现网络请求。
示例代码：

```html
<body>
  <script>
    function ajaxFetch(url) {
      fetch(url).then(res => res.json()).then(data => {
        console.info(data)
      })
    }
    ajaxFetch('https://smallpig.site/api/category/getCategory')
  </script>
</body>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/98b165e0326944babc877c3c2d6ed2ac.png)

上段代码利用 Fetch 发送了一个最简单的 get 请求，其中最重要的特点之一就是采用了.then 链式调用的方式处理结果，这样不仅利于代码的可读，而且也解决了回调地狱的问题。



## 五、axios

Axios 是专注于**网络数据请求**的库。相比于原生的 XMLHttpRequest 对象，axios **简单易用**。相比于 jQuery，axios 更加**轻量化**，只专注于网络数据请求。

特点：

* 从浏览器中创建 XMLHttpRequests
* 从 node.js 创建 http 请求
* 支持 Promise API
* 拦截请求和响应
* 转换请求数据和响应数据
* 取消请求
* 自动转换 JSON 数据
* 客户端支持防御 XSRF



### 直接使用axios发起请求

axios 也提供了类似于 jQuery 中 $.ajax() 的函数，语法如下：

```js
axios({
     method: '请求类型',
     url: '请求的URL地址',
     data: { /* POST数据 */ },
     params: { /* GET参数 */ }
 }) .then(callback)

```



**直接使用axios发起GET请求**

```js
axios({
     method: 'GET',
     url: 'http://www.liulongbin.top:3006/api/get',
     params: { // GET 参数要通过 params 属性提供
         name: 'zs',
         age: 20
     }
 }).then(function(res) {
     console.log(res.data)
 })

```





**直接使用axios发起POST请求**

```js
axios({
     method: 'POST',
     url: 'http://www.liulongbin.top:3006/api/post',
     data: { // POST 数据要通过 data 属性提供
         bookname: '程序员的自我修养',
         price: 666
     }
 }).then(function(res) {
     console.log(res.data)
 })

```

总结
Ajax、Fetch、axios三者之间的关系可以用一张图来清晰的表示，如图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/7e728f4a650641699535acbd8cd8ef94.png)







# 18. bind、call、apply 区别？如何实现一个bind?

## 一、作用

`call`、`apply`、`bind`作用是改变函数执行时的上下文，简而言之就是改变函数运行时的`this`指向

那么什么情况下需要改变`this`的指向呢？下面举个例子

```js
var name = "lucy";
var obj = {
    name: "martin",
    say: function () {
        console.log(this.name);
    }
};
obj.say(); // martin，this 指向 obj 对象
setTimeout(obj.say,0); // lucy，this 指向 window 对象
```

从上面可以看到，正常情况`say`方法输出`martin`

但是我们把`say`放在`setTimeout`方法中，在定时器中是作为回调函数来执行的，因此回到主栈执行时是在全局执行上下文的环境中执行的，这时候`this`指向`window`，所以输出`lucy`

我们实际需要的是`this`指向`obj`对象，这时候就需要该改变`this`指向了

```js
setTimeout(obj.say.bind(obj),0); //martin，this指向obj对象
```

## 二、区别

下面再来看看`apply`、`call`、`bind`的使用

### apply

`apply`接受两个参数，第一个参数是`this`的指向，第二个参数是函数接受的参数，以数组的形式传入

改变`this`指向后原函数会立即执行，且此方法只是临时改变`this`指向一次

```js
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

fn.apply(obj,[1,2]); // this会变成传入的obj，传入的参数必须是一个数组；
fn(1,2) // this指向window
```

当第一个参数为`null`、`undefined`的时候，默认指向`window`(在浏览器中)

```js
fn.apply(null,[1,2]); // this指向window
fn.apply(undefined,[1,2]); // this指向window
```

### call

`call`方法的第一个参数也是`this`的指向，后面传入的是一个参数列表

跟`apply`一样，改变`this`指向后原函数会立即执行，且此方法只是临时改变`this`指向一次

```js
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

fn.call(obj,1,2); // this会变成传入的obj，传入的参数必须是一个数组；
fn(1,2) // this指向window
```

同样的，当第一个参数为`null`、`undefined`的时候，默认指向`window`(在浏览器中)

```js
fn.call(null,[1,2]); // this指向window
fn.call(undefined,[1,2]); // this指向window
```

### bind

bind方法和call很相似，第一参数也是`this`的指向，后面传入的也是一个参数列表(但是这个参数列表可以分多次传入)

改变`this`指向后不会立即执行，而是返回一个永久改变`this`指向的函数

```js
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

const bindFn = fn.bind(obj); // this 也会变成传入的obj ，bind不是立即执行需要执行一次
bindFn(1,2) // this指向obj
fn(1,2) // this指向window
```

### 小结

从上面可以看到，`apply`、`call`、`bind`三者的区别在于：

- 三者都可以改变函数的`this`对象指向
- 三者第一个参数都是`this`要指向的对象，如果如果没有这个参数或参数为`undefined`或`null`，则默认指向全局`window`
- 三者都可以传参，但是`apply`是数组，而`call`是参数列表，且`apply`和`call`是一次性传入参数，而`bind`可以分为多次传入
- `bind`是返回绑定this之后的函数，`apply`、`call` 则是立即执行

## 三、实现

实现`bind`的步骤，我们可以分解成为三部分：

- 修改`this`指向
- 动态传递参数

```js
// 方式一：只在bind中传递函数参数
fn.bind(obj,1,2)()

// 方式二：在bind中传递函数参数，也在返回函数中传递参数
fn.bind(obj,1)(2)
```

- 兼容`new`关键字

整体实现代码如下：

```js
Function.prototype.myBind = function (context) {
    // 判断调用对象是否为函数
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }

    // 获取参数
    const args = [...arguments].slice(1),
          fn = this;

    return function Fn() {

        // 根据调用方式，传入不同绑定值
        return fn.apply(this instanceof Fn ? new fn(...arguments) : context, args.concat(...arguments)); 
    }
}
```

















# 19. 说说你对正则表达式的理解？应用场景？

## 一、是什么

正则表达式是一种用来匹配字符串的强有力的武器

它的设计思想是用一种描述性的语言定义一个规则，凡是符合规则的字符串，我们就认为它“匹配”了，否则，该字符串就是不合法的

在 `JavaScript`中，正则表达式也是对象，构建正则表达式有两种方式：

1. 字面量创建，其由包含在斜杠之间的模式组成

```js
const re = /\d+/g;
```

1. 调用`RegExp`对象的构造函数

```js
const re = new RegExp("\\d+","g");

const rul = "\\d+"
const re1 = new RegExp(rul,"g");
```

使用构建函数创建，第一个参数可以是一个变量，遇到特殊字符`\`需要使用`\\`进行转义

## 二、匹配规则

常见的校验规则如下：

| 规则        | 描述                                                  |
| ----------- | ----------------------------------------------------- |
| \           | 转义                                                  |
| ^           | 匹配输入的开始                                        |
| $           | 匹配输入的结束                                        |
| *           | 匹配前一个表达式 0 次或多次                           |
| +           | 匹配前面一个表达式 1 次或者多次。等价于 `{1,}`        |
| ?           | 匹配前面一个表达式 0 次或者 1 次。等价于`{0,1}`       |
| .           | 默认匹配除换行符之外的任何单个字符                    |
| x(?=y)      | 匹配'x'仅仅当'x'后面跟着'y'。这种叫做先行断言         |
| (?<=y)x     | 匹配'x'仅当'x'前面是'y'.这种叫做后行断言              |
| x(?!y)      | 仅仅当'x'后面不跟着'y'时匹配'x'，这被称为正向否定查找 |
| (?<!*y*)*x* | 仅仅当'x'前面不是'y'时匹配'x'，这被称为反向否定查找   |
| x\|y        | 匹配‘x’或者‘y’                                        |
| {n}         | n 是一个正整数，匹配了前面一个字符刚好出现了 n 次     |
| {n,}        | n是一个正整数，匹配前一个字符至少出现了n次            |
| {n,m}       | n 和 m 都是整数。匹配前面的字符至少n次，最多m次       |
| [xyz]       | 一个字符集合。匹配方括号中的任意字符                  |
| [^xyz]      | 匹配任何没有包含在方括号中的字符                      |
| \b          | 匹配一个词的边界，例如在字母和空格之间                |
| \B          | 匹配一个非单词边界                                    |
| \d          | 匹配一个数字                                          |
| \D          | 匹配一个非数字字符                                    |
| \f          | 匹配一个换页符                                        |
| \n          | 匹配一个换行符                                        |
| \r          | 匹配一个回车符                                        |
| \s          | 匹配一个空白字符，包括空格、制表符、换页符和换行符    |
| \S          | 匹配一个非空白字符                                    |
| \w          | 匹配一个单字字符（字母、数字或者下划线）              |
| \W          | 匹配一个非单字字符                                    |

### 正则表达式标记

| 标志 | 描述                                                      |
| :--- | :-------------------------------------------------------- |
| `g`  | 全局搜索。                                                |
| `i`  | 不区分大小写搜索。                                        |
| `m`  | 多行搜索。                                                |
| `s`  | 允许 `.` 匹配换行符。                                     |
| `u`  | 使用`unicode`码的模式进行匹配。                           |
| `y`  | 执行“粘性(`sticky`)”搜索,匹配从目标字符串的当前位置开始。 |

使用方法如下：

```js
var re = /pattern/flags;
var re = new RegExp("pattern", "flags");
```

在了解下正则表达式基本的之外，还可以掌握几个正则表达式的特性：

### 贪婪模式

在了解贪婪模式前，首先举个例子：

```js
const reg = /ab{1,3}c/
```

在匹配过程中，尝试可能的顺序是从多往少的方向去尝试。首先会尝试`bbb`，然后再看整个正则是否能匹配。不能匹配时，吐出一个`b`，即在`bb`的基础上，再继续尝试，以此重复

如果多个贪婪量词挨着，则深度优先搜索

```js
const string = "12345";
const regx = /(\d{1,3})(\d{1,3})/;
console.log( string.match(reg) );
// => ["12345", "123", "45", index: 0, input: "12345"]
```

其中，前面的`\d{1,3}`匹配的是"123"，后面的`\d{1,3}`匹配的是"45"

### 懒惰模式

惰性量词就是在贪婪量词后面加个问号。表示尽可能少的匹配

```js
var string = "12345";
var regex = /(\d{1,3}?)(\d{1,3})/;
console.log( string.match(regex) );
// => ["1234", "1", "234", index: 0, input: "12345"]
```

其中`\d{1,3}?`只匹配到一个字符"1"，而后面的`\d{1,3}`匹配了"234"

### 分组

分组主要是用过`()`进行实现，比如`beyond{3}`，是匹配`d`字母3次。而`(beyond){3}`是匹配`beyond`三次

在`()`内使用`|`达到或的效果，如`(abc | xxx)`可以匹配`abc`或者`xxx`

反向引用，巧用`$`分组捕获

```js
let str = "John Smith";

// 交换名字和姓氏
console.log(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

## 三、匹配方法

正则表达式常被用于某些方法，我们可以分成两类：

- 字符串（str）方法：`match`、`matchAll`、`search`、`replace`、`split`
- 正则对象下（regexp）的方法：`test`、`exec`

| 方法     | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| exec     | 一个在字符串中执行查找匹配的RegExp方法，它返回一个数组（未匹配到则返回 null）。 |
| test     | 一个在字符串中测试是否匹配的RegExp方法，它返回 true 或 false。 |
| match    | 一个在字符串中执行查找匹配的String方法，它返回一个数组，在未匹配到时会返回 null。 |
| matchAll | 一个在字符串中执行查找所有匹配的String方法，它返回一个迭代器（iterator）。 |
| search   | 一个在字符串中测试匹配的String方法，它返回匹配到的位置索引，或者在失败时返回-1。 |
| replace  | 一个在字符串中执行查找匹配的String方法，并且使用替换字符串替换掉匹配到的子字符串。 |
| split    | 一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的 `String` 方法。 |

### str.match(regexp)

`str.match(regexp)` 方法在字符串 `str` 中找到匹配 `regexp` 的字符

如果 `regexp` 不带有 `g` 标记，则它以数组的形式返回第一个匹配项，其中包含分组和属性 `index`（匹配项的位置）、`input`（输入字符串，等于 `str`）

```js
let str = "I love JavaScript";

let result = str.match(/Java(Script)/);

console.log( result[0] );     // JavaScript（完全匹配）
console.log( result[1] );     // Script（第一个分组）
console.log( result.length ); // 2

// 其他信息：
console.log( result.index );  // 7（匹配位置）
console.log( result.input );  // I love JavaScript（源字符串）
```

如果 `regexp` 带有 `g` 标记，则它将所有匹配项的数组作为字符串返回，而不包含分组和其他详细信息

```js
let str = "I love JavaScript";

let result = str.match(/Java(Script)/g);

console.log( result[0] ); // JavaScript
console.log( result.length ); // 1
```

如果没有匹配项，则无论是否带有标记 `g` ，都将返回 `null`

```js
let str = "I love JavaScript";

let result = str.match(/HTML/);

console.log(result); // null
```

### str.matchAll(regexp)

返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器

```js
const regexp = /t(e)(st(\d?))/g;
const str = 'test1test2';

const array = [...str.matchAll(regexp)];

console.log(array[0]);
// expected output: Array ["test1", "e", "st1", "1"]

console.log(array[1]);
// expected output: Array ["test2", "e", "st2", "2"]
```



### str.search(regexp)

返回第一个匹配项的位置，如果未找到，则返回 `-1`

```js
let str = "A drop of ink may make a million think";

console.log( str.search( /ink/i ) ); // 10（第一个匹配位置）
```

这里需要注意的是，`search` 仅查找第一个匹配项

### str.replace(regexp)

替换与正则表达式匹配的子串，并返回替换后的字符串。在不设置全局匹配`g`的时候，只替换第一个匹配成功的字符串片段

```js
const reg1=/javascript/i;
const reg2=/javascript/ig;
console.log('hello Javascript Javascript Javascript'.replace(reg1,'js'));
//hello js Javascript Javascript
console.log('hello Javascript Javascript Javascript'.replace(reg2,'js'));
//hello js js js
```

### str.split(regexp)

使用正则表达式（或子字符串）作为分隔符来分割字符串

```js
console.log('12, 34, 56'.split(/,\s*/)) // 数组 ['12', '34', '56']
```

### regexp.exec(str)

`regexp.exec(str)` 方法返回字符串 `str` 中的 `regexp` 匹配项，与以前的方法不同，它是在正则表达式而不是字符串上调用的

根据正则表达式是否带有标志 `g`，它的行为有所不同

如果没有 `g`，那么 `regexp.exec(str)` 返回的第一个匹配与 `str.match(regexp)` 完全相同

如果有标记 `g`，调用 `regexp.exec(str)` 会返回第一个匹配项，并将紧随其后的位置保存在属性`regexp.lastIndex` 中。 下一次同样的调用会从位置 `regexp.lastIndex` 开始搜索，返回下一个匹配项，并将其后的位置保存在 `regexp.lastIndex` 中

```js
let str = 'More about JavaScript at https://javascript.info';
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  console.log( `Found ${result[0]} at position ${result.index}` );
  // Found JavaScript at position 11
  // Found javascript at position 33
}
```

### regexp.test(str)

查找匹配项，然后返回 `true/false` 表示是否存在

```js
let str = "I love JavaScript";

// 这两个测试相同
console.log( /love/i.test(str) ); // true
```

## 四、应用场景

通过上面的学习，我们对正则表达式有了一定的了解

下面再来看看正则表达式一些案例场景：

### 验证QQ合法性（5~15位、全是数字、不以0开头）：

```js
const patrn = /^[1-9][0-9]{4,14}$/
const isvalid = patrn.exec(s)
```

### 校验用户账号合法性（只能输入5-20个以字母开头、可带数字、“_”、“.”的字串）：

```js
var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
const isvalid = patrn.exec(s)
```

### 将`url`参数解析为对象

```js
const protocol = '(?<protocol>https?:)';
const host = '(?<host>(?<hostname>[^/#?:]+)(?::(?<port>\\d+))?)';
const path = '(?<pathname>(?:\\/[^/#?]+)*\\/?)';
const search = '(?<search>(?:\\?[^#]*)?)';
const hash = '(?<hash>(?:#.*)?)';
const reg = new RegExp(`^${protocol}\/\/${host}${path}${search}${hash}$`);
function execURL(url){
    const result = reg.exec(url);
    if(result){
        result.groups.port = result.groups.port || '';
        return result.groups;
    }
    return {
        protocol:'',host:'',hostname:'',port:'',
        pathname:'',search:'',hash:'',
    };
}

console.log(execURL('https://localhost:8080/?a=b#xxxx'));
protocol: "https:"
host: "localhost:8080"
hostname: "localhost"
port: "8080"
pathname: "/"
search: "?a=b"
hash: "#xxxx"
```

再将上面的`search`和`hash`进行解析

```js
function execUrlParams(str){
    str = str.replace(/^[#?&]/,'');
    const result = {};
    if(!str){ //如果正则可能配到空字符串，极有可能造成死循环，判断很重要
        return result; 
    }
    const reg = /(?:^|&)([^&=]*)=?([^&]*?)(?=&|$)/y
    let exec = reg.exec(str);
    while(exec){
        result[exec[1]] = exec[2];
        exec = reg.exec(str);
    }
    return result;
}
console.log(execUrlParams('#'));// {}
console.log(execUrlParams('##'));//{'#':''}
console.log(execUrlParams('?q=3606&src=srp')); //{q: "3606", src: "srp"}
console.log(execUrlParams('test=a=b=c&&==&a='));//{test: "a=b=c", "": "=", a: ""}
```



### 验证电话号码

![image-20220720164648893](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220720164648893.png)

代码：

```js
var checkPhone = (rule, value, callback) => {
    var reg = /^1[0-9]{10}$/;
    var flag = reg.test(value);
    if(flag) {
        callback();
    } else {
        callback(new Error('电话号码格式不正确'))
    }
}
```

![image-20220720164735284](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220720164735284.png)





# 20. 说说你对事件循环的理解

## 一、是什么

首先，`JavaScript`是一门单线程的语言，意味着同一时间内只能做一件事，但是这并不意味着单线程就是阻塞，而实现单线程非阻塞的方法就是事件循环

在`JavaScript`中，所有的任务都可以分为

- 同步任务：立即执行的任务，同步任务一般会直接进入到主线程中执行
- 异步任务：异步执行的任务，比如`ajax`网络请求，`setTimeout`定时函数等

同步任务与异步任务的运行流程图如下：

![image-20220726124042195](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726124042195.png)

从上面我们可以看到，同步任务进入主线程，即主执行栈，异步任务进入任务队列，主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行。上述过程的不断重复就事件循环

## 二、宏任务与微任务

如果将任务划分为同步任务和异步任务并不是那么的准确，举个例子：

```js
console.log(1)

setTimeout(()=>{
    console.log(2)
}, 0)

new Promise((resolve, reject)=>{
    console.log('new Promise')
    resolve()
}).then(()=>{
    console.log('then')
})

console.log(3)
```

如果按照上面流程图来分析代码，我们会得到下面的执行步骤：

- `console.log(1)`，同步任务，主线程中执行
- `setTimeout()` ，异步任务，放到 `Event Table`，0 毫秒后`console.log(2)`回调推入 `Event Queue` 中
- `new Promise` ，同步任务，主线程直接执行
- `.then` ，异步任务，放到 `Event Table`
- `console.log(3)`，同步任务，主线程执行

所以按照分析，它的结果应该是 `1` => `'new Promise'` => `3` => `2` => `'then'`

但是实际结果是：`1`=>`'new Promise'`=> `3` => `'then'` => `2`

出现分歧的原因在于异步任务执行顺序，事件队列其实是一个“先进先出”的数据结构，排在前面的事件会优先被主线程读取

例子中 `setTimeout`回调事件是先进入队列中的，按理说应该先于 `.then` 中的执行，但是结果却偏偏相反

原因在于异步任务还可以细分为微任务与宏任务

### 微任务

一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前

常见的微任务有：

- Promise.then
- MutaionObserver
- Object.observe（已废弃；Proxy 对象替代）
- process.nextTick（Node.js）

### 宏任务

宏任务的时间粒度比较大，执行的时间间隔是不能精确控制的，对一些高实时性的需求就不太符合

常见的宏任务有：

- script (可以理解为外层同步代码)
- setTimeout/setInterval
- UI rendering/UI事件
- postMessage、MessageChannel
- setImmediate、I/O（Node.js）

这时候，事件循环，宏任务，微任务的关系如图所示

![image-20220726124054101](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726124054101.png)

按照这个流程，它的执行机制是：

- 执行一个宏任务，如果遇到微任务就将它放到微任务的事件队列中
- 当前宏任务执行完成后，会查看微任务的事件队列，然后将里面的所有微任务依次执行完

回到上面的题目

```js
console.log(1)
setTimeout(()=>{
    console.log(2)
}, 0)
new Promise((resolve, reject)=>{
    console.log('new Promise')
    resolve()
}).then(()=>{
    console.log('then')
})
console.log(3)
```

流程如下

```js
// 遇到 console.log(1) ，直接打印 1
// 遇到定时器，属于新的宏任务，留着后面执行
// 遇到 new Promise，这个是直接执行的，打印 'new Promise'
// .then 属于微任务，放入微任务队列，后面再执行
// 遇到 console.log(3) 直接打印 3
// 好了本轮宏任务执行完毕，现在去微任务列表查看是否有微任务，发现 .then 的回调，执行它，打印 'then'
// 当一次宏任务执行完，再去执行新的宏任务，这里就剩一个定时器的宏任务了，执行它，打印 2
```

## 三、async与await

`async` 是异步的意思，`await`则可以理解为 `async wait`。所以可以理解`async`就是用来声明一个异步方法，而 `await`是用来等待异步方法执行

### async

`async`函数返回一个`promise`对象，下面两种方法是等效的

```js
function f() {
    return Promise.resolve('TEST');
}

// asyncF is equivalent to f!
async function asyncF() {
    return 'TEST';
}
```

### await

正常情况下，`await`命令后面是一个 `Promise`对象，返回该对象的结果。如果不是 `Promise`对象，就直接返回对应的值

```js
async function f(){
    // 等同于
    // return 123
    return await 123
}
f().then(v => console.log(v)) // 123
```



不管`await`后面跟着的是什么，`await`都会阻塞后面的代码

```js
async function fn1 (){
    console.log(1)
    await fn2()
    console.log(2) // 阻塞
}

async function fn2 (){
    console.log('fn2')
}

fn1()
console.log(3)
```

上面的例子中，`await` 会阻塞下面的代码（即加入微任务队列），先执行 `async`外面的同步代码，同步代码执行完，再回到 `async` 函数中，再执行之前阻塞的代码

所以上述输出结果为：`1`，`fn2`，`3`，`2`

## 四、流程分析

通过对上面的了解，我们对`JavaScript`对各种场景的执行顺序有了大致的了解

这里直接上代码：

```js
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}

async function async2() {
    console.log('async2')
}

console.log('script start')

setTimeout(function () {
    console.log('settimeout')
})

async1()

new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})

console.log('script end')
```

分析过程：

1. 执行整段代码，遇到 `console.log('script start')` 直接打印结果，输出 `script start`
2. 遇到定时器了，它是宏任务，先放着不执行
3. 遇到 `async1()`，执行 `async1` 函数，先打印 `async1 start`，下面遇到`await`怎么办？先执行 `async2`，打印 `async2`，然后阻塞下面代码（即加入微任务列表），跳出去执行同步代码
4. 跳到 `new Promise` 这里，直接执行，打印 `promise1`，下面遇到 `.then()`，它是微任务，放到微任务列表等待执行
5. 最后一行直接打印 `script end`，现在同步代码执行完了，开始执行微任务，即 `await`下面的代码，打印 `async1 end`
6. 继续执行下一个微任务，即执行 `then` 的回调，打印 `promise2`
7. 上一个宏任务所有事都做完了，开始下一个宏任务，就是定时器，打印 `settimeout`

所以最后的结果是：`script start`、`async1 start`、`async2`、`promise1`、`script end`、`async1 end`、`promise2`、`settimeout`





# 21. DOM常见的操作有哪些

## 一、DOM

文档对象模型 (DOM) 是 `HTML` 和 `XML` 文档的编程接口

它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容

任何 `HTML`或`XML`文档都可以用 `DOM`表示为一个由节点构成的层级结构

节点分很多类型，每种类型对应着文档中不同的信息和（或）标记，也都有自己不同的特性、数据和方法，而且与其他类型有某种关系，如下所示：

```html
<html>
    <head>
        <title>Page</title>
    </head>
    <body>
        <p>Hello World!</p >
    </body>
</html>
```

`DOM`像原子包含着亚原子微粒那样，也有很多类型的`DOM`节点包含着其他类型的节点。接下来我们先看看其中的三种：

```html
<div>
    <p title="title">
        content
    </p >
</div>
```

上述结构中，`div`、`p`就是元素节点，`content`就是文本节点，`title`就是属性节点

## 二、操作

日常前端开发，我们都离不开`DOM`操作

在以前，我们使用`Jquery`，`zepto`等库来操作`DOM`，之后在`vue`，`Angular`，`React`等框架出现后，我们通过操作数据来控制`DOM`（绝大多数时候），越来越少的去直接操作`DOM`

但这并不代表原生操作不重要。相反，`DOM`操作才能有助于我们理解框架深层的内容

下面就来分析`DOM`常见的操作，主要分为：

- 创建节点
- 查询节点
- 更新节点
- 添加节点
- 删除节点

### 创建节点

#### createElement

创建新元素，接受一个参数，即要创建元素的标签名

```js
const divEl = document.createElement("div");
```

#### createTextNode

创建一个文本节点

```js
const textEl = document.createTextNode("content");
```

#### createDocumentFragment

用来创建一个文档碎片，它表示一种轻量级的文档，主要是用来存储临时节点，然后把文档碎片的内容一次性添加到`DOM`中

```js
const fragment = document.createDocumentFragment();
```

当请求把一个`DocumentFragment` 节点插入文档树时，插入的不是 `DocumentFragment`自身，而是它的所有子孙节点

#### createAttribute

创建属性节点，可以是自定义属性

```js
const dataAttribute = document.createAttribute('custom');
consle.log(dataAttribute);
```

### 获取节点

#### querySelector

传入任何有效的`css` 选择器，即可选中单个 `DOM`元素（首个）：

```js
document.querySelector('.element')
document.querySelector('#element')
document.querySelector('div')
document.querySelector('[name="username"]')
document.querySelector('div + p > span')
```

如果页面上没有指定的元素时，返回 `null`

#### querySelectorAll

返回一个包含节点子树内所有与之相匹配的`Element`节点列表，如果没有相匹配的，则返回一个空节点列表

```js
const notLive = document.querySelectorAll("p");
```

需要注意的是，该方法返回的是一个 `NodeList`的静态实例，它是一个静态的“快照”，而非“实时”的查询

关于获取`DOM`元素的方法还有如下，就不一一述说

```js
document.getElementById('id属性值');返回拥有指定id的对象的引用
document.getElementsByClassName('class属性值');返回拥有指定class的对象集合
document.getElementsByTagName('标签名');返回拥有指定标签名的对象集合
document.getElementsByName('name属性值'); 返回拥有指定名称的对象结合
document/element.querySelector('CSS选择器');  仅返回第一个匹配的元素
document/element.querySelectorAll('CSS选择器');   返回所有匹配的元素
document.documentElement;  获取页面中的HTML标签
document.body; 获取页面中的BODY标签
document.all[''];  获取页面中的所有元素节点的对象集合型
```

除此之外，每个`DOM`元素还有`parentNode`、`childNodes`、`firstChild`、`lastChild`、`nextSibling`、`previousSibling`属性，关系图如下图所示

![img](https://static.vue-js.com/c100f450-7fdc-11eb-ab90-d9ae814b240d.png)

### 更新节点

#### innerHTML

不但可以修改一个`DOM`节点的文本内容，还可以直接通过`HTML`片段修改`DOM`节点内部的子树

```js
// 获取<p id="p">...</p >
var p = document.getElementById('p');
// 设置文本为abc:
p.innerHTML = 'ABC'; // <p id="p">ABC</p >
// 设置HTML:
p.innerHTML = 'ABC <span style="color:red">RED</span> XYZ';
// <p>...</p >的内部结构已修改
```

#### innerText、textContent

自动对字符串进行`HTML`编码，保证无法设置任何`HTML`标签

```js
// 获取<p id="p-id">...</p >
var p = document.getElementById('p-id');
// 设置文本:
p.innerText = '<script>alert("Hi")</script>';
// HTML被自动编码，无法设置一个<script>节点:
// <p id="p-id">&lt;script&gt;alert("Hi")&lt;/script&gt;</p >
```

两者的区别在于读取属性时，`innerText`不返回隐藏元素的文本，而`textContent`返回所有文本

#### style

`DOM`节点的`style`属性对应所有的`CSS`，可以直接获取或设置。遇到`-`需要转化为驼峰命名

```js
// 获取<p id="p-id">...</p >
const p = document.getElementById('p-id');
// 设置CSS:
p.style.color = '#ff0000';
p.style.fontSize = '20px'; // 驼峰命名
p.style.paddingTop = '2em';
```

### 添加节点

#### innerHTML

如果这个DOM节点是空的，例如，`<div></div>`，那么，直接使用`innerHTML = '<span>child</span>'`就可以修改`DOM`节点的内容，相当于添加了新的`DOM`节点

如果这个DOM节点不是空的，那就不能这么做，因为`innerHTML`会直接替换掉原来的所有子节点

#### appendChild

把一个子节点添加到父节点的最后一个子节点

举个例子

```html
<!-- HTML结构 -->
<p id="js">JavaScript</p >
<div id="list">
    <p id="java">Java</p >
    <p id="python">Python</p >
    <p id="scheme">Scheme</p >
</div>
```

添加一个`p`元素

```js
const js = document.getElementById('js')
js.innerHTML = "JavaScript"
const list = document.getElementById('list');
list.appendChild(js);
```

现在`HTML`结构变成了下面

```html
<!-- HTML结构 -->
<div id="list">
    <p id="java">Java</p >
    <p id="python">Python</p >
    <p id="scheme">Scheme</p >
    <p id="js">JavaScript</p >  <!-- 添加元素 -->
</div>
```

上述代码中，我们是获取`DOM`元素后再进行添加操作，这个`js`节点是已经存在当前文档树中，因此这个节点首先会从原先的位置删除，再插入到新的位置

如果动态添加新的节点，则先创建一个新的节点，然后插入到指定的位置

```js
const list = document.getElementById('list'),
const haskell = document.createElement('p');
haskell.id = 'haskell';
haskell.innerText = 'Haskell';
list.appendChild(haskell);
```

#### insertBefore

把子节点插入到指定的位置，使用方法如下：

```js
parentElement.insertBefore(newElement, referenceElement)
```

子节点会插入到`referenceElement`之前

#### setAttribute

在指定元素中添加一个属性节点，如果元素中已有该属性改变属性值

```js
const div = document.getElementById('id')
div.setAttribute('class', 'white');//第一个参数属性名，第二个参数属性值。
```

### 删除节点

删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的`removeChild`把自己删掉

```js
// 拿到待删除节点:
const self = document.getElementById('to-be-removed');
// 拿到父节点:
const parent = self.parentElement;
// 删除:
const removed = parent.removeChild(self);
removed === self; // true
```

删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置





# 22. 说说你对BOM的理解，常见的BOM对象你了解哪些？

## 一、是什么

`BOM` (Browser Object Model)，浏览器对象模型，提供了独立于内容与浏览器窗口进行交互的对象

其作用就是跟浏览器做一些交互效果,比如如何进行页面的后退，前进，刷新，浏览器的窗口发生变化，滚动条的滚动，以及获取客户的一些信息如：浏览器品牌版本，屏幕分辨率

浏览器的全部内容可以看成`DOM`，整个浏览器可以看成`BOM`。区别如下：

![image-20220726124143457](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726124143457.png)

## 二、window

`Bom`的核心对象是`window`，它表示浏览器的一个实例

在浏览器中，`window`对象有双重角色，即是浏览器窗口的一个接口，又是全局对象

因此所有在全局作用域中声明的变量、函数都会变成`window`对象的属性和方法

```js
var name = 'js每日一题';
function lookName(){
  alert(this.name);
}

console.log(window.name);  //js每日一题
lookName();                //js每日一题
window.lookName();         //js每日一题
```

关于窗口控制方法如下：

- `moveBy(x,y)`：从当前位置水平移动窗体x个像素，垂直移动窗体y个像素，x为负数，将向左移动窗体，y为负数，将向上移动窗体
- `moveTo(x,y)`：移动窗体左上角到相对于屏幕左上角的(x,y)点
- `resizeBy(w,h)`：相对窗体当前的大小，宽度调整w个像素，高度调整h个像素。如果参数为负值，将缩小窗体，反之扩大窗体
- `resizeTo(w,h)`：把窗体宽度调整为w个像素，高度调整为h个像素
- `scrollTo(x,y)`：如果有滚动条，将横向滚动条移动到相对于窗体宽度为x个像素的位置，将纵向滚动条移动到相对于窗体高度为y个像素的位置
- `scrollBy(x,y)`： 如果有滚动条，将横向滚动条向左移动x个像素，将纵向滚动条向下移动y个像素

`window.open()` 既可以导航到一个特定的`url`，也可以打开一个新的浏览器窗口

如果 `window.open()` 传递了第二个参数，且该参数是已有窗口或者框架的名称，那么就会在目标窗口加载第一个参数指定的URL

```js
window.open('htttp://www.vue3js.cn','topFrame')
==> < a href=" " target="topFrame"></ a>
```

`window.open()` 会返回新窗口的引用，也就是新窗口的 `window` 对象

```js
const myWin = window.open('http://www.vue3js.cn','myWin')
```

`window.close()` 仅用于通过 `window.open()` 打开的窗口

新创建的 `window` 对象有一个 `opener` 属性，该属性指向打开他的原始窗口对象

## 三、location

`url`地址如下：

```js
http://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=javascript#contents
```

`location`属性描述如下：

| 属性名   | 例子                                                   | 说明                                |
| -------- | ------------------------------------------------------ | ----------------------------------- |
| hash     | "#contents"                                            | utl中#后面的字符，没有则返回空串    |
| host     | www.wrox.com:80                                        | 服务器名称和端口号                  |
| hostname | www.wrox.com                                           | 域名，不带端口号                    |
| href     | http://www.wrox.com:80/WileyCDA/?q=javascript#contents | 完整url                             |
| pathname | "/WileyCDA/"                                           | 服务器下面的文件路径                |
| port     | 80                                                     | url的端口号，没有则为空             |
| protocol | http:                                                  | 使用的协议                          |
| search   | ?q=javascript                                          | url的查询字符串，通常为？后面的内容 |

除了 `hash`之外，只要修改`location`的一个属性，就会导致页面重新加载新`URL`

`location.reload()`，此方法可以重新刷新当前页面。这个方法会根据最有效的方式刷新页面，如果页面自上一次请求以来没有改变过，页面就会从浏览器缓存中重新加载

如果要强制从服务器中重新加载，传递一个参数`true`即可

## 四、navigator

`navigator` 对象主要用来获取浏览器的属性，区分浏览器类型。属性较多，且兼容性比较复杂

下表列出了`navigator`对象接口定义的属性和方法：

![image-20220726124226871](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726124226871.png)

![image-20220726124314150](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726124314150.png)

## 五、screen

保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度和像素高度

![image-20220726124348180](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726124348180.png)

## 六、history

`history`对象主要用来操作浏览器`URL`的历史记录，可以通过参数向前，向后，或者向指定`URL`跳转

常用的属性如下：

- `history.go()`

接收一个整数数字或者字符串参数：向最近的一个记录中包含指定字符串的页面跳转，

```js
history.go('maixaofei.com')
```

当参数为整数数字的时候，正数表示向前跳转指定的页面，负数为向后跳转指定的页面

```js
history.go(3) //向前跳转三个记录
history.go(-1) //向后跳转一个记录
```

- `history.forward()`：向前跳转一个页面
- `history.back()`：向后跳转一个页面
- `history.length`：获取历史记录数





# 23. 举例说明你对尾递归的理解，有哪些应用场景

## 一、递归

递归（英语：Recursion）

在数学与计算机科学中，是指在函数的定义中使用函数自身的方法

在函数内部，可以调用其他函数。如果一个函数在内部调用自身本身，这个函数就是递归函数

其核心思想是把一个大型复杂的问题层层转化为一个与原问题相似的规模较小的问题来求解

一般来说，递归需要有边界条件、递归前进阶段和递归返回阶段。当边界条件不满足时，递归前进；当边界条件满足时，递归返回

下面实现一个函数 `pow(x, n)`，它可以计算 `x` 的 `n` 次方

使用迭代的方式，如下：

```js
function pow(x, n) {
  let result = 1;

  // 再循环中，用 x 乘以 result n 次
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}
```

使用递归的方式，如下：

```js
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}
```

`pow(x, n)` 被调用时，执行分为两个分支：

```js
             if n==1  = x
             /
pow(x, n) =
             \
              else     = x * pow(x, n - 1)
```

也就是说`pow` 递归地调用自身 直到 `n == 1`

![image-20220726124434893](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726124434893.png)

为了计算 `pow(2, 4)`，递归变体经过了下面几个步骤：

1. `pow(2, 4) = 2 * pow(2, 3)`
2. `pow(2, 3) = 2 * pow(2, 2)`
3. `pow(2, 2) = 2 * pow(2, 1)`
4. `pow(2, 1) = 2`

因此，递归将函数调用简化为一个更简单的函数调用，然后再将其简化为一个更简单的函数，以此类推，直到结果

## 二、尾递归

在**传统的递归中**，典型的模型是首先执行递归调用，然后获取递归调用的返回值并计算结果。以这种方式，在每次递归调用返回之前，您不会得到计算结果。传统地递归过程就是函数调用，涉及返回地址、函数参数、寄存器值等压栈（在x86-64上通常用寄存器保存函数参数），这样做的缺点有二：

- 效率低，占内存
- 如果递归链过长，可能会**statck overflow**

若函数在尾位置调用自身（或是一个尾调用本身的其他函数等等），则称这种情况为**尾递归**。尾递归也是递归的一种特殊情形。尾递归是一种特殊的尾调用，即在尾部直接调用自身的递归函数。对尾递归的优化也是关注尾调用的主要原因。尾调用不一定是递归调用，但是尾递归特别有用，也比较容易实现。

### 尾递归的原理：

当编译器检测到一个函数调用是尾递归的时候，它就覆盖当前的活动记录而不是在栈中去创建一个新的。编译器可以做到这点，因为递归调用是当前活跃期内最后一条待执行的语句，于是当这个调用返回时栈帧中并没有其他事情可做，因此也就没有保存栈帧的必要了。通过覆盖当前的栈帧而不是在其之上重新添加一个，这样所使用的栈空间就大大缩减了，这使得实际的运行效率会变得更高。


尾递归在普通尾调用的基础上，多出了2个特征：

- 在尾部调用的是函数自身 （Self-called）；
- 可通过优化，使得计算仅占用常量栈空间 (Stack Space)。

### 说明：

传统模式的编译器对于尾调用的处理方式就像处理其他普通函数调用一样，总会在调用时创建一个新的栈帧（stack frame）并将其推入调用栈顶部，用于表示该次函数调用。

当一个函数调用发生时，电脑必须 “记住” 调用函数的位置 —— 返回位置，才可以在调用结束时带着返回值回到该位置，返回位置一般存在调用栈上。在尾调用这种特殊情形中，电脑理论上可以不需要记住尾调用的位置而从被调用的函数直接带着返回值返回调用函数的返回位置（相当于直接连续返回两次）。尾调用消除即是在不改变当前调用栈（也不添加新的返回位置）的情况下跳到新函数的一种优化（完全不改变调用栈是不可能的，还是需要校正调用栈上形式参数与局部变量的信息。）

由于当前函数帧上包含局部变量等等大部分的东西都不需要了，当前的函数帧经过适当的更动以后可以直接当作被尾调用的函数的帧使用，然后程序即可以跳到被尾调用的函数。产生这种函数帧更动代码与 “jump”（而不是一般常规函数调用的代码）的过程称作尾调用消除(Tail Call Elimination)或尾调用优化(Tail Call Optimization, TCO)。尾调用优化让位于尾位置的函数调用跟 goto 语句性能一样高，也因此使得高效的结构编程成为现实。

然而，对于 C++ 等语言来说，在函数最后 return g(x); 并不一定是尾递归——在返回之前很可能涉及到对象的析构函数，使得 g(x) 不是最后执行的那个。这可以通过返回值优化来解决。

在**尾递归中**，首先执行计算，然后执行递归调用，将当前步骤的结果传递给下一个递归步骤。这导致最后一个语句采用的形式`(return (recursive-function params))`。**基本上，任何给定递归步骤的返回值与下一个递归调用的返回值相同**。

我们考虑一个最基本的关于N的求和函数，（例如`sum(5) = 1 + 2 + 3 + 4 + 5 = 15`）。

这是一个使用JavaScript实现的递归函数：

```js
function recsum(x) {
    if (x===1) {
        return x;
    } else {
        return x + recsum(x-1);
    }
}
```

如果你调用`recsum(5)`，JavaScript解释器将会按照下面的次序来计算：

```js
recsum(5)
5 + recsum(4)
5 + (4 + recsum(3))
5 + (4 + (3 + recsum(2)))
5 + (4 + (3 + (2 + recsum(1))))
5 + (4 + (3 + (2 + 1)))
15
```

注意在JavaScript解释器计算recsum（5）之前，每个递归调用必须全部完成。

这是同一函数的尾递归版本：

```js
function tailrecsum(x, running_total=0) {
    if (x===0) {
        return running_total;
    } else {
        return tailrecsum(x-1, running_total+x);
    }
}
```

下面是当你调用tailrecsum(5)的时候实际的事件调用顺序：

```js
tailrecsum(5, 0)
tailrecsum(4, 5)
tailrecsum(3, 9)
tailrecsum(2, 12)
tailrecsum(1, 14)
tailrecsum(0, 15)
15
```

在尾递归的情况下，每次递归调用的时候，`running_total`都会更新。

## 二、应用场景

数组求和

```js
function sumArray(arr, total) {
    if(arr.length === 1) {
        return total
    }
    return sumArray(arr, total + arr.pop())
}
```

使用尾递归优化求斐波那契数列

```js
function factorial2 (n, start = 1, total = 1) {
    if(n <= 2){
        return total
    }
    return factorial2 (n -1, total, total + start)
}
```

数组扁平化

```js
let a = [1,2,3, [1,2,3, [1,2,3]]]
// 变成
let a = [1,2,3,1,2,3,1,2,3]
// 具体实现
function flat(arr = [], result = []) {
    arr.forEach(v => {
        if(Array.isArray(v)) {
            result = result.concat(flat(v, []))
        }else {
            result.push(v)
        }
    })
    return result
}
```

数组对象格式化

```js
let obj = {
    a: '1',
    b: {
        c: '2',
        D: {
            E: '3'
        }
    }
}
// 转化为如下：
let obj = {
    a: '1',
    b: {
        c: '2',
        d: {
            e: '3'
        }
    }
}

// 代码实现
function keysLower(obj) {
    let reg = new RegExp("([A-Z]+)", "g");
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let temp = obj[key];
            if (reg.test(key.toString())) {
                // 将修改后的属性名重新赋值给temp，并在对象obj内添加一个转换后的属性
                temp = obj[key.replace(reg, function (result) {
                    return result.toLowerCase()
                })] = obj[key];
                // 将之前大写的键属性删除
                delete obj[key];
            }
            // 如果属性是对象或者数组，重新执行函数
            if (typeof temp === 'object' || Object.prototype.toString.call(temp) === '[object Array]') {
                keysLower(temp);
            }
        }
    }
    return obj;
};
```





# (TODO)24. 说说你对函数式编程的理解？优缺点？

## 一、是什么

函数式编程是一种"编程范式"（programming paradigm），一种编写程序的方法论

主要的编程范式有三种：命令式编程，声明式编程和函数式编程

相比命令式编程，函数式编程更加强调程序执行的结果而非执行的过程，倡导利用若干简单的执行单元让计算结果不断渐进，逐层推导复杂的运算，而非设计一个复杂的执行过程

举个例子，将数组每个元素进行平方操作，命令式编程与函数式编程如下

```js
// 命令式编程
var array = [0, 1, 2, 3]
for(let i = 0; i < array.length; i++) {
    array[i] = Math.pow(array[i], 2)
}

// 函数式方式
[0, 1, 2, 3].map(num => Math.pow(num, 2))
```

简单来讲，就是要把过程逻辑写成函数，定义好输入参数，只关心它的输出结果

即是一种描述集合和集合之间的转换关系，输入通过函数都会返回有且只有一个输出值

![image-20220726124524906](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726124524906.png)

可以看到，函数实际上是一个关系，或者说是一种映射，而这种映射关系是可以组合的，一旦我们知道一个函数的输出类型可以匹配另一个函数的输入，那他们就可以进行组合

## 二、概念

### 纯函数

函数式编程旨在尽可能的提高代码的无状态性和不变性。要做到这一点，就要学会使用无副作用的函数，也就是纯函数

纯函数是对给定的输入返还相同输出的函数，并且要求你所有的数据都是不可变的，即纯函数=无状态+数据不可变

![image-20220726124539000](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726124539000.png)

举一个简单的例子

```js
let double = value=>value*2;
```

特性：

- 函数内部传入指定的值，就会返回确定唯一的值
- 不会造成超出作用域的变化，例如修改全局变量或引用传递的参数

优势：

- 使用纯函数，我们可以产生可测试的代码

```js
test('double(2) 等于 4', () => {
  expect(double(2)).toBe(4);
})
```

- 不依赖外部环境计算，不会产生副作用，提高函数的复用性
- 可读性更强 ，函数不管是否是纯函数 都会有一个语义化的名称，更便于阅读
- 可以组装成复杂任务的可能性。符合模块化概念及单一职责原则

### 高阶函数

在我们的编程世界中，我们需要处理的其实也只有“数据”和“关系”，而关系就是函数

编程工作也就是在找一种映射关系，一旦关系找到了，问题就解决了，剩下的事情，就是让数据流过这种关系，然后转换成另一个数据，如下图所示

![image-20220726124551498](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726124551498.png)

在这里，就是高阶函数的作用。高级函数，就是以函数作为输入或者输出的函数被称为高阶函数

通过高阶函数抽象过程，注重结果，如下面例子

```js
const forEach = function(arr,fn){
    for(let i=0;i<arr.length;i++){
        fn(arr[i]);
    }
}
let arr = [1,2,3];
forEach(arr,(item)=>{
    console.log(item);
})
```

上面通过高阶函数 `forEach`来抽象循环如何做的逻辑，直接关注做了什么

高阶函数存在缓存的特性，主要是利用闭包作用

```js
const once = (fn)=>{
    let done = false;
    return function(){
        if(!done){
            fn.apply(this,fn);
        }else{
            console.log("该函数已经执行");
        }
        done = true;
    }
}
```

### 柯里化

柯里化是把一个多参数函数转化成一个嵌套的一元函数的过程

一个二元函数如下：

```js
let fn = (x,y)=>x+y;
```

转化成柯里化函数如下：

```js
const curry = function(fn){
    return function(x){
        return function(y){
            return fn(x,y);
        }
    }
}
let myfn = curry(fn);
console.log( myfn(1)(2) );
```

上面的`curry`函数只能处理二元情况，下面再来实现一个实现多参数的情况

```js
// 多参数柯里化；
const curry = function(fn){
    return function curriedFn(...args){
        if(args.length<fn.length){
            return function(){
                return curriedFn(...args.concat([...arguments]));
            }
        }
        return fn(...args);
    }
}
const fn = (x,y,z,a)=>x+y+z+a;
const myfn = curry(fn);
console.log(myfn(1)(2)(3)(1));
```

关于柯里化函数的意义如下：

- 让纯函数更纯，每次接受一个参数，松散解耦
- 惰性执行

### 组合与管道

组合函数，目的是将多个函数组合成一个函数

举个简单的例子：

```js
function afn(a){
    return a*2;
}
function bfn(b){
    return b*3;
}
const compose = (a,b) => c => a(b(c));
let myfn =  compose(afn, bfn);
console.log( myfn(2));
```

可以看到`compose`实现一个简单的功能：形成了一个新的函数，而这个函数就是一条从 `bfn -> afn` 的流水线

下面再来看看如何实现一个多函数组合：

```js
const compose = (...fns) => val => fns.reverse().reduce((acc,fn) => fn(acc),val);
```

`compose`执行是从右到左的。而管道函数，执行顺序是从左到右执行的

```js
const pipe = (...fns) => val => fns.reduce((acc,fn) => fn(acc),val);
```

组合函数与管道函数的意义在于：可以把很多小函数组合起来完成更复杂的逻辑

## 三、优缺点

#### 优点

- 更好的管理状态：因为它的宗旨是无状态，或者说更少的状态，能最大化的减少这些未知、优化代码、减少出错情况
- 更简单的复用：固定输入->固定输出，没有其他外部变量影响，并且无副作用。这样代码复用时，完全不需要考虑它的内部实现和外部影响
- 更优雅的组合：往大的说，网页是由各个组件组成的。往小的说，一个函数也可能是由多个小函数组成的。更强的复用性，带来更强大的组合性
- 隐性好处。减少代码量，提高维护性

#### 缺点：

- 性能：函数式编程相对于指令式编程，性能绝对是一个短板，因为它往往会对一个方法进行过度包装，从而产生上下文切换的性能开销
- 资源占用：在 JS 中为了实现对象状态的不可变，往往会创建新的对象，因此，它对垃圾回收所产生的压力远远超过其他编程方式
- 递归陷阱：在函数式编程中，为了实现迭代，通常会采用递归操作







# 25. Javascript中如何实现函数缓存？函数缓存有哪些应用场景？

## 一、是什么

函数缓存，就是将函数运算过的结果进行缓存

本质上就是用空间（缓存存储）换时间（计算过程）

常用于缓存数据计算结果和缓存对象

```js
const add = (a,b) => a+b;
const calc = memoize(add); // 函数缓存
calc(10,20);// 30
calc(10,20);// 30 缓存
```

缓存只是一个临时的数据存储，它保存数据，以便将来对该数据的请求能够更快地得到处理

## 二、如何实现

实现函数缓存主要依靠闭包、柯里化、高阶函数，这里再简单复习下：

### 闭包

闭包可以理解成，函数 + 函数体内可访问的变量总和

```js
(function() {
    var a = 1;
    function add() {
        const b = 2
        let sum = b + a
        console.log(sum); // 3
    }
    add()
})()
```

`add`函数本身，以及其内部可访问的变量，即 `a = 1`，这两个组合在⼀起就形成了闭包

### 柯里化

把接受多个参数的函数转换成接受一个单一参数的函数

```js
// 非函数柯里化
var add = function (x,y) {
    return x + y;
}
add(3,4) //7

// 函数柯里化
var add2 = function (x) {
    //**返回函数**
    return function (y) {
        return x+y;
    }
}
add2(3)(4) //7
```

将一个二元函数拆分成两个一元函数

### 高阶函数

通过接收其他函数作为参数或返回其他函数的函数

```js
function foo(){
  var a = 2;

  function bar() {
    console.log(a);
  }
  return bar;
}
var baz = foo();
baz();//2
```

函数 `foo` 如何返回另一个函数 `bar`，`baz` 现在持有对 `foo` 中定义的`bar` 函数的引用。由于闭包特性，`a`的值能够得到

下面再看看如何实现函数缓存，实现原理也很简单，把参数和对应的结果数据存在一个对象中，调用时判断参数对应的数据是否存在，存在就返回对应的结果数据，否则就返回计算结果

如下所示

```js
const memoize = function (func, content) {
  let cache = Object.create(null)
  content = content || this
  return (...key) => {
    if (!cache[key]) {
      cache[key] = func.apply(content, key)
    }
    return cache[key]
  }
}
```

调用方式也很简单

```js
const calc = memoize(add);
const num1 = calc(100,200)
const num2 = calc(100,200) // 缓存得到的结果
```

过程分析：

- 在当前函数作用域定义了一个空对象，用于缓存运行结果
- 运用柯里化返回一个函数，返回的函数由于闭包特性，可以访问到`cache`
- 然后判断输入参数是不是在`cache`的中。如果已经存在，直接返回`cache`的内容，如果没有存在，使用函数`func`对输入参数求值，然后把结果存储在`cache`中

## 三、应用场景

虽然使用缓存效率是非常高的，但并不是所有场景都适用，因此千万不要极端的将所有函数都添加缓存

以下几种情况下，适合使用缓存：

- 对于昂贵的函数调用，执行复杂计算的函数
- 对于具有有限且高度重复输入范围的函数
- 对于具有重复输入值的递归函数
- 对于纯函数，即每次使用特定输入调用时返回相同输出的函数





# 26. 说说 Javascript 数字精度丢失的问题，如何解决？

## 一、场景复现

一个经典的面试题

```js
0.1 + 0.2 === 0.3 // false
```

为什么是`false`呢?

先看下面这个比喻

比如一个数 1÷3=0.33333333......

3会一直无限循环，数学可以表示，但是计算机要存储，方便下次取出来再使用，但0.333333...... 这个数无限循环，再大的内存它也存不下，所以不能存储一个相对于数学来说的值，只能存储一个近似值，当计算机存储后再取出时就会出现精度丢失问题

## 二、浮点数

“浮点数”是一种表示数字的标准，整数也可以用浮点数的格式来存储

我们也可以理解成，浮点数就是小数

在`JavaScript`中，现在主流的数值类型是`Number`，而`Number`采用的是`IEEE754`规范中64位双精度浮点数编码

这样的存储结构优点是可以归一化处理整数和小数，节省存储空间

对于一个整数，可以很轻易转化成十进制或者二进制。但是对于一个浮点数来说，因为小数点的存在，小数点的位置不是固定的。解决思路就是使用科学计数法，这样小数点位置就固定了

而计算机只能用二进制（0或1）表示，二进制转换为科学记数法的公式如下：

![image-20220726124641096](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726124641096.png)

其中，`a`的值为0或者1，e为小数点移动的位置

举个例子：

27.0转化成二进制为11011.0 ，科学计数法表示为：

![image-20220726124649967](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726124649967.png)

前面讲到，`javaScript`存储方式是双精度浮点数，其长度为8个字节，即64位比特

64位比特又可分为三个部分：

- 符号位S：第 1 位是正负数符号位（sign），0代表正数，1代表负数
- 指数位E：中间的 11 位存储指数（exponent），用来表示次方数，可以为正负数。在双精度浮点数中，指数的固定偏移量为1023
- 尾数位M：最后的 52 位是尾数（mantissa），超出的部分自动进一舍零

如下图所示：

![image-20220726124702091](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726124702091.png)

举个例子：

27.5 转换为二进制11011.1

11011.1转换为科学记数法 ![[公式]](https://www.zhihu.com/equation?tex=1.10111%2A2%5E4)

符号位为1(正数)，指数位为4+，1023+4，即1027

因为它是十进制的需要转换为二进制，即 `10000000011`，小数部分为`10111`，补够52位即： 1011 1000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000`

所以27.5存储为计算机的二进制标准形式（符号位+指数位+小数部分 (阶数)），既下面所示

0+10000000011+011 1000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000`

## 三、问题分析

再回到问题上

```js
0.1 + 0.2 === 0.3 // false
```

通过上面的学习，我们知道，在`javascript`语言中，0.1 和 0.2 都转化成二进制后再进行运算

```js
// 0.1 和 0.2 都转化成二进制后再进行运算
0.00011001100110011001100110011001100110011001100110011010 +
0.0011001100110011001100110011001100110011001100110011010 =
0.0100110011001100110011001100110011001100110011001100111

// 转成十进制正好是 0.30000000000000004
```

所以输出`false`

再来一个问题，那么为什么`x=0.1`得到`0.1`？

主要是存储二进制时小数点的偏移量最大为52位，最多可以表达的位数是`2^53=9007199254740992`，对应科学计数尾数是 `9.007199254740992`，这也是 JS 最多能表示的精度

它的长度是 16，所以可以使用 `toPrecision(16)` 来做精度运算，超过的精度会自动做凑整处理

```js
.10000000000000000555.toPrecision(16)
// 返回 0.1000000000000000，去掉末尾的零后正好为 0.1
```

但看到的 `0.1` 实际上并不是 `0.1`。不信你可用更高的精度试试：

```js
0.1.toPrecision(21) = 0.100000000000000005551
```

如果整数大于 `9007199254740992` 会出现什么情况呢？

由于指数位最大值是1023，所以最大可以表示的整数是 `2^1024 - 1`，这就是能表示的最大整数。但你并不能这样计算这个数字，因为从 `2^1024` 开始就变成了 `Infinity`

```text
> Math.pow(2, 1023)
8.98846567431158e+307

> Math.pow(2, 1024)
Infinity
```

那么对于 `(2^53, 2^63)` 之间的数会出现什么情况呢？

- `(2^53, 2^54)` 之间的数会两个选一个，只能精确表示偶数
- `(2^54, 2^55)` 之间的数会四个选一个，只能精确表示4个倍数
- ... 依次跳过更多2的倍数

要想解决大数的问题你可以引用第三方库 `bignumber.js`，原理是把所有数字当作字符串，重新实现了计算逻辑，缺点是性能比原生差很多

### 小结

计算机存储双精度浮点数需要先把十进制数转换为二进制的科学记数法的形式，然后计算机以自己的规则{符号位+(指数位+指数偏移量的二进制)+小数部分}存储二进制的科学记数法

因为存储时有位数限制（64位），并且某些十进制的浮点数在转换为二进制数时会出现无限循环，会造成二进制的舍入操作(0舍1入)，当再转换为十进制时就造成了计算误差

## 四、解决方案

理论上用有限的空间来存储无限的小数是不可能保证精确的，但我们可以处理一下得到我们期望的结果

当你拿到 `1.4000000000000001` 这样的数据要展示时，建议使用 `toPrecision` 凑整并 `parseFloat` 转成数字后再显示，如下：

```text
parseFloat(1.4000000000000001.toPrecision(12)) === 1.4  // True
```

封装成方法就是：

```js
function strip(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision));
}
```

对于运算类操作，如 `+-*/`，就不能使用 `toPrecision` 了。正确的做法是把小数转成整数后再运算。以加法为例：

```js
/**
 * 精确加法
 */
function add(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}
```

最后还可以使用第三方库，如`Math.js`、`BigDecimal.js`



# 27. 什么是防抖和节流？有什么区别？如何实现？

## 一、是什么

本质上是优化高频率执行代码的一种手段

如：浏览器的 `resize`、`scroll`、`keypress`、`mousemove` 等事件在触发时，会不断地调用绑定在事件上的回调函数，极大地浪费资源，降低前端性能

为了优化体验，需要对这类事件进行调用次数的限制，对此我们就可以采用 **防抖（debounce）** 和 **节流（throttle）** 的方式来减少调用频率

#### 定义

- 防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
- 节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效

一个经典的比喻:

想象每天上班大厦底下的电梯。把电梯完成一次运送，类比为一次函数的执行和响应

假设电梯有两种运行策略 `debounce` 和 `throttle`，超时设定为15秒，不考虑容量限制

电梯第一个人进来后，15秒后准时运送一次，这是节流

电梯第一个人进来后，等待15秒。如果过程中又有人进来，15秒等待重新计时，直到15秒后开始运送，这是防抖

## 代码实现

### 节流

完成节流可以使用时间戳与定时器的写法

使用时间戳写法，事件会立即执行，停止触发后没有办法再次执行

```js
function throttled1(fn, delay = 500) {
    let oldtime = Date.now()
    return function (...args) {
        let newtime = Date.now()
        if (newtime - oldtime >= delay) {
            fn.apply(null, args)
            oldtime = Date.now()
        }
    }
}
```

使用定时器写法，`delay`毫秒后第一次执行，第二次事件停止触发后依然会再一次执行

```js
function throttled2(fn, delay = 500) {
    let timer = null
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                timer = null
            }, delay);
        }
    }
}
```

可以将时间戳写法的特性与定时器写法的特性相结合，实现一个更加精确的节流。实现如下

```js
function throttled(fn, delay) {
    let timer = null
    let starttime = Date.now()
    return function () {
        let curTime = Date.now() // 当前时间
        let remaining = delay - (curTime - starttime)  // 从上一次到现在，还剩下多少多余时间
        let context = this
        let args = arguments
        clearTimeout(timer)
        if (remaining <= 0) {
            fn.apply(context, args)
            starttime = Date.now()
        } else {
            timer = setTimeout(fn, remaining);
        }
    }
}
```

### 防抖

简单版本的实现

```js
function debounce(func, wait) {
    let timeout;

    return function () {
        let context = this; // 保存this指向
        let args = arguments; // 拿到event对象

        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}
```

防抖如果需要立即执行，可加入第三个参数用于判断，实现如下：

```js
function debounce(func, wait, immediate) {

    let timeout;

    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout); // timeout 不为null
        if (immediate) {
            let callNow = !timeout; // 第一次会立即执行，以后只有事件执行后才会再次触发
            timeout = setTimeout(function () {
                timeout = null;
            }, wait)
            if (callNow) {
                func.apply(context, args)
            }
        }
        else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
    }
}
```

## 二、区别

相同点：

- 都可以通过使用 `setTimeout` 实现
- 目的都是，降低回调执行频率。节省计算资源

不同点：

- 函数防抖，在一段连续操作结束后，处理回调，利用`clearTimeout`和 `setTimeout`实现。函数节流，在一段连续操作中，每一段时间只执行一次，频率较高的事件中使用来提高性能
- 函数防抖关注一定时间连续触发的事件，只在最后执行一次，而函数节流一段时间内只执行一次

例如，都设置时间频率为500ms，在2秒时间内，频繁触发函数，节流，每隔 500ms 就执行一次。防抖，则不管调动多少次方法，在2s后，只会执行一次

如下图所示：

![image-20220726124751281](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726124751281.png)

## 三、应用场景

防抖在连续的事件，只需触发一次回调的场景有：

- 搜索框搜索输入。只需用户最后一次输入完，再发送请求
- 窗口大小`resize`。只需窗口调整完成后，计算窗口大小。防止重复渲染。

节流在间隔一段时间执行一次回调的场景有：

- 滚动加载，加载更多或滚到底部监听
- 手机号验证码







