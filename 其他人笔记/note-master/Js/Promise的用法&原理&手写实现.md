﻿# Promise的用法&原理&手写实现

## 1. promise 入门简介

Promise 是用来解决异步编程的问题。

### 1.1 JS 中分同步Api 和 异步Api。

同步API：只有当前API执行完成后，才能继续执行下一个API

```js
for (let i = 0; i < 10000; i++) {
    console.log(i);
}
console.log('同步代码执行');
```

> 只有上面一万行数值打印完，才会打印’同步代码执行’

异步API：当前API的执行不会阻塞后续代码的执行

```js
console.log('before');
setTimeout(
   () => { console.log('last');
}, 2000);
console.log('after');
```

setTimeout定时器要在2s秒后才执行，js引擎不会卡在定时器这，会先执行同步代码，等同步代码执行完再执行异步代码定时器(在这只需要先记住定时器是异步代码)

### 1.2 同步API, 异步API的区别（ 获取返回值 ）

同步API可以从返回值中拿到API执行的结果, 但是异步API是不可以的

**同步：**

```js
// 同步
function sum (n1, n2) { 
	return n1 + n2;
} 
const result = sum(10, 20); // result 值为 30
```

**异步：**

```js
function getMsg () { 
	setTimeout(function () { 
		return { msg: 'Hello Node.js' }
	}, 2000);
}
const msg = getMsg(); // msg 的值是 undefined
```

> 所以异步函数没法用返回值获取值



### 1.3 回调函数

自己定义函数让别人去调用。

使用回调函数可以获取异步API执行结果

```js
function getMsg (callback) {
    setTimeout(() => {
        let a = '异步函数结果'
        callback(a)
    }, 2000)
}

getMsg((result) => {
    console.log(result); // 异步函数结果
})
```



### 1.4代码执行顺序分析

```js
console.log('代码开始执行');
setTimeout(() => {
	console.log('2秒后执行的代码');
}, 2000);
setTimeout(() => {
	console.log('0秒后执行的代码');
}, 0)
console.log('代码结束执行')
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/7d47cf1c17b14613a4bb8daf40469766.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)

> 异步代码执行区的异步函数执行完成，将要执行专属的回调函数时，就会将回调函数放入回调函数队列，等同步代码执行区的代码执行完成后，就把回调函数队列的回调函数加入同步代码执行区。



### 1.5 JS 常见异步编程

* fs 文件操作
* 数据库操作
* AJAX 网络请求
* 定时器 （setTimeout）



### 1.6 Promise 出现的需求

我们先来个场景：

现在需要用 fs 文件操作 读取文件，但读取文件的顺序必须是先读A，再读B，再读C。

因为 fs 文件操作是异步的，没办法写成同步代码那样，按顺序如下

> 假设 fs 文件操作 是 同步的

```js
const fs = require('fs')

fs.readFile('a.txt');
fs.readFile('b.txt');
fs.readFile('c.txt');
```

> 但 fs文件操作 是异步编程， 要按照顺序读取的话就不能写成同步代码的形式，只能这样写：

```js
const fs = require('fs')

fs.readFile('a.txt', (err, data) => {
    console.log('第一个执行', data);
    fs.readFile('b.txt', (err, data) => {
        console.log('第二个执行', data);
        fs.readFile('c.txt', (err, data) => {
            console.log(data);
        })
    })
})
```

> 连续嵌套着的回调函数可读性非常差，也称为回调地狱



**Promise出现的目的是解决Node.js异步编程中回调地狱的问题。**

先来一个Promise 案例，有个感性的认识

```js
// resolve 解决
// reject 拒绝
// promise 的执行流程如下：
// promise 接收的参数是一个回调函数，回调函数有两个参数，resolve和 reject，在这个回调函数内部包裹一个异步操作，这个异步操作成功就调用resolve函数，失败就调用 reject
// promise 可以进行链式调用，promise.then() 是对象成功的回调， promise.catch() 是对象失败的回调
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (true) {
            resolve({name: 'aaaaa'}) // 将 promise 对象的状态设置为 成功
        } else {
            reject('失败了') // 将 promise 对象的状态设置为 失败
        }
    }, 2000);
});

promise.then(result => {
    console.log(result);
}).catch( err => {
    console.log(err);
})
```



> 先展示 promise 解决回调地狱的问题，后面会详细介绍promise。

**Promise解决 按顺序读取A文件，B文件，C文件 的回调地狱问题**：

> 先有个感性的认识

```js
const fs = require('fs')

let p1 = new Promise((resolve, reject) => {
    fs.readFile('a.txt', 'utf-8', (err, data) => {
        resolve(data)
    })
})

let p2 = new Promise((resolve, reject) => {
    fs.readFile('b.txt', 'utf-8', (err, data) => {
        resolve(data)
    })
})

let p3 = new Promise((resolve, reject) => {
    fs.readFile('c.txt', 'utf-8', (err, data) => {
        resolve(data)
    })
})

p1.then(r1 => {
    console.log(r1);
    return p2;
}).then(r2 => {
    console.log(r2);
    return p3;
}).then(r3 => {
    console.log(r3);
})
```





## 2. Promise 常见常见练习，对Promise 有更好的熟悉感

### 2.1 promise 实践练习-fs读取文件

```js
// 不使用 promise
const fs = require('fs');

fs.readFile('./test.txt', (err, data) => {
    // 出错，抛出错误
    if (err) throw err;
    console.log(data.toString());
})

// 使用 Promise 包裹
let promise = new Promise((resolve, reject) => {
    fs.readFile('./test.txt', (err, data) => {
        if (err) reject(err);
        resolve(data.toString());
    })
})

