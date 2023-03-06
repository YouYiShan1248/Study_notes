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

- BigInt 大整数

- Symbol 符号

以上这七种类型属于基本数据类型，除此之外全都是对象。

对象是JS中的一种复合数据类型，它相当于一个容器，在对象中可以存储各种不同类型数据

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



也可以使用符号（symbol）作为属性名，来添加属性

​          获取这种属性时，也必须使用symbol

​         使用symbol添加的属性，通常是那些不希望被外界访问的属性

```javascript
let mySymbol = Symbol()
let newSymbol = Symbol()
// 使用symbol作为属性名
obj[mySymbol] = "通过symbol添加的属性"
console.log(obj[mySymbol])
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

方法和属性只能添加给对象，不能添加给基本数据类型（先将data临时转换为了一个包装类对象，进行了属性赋值操作；打印时又临时转换为了一个新的包装类对象，因为两次不是同一个对象，而且该对象刚刚创建，还没有任何属性和方法，所以是获取不到任何值的）

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

会获取元素宽度和高度，包括内容区和内边距，不包括边框

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

### 12.事件对象

#### 1.事件对象

- 当事件的响应函数被触发时，浏览器每次都会将一个事件对象作为实参传递进响应函数

- 在事件对象中封装了当前事件相关的一切信息，比如：鼠标的坐标、键盘哪个按键被按下、鼠标滚轮滚动的方向。。。

##### 事件属性

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F07%2FS6DFxRmHP913Wpf.png&sign=24b6c50ce3380f2ba9ba7f7cda9feb6c6279b10f5f8f47ff35ce6255b95cd6ea)

##### 鼠标/键盘属性

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F07%2F3dX4fLwNvPOQTqt.png&sign=90ee353c3ac0fa99b210ddbce4cde6b6d04b377d191e54d9270ada9eb8ebd04c)

**案例：记录鼠标坐标**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #areaDiv {
        height: 200px;
        width: 400px;
        border: 1px solid #000;
        margin: 10px;
      }
      #showMsg {
        height: 25px;
        width: 400px;
        border: 1px solid #000;
        margin: 10px;
      }
    </style>
    <script>
      window.onload = function () {
        var areaDiv = document.getElementById("areaDiv");
        var showMsg = document.getElementById("showMsg");
        areaDiv.onmousemove = function (event) {
          //因为兼容IE8
          event = event || window.event;
          var x = event.clientX;
          var y = event.clientY;
          showMsg.innerHTML = "x:" + x + " , y:" + y;
        };
      };
    </script>
  </head>
  <body>
    <div id="areaDiv"></div>
    <div id="showMsg">将鼠标移入框中</div>
  </body>
</html>
```

#### 2.事件的冒泡(Bubble)

所谓的**冒泡**指的就是事件的向上传导，当后代元素上的事件被触发时，其祖先元素的相同事件也会被触发

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #box1 {
        width: 200px;
        height: 200px;
        background-color: #99ff99;
      }
      #s1 {
        background-color: yellowgreen;
      }
    </style>
    <script>
      window.onload = function () {
        document.getElementById("s1").onclick = function () {
          alert("我是span"); // 我是span 我是div 我是body 我是HTML
        };
        document.getElementById("box1").onclick = function () {
          alert("我是div"); // 我是div 我是body 我是HTML
        };
        document.body.onclick = function () {
          alert("我是body"); // 我是body 我是HTML
        };
        document.documentElement.onclick = function () {
          alert("我是HTML"); // 我是HTML
        };
      };
    </script>
  </head>
  <body>
    <div id="box1">
      我是div
      <span id="s1"> 我是span </span>
    </div>
  </body>
</html>

```

在开发中大部分情况冒泡都是有用的，如果不希望发生事件冒泡可以通过事件对象来**取消冒泡**

可以将事件对象的`cancelBubble`设置为`true`，即可取消冒泡

```JavaScript
document.getElementById("s1").onclick = function(event){
    // 兼容event
    event = event || window.event;
    alert("我是span"); // 我是span
    event.cancelBubble = true;
};
```



#### 3.事件的委派(Delegate)

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function clickFun() {
        alert("超链接");
      }

      window.onload = function () {
        // 为每一个超链接都绑定一个单击响应函数
        var aList = document.getElementsByTagName("a");
        for (var i = 0; i < aList.length; i++) {
          aList[i].onclick = clickFun;
        }
        var btn = document.getElementById("btn");
        var ulDiv = document.getElementById("ulDiv");
        btn.onclick = function () {
          var li = document.createElement("li");
          li.innerHTML = '<a href="javascript:;">add超链接</a>';
          ulDiv.appendChild(li);
        };
      };
    </script>
  </head>
  <body>
    <button type="button" id="btn">Add</button>
    <ul id="ulDiv">
      <li><a href="javascript:;">超链接1</a></li>
      <li><a href="javascript:;">超链接2</a></li>
      <li><a href="javascript:;">超链接3</a></li>
    </ul>
  </body>
</html>

```

这里我们为每一个超链接都绑定了一个单击响应函数，这种操作比较麻烦

而且这些操作只能为已有的超链接设置事件，而新添加的超链接必须重新绑定

我们希望，只绑定一次事件，即可应用到多个的元素上，即使元素是后添加的

我们可以尝试将其绑定给元素的共同的祖先元素

```JavaScript
ulDiv.onclick = function(){
    alert("事件委派超链接");
};
```

**事件委派**是指将事件统一绑定给元素的共同的祖先元素

这样当后代元素上的事件触发时，会一直冒泡到祖先元素，从而通过祖先元素的响应函数来处理事件

**事件委派是利用了冒泡，通过委派可以减少事件绑定的次数，提高程序的性能**

但是也有个问题，我们是给整个 ul 绑定的单击响应事件，ul 是块元素，在超链接所在行点击任何位置都会触发事件

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F08%2FZOPGilX97kR4Ugp.gif&sign=79952f54efccff9375bb06de16eaeadb32ac53828e49e1c6cf4f69a2e7aab5d9)

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F08%2Fjw2lTFGr95CqIOp.png&sign=cc00bfed30a6fa9e873ca8d07411b85389fc640725931ad7ceffc45c2035b5d7)



```javascript
ulDiv.onclick = function(event){
    event = event || window.event;
    // 如果触发事件的对象是我们期望的元素，则执行否则不执行
    // alert(event.target); // 点击超链接外：[object HTMLLIElement]; 点击超链接：javascript:;
    if(event.target.className == "link"){
        alert("事件委派超链接");
    }
};
```

```HTML
<li><a href="javascript:;" class="link hello">超链接1</a></li> <!-- 失效 -->
<li><a href="javascript:;" class="link">超链接2</a></li>
<li><a href="javascript:;" class="link">超链接3</a></li>
```

我这里将`tagName`代替`className`作为判断条件进行判断

```JavaScript
ulDiv.onclick = function(event){
    event = event || window.event;
    if(event.target.tagName == "A" || event.target.tagName == "a"){
        alert("事件委派超链接");
    }
};
```



#### 4.事件的绑定(Bind)

##### on事件名

使用`对象.事件 = 函数`的形式绑定响应函数，它只能同时为一个元素的一个事件绑定一个响应函数



不能绑定多个，如果绑定了多个，则后边会覆盖掉前边的

```JavaScript
var btn = document.getElementById("btn");
// 为btn绑定一个单击响应函数
btn.onclick = function() {
    alert(1);
};
// 为btn绑定第二个响应函数
btn.onclick = function() {
    alert(2); // 2
};
```



##### addEventListener()

`addEventListener()`通过这个方法也可以为元素绑定响应函数，参数：

- 事件的字符串，不要`on`

- 回调函数，当事件触发时该函数会被调用

- 是否在捕获阶段触发事件，需要一个布尔值，一般都传`false`

使用`addEventListener()`可以同时为一个元素的相同事件同时绑定多个响应函数

这样当事件被触发时，响应函数将会按昭函数的绑定顺序执行

```JavaScript
btn.addEventListener("click", function(){
    alert(1); // 1
}, false);
btn.addEventListener("click", function(){
    alert(2); // 2
}, false);
btn.addEventListener("click", function(){
    alert(3); // 3
}, false);
```

这个方法不支持IE8及以下的浏览器，IE8 需要用`attachEvent()`方法替代

##### attachEvent()

`attachEvent()`在 IE8 中可以用来绑定事件，参数：

- 事件的字符串，要`on`

- 回调函数

```JavaScript
btn.attachEvent("onclick", function(){
    alert(1); // 1
});
btn.attachEvent("onclick", function(){
    alert(2); // 2
});
btn.attachEvent("onclick", function(){
    alert(3); // 3
});
```

`attachEvent()`在 IE8 中没有报错，但是执行顺序却是相反的，而且其他浏览器中不兼容

`addEventListener()`中的`this`是绑定事件的对象，`attachEvent()`中的`this`是`window`，需要统一两个方法`this`

**封装一个方法来兼容**

```JavaScript
// 定义一个函数，用来为指定元素绑定响应函数
// 参数：
// - obj 要绑定事件的对象
// - eventStr 事件的字符串
// - callback 回调函数
function bind(obj, eventStr, callback) {
    if (obj.addEventListener) {
        obj.addEventListener(eventStr, callback, false);
    } else {
        // this是谁由调用方式决定
        // callback.call(obj)	通过call()修改this的对象
        obj.attachEvent("on" + eventStr, function(){
            // 在匿名函数中调用回调函数
            callback.call(obj);
        });
    }
}
```



#### 5.事件的传播

关于事件的传播网景公司和微软公司有不同的理解

- 微软公司认为事件应该是由内向外传播，也就是当事件触发时，应该先触发当前元素上的事件，然后再向当前元素的祖先元素上传播，也就说件应该在 **冒泡阶段** 执行

- 网景公司认为事件应该是由外向内传播的，也就是当前事件触发时，应该先触发当前元素的最外层的祖先元素的事件，然后在向内传播给后代元素

- W3C综合了两个公司的方案，将事件传播分成了三个阶段 

1. 1. **捕获阶段**：在捕获阶段时从最外层的祖先元素，向目标元素进行事件的捕获，但是默认此时不会触发事件
   2. **目标阶段**：事件捕获到目标元素，捕获结束开始在目标元素上触发事件
   3. **冒泡阶段**：事件从目标元素向他的祖先元素传递，依次触发祖先元素上的事件

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F08%2F8ksUo7nPCiyAGVL.png&sign=27e576320d82cc03eef92a6b3ef046fcaf692c3fc2783e35a0dab53fedc89887)

如果希望在捕获阶段就触发事件，可以将`addEventListener()`的第三个参数设置为`true`

一般情况下我们不会希望在捕获阶段触发事件，所以这个参数一般都是`false`

IE8 及以下的浏览器中没有捕获阶段

#### 6.拖拽

##### 拖拽的流程

1. 当鼠标在被拖拽元素上按下时，开始拖拽 `onmousedown`
2. 当鼠标移动时被拖拽元素跟随鼠标移动 `onmousemove`
3. 当鼠标松开时，被拖拽元素固定在当前位置 `onmouseup`

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F08%2FqKwpCAOUmJnGZj3.png&sign=2ed5ecb8c183634c4c4239a5a1d9c3b66091058bf593fb7286d89168bba6a707)

