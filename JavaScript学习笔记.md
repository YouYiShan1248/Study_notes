# JavaScript学习笔记

## JavaScript基础

### 1.基本语法

```javascript
/*	控制浏览器弹出一个警告框	*/
alert("警告框中的文字");

/*	让计算机在页面中输入一个内容	*/
document.write("向body中输出一个内容");

/*	向控制台输出一个内容	*/
console.log("在控制台输出");

/*

	1.	JavaScript中严格区分大小写
	2.	JavaScript中每一条语句以分号（;）结尾，如果不写分号，浏览器会自动添加，但是会消耗系统资源。而且有些时候浏览器会加错分号。
	3.	JavaScript中会忽略多个空格和换行
	
	JavaScript底层保存标识符时，实际上是使用的Unicode编码，所以理论上所有的utf-8中含有的内容都可以作为标识符
	
	在js中，如果需要表示16进制的数字，则需要以0x开头

	如果需要表示8进制的数字，则需要以0开头

	如果需要表示2进制的数字，则需要以0b开头，但是不是所有的浏览器都支持
	
	
*/
```

#### 编写位置	

虽然可以卸载标签属性中，但是不推荐使用。

``` html
<button onclick="alert('写入js代码')">
  可以将js代码编写到onclick属性中  
</button>
<a href="javascript:alert('写入js代码')">将js代码编写到href属性中</a>
```

​	可以将js代码写到script标签中，也可以将js代码写在外部的js文件中，然后通过script标签，设置src属性的路径来引入。

```html
<script type="text/javascript" src="js/script.js"></script>
<!--
script标签一旦用于引入外部文件，就不能再编写代码了，编写的代码会被浏览器忽略，如果需要，则再创建一个script标签
-->
```

#### 标识符

在JS中所有的可以由我们自主命名的都可以称为是标识符

例如：变量名、函数名、属性名都属于标识符

命名一个标识符时需要遵守如下的规则：

1、标识符中可以含有字母、数字、_ 、$
2、标识符不能以数字开头
3、标识符不能是关键字或保留字
4、标识符一般采用驼峰命名法，首字母小写，每个单词开头大写，其余小写。

#### 数据类型

JavaScript中使用 var 关键字来声明一个变量。
JavaScript中一共有6中数据类型：
基本数据类型：
	String	字符串
	Number	数值
	Boolean	布尔值
	Null	空
	Undefined	未定义
引用数据类型：
	Object	对象

##### String字符串

在字符串中可以使用 \ 作为转义字符

- `\"`表示`"`

- `\'`表示`'`

- `\n`表示换行

- `\t`表示Tab制表符

- `\\`表示`\`

可以使用运算符	typeof 来检查一个变量的类型
	语法：	typeof 变量

##### Number数值

​	在JS中，所有的数值都是`Number`类型，包括整数和浮点数（小数）

​	**Number.MAX_VALUE**	表示的数字的最大值

​	**Number.MIN_VALUE**	大于0的最小值

​	**Infinity**

- `Infinity`表示正无穷

- `-Infinity` 表示负无穷

​	**NaN**

​	`NaN`是一个特殊的数字，表示 `Not A Number`



##### Null

Null类型的值只有一个，就是`null`

`null`这个值专门用来表示一个为空的对象

使用`typeof`检查一个`null`值时，会返回`object`



##### Undefined

Undefined（未定义）类型的值只有一个，就是`undefind`

当声明一个变量，但是并不给变量赋值时，它的值就是`undefined`

使用typeof检查一个`undefined`时，也会返回`undefined`



#### 强制类型转换

##### **转换为String**

**方式一：**调用被转换数据类型的toString()方法

```JavaScript
// Number转换为String
var a1 = 123;
var b1 = a1.toString();
console.log(typeof a1); // number
console.log(typeof b1); // string
// Boolean转换为String
var a2 = true;
var b2 = a2.toString();
console.log(typeof a2); // boolean
console.log(typeof b2); // string
```

`	null`和`undefined`这两个值没有`toString()`，如果调用他们的方法，会报错。

**方式二：**调用String()函数，并将被转换的数据作为参数传递给函数

```JavaScript
// Number转换为String
var a1 = 123;
var b1 = String(a1);
console.log(typeof a1); // number
console.log(typeof b1); // string
// Boolean转换为String
var a2 = true;
var b2 = String(a2);
console.log(typeof a2); // boolean
console.log(typeof b2); // string
// Null转换为String
var a3 = null;
var b3 = String(a3);
console.log(typeof a3); // object
console.log(typeof b3); // string
// Undefined转换为String
var a4 = undefined;
var b4 = String(a4);
console.log(typeof a4); // undefined
console.log(typeof b4); // string
```

##### **转换为Number**

**方式一：使用Number()函数**

-  字符串 --> 数字 

- - 如果是纯数字的字符串，则直接将其转换为数字

- - 如果字符串中有非数字的内容，则转换为`NaN`

- - 如果字符串是一个空串或者是一个全是空格的字符串，则转换为`0`

```JavaScript
// **转换方式一：使用Number()函数**
// 纯数字的字符串
var a1 = '123';         
a1 = Number(a1);
console.log(typeof a1); // number
console.log(a1); 	    // 123
// 非数字的内容
// var a2 = 'abc';         
var a2 = undefined;
a2 = Number(a2);
console.log(typeof a2); // number
console.log(a2);        // NaN 
// 空串
// var a3 = ' ';      
var a3 = null;       
a3 = Number(a3);        
console.log(typeof a3); // number
console.log(a3);        // 0
```

**方式二：针对于字符串类型**

- `parseInt()`把一个字符串转换为一个整数：可以将一个字符串中的有效整数部分取出来，然后转换为Number

- `parseFloat()`把一个字符串转换为一个浮点数：可以将一个字符串中的有效小数部分取出来，然后转换为Number

- 如果对非String使用`parseInt()`或`parseFloat()`，它会先将其转换为String，然后再操作

```JavaScript
var a1 = "123";
a1 = parseInt(a1);
console.log(typeof a1); // number
console.log(a1);        // 123
var a2 = "123.456";
a2 = parseInt(a2);
console.log(typeof a2); // number
console.log(a2);        // 123
var a3 = "123px";
a3 = parseInt(a3);
console.log(typeof a3); // number
console.log(a3);        // 123 
// var a4 = null;
// var a4 = undefined;
// var a4 = '';
// var a4 = 'abc';
// var a4 = true;
var a4 = false;
a4 = parseInt(a4);
console.log(typeof a4); // number
console.log(a4);        // NaN
```

##### **转换为Boolean**

**方式一：使用`Boolean()`函数**

- 数字-—->布尔 

- - 除了`0`和`NaN`，其余的都是`true`

- 字符串-—->布尔 

- - 除了空串，其余的都是`true`

- `null`和`undefined`都会转换为`false`

- 对象也会转换为`true`

```JavaScript
// - 数字-—->布尔
//   - 除了`0`和`NaN`，其余的都是`true`
// var a1 = 0;
var a1 = NaN;
a1 = Boolean(a1);
console.log(a1); // false
var a2 = 123;
a2 = Boolean(a2);
console.log(a2); // true
// - 字符串-—->布尔
//   - 除了空串，其余的都是`true`
var a3 = "123";
a3 = Boolean(a3);
console.log(a3); // true
var a4 = " ";
a4 = Boolean(a4);
console.log(a4); // true
var a5 = "";
a5 = Boolean(a5);
console.log(a5); // false
// - `null`和`undefined`都会转换为`false`
// var a6 = null;
var a6 = undefined;
a6 = Boolean(a6);
console.log(a6); // false
```

**方式二：隐式类型转换**

为任意的数据类型做两次非运算，即可将其转换为布尔值

```JavaScript
var a = "123";
var b = !!a;
console.log("a="+a+",b="+b); // a=true,b=true
```

### 2.对象

JS中数据类型

- String 字符串

- Number数值

- Boolean 布尔值

- Null空值

- Undefined 未定义

以上这五种类型属于基本数据类型，除此之外全都是对象。

​	基本数据类型都是单一的值`"hello" 123 true`，值和值之间没有任何的联系。

#### Object对象

在JS中来表示一个人的信息：

```JavaScript
var name = "孙悟空";
var gender = "男";
var age = 18;
```

如果使用基本数据类型的数据，我们所创建的变量都是独立的，不能成为一个整体。

对象属于一种复合的数据类型，在对象中可以保存多个不同数据类型的属性。

#### 对象的分类

**内建对象**

由ES标准中定义的对象，在任何的ES的实现中都可以使用

常见内建对象有以下，都可以直接通过new调用构造函数创建对象实例：

- Object、Function、Array、String、Number、Boolean、Date、RegExp

- Error（EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError）

```JavaScript
// Math
Math.sqrt(2);
// String
String(2);
// Number
Number("2");
```

**宿主对象**

由JS的运行环境提供的对象，目前来讲主要指由浏览器提供的对象

比如 `BOM DOM`

```JavaScript
// console
console.log("hello");
// document
document.write("hello");
```

JavaScript实现包括三部分：

| 组成                                       | 作用                                                   | 地位                  | 例子       |
| ------------------------------------------ | ------------------------------------------------------ | --------------------- | ---------- |
| ES（ECMAScript）                           | 描述JS语法和基本对象                                   | 核心                  |            |
| DOM（Document Object Model 文档对象模型）  | HTML和XML的应用程序接口，处理网页内容的方法和接口      | W3C标准               | `document` |
| BOM（Browser Object Model 浏览器对象模型） | 描述与浏览器进行交互的方法和接口，处理浏览器窗口和框架 | 浏览器厂商对DOM的实现 | `window`   |

**DOM**

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F07%2F14%2FjpVOLT42KarizhP.png&sign=a5436a6f522a27b4d14eb0748aed6e5467a88156020dcdec736314cdc9087cdd)

**BOM**

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F07%2F14%2Fp7AXdHUntDFq4PB.png&sign=5a2303d02abd4d933916cdfabf6703b84bfe9eb7febc727a01c46d7dce7f482f)

**DOM和BOM的关系**

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F07%2F14%2F5zjFWRyJe9ZuDq1.jpg&sign=e17d12504bf0451a8db2725c764ac0e1e70e7933f3ffd38f9331d14a4e6d0107)

**自定义对象**

由开发人员自己创建的对象

使用`new`关键字调用的函数，是构造函数`constructor`，构造函数是专门用来创建对象的

函数使用`typeof`检查一个对象时，会返回`object`

在对象中保存值称为属性

- 添加或修改对象属性的语法：`对象.属性名=属性值;`

- 读取对象属性的语法：`对象.属性名`

- 删除对象属性的语法：`delete 对象.属性名;`

```JavaScript
var obj = new Object();
// 向obj中添加一个name属性
obj.name = "孙悟空";
// 向obj中添加一个gender属性
obj.gender = "男";
// 向obj中添加一个age属性
obj.age = "18";
// 打印obj
console.log(typeof obj); // object
console.log(obj); // {"age":"18","gender":"男","name":"孙悟空"}
console.log(obj.name); // 孙悟空
```

如果要使用特殊的属性名，不能采用`.`的方式来操作，而需要使用另一种语法：`对象["属性名"]=属性值`，读取时也需要采用这种方式

```JavaScript
obj["name"] = "齐天大圣";
console.log(obj["name"]); // 齐天大圣
```

使用`[]`这种形式去操作属性，更加的灵活，在`[]`中可以直接传递一个变量，这样变量值是哪个就会读取哪个属性

```JavaScript
var n = "nihao";
obj[n] = "你好";
console.log(obj[n]); // 你好
```

JS对象的属性值，可以是任意的数据类型，包括对象

```JavaScript
var obj2 = new Object();
obj2.name = "猪八戒";
obj.bro = obj2;
console.log(obj.bro.name); // 猪八戒
```

`in`**运算符**

通过该运算符可以检查一个对象中是否含有指定的属性

如果有则返回`true`，没有则返回`false`

语法：`"属性名" in 对象`

```javascript
console.log("test" in obj); // false
console.log("name" in obj); // true
```

#### 基本数据类型和引用数据类型

**基本数据类型**

- JS中的变量都是保存到栈内存中的，基本数据类型的值直接在栈内存中存储

- 值与值之间是独立存在，修改一个变量不会影响其他的变量

```javascript
var a = 1;
var b = a;
console.log("a=" + a + ", b=" + b); // a=1, b=1
b = 2;
console.log("a=" + a + ", b=" + b); // a=1, b=2
```

**引用数据类型**

- 对象是保存到堆内存中的

- 每创建一个新的对象，就会在堆内存中开辟出一个新的空间，而变量保存的是对象的内存地址（对象的引用）

- 如果两个变量保存的是同一个对象引用，当一个通过一个变量修改属性时，另一个也会受到影响

```javascript
var obj3 = obj;
obj3.name = "斗战胜佛";
console.log(obj.name);  // 斗战胜佛
console.log(obj3.name); // 斗战胜佛
```

#### 对象字面量

使用对象字面量，可以在创建对象时，直接指定对象属性的语法：`{属性名: 属性值, 属性名: 属性值...}`

对象字面量的属性名可以加引号也可以不加（建议不加），如果要使用一些特殊的名字，则必须加引号

属性名和属性值是一组一组的名值对结构，名和值之间使用`:`连接，多个名值对之间使用`,`隔开

如果一个属性之后没有其他的属性了，就不要写`,`了

```javascript
var obj = {
    name: "孙悟空",
    age: 1000,
    gender: "男",
    bor:{
        name: "猪八戒"
    }
}
console.log(obj); // {"age":1000,"bor":{"name":"猪八戒"},"gender":"男","name":"孙悟空"}
```

#### 方法

对象的属性值可以是任何的数据类型，也可以是个函数

函数也可以成为对象的属性，如果一个函数作为一个对象的属性保存，那么我们称这个函数是这个对象的方法

```JavaScript
var obj2 = {
    name: "猪八戒",
    age: 18,
    sayName: function() {
        console.log(obj2.name);
    }
};
obj2.sayName(); // 猪八戒