// 调用 promise 封装的异步函数
promise.then(result => {
    console.log(result);
})
```



### 2.2 promise 实践练习-AJAX请求

```js
// 原生
const btn = document.querySelector('#btn');
btn.addEventListener("click", () => {
    // 创建对象
    const xhr = new XMLHttpRequest();
    // 初始化
    xhr.open('GET', 'https://api.apiopen.top/getJoke');
    // 发送
    xhr.send();
    // 处理响应结果
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // 判断响应状态码
            if (xhr.status >= 200 && xhr.status < 300) {
                // 控制台输出响应体
                console.log(xhr.response);
            } else {
                // 控制台输出状态码
                console.log(xhr.status);
            }
        }
    }
})

// promise 封装
btn.addEventListener("click", () => {
    // 创建 Promise
    const promise = new Promise((resolve, reject) => {
        // 创建对象
        const xhr = new XMLHttpRequest();
        // 初始化
        xhr.open('GET', 'https://api.apiopen.top/getJoke');
        // 发送
        xhr.send();
        // 处理响应结果
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                // 判断响应状态码
                if (xhr.status >= 200 && xhr.status < 300) {
                    // 控制台输出响应体
                    resolve(xhr.response);
                } else {
                    // 控制台输出状态码
                    reject(xhr.status);
                }
            }
        }
    })

    promise.then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })
})
```



### 2.3 util.promisify 方法进行 promise 风格转化

> 这个是用在node.js 的环境下，我在用node.js 写后端时用到过这种方法

```js
const util = require('util');

const fs = require('fs');
// 返回一个新的函数
// 这个函数的返回结果是promise 对象
let mineReadFile = util.promisify(fs.readFile);

mineReadFile('./test.txt').then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
})
```



### 2.4 promise 封装练习-AJAX请求

```js
/** 
         * 封装一个函数 sendAJAX 发送 GET AJAX 请求
         * 参数 URL
         * 返回结果 Promise 对象
         **/

function sendAJAX(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        // 处理结果
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.status)
                }
            }
        }
    })
}

sendAJAX('https://api.apiopen.top/getJoke').then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
})
```



## 3. promise 的详细介绍

在了解 promise 的基本流程前，先要知道 promise的一些基本属性

### 3.1 promise 的状态

promise 的状态时 promise实例对象中的一个属性   **[PromiseState]**   

* pending 进行中
* resolved / fulfilled 成功
* rejected 失败

> 状态只能由 `Pending` 变为 `Fulfilled` 或由 `Pending` 变为 `Rejected` ，且状态改变之后不会在发生变化，会一直保持这个状态。



### 3.2. promise 对象的值

实例对象中的另一个属性   **[PromiseResult]**

保存着异步任务 [成功/失败] 的结果

* resolve
* reject





### 3.3 promise 的基本流程

![在这里插入图片描述](https://img-blog.csdnimg.cn/8a0ee32c800f4e7c83a11426a44c049a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)






### 3.4 promise Api 的详细介绍

#### 3.4.1 Promise 构造函数：Promise(executor)

(1) executor 函数：执行器  (resolve, reject) => {}

(2) resolve 函数：内部定义成功时我们调用的函数  value => {}

(3) reject 函数：内部定义失败时我们调用的函数 reason => {}

说明：executor 会在 Promise 内部立即同步调用，异步操作在执行器中执行

> 代码

```js
<script>
    let p = new Promise((resolve, reject) => {
        // 同步调用
        console.log(111);
    });
	console.log(222);
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/51dfeb6b247d4e268a796bbe5b39688f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_16,color_FFFFFF,t_70,g_se,x_16)


#### 3.4.2 Promise.prototype.then 方法 (onResolved, onRejected) => {}

(1) onResolved 函数：成功的回调函数 (value) => {}

(2) onRejected 函数：失败的回调函数 (reason) => {}

说明：指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调返回一个新的 promise 对象

```js
promise.then(value => {
    console.log(value);
}, reason => {
    console.log(reason);
})
```



#### 3.4.3 Promise.catch 方法：(reason) => {}

(1) reason：失败的数据或Promise对象

说明：返回一个 失败的 promise 对象

```js
sendAJAX('https://api.apiopen.top/getJoke').catch(reason => {
             console.log(reason);
         })
```



#### 3.4.4 Promise.resolve 方法：(value) => {}

(1) value：成功的数据或 promise 对象

说明：返回一个成功/失败的 promise 对象

```js
// 如果传入的参数为 非 promise类型的对象，则返回的结果为成功的promise对象
let p1 = Promise.resolve(521);
// 如果传入的参数为 promise 对象，则参数的结果决定了 resolve 的结果
let p2 = Promise.resolve(new Promise((resolve, reject) => {
    resolve('ok');
}))
console.log(p2);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/83b2be5c16c54c22af007a92751a4592.png)


#### 3.4.5 Promise.reject 方法：(reason) => {}

(1) reason：失败的原因

说明：返回一个失败的 promise 对象

```js
let p1 = Promise.reject(521)
let p2 = Promise.reject(new Promise((resolve, reject) => {
    resolve('ok')
}))
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/b3c6e35f67694bfd91e4e66f9712c386.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 3.4.6 Promise.all 方法：(promises) => {}

(1) promises：包含 n 个 promise 的数组

说明：返回一个新的 promise，只有所有的 promise 都成功才成功，只要有一个失败了就直接失败



> 不演示了，写的太累了，看字面意思就知道这个函数的作用了。



#### 3.4.7 Promise.race 方法：(promises) => {}

(1) promises：包含 n 个 promise 的数组

说明：返回一个新的 promise，第一个完成的 promise 的结果状态就是最终的结果状态





## 4. promise 的几个关键问题

一：如何改变 promise 的状态