**案例：拖拽**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #box1 {
        width: 100px;
        height: 100px;
        background-color: red;
        position: absolute;
      }
      #box2 {
        width: 100px;
        height: 100px;
        background-color: yellow;
        position: absolute;
        top: 200px;
        left: 200px;
      }
    </style>

    <script>
      window.onload = function () {
        //获取box1
        var box1 = document.getElementById("box1");
        //为box1绑定一个鼠标按下事件
        //当鼠标在被拖拽元素上按下时开始拖拽
        box1.onmousedown = function (event) {
          event = event || window.event;
          var boxTop = event.clientY - box1.offsetTop; // 鼠标垂直坐标 - 元素垂直偏移量 = 鼠标原点和元素原点垂直距离
          var boxLeft = event.clientX - box1.offsetLeft; // 鼠标水平坐标 - 元素水平偏移量 = 鼠标原点和元素原点水平距离

          //为document绑定一个onmousemove事件
          //当鼠标移动时被拖拽元素跟随鼠标移动
          document.onmousemove = function (event) {
            event = event || window.event;
            box1.style.top = event.clientY - boxTop + "px";
            box1.style.left = event.clientX - boxLeft + "px";
          };
          //为document绑定一个onmouseup事件
          //当鼠标松开时，被拖拽元素固定在当前位置
          document.onmouseup = function (event) {
            // 取消document的onmousemove事件
            document.onmousemove = null;
            // 取消document的onmouseup事件
            document.onmouseup = null;
          };
          /*
            当我们拖拽一个网页中的内容时，浏览器会默认去搜索引擎中搜索内容，
            此时会导致拖拽功能的异常，这个是浏览器提供的默认行为
            如果不希望发生这个行为，则可以通过return false来取消默认行为
          */
          return false;
        };
      };
    </script>
  </head>
  <body>
    <div id="box1"></div>
    <div id="box2"></div>
  </body>
</html>

```



##### 方法封装

如果我想拖动 div2等其他元素，这个时候我们需要封装一个函数，方便我们直接传参调用

```JavaScript
// 拖拽方法封装成一个函数
function draw(obj){
    obj.onmousedown = function(event) {
        obj.setCapture && obj.setCapture();
        event = event || window.event;
        var boxLeft = event.clientX - obj.offsetLeft;
        var boxTop = event.clientY - obj.offsetTop;
        document.onmousemove = function(event) {
            event = event || window.event;
            obj.style.left = event.clientX - boxLeft + "px";
            obj.style.top = event.clientY - boxTop + "px";
        };
        document.onmouseup = function(event) {
            document.onmousemove = null;
            document.onmouseup = null;
            obj.releaseCapture && obj.releaseCapture();
        };
        return false;
    };
}
```

调用时，就只需要直接调用方法

```JavaScript
var box1 = document.getElementById("box1");
var box2 = document.getElementById("box2");
var img = document.getElementById("img");
draw(box1);
draw(box2);
draw(img);
```



### 13.滚轮与键盘事件

#### 滚轮事件

**onmousewheel、DOMMouseScroll**

`onmousewheel`：鼠标滚轮滚动的事件，会在滚轮滚动时触发，但是火狐不支持该属性

`DOMMouseScroll`：在火狐中使用`DOMMouseScroll`来绑定滚动事件，注意该事件需要通过`addEventListener()`函数来绑定



**event.wheelDelta、event.detail**

`event.wheelDelta`：可以获取鼠标滚轮滚动的方向：向上滚（120），向下滚（-120），这个值我们不看大小，只看正负

`event.detail`：`wheelDelta`这个属性火狐中不支持，在火狐中使用`event.detail`来获取滚动的方向：向上滚（-3），向下滚（3）



**return false、event.preventDefault()**

当滚轮滚动时，如果浏览器有滚动条，滚动条会随之滚动，这是浏览器的默认行为

如果不希望发生，则可以使用`return false`来取消默认行为

使用`addEventListener()`方法绑定响应函数，取消默认行为时不能使用`return false`，需要使用`event`来取消默认行为

但是 IE8 不支持`event.preventDefault()`这个玩意，如果直接调用会报错

```javascript
window.onload = function() {
    var box1 = document.getElementById("box1");
    box1.onmousewheel = function(event) {
        event = event || window.event;
        // alert(event.wheelDelta); // IE/内置：120/-120；Chrome/Edge：150/-150；Firefox：undefined/undefined
        // alert(event.detail); // IE/内置/Chrome/Edge：0/0；Firefox：-3/3;

        // 当鼠标滚轮向下滚动时，box1变长
        // 当鼠标滚轮向上滚动时，box1变短
        if (event.wheelDelta > 0 || event.detail < 0) {
            box1.style.height = box1.clientHeight - 10 + "px";
        } else {
            if (box1.clientHeight - 10 > 0) {
                box1.style.height = box1.clientHeight + 10 + "px";
            }
        }

        // 使用addEventListener()方法绑定响应函数，取消默认行为时不能使用return false，需要使用event来取消默认行为
        // 但是IE8不支持event.preventDefault()这个玩意，如果直接调用会报错
        event.preventDefault && event.preventDefault();

        // 当滚轮滚动时，如果浏览器有滚动条，滚动条会随之滚动
        // 这是浏览器的默认行为，如果不希望发生，则可以取消默认行为
        return false;
    };
    // 兼容addEventListener
    bind(box1, "DOMMouseScroll", box1.onmousewheel);
}

function bind(obj, eventStr, callback) {
    if (obj.addEventListener) {
        obj.addEventListener(eventStr, callback, false);
    } else {
        // this是谁由调用方式决定
        // callback.call(obj)
        obj.attachEvent("on" + eventStr, function(){
            // 在匿名函数中调用回调函数
            callback.call(obj);
        });
    }
}
```



#### 键盘事件

**onkeydown、onkeyup**

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F09%2F79VJlsNLoxZhI3j.png&sign=6ec59ae84065d49073c18d79ed4918a2cd1436f7dbba490eeb8a932da85be2a4)



`onkeydown`按键被按下

- 如果一直按着某个按键不松手，则事件会一直触发

- 连续触发时，第一次和第二次之间会间隔稍微长一点，其他的会非常的快，这种设计是为了防止误操作的发生

`onkeyup`按键被松开



键盘事件一般都会绑定给一些可以获取到焦点的对象或者是`document`

**键盘事件属性**

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F09%2FqAb4CpUSj3Di7c6.png&sign=a0481c23314a932a58e93e0370cf1b471b492ee4275611f2de6f0788a5125c51)

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F09%2FqXIGjQ3OtRbUW6M.png&sign=b24569e0688b1d0103690219c9c81791d9399df9e1c32780beede7bffc061641)

可以通过`keyCode`来获取按键的编码，通过它可以判断哪个按键被按下

除了`keyCode`，事件对象中还提供了几个属性`altKey`、`ctrlKey`、`shiftKey`

这个三个用来判断`alt`、`ctrl`和`shift`是否被按下，如果按下则返回`true`，否则返回`false`

**案例：键盘移动div**

```JavaScript
// 定义速度
var speed = 10;
var box1 = document.getElementById("box1");
// 绑定键盘响应事件
document.onkeydown = function(event) {
    event = event || window.event;
    // 按ctrl加速
    speed = event.ctrlKey ? 30 : 10;
    // console.log(event.keyCode); // 左：37；上：38；右：39；下：40
    switch (event.keyCode) {
        // 左移
        case 37:
            box1.style.left = box1.offsetLeft - speed + "px";
            break;
        // 上移
        case 38:
            box1.style.top = box1.offsetTop - speed + "px";
            break;
        // 右移
        case 39:
            box1.style.left = box1.offsetLeft + speed + "px";
            break;
        // 下移
        case 40:
            box1.style.top = box1.offsetTop + speed + "px";
            break;
        default:
            break;
    }
    return false;
}
```



### 14.BOM

BOM：浏览器对象模型

BOM 可以使我们通过 JS 来操作浏览器

在 BOM 中为我们提供了一组对象，用来完成对浏览器的操作 

#### BOM 对象

**Window**

代表的是整个 **浏览器的窗口**，同时 window 也是网页中的全局对象



**Navigator**

代表的当前 **浏览器的信息**，通过该对象可以来识别不同的浏览器



**Location**

代表当前 **浏览器的地址栏信息**，通过 Location 可以获取地址栏信息，或者操作浏览器跳转页面



**History**

代表 **浏览器的历史记录**，可以通过该对象来操作浏览器的历史记录

由于隐私原因，该对象不能获取到具体的历史记录，只能操作 **浏览器向前或向后翻页**，而且该操作只在当次访问时有效



**Screen**

代表用户的 **屏幕的信息**，通过该对象可以获取到用户的显示器的相关的信息



这些 BOM 对象在浏览器中都是作为 window 对象的属性保存的，可以通过 window 对象来使用，也可以直接使用

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F11%2FMjNqh1SwBy369Oc.png&sign=c8043bc9802667e56c11606918c32f99c2be5015f17dd7848865fedc94bcff2d)

```JavaScript
console.log(window); // [object Window]
console.log(navigator); // [object Navigator]
console.log(location); // [object Object]
console.log(history); // [object History]
console.log(screen); // [object Screen]
```



#### Navigator

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F11%2Fxwvy4jtKlQ2oFZA.png&sign=ae76af8bca73460b664bb6b2163189a680570cb32226f4e970e65ae203c7c577)

由于历史原因，`Navigator`对象中的大部分属性都已经不能帮助我们识别浏览器了

```JavaScript
console.log(navigator.appName); //Chrome/Firefox/Edge/IE11：Netscape；
//IE10及以下：Microsoft Internet Explorer
```

一般我们只会使用`userAgent`来判断浏览器的信息，`userAgent`是一个字符串

这个字符串中包含有用来描述浏览器信息的内容，不同的浏览器会有不同的`userAgent`



```javascript
console.log(navigator.userAgent);
// Chrome： Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36
// Firefox：Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0
// Edge：   Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edg/92.0.902.67
// IE11：   Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko
// IE10：   Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)
// IE9：    Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)
// IE8：    Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)
// IE7/IE5：Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)
```

我们可以根据`userAgent`中特有的标识符来判断是哪个浏览器

```javascript
var ua = navigator.userAgent;
if (/edg/i.test(ua)) {
    alert("Edge浏览器");
} else if (/firefox/i.test(ua)) {
    alert("火狐浏览器");
} else if (/chrome/i.test(ua)) {
    alert("谷歌浏览器");
} else if (/msie/i.test(ua)) {
    alert("IE浏览器");
}
```

注：现在Edge浏览器已经改为Chrome内核，已经与IE划清界限



#### History

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F11%2FO8uajZ6tiyfWKDL.png&sign=bf0974f3d2e7f690743c923d11d9a3590cf06b7255368453d1094ab0efdb4813)

**go()**

可以用来跳转到指定的页面，它需要一个整数作为参数

- 1：表示向前跳转一个页面，相当于`forward()`

- 2：表示向前跳转两个页面

- -1：表示向后跳转一个页面，相当于`back()`

- -2：表示向后跳转两个页面



#### Location

如果直接打印`location`，则可以获取到地址栏的信息（当前页面的完整路径）

```JavaScript
alert(location); // http://127.0.0.1:8848/Demo/17-04-Location.html
```

如果直接将`location`属性修改为一个完整的路径，或相对路径则我们页面会自动跳转到该路径，并且会生成相应的历史记录

```JavaScript
location = "http://www.baidu.com";
```

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F11%2FXeKZjDa78W6Pudy.png&sign=5cb14263251b9cdcbd4cd9b3443086dee0dc0f5f7ba08ee6e2833fb8f2cb6c0e)



**assign()**

用来跳转到其他的页面，作用和直接修改`location`一样

会生成历史记录， 能使用回退按钮回退

```JavaScript
location.assign("http://www.baidu.com");
```



**reload()**

用于重新加载当前页面，作用和刷新按钮（F5）一样

如果在方法中传递一个`true`，作为参数，则会强制清空缓存刷新页面（Ctrl + F5）

```JavaScript
location.reload(true);
```



### 15.定时调用和延时调用

#### 定时调用

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F11%2FqMQa3pymCtWTG2F.png&sign=a6149b93d66445de99e651bd4960e81ec120691daad20e16c34ab0bd0f9b7288)

JS 的程序的执行速度是非常非常快的如果希望一段程序，可以每间隔一段时间执行一次，可以使用定时调用



**setInterval()**

定时调用，可以将一个函数，每隔一段时间执行一次

参数：

1. 回调函数，该函数会每隔一段时间被调用一次
2. 每次调用间隔的时间，单位是毫秒

返回值：返回一个`Number`类型的数据，这个数字用来作为定时器的唯一标识

```JavaScript
var num = 1;
info = document.getElementById("info");
setInterval(function(){
    info.innerHTML = num++;
}, 1000);
```

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F11%2FhT39yeQGAH4j7EV.gif&sign=0be26da2ced6b92d01f34adc46babab4adc52408ec26c9f8020600352c392be1)

**clearInterval()**

可以用来关闭一个定时器，方法中需要一个定时器的标识作为参数，这样将关闭标识对应的定时器

```JavaScript
var timer = setInterval(function(){
    info.innerHTML = num++;
    if(num > 100){
        clearInterval(timer);
    }
}, 10);
```



**案例：定时轮播图**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #img {
        height: 200px;
      }
    </style>
    <script>
      window.onload = function () {
        var img = document.getElementById("img");
        var btnStart = document.getElementById("btnStart");
        var btnEnd = document.getElementById("btnEnd");
        //设置轮播图片索引
        var index = 0;
        //设置定时器
        var timer;
        //设置轮播图图片
        var imgArr = [
          "./assests/card_img01.jpg",
          "./assests/card_img02.jpg",
          "./assests/card_img03.jpg",
          "./assests/card_img04.jpg",
          "./assests/card_img05.jpg",
        ];
        //点击触发定时器
        btnStart.onclick = function () {
          //清除上一个定时器
          clearInterval(timer);
          //定时器
          timer = setInterval(function () {
            index++;
            index %= imgArr.length;
            img.src = imgArr[index];
          }, 1000);
        };
        //点击清除定时器
        btnEnd.onclick = function () {
          clearInterval(timer);
        };
      };
    </script>
  </head>
  <body>
    <img src="./assests/card_img01.jpg" id="img" />
    <button type="button" id="btnStart">开始</button>
    <button type="button" id="btnEnd">结束</button>
  </body>
</html>

```

