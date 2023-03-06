# express

> 所有测试代码在gitee上
> 地址：https://gitee.com/gaohan888/node-js-learning/tree/master/express
## 初识Express

### Express 简介

**什么是 Express**

官方给出的概念：Express 是基于 Node.js 平台，快速、开放、极简的 Web 开发框架。 

通俗的理解：Express 的作用和 Node.js 内置的 http 模块类似，是专门用来创建 Web 服务器的。 

Express 的本质：就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法。 

Express 的中文官网： http://www.expressjs.com.cn/



**进一步理解 Express**



思考：不使用 Express 能否创建 Web 服务器？ 

答案：能，使用 Node.js 提供的原生 http 模块即可。 

思考：既生瑜何生亮（有了 http 内置模块，为什么还有用 Express）？ 

答案：http 内置模块用起来很复杂，开发效率低；Express 是基于内置的 http 模块进一步封装出来的，能够极大的提高开发效率。 

思考：http 内置模块与 Express 是什么关系？ 

答案：类似于浏览器中 Web API 和 jQuery 的关系。后者是基于前者进一步封装出来的。







 **Express 能做什么**

对于前端程序员来说，最常见的两种服务器，分别是： 

* Web 网站服务器：专门对外提供 Web 网页资源的服务器。 
* API 接口服务器：专门对外提供 API 接口的服务器。 使用 Express，我们可以方便、快速的创建 Web 网站的服务器或 API 接口的服务器。





### Express 的基本使用

**安装**

在项目所处的目录中，运行如下的终端命令，即可将 express 安装到项目中使用：

```js
npm i express@4.17.1
```



**创建基本的 Web 服务器**

```js
// 1. 导入 express
const express = require('express')

// 创建 web 服务器
const app = express()

// 调用 app.listen(端口号，启动成功得回调函数),启动服务器
app.listen(8080, () => {
    console.log('express server running at http://127.0.0.1');
})
```





**监听 GET 请求**

通过 app.get() 方法，可以监听客户端的 GET 请求，具体的语法格式如下：

```js
// 参数1：客户端请求的url 地址
// 参数2：请求对应的处理函数
// req: 请求对象 (包含了与请求相关的属性与方法)
// res: 响应对象 (包含了响应相关的属性和方法)
app.get('请求URL', function (req, res) { /* 处理函数 */})
```



**监听 POST 请求**

通过 app.post() 方法，可以监听客户端的 POST 请求，具体的语法格式如下：

```js
app.post('请求URL', function(req, res) { /* 处理函数 */})
```



**把内容响应给客户端**

通过 res.send() 方法，可以把处理好的内容，发送给客户端：

```js
app.get('/user', (req, res) => {
    res.send({ name: 'zs', age: 20, gender: '男'})
})

app.post('/user', (req, res) => {
    res.send('请求成功')
})
```





**获取 URL 中携带的查询参数**

通过 req.query 对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数：

```js
app.get('/', (req, res) => {
    // req.query 默认是一个空对象
    // 客户端使用 ?name=zs&age=20 这种查询字符串的形式，发送到服务器的参数。
    // 可以通过 req.query 对象访问到，例如：
    // req.query.name req.query.age
    console.log(req.query);
})
```



**获取 URL 中的动态参数**

通过 req.params 对象，可以访问到 URL 中，通过 : 匹配到的动态参数：

```js
// URL 地址中，可以通过：参数名的形式，匹配动态参数值
app.get('/user/:id', (req, res) => {
    // req.params 默认是一个空对象
    // 里面存放着通过：动态匹配的参数值
    console.log(req.params);
})
```



### 托管静态资源

**express.static()**

express 提供了一个非常好用的函数，叫做 express.static()，通过它，我们可以非常方便地创建一个静态资源服务器。

例如，通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：

```js
app.use(express.static('clock'))
```

现在，你就可以访问 public 目录中的所有文件了： 

http://localhost:8080/index.csss 

http://localhost:8080/index.html

http://localhost:8080/index.js

示例代码：

```js
const express = require('express')

const app = express()

app.use(express.static('clock'))

app.listen(8080, () => {
    console.log('server is running');
})
```

> 注意：Express 在指定的静态目录中查找文件，并对外提供资源的访问路径。 因此，存放静态文件的目录名不会出现在 URL 中。



**托管多个静态资源目录**

如果要托管多个静态资源目录，请多次调用 express.static() 函数：

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