```js
let p = new Promise((resolve, reject) => {
    // 1. resolve 函数
    resolve('ok') // pending ---> fulfilled
    // 2. reject 函数
    reject('err') // pending ---> rejected
    // 3. 抛出错误
    throw '出问题了';
})
```



二：一个 promise 指定多个成功/失败回调函数，都会调用吗？

当 promise 改变为对应状态时都会调用

```js
let promise = new Promise((resolve, reject) => {
    resolve('Ok');
})

// 指定回调函数
promise.then(res => {
    console.log(res);
})

promise.then(res => {
    alert(res);
})
```





三：改变 promise 状态 和 指定回调函数谁先谁后？

(1)：都有可能，正常情况下是先指定回调再改变状态，但也可以先改变状态再指定回调

> 正常情况
>
> promise 执行器内部是 异步操作，所以是先指定回调，再改变状态

```js
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // 再改变状态
        resolve('Ok')
    }, 1000)
})

// 先指定回调
promise.then(res => {
    // 但 res 结果的获得，必须要等异步执行结束，状态改变才能获取到
    console.log(res);
})
```

(2)：如何先改状态再指定回调？

* 在执行器中直接调用 resolve() / reject()
* 延迟更长时间才调用 then()

```js
let promise = new Promise((resolve, reject) => {
    // 同步操作，直接先改变状态
    resolve('Ok');
})

// 再指定回调
promise.then(res => {
    console.log(res);
})
```



四：promise.then() 返回的新 promise 的结果状态由什么决定

(1) 简单表达：由 then() 指定的回调函数执行

(2) 详细表达：

* 如果抛出异常，新 promise 变为 rejected，reason 为 抛出的异常
* 如果返回的是非 promise 的任意值，新 promise 变为 resolved， value为返回的值
* 如果返回的是另一个新 promise，此 promise 的结果就会成为 新 promise 的结果



```js
let promise = new Promise((resolve, reject) => {
    resolve('Ok');
})

promise.then(res => {
    console.log(res);
    // 1. 抛出错误
    // throw '出了问题'
    // 2. 返回结果非 promise 对象
    return 123;
    // 3. 返回结果是promise 对象
    return new Promise((resolve, reject) => {
        resolve('DDD');
    })
})
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2ba660a3bb7647f68c3a39b8d0d1d5fa.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_14,color_FFFFFF,t_70,g_se,x_16)


![在这里插入图片描述](https://img-blog.csdnimg.cn/08f70349655c4d689d2560161bf0065f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_16,color_FFFFFF,t_70,g_se,x_16)


![在这里插入图片描述](https://img-blog.csdnimg.cn/a7769cd51adc4a9aa1e02cbc99912004.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_16,color_FFFFFF,t_70,g_se,x_16)




五：promise 如何串连多个操作任务？

(1) promise 的 then() 内部返回一个新的 promise，可以 .then() 进行链式调用

(2) 通过 then 的链式调用串连 多个同步/异步任务

> 就最开始提出按顺序读取a.txt , b.txt, c.txt 终于可以解释了。
>
> 如何用promise 解决回调地狱

```js
const fs = require('fs')

let p1 = new Promise((resolve, reject) => {
    fs.readFile('a.txt', 'utf-8', (err, data) => {
        resolve(data)
    })
})

let p2 = new Promise((resolve, reject) => {
    fs.readFile('b.txt', 'utf-8', (err, data) => {
        resolve(data)
    })
})

let p3 = new Promise((resolve, reject) => {
    fs.readFile('c.txt', 'utf-8', (err, data) => {
        resolve(data)
    })
})

p1.then(r1 => {
    console.log(r1);
    return p2;
}).then(r2 => {
    console.log(r2);
    return p3;
}).then(r3 => {
    console.log(r3);
})
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/3290a0e8706d40de9f4d61f5a7e9af90.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)






六：promise 异常穿透

(1) 当使用 promise 的 then 链式调用时，可以在最后指定失败的回调

(2) 前面任何操作出了异常，都会传到最后失败的回调中处理



```js
let promise = new Promise((resolve, reject) => {
    reject('Err');
})

let p = promise.then(res => {
    // console.log(111);    
    throw '失败了';
}).then(value => {
    console.log(222);
}).then(value => {
    console.log(333);
}).catch(reason => {
    console.log(reason);
})
```



七：中断 promise 链？

(1) 当使用 promise 的 then 链式调用时，在中间中断，不再调用后面的回调函数

(2) 办法：在回调函数中返回一个 pendding 状态的 promise 对象



```js
let promise = new Promise((resolve, reject) => {
    resolve('Ok');
})

let p = promise.then(res => {
    console.log(111);    
    // 有且只有一个方式
    // 回调函数执行的前提是  在状态改完之后才能执行。
    // 这里返回的promise 状态是 pendding
    return new Promise(() => {});
}).then(value => {
    console.log(222);
}).then(value => {
    console.log(333);
}).catch(reason => {
    console.log(reason);
})
```





## 5. 手写 Promise

### 5.1 定义整体结构

创建两个文件 index.html，promise.js

在 promise.js 写最基本的 promise 结构

```js
function Promise(executor) {

}

// 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected) {
    
}
```

index.html  里引入 我们刚写的 promise.js

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 引入 promise -->
    <script src="./promise.js"></script>
</head>
<body>
    <script>
        let p = new Promise((resolve, reject) => {
            resolve('Ok');
        })

        p.then(res => {
            console.log(res);
        }, reason => {
            console.log(reason);
        })
    </script>