//	调方法
obj.sayName();
//	调函数
fun();
```

#### 枚举对象中的属性

使用`for...in`语句语法：

```javascript
for(var 变量 in 对象) {
	语句...
}
    
    
var obj = {
    name: "孙悟空",
    age: 1000,
    gender: "男",
    address: "花果山"
};
for(var key in obj){
    console.log(key + "=" + obj.key);
    // name=undefined
    // age=undefined
    // gender=undefined
    // address=undefined
    console.log(key + "=" + obj[key]);
    // name=孙悟空
    // age=1000
    // gender=男
    // address=花果山
}
```



### 3.函数

函数也是一个对象，可以封装一些功能（代码），在需要时可以执行这些功能（代码），可以保存一些代码在需要的时候调用

使用`typeof`检查一个函数对象时，会返回`function`

```javascript
// 创建一个函数对象
// 可以将要封装的代码以字符串的形式传递给构造函数
var fun = new Function("console.log('Hello World.');");
// 封装到函数中的代码不会立即执行
// 函数中的代码会在函数调用的时候执行
// 调用函数语法：函数对象（）
// 当调用函数时，函数中封装的代码会按照顺序执行
fun(); // Hello World.
```

#### 函数的创建

**使用函数声明来创建一个函数**

```javascript
function 函数名([形参1, 形参2...形参N]) {
	语句...
}
// 调用函数
函数名();

function fun1(){
    console.log("Hello world.");
    alert("Hello World!");
    document.write("Helloworld");
}
fun1();

```

**使用函数表达式（匿名函数）来创建一个函数**

```JavaScript
var 函数名 = function([形参1, 形参2...形参N]) {
	语句...
};
// 调用函数
函数名();

var fun1 = function(){
    console.log("Hello world.");
    alert("Hello World!");
    document.write("Helloworld");
};
fun1();
```

#### 函数的参数

定义一个用来求两个数和的函数

​	可以在函数的`()`中来指定一个或多个形参（形式参数）多个形参之间使用`,`隔开，声明形参就相当于在函数内部声明了对应的变量

在调用函数时，可以在`()`中指定实参（实际参数）

-  调用函数时解析器不会检查**实参的类型**。所以要注意，是否有可能会接收到非法的参数，如果有可能则需要对参数进行类型的检查 

-  调用函数时，解析器也不会检查**实参的数量**，多余实参不会被赋值。如果实参的数量少于形参的数量，则没有对应实参的形参将是`undefined` 

```javascript
// 创建一个函数，用来计算三个数的和
function sum(a, b, c) {
    alert(a + b + c);
    return a + b + c;
}
sum(1, 2, 3, 4); // 6

// 调用函数
// 变量result的值就是函数的执行结果
// 函数返回什么result的值就是什么
var result = sum(1, 2, 3);
console.log("result = " + result);
```

####  函数的返回值

可以使用`return`来设置函数的返回值语法：`return 值`

`return`后的值将会作为函数的执行结果返回，可以定义一个变量，来接收该结果

在函数中`return`后的语句都不会执行

如果`return`语句后不跟任何值，就相当于返回一个`undefined`；如果函数中不写`return`，则也会返回`undefined`

`return`后可以跟任意类型的值

实参可以是任意的数据类型，也可以是一个对象。当我们的参数过多时，可以将参数封装到一个对象

```javascript
function sayHello(o){
    console.log("我是" + o.name
                + "，今年我" + o.age 
                + "岁了，我是一个" + o.gender 
                + "人，我住在" + o.address);
}			
var obj = {
    name: "孙悟空",
    age: 1000,
    gender: "男",
    address: "花果山"
};
sayHello(obj); // 我是孙悟空，今年我1000岁了，我是一个男人，我住在花果山
```

实参可以是一个对象，也可以是一个函数

```javascript
function calCirc(radius) {
    return Math.PI * Math.pow(radius, 2);
}
function fun(a){
    console.log("a = " + a);
}
fun(calCirc);  
// a = function calCirc(radius) {
//     return Math.PI * Math.pow(radius, 2);
// }
fun(calCirc(10)); // a = 314.1592653589793
```

`calCirc(10)`

- 调用函数

- 相当于使用的函数的返回值

`calCirc`

- 函数对象

- 相当于直接使用函数对象

**break、continue、return对比**

- `break`可以退出当前的循环

- `continue`用于跳过当次循环

- `return`可以结束整个函数

**在函数内部再声明一个函数**

```javascript
function fun3(){
    function fun4(){
        console.log("I'm fun4.");
    }
    fun4();
}
fun3(); // I'm fun4.

function fun5(){
    function fun6(){
        console.log("I'm fun6.");
    }
    return fun6;
}
var a = fun5(); 
a(); // I'm fun6.
fun5()();  // I'm fun6.
```

#### 立即执行函数

函数定义完，立即被调用，这种函数叫做立即执行函数

立即执行函数往往只会执行一次

```JavaScript
// 函数对象()
//	直接声明匿名函数会将大括号内当成代码块，导致无法识别大括号前的内容，所以用小括号将整个匿名函数包裹，表示这个匿名函数是一个整体，对于如何调用匿名函数，就在函数整体后面通过小括号来调用
(function(){
    console.log("I'm anoymous function.");
})(); // I'm anoymous function.
(function(a, b){
    console.log(a + b);
})(2,3); // 5
```

### 4.作用域

直接编写在script标签中的JS代码，都在全局作用域 

全局作用域在页面打开时创建，在页面关闭时销毁

在全局作用域中有一个全局对象`window`，它代表的是一个浏览器的窗口，由浏览器创建，可以直接使用

在全局作用域中：

- 创建的变量都会作为window对象的属性保存

- 创建的函数都会作为window对象的方法保存

```JavaScript
var a = 3;
console.log(window.a); //3
console.log(a); //3

b = 3;
console.log(b); //3
```

全局作用域中的变量都是全局变量，在页面的任意的部分都可以访问的到

#### 变量的声明提前

使用`var`关键字声明的变量，会在所有的代码执行之前被声明

但是如果声明变量时不使用`var`关键字，则变量不会被声明提前

```JavaScript
// 1、变量的声明提前
console.log("a = " + a); // a = undefined
var a = "abc";
// ======相当于======
var a;
console.log("a = " + a); // a = undefined
a = "abc";

// 2、没有变量的声明提前，报错
console.log("b = " + b); // UncaughtReferenceError: b is not defined
b = "abc";
// ======相当于======
console.log("b = " + b); // UncaughtReferenceError: b is not defined
window.b = "abc";
```

#### 函数的声明提前

使用**函数声明**形式创建的函数`function`

```JavaScript
函数(){
	语句...
}
```

它会在所有的代码执行之前就被创建，所以我们可以在函数声明前来调用函数

```JavaScript
fun1(); // fun1...
fun2(); // UncaughtTypeError: fun2 is not a function
// 函数声明，会被提前创建
function fun1(){
    console.log("fun1...");
}
// 函数表达式，不会被提前创建（变量会被提前声明，但函数不会被提前创建）
var fun2 = function(){
    console.log("fun2...");
}
```

#### 函数作用域

调用函数时创建函数作用域，函数执行完毕以后，函数作用域销毁

每调用一次函数就会创建一个新的函数作用域，他们之间是互相独立的

- 在函数作用域中可以访问到全局作用域的变量

- 在全局作用域中无法访问到函数作用域的变量



当在函数作用域操作一个变量时，它会先在自身作用域中寻找，

- 如果有就直接使用

- 如果没有则向上一级作用域中寻找，直到找到全局作用域

- 如果全局作用域中依然没有找到，则会报错



在函数中要访问全局变量可以使用`window`对象

```JavaScript
var a = 10;
function fun2(){
    var a = 20;

    function fun3(){
        var a = 30;
        console.log("fun3 ==> a = " + a);  // fun3 ==> a = 30
    }

    fun3();

    console.log("fun2 ==>a = " + a); // fun2 ==>a = 20
    console.log("a = " + window.a); // a = 10
}
fun2(); 
console.log("a = " + a); // a = 10
```

在函数作用域也有声明提前的特性，使用`var`关键字声明的变量，会在函数中所有的代码执行之前被声明



函数声明也会在函数中所有的代码执行之前执行

```JavaScript
// 在函数作用域也有声明提前的特性，使用`var`关键字声明的变量，会在函数中所有的代码执行之前被声明
function func1(){
    console.log(a);
    var a = "func1";

    // 函数声明也会在函数中所有的代码执行之前执行
    func2(); // fun2...
    function func2(){
        console.log("fun2...");
    }
}
func1(); // undefined
```

在函数中，不使用`var`声明的变量都会成为全局变量

```JavaScript
// 函数声明且调用
func3();
function func3() {
    a = 4;
}
console.log("a = " + window.a);  // a = 4
console.log("a = " + window["a"]);   // a = 4
console.log("a = " + a);    // a = 4
// 函数声明不调用
function func4() {
    b = 4;
}
console.log("b = " + window.b);  // b = 4
console.log("b = " + window["b"]);   // b = 4
console.log("b = " + b);    // UncaughtReferenceError: b is not defined
```

定义形参就相当于在函数作用域中声明了变量

```JavaScript
var e = 10;
function fun5(e){
    console.log(e);
}
fun5(); // undefined
fun5(55);  // 55
```

#### this

解析器在调用函数每次都会向函数内部传递进一个隐含的参数，这个隐含的参数就是`this`

`this`指向的是一个对象，这个对象我们称为函数执行的上下文对象

根据函数的调用方式的不同，`this`会指向不同的对象

- 以函数的形式调用时，`this`永远都是`window`

- 以方法的形式调用时，`this`就是调用方法的那个对象

```JavaScript
// - 以函数的形式调用时，`this`永远都是`window`
function fun(){
    console.log(this.name);
}
var name = "ddd"; // ddd
fun();
// - 以方法的形式调用时，`this`就是调用方法的那个对象
var obj = {
    name: "孙悟空",
    sayName: fun
}
obj.sayName(); // 孙悟空
```

### 5.构造函数与原型对象

#### 使用工厂方法创建对象

```javascript
function createPerson(name, age, gender){
    // 创建一个新的对象
    var obj=new Object();
    //向对象中添加属性
    obj.name = name;
    obj.age = age;
    obj.gender = gender;
    obj.sayName = function(){
        console.log(this.name);
    };
    //将新的对象返回
    return obj;
}

var obj1 = createPerson("孙悟空", 1000, "男");
var obj2 = createPerson("猪八戒", 3600, "男");
var obj3 = createPerson("沙悟净", 10000, "男");

obj1.sayName(); // 孙悟空
obj2.sayName(); // 猪八戒
obj3.sayName(); // 猪八戒
```

使用工厂方法创建的对象，使用的构造函数都是`Object`

所以创建的对象都是`Object`这个类型，就导致我们无法区分出多种不同类型的对象

#### 构造函数

创建一个构造函数，专门用来创建Person对象的构造函数就是一个普通的函数

创建方式和普通函数没有区别，不同的是构造函数习惯上**首字母大写**构造函数

和普通函数的区别就是**调用方式的不同**

- 普通函数是直接调用

- 构造函数需要使用`new`关键字来调用

```JavaScript
function Person(){
    console.log(this); // Person{}
}
// 普通函数
var fun = Person();
console.log(fun); // undefined
// 构造函数
var person = new Person();
console.log(person); // Person{}
```



#### 构造函数的执行流程

1. 立刻创建一个新的对象
2. 将新建的对象设置为函数中`this`，在构造函数中可以使用`this`来引用新建的对象
3. 逐行执行函数中的代码
4. 将新建的对象作为返回值返回

```JavaScript
function Dog(){

}

function Person(name, age, gender){
    //向对象中添加属性
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.sayHello = function(){
        console.log("My'name is " + this.name + ", " +
                    "I'm " + this.age + " years old, " +
                    "and I'm a " + this.gender + ".");
    };
}

