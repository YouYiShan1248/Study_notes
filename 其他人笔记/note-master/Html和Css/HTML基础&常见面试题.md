﻿![在这里插入图片描述](https://img-blog.csdnimg.cn/2643ef539fd24e9faf8c6812e27e025a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)
# 1. HTML常用标签


## 1.1 排版标签


排版标签主要和css搭配使用，显示网页结构的标签，是网页布局最常用的标签。


### 1）标题标签h


其基本语法格式如下：


```html
<h1>   标题文本   </h1>
<h2>   标题文本   </h2>
<h3>   标题文本   </h3>
<h4>   标题文本   </h4>
```


### 2）段落标签p

**作用语义：**

可以把 HTML 文档分割为若干段落。在网页中要把文字有条理地显示出来，离不开段落标签，就如同我们平常写文章一样，整个网页也可以分为若干个段落，而段落的标签就是

```html
<p>  文本内容  </p>
```


是HTML文档中最常见的标签，默认情况下，文本在一个段落中会根据浏览器窗口的大小自动换行。


### 3）水平线标签hr


在网页中常常看到一些水平线将段落与段落之间隔开，使得文档结构清晰，层次分明。这些水平线可以通过插入图片实现，也可以简单地通过标签来完成，就是创建横跨网页水平线的标签。其基本语法格式如下：

---

```html
<hr/>是单标签
```


在网页中显示默认样式的水平线。


### 4）换行标签br

在HTML中，一个段落中的文字会从左到右依次排列，直到浏览器窗口的右端，然后自动换行。如果希望某段文本强制换行显示，就需要使用换行标签

```html
<br/>
```

### 5）div 和  span标签


div   span    是没有语义的     是我们网页布局主要的2个盒子   想必你听过  css+div


```html
<div> 这是头部 </div>
<span>今日价格</span>
```


- div标签  用来布局的，但是现在一行只能放一个div
- span标签  用来布局的，一行上可以放好多个span

## 1.2 文本格式化标签


在网页中，有时需要为文字设置粗体、斜体或下划线效果，这时就需要用到HTML中的文本格式化标签，使文字以特殊的方式显示。


![](https://img-blog.csdnimg.cn/205d1947005d4b3aa9237375dc3e5350.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=fONMl&originHeight=344&originWidth=942&originalType=binary&ratio=1&status=done&style=none#id=OOkxE&originHeight=344&originWidth=942&originalType=binary&ratio=1&status=done&style=none)​

## 1.3 标签属性


所谓属性就是**外在特性**  比如 手机的颜色 手机的尺寸 ，总结就是手机的。。


- 手机的颜色是黑色n
- 手机的尺寸是 8寸
- 水平线的长度是 200
- 图片的宽度 是  300

使用HTML制作网页时，如果想让HTML标签提供更多的信息，可以使用HTML标签的属性加以设置。其基本语法格式如下：


```html
<标签名 属性1="属性值1" 属性2="属性值2" …> 内容 </标签名>
<手机 颜色="红色" 大小="5寸">  </手机>
```


## 1.4 图像标签img


要想在网页中显示图像就需要使用图像标签，接下来将详细介绍图像标签以及和他相关的属性。


语法如下：

```html
<img src="图像URL" />
```


该语法中src属性用于指定图像文件的路径和文件名，他是img标签的必需属性。


![](https://img-blog.csdnimg.cn/f3ad0f38432e4aff8566d921f34001de.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=YhP6D&originHeight=423&originWidth=960&originalType=binary&ratio=1&status=done&style=none#id=dNIn2&originHeight=423&originWidth=960&originalType=binary&ratio=1&status=done&style=none)​


border 后面我们会用css来做，这里就记住这个border 单词就好了


**注意: **


1. 标签可以拥有多个属性，必须写在开始标签中，位于标签名后面。
2. 属性之间不分先后顺序，标签名与属性、属性与属性之间均以空格分开。
3. 采取  键值对 的格式   key="value"  的格式


## 1.5 链接标签


在HTML中创建超链接非常简单，只需用标签把文字包括起来就好。


语法格式：


```html
<a href="跳转目标" target="目标窗口的弹出方式">文本或图像</a>
```

> href：用于指定链接目标的url地址，（必须属性）当为标签应用href属性时，它就具有了超链接的功能
>
> target：用于指定链接页面的打开方式，其取值有_self和_blank两种，其中_self为默认值，__blank为在新窗口中打开方式。

**注意：**


1. 外部链接 需要添加 http:// www.baidu.com
2. 内部链接 直接链接内部页面名称即可 比如 < a href="index.html"> 首页
3. 如果当时没有确定链接目标时，通常将链接标签的href属性值定义为“#”(即href="#")，表示该链接暂时为一个空链接。
4. 不仅可以创建文本超链接，在网页中各种网页元素，如图像、表格、音频、视频等都可以添加超链接。
5. 下载链接：如果href里面地址是一个文件或压缩包，会下载这个文件
6. 锚点链接：跳转作用

# 2. 路径


实际工作中，我们的文件不能随便乱放，否则用起来很难快速的找到他们，因此我们需要一个文件夹来管理他们。

**目录文件夹： **


就是普通文件夹，里面只不过存放了我们做页面所需要的 相关素材，比如 html文件， 图片 等等。


![](https://img-blog.csdnimg.cn/3a78ca613a9a490d91f0cfc3bf9b72e4.png#id=kykz9&originHeight=118&originWidth=272&originalType=binary&ratio=1&status=done&style=none#id=d9cEk&originHeight=118&originWidth=272&originalType=binary&ratio=1&status=done&style=none)

**根目录 **


打开目录文件夹的第一层  就是 根目录


![](https://img-blog.csdnimg.cn/ac65092023324ae9bff70de1d7dfd6e3.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_10,color_FFFFFF,t_70,g_se,x_16#id=QL6cW&originHeight=232&originWidth=320&originalType=binary&ratio=1&status=done&style=none#id=E8so4&originHeight=232&originWidth=320&originalType=binary&ratio=1&status=done&style=none)


页面中的图片会非常多， 通常我们再新建一个文件夹专门用于存放图像文件（images），这时再插入图像，就需要采用“路径”的方式来指定图像文件的位置。路径可以分为： 相对路径和绝对路径


## 相对路径

以引用文件之网页所在位置为参考基础，而建立出的目录路径。因此，当保存于不同目录的网页引用同一个文件时，所使用的路径将不相同，故称之为相对路径。

> 同一级路径，只需输入图像文件的名称即可。
>
> 下一级路径，加一个“/”
>
> 上一级路径，加上“../”

## 绝对路径


绝对路径以Web站点根目录为参考基础的目录路径。之所以称为绝对，意指当所有网页引用同一个文件时，所使用的路径都是一样的。

> D:\web\img\logo.gif，或完整的网络地址，例如   http://www.itcast.cn/images/logo.gif

**注意：**

> 绝对路径用的较少，我们理解下就可以了。  但是要注意，它的写法 特别是符号  \  并不是 相对路径的   /


# 3. 表格 table


## 3.1 创建表格


在HTML网页中，要想创建表格，就需要使用表格相关的标签。

**创建表格的基本语法：**


```html
<table>
  <tr>
    <td>单元格内的文字</td>
    ...
  </tr>
  ...
</table>
```


要深刻体会表格、行、单元格他们的构成。


在上面的语法中包含基本的三对HTML标签，分别为 table、tr、td，他们是创建表格的基本标签，缺一不可，下面对他们进行具体地解释


1. table用于定义一个表格标签。
2. tr标签 用于定义表格中的行，必须嵌套在 table标签中。
3. td 用于定义表格中的单元格，必须嵌套在标签中。
4. 字母 td 指表格数据（table data），即数据单元格的内容，现在我们明白，表格最合适的地方就是用来存储数据的。



![](https://img-blog.csdnimg.cn/f336c3ccd34b40c7b9d83053394b3658.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=B0xTg&originHeight=406&originWidth=677&originalType=binary&ratio=1&status=done&style=none#id=BwC1w&originHeight=406&originWidth=677&originalType=binary&ratio=1&status=done&style=none)


**总结： **


-  表格的主要目的是用来显示特殊数据的 
-  一个完整的表格有表格标签（table），行标签（tr），单元格标签（td）组成，没有列的标签 
-  中只能嵌套 类的单元格 
-  标签，他就像一个容器，可以容纳所有的元素 



## 3.2 表格属性


表格有部分属性我们不常用，这里重点记住 cellspacing 、 cellpadding。


![](https://img-blog.csdnimg.cn/92265d52f3af4e909fde90d9e65a43cc.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=roRHQ&originHeight=486&originWidth=950&originalType=binary&ratio=1&status=done&style=none#id=sN72h&originHeight=486&originWidth=950&originalType=binary&ratio=1&status=done&style=none)​


我们经常有个说法，是三参为0，  平时开发的我们这三个参数    border  cellpadding  cellspacing  为  0


![](https://img-blog.csdnimg.cn/9055893604d14ee28166fe77bf1a428f.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=akG0w&originHeight=494&originWidth=790&originalType=binary&ratio=1&status=done&style=none#id=vqgbI&originHeight=494&originWidth=790&originalType=binary&ratio=1&status=done&style=none)

**案例1：**


![](https://img-blog.csdnimg.cn/c6722cf6e64945d2a5e20da58b7d18c3.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_17,color_FFFFFF,t_70,g_se,x_16#id=lNeMy&originHeight=410&originWidth=552&originalType=binary&ratio=1&status=done&style=none#id=zJobd&originHeight=410&originWidth=552&originalType=binary&ratio=1&status=done&style=none)


```html
<table width="500" height="300" border="1" cellpadding="20" cellspacing="0" align="center">
   <tr>  <th>姓名</th>   <th>性别</th> <th>年龄</th>  </tr>
   <tr>  <td>刘德华</td> <td>男</td> <td>55</td>  </tr>
   <tr>  <td>郭富城</td> <td>男</td> <td>52</td>  </tr>
   <tr>  <td>张学友</td> <td>男</td> <td>58</td>  </tr>
   <tr>  <td>黎明</td>   <td>男</td> <td>18</td>  </tr>
   <tr>  <td>刘晓庆</td> <td>女</td> <td>63</td>  </tr>
</table>
```


## 3.3 表头单元格标签th

作用： 

一般表头单元格位于表格的第一行或第一列，并且文本加粗居中

语法： 

只需用表头标签替代相应的单元格标签即可。

![](https://img-blog.csdnimg.cn/e8f5afdcf15a4db08fb96ea6812b1163.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=mbh2W&originHeight=394&originWidth=850&originalType=binary&ratio=1&status=done&style=none#id=dSh5X&originHeight=394&originWidth=850&originalType=binary&ratio=1&status=done&style=none)​


![](https://img-blog.csdnimg.cn/081710adb7ba4d8ba9028bcf8cda7547.png#id=YacPk&originHeight=184&originWidth=720&originalType=binary&ratio=1&status=done&style=none#id=m7sjO&originHeight=184&originWidth=720&originalType=binary&ratio=1&status=done&style=none)​

```html
<table width="500" border="1" align="center" cellspacing="0" cellpadding="0">
		<tr>  
			<th>姓名</th> 
			<th>性别</th>
			<th>电话</th>
		</tr>
		<tr>
			<td>小王</td>
			<td>女</td>
			<td>110</td>
		</tr>
		<tr>
			<td>小明</td>
			<td>男</td>
			<td>120</td>
		</tr>	
	</table>
```


> th 也是一个单元格   只不过和普通的 td单元格不一样，它会让自己里面的文字居中且加粗

## 3.4 表格标题caption

**定义和用法**


```html
<table>
   <caption>我是表格标题</caption>
</table>
```


**注意： **


1. caption 元素定义**表格标题**，通常这个标题会被居中且显示于表格之上。
2. caption 标签必须紧随 table 标签之后。
3. 这个标签只存在 表格里面才有意义。


## 3.5 合并单元格(难点)


合并单元格是我们比较常用的一个操作，但是不会合并的很复杂。


### 3.5.1 合并单元格2种方式


- 跨行合并：rowspan="合并单元格的个数"
- 跨列合并：colspan="合并单元格的个数"



![](https://img-blog.csdnimg.cn/5d91027b0e5e4099bb1a4e52416580bf.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=uiqBm&originHeight=385&originWidth=709&originalType=binary&ratio=1&status=done&style=none#id=oGvlQ&originHeight=385&originWidth=709&originalType=binary&ratio=1&status=done&style=none)


### 3.5.2 合并单元格顺序


> **合并的顺序我们按照   先上 后下     先左  后右 的顺序 **


### 3.5.3 合并单元格三步曲


1. 先确定是跨行还是跨列合并
2. 根据 先上 后下   先左  后右的原则找到目标单元格    然后写上 合并方式 还有 要合并的单元格数量  比如 ：
3. 删除多余的单元格 单元格



## 3.6 拓展阅读@


### 表格划分结构

> 对于比较复杂的表格，表格的结构也就相对的复杂了，所以又将表格分割成三个部分：题头、正文和脚注。而这三部分分别用:thead,tbody,tfoot来标注， 这样更好的分清表格结构


![](https://img-blog.csdnimg.cn/bb8ab3d0abf043d48342b1eaaec4c0bd.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=xfCx6&originHeight=600&originWidth=897&originalType=binary&ratio=1&status=done&style=none#id=sbEuA&originHeight=600&originWidth=897&originalType=binary&ratio=1&status=done&style=none)​


**注意：**


1. 用于定义表格的头部。用来放标题之类的东西。
2. 用于定义表格的主体。放数据本体 。
3. 放表格的脚注之类。
4. 以上标签都是放到table标签中。


# 4. 列表标签


前面我们知道表格一般用于数据展示的，但是网页中还是有很多跟表格类似的布局，如下图~~ 我们用什么做呢？


答案是列表， 那什么是列表？  表格是用来显示数据的，那么列表就是用来布局的。 因为非常整齐和自由

## 4.1 无序列表 ul 


无序列表的各个列表项之间没有顺序级别之分，是并列的。其基本语法格式如下：


```html
<ul>
  <li>列表项1</li>
  <li>列表项2</li>
  <li>列表项3</li>
  ......
</ul>
```


## 4.2  有序列表 ol 


有序列表即为有排列顺序的列表，其各个列表项按照一定的顺序排列定义，有序列表的基本语法格式如下：


```html
<ol>
  <li>列表项1</li>
  <li>列表项2</li>
  <li>列表项3</li>
  ......
</ol>
```


所有特性基本与ul 一致。  但是实际中比 无序列表 用的少很多。


## 4.3 自定义列表


定义列表常用于对术语或名词进行解释和描述，定义列表的列表项前没有任何项目符号。其基本语法如下：


```html
<dl>
  <dt>名词1</dt>
  <dd>名词1解释1</dd>
  <dd>名词1解释2</dd>
  ...
  <dt>名词2</dt>
  <dd>名词2解释1</dd>
  <dd>名词2解释2</dd>
  ...
</dl>
```



# 5. 表单标签


**作用： **


表单目的是为了收集用户信息。


在我们网页中， 我们也需要跟用户进行交互，收集用户资料，此时也需要表单。


> 在HTML中，一个完整的表单通常由表单控件（也称为表单元素）、提示信息和表单域3个部分构成。

**表单控件： **

> 包含了具体的表单功能项，如单行文本输入框、密码输入框、复选框、提交按钮、重置按钮等。

**提示信息：**

> 一个表单中通常还需要包含一些说明性的文字，提示用户进行填写和操作。

**表单域：**

> 他相当于一个容器，用来容纳所有的表单控件和提示信息，可以通过他定义处理表单数据所用程序的url地址，以及数据提交到服务器的方法。如果不定义表单域，表单中的数据就无法传送到后台服务器。


## 5.1 input 控件


- 语法：

```html
<input type="属性值" value="你好">
```


- 标签为单标签
- type属性设置不同的属性值用来指定不同的控件类型
- 除了type属性还有别的属性
- 常用属性：



![](https://img-blog.csdnimg.cn/860066439e4249b5b5a2df7ef1493e61.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=nmM5s&originHeight=460&originWidth=953&originalType=binary&ratio=1&status=done&style=none#id=Dn22o&originHeight=460&originWidth=953&originalType=binary&ratio=1&status=done&style=none)​


### 1. type 属性


- 这个属性通过改变值，可以决定了你属于那种input表单。
- 比如 type = 'text'  就表示 文本框 可以做 用户名， 昵称等。
- 比如 type = 'password'  就是表示密码框   用户输入的内容 是不可见的。

```html
用户名: <input type="text" /> 
密  码：<input type="password" />
```


### 2. value属性值


```html
用户名:<input type="text"  name="username" value="请输入用户名">
```


- value 默认的文本值。 有些表单想刚打开页面就默认显示几个文字，就可以通过这个value 来设置。

### 3. name属性


```html
用户名:<input type="text"  name=“username” />
```

> name表单的名字， 这样，后台可以通过这个name属性找到这个表单。  页面中的表单很多，name主要作用就是用于区别不同的表单。


- name属性后面的值，是我们自己定义的。
- radio  如果是一组，我们必须给他们命名相同的名字 name   这样就可以多个选其中的一个啦

```html
<input type="radio" name="sex"  />男
<input type="radio" name="sex" />女
```


- name属性，我们现在用的较少， 但是，当我们学ajax 和后台的时候，是必须的。

### 4. checked属性


- 表示默认选中状态。  较常见于 单选按钮和复选按钮。

```html
性    别:
<input type="radio" name="sex" value="男" checked="checked" />男
<input type="radio" name="sex" value="女" />女
```

> 上面这个，表示就默认选中了 男 这个单选按钮

## 5.2 label标签

**目标：**

> label标签主要目的是为了提高用户体验。 为用户提高最优秀的服务。

**概念：**

> label 标签为 input 元素定义标注（标签）。

**作用：**

> 用于绑定一个表单元素, 当点击label标签的时候, 被绑定的表单元素就会获得输入焦点。

**如何绑定元素呢？**


1. 第一种用法就是用label直接包括input表单。

```html
<label> 用户名： <input type="type" name="usename" value="请输入用户名">   </label>
```


2. 第二种用法 for 属性规定 label 与哪个表单元素绑定。

```html
<label for="sex">男</label>
<input type="radio" name="sex"  id="sex">
```


> 当我们鼠标点击 label标签里面的文字时， 光标会定位到指定的表单里面



## 5.3 textarea控件(文本域)


- 语法：

```html
<textarea >
  文本内容
</textarea>
```


- 作用：

  > 通过textarea控件可以轻松地创建多行文本输入框.cols="每行中的字符数" rows="显示的行数"  我们实际开发不用

## 5.4 select下拉列表


**语法：**


```html
<select>
  <option>选项1</option>
  <option>选项2</option>
  <option>选项3</option>
  ...
</select>
```


- 注意：

1.   中至少包含一对 option
2.   在option 中定义selected =" selected "时，当前项即为默认选中项。
3.   但是我们实际开发会用的比较少



# 6. form表单域

收集的用户信息怎么传递给服务器？

> 通过form表单域

目的：

> 在HTML中，form标签被用于定义表单域，以实现用户信息的收集和传递，form中的所有内容都会被提交给服务器。

**语法: **


```html
<form action="url地址" method="提交方式" name="表单名称">
  各种表单控件
</form>
```

**常用属性：**

> action:    url地址        用于指定接收并处理表单数据的服务器程序的url地址。
>
> method:     get/post        用于设置表单数据的提交方式，其取值为get或post。
>
> name:      名称  用于指定表单的名称，以区分同一个页面中的多个表单。

**注意:**


每个表单都应该有自己表单域。我们现在做页面，不写看不到效果，但是 如果后面学 ajax 后台交互的时候，必须需要 form表单域。



# 7. 高频面试题

## 1. src 和 href 的区别

src 和 href 都是**用来引用外部的资源**，它们的区别如下：

- **src：** 表示对资源的引用，它指向的内容会**嵌入**到当前标签所在的位置。src 会将其指向的资源下载并应⽤到⽂档内，如请求 js 脚本。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执⾏完毕，所以⼀般 js 脚本会放在页面底部。
- **href：** 表示超文本引用，它指向一些网络资源，**建立和当前元素或本文档的链接关系**。当浏览器识别到它指向的⽂件时，就会并⾏下载资源，不会停⽌对当前⽂档的处理。 常用在 a、link 等标签上。

> 简单来说，src 执行时会暂停其他资源的处理，href 不会



## 2. 对 HTML 语义化的理解

**语义化是指** 根据内容的结构化（内容语义化），选择合适的标签（代码语义化）。通俗来讲就是用正确的标签做正确的事情。

语义化的优点如下：

- 对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，有利于 SEO。除此之外，语义类还支持读屏软件，根据文章可以自动生成目录；
- 对开发者友好，使用语义类标签增强了可读性，结构更加清晰，开发者能清晰的看出网页的结构，便于团队的开发与维护。

常见的语义化标签：

```html
<header></header>  头部

<nav></nav>  导航栏

<section></section>  区块（有语义化的div）

<main></main>  主要区域

<article></article>  主要内容

<aside></aside>  侧边栏

<footer></footer>  底部
```



## 3. script 标签中 defer 和 async 的区别

如果没有 defer 或 async 属性，浏览器会立即加载并执行相应的脚本。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载。

下图可以直观的看出三者之间的区别:

![image.png](https://img-blog.csdnimg.cn/img_convert/6b279a7d2ae638d025dbb8a4a493103f.png)

其中蓝色代表 js 脚本网络加载时间，红色代表 js 脚本执行时间，绿色代表 html 解析。

**defer 和 async 属性都是去异步加载外部的 JS 脚本文件，它们都不会阻塞页面的解析**，其区别如下：

- **执行顺序**: 多个带 async 属性的标签，不能保证加载的顺序；多个带 defer 属性的标签，按照加载顺序执行；
- **脚本是否并行执行：**async 属性，当浏览器遇到 script 标签时，文档的解析不会停止，其他线程将下载脚本，脚本下载完成后开始执行脚本，脚本执行的过程中文档将停止解析，直到脚本执行完毕；defer 属性，加载后续文档的过程和 JS 脚本的加载(此时仅加载不执行)是并行进行的(异步——新开了个线程去加载脚本)，JS 脚本需要等到文档所有元素解析完成之后才执行，`DOMContentLoaded` 事件触发执行之前。

**推荐的应用场景**

**defer**

如果你的脚本代码依赖于页面中的DOM元素（文档是否解析完毕），或者被其他脚本文件依赖。

**async**

如果你的脚本并不关心页面中的DOM元素（文档是否解析完毕），并且也不会产生其他脚本需要的数据。

> **defer是“渲染完再执行”，async是“下载完就执行”**





## 4. HTML5 有哪些更新

### 1. 语义化标签

- header：定义文档的页眉（头部）；
- nav：定义导航链接的部分；
- footer：定义文档或节的页脚（底部）；
- article：定义文章内容；
- section：定义文档中的节（section、区段）；
- aside：定义其所处内容之外的内容（侧边）；

### 2. 媒体标签

（1） audio：音频

```html
<audio src='' controls autoplay loop='true'></audio>
```

属性：

- controls 控制面板
- autoplay 自动播放
- loop=‘true’ 循环播放

（2）video 视频

```html
<video src='' poster='imgs/aa.jpg' controls></video>
```

属性：

- poster：指定视频还没有完全下载完毕，或者用户还没有点击播放前显示的封面。默认显示当前视频文件的第一针画面，当然通过 poster 也可以自己指定。
- controls 控制面板
- width
- height

（3）source 标签

因为浏览器对视频格式支持程度不一样，为了能够兼容不同的浏览器，可以通过 source 来指定视频源。

```html
<video>
    <source src='aa.flv' type='video/flv'></source>
    <source src='aa.mp4' type='video/mp4'></source>
</video>
```

### 3. 表单

**表单类型：**

- email ：能够验证当前输入的邮箱地址是否合法
- url ： 验证 URL
- number ： 只能输入数字，其他输入不了，而且自带上下增大减小箭头，max 属性可以设置为最大值，min 可以设置为最小值，value 为默认值。
- search ： 输入框后面会给提供一个小叉，可以删除输入的内容，更加人性化。
- range ： 可以提供给一个范围，其中可以设置 max 和 min 以及 value，其中 value 属性可以设置为默认值
- color ： 提供了一个颜色拾取器
- time ： 时分秒
- date ： 日期选择年月日
- datetime ： 时间和日期
- datetime-local ：日期时间控件
- week ：周控件
- month：月控件

**表单属性：**

- placeholder ：提示信息

- autofocus ：自动获取焦点

- autocomplete=“on” 或者 autocomplete=“off” 使用这个属性需要有两个前提：

  * 表单必须提交过

  - 必须有 name 属性。

- required：要求输入框不能为空，必须有值才能够提交。

- pattern=" " 里面写入想要的正则模式，例如手机号 patte="^(+86)?\d{10}$"

- multiple：可以选择多个文件或者多个邮箱

- form=" form 表单的 ID"

**表单事件：**

- oninput 每当 input 里的输入框内容发生变化都会触发此事件。
- oninvalid 当验证不通过时触发此事件。

### 4. 进度条、度量器

- progress 标签：用来表示任务的进度（IE、Safari 不支持），max 用来表示任务的进度，value 表示已完成多少

- meter 属性：用来显示剩余容量或剩余库存（IE、Safari 不支持）

  * high/low：规定被视作高/低的范围

  - max/min：规定最大/小值
  - value：规定当前度量值

设置规则：min < low < high < max

### 5.DOM 查询操作

- `document.querySelector()`
- `document.querySelectorAll()`

它们选择的对象可以是标签，可以是类(需要加点)，可以是 ID(需要加#)

### 6. Web 存储

HTML5 提供了两种在客户端存储数据的新方法：

- localStorage - 没有时间限制的数据存储
- sessionStorage - 针对一个 session 的数据存储

### 7. 其他

- 拖放：拖放是一种常见的特性，即抓取对象以后拖到另一个位置。设置元素可拖放：

```html
<img draggable="true" />
```

- 画布（canvas ）： canvas 元素使用 JavaScript 在网页上绘制图像。画布是一个矩形区域，可以控制其每一像素。canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

- SVG：SVG 指可伸缩矢量图形，用于定义用于网络的基于矢量的图形，使用 XML 格式定义图形，图像在放大或改变尺寸的情况下其图形质量不会有损失，它是万维网联盟的标准
- 地理定位：Geolocation（地理定位）用于定位用户的位置。‘

**总结：**

（1）新增语义化标签：nav、header、footer、aside、section、article

（2）音频、视频标签：audio、video

（3）数据存储：localStorage、sessionStorage

（4）canvas（画布）、Geolocation（地理定位）、websocket（通信协议）

（5）input 标签新增属性：placeholder、autocomplete、autofocus、required

（6）history API：go、forward、back、pushstate





# 8. 中频面试题

## 1. DOCTYPE(文档类型) 的作用

DOCTYPE 是 HTML5 中一种标准通用标记语言的文档类型声明，它的目的是**告诉浏览器（解析器）应该以什么样（html 或 xhtml）的文档类型定义来解析文档**，不同的渲染模式会影响浏览器对 CSS 代码甚⾄ JavaScript 脚本的解析。它必须声明在 HTML ⽂档的第⼀⾏。

**HTML5** 声明

```html
<!DOCTYPE html>
```

**<!Doctype html>的作用：**`<!doctype html>` 的作用就是让浏览器进入标准模式，使用最新的 `HTML5` 标准来解析渲染页面；如果不写，浏览器就会进入混杂模式，我们需要避免此类情况发生。

**严格模式与混杂模式的区分：**

- **严格模式**： 又称为标准模式，指浏览器按照`W3C`标准解析代码；
- **混杂模式**： 又称怪异模式、兼容模式，是指浏览器用自己的方式解析代码。混杂模式通常模拟老式浏览器的行为，以防止老站点无法工作；

**删除<!DOCTYPE>会发生什么？**
在W3C标准出来之前，不同的浏览器对页面渲染有不同的标准，产生了一定的差异。这种渲染方式叫做混杂模式。在W3C标准出来之后，浏览器对页面的渲染有了统一的标准，这种渲染方式叫做标准模式。

**<!DOCTYPE>** 不存在或者形式不正确会导致HTML或XHTML文档以混杂模式呈现，就是把如何渲染html页面的权利交给了浏览器，有多少种浏览器就有多少种展示方式。因此要提高浏览器兼容性就必须重视 **<!DOCTYPE>**

## 2. 常用的 meta 标签有哪些

`meta` 标签由 `name` 和 `content` 属性定义，**用来描述网页文档的属性**，比如网页的作者，网页描述，关键词等，除了 HTTP 标准固定了一些`name`作为大家使用的共识，开发者还可以自定义 name。

常用的 meta 标签：

（1）`charset`，用来描述 HTML 文档的编码类型：

```html
<meta charset="UTF-8" >
```

（2） `keywords`，页面关键词：

```html
<meta name="keywords" content="关键词" />
```

（3）`description`，页面描述：

```html
<meta name="description" content="页面描述内容" />
```

（4）`refresh`，页面重定向和刷新：

```html
<meta http-equiv="refresh" content="0;url=" />
```

（5）`viewport`，适配移动端，可以控制视口的大小和比例：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

其中，`content` 参数有以下几种：

- `width viewport` ：宽度(数值/device-width)
- `height viewport` ：高度(数值/device-height)
- `initial-scale` ：初始缩放比例
- `maximum-scale` ：最大缩放比例
- `minimum-scale` ：最小缩放比例
- `user-scalable` ：是否允许用户缩放(yes/no）

（6）搜索引擎索引方式：

```html
<meta name="robots" content="index,follow" />
```

其中，`content` 参数有以下几种：

- `all`：文件将被检索，且页面上的链接可以被查询；
- `none`：文件将不被检索，且页面上的链接不可以被查询；
- `index`：文件将被检索；
- `follow`：页面上的链接可以被查询；
- `noindex`：文件将不被检索；
- `nofollow`：页面上的链接不可以被查询。



## 3. head 标签有什么作用，其中什么标签必不可少？

**作用**

- 用于定义文档的头部，它是所有头部元素的容器。
- 引用资源：脚本、样式表等。
- 描述文档：元信息、文档标题、在 Web 中的位置以及和其他文档的关系等
- 绝大多数文档头部包含的数据都不会真正作为内容显示给用户

**常见标签**

- `base`
- `link`
- `meta`
- `script`
- `style`
- `title`(唯一必需)