</body>
</html>
```



### 5.2 封装 resolve 和 reject 结构

promise.js 里的 代码

```js
function Promise(executor) {

    // resolve 函数
    function resolve(data) {

    }

    // reject 函数
    function reject(data) {
        
    }

    // 同步调用 [执行器函数]
    executor(resolve, reject);

}
```



### 5.3 resolve 和 reject 代码的实现

```js
function Promise(executor) {

    // 添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    // 保存实例对象的 this 的值
    const that = this;
    // resolve 函数
    function resolve(data) {
        // 1. 修改对象的状态 (promiseState)
        that.PromiseState = 'fulfilled';
        // 2. 设置对象结果值 (promiseResult)
        that.PromiseResult = data;
    }

    // reject 函数
    function reject(data) {
        // 1. 修改对象的状态 (promiseState)
        that.PromiseState = 'rejected';
        // 2. 设置对象结果值 (promiseResult)
        that.PromiseResult = data;
    }

    // 同步调用 [执行器函数]
    executor(resolve, reject);

}

// 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected) {

}
```



### 5.4 throw 抛出异常改变状态

```js
try {
    // 同步调用 [执行器函数]
    executor(resolve, reject);
} catch (error) {
    // 修改 promise 对象状态为  失败
    reject(error)
}
```





### 5.5 promise 对象状态只能修改一次

```js
// resolve 函数
function resolve(data) {
    // 来个if判断一下就行
    if (that.PromiseState !== 'pending') return;
    // 1. 修改对象的状态 (promiseState)
    that.PromiseState = 'fulfilled';
    // 2. 设置对象结果值 (promiseResult)
    that.PromiseResult = data;
}

// reject 函数
function reject(data) {
    // 判断状态
    if (that.PromiseState !== 'pending') return;
    // 1. 修改对象的状态 (promiseState)
    that.PromiseState = 'rejected';
    // 2. 设置对象结果值 (promiseResult)
    that.PromiseResult = data;
}
```





### 5.6 then方法执行回调

```js
// 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected) {
    // 调用回调函数 PromiseState
    if (this.PromiseState === 'fulfilled') {
        onResolved(this.PromiseResult);
    }
    if (this.PromiseState === 'rejected') {
        onRejected(this.PromiseResult);
    }
}
```



### 5.7 异步任务回调的执行

> 这部分我感觉就是promise 最核心关键的地方了。

在前面的执行器函数中，一直是同步执行的，所以在 then 方法中能直接获取到 PromiseState 和 PromiseResult的值。但现在要在 executor 执行器中进行异步函数调用了，而 then 方法中回调函数就不能直接获得 PromiseState 和 PromiseResult。要等异步函数执行结束后才能得到。而如何处理才能使得 then 方法 得到 executor 执行器中 异步函数产生的值？

官方的解决方法是：

在 then 方法中判断 promise 的状态，如果是 pending，说明异步函数还没执行结束，这时不能直接调用 then 方法中的回调函数，先把回调函数保存下来。如何保存？在 promise 构造函数中用一个属性保存。

```js
function Promise(executor) {
    // 声明一个属性，用来保存 then 中的回调函数
    this.callback = {}
}
```

然后在 pending 状态时，保存回调函数

> 其实这时候 then 方法已经结束了，没有把回调函数进行调用，所以就先把回调函数存到 p 这个对象的 callback 上。在异步任务结束后，交给window 托管的 resolve 开始执行，这个 window 托管的函数使用了 p 对象中存着的 callback 函数。

index.html

```html
<script>
	let p = new Promise((resolve, reject) => {
            // this 的判断是根据 . 号前面的对象决定的
            // 这里直接是函数，resolve内部 this 指向 window
            // resolve('Ok');
            setTimeout(() => {
                // resolve('Ok');
                reject('err')
            }, 1000)
        })


        p.then(res => {
            console.log(res);
        }, reason => {
            console.log(reason);
        })

        console.log(p);
</script>
```

promise.js

```js
// 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected) {
    // 判断 pending 状态
    if (this.PromiseState === 'pending') {
        // 保存回调函数
        this.callback = {
            onResolved: onResolved,
            onRejected: onRejected
        }
    }
}
```

在 异步任务完成后，调用回调函数

```js
// resolve 函数
function resolve(data) {
    // 判断状态
    if (that.PromiseState !== 'pending') return;
    // 1. 修改对象的状态 (promiseState)
    that.PromiseState = 'fulfilled';
    // 2. 设置对象结果值 (promiseResult)
    that.PromiseResult = data;
    // 调用成功的回调函数
    if (that.callback.onResolved) {
        that.callback.onResolved(data);
    }
}

// reject 函数
function reject(data) {
    // 判断状态
    if (that.PromiseState !== 'pending') return;
    // 1. 修改对象的状态 (promiseState)
    that.PromiseState = 'rejected';
    // 2. 设置对象结果值 (promiseResult)
    that.PromiseResult = data;
    // 调用成功的回调函数
    if (that.callback.onRejected) {
        that.callback.onRejected(data);
    }
}
```





### 5.8 指定多个回调的实现

问题：

我们希望这两个回调都能执行，但保存第二个回调时会将第一个回调覆盖掉，所以原来的保存方法不行，需要修改。

> 修改前

```js
let p = new Promise((resolve, reject) => {
    // this 的判断是根据 . 号前面的对象决定的
    // 这里直接是函数，resolve内部 this 指向 window
    // resolve('Ok');
    setTimeout(() => {
        // resolve('Ok');
        reject('err')
    }, 1000)
})


p.then(res => {
    console.log(res);
}, reason => {
    console.log(reason);
})

// 保存第二个回调，会将之前保存在 p 对象中 callback 的内容覆盖掉
// 所以前面的保存方法不行，需要修改
p.then(res => {
    alert(res);
}, reason => {
    alert(reason);
})
```

> 修改后

改用数组存 callback，再遍历把每个 回调函数都调用。

```js
// 声明一个属性，用来保存 then 中的回调函数
this.callback = []