var person1 = new Person("孙悟空", 1000, "man");
var person2 = new Person("猪八戒", 3600, "man");
var person3 = new Person("沙悟净", 10000, "man");
var dog = new Dog();
person1.sayHello(); // My'name is 孙悟空, I'm 1000 years old, and I'm a man.
person2.sayHello(); // My'name is 猪八戒, I'm 3600 years old, and I'm a man.
person3.sayHello(); // My'name is 沙悟净, I'm 10000 years old, and I'm a man.
console.log(person1); // Person {name: "孙悟空", age: 1000, gender: "man", sayHello: ƒ}
console.log(person2); // Person {name: "猪八戒", age: 3600, gender: "man", sayHello: ƒ}
console.log(person3); // Person {name: "沙悟净", age: 10000, gender: "man", sayHello: ƒ}
console.log(typeof person1); // object
console.log(typeof person2); // object
console.log(typeof person3); // object
```

使用同一个构造函数创建的对象，我们称为一类对象，也将一个构造函数称为一个类。

我们将通过一个构造函数创建的对象，称为是该类的实例

使用`instanceof`可以检查一个对象是否是一个类的实例语法：`对象 instanceof 构造函数`

如果是则返回`true`，否则返回`false`

```JavaScript
console.log(person1 instanceof Person); //true
console.log(person2 instanceof Person); //true
console.log(person3 instanceof Person); //true
console.log(dog instanceof Person); 	//false
```

所有的对象都是`Object`的后代，所以任何对象和`Object`进行`instanceof`检查时都会返回`true`

```javascript
console.log(person1 instanceof Object); //true
console.log(person2 instanceof Object); //true
console.log(person3 instanceof Object); //true
console.log(dog instanceof Object); 	//true
```

`this`的情况：

- 当以函数的形式调用时，`this`是`window`

- 当以方法的形式调用时，谁调用方法`this`就是谁

- 当以构造函数的形式调用时，`this`就是新创建的那个对象

#### 构造函数修改

创建一个Person构造函数

在Person构造函数中，为每一个对象都添加了一个sayName方法，目前我们的方法是在构造函数内部创建的

也就是构造函数每执行一次就会创建一个新的sayName方法也是所有实例的sayName都是唯一的

```JavaScript
function Person(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.sayHello = function(){
        console.log("My'name is " + this.name + ", " +
                    "I'm " + this.age + " years old, " +
                    "and I'm a " + this.gender + ".");
    };
}
```

这样就导致了构造函数执行一次就会创建一个新的方法，执行10000次就会创建10000个新的方法，而10000个方法都是一模一样的



这是完全没有必要，完全可以使所有的对象共享同一个方法

```JavaScript
function Person(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.sayHello = fun;
}
// 将sayName方法在全局作用域中定义
function fun(){
    console.log("My'name is " + this.name + ", " +
                "I'm " + this.age + " years old, " +
                "and I'm a " + this.gender + ".");
};
```

将函数定义在全局作用域，虽然节省了空间，但却污染了全局作用域的命名空间

而且定义在全局作用域中也很不安全

#### 原型对象

**原型prototype**

我们所创建的每一个函数（不论是普通函数还是构造函数），解析器都会向函数中添加一个属性`prototype`

```JavaScript
function Person(){

}

function MyClass(){

}

console.log(Person.prototype);
// {constructor: ƒ}
// 		constructor: ƒ Person()
// 			arguments: null
// 			caller: null
// 			length: 0
// 			name: "Person"
// 			prototype: {constructor: ƒ}
// 			__proto__: ƒ ()
// 			[[FunctionLocation]]: 09-原型对象.html:8
// 			[[Scopes]]: Scopes[1]
// 		__proto__: Object
console.log(Person.prototype == MyClass.prototype); // false
```

当函数以普通函数的形式调用`prototype`时，没有任何作用



当函数以构造函数的形式调用`prototype`时，它所创建的对象中都会有一个隐含的属性，指向该构造函数的原型对象，我们可以通过`__proto__`来访问该属性

```javascript
var mc1 = new MyClass();
var mc2 = new MyClass();
var mc3 = new MyClass();
console.log(mc1.__proto__ == MyClass.prototype); // true
console.log(mc2.__proto__ == MyClass.prototype); // true
console.log(mc3.__proto__ == MyClass.prototype); // true
```

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F07%2F27%2FcOdFuN8bgXEPLTa.png&sign=b37b764b86d5f7e4d974c25c5e06cb1c71a4e8a0ab42b6f50d905d5defced0a5)

原型对象就相当于一个**公共区域**，所有同一个类的实例都可以访问到这个原型对象



我们可以将对象中共有的内容，统一设置到原型对象中

```JavaScript
// 向MyClass中添加属性a
MyClass.prototype.a = "123";
console.log(mc1.a);  // 123
// 向MyClass中添加方法sayHello
MyClass.prototype.sayHello = function(){
alert("hello");
}
mc3.sayHello();
```

当我们访问对象的一个属性或方法时，它会先在对象自身中寻找，如果有则直接使用，如果没有则会去原型对象中寻找，如果找到则直接使用

```JavaScript
mc2.a = "456";
console.log(mc2.a);  // 456
```

以后我们创建构造函数时，可以将这些对象共有的属性和方法，统一添加到构造函数的原型对象中

这样不用分别为每一个对象添加，也不会影响到全局作用域，就可以使每个对象都具有这些属性和方法了

**hasOwnProperty**

```JavaScript
function MyClass(){

}
MyClass.prototype.name = "I'm prototype's name.";
var mc = new MyClass();
mc.age = 18;
// 使用in检查对象中是否含有某个属性时，如果对象中没有但是原型中有，也会返回true
console.log("name" in mc); // true
console.log("age" in mc); // true
// 可以使用对象的hasOwnProperty()来检查对象自身中是否含有该属性
// 使用该方法只有当对象自身中含有属性时，才会返回true
console.log(mc.hasOwnProperty("name")); // false
console.log(mc.hasOwnProperty("age"));  // true
console.log(mc.hasOwnProperty("hasOwnProperty"));  // false
```

**那么，**`**hasOwnProperty**`**是原型对象中定义的方法吗？**

因为对象中没有定义`hasOwnProperty`方法，那应该就是在原型对象中定义的了，果真如此吗？



我们用`hasOwnProperty`方法看下有没有`hasOwnProperty`它自己

```JavaScript
console.log(mc.__proto__.hasOwnProperty("hasOwnProperty"));  // false
```

我们发现，原型对象中也没有`hasOwnProperty`方法，那`hasOwnProperty`究竟是哪里来的呢？

**原型的原型**

原型对象也是对象，所以它也有原型，当我们使用一个对象的属性或方法时

-  会先在自身中寻找，自身中如果有则直接使用 

-  如果没有则去原型对象中寻找，有则使用 

-  如果没有则去原型的原型中寻找，直到找到`Object`对象的原型 

-  `Object`对象的原型没有原型，如果在`Object`中依然没有找到，则返回`undefined`

```JavaScript
console.log(mc.helloWorld);  // undefined
```

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F07%2F27%2FTrGWR83XvCAVzdY.png&sign=87a768076e19651354822b23a00489da7147374e10fa418f1447ae71e28bd5ba)

`mc.__proto__.__proto__`就是`Object`对象了

`Object`对象虽然没有原型，但也有`__proto__`，只是为`null`而已

#### toString

当我们直接在页面中打印一个对象时，实际上是输出的对象的`toString()`方法的返回值（*这里并非视频中所说的那样，有待确认*）



如果我们希望在输出对象时不输出`[object Object]`，可以为对象添加一个`toString()`方法

```JavaScript
function Person(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
}
var per1 = new Person("孙悟空", 1000, "man");
var per2 = new Person("猪八戒", 3600, "man");
// 当我们直接在页面中打印一个对象时，实际上是输出的对象的`toString()`方法的返回值
console.log(per1); // Person {name: "孙悟空", age: 1000, gender: "man"}
console.log(per1.toString()); // [object Object]
// 如果我们希望在输出对象时不输出`[object Object]`，可以为对象添加一个`toString()`方法
per1.toString = function(){
    return "Person[name=" + this.name + ", age=" + this.age + ", gender=" + this.gender + "]";
}
console.log(per1); // Person {name: "孙悟空", age: 1000, gender: "man", toString: ƒ}
console.log(per1.toString()); // Person[name=孙悟空, age=1000, gender=man]
```

上述只是修改per1对象的`toString`方法，不会对其他对象产生影响



如果想要所有对象都执行该方法，可以修改Person原型的`toString`

```JavaScript
console.log(per2.toString()); // [object Object]
// 修改Person原型的toString
Person.prototype.toString = function(){
    return "Person[name=" + this.name + ", age=" + this.age + ", gender=" + this.gender + "]";
}
console.log(per2.toString()); // Person[name=猪八戒, age=3600, gender=man]
```

**垃圾回收（GC）**

在JS中拥有自动的垃圾回收机制，会自动将这些垃圾对象从内存中销毁，我们不需要也不能进行垃圾回收的操作

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F07%2F28%2FhYS8TOybCBMx9Ud.png&sign=9b7a4b3d276d9867be9dc5de8e1ad6570390d979fd5fe6463b26d0384f419e75)

我们需要做的只是要将不再使用的对象设置`null`即可

```javascript
var obj = new Object();
// ...
obj = null
```

### 6.数组

#### 数组简介

```JavaScript
// 创建数组对象
var arr=new Array();
// 使用typeof检查一个数组时，会返回object
console.log(typeof arr); // object
```

**向数组中添加元素**

语法：`数组[索引] = 值`

```JavaScript
arr[0] = 10;
arr[1] = 33;
arr[2] = 22;
```

**读取数组中的元素**

语法：`数组[索引]`

如果读取不存在的索引，不会报错而是返回`undefined`

```JavaScript
console.log(arr[2]); // 22
console.log(arr[3]); // undefined
```

**获取数组的长度**

可以使用`length`属性来获取数组的长度（元素的个数）语法：`数组.length`

- 对于连续的数组，使用`length`可以获取到数组的长度（元素的个数）

- 对于非连续的数组，使用`length`会获取到数组的最大的索引 + 1

```JavaScript
console.log(arr.length); // 3
console.log(arr); // {"0":10,"1":33,"2":22,"length":3}
arr[10] = 33;
console.log(arr.length); // 11
console.log(arr); // {"0":10,"1":33,"10":33,"2":22,"length":11}
```

**修改数组的长度**

- 如果修改的`length`大于原长度，则多出部分会空出来

- 如果修改的`length`小于原长度，则多出的元素会被删除

```JavaScript
arr.length = 100;
console.log(arr.length); // 100
console.log(arr); // {"0":10,"1":33,"10":33,"2":22,"length":100}
arr.length = 2;
console.log(arr.length); // 2
console.log(arr); // {"0":10,"1":33,"length":2}
```

**向数组最后一位添加元素**

语法：`数组[数组.length] = 值;`

```JavaScript
arr[arr.length] = 22;
console.log(arr.length); // 3
console.log(arr); // {"0":10,"1":33,"2":22,"length":3}
arr[arr.length] = 33;
console.log(arr.length); // 4
console.log(arr); // {"0":10,"1":33,"2":22,"3":33,"length":4}
```

#### 创建数组的方式

**字面量创建数组**

语法：`[]`

```JavaScript
var arr1 = [];
console.log(arr1); // {"length":0}
console.log(typeof arr1); // object
console.log(arr1.length); // 0
```

使用字面量创建数组时，可以在创建时就指定数组中的元素

```JavaScript
var arr2 = [1,2,3,4,5,10];
console.log(arr2);  // {"0":1,"1":2,"2":3,"3":4,"4":5,"5":10,"length":6} 
console.log(arr2.length); // 6
```

**使用构造函数创建数组**

使用构造函数创建数组时，也可以同时添加元素，将要添加的元素作为构造函数的参数传递

元素之间使用`,`隔开

```JavaScript
var arr3 = new Array(1,2,3,4,5);
console.log(arr3);  // {"0":1,"1":2,"2":3,"3":4,"4":5,"length":5} 
console.log(arr3.length); // 5
```

#### 数组元素类型

**任意的数据类型**

数字、字符串、布尔值、`null`、`undefined`

```JavaScript
var arr6 = [2, "13", true, null, undefined];
console.log(arr6); 
// Array(5)
// 	0: 2
// 	1: "13"
// 	2: true
// 	3: null
// 	4: undefined
// 	length: 5
```

**对象**

```JavaScript
// **也可以是对象**
var obj = {name:"孙悟空"};
var arr7 = [];
arr7[arr7.length] = obj;
console.log(arr7); // {"0":{"name":"孙悟空"},"length":1} 
arr7 = [{name:"孙悟空"}, {name:"沙和尚"}, {name:"猪八戒"}];
console.log(arr7); // {"0":{"name":"孙悟空"},"1":{"name":"沙和尚"},"2":{"name":"猪八戒"},"length":3}
```

**函数**

```JavaScript
arr7 = [function(){alert(1)},function(){alert(2)}]; 
console.log(arr7); // {"0":"function (){alert(1)}","1":"function (){alert(2)}","length":2}
```

**数组**

数组中也可以放数组，如下这种数组我们称为**二维数组**

```JavaScript
arr7 = [[1,2,3],[4,5,6],[7,8,9]];
console.log(arr7); // {"0":{"0":1,"1":2,"2":3,"length":3},"1":{"0":4,"1":5,"2":6,"length":3},"2":{"0":7,"1":8,"2":9,"length":3},"length":3}
```

#### 数组的方法

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F07%2F28%2FQdKCH1hIcq5AxXZ.png&sign=a137476d00c4dc6f5ac247bb0933a4a7e9d0b42f6ee7432f631ca5f68d0b3cb9)

**push()**

该方法可以向数组的末尾添加一个或多个元素，并返回数组的新的长度

可以将要添加的元素作为方法的参数传递，这样这些元素将会自动添加到数组的末尾

```JavaScript
var result = arr.push("唐三藏");
console.log(arr); // ["孙悟空", "猪八戒", "沙悟净", "唐三藏"]
arr.push("菩提老祖", "地藏菩萨", "弥勒佛"); 
console.log(arr); // ["孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨", "弥勒佛"]
console.log("result = " + result); // result = 4
```

**pop()**

该方法可以删除数组的最后一个元素，并将被删除的元素作为返回值返回

```JavaScript
console.log(arr); // ["孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨", "弥勒佛"]
var result = arr.pop();
console.log(arr); // ["孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]
console.log("result = " + result); // result = 弥勒佛
```

**unshift()**

向数组开头添加一个或多个元素，并返回新的数组长度

向前边插入元素以后，其他的元素索引会依次调整

```JavaScript
console.log(arr); // ["孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]
result = arr.unshift("牛魔王", "二郎神");
console.log(arr); // ["牛魔王", "二郎神", "孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]
console.log("result = " + result); // result = 8
```

**shift()**

可以删除数组的第一个元素，并将被删除的元素作为返回值返回

```JavaScript
console.log(arr); // ["牛魔王", "二郎神", "孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]
result = arr.shift();
console.log(arr); // ["二郎神", "孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]
console.log("result = " + result); // result = 7
```

**slice()**

从某个已有的数组返回选定的元素，可以用来从数组提取指定元素

该方法不会改变元素数组，而是将截取到的元素封装到一个新数组中返回参数：

- 截取开始的位置的索引，包含开始索引

- 截取结束的位置的索引，不包含结束索引

```JavaScript
result = arr.slice(0,3);
console.log(result); // ["二郎神", "孙悟空", "猪八戒"]
```

第二个参数可以省略不写，此时会截取从开始索引往后的所有元素

```javascript
result = arr.slice(3);
console.log(result); // ["沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]
```

索引可以传递一个负值，如果传递一个负值，则从后往前计算

- -1 倒数第一个

- -2 倒数第二个

```JavaScript
result = arr.slice(4, -1);
console.log(result); // ["唐三藏", "菩提老祖"]
```

**splice()**

删除元素，并向数组添加新元素。可以用于删除数组中的指定元素

使用`splice()`会影响到原数组，会将指定元素从原数组中删除，并将被删除的元素作为返回值返回

参数：

-  第一个，表示开始位置的索引 

-  第二个，表示删除的数量 

```JavaScript
arr = ["牛魔王", "二郎神", "孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"];
result = arr.splice(0, 2);
console.log(result); // ["牛魔王", "二郎神"]
console.log(arr); // ["孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]

