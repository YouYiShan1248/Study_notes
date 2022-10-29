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