// resolve 函数
function resolve(data) {
    // 判断状态
    if (that.PromiseState !== 'pending') return;
    // 1. 修改对象的状态 (promiseState)
    that.PromiseState = 'fulfilled';
    // 2. 设置对象结果值 (promiseResult)
    that.PromiseResult = data;
    // 遍历调用成功的回调函数
    that.callback.forEach(item => {
        item.onResolved(data);
    });
}

// reject 函数
function reject(data) {
    // 判断状态
    if (that.PromiseState !== 'pending') return;
    // 1. 修改对象的状态 (promiseState)
    that.PromiseState = 'rejected';
    // 2. 设置对象结果值 (promiseResult)
    that.PromiseResult = data;
    // 遍历调用失败的回调函数
    that.callback.forEach(item => {
        item.onRejected(data);
    });
}

// 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected) {
    // 调用回调函数 PromiseState
    if (this.PromiseState === 'fulfilled') {
        onResolved(this.PromiseResult);
    }
    if (this.PromiseState === 'rejected') {
        onRejected(this.PromiseResult);
    }
    // 判断 pending 状态
    if (this.PromiseState === 'pending') {
        // 保存回调函数
        this.callback.push({
            onResolved: onResolved,
            onRejected: onRejected
        });
    }
}
```





### 5.9 同步修改状态 then 方法结果返回

> 这一块部分相当复杂，需要慢慢来理一下，后面异步的部分会更发杂（麻了）

前面的知识前提：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2001a707fa34421685909dfe972f5747.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


我们在前面的 promise 中学到 p.then() 这个方法会返回一个 promise 对象， 返回的具体内容根 回调函数的 return 内容相关。

> 现在这一部分是先按同步的来，下一章内容是异步

先写整体骨架代码：

```js
let p = new Promise((resolve, reject) => {
    resolve('Ok')
})


let outerResult = p.then(value => {
    return 521;
}, reason => {
    console.log(reason);
})

console.log(outerResult);
```

我们先返回 非 promise 的值，返回 521。

在 promise.js 中 then() 方法 返回 一个 promise 对象



**这是回调函数返回是 非 promise 的情况**

```js
Promise.prototype.then = function (onResolved, onRejected) {
    // 返回 promise
    return new Promise((resolve, reject) => {
        // 调用回调函数 PromiseState
        if (this.PromiseState === 'fulfilled') {
            // 所以这个result就是回调函数返回的结果
            let result = onResolved(this.PromiseResult);
            // 如果返回的是 promise 对象
            if (result instanceof Promise) {
                // 这里先不处理
            } else { // 返回的是常规值就是成功
                // 要将 outerResult 这个 promise 目前的状态 pending 改成fulfilled
                // 通过 resolve 就可以
                resolve(result);
            }
        }
    })
}
```

> 结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/fb97980ae7484150af01cbaf3a265c5b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)






> tips:
>
> 我把 p.then() 返回 的 promise 对象命名为 outerResult，在 p.then() 内的回调函数返回的 promise 对象命名为 result

**这是回调函数返回是 promise 的情况，并且这个 promise 是成功的状态**

```js
let outerResult = p.then(value => {
    let result = new Promise((resolve, reject) => {
        resolve('Hello');
    })
    return result;
}, reason => {
    console.log(reason);
})
```

```js
Promise.prototype.then = function (onResolved, onRejected) {
    // 返回 promise
    return new Promise((resolve, reject) => {
        // 调用回调函数 PromiseState
        if (this.PromiseState === 'fulfilled') {
            // 获取回调函数的结果
            let result = onResolved(this.PromiseResult);
            // 如果返回的是 promise 对象
            if (result instanceof Promise) {
                // result 执行的是成功，就要给外层的 outerResult 成功的效果
                result.then(value => {
                    // 这里 resolve 调用者是 outerResult
                    // result 的结果就是 outerResult的结果
                    resolve(value);
                }, reason => {
                    reject(reason)
                })
            } else { // 返回的是常规值就是成功
                // 通过 resolve 就可以
                resolve(result);
            }
        }
    })
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/46e3a832f5174038bfb26c10a1b05a0d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)






> 完整代码

```js
Promise.prototype.then = function (onResolved, onRejected) {
    // 返回 promise
    return new Promise((resolve, reject) => {
        // 调用回调函数 PromiseState
        if (this.PromiseState === 'fulfilled') {
            try {
                // 获取回调函数的结果
                let result = onResolved(this.PromiseResult);
                // 如果返回的是 promise 对象
                if (result instanceof Promise) {
                    // result 执行的是成功，就要给外层的 outerResult 成功的效果
                    result.then(value => {
                        // 使 outerResult 的 状态 和 result 的状态一致
                        resolve(value);
                    }, reason => {
                        reject(reason)
                    })
                } else { // 返回的是常规值就是成功
                    // 要将这个 大 的 promise 目前的状态 pending 改成fulfilled
                    // 通过 resolve 就可以
                    resolve(result);
                }
            } catch (error) {
                reject(error);
            }

        }
        if (this.PromiseState === 'rejected') {
            onRejected(this.PromiseResult);
        }
        // 判断 pending 状态
        if (this.PromiseState === 'pending') {
            // 保存回调函数
            this.callback.push({
                onResolved: onResolved,
                onRejected: onRejected
            });
        }
    })
}
```





### 5.10 异步修改状态 then 方法返回

> 这一部分就更复杂了。。。

因为 executor 内部是异步函数执行，所以在执行到  p.then() 时，p 的状态是 pending ，直接进入 .then() 方法的最后一个判断。说的太抽象了，来看下实际代码。

index.html 

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Err');
    }, 1000)
})