arr = ["牛魔王", "二郎神", "孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"];
result = arr.splice(1, 2);
console.log(result); // ["二郎神", "孙悟空"]
console.log(arr); // ["牛魔王", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]
```

-  第三个及以后，可以传递一些新的元素，这些元素将会自动插入到开始位置索引前边 

```JavaScript
// 替换元素
arr = ["孙悟空", "猪八戒", "沙悟净", "唐三藏"];
result = arr.splice(0, 1, "牛魔王", "铁扇公主", "红孩儿");
console.log(result); // ["孙悟空"]
console.log(arr); // ["牛魔王", "铁扇公主", "红孩儿", "猪八戒", "沙悟净", "唐三藏"]
// 插入元素
arr = ["孙悟空", "猪八戒", "沙悟净", "唐三藏"];
result = arr.splice(0, 0, "牛魔王", "铁扇公主", "红孩儿");
console.log(result); // []
console.log(arr); // ["牛魔王", "铁扇公主", "红孩儿", "孙悟空", "猪八戒", "沙悟净", "唐三藏"]
```

- `slice`可以提取数组中指定元素

- `splice`可以删除元素、替换元素、插入元素（功能更强大）



**concat()**

`concat()`可以连接两个或多个数组，并将新的数组返回

该方法不会对原数组产生影响

```JavaScript
var arr1 = ["孙悟空", "猪八戒", "沙悟净"];
var arr2 = ["青毛狮子怪", "黄牙老象", "大鹏金翅雕"];
var arr3 = ["虎力大仙", "鹿力大仙", "羊力大仙"];
var arr4 = arr1.concat(arr2,arr3,"牛魔王","铁扇公主","红孩儿");
console.log(arr4); // ["孙悟空", "猪八戒", "沙悟净", "青毛狮子怪", "黄牙老象", "大鹏金翅雕", "虎力大仙", "鹿力大仙", "羊力大仙", "牛魔王", "铁扇公主", "红孩儿"]
```



**join()**

该方法可以将数组转换为一个字符串

该方法不会对原数组产生影响，而是将转换后的字符串作为结果返回

在`join()`中可以指定一个字符串作为参数，这个字符串将会成为数组中元素的连接符

如果不指定连接符，则默认使用`,`作为连接符

```JavaScript
var arr = ["孙悟空", "猪八戒", "沙悟净"];
var result = arr.join();
console.log(arr); // ["孙悟空", "猪八戒", "沙悟净"]
console.log(result); // 孙悟空,猪八戒,沙悟净
console.log(typeof result); // string

result = arr.join("");
console.log(result); // 孙悟空猪八戒沙悟净

