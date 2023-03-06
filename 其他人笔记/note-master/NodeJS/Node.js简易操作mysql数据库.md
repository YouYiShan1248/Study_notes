# Node.js中使用mysql

## 1. 在项目中操作数据库的步骤

① 安装操作 MySQL 数据库的第三方模块（mysql） 

② 通过 mysql 模块连接到 MySQL 数据库 

③ 通过 mysql 模块执行 SQL 语句

![请添加图片描述](https://img-blog.csdnimg.cn/3ec830935e42478d847d0eae84b21e1d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)






## 2. 安装与配置 mysql 模块

### 2.1 安装 mysql 模块

mysql 模块是托管于 npm 上的第三方模块。它提供了在 Node.js 项目中连接和操作 MySQL 数据库的能力。 想要在项目中使用它，需要先运行如下命令，将 mysql 安装为项目的依赖包：

```js
npm i mysql
```

### 2.2 配置 mysql 模块

在使用 mysql 模块操作 MySQL 数据库之前，必须先对 mysql 模块进行必要的配置，主要的配置步骤如下：

```js
const mysql = require('mysql')

// 建立与mysql数据库的连接
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test' // 指定要操作哪个数据库
})
```

### 2.3 测试 mysql 模块能否正常工作

调用 db.query() 函数，指定要执行的 SQL 语句，通过回调函数拿到执行的结果：

```js
db.query('select 1', (err, res) => {
    if (err) return console.log(err.message);
    console.log(res);
})
```





## 3. 使用 mysql 模块操作 MySQL 数据库

### 3.1 查询数据

查询 users 表中所有的数据：

```js
db.query('select * from account', (err, res) => {
    if (err) return console.log(err.message);
    console.log(res);
})  
```



### 3.2 插入数据

向 account 表中新增数据， 其中 username 为 Spider-Man，salary为 3000。示例代码如下：

```js
// 要插入到account中的数据
const user = { username: 'Spider-man', salary: '3000'}
const sqlStr = 'insert into account (username, salary) values (?, ?)'
db.query(sqlStr, [user.username, user.salary], (err, res) => {
    if (err) return console.log(err.message);
    console.log(res);
})
```



### 3.3 插入数据的便捷方式

向表中新增数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速插入数据：

```js
const user = { username: 'Spider-man', salary: '3000'}
const sqlStr = 'insert into account set ?'
db.query(sqlStr, user, (err, res) => {
    if (err) return console.log(err.message);
    console.log(res);
})
```



### 3.4 更新数据

可以通过如下方式，更新表中的数据：

```js
const user = { id: 4, username: 'iron-man', salary: '30000'}
const sqlStr = 'update account set username=?, salary=? where id=?'
db.query(sqlStr, [user.username, user.salary, user.id], (err, res) => {
    if (err) return console.log(err.message);
    if (res.affectedRows === 1) console.log('更新数据成功');
})
```





### 3.5 更新数据的便捷方式

更新表数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速更新表数据：

```js
const user = { id: 2, username: 'iron-manDad', salary: '30000'}
const sqlStr = 'update account set ? where id=?'
db.query(sqlStr, [user, user.id], (err, res) => {
    if (err) return console.log(err.message);
    if (res.affectedRows === 1) console.log('更新数据成功');
})
```





### 3.6 删除数据

在删除数据时，推荐根据 id 这样的唯一标识，来删除对应的数据。示例如下：

```js
const sqlStr = 'delete from account where id=?';
db.query(sqlStr, 1, (err, res) => {
    if (err) return console.log(err.message);
    if (res.affectedRows === 1) console.log('删除数据成功');
})
```







### 3.7 标记删除

使用 DELETE 语句，会把真正的把数据从表中删除掉。

为了保险起见，推荐使用标记删除的形式，来模拟删除的动作。 

所谓的标记删除，就是在表中设置类似于 status 这样的状态字段，来标记当前这条数据是否被删除。 

当用户执行了删除的动作时，我们并没有执行 DELETE 语句把数据删除掉，而是执行了 UPDATE 语句，将这条数据对应 的 status 字段标记为删除即可。

```js
db.query('update account set status=1 where id=?', 2, (err, res) => {
    if (err) return console.log(err.message);
    if (res.affectedRows === 1) console.log('删除数据成功');
})
```