**案例：控制div移动-升级**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #box1 {
        width: 100px;
        height: 100px;
        background-color: red;
        position: absolute;
      }
    </style>
    <script>
      window.onload = function () {
        var speed = 6;
        var box1 = document.getElementById("box1");
        //定义方向
        var direct;
        //定时器只控制方向
        setInterval(function () {
          switch (direct) {
            case 37:
              //   alert("←");
              box1.style.left = box1.offsetLeft - speed + "px";
              break;
            case 38:
              //   alert("↑");
              box1.style.top = box1.offsetTop - speed + "px";
              break;
            case 39:
              //   alert("→");
              box1.style.left = box1.offsetLeft + speed + "px";
              break;
            case 40:
              //   alert("↓");
              box1.style.top = box1.offsetTop + speed + "px";
              break;
          }
        }, 10);

        //键盘按下控制速度
        document.onkeydown = function (event) {
          event = event || window.event;
          // console.log(event.keyCode); // 左：37；上：38；右：39；下：40
          speed = event.ctrlKey ? 18 : 6;
          direct = event.keyCode;
        };
        //键盘松开清空速度和方向
        document.onkeyup = function () {
          direct = 0;
        };
      };
    </script>
  </head>
  <body>
    <div id="box1"></div>
  </body>
</html>

```



#### 延时调用

**setTimeout()、clearTimeout()**

延时调用，延时调用一个函数不马上执行，而是隔一段时间以后在执行，而且只会执行一次

延时调用和定时调用的区别：定时调用会执行多次，而延时调用只会执行一次

延时调用和定时调用实际上是可以互相代替的，在开发中可以根据自己需要去选择

```JavaScript
var num = 1;
var timer = setInterval(function(){
 	console.log(num++); // 1 2 3 4 5 ...
}, 1000);
var timer = setTimeout(function(){
    console.log(num++); // 1
}, 1000);
clearTimeout(timer);
```



#### 类的操作

通过`style`属性来修改元素的样式，每修改一个样式，浏览器就需要重新渲染一次页面

这样执行的性能是比较差的，而且这种形式当我们要修改多个样式时，也不太方便

```JavaScript
box1.style.width = "200px";
box1.style.height = "200px";
box1.style.backgroundColor = "yellow";
```

我们可以先事先定义好一个 class 属性，里面写好我们需要变化的样式



### 16.自定义工具类

```JavaScript
/**
 * 自定义兼容所有浏览器获取元素样式的方法
 * @param {*} obj 对象
 * @param {*} name 字符串属性
 * @returns
 */
function getStyle(obj, name) {
  return window.getComputedStyle
    ? getComputedStyle(obj, null)[name]
    : obj.currentStyle[name];
}

/**
 * move移动方法
 * @param {*} obj 要执行动画的对象
 * @param {String} attr 要执行动画的样式   eg:"left"、"top"、"width"、"height"
 * @param {*} target 执行动画的目标位置
 * @param {*} speed 移动的速度
 * @param {*} callback 回调函数
 */
function move(obj, attr, target, speed, callback) {
  clearInterval(obj.timer);
  var current = parseInt(getStyle(obj, attr));
  speed = target < current ? -speed : speed;
  obj.timer = setInterval(function () {
    var oldValue = parseInt(getStyle(obj, attr));
    var newValue = oldValue + speed;
    newValue =
      speed > 0
        ? newValue > target
          ? target
          : newValue
        : newValue < target
        ? target
        : newValue;
    obj.style[attr] = newValue + "px";
    if (newValue == target) {
      clearInterval(obj.timer);
      //动画执行完毕调用callback()
      callback();
    }
  }, 50);
}

/**
 * 添加class属性
 * @param {*} obj 要添加class属性的元素
 * @param {*} cn 要添加的class值
 */
function addClass(obj, cn) {
  obj.className += " " + cn;
}

/**
 * 判断是否含有class属性
 * @param {*} obj 要判断class属性的元素
 * @param {*} cn 要判断的class值
 * @returns
 */
function hasClass(obj, cn) {
  // return obj.className.indexOf(cn) != -1;
  var reg = new RegExp("\\b" + cn + "\\b");
  return reg.test(obj.className);
}

/**
 * 要移除的class属性
 * @param {*} obj 要移除class属性的元素
 * @param {*} cn 要移除的class值
 */
function removeClass(obj, cn) {
  var reg = new RegExp("\\b" + cn + "\\b");
  obj.className = obj.className.replace(reg, "");
}

/**
 * 可以用来切换一个类,如果元素中具有该类，则删除;如果元素中没有该类，则添加
 * @param {*} obj 要切换class属性的元素
 * @param {*} cn  要切换的class值
 */
function toggleClass(obj, cn) {
  if (hasClass(obj, cn)) {
    removeClass(obj, cn);
  } else {
    addClass(obj, cn);
  }
}

```

**案例：二级导航栏**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="sdmenu.css" />
    <script src="../tools.js"></script>
    <script>
      window.onload = function () {
        var menuSpan = document.querySelectorAll(".menuSpan");
        // 定义一个变量，来保存当前打开的菜单
        var openDiv = menuSpan[0].parentNode;
        var begin;
        var end;
        for (var i = 0; i < menuSpan.length; i++) {
          // 一级菜单绑定单击响应函数
          menuSpan[i].onclick = function () {
            var parentDiv = this.parentNode;

            toggleMenu(parentDiv);

            //判断openDiv和parentDiv是否相同
            if (openDiv != parentDiv && !hasClass(openDiv, "collapsed")) {
              // 打开菜单以后，应该关闭之前打开的菜单
              toggleMenu(openDiv);
            }

            //修改openDiv为当前打开的菜单
            openDiv = parentDiv;
          };
        }
      };

      function toggleMenu(obj) {
        //切换前高度
        begin = obj.offsetHeight;

        // 切换
        toggleClass(obj, "collapsed");

        //切换后高度
        end = obj.offsetHeight;

        //动画执行前内联高度
        obj.style.height = begin + "px";
        //执行动画
        move(obj, "height", end, 10, function () {
          //动画执行完毕删除内联样式
          obj.style.height = "";
        });
      }
    </script>
  </head>
  <body>
    <div id="my_menu" class="sdmenu">
      <div>
        <span class="menuSpan">在线工具</span>
        <a href="#">图像优化</a>
        <a href="#">收藏夹图标生成器</a>
        <a href="#">邮件</a>
        <a href="#">htaccess密码</a>
        <a href="#">梯度图像</a>
        <a href="#">按钮生成器</a>
      </div>
      <div class="collapsed">
        <span class="menuSpan">支持我们</span>
        <a href="#">推荐我们</a>
        <a href="#">链接我们</a>
        <a href="#">网络资源</a>
      </div>
      <div class="collapsed">
        <span class="menuSpan">合作伙伴</span>
        <a href="#">JavaScript工具包</a>
        <a href="#">CSS驱动</a>
        <a href="#">CodingForums</a>
        <a href="#">CSS例子</a>
      </div>
      <div class="collapsed">
        <span class="menuSpan">测试电流</span>
        <a href="#">Current or not</a>
        <a href="#">Current or not</a>
        <a href="#">Current or not</a>
        <a href="#">Current or not</a>
      </div>
    </div>
  </body>
</html>

```