result = arr.join("@");
console.log(result); // 孙悟空@猪八戒@沙悟净
```

**reverse()**

该方法用来反转数组（前边的去后边，后边的去前边）

该方法会直接修改原数组

```JavaScript
var arr = ["孙悟空", "猪八戒", "沙悟净"];
arr.reverse();
console.log(arr); // ["沙悟净", "猪八戒", "孙悟空"]
```

**sort()**

可以用来对数组中的元素进行排序

也会影响原数组，默认会按照Unicode编码进行排序

```JavaScript
var arr = ['f', 'b', 'a', 'h', 'e', 'd'];
arr.sort();
console.log(arr); // ["a", "b", "d", "e", "f", "h"]
```

即使对于纯数字的数组，使用`sort()`排序时，也会按照Unicode编码来排序



所以对数字进行排序时，可能会得到错误的结果

```JavaScript
arr = ['2', '44', '9', '8', '2', '0'];
arr.sort();
console.log(arr); // ["0", "2", "2", "44", "8", "9"]
```

我们可以自己来指定排序的规则，我们可以在`sort()`添加一个回调函数，来指定排序规则

回调函数中需要定义两个形参，浏览器将会分别使用数组中的元素作为实参去调用回调函数

```JavaScript
arr =[5,4];
arr.sort(function(a,b){
    console.log("a ="+a);//5
    console.log("b ="+b);//4
});
```

使用哪个元素调用不确定，但是肯定的是在数组中a一定在b前边

浏览器会根据回调函数的返回值来决定元素的顺序，

- 如果返回一个大于0的值，则元素会交换位置

- 如果返回一个小于等于0的值，则元素位置不变

```JavaScript
arr = [2, 44, 9, 8, 2, 0, 6];
arr.sort(function(a,b){
    if(a > b){
        return 1;
    } else {
        return -1;
    }
});
console.log(arr); // [0, 2, 2, 6, 8, 9, 44]
```

- 如果需要升序排列，则返回`a - b`

- 如果需要降序排列，则返回`b - a`

```JavaScript
arr.sort(function(a,b){
    // 升序排列
    return a - b;
});
console.log(arr); // [0, 2, 2, 6, 8, 9, 44]
arr.sort(function(a,b){
    // 降序排列
    return b - a;
});
console.log(arr); // [44, 9, 8, 6, 2, 2, 0]
```



**小结**

- 会对原数组产生影响的方法：`push`、`pop`、`shift`、`unshift`、`splice`、`reverse`、`sort`

- 不会对原数组产生影响的方法：`slice`、`concat`、`join`

- 添加元素的方法：`push`、`unshift`、`splice`

- 删除元素的方法：`pop`、`shift`、`splice`

- 替换元素的方法：`splice`

- 连接元素的方法：`concat`、`join`

- 排序方法：`reverse`、`sort`

#### 数组的遍历

```JavaScript
var arr = ["孙悟空", "猪八戒", "沙悟净", "白龙马"];
// 所谓的遍历数组，就是将数组中所有的元素都取出来
for(var i=0;i<arr.length;i++){
    console.log(arr[i]);
}
```

**forEach方法**

这个方法只支持IE8以上的浏览器，IE8及以下的浏览器均不支持该方法

所以如果需要兼容IE8，则不要使用`forEach`，还是使用`for`循环来遍历



forEach() 方法需要一个函数作为参数

像这种函数，由我们创建但是不由我们调用的，我们称为**回调函数**

数组中有几个元素，函数就会执行几次，每次执行时，浏览器会将遍历到的元素

以实参的形式传递进来，我们可以来定义形参，来读取这些内容

浏览器会在回调函数中传递三个参数：

- 第一个参数，就是当前正在遍历的元素

- 第二个参数，就是当前正在遍历的元素的索引

- 第三个参数，就是正在遍历的数组

```JavaScript
arr.forEach(function(value, index, obj){
    console.log("value = " + value);
    console.log("index = " + index);
    console.log("obj = " + obj);
});
```

### 7.call、apply和arguments

#### call()和apply()

这两个方法都是函数对象的方法，需要通过函数对象来调用

当对函数调用`call()`和`apply()`都会调用函数执行

```javascript
var obj = {
    name: "obj"
};
var obj2 = {
    name:"obj2"
}
function fun(){
    console.log(this.name);
}
fun.call(obj); // obj
fun.call(obj2); // obj2
```

在调用`call()`和`apply()`可以将一个对象指定为第一个参数此时这个对象将会成为函数执行时的`this`

- `call()`方法可以将实参在对象之后依次传递

- `apply()`方法需要将实参封装到一个数组中统一传递

```javascript
function fun(a, b){
    console.log("a = " + a + ", b = " + b);
}
fun.call(obj, 2, 3); // a = 2, b = 3
fun.apply(obj, [2, 3]); // a = 2, b = 3
```

 

**this的情况**

1. 以函数的形式调用时，`this`永远都是`window`
2. 以方法的形式调用时，`this`是调用方法的对象
3. 以构造函数的形式调用时，`this`是新创建的那个对象
4. 使用`call`和`apply`调用时，`this`是指定的那个对象

#### arguments

在调用函数时，浏览器每次都会传递进两个隐含的参数：

- 函数的上下文对象`this`

- 封装实参的对象`arguments`



`arguments`是一个**类数组对象**（并非数组），可以通过索引来操作数据，也可以获取长度

```javascript
function fun1(){
    console.log(arguments instanceof Array); // false
    console.log(Array.isArray(arguments));   // false
}
fun1();
```

在调用函数时，我们所传递的实参都会在`arguments`中保存

我们即使不定义形参，也可以通过`arguments`来使用实参，只不过比较麻烦

- `arguments[0]`表示第一个实参

- `arguments[1]`表示第二个实参

```javascript
function fun2(a,b,c){
    console.log("arguments.length = " + arguments.length + ", arguments[0] = " + arguments[0]); 
}
fun2("hello"); // arguments.length = 1, arguments[0] = hello
fun2(true, "hello"); // arguments.length = 2, arguments[0] = true
```

它里边有一个属性叫做`callee`，这个属性对应一个函数对象，就是当前正在执行的函数对象

```javascript
function fun3(){
    console.log(arguments.callee);
    // function fun3(){
    //     console.log(arguments.callee);
    // }
    console.log(arguments.callee == fun3); // true
}
fun3();
```

### 8.Date和Math

#### Date

在JS中使用`Date`对象来表示一个时间

**创建一个时间对象**

如果直接使用构造函数创建一个`Date`对象，则会封装为当前代码执行的时间

```javascript
// 创建一个Date对象
// 如果直接使用构造函数创建一个Date对象，则会封装为当前代码执行的时间
var d = new Date();
console.log(d); // Fri Jul 30 2022 21:51:37 GMT+0800 (中国标准时间)
```

**创建一个指定的时间对象**

需要在构造函数中传递一个表示时间的字符串作为参数

日期的格式：`月/日/年 时:分:秒`

```javascript
d = new Date("08/01/2022 12:34:56");
console.log(d); // Sun Aug 01 2022 12:34:56 GMT+0800 (中国标准时间)
d = new Date("08/01/21 12:34:56"); // 为了避免在不同浏览器中产生歧义，尽量指定完整年份
console.log(d); // IE：Mon Aug 01 1921 12:34:56 GMT+0800 (中国标准时间)
```

**Date方法**

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F07%2F30%2FzKbtL3HJSXDjqmW.png&sign=07d6a9d87a645ec3cf98d27b4ee2f79a02145da4fbe2575e531959e98558ee79)

**getDate()**

获取当前日期对象是几日

```javascript
var date = d.getDate();
console.log("date = " + date); // date = 30
```



**getDay()**

获取当前日期对象时周几，会返回一个**0-6**的值

- 0 表示 周日

- 1 表示 周一

- ......

- 6 表示 周六

```javascript
var day = d.getDay();
console.log("day = " + day); // day = 5
```



**getMonth()**

获取当前时间对象的月份-会返回一个**0-11**的值

- 0 表示 1月

- 1 表示 2月

- ......

- 11 表示 12月

```javascript
var month = d.getMonth();
console.log("month = " + month); // month = 6
console.log("month = " + (month + 1)); // month = 7
```



**getFullYear()**

获取当前日期对象的年份

```javascript
var year = d.getFullYear();
console.log("year = " + year); // year = 2022
```



**getTime()**

获取当前日期对象的**时间戳**

时间戳，指的是从格林威治标准时间的**1970年1月1日0时0分0秒**到当前日期所花费的毫秒数

计算机底层在保存时间时使用都是时间戳

```javascript
// 示例：表示从1970年1月1日0时0分0秒到2021年22时25分26秒所花费的毫秒数
var time = d.getTime();
console.log(d); // Fri Jul 30 2021 22:25:26 GMT+0800 (中国标准时间)
console.log("time = " + time); // time = 1627655017435
```

#### Math

`Math`和其他的对象不同，不是一个构造函数

属于一个工具类，不用创建对象，里边封装了数学运算相关的属性和方法

**Math对象属性**

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F07%2F30%2FMZFsPXyDCRNdtfo.png&sign=de26c29ad87b6083d45f8ecf92c468f9550181d23df6c884bb78960c660f8ddb)

```javascript
console.log(Math.E); // 2.718281828459045
console.log(Math.PI); // 3.141592653589793
```

**Math对象方法**

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F07%2F30%2FvBxrAkmeQ2tGzKf.png&sign=d63cd354512671246b88c2099c5e859510503e2fee772f4c57a78166f95d698d)

**Math.abs()**

可以用来计算一个数的绝对值

```javascript
console.log(Math.abs(-1)); // 1
```



**Math.ceil()**

可以对一个数进行向上取整，小数位只要有值就自动进1

```javascript
console.log(Math.ceil(1.001)); // 2
console.log(Math.ceil(1.0));   // 1
```



**Math.floor()**

可以对一个数进行向下取整，小数部分会被舍掉

```javascript
console.log(Math.floor(1.999999)); // 1
```



**Math.round()**

可以对一个数进行四舍五入取整

```javascript
console.log(Math.round(1.4)); // 1
console.log(Math.round(1.5)); // 2
```



**Math.random()**

可以用来生成一个**0-1**之间的随机数（开区间范围：`(0, 1)`）

```JavaScript
console.log(Math.random()); // 0.9192011449766921
console.log(Math.random()); // 0.736135736878959
```

生成一个**0-10**之间的随机数：`Math.round(Math.random() * 10)`

生成一个**0-X**之间的随机数：`Math.round(Math.random() * X)`

生成一个**1-10**之间的随机数：`Math.round(Math.random() * 9 + 1)`

生成一个**X-Y**之间的随机数：`Math.round(Math.random() * (Y - X) + X)`



**Math.max()**

可以获取多个数中的最大值

```JavaScript
console.log(Math.max(3,6,7,33)); // 33
```



**Math.min()**

可以获取多个数中的最小值

```JavaScript
console.log(Math.min(3,6,7,33)); // 3
```



**Math.pow()**

`Math.pow(x, y)`返回x的y次幂

```JavaScript
console.log(Math.pow(2,10)); // 1024
```



**Math.sqrt()**

用于对一个数进行开方运算

```JavaScript
console.log(Math.sqrt(81)); // 9
```

### 9.包装类和字符串

#### 三大包装类

基本数据类型：`String`、`Number`、`Boolean`、`Null`、`Undefined`

引用数据类型：`Object`

在JS中为我们提供了三大包装类，通过这三个包装类可以将基本数据类型的数据转换为对象

- `String()`可以将基本数据类型字符串转换为`String`对象

- `Number()`可以将基本数据类型的数字转换为`Number`对象

- `Boolean()`可以将基本数据类型的布尔值转换为`Boolean`对象

```JavaScript
var str1 = "hello";
var str2 = new String();
console.log(typeof str1); // string
console.log(typeof str2); // object
var num1 = 3;
var num2 = new Number(3);
console.log(typeof num1); // string
console.log(typeof num2); // object
var bol1 = true;
var bol2 = new Boolean(true);
console.log(typeof bol1); // string
console.log(typeof bol2); // object
```

但是注意：我们在实际应用中不会使用基本数据类型的对象，如果使用基本数据类型的对象，在做一些比较时可能会带来一些不可预期的结果

```JavaScript
var n1 = new Number(1);
var n2 = new Number(1);
console.log(n1 == n2); // false
var b = new Boolean(false);
if(b){
    console.log(b); // Boolean {false}
}
```

方法和属性之能添加给对象，不能添加给基本数据类型（按照视频中的解释，是先将data临时转换为了一个包装类对象，进行了属性赋值操作；打印时又临时转换为了一个新的包装类对象，因为两次不是同一个对象，而且该对象刚刚创建，还没有任何属性和方法，所以是获取不到任何值的）

```JavaScript
var data = 4;
data.hello = "hello";
console.log(data.hello); // undefined
```

当我们对一些基本数据类型的值去调用属性和方法时，浏览器会临时使用包装类将其转换为对象，然后在调用对象的属性和方法时，浏览器会临时使用包装类将其转换为对象，然后在调用对象的属性和方法调用完以后，在将其转换为基本数据类型

```JavaScript
var s = 123;
s = s.toString();
console.log(s); // 123
console.log(typeof s); // string
```

#### 字符串方法

字符串在底层是以字符数组的形式保存的：`["H","e","l","l","o"," ","W","o","r","l","d","."]`

```JavaScript
var str = "Hello World.";
console.log(str[0]); // H
console.log(str[5]); //  
console.log(str[12]); // undefined
```



**length属性**

可以用来获取字符串的长度

```JavaScript
console.log(str.length); // 12
```



**charAt()**

可以返回字符串中指定位置的字符，不会对原字符串产生影响

```JavaScript
var result = str.charAt(0);
console.log(str); // Hello World.
console.log(result); // H
```



**charCodeAt()**

获取指定位置字符的字符编码（Unicode编码），不会对原字符串产生影响

```JavaScript
result = str.charCodeAt(0);
console.log(str); // Hello World.
console.log(result); // 72
var str2 = "您好，世界。";
result = str2.charCodeAt(0);
console.log(result); // 24744
```



**String.formCharCode()**

可以根据字符编码去获取字符

```JavaScript
result = String.fromCharCode(72);
console.log(result); // H
result = String.fromCharCode(24744);
console.log(result); // 您
result = String.fromCharCode(0x2682);
console.log(result); // ⚂
```



**concat()**

可以用来连接两个或多个字符串，作用和`+`一样，不会对原字符串产生影响

```JavaScript
result = str.concat("您好","世界");
console.log(str); // Hello World.
console.log(result); // Hello World.您好世界
```



**indexof()**

该方法可以检索一个字符串中是否含有指定内容，不会对原字符串产生影响

- 如果字符串中含有该内容，则返回其第一次出现的索引

- 如果没有找到指定的内容，则返回`-1`

```JavaScript
result = str.indexOf("o");
console.log(str); // Hello World.
console.log(result); // 4
result = str.indexOf("y");
console.log(result); // -1
```

可以指定一个第二个参数，指定开始查找的位置

```JavaScript
result = str.indexOf("l",3);
console.log(result); // 3
result = str.indexOf("l",4);
console.log(result); // 9
```



**lastIndexof()**

该方法的用法和`indexOf()`一样，不同的是`indexOf`是从前往后找，而`lastIndexOf`是从后往前找

但返回的索引是按照从前往后计数的

```JavaScript
result = str.lastIndexOf("o");
console.log(result); // 7
result = str.lastIndexOf("l");
console.log(result); // 9
```

可以指定一个第二个参数，指定开始查找的位置（不过开始位置也是从后往前数的）

```JavaScript
result = str.lastIndexOf("l", 6);
console.log(result); // 3
```



**slice()**

可以从字符串中截取指定的内容，不会影响原字符串

- 第一个参数，开始位置的索引（包括开始位置）

- 第二个参数，结束位置的索引（不包括结束位置）

```JavaScript
result = str.slice(0,2);
console.log(str); // Hello World.
console.log(result); // He
```

如果省略第二个参数，则会截取到后边所有的

```JavaScript
result = str.slice(6);
console.log(result); // World.
```

也可以传递一个负数作为参数，负数的话将会从后边计算

```javascript
result = str.slice(6,-1);
console.log(result); // World
```



**substring()**

可以用来截取一个字符串，不会影响原字符串，和`slice()`类似

- 第一个参数，开始位置的索引（包括开始位置）

- 第二个参数，结束位置的索引（不包括结束位置）

```JavaScript
result = str.substring(0,2);
console.log(str); // Hello World.
console.log(result); // He
```

不同的是这个方法不能接受负值作为参数，如果传递了一个负值，则默认使用0

而且会自动调整参数的位置，如果第二个参数小于第一个，则自动交换

```JavaScript
result = str.substring(1,-1); // 自动调整为str.substring(0,1);
console.log(result); // H
result = str.substring(1,0); // 自动调整为str.substring(0,1);
console.log(result); // H
```



**split()**

可以将一个字符串拆分为一个数组，不会影响原字符串

需要一个字符串作为参数，将会根据该字符串去拆分数组

```JavaScript
result = str.split("o");
console.log(str); // Hello World.
console.log(result); // ["Hell", " W", "rld."]
console.log(result[0]); // Hell
console.log(result[1]); //  W
console.log(result[2]); // rld.
```

如果传递一个空串作为参数，则会将每个字符都拆分为数组中的一个元素

```JavaScript
result = str.split("");
console.log(result); // ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d", "."]
```



**toUpperCase()**

将一个字符串转换为大写并返回，不会影响原字符串

```JavaScript
result = str.toUpperCase();
console.log(str); // Hello World.
console.log(result); // HELLO WORLD.
```



**toLowerCase()**

将一个字符串转换为小写并返回，不会影响原字符串

```JavaScript
result = str.toLowerCase();
console.log(str); // Hello World.
console.log(result); // hello world.
```

### 10.正则表达式

正则表达式用于定义一些字符串的规则，计算机可以根据正则表达式，来检查一个字符串是否符合规则，或者将字符串中符合规则的内容提取出来

#### 正则对象

语法：`var 变量 = new RegExp("正则表达式", "匹配模式");`

```JavaScript
// 这个正则表达式可以来检查一个字符串中是否含有a
var reg = new RegExp("a");
console.log(reg); // /a/
```

使用`typeof`检查正则对象，会返回`object`

```JavaScript
console.log(typeof reg); // object
```

#### 正则方法

正则表达式的方法：`test()`

使用这个方法可以用来检查一个字符串是否符合正则表达式的规则，如果符合则返回`true`，否则返回`false`

```javascript
var result = reg.test("abd");
console.log(result); // true
result = reg.test("hgf");
console.log(result); // false
result = reg.test("Abd");
console.log(result); // false
```

在构造函数中可以传递一个匹配模式作为第二个参数，可以是

- `i` ignoreCase，忽略大小写

- `g` global，全局匹配模式

```JavaScript
reg = new RegExp("a","i");
result = reg.test("Abd");
console.log(result); // true
```

#### 正则语法

使用字面量来创建正则表达式，语法：`var 变量 = /正则表达式/匹配模式;`

使用字面量的方式创建更加简单；使用构造函数创建更加灵活

```JavaScript
reg = /a/i;
result = reg.test("Abd");
console.log(result); // true
```

使用`|`表示或者的意思

```JavaScript
// 创建一个正则表达式，检查一个字符串中是否有a或b或c
reg = /a|b|c/i;
result = reg.test("Abcd");
console.log(result); // true
result = reg.test("bcd");
console.log(result); // true
result = reg.test("cd");
console.log(result); // true
result = reg.test("d");
console.log(result); // false
```

`[]`里的内容也是或的关系：`[abc] == a|b|c`

```JavaScript
reg = /[abc]/i;
result = reg.test("bcd");
console.log(result); // true
```

`[a-z]`任意小写字母

```JavaScript
reg = /[a-z]/;
result = reg.test("Abc");
console.log(result); // true
result = reg.test("ABC");
console.log(result); // false
```

`[A-Z]`任意大写字母

```JavaScript
reg = /[A-Z]/;
result = reg.test("abc");
console.log(result); // false
result = reg.test("ABC");
console.log(result); // true
```

`[A-z]`任意字母

```JavaScript
reg = /[A-z]/;
result = reg.test("abc");
console.log(result); // true
result = reg.test("ABC");
console.log(result); // true
```

`[0-9]`任意数字

```JavaScript
reg = /[0-9]/;
result = reg.test("123");
console.log(result); // true
result = reg.test("abc");
console.log(result); // false
```

`[^ ]`除了

```JavaScript
reg = /[^a]/; // 除了a以外的字符
result = reg.test("a");
console.log(result); // false
result = reg.test("b");
console.log(result); // true
```

`[^0-9]`除了数字

```
reg = /[^0-9]/;
result = reg.test("123");
console.log(result); // false
result = reg.test("abc");
console.log(result); // true
```

**小结**

| 表达式            | 描述                         |
| ----------------- | ---------------------------- |
| `[abc]`           | 查找方括号之间的任何字符     |
| `[^abc]`          | 查找任何不在方括号之间的字符 |
| `[0-9]`           | 查找任何从0至9的数字         |
| `[a-z]`           | 查找任何从小写a到小写z的字符 |
| `[A-Z]`           | 查找任何从大写A到大写Z的字符 |
| `[A-z]`           | 查找任何从大写A到小写z的字符 |
| `[ojbk]`          | 查找给定集合内的任何字符     |
| `[^ojbk]`         | 查找给定集合外的任何字符     |
| `(ed|blue|green)` | 查找任何指定的选项           |

**量词**

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F01%2FNHQP4FVk1ATS3vC.png&sign=1cfd2b17c0c96d9a8faa252d99fb1e13da1f09ded5797f9adabbfaa1bcd4f714)

通过量词可以设置一个内容出现的次数

量词只对它前边的一个内容起作用

`{n}`正好出现n次 

```JavaScript
// 创建一个正则表达式检查一个字符串中是否含有aaa
var reg = /a{3}/;
console.log(reg.test("aaabc")); // true
// 创建一个正则表达式检查一个字符串中是否含有ababab
reg = /ab{3}/;
console.log(reg.test("ababab")); // false
console.log(reg.test("aaabbb")); // true
reg = /(ab){3}/;
console.log(reg.test("ababab")); // true
```



 `{m,n}`出现m-n次

```JavaScript
reg = /ab{3,4}c/;
console.log(reg.test("abbc")); // false
console.log(reg.test("abbbc")); // true
console.log(reg.test("abbbbc")); // true
console.log(reg.test("abbbbbc")); // false
```



 `{m,}` 出现m次以上 

```JavaScript
reg = /ab{3,}c/;
console.log(reg.test("abbbc")); // true
console.log(reg.test("abbbbbc")); // true
```



 `+`至少一个，相当于`{1,}` 

```JavaScript
reg = /ab+c/;
console.log(reg.test("ac")); // false
console.log(reg.test("abc")); // true
console.log(reg.test("abbbc")); // true
```



 `^`表示开头 

```javascript
// 检查一个字符串中是否以a开头
reg = /^a/;
console.log(reg.test("ac")); // true
console.log(reg.test("bac")); // false
```



 `$`表示结尾 

```javascript
// 检查一个字符串中是否以a结尾
reg = /a$/;
console.log(reg.test("abac")); // false
console.log(reg.test("abaca")); // true
```



#### 元字符

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F01%2FbuwlvEJMs42pdCa.png&sign=5219c95d0beef27c7bd9ec225f978315cb271b742e9256181cff7af48241b171)

在正则表达式中使用`\`作为转义字符

-  `\.`来表示`.` 

  ```JavaScript
  reg = /\./;
  console.log(reg.test("ab")); // false
  console.log(reg.test("a.b")); // true
  ```

-  `\\`表示`\` 

  ```JavaScript
  reg = /\\/;
  console.log(reg.test("ab")); // false
  console.log(reg.test("a\")); // Uncaught SyntaxError: Invalid or unexpected token
  console.log(reg.test("a\b")); // false
  console.log(reg.test("a\\b")); // true
  ```

  

#### 字符串和正则相关的方法

**split()**

可以将一个字符串拆分为一个数组，不会影响原字符串

方法中可以传递一个正则表达式作为参数，这样方法将会根据正则表达式去拆分字符串

`split()`方法即使不指定全局匹配，也会全都拆分

```JavaScript
// 根据任意字母来将字符串拆分
var str = "1a2b3c4d5e6f7g8h9i0";
var result = str.split(/[A-z]/);
console.log(str); // 1a2b3c4d5e6A7B8C9D0
console.log(result); // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
```

**search()**

可以搜索字符串中是否含有指定内容，不会影响原字符串

如果搜索到指定内容，则会返回第一次出现的索引，如果没有搜索到返回-1

它可以接受一个正则表达式作为参数，然后会根据正则表达式去检索字符串

`search()`只会查找第一个，即使设置全局匹配也没用

```JavaScript
str = "Hello abc Hello afc agc";
result = str.search(/a[A-z]c/);
console.log(str); // 1a2b3c4d5e6A7B8C9D0
console.log(result); // 6
```

**match()**

可以根据正则表达式，从一个字符串中将符合条件的内容提取出来，不会影响原字符串

默认情况下我们的match只会找到第一个符合要求的内容，找到以后就停止检索

```JavaScript
str = "1a2b3c4d5e6A7B8C9D0";
result = str.match(/[a-z]/);
console.log(str); // 1a2b3c4d5e6A7B8C9D0
console.log(result); // ["a", index: 1, input: "1a2b3c4d5e6A7B8C9D0", groups: undefined]
```

可以设置正则表达式为全局匹配模式，这样就会匹配到所有的内容

```JavaScript
result = str.match(/[a-z]/g);
console.log(result); // ["a", "b", "c", "d", "e"]
```

可以为一个正则表达式设置多个匹配模式，且顺序无所谓

```JavaScript
result = str.split(/[a-z]/ig);
console.log(result); // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
```

`match()`会将匹配到的内容封装到一个数组中返回，即使只查询到一个结果

```JavaScript
console.log(Array.isArray(result)); // true
console.log(result[0]); // a
console.log(result[5]); // A
```

**replace()**

可以将字符串中指定内容替换为新的内容，不会影响原字符串

参数：

1. 被替换的内容，可以接受一个正则表达式作为参数
2. 新的内容

```JavaScript
result = str.replace("a","@_@");
console.log(str); // 1a2b3c4d5e6A7B8C9D0
console.log(result); // 1@_@2b3c4d5e6A7B8C9D0
```

默认只会替换第一个，可以使用正则表达式的全局匹配模式

```JavaScript
str = "1a2a3a4a5a6A7B8C9D0";
result = str.replace("a","@_@");
console.log(result); // 1@_@2a3a4a5a6A7B8C9D0
result = str.replace(/a/g,"@_@");
console.log(result); // 1@_@2@_@3@_@4@_@5@_@6A7B8C9D0
result = str.replace(/a/gi,"@_@");
console.log(result); // 1@_@2@_@3@_@4@_@5@_@6@_@7B8C9D0
result = str.replace(/[a-z]/gi,"@_@");
console.log(result); // 1@_@2@_@3@_@4@_@5@_@6@_@7@_@8@_@9@_@0
result = str.replace(/[a-z]/gi,"");
console.log(result); // 1234567890
```

**小结**

- `split()`方法用于拆分，即使不指定全局匹配，也会全都拆分

- `search`方法用于搜索，只会查找第一个，即使设置全局匹配也没用

- `match`方法用于提取

- `replace`方法用于替换

#### 常用正则表达式

**校验数字的表达式**

```JavaScript
数字：^[0-9]*$
n位的数字：^\d{n}$
至少n位的数字：^\d{n,}$
m-n位的数字：^\d{m,n}$
零和非零开头的数字：^(0|[1-9][0-9]*)$
非零开头的最多带两位小数的数字：^([1-9][0-9]*)+(.[0-9]{1,2})?$
带1-2位小数的正数或负数：^(\-)?\d+(\.\d{1,2})?$
正数、负数、和小数：^(\-|\+)?\d+(\.\d+)?$
有两位小数的正实数：^[0-9]+(.[0-9]{2})?$
有1~3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$
非零的正整数：^[1-9]\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\+?[1-9][0-9]*$
非零的负整数：^\-[1-9][]0-9"*$ 或 ^-[1-9]\d*$
非负整数：^\d+$ 或 ^[1-9]\d*|0$
非正整数：^-[1-9]\d*|0$ 或 ^((-\d+)|(0+))$
非负浮点数：^\d+(\.\d+)?$ 或 ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$
非正浮点数：^((-\d+(\.\d+)?)|(0+(\.0+)?))$ 或 ^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$
正浮点数：^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$ 或 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
负浮点数：^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$ 或 ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
浮点数：^(-?\d+)(\.\d+)?$ 或 ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$
```

**校验字符的表达式**

```JavaScript
汉字：^[\u4e00-\u9fa5]{0,}$
英文和数字：^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$
长度为3-20的所有字符：^.{3,20}$
由26个英文字母组成的字符串：^[A-Za-z]+$
由26个大写英文字母组成的字符串：^[A-Z]+$
由26个小写英文字母组成的字符串：^[a-z]+$
由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$
由数字、26个英文字母或者下划线组成的字符串：^\w+$ 或 ^\w{3,20}$
中文、英文、数字包括下划线：^[\u4E00-\u9FA5A-Za-z0-9_]+$
中文、英文、数字但不包括下划线等符号：^[\u4E00-\u9FA5A-Za-z0-9]+$ 或 ^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$
可以输入含有^%&',;=?$\"等字符：[^%&',;=?$\x22]+
禁止输入含有~的字符：[^~\x22]+
```

**特殊需求表达式**

```JavaScript
Email地址：^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
域名：[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?
InternetURL：[a-zA-z]+://[^\s]* 或 ^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$
手机号码：^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$ (由于工信部放号段不定时，所以建议使用泛解析 ^([1][3,4,5,6,7,8,9])\d{9}$)
电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)：^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$ 
国内电话号码(0511-4405222、021-87888822)：\d{3}-\d{8}|\d{4}-\d{7} 
18位身份证号码(数字、字母x结尾)：^((\d{18})|([0-9x]{18})|([0-9X]{18}))$
帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$
密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$  
日期格式：^\d{4}-\d{1,2}-\d{1,2}
一年的12个月(01～09和1～12)：^(0?[1-9]|1[0-2])$
一个月的31天(01～09和1～31)：^((0?[1-9])|((1|2)[0-9])|30|31)$ 
钱的输入格式：
    1.有四种钱的表示形式我们可以接受:"10000.00" 和 "10,000.00", 和没有 "分" 的 "10000" 和 "10,000"：^[1-9][0-9]*$ 
    2.这表示任意一个不以0开头的数字,但是,这也意味着一个字符"0"不通过,所以我们采用下面的形式：^(0|[1-9][0-9]*)$ 
    3.一个0或者一个不以0开头的数字.我们还可以允许开头有一个负号：^(0|-?[1-9][0-9]*)$ 
    4.这表示一个0或者一个可能为负的开头不为0的数字.让用户以0开头好了.把负号的也去掉,因为钱总不能是负的吧.下面我们要加的是说明可能的小数部分：^[0-9]+(.[0-9]+)?$ 
    5.必须说明的是,小数点后面至少应该有1位数,所以"10."是不通过的,但是 "10" 和 "10.2" 是通过的：^[0-9]+(.[0-9]{2})?$ 
    6.这样我们规定小数点后面必须有两位,如果你认为太苛刻了,可以这样：^[0-9]+(.[0-9]{1,2})?$ 
    7.这样就允许用户只写一位小数.下面我们该考虑数字中的逗号了,我们可以这样：^[0-9]{1,3}(,[0-9]{3})*(.[0-9]{1,2})?$ 
    8.1到3个数字,后面跟着任意个 逗号+3个数字,逗号成为可选,而不是必须：^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$ 
    备注：这就是最终结果了,别忘了"+"可以用"*"替代如果你觉得空字符串也可以接受的话(奇怪,为什么?)最后,别忘了在用函数时去掉去掉那个反斜杠,一般的错误都在这里
xml文件：^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$
中文字符的正则表达式：[\u4e00-\u9fa5]
双字节字符：[^\x00-\xff]    (包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))
空白行的正则表达式：\n\s*\r    (可以用来删除空白行)
HTML标记的正则表达式：<(\S*?)[^>]*>.*?</\1>|<.*? />    (网上流传的版本太糟糕，上面这个也仅仅能部分，对于复杂的嵌套标记依旧无能为力)
首尾空白字符的正则表达式：^\s*|\s*$或(^\s*)|(\s*$)    (可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式)
腾讯QQ号：[1-9][0-9]{4,}    (腾讯QQ号从10000开始)
中国邮政编码：[1-9]\d{5}(?!\d)    (中国邮政编码为6位数字)
IP地址：\d+\.\d+\.\d+\.\d+    (提取IP地址时有用)
IP地址：((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))    (由@飞龙三少 提供,感谢共享)
```

### 11.DOM

#### 1.DOM简介

DOM，全称Document Object Model **文档对象模型**。

JS中通过DOM来对HTML文档进行操作。只要理解了DOM就可以随心所欲的操作WEB页面。

##### 文档

文档表示的就是整个的HTML网页文档

##### 对象

对象表示将网页中的每一个部分都转换为了一个对象

##### 模型

使用模型来表示对象之间的关系，这样方便我们获取对象

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F01%2F7o8bmgeQHFXhly9.png&sign=53b6fc4d22182b5ed0b49bb61ea1a0c36140a561c6ab7fe15cc55e9ff6b85474)

DOM树体现了节点与节点之间的关系

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F01%2FsoiEQhjyu3AzNJ1.png&sign=daa9e40f55bb61eadb4fc40b390c7ba4b40ebfb8134b4964b4b549704a1d2d33)





#### 2.节点

节点Node，是构成我们网页的最基本的组成部分，网页中的每一个部分都可以称为是一个节点

比如：html标签、属性、文本、注释、整个文档等都是一个节点

虽然都是节点，但是实际上他们的具体类型是不同的。比如：

- 标签称为元素节点

- 属性称为属性节点

- 文本称为文本节点

- 文档称为文档节点



节点的类型不同，属性和方法也都不尽相同

##### 节点类型

节点：Node——构成HTML文档最基本的单元

常用节点分为四类

- 文档节点：整个HTML文档

- 元素节点：HTML文档中的HTL标签

- 属性节点：元素的属性

- 文本节点：HTML标签中的文本内容

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F01%2FR1AOaxYnNyDi2mH.png&sign=6bfb97617ff63f541ab582e99b7b4939ddf95f50090563ba2c251f9b3091af96)

##### 节点属性

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F01%2FwfuSynGj5DVaKbt.png&sign=6ce21919b85333523b427330023607cf796d8c97ff5efaa5a8d775c215f61f9b)



##### 文档节点（Document）

文档节点`document`，代表的是整个HTML文档，网页中的所有节点都是它的子节点

`document`对象作为`window`对象的属性存在的，我们不用获取可以直接使用

通过该对象我们可以在整个文档访问内查找节点对象，并可以通过该对象创建各种节点对象

##### 元素节点（Element）

HTML中的各种标签都是元素节点，这也是我们最常用的一个节点

浏览器会将页面中所有的标签都转换为一个元素节点，我们可以通过`document`的方法来获取元素节点

比如：`document.getElementById()` 根据id属性值获取一个元素节点对象。

##### 文本节点（Text）

文本节点表示的是HTML标签以外的文本内容，任意非HTML的文本都是文本节点

它包括可以字面解释的纯文本内容

文本节点一般是作为元素节点的子节点存在的

获取文本节点时，一般先要获取元素节点，再通过元素节点获取文本节点。例如：`元素节点.firstChild;`

获取元素节点的第一个子节点，一般为文本节点

##### 属性节点（Attr）

属性节点表示的是标签中的一个一个的属性，这里要注意的是属性节点并非是元素节点的子节点，而是元素节点的一部分

可以通过元素节点来获取指定的属性节点。例如：`元素节点.getAttributeNode("属性名");`

**注意：我们一般不使用属性节点**

浏览器已经为我们提供文档节点对象，这个对象是`window`

属性可以在页面中直接使用，文档节点代表的是整个网页

```JavaScript
// 获取button对象
var btn = document.getElementById("btn");
console.log(btn); // <button type="button" id="btn">我是一个按钮</button>
// 修改btn的文本节点内容
btn.innerHTML = "I'm a button.";
```



#### 3.事件

事件，就是文档或浏览器窗口中发生的一些特定的交互瞬间

JavaScript与HTML之间的交互是通过事件实现的

对于Web应用来说，有下面这些代表性的事件：点击某个元素、将鼠标移动至某个元素上方、按下键盘上某个键，等等

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F01%2F61nwvAuQcM7lDUb.png&sign=3420c6d4fba7c304b15b6a5151d99b1fd80a4eeb8ab6f2dbd74532dc011d7b89)

我们可以在事件对应的属性中设置一些js代码，这样当事件被触发时，这些代码将会执行

```JavaScript
<button type="button" id="btn" onclick="alert('Fuck');">我是一个按钮</button>
```

这种写法我们称为结构和行为耦合，不方便维护，不推荐使用



可以为按钮的对应事件绑定处理函数的形式来响应事件，这样当事件被触发时，其对应的函数将会被调用

```JavaScript
// 获取对象
var btn = document.getElementById("btn");