let outerResult = p.then(value => {
    console.log(value);
    // return 521;
}, reason => {
    console.log(reason);
})

console.log(outerResult);
```

promise.js

![在这里插入图片描述](https://img-blog.csdnimg.cn/79465ecec0b54f8c9a76d65aa9888947.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


之前写的代码，在碰到 executor 里是异步函数时，操作是先把回调函数保存起来，等异步函数执行结束，调用 resolve 或 reject 时，再调用 回调函数。

现在因为 .then() 方法执行后要返回一个 promise 对象，如果直接简单的保存回调函数，返回的 promise 对象的状态一直是 pending，PromiseResult 这个属性也一直是 null。

所以要对保存回调函数进行魔改，让后面执行这个回调函数时，能修改 outerResult 的两个属性。

```js
Promise.prototype.then = function (onResolved, onRejected) {
    // 返回 promise
    return new Promise((resolve, reject) => {
        // 判断 pending 状态
        if (this.PromiseState === 'pending') {
            // 保存回调函数
            this.callback.push({
                onResolved: function (data) {
                    // console.log('success');
                    // 执行成功的回调函数
                    // 获取回调函数返回结果
                    try {
                        let res = onResolved(data);
                        if (res instanceof Promise) {
                            // 根据 回调函数返回的 promise 决定
                            res.then(value => {
                                // 这个 回调函数 返回的 promise 内部调用的是 resolve
                                resolve(value);
                            }, reason => {
                                reject(reason);
                            })
                        } else {
                            // 不是 promise 返回的就是正确
                            // 改变outerResult的状态
                            resolve(res);
                        }
                    } catch (error) {
                        reject(error)
                    }

                },
                onRejected: function (data) {
                    try {
                        // 改变 promise 的状态为 rejected
                        let res = onRejected(data);
                        if (res instanceof Promise) {
                            // 根据 回调函数返回的 promise 决定
                            res.then(value => {
                                // 这个 回调函数 返回的 promise 内部调用的是 reject
                                resolve(value);
                            }, reason => {
                                reject(reason);
                            })
                        } else {
                            // 改变outerResult的状态
                            reject(res);
                        }
                    } catch (error) {
                        reject(error)
                    }
                }
            });
        }
    })
}
```



### 5.11 catch方法-异常穿透与值传递

catch 方法是获取失败的值，因为前面 then() 方法 已经写的很完善了，所以 catch 只要调用一下 then() 就好

**index.html**

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Err');
    }, 1000)
})


let res = p.catch(reason => {
    console.log(reason);
    return 321;
})

console.log(res);
```

 **promise.js**

```js
Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
}
```

> 接下来就是要完成 catch 方法的异常穿透效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/cb7ab8ede4414a3eb7bf0c4004f02274.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)

我按照顺序写下来：

index.html

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Err');
    }, 1000)
})


let res = p.then(value => {
    console.log(111);
}).then(value => {
    console.log(222);
}).then(value => {
    console.log(333);
}).catch(reason => {
    console.log(reason);
})
```

这时候会出现这个问题：

![在这里插入图片描述](https://img-blog.csdnimg.cn/25c8de14761c4cbc90e55995738da26f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


说 onRejected 方法不存在，这是什么情况？

> 解释：
>
> executor 执行器在执行它内部异步代码前，同步代码已经执行结束了，也就是 p.then() 执行完毕，把 then 内的回调方法存到了 p 的自身属性上。而 then 的回调参数有两个：onResolved，onRejected。在这个案例中只传了一个 onResolve，没有onRejected，所以 保存在 p 本身上的回调函数 onRejected 就为空。

所以我们要主动给 then 方法内加上一个 onRejected 回调函数。

```js
Promise.prototype.then = function (onResolved, onRejected) {

    // 判断回调函数的参数
    // then 方法中并没有 onRejected 这个回调方法
    if (typeof onRejected !== 'function') {
        // 手动给 then 添加这个回调函数 
        onRejected = reason => {
            // 抛异常
            throw reason;
        }
    }
}
```

这时候在最后的 catch 就能接受到这个异常了

![在这里插入图片描述](https://img-blog.csdnimg.cn/9984a29fc1a94311a82bd83440c43cf3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)




**值传递**的话就是 then 方法连 onResolved 回调函数都不传递了。

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Err');
    }, 1000)
})


let res = p.then().then(value => {
    console.log(222);
}).then(value => {
    console.log(333);
}).catch(reason => {
    console.log(reason);
})
```

这时候处理方法和上面的类似，加一个 onResolved 回调就行

```js
// then 方法中并没有 onResolved 这个回调方法
if (typeof onResolved !== 'function') {
    // 手动给 then 添加这个回调函数 
    onResolved = value => {
        return value;
    }
}
```



### 5.12 resolve 方法封装

比较简单直接亮代码

```js
Promise.resolve = function (value) {
    // 返回 promise 对象
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(v => {
                resolve(v);
            }, r => {
                reject(r);
            })
        } else {
            resolve(value);
        }
    })
}
```





### 5.13 all 方法封装

