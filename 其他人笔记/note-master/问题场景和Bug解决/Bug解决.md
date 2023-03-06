# 1. ReferenceError和TypeError

为什么区分LHS和RHS是一件重要的事情?

因为在变量还没有声明(在任何作用域中都无法找到该变量)的情况下，这两种查询的行为是不一样的。

考虑如下代码:

```js
function foo(a) {
	console.log( a + b );
	b = a;
}
foo(2);
```

第一次对b进行RHS查询时是无法找到该变量的。也就是说，这是一个“未声明”的变量，因为在任何相关的作用域中都无法找到它。

如果RHS查询在所有嵌套的作用域中遍寻不到所需的变量，引擎就会抛出ReferenceError 异常。值得注意的是，ReferenceError 是非常重要的异常类型。

相较之下，当引擎执行LHS查询时，如果在顶层(全局作用域)中也无法找到目标变量，全局作用域中就会创建一个具有该名称的变量，并将其返还给引擎，前提是程序运行在非“严格模式”下。

> “不，这个变量之前并不存在，但是我很热心地帮你创建了一个。”

ES5中引入了“严格模式”。同正常模式，或者说宽松/懒惰模式相比，严格模式在行为上有很多不同。其中一个不同的行为是严格模式禁止自动或隐式地创建全局变量。

因此，在严格模式中LHS查询失败时，并不会创建并返回一个全局变量，引擎会抛出同RHS查询失败时类似的ReferenceError异常。

接下来，如果RHS查询找到了一个变量，但是你尝试对这个变量的值进行不合理的操作，比如试图对一个非函数类型的值进行函数调用，或着引用null或undefined类型的值中的属性，那么引擎会抛出另外一种类型的异常，叫作TypeError。

ReferenceError同作用域判别失败相关，而TypeError则代表作用域判别成功了，但是对结果的操作是非法或不合理的。



# 2. Vue在使用事件总线是出现on没有执行

在跳转页面时，发生事件总线时，on无法接收执行。

原因：因为在emit发射时，on来不及创建，所以无法接收

解决：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201008094413447.jpg#pic_center)

给发射事件添加一个延时





# 3. 明明是数组但是却报错Cannot read properties of undefined (reading ‘length‘)

说是不能计算出长度。但是我明明是个[数组](https://so.csdn.net/so/search?q=数组&spm=1001.2101.3001.7020)啊。

![img](https://img-blog.csdnimg.cn/914448bd31d0461698ed00e8f1e61606.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5aSP5aSp5oOz,size_20,color_FFFFFF,t_70,g_se,x_16)

我尝试先打印一下这个children的内容

![img](https://img-blog.csdnimg.cn/6156af22f51d4d168d58a242e891fc0a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5aSP5aSp5oOz,size_20,color_FFFFFF,t_70,g_se,x_16)

结果也是数组怎么会求不了长度呢？

最后我在求长度的地方加了一个判断，判断他是数组并且长度大于0.这样就不报错了

```js
{{ Array.isArray(row.children) && row.children.length > 0 ? "修改" : "新增" }}
```

 





# 4. div设置position:fixed或者absolute绝对定位后，click事件失效问题

div后面需要点击的link或者标签放到[绝对定位](https://so.csdn.net/so/search?q=绝对定位&spm=1001.2101.3001.7020)的div里面，然后将这个div的z-index设置得大于前一个绝对定位的div即可：

```css
z-index: 99;
position: absolute;
```





# 5. Delete `␍`eslint(prettier/prettier)

今天遇到一个问题记录一下，eslint(prettier/prettier) 一直提示Delete `␍`，后面加上结尾符号还是不行，

在网上搜索了很多类似问题，解决方法简单粗暴，即使禁用掉这个结尾提示

在.eslintrc.js文件中添加

```
"endOfLine":"auto"
```

不建议这么做，本来就是美化统一代码的工具，禁用掉没有意义了，
根据提示修改结尾符号没有的情况下多半是行尾序列号造成的。

如图提示让删除行尾序列号
![img](https://img2020.cnblogs.com/blog/1186167/202008/1186167-20200831151307778-587892615.png)

 

 解决方法如下：
![img](https://img2020.cnblogs.com/blog/1186167/202008/1186167-20200831151522868-1989415864.png)

 



# 6. Vue中使用tailwindcss

## 一、下载tailwindcss

```javascript
npm install tailwindcss
```

## 二、引入tailwindcss

在styles文件夹下引入

![image-20220728191743971](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220728191743971.png)

再在main.js 中引入

![image-20220728191811666](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220728191811666.png)

## 三、初始化

```
npx tailwind init
```

> 这时会生成tailwind.config.js和postcss.config.js,然后在根目录创建vue.config.js配置文件

```js
module.exports = {

    css: {
        loaderOptions: {
            postcss: {
                plugins: [require('tailwindcss'), require('autoprefixer')]
            }
        }
    }
}
```



## 四、运行代码

> npm run serve运行代码,如果报等级太高的错误,就删除调低

假设以下错误

```
PostCSS plugin tailwindcss requires PostCSS 8.
```

解决方法

```
# 删除原来安装的包
npm uninstall tailwindcss postcss autoprefixer
# 安装低版本包
npm install tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

## 五、vsCode中安装插件

```
Tailwind CSS IntelliSense
```

## 六、尝试书写代码

```html
 <div class="h-8 bg-green-200 text-yellow-500">山竹</div>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/cd8587b2f87949879dfa35202dae507b.png)