// 绑定一个单击事件
btn.onclick = function(){
    alert("Don't touch me.");
}
```

像这种为单击事件绑定的函数，我们称为单击响应函数



#### 4.文档的加载

当我们把`script`标签放到`head`中时，会报错`UncaughtTypeError: Cannot set property 'innerHTML' of null`，这是为什么呢？



浏览器在加载一个页面时，是按照自上向下的顺序加载的，读取到一行就运行一行，如果将`script`标签写到页面的上边，在代码执行时，页面还没有加载，DOM对象也没有加载，会导致无法获取到DOM对象

`onload`事件会在整个页面加载完成之后才触发，可以为`window`对象绑定一个`onload`事件

```javascript
window.onload = function(){
    // 获取button对象
    var btn = document.getElementById("btn");
    // 绑定一个单击事件
    btn.onclick = function(){
        alert("Don't touch me.");
    }
}
```

该事件对应的响应函数将会在页面加载完成之后执行，这样可以确保我们的代码执行时所有的DOM对象已经加载完毕了

#### 5.DOM查询

##### 获取元素节点

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F03%2FtuBpZTmWkhsE6nV.png&sign=d3f03dc338ff050e4b007ba3dabfb11b977ad9dbc77d496e555204168d266b3a)

通过document对象调用

为了方便，定义一个通用的函数，专门用来为指定元素绑定单击响应函数

```JavaScript
// 参数：
// 	idstr	要绑定单击响应函数的对象的id属性值
// 	fun		事件的回调函数，当单击元素时，该函数将会被触发
function myClick(idStr, fun){
    var btn = document.getElementById(idStr);
    btn.onclick = fun;
}
```



-  `getElementById()` 通过id属性获取**一个**元素节点对象 

```JavaScript
myClick("btn01", function () {
    // innerHTML 通过这个属性可以获取到元素内部的html代码
    alert(document.getElementById("bj").innerHTML); // 北京
});
```



-  `getElementsByTagName()` 通过标签名获取**一组**元素节点对象 

```JavaScript
myClick("btn02", function () {
    // getElementsByTagName()可以根据标签名来获取一组元素节点对象
    // 这个方法会给我们返回一个类数组对象，所有查询到的元素都会封装到对象中
    // 即使查询到的元素只有一个，也会封装到数组中返回
    var li_list = document.getElementsByTagName("li");
    alert(li_list.length); // 14
    
    var arr = [];
    for(var i=0;i<li_list.length;i++){
        arr.push(li_list[i].innerHTML);
    }
    alert(arr); // 北京,上海,东京,首尔,红警,实况,极品飞车,魔兽,IOS,Android,Windows Phone,IOS,Android,Windows Phone
});
```



-  `getElementsByName()` 通过name属性获取**一组**元素节点对象 

```JavaScript
myClick("btn03", function () {
    var inputs = document.getElementsByName("gender");
    alert(inputs.length); // 2
    
    var arr = [];
    for(var i=0;i<inputs.length;i++){
        // innerHTML用于获取元素内战的HTML代码的
        // 如果需要读取元素节点属性，直接使用`元素.属性名`
        // 例子：`元素.id`  `元素.name`  `元素.value`
        arr.push(inputs[i].value); 
        // 注意：class属性不能采用这种方式，读取class属性时需要使用`元素.className`
        arr.push(inputs[i].className);
    }
    alert(arr); // male,hello,female,hello
});
```

##### 获取元素节点的子节点

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F03%2FwRicLYSWEshzxBX.png&sign=900804f3492f84fd4f7893c24d184c3e9583efa5b3b4372afbdca3f32f9165b0)



通过具体的元素节点调用

-  `getElementsByTagName()`方法，返回当前节点的指定标签名后代节点 

```JavaScript
myClick("btn04", function () {
    var city = document.getElementById("city");
    // 获取city下1i节点
    var list = city.getElementsByTagName("li");
    alert(list.length); // 4
    
    var arr = [];
    for(var i=0;i<list.length;i++){
        arr.push(list[i].innerHTML);
    }
    alert(arr); // 北京,上海,东京,首尔
});
```



-  `childNodes`属性，表示当前节点的所有子节点 

```JavaScript
myClick("btn05", function () {
    var city = document.getElementById("city");
    // childNodes属性会获取包括文本节点在内的所有节点
    // 根据DOM标签标签间空白也会当成文本节点
    // 注意：在IE8及以下的浏览器中，不会将空白文本当成子节点
    // 所以该属性在IE8中会返回4个子元素，而其他浏览器是9个
    var list = city.childNodes;
    alert(list.length); // 9
    
    var arr = [];
    for(var i=0;i<list.length;i++){
        arr.push(list[i]);
    }
    alert(arr); // [object Text],[object HTMLLIElement],[object Text],[object HTMLLIElement],[object Text],[object HTMLLIElement],[object Text],[object HTMLLIElement],[object Text]
});
myClick("btn05", function () {
    var city = document.getElementById("city");
    // children属性可以获取当前元素的所有子元素
    var list = city.children;
    alert(list.length); // 4
    
    var arr = [];
    for(var i=0;i<list.length;i++){
        arr.push(list[i].innerHTML);
    }
    alert(arr); // 北京,上海,东京,首尔
});
```



-  `firstChild`属性，表示当前节点的第一个子节点 

```JavaScript
myClick("btn06", function () {
    var phone = document.getElementById("phone");
    // firstChild可以获取到当前元素的第一个子节点（包括空白文本节点）
    var firstChild = phone.firstChild;				
    alert(firstChild); // [object HTMLLIElement]
    alert(firstChild.innerHTML); // IOS
});
myClick("btn06", function () {
    var phone2 = document.getElementById("phone2");
    // firstChild可以获取到当前元素的第一个子节点（包括空白文本节点）
    var firstChild = phone2.firstChild;				
    alert(firstChild); // [object Text]
    alert(firstChild.innerHTML); // undefined
});
myClick("btn06", function () {
    var phone2 = document.getElementById("phone2");
    // firstElementchild不支持IE8及以下的浏览器，如果需要兼容他们尽量不要使用
    var firstElementChild = phone2.firstElementChild;				
    alert(firstElementChild); // [object HTMLLIElement]
    alert(firstElementChild.innerHTML); // IOS
});
```



-  `lastChild`属性，表示当前节点的最后一个子节点 

```JavaScript
document.getElementById("btn062").onclick = function () {
    var phone = document.getElementById("phone");
    // children属性可以获取当前元素的所有子元素
    var lastChild = phone.lastChild;				
    alert(lastChild); // [object HTMLLIElement]
    alert(lastChild.innerHTML); // Windows Phone
});
```



##### 获取父节点和兄弟节点

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F03%2Fgo8P6iSVcHqYzLU.png&sign=468004a9ed06720e14f3401dedfffda1249cde492a4b26f37b759bcdf62e9639)

通过具体的节点调用

-  `parentNode`属性，表示当前节点的父节点 

```JavaScript
myClick("btn07", function () {
    var bj = document.getElementById("bj");
    var parentNode = bj.parentNode;				
    alert(parentNode); // [object HTMLUListElement]
    alert(parentNode.innerHTML);
    // <li id="bj">北京</li>
    // <li>上海</li>
    // <li>东京</li>
    // <li>首尔</li>
    
    // innerText
    // -该属性可以获取到元素内部的文本内容
    // -它和innerHTML类似，不同的是它会自动将htm1去除
    alert(parentNode.innerText);
    // 北京
    // 上海
    // 东京
    // 首尔
});
```



-  `previousSibling`属性，表示当前节点的前一个兄弟节点 

```JavaScript
myClick("btn08", function () {
    var android = document.getElementById("android");
    // 返回#android的前一个兄弟节点（也可能获取到空白的文本）
    var previousSibling = android.previousSibling;				
    alert(previousSibling); // [object HTMLLIElement]
    alert(previousSibling.innerHTML); // IOS
});
myClick("btn08", function () {
    var android2 = document.getElementById("android2");
    // 返回#android的前一个兄弟节点（也可能获取到空白的文本）
    var previousSibling = android2.previousSibling;				
    alert(previousSibling); // [object Text]
    alert(previousSibling.innerHTML); // undefined
});
myClick("btn08", function () {
    var android2 = document.getElementById("android2");
    // previousElementSibling获取前一个兄弟元素，IE8及以下不支持
    var previousElementSibling = android2.previousElementSibling;				
    alert(previousElementSibling); // [object HTMLLIElement]
    alert(previousElementSibling.innerHTML); // IOS
});
```



-  `nextSibling`属性，表示当前节点的后一个兄弟节点 

```JavaScript
myClick("btn082", function () {
    var android = document.getElementById("android");
    // 返回#android的前一个兄弟节点（也可能获取到空白的文本）
    var nextSibling = android.nextSibling;				
    alert(nextSibling); // [object HTMLLIElement]
    alert(nextSibling.innerHTML); // Windows Phone
});
```



**案例：选择器**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      window.onload = function () {
        //获取四个按钮
        var items = document.getElementsByName("items");
        //全选按钮
        var checkedAllBtn = document.getElementById("checkedAllBtn");
        checkedAllBtn.onclick = function () {
          for (var i = 0; i < items.length; i++) {
            items[i].checked = true;
          }
        };

        //全不选
        var checkedNoBtn = document.getElementById("checkedNoBtn");
        checkedNoBtn.onclick = function () {
          for (var i = 0; i < items.length; i++) {
            items[i].checked = false;
          }
        };

        //反选
        var checkedRevBtn = document.getElementById("checkedRevBtn");
        checkedRevBtn.onclick = function () {
          for (var i = 0; i < items.length; i++) {
            items[i].checked = !items[i].checked;
          }
        };

        //全选和全不选的切换
        var checkedAllBox = document.getElementById("checkedAllBox");
        checkedAllBox.onclick = function () {
          if (checkedAllBox.checked == false) {
            for (var i = 0; i < items.length; i++) {
              items[i].checked = false;
            }
          } else {
            for (var i = 0; i < items.length; i++) {
              items[i].checked = true;
            }
          }
        };

        //提交
        var sendBtn = document.getElementById("sendBtn");
        sendBtn.onclick = function () {
          for (var i = 0; i < items.length; i++) {
            if (items[i].checked) {
              alert(items[i].value);
            }
          }
        };
      };
    </script>
  </head>
  <body>
    <form method="post" action="">
      你爱好的运动是？<input type="checkbox" id="checkedAllBox" />全选/全不选
      <br />
      <input type="checkbox" name="items" value="足球" />足球
      <input type="checkbox" name="items" value="篮球" />篮球
      <input type="checkbox" name="items" value="羽毛球" />羽毛球
      <input type="checkbox" name="items" value="乒乓球" />乒乓球
      <br />
      <input type="button" id="checkedAllBtn" value="全 选" />
      <input type="button" id="checkedNoBtn" value="全不选" />
      <input type="button" id="checkedRevBtn" value="反 选" />
      <input type="button" id="sendBtn" value="提 交" />
    </form>
  </body>
</html>

```

