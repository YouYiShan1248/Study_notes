# Ajax学习笔记

## 一、Ajax简介

> AJAX 简介 AJAX 全称为 Asynchronous JavaScript And XML，就是异步的 JS 和 XML。
>
> 通过 AJAX 可以在浏览器中向服务器发送异步请求，最大的优势：`无刷新获取数据`。
>
> AJAX 不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式。

### 1、XML简介

> 1. XML 可扩展标记语言。
> 2. XML 被设计用来传输和存储数据。
> 3. XML 和 HTML 类似，不同的是 HTML 中都是预定义标签，而 XML 中没有预定义标签， 全都是自定义标签，用来表示一些数据。

> 比如说我有一个学生数据： name = "孙悟空" ; age = 18 ; gender = "男" ;

```
用 XML 表示：
<student>
<name>孙悟空</name>
<age>18</age>
<gender>男</gender>
</student>
```

现在已经被 JSON 取代了。

```
{"name":"孙悟空","age":18,"gender":"男"}
```

###  2、Ajax的特点

**AJAX 的优点**

> 1. 可以无需刷新页面而与服务器端进行通信。
> 2. 允许你根据用户事件来更新部分页面内容。

**Ajax的缺点**

> 1. 没有浏览历史，不能回退
> 2. 存在跨域问题(同源)
> 3. SEO 不友好

### 3、HTTP简介

> HTTP（hypertext transport protocol）协议『超文本传输协议』，协议详细规定了浏览器和万维网服务器之间互相通信的规则、约定,、规则

**请求报文**

```
行   POST /s?ie=utf-8 HTTP/1.1 

头   Host: atguigu.com
​    Cookie: name=guigu
​    Content-type: application/x-www-form-urlencoded
​    User-Agent: chrome 83
空行
体   username=admin&password=admin
```

**响应报文**

```
行   HTTP/1.1 200 OK

头   Content-Type: text/html;charset=utf-8
​    Content-length: 2048
​    Content-encoding: gzip
空行  
体   <html>
​      <head>
​      </head>
​      <body>
​        <h1>尚硅谷</h1>
​      </body>
​    </html>
```

## 二、原生Ajax

1、XMLHttpRequest，AJAX 的所有操作都是通过该对象进行的。

2、当你前端想设置自定义的请求头时,需要如此后端设置响应头

```
//表示接收任意类型的请求							
app.all('/server', (request, response) => { //响应头 允许跨域     运行自定义响应头
    response.setHeader('Access-Control-Allow-Origin', '*'); response.setHeader('Access-Control-Allow-Headers', '*');}
```

3、ajax请求状态:`xhr.readyState 0`：请求未初始化，还没有调用 `open()`。

-  请求已经建立，但是还没有发送，还没有调用 `send()`。
-  请求已发送，正在处理中（通常现在可以从响应中获取内容头）。
-  请求在处理中；通常响应中已有部分数据可用了，没有全部完成。
-  响应已完成；您可以获取并使用服务器的响应了