![在这里插入图片描述](https://img-blog.csdnimg.cn/39cd23ae1a95413ebd0771d568398131.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


index.html

```js
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Ok')
    }, 1000)
})

let p2 = new Promise((resolve, reject) => {
    resolve('success')
});

let p3 = new Promise((resolve, reject) => {
    resolve('dddd')
});

let res = Promise.all([p1, p2, p3])
console.log(res);
```

promise.js

```js
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        // 声明变量
        let count = 0;
        let arr = [];
        // 遍历
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(v => {
                // 对象的状态是成功
                count++;
                // 将当前 promise 对象成功的结果 存到数组中
                arr[i] = v;
                // 判断如果全都成功，就返回成功
                if (count === promises.length) {
                    // 修改状态
                    resolve(arr);
                }
            }, r => {
                reject(r);
            })
        }
    })
}
```



### 5.14 then 方法 回调的异步执行

先看场景：

index.html

```js
let p1 = new Promise((resolve, reject) => {
    // setTimeout(() => {
    //     resolve('Ok')
    // }, 1000)
    resolve('OK')
    console.log(111);
})

p1.then(value => {
    console.log(222);
})

console.log(333);
```

要求我们的 then 内部的回调方法应该是异步执行。

打印结果：却是同步执行

![在这里插入图片描述](https://img-blog.csdnimg.cn/b2a72d5ae75b430ea883ba8c8f99f263.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_16,color_FFFFFF,t_70,g_se,x_16)


用一个比较粗糙的方法解决，给所有的回调函数加上定时器：

![在这里插入图片描述](https://img-blog.csdnimg.cn/7a8e6cf8f89744419028266d61be5c00.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)






### 总结分析：

这个尚硅谷的视频一直没讲链式调用的过程，我觉得是一个很大的遗憾，我这一块还是挺迷糊的，我尝试着自己来分析一下。

首先我们需要知道 then 本身是同步，只是它内部的回调函数是异步的。可以用代码来测试一下

index.html

```js
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Ok')
    }, 1000)
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 2000)
});

let p3 = new Promise((resolve, reject) => {
    resolve('dddd')
});

p1.then(value => {
    console.log(value);
    console.log(111);
    return p2;
}).then(value => {
    console.log(value);
    console.log(222);
    return p3;
}).then(value => {
    console.log(value);
    console.log(333);
})

console.log('我得在回调之前执行');
```

promise.js

修改 then 函数内容，在调用 then 时一上来就打印一下。

```js
Promise.prototype.then = function (onResolved, onRejected) {
    console.log('then本身是同步的');
}
```

我们可以看一下打印结果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/e45d129b890c476c983dfceeb6ae4b09.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


可以得出结论，then 的链式调用会在一开始就一下子执行下去。then 内部的回调函数是按照我们写的顺序执行下去，为啥会这样呢，我们一行一个代码逐步解析一下。



先分析一上来定义出来的三个 promise 对象

```js
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Ok')
    }, 1000)
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 2000)
});

let p3 = new Promise((resolve, reject) => {
    resolve('dddd')
});
```

第一步：定义 P1 是一个 promise 对象，P1 的 PromiseState 是 pending，PromiseResult 是 null，this.callback = []。然后开始调用 executor(resolve, reject) 执行器， 但执行器内部一进去就是一个定时器，定时器是异步函数调用，进异步队列，然后继续往下执行就到 P2。

![在这里插入图片描述](https://img-blog.csdnimg.cn/34670437a88542c9995758ddffb78ee2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


第二步：定义 P2，P2 与 P1 类似， PromiseState 和 PromiseResult 都一样，executor 执行器内部也是一个定时器，进异步队列

![在这里插入图片描述](https://img-blog.csdnimg.cn/a892923ff35d4bf08f7318a739f752f5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


第三步：定义 P3，因为 P3 executor 执行器 内部没有异步函数，所以直接按照同步代码执行，而且调用的是 resolve，所以返回的是成功 PromiseState 为 fulfilled,  PromiseResult 为 Ok ，callback 是 异步函数，虽然里面还没有值，还是要放到异步队列中。



> 开始比较刺激的 then 方法调用了。

![在这里插入图片描述](https://img-blog.csdnimg.cn/7e4ecba1e2c04b089679c334b5e09756.png)

第四步：P1 调用 then 方法，这个过程是这样的，因为我们之前在 then 的第一行添加了 `console.log('then本身是同步的');` ，所以控制台打印 then本身就是同步的。 接着因为 P1 的 PromiseState 是 pending ，所以会将 then 中的回调函数保存到 P1 的 callback 属性上。这时 P1.then() 方法执行结束，返回一个 Promise 对象，我把该返回的 Promise 对象命名为 X。该Promise 对象正处于 pending 状态中。


![在这里插入图片描述](https://img-blog.csdnimg.cn/e48b3774abab4b8dbc8984e11ade1acb.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/9b0bcc323e03401fa77e8c24ede26d43.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)




第五步：链式调用 then。

![在这里插入图片描述](https://img-blog.csdnimg.cn/fa1855011b3b460781a923087863d955.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_19,color_FFFFFF,t_70,g_se,x_16)


这个就相当于 X 在调用 then

![在这里插入图片描述](https://img-blog.csdnimg.cn/82945cd3af5244d4b6dcbc8e4232b2ec.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_18,color_FFFFFF,t_70,g_se,x_16)


X 此时 是 pending 状态，调用 then 就是 先打印下 **then本身是同步的** 这句话，然后就是 把 then 内部的回调函数保存 X 的 callback 上。这时， X.then() 执行结束， X.then() 返回一个对象，我称之为 Y ，这个 Y 对象状态此时也是 pending。

![在这里插入图片描述](https://img-blog.csdnimg.cn/61db1ac287b3429ead895e8d1f4d2d86.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


第六步：最后一个链式调用

```js
p1.then(value => {
    console.log(value);
    console.log(111);
    return p2;
}).then(value => {
    console.log(value);
    console.log(222);
    return p3;
}).then(value => {
    console.log(value);
    console.log(333);
})
```

分解后相当于：

```js
let X = p1.then(value => {
    console.log(value);
    console.log(111);
    return p2;
})
let Y = X.then(value => {
    console.log(value);
    console.log(222);
    return p3;
})
let Z = Y.then(value => {
    console.log(value);
    console.log(333);
})
```

就和上面一样，Y 此时是 pending 状态，所以调用 then 方法，直接将回调函数保存到 Y 的 callback 属性上，返回一个新 Promise ，状态是 pending。

![在这里插入图片描述](https://img-blog.csdnimg.cn/0288674e12b94b74a2bd72c4c8b0aaf8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


这是同步代码执行完，控制台打印的结果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/4d0f2722ed814ad9af0d4124ebee4d46.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)



> 到此为止，所有同步代码执行完毕，开始执行异步代码，这一部分又是老大难。。。

第七步：开始执行异步队列的代码

![在这里插入图片描述](https://img-blog.csdnimg.cn/66f4d690ba854548ae0c46aa0b366de7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_10,color_FFFFFF,t_70,g_se,x_16)


异步队列里有三个异步函数， 其实 setTimeout-回调-P3 这个异步函数并没有作用，因为 P3 的 callback 是空的。有作用的就 setTimeout-P1 和 setTimeout-P2。

因为只有 P1.then() 调用了，存有属于自己的回调函数，别的 P2，P3 都没有 .then() 拥有自己的回调函数。所以就算 P2 或 P3 的执行器里的 异步函数先完成，他们的 callback 也是空的，没有回调函数可以调用。

接下来直接讲解下这个调用过程。

```js
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Ok')
    }, 1000)
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 2000)
});

let p3 = new Promise((resolve, reject) => {
    resolve('dddd')
});

let X = p1.then(value => {
    console.log(value);
    console.log(111);
    return p2;
})
let Y = X.then(value => {
    console.log(value);
    console.log(222);
    return p3;
})
let Z = Y.then(value => {
    console.log(value);
    console.log(333);
})
console.log('X', X);
console.log('Y', Y);
console.log('Z', Z);
console.log('P1', p1);
console.log('P2', p2);
console.log('P3', p3);
```

还没执行前所有对象的状态

![在这里插入图片描述](https://img-blog.csdnimg.cn/3b879976566d4f0ab0ca67de94267178.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


我们来看一下执行的步骤过程。

第一步：先执行完 P1 的 resolve 方法（P1 异步函数在执行时会记住 P1 的环境），将 P1 的属性都成功更改为 fulfilled 和 Ok，然后开始执行 P1 callback 里保存的回调函数。

这个回调函数是



![在这里插入图片描述](https://img-blog.csdnimg.cn/920f32f3b55b40468aa6cfdf6860a5a0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


这个回调时被修饰过的，修饰后：

![在这里插入图片描述](https://img-blog.csdnimg.cn/216cc77b3a654661840dd7c0a42e6137.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


执行后结果是，打印 value，打印 111，将 P2 返回给 res

![在这里插入图片描述](https://img-blog.csdnimg.cn/c622580fe1ea43fe8ec9cb727f2b2acf.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


![在这里插入图片描述](https://img-blog.csdnimg.cn/0d2a06f60cb2405b8763cbf774cb7069.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


P1.then() 执行结束时返回了一个 Promise 对象给 X。而 res 执行的环境是Promise X 的环境

![在这里插入图片描述](https://img-blog.csdnimg.cn/0e92d26f542c454baa0f583841e437bf.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


resolve 执行就是修改 X 的状态，X 更改为 fulfilled，内容为 success ，然后要执行 X 的 callback 里的回调函数。X callback里的回调函数是 X.then() 时保存的。

![在这里插入图片描述](https://img-blog.csdnimg.cn/aa578d9cccb5470d8dadb1f27f472a5e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_16,color_FFFFFF,t_70,g_se,x_16)


然后就和上面的过程一样。

最终结果：一切都顺利执行。

![在这里插入图片描述](https://img-blog.csdnimg.cn/de4e982e19d544dd8938b6ca329b119d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_14,color_FFFFFF,t_70,g_se,x_16)




### 本质：

尚硅谷的 promise 的实现研究后发现就是在输出结果上模拟了真实 promise 的实现过程。但实现过程不是真的 promise。如果存在这么一个场景，p2 的执行需要用到 p1 完成后的结果，那尚硅谷模拟的 promise 是无法完成的。因为 尚硅谷的 promise 只是把 p1，p2，p3的结果按顺序打印出来而已，实际上三者的异步方法在执行过程中是无关的。

## 6. Promisification

指将一个接受回调的函数转换为一个返回 promise 的函数。

由于许多函数和库都是基于回调的，因此，在实际开发中经常会需要进行这种转换。因为使用 promise 更加方便，所以将基于回调的函数和库 promisify 是有意义的。（译注：promisify 即指 promise 化）

具体案例可以看 **2.3** **2.4** 的练习



## 7. 简介 async await

### 7.1 async

* 函数的返回值为 promise 对象。
* promise 对象的结果由 async 函数执行的返回值决定

### 7.2 await

* await 右侧的表达式一般为 promise 对象，但也可以是其他的值
* 如果表达式 promise 对象。await 返回的是 promise 成功的值
* 如果表达式是其它值，直接将此值作为await 的值



### 7.3 实际案例1

```js
const fs = require('fs')
const util = require('util')
// promisify 处理完返回的是一个 promise 对象
const mineReadFile = util.promisify(fs.readFile);


async function main() {
    // 读取第一个文件的内容
    let data1 = await mineReadFile('./a.txt');
    let data2 = await mineReadFile('./b.txt');
    let data3 = await mineReadFile('./c.txt');
}
```





### 7.4 实际案例2

```js
function sendAJAX(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        // 处理结果
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.status)
                }
            }
        }
    })
}

let btn = document.querySelector('#btn');
btn.addEventListener('click',async function () {
    // 获取信息
    let message = await sendAJAX('https://api.apiopen.top/getJoke');

    console.log(message);
})
```