##### DOM查询的其他方法

**document.body**

在`document`中有一个属性`body`，它保存的是`body`的引用



**document.documentElement**

`document.documentElement`保存的是`html`根标签



**document.getElementsByClassName()**

根据元素的`class`属性值查询一组元素节点对象

`getElementsByClassName()`可以根据`class`属性值获取一组元素节点对象，但是该方法不支持IE8及以下的浏览器

```JavaScript
var boxs = document.getElementsByClassName("box");
console.log(boxs); // HTMLCollection(3) [div.box, div.box, div.box]
console.log(boxs.length); // 3
console.log(typeof boxs); // object
```



**document.querySelector()**

需要一个选择器的字符串作为参数，可以根据一个CSS选择器来查询一个元素节点对象

虽然IE8中没有`getElementsByClassName()`但是可以使用`querySelector()`代替

使用该方法总会返回唯一的一个元素，如果满足条件的元素有多个，那么它只会返回第一个

```JavaScript
var div = document.querySelector(".box div");
console.log(div.innerHTML); // I'm first div.
boxs = document.querySelector(".box");
console.log(boxs); 
// <div class="box">
// 		<div>I'm first div.</div>
// </div>
```



**document.querySelectorAll()**

该方法和`querySelector()`用法类似，不的是它会将符合条件的元素封装到一个数组中返回