```css
@charset "utf-8";

/* sdmenu */

div.sdmenu {
  width: 150px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  font-size: 12px;
  padding-bottom: 10px;
  background: url(bottom.gif) no-repeat right bottom;
  color: #fff;
}

div.sdmenu div {
  background: url(title.gif) repeat-x;
  overflow: hidden;
}

div.sdmenu div:first-child {
  background: url(toptitle.gif) no-repeat;
}

div.sdmenu div.collapsed {
  height: 25px;
}

div.sdmenu div span {
  display: block;
  height: 15px;
  line-height: 15px;
  overflow: hidden;
  padding: 5px 25px;
  font-weight: bold;
  color: white;
  background: url(expanded.gif) no-repeat 10px center;
  background-color: #066;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

div.sdmenu div.collapsed span {
  background-image: url(collapsed.gif);
}

div.sdmenu div a {
  padding: 5px 10px;
  background: #eee;
  display: block;
  border-bottom: 1px solid #ddd;
  color: #066;
}

div.sdmenu div a.current {
  background: #ccc;
}

div.sdmenu div a:hover {
  background: #066 url(linkarrow.gif) no-repeat right center;
  color: #fff;
  text-decoration: none;
}

```

### 17.JSON

#### JSON简介

![img](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fi.loli.net%2F2021%2F08%2F15%2F7vAu4g1pPcOBzNt.png&sign=5e14854dbf6aab0be610cf806788223836b69304f2a4b2ec0cb52fe135b588b6)

`JSON` 和 JS 对象的格式一样，只不过 `JSON`字符串中的属性名必须加双引号，其他的和JS语法一致



**JSON分类**

- `对象{}`

- `数组[]`

```JavaScript
var obj = {
    "name": "孙悟空",
    "age": 1000,
    "gender": "男"
};
console.log(typeof obj); // object
var jsonObjStr = '{"name": "孙悟空","age": 1000,"gender": "男"}';
console.log(typeof jsonObjStr); // string
var jsonArrStr = '[1,2,3,"hello", true]';
console.log(typeof jsonArrStr); // string
```



**JSON中允许的值**

- 字符串

- 数值

- 布尔值

- `null`

- 对象

- 数组

```JavaScript
// json对象可以包含json数组
var obj1 = '{"arr":[1,2,3]}';
// json数组可以包含json对象
var obj2 = '[{"name": "孙悟空","age": 1000,"gender": "男"},{"name": "孙悟空","age": 1000,"gender": "男"}]';
```



#### JSON和JS间转换

在 JS 中，为我们提供了一个工具类，就叫`JSON`

这个对象可以帮助我们将一个`JSON`转换为 JS 对象，也可以将一个 JS 对象转换`JSON`



**JSON.parse()**

可以将`JSON`字符串转换为 JS 中的对象

需要一个`JSON`字符串作为参数，会将该字符串转换为 JS 对象并返回

```JavaScript
var jsonObj = JSON.parse(jsonObjStr);
console.log(typeof jsonObj); // object
console.log(jsonObj); // { name: "孙悟空", age: 1000, gender: "男" }
console.log(jsonObj.name); // 孙悟空
console.log(jsonObj.age); // 1000
console.log(jsonObj.gender); // 男

var jsonArr = JSON.parse(jsonArrStr);
console.log(typeof jsonArr); // object
console.log(jsonArr); // (5) [ 1, 2, 3, "hello", true ]
console.log(jsonArr[0]); // 1
console.log(jsonArr[3]); // hello
console.log(jsonArr[4]); // true
```



**JSON.stringify()**

可以将一个 JS 对象转换为`JSON`字符串

需要一个 JS 对象作为参数，会返回一个`JSON`字符串

```JavaScript
var obj2 = {
    name: "猪八戒",
    age: 2000,
    gender: "男"
};
var obj2JSONStr = JSON.stringify(obj2);
console.log(typeof obj2JSONStr); // string
console.log(obj2JSONStr); // {"name":"猪八戒","age":2000,"gender":"男"}
```

`JSON`对象在 IE7 及以下的浏览器中不支持，所以在这些浏览器中调用时会报错





## JavaScript高级进阶

### 高级基础

#### 1.数据类型的分类和判断

##### 基本(值)类型

- Number —– 任意数值 ——– typeof
- String —– 任意字符串 —— typeof
- Boolean —- true/false —– typeof
- undefined — undefined —– typeof/===
- null ——– null ———- ===

##### 对象(引用)类型

- Object –*任意对象*— typeof/instanceof
- Array —*特别的对象类型(下标/内部数据有序)*— instanceof
- Function –*特别的对象类型(可执行)*– typeo

#### 数据类型判断

- typeof:

  typeof返回值是数据类型的字符串表达

  例如：

  ```JavaScript
  var a = 3
  console.log(typeof a==='number');//输出true
  ```

可以区别: 数值, 字符串, 布尔值, undefined, function

不能区别: null与对象, 一般对象与数组

typeof判断null为object

- instanceof

  专门用来判断对象数据的类型: Object, Array与Function

- ===

  可以判断: undefined和null

  简单来说，===只能判断出只有一个值的数据类型

#### 数据,变量, 内存的理解

​	这里有一个技术问题有歧义，根据最新的说法，我们的栈内存存储的变量名和值，无论是否是基本类型，我们栈内存所存储的值都存储的是堆内存的地址，也就是说栈内存不存储数据，只存储了地址。而所有的数据都是在堆内存中定义了新的内存空间。

**赋值与内存的问题**

问题: var a = xxx, a内存中到底保存的是什么?

```JavaScript
var a = 3 // 保存3
   a = function () {
   }//保存地址值
   var b = 'abc'
   a = b // b保存的数据'abc'
   b = []
   a = b // b保存的地址值
```

xxx是一个基本数据，保存的就是这个数据

xxx是一个对象，保存的是对象的地址值

xxx是一个变量，保存的是xxx的内存内容（可能是基本数据，也可能是地址值)

**关于引用变量赋值问题**

- n个引用变量指向同一个对象, 通过一个引用变量修改对象内部数据, 其他所有引用变量也看得见

```JavaScript
var obj1 = { name: 'Tom' }
var obj2 = obj1
obj2.age = 12
console.log(obj1.age);//12

function fn(obj) {
  obj.name = 'Bob'
}
fn(obj1)
console.log(obj2.name);//Bob
```

- 2个引用变量指向同一个对象,让一个引用变量指向另一个对象, 另一个引用变量还是指向原来的对象

```JavaScript
 var a = { age: 12 }
    var b = a
    a = { name: 'Jack', age: 13 }
    console.log(b.age, a.name, a.age);//12 Jack 13
/*
 这里记住一点，是将实参a赋值给形参obj，即 obj=a，此时他们指向同一对象。执行obj={age:15}，obj指向发生改变，而a指向未发生改变
*/
    function fn2(obj) {
      obj = { age: 15 }
    }
    fn2(a)
    console.log(a.age);//13
```

**在js调用函数时传递变量参数时, 是值传递还是引用传递**

对这个问题可以有着两种理解，第一种是理解为两个都是值传递，只是这个值可以是基本数据，也可以是地址数据。第二种则是把传递的地址值看作是引用传递，不过一般来说都当做是值传递。

```JavaScript
var a = 3
function fn(a) {
  a = a + 1
}
fn(a)// 传的不是a，而是3这个值
console.log(a);// 3
/* 
执行到:fn(a);先读到a是3，把a的值传给形参a，形参a去加1，输出为4。
实参a还是实参a，所以最后输出a仍然是3。这里是基本值传递。
*/
function fn2(obj) {
  console.log(obj.name);
}
var obj = { name: 'Tom' }
fn2(obj)
/*
执行到:fn2(obj);把obj中的内容（不是把{name:‘tom’}传递给形参obj，
是把obj的地址值传给形参obj，只是地址值指向的是 {name:‘tom’}）传递给形参obj。
这里是地址值传递。
*/

```

**JS引擎如何管理内存**

​	内存生命周期

- 分配需要的内存空间，得到使用权
- 存储数据，可以反复操作
- 释放当前的内存空间

​	释放内存

为执行函数分配的栈空间内存（局部变量）: 函数执行完自动释放

存储对象的堆空间内存（对象）: 当内存没有引用指向时, 对象成为垃圾对象, 垃圾回收器后面就会回收释放此内存

```javascript
var a = 3
var obj = {}// 执行到这里，一共开辟了3个内存空间
obj = null //  obj指向的对象内存空间被释放，obj不释放，手动释放

function fn() {
  var b = {} // 只有函数被执行的时候才会开辟内存空间，即 fn()调用
}
fn()
/*
fn()执行完，b被自动释放，b所指向的对象在后面的某个时刻由垃圾回收器回收
*/
```



#### 2.对象的理解和使用

##### **什么是对象**

- 代表现实中的某个事物, 是该事物在编程中的抽象
- 多个数据的集合体(封装体)
- 用于保存多个数据的容器

**为什么要用对象?**

便于对多个数据进行统一管理

##### 对象的组成

**属性**

- 代表现实事物的状态数据
- 由属性名和属性值组成
- 属性名都是字符串类型, 属性值是任意类型

**属性的分类**

- 一般属性 : 属性值不是function 描述对象的状态
- 方法 : 属性值为function的属性 描述对象的行为

**特别的对象**

- 数组: 属性名是0,1,2,3之类的索引
- 函数: 可以执行的

##### 如何操作内部属性(方法)

- obj.属性名
- obj[‘属性名’] 一般不用，但通用

**什么时候必须使用[‘属性名’]的方式?**

- 属性名不是合法的标识名（包含特殊字符：- 空格等）
- 属性名不确定

```JavaScript
// 创建对象
   var p = {}
   /*情形一: 属性名不是合法的标识名*/
   /*需求: 添加一个属性: content-type: text/json */
   p.content-type = 'text/json' //不正确
   p['content-type'] = 'text/json'
   /*情形二: 属性名不确定*/
   var prop = 'xxx'  // 我们想让这个值（xxx）做属性名
   var value = 123
   p.prop = value  //不正确  这么写的属性名是prop
   p[prop] = value
   console.log(p['content-type'], p[prop])
```



#### 3.函数的理解与使用

##### **函数定义**

- 函数声明
- 表达式

```JavaScript
fn1()// 输出fn1
fn2()// 输出undefined
//函数声明
function fn1() {
  console.log('fn1');
}
//表达式
var fn2 = function () {
  console.log('fn2');
}
```

区别：js中的**变量提升**

- 函数声明可以在声明前调用
- 表达式不能在声明前调用，输出为undefined

##### 如何调用(执行)函数?

- test()：直接调用
- new test()：new调用
- obj.test()：对象调用
- test.call/apply(obj)：临时让test成为obj的方法进行调用

```JavaScript
  var obj = {}
  function test2() {
    this.xxx = 'atguigu'
  }
  test2.call(obj) // 可以让一个函数成为指定任意对象的方法进行调用
//test2.apply(obj)
  console.log(obj.xxx) // atguigu
```

这里我的想法是，call和apply改变了函数test2中的this指向，将函数test2中的this指向从window改变，指向call和apply传入的对象（后面有讲到this的指向问题）

**函数也是对象**

- instanceof Object===true
- 函数有属性: prototype
- 函数有方法: call()/apply()
- 可以添加新的属性/方法

**函数的3种不同角色**

- 一般函数 : 直接调用
- 构造函数 : 通过new调用
- 对象 : 通过.调用内部的属性/方法



##### 回调函数的理解

- 什么函数才是回调函数?
  - 你定义的
  - 你没有调用
  - 但它最终执行了(在一定条件下或某个时刻)
- 常用的回调函数
  - dom事件回调函数
  - 定时器回调函数
  - ajax请求回调函数
  - 生命周期回调函数