访问静态资源文件时，express.static() 函数会根据目录的添加顺序查找所需的文件。



**挂载路径前缀**

如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式：

```js
app.use('/public', express.static('public'))
```

现在，你就可以通过带有 /public 前缀地址来访问 public 目录中的文件了： http://localhost:8080/public/images/kitten.jpg 

http://localhost:8080/public/css/style.css 

http://localhost:8080/public/js/app.js





### nodemon

**为什么要使用 nodemon**

在编写调试 Node.js 项目的时候，如果修改了项目的代码，则需要频繁的手动 close 掉，然后再重新启动，非常繁琐。 

现在，我们可以使用 nodemon（https://www.npmjs.com/package/nodemon） 这个工具，它能够监听项目文件 的变动，当代码被修改后，nodemon 会自动帮我们重启项目，极大方便了开发和调试

**安装 nodemon**

在终端中，运行如下命令，即可将 nodemon 安装为全局可用的工具：

```js
npm install -g nodemon	
```



**使用 nodemon**

当基于 Node.js 编写了一个网站应用的时候，传统的方式，是运行 node app.js 命令，来启动项目。这样做的坏处是： 代码被修改之后，需要手动重启项目。

现在，我们可以将 node 命令替换为 nodemon 命令，使用 nodemon app.js 来启动项目。

这样做的好处是：代码 被修改之后，会被 nodemon 监听到，从而实现自动重启项目的效果。

```js
node app.js
nodemon app.js
```





## Express 路由



### 路由的概念

在 Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系。 

Express 中的路由分 3 部分组成，分别是请求的类型、请求的 URL 地址、处理函数，格式如下：

```js
app.METHOD(PATH, HANDLER)
```



**Express 中的路由的例子**

```js
// 匹配 GET 请求，且请求 URL 为 /
app.get('/', function (req, res) {
    res.send('hello world!')
})

// 匹配 POST 请求，且请求 URL 为 /
app.post('/', function (req, res) {
    res.send('got a post request')
})
```



**路由的匹配过程**

每当一个请求到达服务器之后，需要先经过路由的匹配，只有匹配成功之后，才会调用对应的处理函数。 

在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的 URL 同时匹配成功，则 Express 会将这次请求，转 交给对应的 function 函数进行处理。