即使符合条件的元素只有一个，它也会返回数组

```JavaScript
boxs = document.querySelectorAll(".box");
console.log(boxs); // NodeList(3) [div.box, div.box, div.box]
console.log(boxs.length); //3
```



#### 6.DOM增删改

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F04%2FY4M79fLcsUFOHv1.png&sign=a308d3b027f6875f62f664faa041dacad88571b394cfe2f96171b5e13f1f1ef8)



**document.createElement()**

可以用于创建一个元素节点对象，它需要一个标签名作为参数，将会根据该标签名创建元素节点对象，并将创建好的对象作为返回值返回



**document.createTextNode()**

可以用来创建一个文本节点对象，它需要一个文本内容作为参数，将会根据该内容创建文本节点，并将新的节点返回



**appendChild()**

向一个父节点中添加一个新的子节点，用法：`父节点.appendChild(子节点);`



**insertBefore()**

可以在指定的子节点前插入新的子节点，语法：`父节点.insertBefore(新节点, 旧节点);`



**replaceChild()**

可以使用指定的子节点替换已有的子节点，语法：`父节点.replaceChild(新节点, 旧节点);`



**removeChild()**

可以删除一个子节点，语法：`父节点.removeChild(子节点);`、`子节点.parentNode.removeChild(子节点);`

```JavaScript
// 创建一个"广州"节点,添加到#city下
var city = document.getElementById("city");
myClick("btn01",function(){
    // 创建元素节点
    var li = document.createElement("li");
    // 创建文本节点
    var gz = document.createTextNode("广州");
    // 将文本节点添加到元素节点中
    li.appendChild(gz);
    // 将元素节点添加至#city下
    city.appendChild(li);
});
// 将"广州"节点插入到#bj前面	
var bj = document.getElementById("bj");
myClick("btn02",function(){
    var li = document.createElement("li");
    var gz = document.createTextNode("广州");
    li.appendChild(gz);
    // 将元素节点插入到#bj前面
    city.insertBefore(li,bj);
});
// 使用"广州"节点替换#bj节点
myClick("btn03",function(){
    var li = document.createElement("li");
    var gz = document.createTextNode("广州");
    li.appendChild(gz);
    // 将元素节点替换#bj节点
    city.replaceChild(li,bj);
});
// 删除#bj节点
myClick("btn04",function(){
    // 将元素节点替换#bj节点
    // city.removeChild(bj);
    // 更常用，不需要知道父节点是什么	
    bj.parentNode.removeChild(bj);
});
// 使用innerHTML将"广州"节点添加到#city下
myClick("btn07",function(){
    // 使用innerHTML也可以完成DOM的增删改的相关操作
    // city.innerHTML += "<li>广州</li>";
    // 不过这种方式会先删除再替换，耗费性能，所以一般我们会两种方式结合使用
    var li = document.createElement("li");
    li.innerHTML = "广州";
    city.appendChild(li);
});
```

**增删案例**

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function delRow() {
        var tr = this.parentNode.parentNode;
        var name = tr.getElementsByTagName("td")[0].innerHTML;
        var flag = confirm("确认删除" + name + "?");
        if (flag) {
          tr.parentNode.removeChild(tr);
        }
        return false;
      }
      window.onload = function () {
        //删除
        var allA = document.getElementsByTagName("a");
        for (var i = 0; i < allA.length; i++) {
          allA[i].onclick = delRow;
        }

        //添加
        var addEmpButton = document.getElementById("addEmpButton");
        addEmpButton.onclick = function () {
          //获取输入框的文本内容
          var empName = document.getElementById("empName").value;
          var email = document.getElementById("email").value;
          var salary = document.getElementById("salary").value;

          if (!empName || !email || !salary) {
            alert("有数据为空，无法添加！");
            return;
          }

          //创建需要添加的元素节点tr
          var tr = document.createElement("tr");

          //规定添加到tr中的内容
          var empNameTd = "<td>" + empName + "</td>";
          var emailTd = "<td>" + email + "</td>";
          var salaryTd = "<td>" + salary + "</td>";
          var aTd = '<td><a href="javascript:;">Delete</a></td>';
          tr.innerHTML = empNameTd + emailTd + salaryTd + aTd;

          //找到tr元素的父元素
          var employeeTable = document.getElementById("employeeTable");
          var tbody = employeeTable.getElementsByTagName("tbody")[0];

          //通过父元素调用appendChild()方法添加到子元素中
          tbody.appendChild(tr);

          //为新添加的a绑定删除
          tr.getElementsByTagName("a")[0].onclick = delRow;
        };
      };
    </script>
  </head>
  <body>
    <table id="employeeTable">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Salary</th>
        <th>&nbsp;</th>
      </tr>
      <tr>
        <td>Tom</td>
        <td>tom@tom.com</td>
        <td>5000</td>
        <td><a href="deleteEmp?id=001">Delete</a></td>
      </tr>
      <tr>
        <td>Jerry</td>
        <td>jerry@sohu.com</td>
        <td>8000</td>
        <td><a href="deleteEmp?id=002">Delete</a></td>
      </tr>
      <tr>
        <td>Bob</td>
        <td>bob@tom.com</td>
        <td>10000</td>
        <td><a href="deleteEmp?id=003">Delete</a></td>
      </tr>
    </table>

    <div id="formDiv">
      <h4>添加新员工</h4>
      <table>
        <tr>
          <td class="word">name:</td>
          <td class="inp">
            <input type="text" name="empName" id="empName" />
          </td>
        </tr>
        <tr>
          <td class="word">email:</td>
          <td class="inp">
            <input type="text" name="email" id="email" />
          </td>
        </tr>
        <tr>
          <td class="word">salary:</td>
          <td class="inp">
            <input type="text" name="salary" id="salary" />
          </td>
        </tr>
        <tr>
          <td colspan="2" align="center">
            <button id="addEmpButton" value="abc">Submit</button>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>

```

#### 7.操作内联样式

##### 修改元素内联样式

通过JS修改元素的内联样式，语法：`元素.style.样式名 = 样式值`

```JavaScript
box1.style.height = "200px";
box1.style.width = "200px";
```

注意：如果CSS的样式名中含有`-`，这种名称在JS中是不合法的，比如`background-color`

需要将这种样式名修改为驼峰命名法，去掉`-`，然后将`-`后的字母大写

```JavaScript
// box1.style.background-color = "red"; // Uncaught SyntaxError: Invalid left-hand side in assignment
box1.style.backgroundColor = "red";
```

在 w3school 手册中，可以查看到每个样式所对应的 JS 代码

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F06%2FbcRK8VFLQ5fSOlj.png&sign=53e38b271191bbccf2de0ed14e0ad14373cd4098710631273a5dd03b03560fd0)

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F06%2F7nUasCtqkbDgwxM.png&sign=ead74e32e6034e79e64057927334527f71729628cf97211a7d0d2f6ab9721d69)

我们通过 style 属性设置的样式都是内联样式，而内联样式有较高的优先级，所以通过JS修改的样式往往会立即显示



但是如果在样式中写了`!important`，则此时样式会有最高的优先级，即使通过JS也不能覆盖该样式，此时将会导致JS修改样式失效，所以尽量不要为样式添加`!important`

##### 读取元素内联样式

通过 JS 读取元素的内联样式，语法：元素.style.样式名



通过style属性设置和读取的都是内联样式，无法读取样式表中的样式

```javascript
alert(box1.style.height); // 
box1.style.height = "200px";
alert(box1.style.height); // 200px
```

##### 读取元素样式

**currentStyle**

获取元素的当前显示的样式，语法：`元素.currentStyle.样式名`

它可以用来读取当前元素正在显示的样式，如果当前元素没有设置该样式，则获取它的默认值

```javascript
alert(box1.currentStyle.height); // 100px
box1.style.height = "200px";
alert(box1.currentStyle.height); // 200px
```

不过`currentstyle`只有IE浏览器支持，其他的浏览器都不支持。



**getComputedStyle()**

在其他浏览器中可以使用`getComputedStyle()`，这个方法来获取元素当前的样式

这个方法是`window`的方法，可以直接使用，需要两个参数

- 第一个：要获取样式的元素

- 第二个：可以传递一个伪元素，一般都传`null`

该方法会返回一个对象，对象中封装了当前元素对应的样式

可以通过`对象.样式名`来读取样式，如果获取的样式没有设置，则会获取到真实的值，而不是默认值

比如：没有设置 width，它不会获取到 auto，而是一个长度

但是该方法不支持IE8及以下的浏览器

```javascript
var obj = getComputedStyle(box1, null);
alert(obj); // [object CSSStyleDeclaration]
alert(obj.width); // 200px
alert(obj.height); // 200px
alert(obj.backgroundColor); // rgb(255, 0, 0)
```



通过`currentStyle`和`getComputedStyle()`读取到的样式都是只读的，不能修改，如果要修改必须通过`style`属性

那么我就只能自己写个函数，来兼容所有浏览器

```javascript
// 自定义兼容所有浏览器获取元素样式的方法
function getStyle(obj, name) {
    // 判断是否有getComputedStyle方法
    if (window.getComputedStyle) {
        // 正常浏览器的方式
        return getComputedStyle(obj, null)[name];
    } else {
        // IE的方式
        return obj.currentStyle[name];
    }
}
```

#### 8.其他样式相关的属性

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F06%2FWC2ob7rpFlPDYZB.png&sign=e8a9af401900121031d6e6c427851f8dfa421944575d3d839d10f995c0c8ce9a)



**clientwidth、clientHeight**

这两个属性可以获取元素的可见宽度和高度

这些属性都是不带`px`的，返回都是一个数字，可以直接进行计算

会获取元素宽度和高度，包括内容区和内边距

这些属性都是只读的，不能修改（改只有一种方式，就是通过`元素.style.样式 = 样式值`）

```JavaScript
// #box1 {
// 	width: 100px;
// 	height: 100px;
// 	background-color: red;
// 	padding: 10px;
// 	border: 10px solid yellow;
// }
alert(box1.clientHeight); // 120
alert(box1.clientWidth); // 120
```