##### 匿名函数自调用

```JavaScript
(function (i) {
   var a = 4
   function fn() {
     console.log('fn ', i+a)// 7
   }
   fn()
 })(3)
```

- 专业术语为: IIFE (Immediately Invoked Function Expression) 立即调用函数表达式

作用

- 隐藏内部实现
- 不污染外部命名空间
- 编码js模块

**this是什么?**

- 任何函数本质上都是通过某个对象来调用的，没有直接指定就是window
- 所有函数内部都有一个变量this
- 它的值是调用函数的当前对象

**如何确定this的值?**

- test()：window
- obj.test()：obj
- new test()：新建的对象
- test.call(obj)：obj

本质上任何函数在执行时都是通过某个对象调用的

```JavaScript
function Person(color) {
      console.log(this)
      this.color = color;
      this.getColor = function () {
        console.log(this)
        return this.color;
      };
      this.setColor = function (color) {
        console.log(this)
        this.color = color;
      };
    }

    Person("red"); //this是谁? window

    var p = new Person("yello"); //this是谁? p

    p.getColor(); //this是谁? p

    var obj = {};
    p.setColor.call(obj, "black"); //this是谁? obj

    var test = p.setColor;
    test(); //this是谁? window

    function fun1() {
      function fun2() {
        console.log(this);
      }

      fun2(); //this是谁? window
    }
    fun1();
```

### 函数进阶高级

#### 1.原型与原型链

- `prototype` : 显式原型属性，它默认指向一个Object空对象(即称为: 原型对象)
- 原型对象中有一个属性constructor, 它指向函数对象

**给原型对象添加属性(一般都是方法)**

作用: 函数的所有实例对象自动拥有原型中的属性(方法)

```JavaScript
// 每个函数都有一个prototype属性, 它默认指向一个对象(即称为: 原型对象)
  console.log(Date.prototype, typeof Date.prototype)

  function fun() { }

  console.log(fun.prototype);// 默认指向一个Object空对象（没有我们的属性）

  //原型对象中有一个属性constructor, 它指向函数对象
  console.log(Date.prototype.constructor === Date)// true
  console.log(fun.prototype.constructor === fun)// true

  //给原型对象添加属性(一般都是方法)
  fun.prototype.test = function () {
    console.log('test()');
  }
  //创建一个实例
  var f = new fun()
  f.test() // 可以执行 
```

**所有实例对象都有一个特别的属性**

`__proto__` : 隐式原型属性

#### 2.显式原型与隐式原型的关系

- 函数的prototype属性: 在定义函数时自动添加的, 默认值是一个空Object对象
- 对象的`__proto__`属性: 创建对象时自动添加的, 默认值为构造函数的prototype属性值
- 程序员能直接操作显式原型, 但不能直接操作隐式原型(ES6之前)
- 原型对象即为当前实例对象的父对象
- *对象的隐式原型的值为其对应构造函数的显式原型的值*

```javascript
function Fn() {  // 内部语句：this.prototype={}
}
// 每个函数function都有一个prototype，即显式原型 
console.log(Fn.prototype)
// 每个实例对象都有一个__proto__，可称为隐式原型
var fn = new Fn()  // 内部语句：this.__proto__ = Fn.prototype
console.log(fn.__proto__)
// 对象的隐式原型的值为其对应构造函数的显式原型的值
console.log(Fn.prototype === fn.__proto__)// true
//给原型添加方法
Fn.prototype.test = function () {
  console.log('test()')
}
fn.test()
```