![在这里插入图片描述](https://img-blog.csdnimg.cn/68bc5822401a42e1b2ee8e6eb23f544f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)


> 路由匹配的注意点： 
>
> ① 按照定义的先后顺序进行匹配 
>
> ② 请求类型和请求的URL同时匹配成功， 才会调用对应的处理函数



### 路由的使用



**最简单的用法**

在 Express 中使用路由最简单的方式，就是把路由挂载到 app 上，示例代码如下:

```js
const express = require('express')

const app = express()

// 挂在路由
app.get('/', function (req, res) {
    res.send('hello world!')
})

app.post('/', function (req, res) {
    res.send('got a post request')
})

// 启动web服务器
app.listen(8080, () => {
    console.log('server is running');
})
```



**模块化路由**

为了方便对路由进行模块化的管理，Express 不建议将路由直接挂载到 app 上，而是推荐将路由抽离为单独的模块。 将路由抽离为单独模块的步骤如下： 

① 创建路由模块对应的 .js 文件 

② 调用 express.Router() 函数创建路由对象 

③ 向路由对象上挂载具体的路由 

④ 使用 module.exports 向外共享路由对象 

⑤ 使用 app.use() 函数注册路由模块



**创建路由模块**

```js
const express = require('express')
// 创建路由对象
const router = express.Router()

// 挂载获取用户列表的路由
router.get('/user/list', function (req, res) {
    res.send('get user list')
})
router.post('/user/add', function (req, res) {
    res.send('Add new user')
})

// 向外导出路由对象
module.exports = router
```





**注册路由模块**

```js
const express = require('express')

const app = express()
// 使用app.use() 注册路由模块
const userRouter = require('./router')

// 使用 app.use() 注册路由模块
app.use(userRouter)

// 启动web服务器
app.listen(8080, () => {
    console.log('server is running');
})
```



**为路由模块添加前缀**

类似于托管静态资源时，为静态资源统一挂载访问前缀一样，路由模块添加前缀的方式也非常简单：

```js
// 导入路由模块
const userRouter = require('./router.js')

// 使用 app.use() 注册路由模块，并添加统一的访问前缀
```



## Express中间件

### 中间件的概念

中间件（Middleware ），特指业务流程的中间处理环节。



**现实生活中的例子**

在处理污水的时候，一般都要经过三个处理环节，从而保证处理过后的废水，达到排放标准。

![在这里插入图片描述](https://img-blog.csdnimg.cn/ead66e7324bd4d02ab30c4e1606d3533.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)


处理污水的这三个中间处理环节，就可以叫做中间件。



**Express 中间件的调用流程**

当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理。

![在这里插入图片描述](https://img-blog.csdnimg.cn/b2b9c74839ed427c911d097e2f7e5f3e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)






**Express 中间件的格式**

Express 的中间件，本质上就是一个 function 处理函数，Express 中间件的格式如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/8438a124551c4642a34b9457de0a9382.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)


> 注意：中间件函数的形参列表中，必须包含 next 参数。而路由处理函数中只包含 req 和 res。





**next 函数的作用**

next 函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由。

![在这里插入图片描述](https://img-blog.csdnimg.cn/d5e8cb35747a4c1ba24d7f013b80b1fb.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)



### Express中间件的demo

**定义中间件函数**

可以通过如下的方式，定义一个最简单的中间件函数：

```js
// 常量 mw 所指向的，就是一个中间件函数
const mw = function (req, res, next) {
    console.log('这是一个简单的中间件函数');
    // 注意：在当前中间件的业务处理完毕后，必须调用 next() 函数
    // 表示把流转关系转交给下一个中间件或路由
    next()
}
```





**全局生效的中间件**

客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件。 

通过调用 app.use(中间件函数)，即可定义一个全局生效的中间件，示例代码如下：

```js
const express = require('express')
const userRouter = require('./router')
const app = express()
// 常量 mw 所指向的，就是一个中间件函数
const mw = function (req, res, next) {
    console.log('这是一个简单的中间件函数');
    // 注意：在当前中间件的业务处理完毕后，必须调用 next() 函数
    // 表示把流转关系转交给下一个中间件或路由
    next()
}

// 全局生效的中间件
// 注意：注册中间件在路由前注册
app.use(mw)

// 使用 app.use() 注册路由模块
app.use(userRouter)

app.listen(8080, () => {
    console.log('server is running');
})
```



**定义全局中间件的简化形式**

```js
const express = require('express')
const userRouter = require('./router')
const app = express()

// 全局生效的中间件
// 注意：注册中间件在路由前注册
app.use(function (req, res, next) {
    console.log('这是一个简单的中间件函数');
    // 注意：在当前中间件的业务处理完毕后，必须调用 next() 函数
    // 表示把流转关系转交给下一个中间件或路由
    next()
})

// 使用 app.use() 注册路由模块
app.use(userRouter)

app.listen(8080, () => {
    console.log('server is running');
})
```





**中间件的作用**

多个中间件之间，共享同一份 req 和 res。基于这样的特性，我们可以在上游的中间件中，统一为 req 或 res 对象添 加自定义的属性或方法，供下游的中间件或路由进行使用。

![在这里插入图片描述](https://img-blog.csdnimg.cn/0ab663ae962449f0b50fd984764a91d7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)






**定义多个全局中间件**

可以使用 app.use() 连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行 调用，示例代码如下：

```js
app.use(function (req, res, next) {
    console.log('调用了第一个全局中间件');
    // 注意：在当前中间件的业务处理完毕后，必须调用 next() 函数
    // 表示把流转关系转交给下一个中间件或路由
    next()
})

app.use(function (req, res, next) {
    console.log('调用了第二个全局中间件');
    // 注意：在当前中间件的业务处理完毕后，必须调用 next() 函数
    // 表示把流转关系转交给下一个中间件或路由
    next()
})
```



**局部生效的中间件**

不使用 app.use() 定义的中间件，叫做局部生效的中间件，示例代码如下：

```js
// 定义中间件函数 mw1
const mw1 = function (req, res, next) {
	console.log('这是中间件函数')
	next()
}

// mw1 这个中间件只在当前路由中生效， 这种用法属于"局部生效的中间件"
app.get('/', mw1, function (req, res) {
    res.send('home page.')
})

// mw1 这个中间件不会影响下面这个路由
app.get('/user', function (req, res) {
    res.send('User page.')
})
```







**定义多个局部中间件**

可以在路由中，通过如下两种等价的方式，使用多个局部中间件：

```js
// 以下两种写法是完全等价的，可根据自己的喜好，选择任意一种方法进行使用
app.get('/', mw1, mw2, (req, res) => { res.send('Home page') })
app.get('/', [mw1, mw2], (req, res) => { res.send('Home page') })
```





**了解中间件的5个使用注意事项**

① 一定要在路由之前注册中间件 

② 客户端发送过来的请求，可以连续调用多个中间件进行处理 

③ 执行完中间件的业务代码之后，不要忘记调用 next() 函数 

④ 为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码 

⑤ 连续调用多个中间件时，多个中间件之间，共享 req 和 res 对象





### 中间件的分类

为了方便大家理解和记忆中间件的使用，Express 官方把常见的中间件用法，分成了 5 大类，分别是：

① 应用级别的中间件 

② 路由级别的中间件 

③ 错误级别的中间件 

④ Express 内置的中间件 

⑤ 第三方的中间件





**应用级别的中间件**

通过 app.use() 或 app.get() 或 app.post() ，绑定到 app 实例上的中间件，叫做应用级别的中间件，代码示例如下：

```js
// 应用级别的中间件 (全局中间件)
app.use((req, res, next) => {
	next()
})

// 应用级别的中间件 (局部中间件)
app.get('/', mw1, (req, res) => {
    res.send('Home page')
})
```



**路由级别的中间件**

绑定到 express.Router() 实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。

只不 过，应用级别中间件是绑定到 app 实例上，路由级别中间件绑定到 router 实例上，代码示例如下：

```js
const app = express()
const router = express.Router()

// 路由级别的中间件
router.use(function (req, res, next) {
	console.log('Time', Date.now())
	next()
})

// 注册路由
app.use('/', router)
```





**错误级别的中间件**

错误级别中间件的作用：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。

格式：错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后，分别是 (err, req, res, next)。

```js
app.get('/', function (req, res) {
	throw new Error('服务器内部发生了错误!')	// 抛出一个自定义的错误
	res.send('Home Page.')
})

app.use(function (err, req, res, next) { // 错误级别的中间件
    console.log('发生了错误' + err.message) // 在服务器打印错误消息
    res.send('Error' + err.message)	// 向客户端响应错误相关的内容
})
```

> 注意：错误级别的中间件， 必须注册在所有路由之后！







**Express内置的中间件**

自 Express 4.16.0 版本开始，Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验： 

① express.static 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性） 

② express.json 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用） 

③ express.urlencoded 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

```js
// 配置解析 application/json 格式数据的内置中间件
app.use(express.json())
// 配置解析 application/x-www-form-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({ extended: false}))
```

完整实例代码：

```js
const express = require('express')

const app = express()

// 配置json格式中间件
app.use(express.json())
// 配置 x-www-form-urlencoded 格式的内置中间件
app.use(express.urlencoded({ extended: false }))

// 挂在路由
app.get('/list', function (req, res) {
    // res.send(req.query)
    res.send(req.body)
})

app.post('/add', function (req, res) {
    // res.send('got a post request')
    res.send(req.body)
})

// 启动web服务器
app.listen(8080, () => {
    console.log('server is running');
})
```



**第三方的中间件**

非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置 第三方中间件，从而提高项目的开发效率。 

例如：在 express@4.16.0 之前的版本中，经常使用 body-parser 这个第三方中间件，来解析请求体数据。使用步 骤如下：

① 运行 npm install body-parser 安装中间件 

② 使用 require 导入中间件 

③ 调用 app.use() 注册并使用中间件

> 注意：Express 内置的 express.urlencoded 中间件，就是基于 body-parser 这个第三方中间件进一步封装出来的。





### 自定义中间件

**需求描述与实现步骤**

自己手动模拟一个类似于 express.urlencoded 这样的中间件，来解析 POST 提交到服务器的表单数据。 实现步骤： 

① 定义中间件 

② 监听 req 的 data 事件 

③ 监听 req 的 end 事件 

④ 使用 querystring 模块解析请求体数据 

⑤ 将解析出来的数据对象挂载为 req.body 

⑥ 将自定义中间件封装为模块





**定义中间件**

使用 app.use() 来定义全局生效的中间件，代码如下：

```js
app.use(function (req, res, next) {
	// 中间件的业务逻辑
})
```





**监听 req 的 data 事件**

在中间件中，需要监听 req 对象的 data 事件，来获取客户端发送到服务器的数据。 

如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器。所以 data 事件可能会触 发多次，每一次触发 data 事件时，获取到数据只是完整数据的一部分，需要手动对接收到的数据进行拼接。

```js
// 定义变量，用来存储客户端发送来的请求体数据
let str = ''
// 监听 req 对象的 data 事件(客户端发送过来的新的请求体数据)
req.on('data', (chunk) => {
	// 拼接请求体数据，隐式转换为字符串
	str += chunk
})
```





**监听 req 的 end 事件**

当请求体数据接收完毕之后，会自动触发 req 的 end 事件。 

因此，我们可以在 req 的 end 事件中，拿到并处理完整的请求体数据。示例代码如下：

```js
// 监听 req 对象的 end 事件（请求体发送完毕自动触发）
req.on('end', () => {
	// 打印完整的请求体数据
	console.log(str)
	// TODO: 把字符串的请求体数据，解析成对象格式
})
```





**使用 querystring 模块解析请求体数据**

Node.js 内置了一个 querystring 模块，专门用来处理查询字符串。通过这个模块提供的 parse() 函数，可以轻松把 查询字符串，解析成对象的格式。示例代码如下：

```js
// 导入处理 querystring 的 Node.js 内置模块
const qs = require('querystring')

// 调用 qs.parse() 方法， 把查询字符串解析为对象
const body = qs.parse(str)
```





**将解析出来的数据对象挂载为 req.body**

上游的中间件和下游的中间件及路由之间，共享同一份 req 和 res。因此，我们可以将解析出来的数据，挂载为 req  的自定义属性，命名为 req.body，供下游使用。示例代码如下：

```js
req.on('end', () =. {
	const body = qs.parse(str) // 调用 qs.parse() 方法，把查询字符串解析为对象
	req.body = body  // 将解析出来的请求体对象，挂载为 req.body 属性
	next()  // 最后，一定要调用 next() 函数，执行后续的业务逻辑
})
```





**将自定义中间件封装为模块**

为了优化代码的结构，我们可以把自定义的中间件函数，封装为独立的模块，示例代码如下：

```js
// 自定义中间件.js 模块中的代码
const qs = require('querystring')
function bodyParser(req, res, next) {
	/* 省略其他代码 */
}
module.exports = bodyParser // 向外导出解析请求体数据的中间件函数

// ----------------------------分割线-------------------------------

// 1. 导入自定义的中间件模块
const bodyParser = require('./自定义中间件')
// 2. 注册自定义的中间件模块
app.use(bodyParser)
```





**完整代码**

自定义中间件.js

```js
// 自定义中间件.js 模块中的代码
const qs = require('querystring')
function bodyParser(req, res, next) {
    // 定义变量，用来存储客户端发送来的请求体数据
    let str = ''
    // 监听 req 对象的 data 事件(客户端发送过来的新的请求体数据)
    req.on('data', (chunk) => {
        // 拼接请求体数据，隐式转换为字符串
        str += chunk
    })
    // 监听 req 对象的 end 事件（请求体发送完毕自动触发）
    req.on('end', () => {
        // 打印完整的请求体数据
        console.log(str)
        const body = qs.parse(str) // 调用 qs.parse() 方法，把查询字符串解析为对象
        req.body = body  // 将解析出来的请求体对象，挂载为 req.body 属性
        next()  // 最后，一定要调用 next() 函数，执行后续的业务逻辑
    })
}
module.exports = bodyParser // 向外导出解析请求体数据的中间件函数
```



自定义中间件的使用.js

```js
const express = require('express')
const app = express()
const bodyParser = require('./自定义中间件')

app.use(bodyParser)

app.get('/', (req, res) => {
    console.log('自定义中间件的测试');
    res.send(req.body)
})

app.listen(8080, () => {
    console.log('server is running');
})
```





## 使用Express 写接口

### 创建基本的服务器

```js
const express = require('express')
const app = express()


app.listen(8080, () => {
    console.log('Express server running at http://127.0.0.1');
})
```



### 创建API路由模块

```js
const express = require('express')
const router = express.Router()


// bind your router here ...

module.exports = router
```





### 编写GET接口

```js
router.get('/get', (req, res) => {
    // 获取客户端通过查询字符串，发送到服务器的数据
    const query = req.query
    // 调用 res.send() 方法，把数据响应给客户端
    res.send({
        status: 200, // 状态 200 表示成功过
        msg: 'GET请求成功',
        data: query
    })
})
```





### 编写POST接口

```js
router.post('/post', (req, res) => {
    // 获取客户端通过请求体，发送到服务器的URL-encoded数据
    const body = req.body
    // 调用 res.send() 方法，把数据响应给客户端
    res.send({
        status: 200, // 状态 200 表示成功过
        msg: 'GET请求成功',
        data: body
    })
})
```

> 注意：如果要获取 URL-encoded 格式的请求体数据，必须配置中间件 app.use(express.urlencoded({ extended: false }))





### CORS 跨域资源共享

**接口的跨域问题**

刚才编写的 GET 和 POST接口，存在一个很严重的问题：不支持跨域请求。 解决接口跨域问题的方案主要有两种：

① CORS（主流的解决方案，推荐使用） 

② JSONP（有缺陷的解决方案：只支持 GET 请求）



**使用 cors 中间件解决跨域问题**

cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题。 使用步骤分为如下 3 步：

① 运行 npm install cors 安装中间件 

② 使用 const cors = require('cors') 导入中间件 

③ 在路由之前调用 app.use(cors()) 配置中间件





**什么是 CORS**

CORS （Cross-Origin Resource Sharing，跨域资源共享）由一系列 HTTP 响应头组成，这些 HTTP 响应头决定 浏览器是否阻止前端 JS 代码跨域获取资源。

浏览器的同源安全策略默认会阻止网页“跨域”获取资源。但如果接口服务器配置了 CORS 相关的 HTTP 响应头， 就可以解除浏览器端的跨域访问限制。

![在这里插入图片描述](https://img-blog.csdnimg.cn/d670573fd7e2480db60e2ec7673e30c3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)



**CORS 的注意事项**

① CORS 主要在服务器端进行配置。客户端浏览器无须做任何额外的配置，即可请求开启了 CORS 的接口。 

② CORS 在浏览器中有兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服 务端接口（例如：IE10+、Chrome4+、FireFox3.5+）。





**CORS 响应头部 - Access-Control-Allow-Origin**

响应头部中可以携带一个 Access-Control-Allow-Origin 字段，其语法如下:

```http
Access-Control-Allow-Origin: <origin> | *
```

其中，origin 参数的值指定了允许访问该资源的外域 URL。

例如，下面的字段值将只允许来自 http://itcast.cn 的请求：

```js
res.setHeader('Access-Control-Allow-Origin', 'http://itcast.cn')
```

如果指定了 Access-Control-Allow-Origin 字段的值为通配符 *，表示允许来自任何域的请求，示例代码如下：

```js
res.setHeader('Access-Control-Allow-Origin', '*')
```





**CORS 响应头部 - Access-Control-Allow-Headers**

默认情况下，CORS 仅支持客户端向服务器发送如下的 9 个请求头：

Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、 Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）

如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外 的请求头进行声明，否则这次请求会失败！

```js
// 允许客户端额外向服务器发送 Content-Type 请求头和 X-Custom-Header 请求头
// 注意：多个请求体之间使用英文的逗号进行分割
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header')
```





**CORS 响应头部 - Access-Control-Allow-Methods**

默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。 

如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 Access-Control-Alow-Methods 来指明实际请求所允许使用的 HTTP 方法。

示例代码如下：

```JS
// 只允许 POST, GET, DELETE, HEAD 请求方法
res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, HEAD')
// 允许所有的HTTP请求方法
res.setHeader('Access-Control-Allow-Methods', '*')
```





**CORS请求的分类**

客户端在请求 CORS 接口时，根据请求方式和请求头的不同，可以将 CORS 的请求分为两大类，分别是： 

① 简单请求 

② 预检请求



**简单请求**

同时满足以下两大条件的请求，就属于简单请求：

① 请求方式：GET、POST、HEAD 三者之一 

② HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、 Downlink、Save-Data、Viewport-Width、Width 、Content-Type（只有三个值application/x-www-form-urlencoded、multipart/form-data、text/plain）



**预检请求**

只要符合以下任何一个条件的请求，都需要进行预检请求： 

① 请求方式为 GET、POST、HEAD 之外的请求 Method 类型 

② 请求头中包含自定义头部字段 

③ 向服务器发送了 application/json 格式的数据



在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求，所以这一 次的 OPTION 请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据。





**简单请求和预检请求的区别**

简单请求的特点：客户端与服务器之间只会发生一次请求。 

预检请求的特点：客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求。