![](https://cdn-1311041824.cos.ap-guangzhou.myqcloud.com/images%2FpageImage%2Fjs%E9%AB%98%E7%BA%A7%2F%E6%98%BE%E5%BC%8F%E5%8E%9F%E5%9E%8B%E4%B8%8E%E9%9A%90%E5%BC%8F%E5%8E%9F%E5%9E%8B.png)

#### 3.原型链

![](https://img2018.cnblogs.com/blog/1153103/201902/1153103-20190228152227115-297624496.png)

##### 基础理解

- 所有的实例对象都有`__proto__`属性, 它指向的就是原型对象
- 这样通过`__proto__`属性就形成了一个链的结构—->原型链
- 当查找对象内部的属性/方法时, js引擎自动沿着这个原型链查找
- 当给对象属性赋值时不会使用原型链, 而只是在当前对象中进行操作

![](https://cdn-1311041824.cos.ap-guangzhou.myqcloud.com/images%2FpageImage%2Fjs%E9%AB%98%E7%BA%A7%2F%E5%8E%9F%E5%9E%8B%E9%93%BE%E5%88%86%E6%9E%90.png)

访问一个对象的属性时

- 先在自身属性中查找，找到返回
- 如果没有, 再沿着__proto__这条链向上查找, 找到返回
- 如果最终（Object原型对象）没找到, 返回undefined
- 别名: 隐式原型链
- 作用: 查找对象的属性(方法)

**构造函数/原型/实体对象的关系(图解)**

![img](https://cdn-1311041824.cos.ap-guangzhou.myqcloud.com/images%2FpageImage%2Fjs%E9%AB%98%E7%BA%A7%2Fb7d5b9991ba8dfc683584ece66e7c28341652fc06b531bab428f4be745fe4030.png)

实例对象的隐式原型指向构造函数的显示原型

**构造函数/原型/实体对象的关系2(图解)**

![img](https://cdn-1311041824.cos.ap-guangzhou.myqcloud.com/images%2FpageImage%2Fjs%E9%AB%98%E7%BA%A7%2Ff88baefc063b83fa603371cefd50a8ca438c8b9e3d7559e91ab5f44e1ad1bdee.png)

函数的显示原型指向的对象默认是Object实例对象（但Object不满足）

```JavaScript
console.log(Fn.prototype instanceof Object);// true
console.log(Object.prototype instanceof Object);// false
console.log(Function.prototype instanceof Object);// true
```

函数实际上是Function的实例对象（包括Function本身），所以函数既有隐式原型也有显示原型

所有函数的隐式原型都指向Function的显示原型

```javascript
function fun1() { }
function fun2() { }
console.log(fun1.__proto__ === Function.prototype);// true
console.log(fun2.__proto__ === Function.prototype);// true
console.log(fun2.__proto__ === fun1.__proto__);// true
```

Function本身的隐式原型也指向本身的显示原型

```javascript
console.log(Function.prototype === Function.__proto__);// true
```

Object的原型对象是原型链的尽头

```javascript
console.log(Object.prototype.__proto__)// null
```

##### 原型链属性问题

- 读取对象的属性值时: 会自动到原型链中查找
- 设置对象的属性值时: 不会查找原型链, 如果当前对象中没有此属性, 直接添加此属性并设置其值
- 方法一般定义在原型中, 属性一般通过构造函数定义在对象本身上

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.setName = function (name) {
  this.name = name;
}
Person.prototype.sex = '男';

var p1 = new Person('Tom', 12)
p1.setName('Jack')
console.log(p1.name, p1.age, p1.sex)// Jack 12 男
p1.sex = '女'
console.log(p1.name, p1.age, p1.sex)// Jack 12 女

var p2 = new Person('Bob', 23)
console.log(p2.name, p2.age, p2.sex)// Bob 23 男
```

##### instanceof

表达式: A instanceof B

如果B函数的显式原型对象在A对象的原型链上, 返回true, 否则返回false

Function是通过new自己产生的实例

**案例一**

![img](https://cdn-1311041824.cos.ap-guangzhou.myqcloud.com/images%2FpageImage%2Fjs%E9%AB%98%E7%BA%A7%2Fd40d210e94738d75f0891a70c864d01684b411f5c8c57cffee6bf5a8b96f8936.png)



如果B函数的显式原型对象在A对象的原型链上, 返回true, 否则返回false

这里很简单可以看出，Foo构造函数的显示原型与实例f1，f2的隐式原型指向同一个对象，所以instanceof判断为true

```JavaScript
function Foo() { }
var f1 = new Foo();
console.log(f1 instanceof Foo);// true
console.log(f1 instanceof Object);// true
```

**案例二**

![img](https://cdn-1311041824.cos.ap-guangzhou.myqcloud.com/images%2FpageImage%2Fjs%E9%AB%98%E7%BA%A7%2Fc7b6ea12284706f1e4ee4a4168e5248597b228a884288508b54cc879ccccc134.png)

```JavaScript
//Object函数是function的实例，所以有隐式原型
console.log(Object instanceof Function)// true
console.log(Object instanceof Object)// true
console.log(Function instanceof Object)// true
//Function是通过new自己产生的实例
console.log(Function instanceof Function)// true
function Foo() { }
console.log(Object instanceof Foo);// false
```

#### 4.执行上下文与执行上下文栈

- 执行上下文: 由js引擎自动创建的对象, 包含对应作用域中的所有变量属性
- 执行上下文栈: 用来管理产生的多个执行上下文

##### 变量提升与函数提升

- 变量提升: 在变量定义语句之前, 就可以访问到这个变量(undefined)（使用var关键字定义，es6的let，const不会变量提升，现在开发很少使用var关键字，变量一般用let，对象、数组、函数使用const）
- 函数提升: 在函数定义语句之前, 就可以执行该函数
- 先有变量提升, 再有函数提升

```JavaScript
var a = 4
function fn() {
  console.log(a)
  var a = 5
}
fn()// undefined
console.log(a1) //可以访问, 但值是undefined
a2() // 可以直接调用
a3()// 此处遵循变量提升，不能调用
var a1 = 3
function a2() {
  console.log('a2()')
}
var a3 = function () {
  console.log('a3()');
}
```

##### 执行上下文理解

**代码分类(位置)**

- 全局代码
- 函数代码

**全局执行上下文**

在执行全局代码前将window确定为全局执行上下文

对全局数据进行预处理

1. var定义的全局变量==>undefined, 添加为window的属性
2. function声明的全局函数==>赋值(fun), 添加为window的方法
3. this==>赋值(window)
4. 开始执行全局代码



```JavaScript
console.log(a1, window.a1);//undefined undefined
a2()//a2()
window.a2()//a2()
console.log(this);
var a1 = 3
function a2() {
  console.log('a2()');
}
```

**函数执行上下文**

在调用函数, 准备执行函数体之前, 创建对应的函数执行上下文对象

对局部数据进行预处理

1. 形参变量==>赋值(实参)==>添加为执行上下文的属性
2. arguments==>赋值(实参列表), 添加为执行上下文的属性
3. var定义的局部变量==>undefined, 添加为执行上下文的属性
4. function声明的函数 ==>赋值(fun), 添加为执行上下文的方法
5. this==>赋值(调用函数的对象)
6. 开始执行函数体代码

```JavaScript
function fn(a1) {
  console.log(a1);// 2
  console.log(a2);// undefined
  a3()// a3()
  console.log(this);// window
  console.log(arguments);// 伪数组(2,3)
  var a2 = 3
  function a3() {
    console.log('a3()');
  }   
}
fn(2, 3)
```



**分类**

全局: window
函数: 对程序员来说是透明的

**生命周期**

全局 : 准备执行全局代码前产生, 当页面刷新/关闭页面时死亡
函数 : 调用函数时产生, 函数执行完时死亡

**执行上下文创建和初始化的过程**

**全局**

-  在全局代码执行前最先创建一个全局执行上下文(window)
-  收集一些全局变量, 并初始化
-  将这些变量设置为window的属性

**函数**

-  在调用函数时, 在执行函数体之前先创建一个函数执行上下文
-  收集一些局部变量, 并初始化
-  将这些变量设置为执行上下文的属性

##### 执行上下文栈理解

- 在全局代码执行前, JS引擎就会创建一个栈来存储管理所有的执行上下文对象
- 在全局执行上下文(window)确定后, 将其添加到栈中(压栈)
- 在函数执行上下文创建后, 将其添加到栈中(压栈)
- 在当前函数执行完后,将栈顶的对象移除(出栈)
- 当所有的代码执行完后, 栈中只剩下window



```JavaScript
                          //1. 进入全局执行上下文
var a = 10
var bar = function (x) {
  var b = 5
  foo(x + b)              //3. 进入foo执行上下文
}
var foo = function (y) {
  var c = 5
  console.log(a + c + y)
}
bar(10)                    //2. 进入bar函数执行上下文
```

![img](https://cdn-1311041824.cos.ap-guangzhou.myqcloud.com/images%2FpageImage%2Fjs%E9%AB%98%E7%BA%A7%2Fef498657d7f84e2ac6360105f1859d6fde755b09a977c678bd171cfe47124b9d.png)



#### 5.作用域与作用域链

主要是概念类的东西，也很简单，就两个一起讲

##### 理解

- 作用域: 一块代码区域, 在编码时就确定了, 不会再变化

  **分类**

  全局作用域
  函数作用域
  js没有块作用域(在ES6之前



![img](https://cdn-1311041824.cos.ap-guangzhou.myqcloud.com/images%2FpageImage%2Fjs%E9%AB%98%E7%BA%A7%2Fa69eab7eea49fe0056cac0686f9fe688e3abf11325898ccf4f82cb9cbf39a71b.png)

- 作用域链: 多个嵌套的作用域形成的由内向外的结构, 用于查找变量

![img](https://cdn-1311041824.cos.ap-guangzhou.myqcloud.com/images%2FpageImage%2Fjs%E9%AB%98%E7%BA%A7%2Fe64299a51ed99ca2c202b526ffb5c40e59d375f1259cf5ead5a495fe49783473.png)



**作用**

- 作用域: 隔离变量, 可以在不同作用域定义同名的变量不冲突
- 作用域链: 查找变量

##### 区别作用域与执行上下文

![img](https://cdn-1311041824.cos.ap-guangzhou.myqcloud.com/images%2FpageImage%2Fjs%E9%AB%98%E7%BA%A7%2Fa16294ff2316a8d81eb42c314b4bf8fe087d27ad0b107e637870f28f51d0d4dc.png)



 *这里的全局上下文环境中的d应该是b*

- **区别1**
- 全局作用域之外，每个函数都会创建自己的作用域，作用域在函数定义时就已经确定了。而不是在函数调用时
- 全局执行上下文环境是在全局作用域确定之后, js代码马上执行之前创建
- 函数执行上下文环境是在调用函数时, 函数体代码执行之前创建
- **区别2**
- 作用域是静态的, 只要函数定义好了就一直存在, 且不会再变化
- 上下文环境是动态的, 调用函数时创建, 函数调用结束时上下文环境就会自动被释放
- **联系**
- 上下文环境(对象)是从属于所在的作用域
- 全局上下文环境==>全局作用域
- 函数上下文环境==>对应的函数使用域

#### 6.闭包

##### 循环遍历添加监听

```markdown
  <button>测试1</button>
  <button>测试2</button>
  <button>测试3</button>
  <!--
需求: 点击某个按钮, 提示"点击的是第n个按钮"
-->
  <script type="text/javascript">
    var btns = document.getElementsByTagName('button')

    //遍历加监听
    // btns是一个伪数组，btns.length需要不断计算，可以提前保存，加快执行效率
    for (var i = 0, length = btns.length; i < length; i++) {
        /*
        解决方案一
        这里其实可以将var i=0 改成let i=0 就可以解决,但let是es6语法，我们js高级只涉及es5
        */
      var btn = btns[i]
      btn.onclick = function () {
        alert('第' + (i + 1) + '个按钮')// 无论哪个按钮都输出“第4个按钮”
      }
    }
  </script>

```

```javascript
//解决方案二
for (var i = 0, length = btns.length; i < length; i++) {
  var btn = btns[i]
  btn.index = i// 解决办法  保存下标
  btn.onclick = function () {
    alert('第' + (this.index + 1) + '个按钮')
  }
}
```

```JavaScript
//解决方案三 利用闭包解决
for (var i = 0, length = btns.length; i < length; i++) {
	(function (x) {
	var btn = btns[x];
	btn.onclick = function () {
		alert("第" + (x + 1) + "个按钮");
	};
	})(i);
}
```

**闭包的产生**

当一个嵌套的内部(子)函数引用了嵌套的外部(父)函数的变量(函数)时, 就产生了闭包

**闭包产生的条件**

- 函数嵌套
- 内部函数引用了外部函数（执行）的数据(变量/函数)

```JavaScript
function fn1() {
  var a = 3
  function fn2() {
    console.log(a)// fn2引用了fn1的a，因此形成了闭包
  }
    fn2()// 目前2022年，必须调用内部函数才能在chrome中看到闭包
}
fn1()
```

##### 常见闭包

**将函数作为另一个函数的返回值**

```JavaScript
function fn1() {
  var a = 2
  function fn2() {
    a++
    console.log(a);
  }
  return fn2
}
var f = fn1()
f()// 3
f()// 4
//f相当于fn2的实例
```

**将函数作为实参传递给另一个函数调用**

```JavaScript
function showDelay(msg, time) {
     setTimeout(function () {
       alert(msg)
     }, time)
   }
   showDelay('Hello', 2000)
```

##### 闭包的作用

- 使用函数内部的变量在函数执行完后, 仍然存活在内存中(延长了局部变量的生命周期)
- 让函数外部可以操作(读写)到函数内部的数据(变量/函数)

```JavaScript
function fun1() {
  var a = 3;//此处闭包已经产生
  function fun2() {
    a++;            //引用外部函数的变量--->产生闭包
    console.log(a);
  }
  return fun2;
}
var f = fun1();  //由于f引用着内部的函数-->内部函数以及闭包都没有成为垃圾对象
f();   //间接操作了函数内部的局部变量
f();
f=null //此时闭包对象死亡
```

**闭包的生命周期**

产生: 在嵌套内部函数定义执行完时就产生了(不是在调用)

死亡: 在嵌套的内部函数成为垃圾对象时

##### 闭包的应用

**JS模块**

- 具有特定功能的js文件
- 将所有的数据和功能都封装在一个函数内部(私有的)
- 只向外暴露一个包信n个方法的对象或函数
- 模块的使用者, 只需要通过模块暴露的对象调用方法来实现对应的功能



**写法一**

```markdown
<script type="text/javascript" src="05_coolModule.js"></script>
 <script type="text/javascript">
   var module = myModule()
   module.doSomething()
   module.doOtherthing()
 </script>

```

```javascript
function myModule() {
  var msg = 'My atguigu'
  //操作数据的函数
  function doSomething() {
    console.log('doSomething ' + msg.toUpperCase());
  }
  function doOtherthing() {
    console.log('doOtherthing ' + msg.toLowerCase());
  }
  //向外暴露
  return {
    doSomething,
    doOtherthing
  }
}
```



**写法二**

```JavaScript
<script type="text/javascript" src="05_coolModule2.js"></script>
<script type="text/javascript">
  myModule2.doSomething()
  myModule2.doOtherthing()
</script>
```

```JavaScript
(function (window) {
  var msg = 'My atguigu'
  //操作数据的函数
  function doSomething() {
    console.log('doSomething ' + msg.toUpperCase());
  }
  function doOtherthing() {
    console.log('doOtherthing ' + msg.toLowerCase());
  }
  //向外暴露
  window.myModule2 = {
    doSomething,
    doOtherthing
  }
})(window)//方便代码打包压缩
```

##### 闭包的缺点及解决

**缺点:**

- 函数执行完后, 函数内的局部变量没有释放, 占用内存时间会变长
- 容易造成内存泄露

**解决:**

- 能不用闭包就不用
- 及时释放

```JavaScript
function fn1() {
  var arr = new Array(100000)
  function fn2() {
    console.log(arr.length)
  }
  return fn2
}
var f = fn1()
f()
f = null //让内部函数成为垃圾对象-->回收闭包
```



##### 内存溢出与内存泄漏

**内存溢出**

- 一种程序运行出现的错误
- 当程序运行需要的内存超过了剩余的内存时, 就出抛出内存溢出的错误

**内存泄露**

- 占用的内存没有及时释放
- 内存泄露积累多了就容易导致内存溢出
- 常见的内存泄露:
  - 意外的全局变量
  - 没有及时清理的计时器或回调函数
  - 闭包



```JavaScript
<script type="text/javascript">
 // 1. 内存溢出
 var obj = {}
 for (var i = 0; i < 10000; i++) {
   obj[i] = new Array(10000000)
   console.log('-----')
 }

 // 2. 内存泄露
   // 意外的全局变量
 function fn() {
   a = new Array(10000000)  //不使用var let const去承接
   console.log(a)
 }
 fn()

  // 没有及时清理的计时器或回调函数
 var intervalId = setInterval(function () { //启动循环定时器后不清理
   console.log('----')
 }, 1000)

 // clearInterval(intervalId)

   // 闭包
 function fn1() {
   var a = 4
   function fn2() {
     console.log(++a)
   }
   return fn2
 }
 var f = fn1()
 f()
 // f = null

</script>
```

### 面向对象高级

#### 1.对象创建模式

**Object构造函数模式**

- 套路: 先创建空Object对象, 再动态添加属性/方法
- 适用场景: 起始时不确定对象内部数据
- 问题: 语句太多

```JavaScript
/*一个人: name:"Tom", age: 12*/
// 先创建空Object对象
 var p = new Object()
 p = {} //此时内部数据是不确定的
 // 再动态添加属性/方法
 p.name = 'Tom'
 p.age = 12
 p.setName = function (name) {
   this.name = name
 }

 //测试
 console.log(p.name, p.age)
 p.setName('Bob')
 console.log(p.name, p.age)
```

**对象字面量模式**

- 套路: 使用{}创建对象, 同时指定属性/方法
- 适用场景: 起始时对象内部数据是确定的
- 问题: 如果创建多个对象, 有重复代码

```JavaScript
//对象字面量模式
var p = {
   name: 'Tom',
   age: 12,
   setName: function (name) {
     this.name = name
   }
 }
 //测试
 console.log(p.name, p.age)
 p.setName('JACK')
 console.log(p.name, p.age)

 var p2 = {  //如果创建多个对象代码很重复
   name: 'Bob',
   age: 13,
   setName: function (name) {
     this.name = name
   }
 }
```

**工厂模式**

- 套路: 通过工厂函数动态创建对象并返回
- 适用场景: 需要创建多个对象
- 问题: `对象没有一个具体的类型`, 都是Object类型

```JavaScript
//返回一个对象的函数===>工厂函数
function createPerson(name, age) { 
 var obj = {
   name: name,
   age: age,
   setName: function (name) {
     this.name = name
   }
 }
 return obj
}

// 创建2个人
var p1 = createPerson('Tom', 12)
var p2 = createPerson('Bob', 13)

// p1/p2是Object类型

function createStudent(name, price) {
 var obj = {
   name: name,
   price: price
 }
 return obj
}
var s = createStudent('张三', 12000)
// s也是Object
```



**自定义构造函数模式**

- 套路: 自定义构造函数, 通过new创建对象
- 适用场景: 需要创建多个`类型确定`的对象,与上方工厂模式有所对比
- 问题: 每个对象都有相同的数据, 浪费内存

```JavaScript
//定义类型
function Person(name, age) {
 this.name = name
 this.age = age
 this.setName = function (name) {
   this.name = name
 }
}
var p1 = new Person('Tom', 12)
p1.setName('Jack')
console.log(p1.name, p1.age)
console.log(p1 instanceof Person)

function Student (name, price) {
 this.name = name
 this.price = price
}
var s = new Student('Bob', 13000)
console.log(s instanceof Student)

var p2 = new Person('JACK', 23)
console.log(p1, p2)
```

**构造函数+原型的组合模式**

- 套路: 自定义构造函数, 属性在函数中初始化, 方法添加到原型上
- 适用场景: 需要`创建多个类型确定`的对象
- 放在原型上可以节省空间(只需要加载一遍方法)

```JavaScript
//在构造函数中只初始化一般函数
function Person(name, age) { 
 this.name = name
 this.age = age
}
Person.prototype.setName = function (name) {
 this.name = name
}

var p1 = new Person('Tom', 23)
var p2 = new Person('Jack', 24)
console.log(p1, p2)
```

#### 2.继承模式

**原型链继承**

```
 1. 套路
    - 定义父类型构造函数
    - 给父类型的原型添加方法
    - 定义子类型的构造函数
    - 创建父类型的对象赋值给子类型的原型
    - `将子类型原型的构造属性设置为子类型`-->此处有疑惑的可以看本笔记[函数高级部分的1、原型与原型链](#1、原型与原型链)
    - 给子类型原型添加方法
    - 创建子类型的对象: 可以调用父类型的方法
 2. 关键
    - `子类型的原型为父类型的一个实例对象`
```

```JavaScript
//父类型
function Supper() {
this.supProp = '父亲的原型链'
}
//给父类型的原型上增加一个[showSupperProp]方法,打印自身subProp
Supper.prototype.showSupperProp = function () {
console.log(this.supProp)
}

//子类型
function Sub() {
this.subProp = '儿子的原型链'
}

// 子类型的原型为父类型的一个实例对象
Sub.prototype = new Supper()
// 让子类型的原型的constructor指向子类型
// 如果不加,其构造函数找的[`new Supper()`]时从顶层Object继承来的构造函数,指向[`Supper()`]
Sub.prototype.constructor = Sub
//给子类型的原型上增加一个[showSubProp]方法,打印自身subProp
Sub.prototype.showSubProp = function () {
console.log(this.subProp)
}

var sub = new Sub()

sub.showSupperProp() //父亲的原型链
sub.showSubProp() //儿子的原型链
console.log(sub)  
/**
Sub {subProp: "儿子的原型链"}
subProp: "儿子的原型链"
__proto__: Supper
constructor: ƒ Sub()
showSubProp: ƒ ()
supProp: "父亲的原型链"
__proto__: Object
*/
```



`注意`:此图中没有体现[`constructor构造函数 `],会在下方构造函数补充处指出

![image-20210728101320606](https://gitee.com/hongjilin/hongs-study-notes/raw/master/%E7%BC%96%E7%A8%8B_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/HTML+CSS+JS%E5%9F%BA%E7%A1%80%E7%AC%94%E8%AE%B0/JavaScript%E7%AC%94%E8%AE%B0/A_JavaScript%E8%BF%9B%E9%98%B6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0%E4%B8%AD%E7%9A%84%E5%9B%BE%E7%89%87/image-20210728101320606.png)



**构造函数补充**

对于代码中[`Sub.prototype.constructor = Sub`]是否有疑惑?

如果不加,其构造函数找的[`new Supper()`]是从顶层Object继承来的构造函数,指向[`Supper()`],虽然如果你不加这句话,大体上使用是不受影响的,但是你有一个属性指向是错误的,如果在大型项目中万一万一哪里再调用到了呢?

这里可以补充一下constructor 的概念：

- `constructor 我们称为构造函数，因为它指回构造函数本身`
- 其作用是让某个构造函数产生的 所有实例对象（比如f） 能够找到他的构造函数（比如Fun），用法就是f.constructor

此时实例对象里没有constructor 这个属性，于是沿着原型链往上找到Fun.prototype 里的constructor，并指向Fun 函数本身

- constructor本就存在于原型中,指向构造函数,成为子对象后，如果该原型链中的constructor在自身没有而是在父原型中找到,所以指向父类的构造函数

由于这里的继承是直接改了构造函数的prototype 的指向，所以在 sub的原型链中，Sub.prototype 没有constructor 属性，反而是看到了一个super 实例

这就让sub 实例的constructor 无法使用了。为了他还能用，就在那个super 实例中手动加了一个constructor 属性，且指向Sub 函数看到了一个super 实例



**组合继承**

原型链+借用构造函数的组合继承

1. 利用原型链实现对父类型对象的方法继承
2. 利用super()借用父类型构建函数初始化相同属性

```JavaScript
function Person(name, age) {
 this.name = name
 this.age = age
}
Person.prototype.setName = function (name) {
 this.name = name
}

function Student(name, age, price) {
 Person.call(this, name, age)  // 为了得到属性
 this.price = price
}
Student.prototype = new Person() // 为了能看到父类型的方法
Student.prototype.constructor = Student //修正constructor属性
Student.prototype.setPrice = function (price) {
 this.price = price
}

var s = new Student('Tom', 24, 15000)
s.setName('Bob')
s.setPrice(16000)
console.log(s.name, s.age, s.price)
```

### 线程机制与事件机制

#### 1.线程与进程

![image-20210728115630974](https://gitee.com/hongjilin/hongs-study-notes/raw/master/%E7%BC%96%E7%A8%8B_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/HTML+CSS+JS%E5%9F%BA%E7%A1%80%E7%AC%94%E8%AE%B0/JavaScript%E7%AC%94%E8%AE%B0/A_JavaScript%E8%BF%9B%E9%98%B6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0%E4%B8%AD%E7%9A%84%E5%9B%BE%E7%89%87/image-20210728115630974.png)

1. 应用程序必须运行在某个进程的某个线程上
2. 一个进程中至少有一个运行的线程:主线程 -->进程启动后自动创建
3. 一个进程中也可以同时运行多个线程:此时我们会说这个程序是多线程运行的
4. 多个进程之间的数据是不能直接共享的 -->内存相互独立(隔离)
5. `线程池(thread pool)`:保存多个线程对象的容器,实现线程对象的反复利用

**单线程与多线程之间的比较**

多线程:

- 优点:能有效提升CPU的利用率
- 缺点
- 创建多线程开销
- 线程间切换开销
- 死锁与状态同步问题

单线程:

- 优点:顺序编程简单易懂
- 缺点:效率低



 **JS是单线程还是多线程?**

JS是单线程运行的 , 但使用H5中的 Web Workers可以多线程运行

> - 只能由一个线程去操作DOM界面

**浏览器运行是单线程还是多线程?**

> 都是多线程运行的

#### 2.浏览器内核

> 支撑浏览器运行的最核心的程序

**不同浏览器的内核**

> - Chrome, Safari : webkit
> - firefox : Gecko
> - IE : Trident
> - 360,搜狗等国内浏览器: Trident + webkit

**内核由什么模块组成?**

> 主线程
>
> 1. js引擎模块 : 负责js程序的编译与运行
> 2. html,css文档解析模块 : 负责页面文本的解析(拆解)
> 3. dom/css模块 : 负责dom/css在内存中的相关处理
> 4. 布局和渲染模块 : 负责页面的布局和效果的绘制
> 5. 布局和渲染模块 : 负责页面的布局和效果的绘制
>
> 分线程
>
> - 定时器模块 : 负责定时器的管理
> - 网络请求模块 : 负责服务器请求(常规/Ajax)
> - 事件响应模块 : 负责事件的管理

![image-20210728141032723](https://gitee.com/hongjilin/hongs-study-notes/raw/master/%E7%BC%96%E7%A8%8B_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/HTML+CSS+JS%E5%9F%BA%E7%A1%80%E7%AC%94%E8%AE%B0/JavaScript%E7%AC%94%E8%AE%B0/A_JavaScript%E8%BF%9B%E9%98%B6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0%E4%B8%AD%E7%9A%84%E5%9B%BE%E7%89%87/image-20210728141032723.png)



#### 3.证明JavaScript执行的是单线程

- `setTimeout()`的回调函数是在主线程执行的
- 定时器回调函数只有在运行栈中的代码全部执行完后才有可能执行

```javascript
// 如何证明JS执行是单线程的
setTimeout(function () { //4. 在将[timeout 1111]弹窗关闭后,再等一秒 执行此处
   console.log('timeout 2222')
   alert('22222222')
 }, 2000)
 setTimeout(function () { //3. 过了一秒后 打印 timeout 1111并弹窗,此处如果不将弹窗关闭,不会继续执行上方222
   console.log('timeout 1111')
   alert('1111111')
 }, 1000)
 setTimeout(function () { //2. 然后打印timeout() 00000
   console.log('timeout() 00000')
 }, 0)
 function fn() { //1. fn()
   console.log('fn()')
 }
 fn()
//----------------------
 console.log('alert()之前')
 alert('------') //暂停当前主线程的执行, 同时暂停计时, 点击确定后, 恢复程序执行和计时
 console.log('alert()之后')
```

流程结果:

1. 先打印了[`fn()`],然后马上就打印了[`timeout() 00000`]
2. 过了一秒后 打印 timeout 1111并弹窗,此处如果不将弹窗关闭,不会继续执行上方222
3. 在将[timeout 1111]弹窗关闭后,`再等一秒` 执行此处

- 问:为何明明写的是2秒,却关闭上一个弹窗再过一秒就执行?
- 解:并不是关闭后再计算的,而是一起计算的,alert只是暂停了主线程执行

#### 4.JS引擎执行代码的基本流程与代码分类

> 代码分类:
>
> - 初始化代码（同步代码）
> - 回调代码（异步代码）
>
> js引擎执行代码的基本流程
>
> 1.先执行初始化代码: 包含一些特别的代码 回调函数(异步执行)
>
> - 设置定时器
> - 绑定事件监听
> - 发送ajax请求
>
> 2.后面在某个时刻才会执行回调代码



#### 5.事件循环`eventloop`

##### 执行栈

当javascript代码执行的时候会将不同的变量存于内存中的不同位置：`堆（heap）`和`栈（stack）`中来加以区分。其中，堆里存放着一些对象。而栈中则存放着一些基础类型变量以及对象的指针。 `但是我们这里说的执行栈和上面这个栈的意义却有些不同`。

**执行栈:**

> 当我们调用一个方法的时候，js会生成一个与这个方法对应的执行环境（context），又叫`执行上下文`。这个执行环境中存在着这个方法的私有作用域、上层作用域的指向、方法的参数，这个作用域中定义的变量以及这个作用域的this对象。 而当一系列方法被依次调用的时候，因为js是单线程的，同一时间只能执行一个方法，于是这些方法被排队在一个单独的地方。这个地方被称为执行栈。

当一个脚本第一次执行的时候，js引擎会解析这段代码，并将其中的同步代码按照执行顺序加入执行栈中，然后从头开始执行。如果当前执行的是一个方法，那么js会向执行栈中添加这个方法的执行环境，然后进入这个执行环境继续执行其中的代码。`当这个执行环境中的代码 执行完毕并返回结果后，js会退出这个执行环境并把这个执行环境销毁，回到上一个方法的执行环境`。这个过程反复进行，直到执行栈中的代码全部执行完毕。

##### 事件队列`Task Queue`

JS引擎遇到一个异步事件后并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务,当一个异步事件返回结果后，js会将这个事件加入与当前执行栈不同的另一个队列，我们称之为`事件队列`。

> 被放入事件队列不会立刻执行其回调，而是`等待当前执行栈中的所有任务都执行完毕， 主线程处于闲置状态时，主线程会去查找事件队列是否有任务`。如果有，那么主线程会从中取出排在第一位的事件，并把这个事件对应的回调放入执行栈中，然后执行其中的同步代码...，如此反复，`这样就形成了一个无限的循环。这就是这个过程被称为“事件循环（Event Loop）”的原因。`



![image-20210729163242840](https://gitee.com/hongjilin/hongs-study-notes/raw/master/%E7%BC%96%E7%A8%8B_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/HTML+CSS+JS%E5%9F%BA%E7%A1%80%E7%AC%94%E8%AE%B0/JavaScript%E7%AC%94%E8%AE%B0/A_JavaScript%E8%BF%9B%E9%98%B6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0%E4%B8%AD%E7%9A%84%E5%9B%BE%E7%89%87/image-20210729163242840.png)



图中的`stack`表示我们所说的执行栈，`web apis`则是代表一些异步事件，而`callback queue`即事件队列。

以上的事件循环过程是一个宏观的表述，实际上因为异步任务之间并不相同，因此他们的执行优先级也有区别。不同的异步任务被分为两类：微任务`micro task`和宏任务`macro task`。



##### 宏任务与微任务

宏任务`macro task`与微任务`micro task`

JS中用来存储待执行回调函数的队列包含2个不同特定的列队

- `宏队列`:用来保存待执行的宏任务(回调),比如:`定时器`回调/ajax回调/dom事件回调
- `微队列`:用来保存待执行的微任务(回调),比如:`Promise`的回调/muntation回调

JS执行时会区别这2个队列:

- JS执行引擎首先必须执行所有的`初始化同步任务`代码
- 每次准备取出第一个`宏任务执行前`,都要将所有的`微任务`一个一个取出来执行

​	在一个事件循环中，异步事件返回结果后会被放到一个任务队列中。然而，根据这个异步事件的类型，这个事件实际上会被对应的宏任务队列或者微任务队列中去。并且在当前执行栈为空的时候，主线程会 查看微任务队列是否有事件存在。如果不存在，那么再去宏任务队列中取出一个事件并把对应的回到加入当前执行栈；如果存在，则会依次执行队列中事件对应的回调，直到微任务队列为空，然后去宏任务队列中取出最前面的一个事件，把对应的回调加入当前执行栈...如此反复，进入循环。

​	*当前执行栈执行完毕时会立刻先处理所有微任务队列中的事件，然后再去宏任务队列中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行*

![Promise系统学习_宏任务微任务原理图](https://gitee.com/hongjilin/hongs-study-notes/raw/master/%E7%BC%96%E7%A8%8B_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/HTML+CSS+JS%E5%9F%BA%E7%A1%80%E7%AC%94%E8%AE%B0/JavaScript%E7%AC%94%E8%AE%B0/A_JavaScript%E8%BF%9B%E9%98%B6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0%E4%B8%AD%E7%9A%84%E5%9B%BE%E7%89%87/Promise%E7%B3%BB%E7%BB%9F%E5%AD%A6%E4%B9%A0_%E5%AE%8F%E4%BB%BB%E5%8A%A1%E5%BE%AE%E4%BB%BB%E5%8A%A1%E5%8E%9F%E7%90%86%E5%9B%BE.png)



```javascript
setTimeout(() => { 
      console.log('timeout callback1（）')//立即放入宏队列
      Promise.resolve(3).then(
        value => { 
          console.log('Promise onResolved3()', value)//当这个宏任务执行后 立马放入微队列,所以这个微任务执行完后下个宏任务才能执行 
        }
      )
    }, 0)

    setTimeout(() => { 
      console.log('timeout callback2（）') //立即放入宏队列,
    }, 0)

    Promise.resolve(1).then(
      value => { 
        console.log('Promise onResolved1()', value)//立即放入微队列
        setTimeout(() => {
          console.log('timeout callback3（）', value) //立即放入宏任务
        }, 0)
      }
    )

    Promise.resolve(2).then(
      value => { 
        console.log('Promise onResolved2()', value)//立即放入微队列
      }
    )
console.log('同步代码') //同步代码立即执行
```

```javascript
 '同步代码',
  'Promise onResolved1()',
  'Promise onResolved2()',
  'timeout callback1（）',
  'Promise onResolved3()',
  'timeout callback2（）',
  'timeout callback3（）'
```

##### node环境下的事件循环机制

[先简单记录，今后补充](https://gitee.com/hongjilin/hongs-study-notes/blob/master/%E7%BC%96%E7%A8%8B_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/HTML+CSS+JS%E5%9F%BA%E7%A1%80%E7%AC%94%E8%AE%B0/JavaScript%E7%AC%94%E8%AE%B0/A_JavaScript%E8%BF%9B%E9%98%B6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.md#%E2%85%B1-%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83%E4%B8%8Bjs%E5%BC%95%E6%93%8E%E7%9A%84%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E6%9C%BA%E5%88%B6)

 **与浏览器环境有何不同?**

> 在node中，事件循环表现出的状态与浏览器中大致相同。不同的是node中有一套自己的模型。node中事件循环的实现是依靠的libuv引擎。我们知道node选择chrome v8引擎作为js解释器，v8引擎将js代码分析后去调用对应的node api，而这些api最后则由libuv引擎驱动，执行对应的任务，并把不同的事件放在不同的队列中等待主线程执行。 `因此实际上node中的事件循环存在于libuv引擎中`。

 **事件循环模型**

> 下面是一个libuv引擎中的事件循环的模型:
>
> ```
> //libuv引擎中的事件循环的模型
>    ┌───────────────────────┐
> ┌─>│        timers         │
> │  └──────────┬────────────┘
> │  ┌──────────┴────────────┐
> │  │     I/O callbacks     │
> │  └──────────┬────────────┘
> │  ┌──────────┴────────────┐
> │  │     idle, prepare     │
> │  └──────────┬────────────┘      ┌───────────────┐
> │  ┌──────────┴────────────┐      │   incoming:   │
> │  │         poll          │<──connections───     │
> │  └──────────┬────────────┘      │   data, etc.  │
> │  ┌──────────┴────────────┐      └───────────────┘
> │  │        check          │
> │  └──────────┬────────────┘
> │  ┌──────────┴────────────┐
> └──┤    close callbacks    │
>    └───────────────────────┘
>    //模型中的每一个方块代表事件循环的一个阶段
> ```

**事件循环各阶段详解**

> 从上面这个模型中，我们可以大致分析出node中的事件循环的顺序：
>
> > 外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->I/O事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段...
>
> 这些阶段大致的功能如下：
>
> - timers(定时器检测阶段): 这个阶段执行定时器队列中的回调如 `setTimeout()` 和 `setInterval()`。
> - I/O callbacks(I/O事件回调阶段): 这个阶段执行几乎所有的回调。但是不包括close事件，定时器和`setImmediate()`的回调。
> - idle, prepare: 这个阶段仅在内部使用，可以不必理会。
> - poll(轮询阶段): 等待新的I/O事件，node在一些特殊情况下会阻塞在这里。
> - check(检查阶段): `setImmediate()`的回调会在这个阶段执行。
> - close callbacks(关闭事件回调阶段): 例如`socket.on('close', ...)`这种close事件的回调。

#### 6.Web Workers

##### 概念

H5规范提供了js分线程的实现, 取名为: Web Workers

相关API

- Worker: 构造函数, 加载分线程执行的js文件
- Worker.prototype.onmessage: 用于接收另一个线程的回调函数
- Worker.prototype.postMessage: 向另一个线程发送消息

不足

- worker内代码不能操作DOM(更新UI)
- 不能跨域加载JS
- 不是每个浏览器都支持这个新特性

##### 使用

**主线程**

1. 创建一个Worker对象
2. 绑定[主线程接收分线程返回的数据]方法
3. 主线程向分线程发送数据,然后等待接受数据
4. 接收到分线程回馈的数据,将数据进行处理(如弹窗)

```html
<body>
<input type="text" placeholder="数值" id="number">
<button id="btn">计算</button>
<script type="text/javascript">
 var input = document.getElementById('number')
 document.getElementById('btn').onclick = function () {
   var number = input.value

   //创建一个Worker对象
   var worker = new Worker('worker.js')
   // 绑定接收消息的监听
   worker.onmessage = function (event) { //此处变成回调代码,会在初始化工作完成后才会进行
     console.log('主线程接收分线程返回的数据: '+event.data)
     alert(event.data)
   }

   // 向分线程发送消息
   worker.postMessage(number)
   console.log('主线程向分线程发送数据: '+number)
 }
 // console.log(this) // window

</script>
</body>
```

**分线程**

将计算放置分线程中

`注意`:alert(result) alert是window的方法, 在分线程不能调用,`分线程中的全局对象不再是window`, 所以在分线程中不可能更新界面

```JavaScript
//worker.js
function fibonacci(n) {
 return n<=2 ? 1 : fibonacci(n-1) + fibonacci(n-2)  //递归调用
}

console.log(this)
this.onmessage = function (event) {
 var number = event.data
 console.log('分线程接收到主线程发送的数据: '+number)
 //计算
 var result = fibonacci(number)
 postMessage(result)
 console.log('分线程向主线程返回数据: '+result)
 // alert(result)  alert是window的方法, 在分线程不能调用
 // 分线程中的全局对象不再是window, 所以在分线程中不可能更新界面
}
```

##### 流程原理

![image-20210729173545339](https://gitee.com/hongjilin/hongs-study-notes/raw/master/%E7%BC%96%E7%A8%8B_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/HTML+CSS+JS%E5%9F%BA%E7%A1%80%E7%AC%94%E8%AE%B0/JavaScript%E7%AC%94%E8%AE%B0/A_JavaScript%E8%BF%9B%E9%98%B6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0%E4%B8%AD%E7%9A%84%E5%9B%BE%E7%89%87/image-20210729173545339.png)

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
<script>
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
</script>

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
