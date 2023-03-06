﻿﻿﻿# 1. CSS复合选择器

## 子元素选择器

作用：

> 子元素选择器只能选择作为某元素**子元素(亲儿子)**的元素。 
>
> 其写法就是把父级标签写在前面，子级标签写在后面，中间跟一个 `>` 进行连接 

语法：

```css
.class>h3 {
	color:red;
	font-size:14px;
}
```


> 这里的子 指的是 亲儿子  不包含孙子 重孙子之类。

白话：


```css
比如：.demo > h3 {
    color: red;
}   说明  h3 一定是demo 亲儿子。demo 元素包含着h3。
```

## 交集选择器

条件:

> 交集选择器由两个选择器构成，找到的标签必须满足：既有标签一的特点，也有标签二的特点。 



![](https://img-blog.csdnimg.cn/64484c1a7fe14d679178317038d99efc.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=q5wbL&originHeight=346&originWidth=780&originalType=binary&ratio=1&status=done&style=none)​

其中第一个为标签选择器，第二个为class选择器，两个选择器之间**不能有空格**，如h3.special。

**记忆技巧：**


交集选择器 是 并且的意思。  即...又...的意思

> 比如：p.one   选择的是： 类名为 .one  的 段落标签。


## 并集选择器（重点）

任何形式的选择器（包括标签选择器、class类选择器id选择器等），都可以作为并集选择器的一部分。 

记忆技巧：
并集选择器通常用于集体声明  ，逗号隔开的，所有选择器都会执行后面样式，逗号可以理解为 和的意思。 



```css
比如  
.one, p , #test {
    color: #F00;
}  
表示   .one 和 p  和 #test 这三个选择器都会执行颜色为红色。 
通常用于集体声明。
```


## 链接伪类选择器


作用：

> 用于向某些选择器添加特殊的效果。比如给链接添加特殊效果， 比如可以选择 第1个，第n个元素。
>
> 因为伪类选择器很多，比如链接伪类，结构伪类等等。我们这里先给大家讲解链接伪类选择器。

```css
a:link      /_ 未访问的链接 _/ 
a:visited   /_ 已访问的链接 _/ 
a:hover     /_ 鼠标移动到链接上 _/ 
a:active    /_ 选定的链接 _/
```

**注意** 

因为叫链接伪类，所以都是 利用交集选择器  a:link    a:hover

因为a链接浏览器具有默认样式，所以我们实际工作中都需要给链接单独指定样式。

实际工作开发中，我们很少写全四个状态，一般我们写法如下：

```css
a {   
    /* a是标签选择器  所有的链接 */
	font-weight: 700;
	font-size: 16px;
	color: gray;
}
a:hover {   
    /* :hover 是链接伪类选择器 鼠标经过 */
	color: red; 
    /*  鼠标经过的时候，由原来的 灰色 变成了红色 */
}
```

## 伪元素选择器

```css
:before : 选择器在被选元素的内容前面插入内容
:after : 选择器在被选元素的内容后面插入内容
```



## 属性选择器

```css
[attribute] 选择带有attribute属性的元素
[attribute=value] 选择所有使用attribute=value的元素
[attribute~=value] 选择attribute属性包含value的元素
[attribute|=value]：选择attribute属性以value开头的元素
```



在`CSS3`中新增的选择器有如下：

- 层次选择器（p~ul），选择前面有p元素的每个ul元素
- 伪类选择器

```css
:first-of-type 父元素的首个元素
:last-of-type 父元素的最后一个元素
:only-of-type 父元素的特定类型的唯一子元素
:only-child 父元素中唯一子元素
:nth-child(n) 选择父元素中第N个子元素
:nth-last-of-type(n) 选择父元素中第N个子元素，从后往前
:last-child 父元素的最后一个元素
:root 设置HTML文档
:empty 指定空的元素
:enabled 选择被禁用元素
:disabled 选择被禁用元素
:checked 选择选中的元素
:not(selector) 选择非 <selector> 元素的所有元素
```

- 属性选择器

```css
[attribute*=value]：选择attribute属性值包含value的所有元素
[attribute^=value]：选择attribute属性开头为value的所有元素
[attribute$=value]：选择attribute属性结尾为value的所有元素
```



# 2. 标签显示模式（display）

## 块级元素(block-level)

例：

```html
常见的块元素有
<h1>~<h6>、<p>、<div>、<ul>、<ol>、<li>等，
其中<div>标签是最典型的块元素。
```

块级元素的特点

（1）自己独占一行

（2）高度，宽度、外边距以及内边距都可以控制。

（3）宽度默认是容器（父级宽度）的100%

（4）是一个容器及盒子，里面可以放行内或者块级元素。

注意： 

> 只有 文字才 能组成段落  因此 p  里面不能放块级元素，特别是 p 不能放div
>
> 同理还有这些标签h1,h2,h3,h4,h5,h6,dt，他们都是文字类块级标签，里面不能放其他块级元素。



## 行内元素(inline-level)

例：

```html
常见的行内元素有
<a>、<strong>、<b>、<em>、<i>、<s>、<ins>、<u>、<span>等，
其中<span>标签最典型的行内元素。有的地方也成内联元素
```

行内元素的特点：

（1）相邻行内元素在一行上，一行可以显示多个。

（2）高、宽直接设置是无效的。

（3）默认宽度就是它本身内容的宽度。

（4）**行内元素只能容纳文本或则其他行内元素。**


注意：

> 链接里面不能再放链接。
>
> 特殊情况a里面可以放块级元素，但是给a转换一下块级模式最安全。

## 行内块元素（inline-block）

例：

```css
在行内元素中有几个特殊的标签
<img />、<input />、<td>，
可以对它们设置宽高和对齐属性，有些资料可能会称它们为行内块元素。
```

行内块元素的特点：

（1）和相邻行内元素（行内块）在一行上,但是之间会有空白缝隙。一行可以显示多个

（2）默认宽度就是它本身内容的宽度。

（3）高度，行高、外边距以及内边距都可以控制。 

## 标签显示模式转换 display

块转行内：display:inline;

行内转块：display:block;

块、行内元素转换为行内块： display: inline-block;

此阶段，我们只需关心这三个，其他的是我们后面的工作。


# 3. CSS 背景(background)

## 背景颜色(color)

语法：  

```css
background-color: 颜色值;   
默认的值是 transparent  透明的
```


## 背景图片(image)

语法：

```css
background-image : none | url (url)
```

> none  无背景图（默认的）
>
> url  使用绝对或相对地址指定背景图像

```css
background-image : url(images/demo.png);
```

小技巧：  我们提倡 背景图片后面的地址，url不要加引号。

## 背景平铺（repeat）

语法：

```css
background-repeat : repeat | no-repeat | repeat-x | repeat-y
```

repeat        背景图像在纵向和横向上平铺（默认的）

no-repeat  背景图像不平铺

repeat-x     背景图像在横向上平铺

repeat-y     背景图像在纵向平铺

## 背景位置(position) 重点

语法：

```css
background-position : length || length

background-position : position || position
```

length  百分数

position  top

注意： 

> 必须先指定background-image属性
>
> position 后面是x坐标和y坐标。 可以使用方位名词或者 精确单位。
>
> 如果指定两个值，两个值都是方位名字，则两个值前后顺序无关，比如left  top和top  left效果一致
>
> 如果只指定了一个方位名词，另一个值默认居中对齐。
>
> 如果position 后面是精确坐标， 那么第一个，肯定是 x  第二的一定是y
>
> 如果只指定一个数值,那该数值一定是x坐标，另一个默认垂直居中
>
> 如果指定的两个值是 精确单位和方位名字混合使用，则第一个值是x坐标，第二个值是y坐标

**实际工作用的最多的，就是背景图片居中对齐了。**


## 背景附着

背景附着就是解释背景是滚动的还是固定的 

语法：  

```css
background-attachment : scroll | fixed
```

> scroll  背景图像是随对象内容滚动
>
> fixed  背景图像固定

## 背景简写

> background：属性的值的书写顺序官方并没有强制标准的。为了可读性，建议大家如下写：
>
> background: 背景颜色 背景图片地址 背景平铺 背景滚动 背景位置;

语法：

```css
background: transparent url(image.jpg) repeat-y  scroll center top ;
```


## 背景透明(CSS3)

语法：

```css
background: rgba(0, 0, 0, 0.3);
```

> 最后一个参数是alpha 透明度  取值范围 0~1之间
>
> 我们习惯把0.3 的 0 省略掉  这样写  background: rgba(0, 0, 0, .3);
>
> 注意：  背景半透明是指盒子背景半透明， 盒子里面的内容不受影响
>
> 因为是CSS3 ，所以 低于 ie9 的版本是不支持的。

# 4. CSS 三大特性

## CSS层叠性


![](https://img-blog.csdnimg.cn/99936f49eff748938dffcaa47f407995.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=BqkjX&originHeight=401&originWidth=1010&originalType=binary&ratio=1&status=done&style=none)​

概念：

> 所谓层叠性是指多种CSS样式的叠加。
> 是浏览器处理冲突的一个能力,如果一个属性通过两个相同选择器设置到同一个元素上，那么这个时候一个属性就会将另一个属性层叠掉 

原则： 

> 样式冲突，遵循的原则是**就近原则。** 那个样式离着结构近，就执行那个样式。
>
> 样式不冲突，不会层叠

## CSS继承性


![](https://img-blog.csdnimg.cn/df610f1bd50047689d2cf9a001a7c5e9.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=L4iTP&originHeight=404&originWidth=995&originalType=binary&ratio=1&status=done&style=none)​

概念：

> 子标签会继承父标签的某些样式，如文本颜色和字号。
> 想要设置一个可继承的属性，只需将它应用于父元素即可。 

**注意**： 

> 恰当地使用继承可以简化代码，降低CSS样式的复杂性。比如有很多子级孩子都需要某个样式，可以给父级指定一个，这些孩子继承过来就好了。
>
> 子元素可以继承父元素的样式（**text-，font-，line-这些元素开头的可以继承，以及color属性**）


## (*)CSS优先级（重点）


![](https://img-blog.csdnimg.cn/2a122334e6f34a7683fac6b3e87b1c24.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=G2aAf&originHeight=373&originWidth=994&originalType=binary&ratio=1&status=done&style=none)​

概念：

定义CSS样式时，经常出现两个或更多规则应用在同一元素上，此时， 选择器相同，则执行层叠性。选择器不同，就会出现优先级的问题。

### 1). 权重计算公式

关于CSS权重，我们需要一套计算公式来去计算

> 标签选择器                                                                           计算权重公式
>
> 继承或者 * ，后代选择器                                                           0,0,0,0
>
> 标签选择器，伪元素选择器(li::after)                                         0,0,0,1
>
> 每个类，伪类，属性选择器(a[ref="eee"])                                0,0,1,0
>
> 每个ID                                                                                          0,1,0,0
>
> 每个行内样式style=""                                                                 1,0,0,0
>
> 每个!important  重要的                                                            ∞ 无穷大

### 2). 权重叠加


我们经常用交集选择器，后代选择器等，是有多个基础选择器组合而成，那么此时，就会出现权重叠加。


就是一个简单的加法计算

> div ul  li   ------>      0,0,0,3
>
> .nav ul li   ------>      0,0,1,2
>
> a:hover      -----—>   0,0,1,1
>
> .nav a       ------>      0,0,1,1

注意：

数位之间没有进制 比如说： 0,0,0,5 + 0,0,0,5 =0,0,0,10 而不是 0,0, 1, 0， 所以不会存在10个div能赶上一个类选择器的情况。


# 5. 盒子模型

## 一、是什么

当对一个文档进行布局（layout）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）

一个盒子由四个部分组成：`content`、`padding`、`border`、`margin`

![image-20220726130633850](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726130633850.png)

`content`，即实际内容，显示文本和图像

`boreder`，即边框，围绕元素内容的内边距的一条或多条线，由粗细、样式、颜色三部分组成

`padding`，即内边距，清除内容周围的区域，内边距是透明的，取值不能为负，受盒子的`background`属性影响

`margin`，即外边距，在元素外创建额外的空白，空白通常指不能放其他元素的区域

上述是一个从二维的角度观察盒子，下面再看看看三维图：

![image-20220726130720860](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726130720860.png)

下面来段代码：

```html
<style>
  .box {
    width: 200px;
    height: 100px;
    padding: 20px;
  }
</style>
<div class="box">
  盒子模型
</div>
```

当我们在浏览器查看元素时，却发现元素的大小变成了`240px`

这是因为，在`CSS`中，盒子模型可以分成：

- W3C 标准盒子模型
- IE 怪异盒子模型

默认情况下，盒子模型为`W3C` 标准盒子模型



## 二、标准盒子模型

标准盒子模型，是浏览器默认的盒子模型

下面看看标准盒子模型的模型图：

![image-20220726130818823](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726130818823.png)



从上图可以看到：

- 盒子总宽度 = width + padding + border + margin;
- 盒子总高度 = height + padding + border + margin

也就是，`width/height` 只是内容高度，不包含 `padding` 和 `border`值

所以上面问题中，设置`width`为200px，但由于存在`padding`，但实际上盒子的宽度有240px



## 三、IE 怪异盒子模型

同样看看IE 怪异盒子模型的模型图：

![image-20220726130853484](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726130853484.png)

从上图可以看到：

- 盒子总宽度 = width + padding;
- 盒子总高度 = height + padding;

也就是，`width/height` 包含了 `padding`和 `border`值



## Box-sizing

CSS 中的 box-sizing 属性定义了引擎应该如何计算一个元素的总宽度和总高度

语法：

```
box-sizing: content-box|border-box|inherit:
```

- content-box 默认值，元素的 width/height 不包含padding，border，与标准盒子模型表现一致
- border-box 元素的 width/height 包含 padding，border，与怪异盒子模型表现一致
- inherit 指定 box-sizing 属性的值，应该从父元素继承

回到上面的例子里，设置盒子为 border-box 模型

```html
<style>
  .box {
    width: 200px;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
<div class="box">
  盒子模型
</div>
```

这时候，就可以发现盒子的所占据的宽度为200px









# 6. 说说em/px/rem/vh/vw的区别?

## 一、介绍

传统的项目开发中，我们只会用到`px`、`%`、`em`这几个单位，它可以适用于大部分的项目开发，且拥有比较良好的兼容性

从`CSS3`开始，浏览器对计量单位的支持又提升到了另外一个境界，新增了`rem`、`vh`、`vw`、`vm`等一些新的计量单位

利用这些新的单位开发出比较良好的响应式页面，适应多种不同分辨率的终端，包括移动设备等



## 二、单位

在`css`单位中，可以分为长度单位、绝对单位，如下表所指示

| CSS单位      |                                        |
| :----------- | :------------------------------------- |
| 相对长度单位 | em、ex、ch、rem、vw、vh、vmin、vmax、% |
| 绝对长度单位 | cm、mm、in、px、pt、pc                 |

这里我们主要讲述px、em、rem、vh、vw

### px

px，表示像素，所谓像素就是呈现在我们显示器上的一个个小点，每个像素点都是大小等同的，所以像素为计量单位被分在了绝对长度单位中

有些人会把`px`认为是相对长度，原因在于在移动端中存在设备像素比，`px`实际显示的大小是不确定的

这里之所以认为`px`为绝对单位，在于`px`的大小和元素的其他属性无关

### em

em是相对长度单位。相对于**当前对象**内文本的字体尺寸**(本身没有就对应父级)**。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸（`1em = 16px`）

为了简化 `font-size` 的换算，我们需要在`css`中的 `body` 选择器中声明`font-size`= `62.5%`，这就使 em 值变为 `16px*62.5% = 10px`

这样 `12px = 1.2em`, `10px = 1em`, 也就是说只需要将你的原来的`px` 数值除以 10，然后换上 `em`作为单位就行了

特点：

- em 的值并不是固定的
- em 会继承父级元素的字体大小
- em 是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸
- 任意浏览器的默认字体高都是 16px

举个例子

```html
<div class="big">
    我是14px=1.4rem
    <div class="small">我是12px=1.2rem</div>
</div>
```

样式为

```html
<style>
    html {font-size: 10px;  } /*  公式16px*62.5%=10px  */  
    .big{font-size: 1.4rem}
    .small{font-size: 1.2rem}
</style>
```

这时候`.big`元素的`font-size`为14px，而`.small`元素的`font-size`为12px

### rem

rem，相对单位，相对的只是HTML根元素`font-size`的值

同理，如果想要简化`font-size`的转化，我们可以在根元素`html`中加入`font-size: 62.5%`

```
html {font-size: 62.5%;  } /*  公式16px*62.5%=10px  */ 
```

这样页面中1rem=10px、1.2rem=12px、1.4rem=14px、1.6rem=16px;使得视觉、使用、书写都得到了极大的帮助

特点：

- rem单位可谓集相对大小和绝对大小的优点于一身
- 和em不同的是rem总是相对于根元素，而不像em一样使用级联的方式来计算尺寸

### vh、vw

vw ，就是根据窗口的宽度，分成100等份，100vw就表示满宽，50vw就表示一半宽。（vw 始终是针对窗口的宽），同理，`vh`则为窗口的高度

这里的窗口分成几种情况：

- 在桌面端，指的是浏览器的可视区域
- 移动端指的就是布局视口

像`vw`、`vh`，比较容易混淆的一个单位是`%`，不过百分比宽泛的讲是相对于父元素：

- 对于普通定位元素就是我们理解的父元素
- 对于position: absolute;的元素是相对于已定位的父元素
- 对于position: fixed;的元素是相对于 ViewPort（可视窗口）

## 三、总结

「px」：绝对单位，页面按精确像素展示

「em」：相对单位，基准点为父节点字体的大小，如果自身定义了`font-size`按自身来计算，整个页面内`1em`不是一个固定的值

「rem」：相对单位，可理解为`root em`, 相对根节点`html`的字体大小来计算

「vh、vw」：主要用于页面视口大小布局，在页面布局上更加方便简单









# 7. 插入图片和背景图片区别

插入图片 我们用的最多 比如产品展示类  移动位置只能靠盒模型 padding margin

背景图片我们一般用于小图标背景 或者 超大背景图片  背景图片 只能通过  background-position

```css
 img {  
		width: 200px;/* 插入图片更改大小 width 和 height */
		height: 210px;
		margin-top: 30px;  /* 插入图片更改位置 可以用margin 或padding  盒模型 */
		margin-left: 50px; /* 插入当图片也是一个盒子 */
	}

 div {
		width: 400px;
		height: 400px;
		border: 1px solid purple;
		background: #fff url(images/sun.jpg) no-repeat;
		background-position: 30px 50px; /* 背景图片更改位置 我用 background-position */
	}
```



# 8. 说说设备像素、css像素、设备独立像素、dpr、ppi 之间的区别？

## 一、背景

在`css`中我们通常使用px作为单位，在PC浏览器中`css`的1个像素都是对应着电脑屏幕的1个物理像素

这会造成一种错觉，我们会认为`css`中的像素就是设备的物理像素

但实际情况却并非如此，`css`中的像素只是一个抽象的单位，在不同的设备或不同的环境中，`css`中的1px所代表的设备物理像素是不同的

当我们做移动端开发时，同为1px的设置，在不同分辨率的移动设备上显示效果却有很大差异

这背后就涉及了css像素、设备像素、设备独立像素、dpr、ppi的概念



## 二、介绍

### CSS像素

CSS像素（css pixel, px）: 适用于web编程，在 CSS 中以 px 为后缀，是一个长度单位

在 CSS 规范中，长度单位可以分为两类，绝对单位以及相对单位

px是一个相对单位，相对的是设备像素（device pixel）

一般情况，页面缩放比为1，1个CSS像素等于1个设备独立像素

`CSS`像素又具有两个方面的相对性：

- 在同一个设备上，每1个 CSS 像素所代表的设备像素是可以变化的（比如调整屏幕的分辨率）
- 在不同的设备之间，每1个 CSS 像素所代表的设备像素是可以变化的（比如两个不同型号的手机）

在页面进行缩放操作也会 引起`css`中`px`的变化，假设页面放大一倍，原来的 1px 的东西变成 2px，在实际宽度不变的情况下1px 变得跟原来的 2px 的长度（长宽）一样了（元素会占据更多的设备像素）

假设原来需要 320px 才能填满的宽度现在只需要 160px

px会受到下面的因素的影响而变化：

- 每英寸像素（PPI）
- 设备像素比（DPR）

### 设备像素

设备像素（device pixels），又称为物理像素

指设备能控制显示的最小物理单位，不一定是一个小正方形区块，也没有标准的宽高，只是用于显示丰富色彩的一个“点”而已

可以参考公园里的景观变色彩灯，一个彩灯(物理像素)由红、蓝、绿小灯组成，三盏小灯不同的亮度混合出各种色彩

![image-20220726151333308](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726151333308.png)

从屏幕在工厂生产出的那天起，它上面设备像素点就固定不变了，单位为`pt`

### 设备独立像素

设备独立像素（Device Independent Pixel）：与设备无关的逻辑像素，代表可以通过程序控制使用的虚拟像素，是一个总体概念，包括了CSS像素

在`javaScript`中可以通过`window.screen.width/ window.screen.height` 查看

比如我们会说“电脑屏幕在 2560x1600分辨率下不适合玩游戏，我们把它调为 1440x900”，这里的“分辨率”（非严谨说法）指的就是设备独立像素

一个设备独立像素里可能包含1个或者多个物理像素点，包含的越多则屏幕看起来越清晰

至于为什么出现设备独立像素这种虚拟像素单位概念，下面举个例子：

iPhone 3GS 和 iPhone 4/4s 的尺寸都是 3.5 寸，但 iPhone 3GS 的分辨率是 320x480，iPhone 4/4s 的分辨率是 640x960

这意味着，iPhone 3GS 有 320 个物理像素，iPhone 4/4s 有 640 个物理像素

如果我们按照真实的物理像素进行布局，比如说我们按照 320 物理像素进行布局，到了 640 物理像素的手机上就会有一半的空白，为了避免这种问题，就产生了虚拟像素单位

我们统一 iPhone 3GS 和 iPhone 4/4s 都是 320 个虚拟像素，只是在 iPhone 3GS 上，最终 1 个虚拟像素换算成 1 个物理像素，在 iphone 4s 中，1 个虚拟像素最终换算成 2 个物理像素

至于 1 个虚拟像素被换算成几个物理像素，这个数值我们称之为设备像素比，也就是下面介绍的`dpr`

### dpr

dpr（device pixel ratio），设备像素比，代表设备独立像素到设备像素的转换关系，在`JavaScript`中可以通过 `window.devicePixelRatio` 获取

计算公式如下：

![image-20220726151524465](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726151524465.png)



当设备像素比为1:1时，使用1（1×1）个设备像素显示1个CSS像素

当设备像素比为2:1时，使用4（2×2）个设备像素显示1个CSS像素

当设备像素比为3:1时，使用9（3×3）个设备像素显示1个CSS像素

如下图所示：

![image-20220726151622221](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726151622221.png)



当`dpr`为3，那么`1px`的`CSS`像素宽度对应`3px`的物理像素的宽度，1px的`CSS`像素高度对应`3px`的物理像素高度

### ppi

ppi （pixel per inch），每英寸像素，表示每英寸所包含的像素点数目，更确切的说法应该是像素密度。数值越高，说明屏幕能以更高密度显示图像

计算公式如下：

![image-20220726151646467](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726151646467.png)





## 三、总结

无缩放情况下，1个CSS像素等于1个设备独立像素

设备像素由屏幕生产之后就不发生改变，而设备独立像素是一个虚拟单位会发生改变

PC端中，1个设备独立像素 = 1个设备像素 （在100%，未缩放的情况下）

在移动端中，标准屏幕（160ppi）下 1个设备独立像素 = 1个设备像素

设备像素比（dpr） = 设备像素 / 设备独立像素

每英寸像素（ppi），值越大，图像越清晰







# 9. CSS中，有哪些方式可以隐藏页面元素？区别?

## 一、前言

在平常的样式排版中，我们经常遇到将某个模块隐藏的场景

通过`css`隐藏元素的方法有很多种，它们看起来实现的效果是一致的

但实际上每一种方法都有一丝轻微的不同，这些不同决定了在一些特定场合下使用哪一种方法

## 二、实现方式

通过`css`实现隐藏元素方法有如下：

- display:none
- visibility:hidden
- opacity:0
- 设置height、width模型属性为0
- position:absolute

### display:none

设置元素的`display`为`none`是最常用的隐藏元素的方法

```css
.hide {
    display: none;
}
```

将元素设置为`display:none`后，元素在页面上将彻底消失

元素本身占有的空间就会被其他元素占有，也就是说它会导致浏览器的重排和重绘

消失后，自身绑定的事件不会触发，也不会有过渡效果

特点：元素不可见，不占据空间，无法响应点击事件

### visibility:hidden

设置元素的`visibility`为`hidden`也是一种常用的隐藏元素的方法

从页面上仅仅是隐藏该元素，DOM结果均会存在，只是当时在一个不可见的状态，不会触发重排，但是会触发重绘

```css
.hidden{
    visibility: hidden
}
```

给人的效果是隐藏了，所以他自身的事件不会触发

特点：元素不可见，占据页面空间，无法响应点击事件

### opacity:0

`opacity`属性表示元素的透明度，将元素的透明度设置为0后，在我们用户眼中，元素也是隐藏的

不会引发重排，一般情况下也会引发重绘

> ❝
>
> 如果利用 animation 动画，对 opacity 做变化（animation会默认触发GPU加速），则只会触发 GPU 层面的 composite，不会触发重绘
>
> ❞

```css
.transparent {
    opacity: 0;
}
```

由于其仍然是存在于页面上的，所以他自身的的事件仍然是可以触发的，但被他遮挡的元素是不能触发其事件的

需要注意的是：其子元素不能设置opacity来达到显示的效果

特点：改变元素透明度，元素不可见，占据页面空间，可以响应点击事件

### 设置height、width属性为0

将元素的`margin`，`border`，`padding`，`height`和`width`等影响元素盒模型的属性设置成0，如果元素内有子元素或内容，还应该设置其`overflow:hidden`来隐藏其子元素

```css
.hiddenBox {
    margin:0;     
    border:0;
    padding:0;
    height:0;
    width:0;
    overflow:hidden;
}
```

特点：元素不可见，不占据页面空间，无法响应点击事件

### position:absolute

将元素移出可视区域

```css
.hide {
   position: absolute;
   top: -9999px;
   left: -9999px;
}
```

特点：元素不可见，不影响页面布局

### 小结

最常用的还是`display:none`和`visibility:hidden`，其他的方式只能认为是奇招，它们的真正用途并不是用于隐藏元素，所以并不推荐使用它们

## 三、区别

关于`display: none`、`visibility: hidden`、`opacity: 0`的区别，如下表所示：

|                        | display: none | visibility: hidden | opacity: 0 |
| :--------------------- | :------------ | :----------------- | :--------- |
| 页面中                 | 不存在        | 存在               | 存在       |
| 重排                   | 会            | 不会               | 不会       |
| 重绘                   | 会            | 会                 | 不一定     |
| 自身绑定事件           | 不触发        | 不触发             | 可触发     |
| transition             | 不支持        | 支持               | 支持       |
| 子元素可复原           | 不能          | 能                 | 不能       |
| 被遮挡的元素可触发事件 | 能            | 能                 | 不能       |



# 10. 谈谈你对BFC的理解？

在理解BFC之前，我们需要先回顾标准流布局的概念

## **标准流**

* 标准流块元素独占一行
* 标准流块元素在垂直方向依次摆放
* 标准流块元素父子会产生外边距塌陷
* ....

## **BFC的概念**

理解完标准流后，我们介绍下BFC，什么是BFC？BFC全称为：Block **Formatting Context——块级格式化布局，简称BFC**，**它是一块独立的渲染区域，这个区域决定了标准流块元素的布局。** 也就是说，BFC是一块区域，作用是决定标准流块盒的布局。

通俗来讲：BFC 是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物品。如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外部影响。

BFC目的是形成一个相对于外界完全独立的空间，让内部的子元素不会影响到外部的元素

## **BFC的创建**

BFC由某个HTML元素创建，下列元素会在其内部创建BFC区域。

- 根元素：body；
- 元素设置浮动：float 除 none 以外的值；
- 元素设置绝对定位：position (absolute、fixed)；
- display 值为：inline-block、table-cell、table-caption、flex 等；
- overflow 值为：hidden、auto、scroll；

**BFC 的特点：**

- 垂直方向上，自上而下排列，和文档流的排列方式一致。
- 在 BFC 中上下相邻的两个容器的 margin 会重叠
- 计算 BFC 的高度时，需要计算浮动元素的高度
- BFC 区域不会与浮动的容器发生重叠
- BFC 是独立的容器，容器内部元素不会影响外部元素
- 每个元素的左 margin 值和容器的左 border 相接触




## 应用场景

利用`BFC`的特性，我们将`BFC`应用在以下场景：

### 防止margin重叠（塌陷）

```html
<style>
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>
<body>
    <p>Haha</p>
    <p>Hehe</p>
</body>
```

页面显示如下：

![image-20220726153834982](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726153834982.png)

两个`p`元素之间的距离为`100px`，发生了`margin`重叠（塌陷），以最大的为准，如果第一个P的`margin`为80的话，两个P之间的距离还是100，以最大的为准。

前面讲到，同一个`BFC`的俩个上下相邻的盒子的`margin`会发生重叠

可以在`p`外面包裹一层容器，并触发这个容器生成一个`BFC`，那么两个`p`就不属于同一个`BFC`，则不会出现`margin`重叠

```html
<style>
    .wrap {
        overflow: hidden;// 新的BFC
    }
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>
<body>
    <p>Haha</p>
    <div class="wrap">
        <p>Hehe</p>
    </div>
</body>
```

这时候，边距则不会重叠：

![image-20220726154104950](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726154104950.png)

### 清除内部浮动

```html
<style>
    .par {
        border: 5px solid #fcc;
        width: 300px;
    }
 
    .child {
        border: 5px solid #f66;
        width:100px;
        height: 100px;
        float: left;
    }
</style>
<body>
    <div class="par">
        <div class="child"></div>
        <div class="child"></div>
    </div>
</body>
```

页面显示如下：

![image-20220726154154926](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726154154926.png)

而`BFC`在计算高度时，浮动元素也会参与，所以我们可以触发`.par`元素生活才能`BFC`，则内部浮动元素计算高度时候也会计算，不然内部元素会影响外部元素。

```css
.par {
    overflow: hidden;
}
```

实现效果如下：

![image-20220726154326623](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726154326623.png)

### 自适应多栏布局

这里举个两栏的布局

```html
<style>
    body {
        width: 300px;
        position: relative;
    }
 
    .aside {
        width: 100px;
        height: 150px;
        float: left;
        background: #f66;
    }
 
    .main {
        height: 200px;
        background: #fcc;
    }
</style>
<body>
    <div class="aside"></div>
    <div class="main"></div>
</body>
```

效果图如下：

![image-20220726154456093](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726154456093.png)

前面讲到，每个元素的左外边距与包含块的左边界相接触

因此，虽然`.aslide`为浮动元素，但是`main`的左边依然会与包含块的左边相接触

而`BFC`的区域不会与浮动盒子重叠

所以我们可以通过触发`main`生成`BFC`，以此适应两栏布局

```css
.main {
    overflow: hidden;
}
```

这时候，新的`BFC`不会与浮动的`.aside`元素重叠。因此会根据包含块的宽度，和`.aside`的宽度，自动变窄

效果如下：

![image-20220726154729159](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726154729159.png)

## 小结

可以看到上面几个案例，都体现了`BFC`实际就是页面一个独立的容器，里面的子元素不影响外面的元素








# (*)11. 清除浮动


## 为什么要清除浮动


因为父级盒子很多情况下，不方便给高度，但是子盒子浮动就不占有位置，最后父级盒子高度为0，就影响了下面的标准流盒子。


![](https://img-blog.csdnimg.cn/c9af2e7adfea47019d0d2f15282f05cf.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=K4ou1&originHeight=457&originWidth=803&originalType=binary&ratio=1&status=done&style=none)​


![](https://img-blog.csdnimg.cn/2af829eb70384474b7b3ffe66047c4b0.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=TVJ1t&originHeight=288&originWidth=805&originalType=binary&ratio=1&status=done&style=none)​

总结： 

> 由于浮动元素不再占用原文档流的位置，所以它会对后面的元素排版产生影响

> 准确地说，并不是清除浮动，而是**清除浮动后造成的影响**



## 清除浮动本质

> 清除浮动主要为了解决父级元素因为子级浮动引起内部高度为0 的问题。清除浮动之后， 父级就会根据浮动的子盒子自动检测高度。父级有了高度，就不会影响下面的标准流了


## 清除浮动的方法

语法：

```css
选择器 {
    clear:属性值;
}   
clear 清除
```

| 属性值 | 描述                                       |
| ------ | ------------------------------------------ |
| left   | 不允许左侧有浮动元素（清除左侧浮动的影响） |
| right  | 不允许右侧有浮动元素（清除右侧浮动的影响） |
| both   | 同时清除左右两侧浮动的影响                 |

但是我们实际工作中， 几乎只用 clear: both;


### 1).额外标签法(隔墙法)


```html
是W3C推荐的做法是通过在浮动元素末尾添加一个空的标签例如 
<div style=”clear:both”></div>，或则其他标签br等亦可。
```

优点：

> 通俗易懂，书写方便

缺点： 

> 添加许多无意义的标签，结构化较差。



### 2).父级添加overflow属性方法


```css
可以给父级添加： 
overflow为 hidden| auto| scroll  都可以实现。
```

优点：  

> 代码简洁

缺点：  

> 内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素。


### 3).使用after伪元素清除浮动


**:after 方式为空元素额外标签法的升级版，好处是不用单独加标签了**


使用方法：


```css
 .clearfix:after {  
     content: ""; 
     display: block; 
     height: 0; 
     clear: both; 
     visibility: hidden;  
}   
.clearfix {*zoom: 1;}   /* IE6、7 专有 */
```

优点： 

> 符合闭合浮动思想  结构语义化正确

缺点： 

> 由于IE6-7不支持:after，使用 zoom:1触发 hasLayout。

代表网站：

> 百度、淘宝网、网易等



### 4).使用双伪元素清除浮动


使用方法：


```css
.clearfix:before,.clearfix:after { 
  content:"";
  display:table; 
}
.clearfix:after {
 clear:both;
}
.clearfix {
  *zoom:1;
}
```

优点：  

> 代码更简洁 

缺点：  

> 由于IE6-7不支持:after，使用 zoom:1触发 hasLayout。 

代表网站： 

> 小米、腾讯等 



**清除浮动案例**

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		/*声明清除浮动的样式*/
		.clearfix:after {
			content: "";
			display: block;
			height: 0;
			visibility: hidden;
			clear: both;
		}
		.clearfix {
			*zoom: 1;  /*ie6,7 专门清除浮动的样式*/
		}
		/*很多情况下，我们的父盒子，不方便给高度  根据内容撑开，有多少内容，我的父盒子就有多高*/
		.one {
			width: 500px;
			/*background-color: pink;*/
			border: 1px  solid red;
			
		}
		/*因为damao 二毛 浮动了，不占有位置， 而父级又没有高度， 所以two 就到底下去了*/
		.damao {
			float: left;
			width: 200px;
			height: 200px;
			background-color: purple;
		}
		.ermao {
			float: left;
			width: 250px;
			height: 250px;
			background-color: skyblue;
		}
		.two {
			width: 700px;
			height: 150px;
			background-color: #000;
		}

	</style>
</head>
<body>
	<div class="one clearfix">
		<div class="damao"></div>
		<div class="ermao"></div>
	</div>
	<div class="two"></div>
</body>
</html>
```

# 12. 定位(position)


## 定位详解


定位也是用来布局的，它有两部分组成：


> `定位 = 定位模式 + 边偏移`

### 边偏移


简单说， 我们定位的盒子，是通过边偏移来移动位置的。

在 CSS 中，通过 `top`、`bottom`、`left` 和 `right` 属性定义元素的**边偏移**：（方位名词）

定位的盒子有了边偏移才有价值。 一般情况下，凡是有定位地方必定有边偏移。


### 定位模式 (position)


在 CSS 中，通过 `position` 属性定义元素的**定位模式**，语法如下：


```css
选择器 { 
    position: 属性值; 
}
```

定位模式是有不同分类的，在不同情况下，我们用到不同的定位模式。

值                                                   语义

`static`                                     **静态**定位

`relative`                                 **相对**定位

`absolute`                                 **绝对**定位

`fixed`                                        **固定**定位



![](https://img-blog.csdnimg.cn/f85a9387b536436fbe3d901be5e3b65a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_17,color_FFFFFF,t_70,g_se,x_16#id=rnCrK&originHeight=310&originWidth=535&originalType=binary&ratio=1&status=done&style=none)



#### 相对定位(relative) - 重要

**相对定位**是元素**相对**于它  原来在标准流中的位置 来说的。（自恋型）

相对定位的特点：（务必记住）

> 相对于 自己原来在标准流中位置来移动的

> 原来**在标准流的区域继续占有**，后面的盒子仍然以标准流的方式对待它。



#### 绝对定位(absolute) - 重要

**绝对定位**是元素以带有定位的父级元素来移动位置 


1.  **完全脱标** —— 完全不占位置； 
2.  **父元素没有定位**，则以**浏览器**为准定位（Document 文档）。
    ![](https://img-blog.csdnimg.cn/ff9117de7b974063977b1941bfce9476.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#height=443&id=yVVce&originHeight=613&originWidth=969&originalType=binary&ratio=1&status=done&style=none&width=700)
3.  **父元素要有定位**
    将元素依据最近的已经定位（绝对、固定或相对定位）的父元素（祖先）进行定位。 



![](https://img-blog.csdnimg.cn/7c0f8985e4974ee48b6f53d92663504f.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=VEd1t&originHeight=574&originWidth=912&originalType=binary&ratio=1&status=done&style=none)


#### 固定定位(fixed) - 重要

**固定定位**是**绝对定位**的一种特殊形式：


1. **完全脱标** —— 完全不占位置；

2. 只认**浏览器的可视窗口** —— `浏览器可视窗口 + 边偏移属性` 来设置元素的位置； 

   > 跟父元素没有任何关系；单独使用的

   > 不随滚动条滚动。



## 定位(position)的扩展

### 绝对定位的盒子居中


> **注意**：**绝对定位/固定定位的盒子**不能通过设置 `margin: auto` 设置**水平居中**。



在使用**绝对定位**时要想实现水平居中，可以按照下图的方法：


![](https://img-blog.csdnimg.cn/99b91d8f1a5c4e08b6d045cb64ec5499.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=QY06e&originHeight=260&originWidth=732&originalType=binary&ratio=1&status=done&style=none)


1. `left: 50%;`：让**盒子的左侧**移动到**父级元素的水平中心位置**；
2. `margin-left: -100px;`：让盒子**向左**移动**自身宽度的一半**。



> 案例演示：相对定位案例。



### 盒子居中定位示意图


![](https://img-blog.csdnimg.cn/6d68230d19c042c2ad957d73020bc5bf.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=I62J2&originHeight=370&originWidth=731&originalType=binary&ratio=1&status=done&style=none)



```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>绝对定位的盒子水平居中对齐</title>
	<style>
		div {
			/*绝对定位 margin 左右auto 不能让盒子水平居中*/
			position: absolute;
			/*1.left 50% 走父亲宽度的一半*/	
			left: 50%;
			/*2.margin-left 左走自己宽度的一半  一定注意是 负值*/
			margin-left: -100px;
			width: 200px;
			height: 200px;
			background-color: pink;
			/*标准流 margin 左右auto 就可以让盒子水平居中*/
			/*margin: auto;*/
		}
	</style>
</head>
<body>
	<div></div>
</body>
</html>
```



### 堆叠顺序（z-index）


在使用**定位**布局时，可能会**出现盒子重叠的情况**。


加了定位的盒子，默认**后来者居上**， 后面的盒子会压住前面的盒子。


应用 `z-index` 层叠等级属性可以**调整盒子的堆叠顺序**。如下图所示：


![](https://img-blog.csdnimg.cn/56d39c54d9a742c4986d15787deb13b8.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#id=zdmH4&originHeight=226&originWidth=735&originalType=binary&ratio=1&status=done&style=none)

`z-index` 的特性如下：


1. **属性值**：**正整数**、**负整数**或 **0**，默认值是 0，数值越大，盒子越靠上；
2. 如果**属性值相同**，则按照书写顺序，**后来居上**；
3. **数字后面不能加单位**。



**注意**：`z-index` 只能应用于**相对定位**、**绝对定位**和**固定定位**的元素，其他**标准流**、**浮动**和**静态定位**无效。

### 定位改变display属性


前面我们讲过， display 是 显示模式， 可以改变显示模式有以下方式:

> 可以用inline-block  转换为行内块

> 可以用浮动 float 默认转换为行内块（类似，并不完全一样，因为浮动是脱标的）

> 绝对定位和固定定位也和浮动类似， 默认转换的特性 转换为行内块。



所以说， 一个行内的盒子，如果加了**浮动**、**固定定位**和**绝对定位**，不用转换，就可以给这个盒子直接设置宽度和高度等。

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		div {
			/*块级元素 不给width 默认通栏显示*/
			/*1. 利用 display inline-block*/
			/*display: inline-block;*/
			/*行内块不给width 默认的宽度就是内容的宽度*/
			/*2. 浮动 也能转换*/
			/*float: left;*/
			/*3. 绝对定位（固定定位） 也能转换*/
			position: absolute;
			height: 100px;
			background-color: pink;
		}
		span {
			position: absolute;
			top: 200px;
			left: 200px;
			width: 300px;
			height: 300px;
			background-color: purple;
		}
	</style>
</head>
<body>
	<div>天王盖地虎， 导师一米五</div>
	<span></span>
</body>
</html>
```



**同时注意：**


浮动元素、绝对定位(固定定位）元素的都不会触发外边距合并的问题。 （我们以前是用padding border overflow解决的）


也就是说，我们给盒子改为了浮动或者定位，就不会有垂直外边距合并的问题了。

## 定位小结

| 定位模式         | 是否脱标占有位置     | 移动位置基准           | 模式转换（行内块） | 使用情况                 |
| ---------------- | -------------------- | ---------------------- | ------------------ | ------------------------ |
| 静态static       | 不脱标，正常模式     | 正常模式               | 不能               | 几乎不用                 |
| 相对定位relative | 不脱标，占有位置     | 相对自身位置移动       | 不能               | 基本单独使用             |
| 绝对定位absolute | 完全脱标，不占有位置 | 相对于定位父级移动位置 | 能                 | 要和定位父级元素搭配使用 |
| 固定定位fixed    | 完全脱标，不占有位置 | 相对于浏览器移动位置   | 能                 | 单独使用，不需要父级     |



**注意**：


1. **边偏移**需要和**定位模式**联合使用，**单独使用无效**；
2. `top` 和 `bottom` 不要同时使用；
3. `left` 和 `right` 不要同时使用。



# 13. 说说flexbox（弹性盒布局模型）,以及适用场景？

## 一、是什么

`Flexible Box` 简称 `flex`，意为”弹性布局”，可以简便、完整、响应式地实现各种页面布局

采用Flex布局的元素，称为`flex`容器`container`

它的所有子元素自动成为容器成员，称为`flex`项目`item`

![image-20220726162537294](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726162537294.png)

容器中默认存在两条轴，主轴和交叉轴，呈90度关系。项目默认沿主轴排列，通过`flex-direction`来决定主轴的方向

每根轴都有起点和终点，这对于元素的对齐非常重要

## 二、属性

关于`flex`常用的属性，我们可以划分为容器属性和容器成员属性

容器属性有：

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content



### flex-direction

决定主轴的方向(即项目的排列方向)

```css
.container {   
    flex-direction: row | row-reverse | column | column-reverse;  
} 
```

属性对应如下：

- row（默认值）：主轴为水平方向，起点在左端
- row-reverse：主轴为水平方向，起点在右端
- column：主轴为垂直方向，起点在上沿。
- column-reverse：主轴为垂直方向，起点在下沿

如下图所示：

![image-20220726162755061](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220726162755061.png)



### flex-wrap

弹性元素永远沿主轴排列，那么如果主轴排不下，通过`flex-wrap`决定容器内项目是否可换行

```css
.container {  
    flex-wrap: nowrap | wrap | wrap-reverse;
}  
```

属性对应如下：

- nowrap（默认值）：不换行
- wrap：换行，第一行在上方
- wrap-reverse：换行，第一行在下方

默认情况是不换行，但这里也不会任由元素直接溢出容器，会涉及到元素的弹性伸缩



### flex-flow

是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```



### justify-content

定义了项目在主轴上的对齐方式

```css
.box {
    justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

属性对应如下：

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center：居中
- space-between：两端对齐，项目之间的间隔都相等
- space-around：两个项目两侧间隔相等

效果图如下：

![image-20220727141515483](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220727141515483.png)



### align-items

定义项目在交叉轴上如何对齐

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

属性对应如下：

- flex-start：交叉轴的起点对齐
- flex-end：交叉轴的终点对齐
- center：交叉轴的中点对齐
- baseline: 项目的第一行文字的基线对齐
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度



### align-content

定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

```css
.box {
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

属性对应如吓：

- flex-start：与交叉轴的起点对齐
- flex-end：与交叉轴的终点对齐
- center：与交叉轴的中点对齐
- space-between：与交叉轴两端对齐，轴线之间的间隔平均分布
- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
- stretch（默认值）：轴线占满整个交叉轴

效果图如下：

![image-20220727141738753](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220727141738753.png)

容器成员属性如下：

- `order`
- `flex-grow`
- `flex-shrink`
- `flex-basis`
- `flex`
- `align-self`



### order

定义项目的排列顺序。数值越小，排列越靠前，默认为0

```css
.item {
    order: <integer>;
}
```

### flex-grow

上面讲到当容器设为`flex-wrap: nowrap;`不换行的时候，容器宽度有不够分的情况，弹性元素会根据`flex-grow`来决定

定义项目的放大比例（容器宽度>元素总宽度时如何伸展）

默认为`0`，即如果存在剩余空间，也不放大

```
.item {
    flex-grow: <number>;
}
```

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）

![image-20220727141858033](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220727141858033.png)

如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍

![image-20220727142104189](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220727142104189.png)

弹性容器的宽度正好等于元素宽度总和，无多余宽度，此时无论`flex-grow`是什么值都不会生效

### flex-shrink

定义了项目的缩小比例（容器宽度<元素总宽度时如何收缩），默认为1，即如果空间不足，该项目将缩小

```css
.item {
    flex-shrink: <number>; /* default 1 */
}
```

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小

如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小

![image-20220727142314010](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220727142314010.png)

在容器宽度有剩余时，`flex-shrink`也是不会生效的

### flex-basis

设置的是元素在主轴上的初始尺寸，所谓的初始尺寸就是元素在`flex-grow`和`flex-shrink`生效前的尺寸

浏览器根据这个属性，计算主轴是否有多余空间，默认值为`auto`，即项目的本来大小，如设置了`width`则元素尺寸由`width/height`决定（主轴方向），没有设置则由内容决定

```css
.item {
   flex-basis: <length> | auto; /* default auto */
}
```

当设置为0的是，会根据内容撑开

它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间



### flex

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`，也是比较难懂的一个复合属性

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

一些属性有：

- flex: 1 = flex: 1 1 0%
- flex: 2 = flex: 2 1 0%
- flex: auto = flex: 1 1 auto
- flex: none = flex: 0 0 auto，常用于固定尺寸不伸缩

`flex:1` 和 `flex:auto` 的区别，可以归结于`flex-basis:0`和`flex-basis:auto`的区别

当设置为0时（绝对弹性元素），此时相当于告诉`flex-grow`和`flex-shrink`在伸缩的时候不需要考虑我的尺寸

当设置为`auto`时（相对弹性元素），此时则需要在伸缩时将元素尺寸纳入考虑

注意：建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值



### align-self

允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性

默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`

```css
.item {
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

效果图如下：

![image-20220727142549377](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220727142549377.png)

## 三、应用场景

在以前的文章中，我们能够通过`flex`简单粗暴的实现元素水平垂直方向的居中，以及在两栏三栏自适应布局中通过`flex`完成，这里就不再展开代码的演示

包括现在在移动端、小程序这边的开发，都建议使用`flex`进行布局



# (*)14. 介绍一下CSS中的Grid网格布局?

`Grid` 布局即网格布局，是一种新的 `CSS` 布局模型，比较擅长将一个页面划分为几个主要区域，以及定义这些区域的大小、位置、层次等关系。号称是最强大的的 `CSS` 布局方案，是目前唯一一种 `CSS` 二维布局。利用 `Grid` 布局，我们可以轻松实现类似下图布局，[演示地址](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/qBbveKB%3Feditors%3D1100)



![preview](https://pic4.zhimg.com/v2-33e0b6ebf2d1e2da6ebbe01f7541d9bb_r.jpg)

## **Grid 布局和 flex 布局**

讲到布局，我们就会想到 `flex` 布局，甚至有人认为竟然有 `flex` 布局了，似乎没有必要去了解 `Grid` 布局。但 `flex` 布局和 `Grid` 布局有实质的区别，那就是 **`flex` 布局是一维布局，`Grid` 布局是二维布局**。`flex` 布局一次只能处理一个维度上的元素布局，一行或者一列。`Grid` 布局是将容器划分成了“行”和“列”，产生了一个个的网格，我们可以将网格元素放在与这些行和列相关的位置上，从而达到我们布局的目的。

**`Grid` 布局远比 `flex` 布局强大！**

flex布局示例:

![img](https://pic1.zhimg.com/80/v2-168ed445ec0553b59457a97e038779e0_720w.png)

Grid 布局示例：

![img](https://pic4.zhimg.com/80/v2-47623a9dfb35384f8a041feb5bd14317_720w.png)

## **Grid 的一些基础概念**

我们使用 Grid 实现一个小例子，演示 Grid 的一些基础概念，[演示地址](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/QWyoexm%3Feditors%3D1100)

```html
<div class="wrapper">
  <div class="one item">One</div>
  <div class="two item">Two</div>
  <div class="three item">Three</div>
  <div class="four item">Four</div>
  <div class="five item">Five</div>
  <div class="six item">Six</div>
</div>

.wrapper {
  margin: 60px;
  /* 声明一个容器 */
  display: grid;
  /*  声明列的宽度  */
  grid-template-columns: repeat(3, 200px);
  /*  声明行间距和列间距  */
  grid-gap: 20px;
  /*  声明行的高度  */
  grid-template-rows: 100px 200px;
}
.one {
  background: #19CAAD;
}
.two { 
  background: #8CC7B5;
}
.three {
  background: #D1BA74;
}
.four {
  background: #BEE7E9;
}
.five {
  background: #E6CEAC;
}
.six {
  background: #ECAD9E;
}
.item {
  text-align: center;
  font-size: 200%;
  color: #fff;
}
```

![img](https://pic3.zhimg.com/80/v2-81f5a8dbfd0f8a31ecc0d8879ae730f2_720w.jpg)

容器和项目：我们通过在元素上声明 `display：grid` 或 `display：inline-grid` 来创建一个网格容器。一旦我们这样做，这个元素的所有直系子元素将成为网格项目。比如上面 `.wrapper` 所在的元素为一个网格容器，其直系子元素将成为网格项目。

网格轨道：`grid-template-columns` 和 `grid-template-rows` 属性来定义网格中的行和列。容器内部的水平区域称为行，垂直区域称为列。上图中 `One`、`Two`、`Three` 组成了一行，`One`、`Four` 则是一列

![img](https://pic2.zhimg.com/80/v2-24525fded84d66544632afd2904c206d_720w.jpg)

网格单元：一个网格单元是在一个网格元素中最小的单位， 从概念上来讲其实它和表格的一个单元格很像。上图中 `One`、`Two`、`Three`、`Four`...都是一个个的网格单元

网格线：划分网格的线，称为"网格线"。应该注意的是，当我们定义网格时，我们定义的是网格轨道，而不是网格线。Grid 会为我们创建编号的网格线来让我们来定位每一个网格元素。m 列有 m + 1 根垂直的网格线，n 行有 n + 1 跟水平网格线。比如上图示例中就有 4 根垂直网格线。一般而言，是从左到右，从上到下，1，2，3 进行编号排序。当然也可以从右到左，从下到上，按照 -1，-2，-3...顺序进行编号排序

![img](https://pic3.zhimg.com/80/v2-56af8506c39a989518225d34ef9f61fa_720w.jpg)

## **容器属性介绍**

`Grid` 布局相关的属性以及值众多，需要记忆的不少，建议可以跟 `demo` 一起结合起来，边敲代码边理解，再利用一些空闲时间记忆一下。笔者会在介绍每个属性的时候，做个小 `demo` 演示，建议大家可以自己修改看看效果加深记忆

`Grid` 布局属性可以分为两大类，一类是容器属性，一类是项目属性。我们先来看容器属性

### **display 属性**

[display 属性演示](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/wvMZwqY)

我们通过在元素上声明 `display：grid` 或 `display：inline-grid` 来创建一个网格容器。声明 `display：grid` 则该容器是一个块级元素，设置成 `display: inline-grid` 则容器元素为行内元素

```css
.wrapper {
  display: grid;
}
```

![img](https://pic4.zhimg.com/80/v2-6a30fc1e6edcb6114ae89d34162da12f_720w.jpg)

```css
.wrapper-1 {
  display: inline-grid;
}
```

![img](https://pic2.zhimg.com/80/v2-79acfe9ee3812af2cc162dfbb830fbb5_720w.jpg)

### **grid-template-columns 属性和 grid-template-rows 属性**

[grid-template-columns 和 grid-template-rows 属性演示地址](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/BajEBYq%3Feditors%3D1100)

`grid-template-columns` 属性设置列宽，`grid-template-rows` 属性设置行高，这两个属性在 `Grid` 布局中尤为重要，它们的值是有多种多样的，而且它们的设置是比较相似的，下面针对 `grid-template-columns` 属性进行讲解

**固定的列宽和行高**

```css
.wrapper {
  display: grid;
  /*  声明了三列，宽度分别为 200px 100px 200px */
  grid-template-columns: 200px 100px 200px;
  grid-gap: 5px;
  /*  声明了两行，行高分别为 50px 50px  */
  grid-template-rows: 50px 50px;
}
```

以上表示固定列宽为 200px 100px 200px，行高为 50px 50px

![img](https://pic1.zhimg.com/80/v2-a72a30faf3c8c10defeda087ec3452a4_720w.jpg)

**repeat() 函数**：可以简化重复的值。该函数接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值。比如上面行高都是一样的，我们可以这么去实现，实际效果是一模一样的

```css
.wrapper-1 {
  display: grid;
  grid-template-columns: 200px 100px 200px;
  grid-gap: 5px;
  /*  2行，而且行高都为 50px  */
  grid-template-rows: repeat(2, 50px);
}
```

**auto-fill 关键字**：表示自动填充，让一行（或者一列）中尽可能的容纳更多的单元格。`grid-template-columns: repeat(auto-fill, 200px)` 表示列宽是 200 px，但列的数量是不固定的，只要浏览器能够容纳得下，就可以放置元素，代码以及效果如下图所示：

```css
.wrapper-2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
```

![动图封面](https://pic4.zhimg.com/v2-18b04dd95f90539b9a6b3ca3987b3573_b.jpg)



**fr 关键字**：`Grid` 布局还引入了一个另外的长度单位来帮助我们创建灵活的网格轨道。`fr` 单位代表网格容器中可用空间的一等份。`grid-template-columns: 200px 1fr 2fr` 表示第一个列宽设置为 200px，后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和 2/3。代码以及效果如下图所示：

```css
.wrapper-3 {
  display: grid;
  grid-template-columns: 200px 1fr 2fr;
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
```

![动图封面](https://pic4.zhimg.com/v2-7741bab93a6a8d1bd806927af7d1887f_b.jpg)



**minmax() 函数**：我们有时候想给网格元素一个最小和最大的尺寸，`minmax()` 函数产生一个长度范围，表示长度就在这个范围之中都可以应用到网格项目中。它接受两个参数，分别为最小值和最大值。`grid-template-columns: 1fr 1fr minmax(300px, 2fr)` 的意思是，第三个列宽最少也是要 300px，但是最大不能大于第一第二列宽的两倍。代码以及效果如下：

```text
.wrapper-4 {
  display: grid;
  grid-template-columns: 1fr 1fr minmax(300px, 2fr);
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
```

![动图封面](https://pic2.zhimg.com/v2-18c6c642118b91741007428979233c79_b.jpg)



**auto 关键字**：由浏览器决定长度。通过 `auto` 关键字，我们可以轻易实现三列或者两列布局。`grid-template-columns: 100px auto 100px` 表示第一第三列为 100px，中间由浏览器决定长度，代码以及效果如下：

```css
.wrapper-5 {
  display: grid;
  grid-template-columns: 100px auto 100px;
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
```

![动图封面](https://pic2.zhimg.com/v2-51b5cb904cfbb23103e9710339f2af35_b.jpg)



### **grid-row-gap 属性、grid-column-gap 属性以及 grid-gap 属性**

[grid-row-gap 属性、grid-column-gap 属性以及 grid-gap 属性演示地址](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/jOWRNeg)

`grid-row-gap` 属性、`grid-column-gap` 属性分别设置行间距和列间距。`grid-gap` 属性是两者的简写形式。

`grid-row-gap: 10px` 表示行间距是 10px，`grid-column-gap: 20px` 表示列间距是 20px。`grid-gap: 10px 20px` 实现的效果是一样的

```css
.wrapper {
  display: grid;
  grid-template-columns: 200px 100px 100px;
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}

.wrapper-1 {
  display: grid;
  grid-template-columns: 200px 100px 100px;
  grid-auto-rows: 50px;
  grid-row-gap: 10px;
  grid-column-gap: 20px;
}
```

以上两种写法效果是一样的。

![img](https://pic3.zhimg.com/80/v2-d1a1b09c65be95570bae5724657db64a_720w.jpg)

### **grid-template-areas 属性**

[grid-area 以及 grid-template-areas演示地址](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/RwrObEJ%3Feditors%3D1100)

`grid-template-areas` 属性用于定义区域，一个区域由一个或者多个单元格组成

一般这个属性跟网格元素的 `grid-area` 一起使用，我们在这里一起介绍。 `grid-area` 属性指定项目放在哪一个区域

```css
.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 120px  120px  120px;
  grid-template-areas:
    ". header  header"
    "sidebar content content";
  background-color: #fff;
  color: #444;
}
```

上面代码表示划分出 6 个单元格，其中值得注意的是 `.` 符号代表空的单元格，也就是没有用到该单元格。

```css
.sidebar {
  grid-area: sidebar;
}

.content {
  grid-area: content;
}

.header {
  grid-area: header;
}
```

以上代码表示将类 `.sidebar` `.content` `.header`所在的元素放在上面 `grid-template-areas` 中定义的 `sidebar` `content` `header` 区域中

![img](https://pic3.zhimg.com/80/v2-634c4e8808f2e271cafd85318fca62a2_720w.jpg)

### **grid-auto-flow 属性**

[grid-auto-flow 属性演示地址](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/MWKRWKj%3Feditors%3D1100)

`grid-auto-flow` 属性控制着自动布局算法怎样运作，精确指定在网格中被自动布局的元素怎样排列。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行，即下图英文数字的顺序 `one`,`two`,`three`...。这个顺序由 `grid-auto-flow` 属性决定，默认值是 `row`。

```css
.wrapper {
  display: grid;
  grid-template-columns: 100px 200px 100px;
  grid-auto-flow: row;
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
```

![img](https://pic1.zhimg.com/80/v2-8bb610a6f734ba698f96a7bc2211a2c4_720w.jpg)

细心的同学可能发现了一个问题，就是第五个项目和第六个项目之间有个空白（如下图所示），这个是由于第六块的长度大于了空白处的长度，被挤到了下一行导致的。在实际应用中，我们可能想让下面长度合适的填满这个空白，这个时候可以设置 `grid-auto-flow: row dense`，表示尽可能填满表格。代码以及效果如下所示：

![img](https://pic3.zhimg.com/80/v2-af3ddb86865167b49a86c2455d076ec6_720w.jpg)

```css
.wrapper-2 {
  display: grid;
  grid-template-columns: 100px 200px 100px;
  grid-auto-flow: row dense;
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
```

![img](https://pic1.zhimg.com/80/v2-6de7d129a96fdbc046f0ef63322f9dd4_720w.jpg)

可以设置 `grid-auto-flow: column`，表示先列后行，代码以及效果如下图所示：

```css
.wrapper-1 {
  display: grid;
  grid-auto-columns: 100px;
  grid-auto-flow: column;
  grid-gap: 5px;
  grid-template-rows:  50px 50px;
}
```

![img](https://pic2.zhimg.com/80/v2-54bcdb6d6ee9e5d2a8d0fa63465b9b11_720w.jpg)

### **justify-items 属性、align-items 属性以及 place-items 属性**

[justify-items 属性、align-items 属性演示地址](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/zYrXYrz%3Feditors%3D1100)

`justify-items` 属性设置单元格内容的水平位置（左中右），`align-items` 属性设置单元格的垂直位置（上中下）

下面以 justify-items 属性为例进行讲解，align-items 属性同理，只是方向为垂直方向。它们都有如下属性：

```css
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}
```

其代码实现以及效果如下：

```css
.wrapper, .wrapper-1, .wrapper-2, .wrapper-3 {
  display: grid;
  grid-template-columns: 100px 200px 100px;
  grid-gap: 5px;
  grid-auto-rows: 50px;
  justify-items: start;
}
.wrapper-1 {
  justify-items: end;
}
.wrapper-2 {
  justify-items: center;
}
.wrapper-3 {
  justify-items: stretch;
}
```

- start：对齐单元格的起始边缘

![img](https://pic3.zhimg.com/80/v2-4faf0e6a19478384cb438cadd4ec3312_720w.jpg)

- end：对齐单元格的结束边缘

![img](https://pic4.zhimg.com/80/v2-003e63ae02ff5fdf972298666c50bd23_720w.jpg)

- center：单元格内部居中

![img](https://pic2.zhimg.com/80/v2-327f5d9705fc53c0c8af3990cb605be1_720w.jpg)

- stretch：拉伸，占满单元格的整个宽度（默认值）

![img](https://pic2.zhimg.com/80/v2-11809f1abdabfd0b9bb3179e206fcf39_720w.jpg)

### **justify-content 属性、align-content 属性以及 place-content 属性**

[justify-content 属性、align-content 属性演示地址](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/qBbwBZx%3Feditors%3D1100)

`justify-content` 属性是整个内容区域在容器里面的水平位置（左中右），`align-content` 属性是整个内容区域的垂直位置（上中下）。它们都有如下的属性值。

```css
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}
```

下面以 `justify-content` 属性为例进行讲解，`align-content` 属性同理，只是方向为垂直方向

- start - 对齐容器的起始边框
- end - 对齐容器的结束边框
- center - 容器内部居中

```css
.wrapper, .wrapper-1, .wrapper-2, .wrapper-3, .wrapper-4, .wrapper-5, .wrapper-6 {
  display: grid;
  grid-template-columns: 100px 200px 100px;
  grid-gap: 5px;
  grid-auto-rows: 50px;
  justify-content: start;
}
.wrapper-1 {
  justify-content: end;
}
.wrapper-2 {
  justify-content: center;
}
```

![img](https://pic2.zhimg.com/80/v2-00ef4e80fb89b936404d99655457dea1_720w.jpg)

- space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍
- space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔
- space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔
- stretch - 项目大小没有指定时，拉伸占据整个网格容器

```css
.wrapper-3 {
  justify-content: space-around;
}
.wrapper-4 {
  justify-content: space-between;
}
.wrapper-5 {
  justify-content: space-evenly;
}
.wrapper-6 {
  justify-content: stretch;
}
```

![img](https://pic4.zhimg.com/80/v2-3c3f572d0b5a75843a15f9ebeb331397_720w.jpg)

### **grid-auto-columns 属性和 grid-auto-rows 属性**

[grid-auto-columns 属性和 grid-auto-rows 属性演示地址](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/zYrXvYZ%3Feditors%3D1100)

在讲 `grid-auto-columns` 属性和 `grid-auto-rows` 属性之前，先来看看隐式和显示网格的概念

**隐式和显示网格**：显式网格包含了你在 `grid-template-columns` 和 `grid-template-rows` 属性中定义的行和列。如果你在网格定义之外又放了一些东西，或者因为内容的数量而需要的更多网格轨道的时候，网格将会在隐式网格中创建行和列

假如有多余的网格（也就是上面提到的隐式网格），那么它的行高和列宽可以根据 `grid-auto-columns` 属性和 `grid-auto-rows` 属性设置。它们的写法和`grid-template-columns` 和 `grid-template-rows` 完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高

```css
.wrapper {
  display: grid;
  grid-template-columns: 200px 100px;
/*  只设置了两行，但实际的数量会超出两行，超出的行高会以 grid-auto-rows 算 */
  grid-template-rows: 100px 100px;
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}
```

`grid-template-columns` 属性和 `grid-template-rows` 属性只是指定了两行两列，但实际有九个元素，就会产生隐式网格。通过 `grid-auto-rows` 可以指定隐式网格的行高为 50px

![img](https://pic4.zhimg.com/80/v2-5efa2666aefd27af1cab5c9df65c23ff_720w.jpg)

## **项目属性介绍**

### **grid-column-start 属性、grid-column-end 属性、grid-row-start 属性以及grid-row-end 属性**

[演示地址](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/PoZgopr)

可以指定网格项目所在的四个边框，分别定位在哪根网格线，从而指定项目的位置

- grid-column-start 属性：左边框所在的垂直网格线
- grid-column-end 属性：右边框所在的垂直网格线
- grid-row-start 属性：上边框所在的水平网格线
- grid-row-end 属性：下边框所在的水平网格线

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-auto-rows: minmax(100px, auto);
}
.one {
  grid-column-start: 1;
  grid-column-end: 2;
  background: #19CAAD;
}
.two { 
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  /*   如果有重叠，就使用 z-index */
  z-index: 1;
  background: #8CC7B5;
}
.three {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 4;
  background: #D1BA74;
}
.four {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 5;
  background: #BEE7E9;
}
.five {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 5;
  background: #E6CEAC;
}
.six {
  grid-column: 3;
  grid-row: 4;
  background: #ECAD9E;
}
```

上面代码中，类 `.two` 所在的网格项目，垂直网格线是从 2 到 4，水平网格线是从 1 到 2。其中它跟 `.three` （垂直网格线是从3 到 4，水平网格线是从 1 到 4） 是有冲突的。可以设置 `z-index` 去决定它们的层级关系

![img](https://pic4.zhimg.com/80/v2-ab4fd8b109bc014a728784cbf6889573_720w.jpg)

### **grid-area 属性**

`grid-area` 属性指定项目放在哪一个区域，在上面介绍 `grid-template-areas` 的时候有提到过，这里不再具体展开，具体的使用可以参考演示地址：

[grid-area 以及 grid-template-areas 属性演示地址](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/RwrObEJ)

### **justify-self 属性、align-self 属性以及 place-self 属性**

[justify-self 属性/ align-self 属性/ place-self 属性演示地址](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/ZEQZEJK%3Feditors%3D1100)

`justify-self` 属性设置单元格内容的水平位置（左中右），跟 `justify-items` 属性的用法完全一致，但只作用于单个项目

`align-self` 属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目

两者很相像，这里只拿 `justify-self` 属性演示，`align-self` 属性同理，只是作用于垂直方向

```css
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}

.item {
  justify-self: start;
}
.item-1 {
  justify-self: end;
}
.item-2 {
  justify-self: center;
}
.item-3 {
  justify-self: stretch;
}
```

- start：对齐单元格的起始边缘

![img](https://pic3.zhimg.com/80/v2-f424491eaf6e6d6b9fdcd3f7d52c49c2_720w.jpg)

- end：对齐单元格的结束边缘

![img](https://pic1.zhimg.com/80/v2-c6d1691f97e623f2ca8eef2f184ccf04_720w.jpg)

- center：单元格内部居中

![img](https://pic1.zhimg.com/80/v2-b7229d01f9b8584c16dd52cdf66a8048_720w.jpg)



- stretch：拉伸，占满单元格的整个宽度（默认值）

![img](https://pic4.zhimg.com/80/v2-346fcb60314db4ba5618396f09b3eb6b_720w.jpg)



## **Grid 实战——实现响应式布局**

经过上面的介绍，相信大家都可以看出，Grid 是非常强大的。一些常见的 CSS 布局，如居中，两列布局，三列布局等等是很容易实现的。我们接下来看看 Grid 布局是如何实现响应式布局的

### **fr 实现等分响应式**

[fr 实现等分响应式](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/wvMZKpB%3Feditors%3D1100)

`fr` 等分单位，可以将容器的可用空间分成想要的多个等分空间。利用这个特性，我们能够轻易实现一个等分响应式。`grid-template-columns: 1fr 1fr 1fr` 表示容器分为三等分

```css
.wrapper {
  margin: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}
```

![动图封面](https://pic3.zhimg.com/v2-0f50127a2bd040b579cfdea6d5cd1542_b.jpg)



### **repeat + auto-fit——固定列宽，改变列数量**

等分布局并不只有 `Grid` 布局才有，像 `flex` 布局也能轻松实现，接下来看看更高级的响应式

上面例子的始终都是三列的，但是需求往往希望我们的网格能够固定列宽，并根据容器的宽度来改变列的数量。这个时候，我们可以用到上面提到 `repeat()` 函数以及 `auto-fit` 关键字。`grid-template-columns: repeat(auto-fit, 200px)` 表示固定列宽为 200px，数量是自适应的，只要容纳得下，就会往上排列，代码以及效果实现如下：

[演示地址](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/eYJopVE%3Feditors%3D1100)

```css
.wrapper {
  margin: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}
```

![动图封面](https://pic4.zhimg.com/v2-18b04dd95f90539b9a6b3ca3987b3573_b.jpg)



### **repeat+auto-fit+minmax 去掉右侧空白**

上面看到的效果中，右侧通常会留下空白，这是我们不希望看到的。如果列的宽度也能在某个范围内自适应就好了。`minmax()` 函数就帮助我们做到了这点。将 `grid-template-columns: repeat(auto-fit, 200px)` 改成 `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` 表示列宽至少 200px，如果还有空余则一起等分。代码以及效果如下所示：

[演示地址](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/dyGLYdQ)

```text
.wrapper {
  margin: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}
```

![动图封面](https://pic2.zhimg.com/v2-ee9dbfff41c25e2f4ff1bbce3ed38675_b.jpg)



### **repeat+auto-fit+minmax-span-dense 解决空缺问题**

似乎一切进行得很顺利，但是某天 UI 来说，每个网格元素的长度可能不相同，这也简单，通过 `span` 关键字进行设置网格项目的跨度，`grid-column-start: span 3`，表示这个网格项目跨度为 3。具体的代码与效果如下所示：

```css
.item-3 {
  grid-column-start: span 3;
}
```

[演示地址](https://link.zhihu.com/?target=https%3A//codepen.io/gpingfeng/pen/BajEoxy%3Feditors%3D1100)

![动图封面](https://pic3.zhimg.com/v2-9555b4f09c049db4fa10fb2c4238d08a_b.jpg)



不对，怎么右侧又有空白了？原来是有一些长度太长了，放不下，这个时候就到我们的 `dense` 关键字出场了。`grid-auto-flow: row dense` 表示尽可能填充，而不留空白，代码以及效果如下所示：

```css
.wrapper, .wrapper-1 {
  margin: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}

.wrapper-1 {
  grid-auto-flow: row dense;
}
```

![动图](https://pic1.zhimg.com/v2-ca03bd55dcfc800b97fcadf4d9784544_b.webp)



## **Grid 布局兼容性**

最后，聊聊 `Grid` 布局兼容性问题，在 [caniuse](https://link.zhihu.com/?target=https%3A//caniuse.com/%23search%3Dgrid) 中，我们可以看到的结果如下，总体兼容性还不错，但在 IE 10 以下不支持。个人建议在公司的内部系统运用起来是没有问题的，但 TOC 的话，可能目前还是不太合适

![img](https://pic2.zhimg.com/80/v2-56dcc446934c7cf133dd22bcf63975dd_720w.jpg)





# 15. 元素水平垂直居中的方法有哪些？如果元素不定宽高呢？

## 一、背景

在开发中经常遇到这个问题，即让某个元素的内容在水平和垂直方向上都居中，内容不仅限于文字，可能是图片或其他元素

居中是一个非常基础但又是非常重要的应用场景，实现居中的方法存在很多，可以将这些方法分成两个大类：

- 居中元素（子元素）的宽高已知
- 居中元素宽高未知

## 二、实现方式

实现元素水平垂直居中的方式：

- 利用定位+margin:auto
- 利用定位+margin:负值
- 利用定位+transform
- flex布局
- grid布局

### 利用定位+margin:auto

先上代码：

```html
<style>
    .father{
        width:500px;
        height:300px;
        border:1px solid #0a3b98;
        position: relative;
    }
    .son{
        width:100px;
        height:40px;
        background: #f0a238;
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

父级设置为相对定位，子级绝对定位 ，并且四个定位属性的值都设置了0，那么这时候如果子级没有设置宽高，则会被拉开到和父级一样宽高

这里子元素设置了宽高，所以宽高会按照我们的设置来显示，但是实际上子级的虚拟占位已经撑满了整个父级，这时候再给它一个`margin：auto`它就可以上下左右都居中了

### 利用定位+margin:负值

绝大多数情况下，设置父元素为相对定位， 子元素移动自身50%实现水平垂直居中

```html
<style>
    .father {
        position: relative;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left:-50px;
        margin-top:-50px;
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

整个实现思路如下图所示：

![image-20220727170939117](C:\Users\Hasee\AppData\Roaming\Typora\typora-user-images\image-20220727170939117.png)

- 初始位置为方块1的位置
- 当设置left、top为50%的时候，内部子元素为方块2的位置
- 设置margin为负数时，使内部子元素到方块3的位置，即中间位置

这种方案不要求父元素的高度，也就是即使父元素的高度变化了，仍然可以保持在父元素的垂直居中位置，水平方向上是一样的操作

但是该方案需要知道子元素自身的宽高，但是我们可以通过下面`transform`属性进行移动

### 利用定位+transform

实现代码如下：

```css
<style>
    .father {
        position: relative;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

`translate(-50%, -50%)`将会将元素位移自己宽度和高度的-50%

这种方法其实和最上面被否定掉的margin负值用法一样，可以说是`margin`负值的替代方案，并不需要知道自身元素的宽高

### flex弹性布局

还是看看实现的整体代码：

```html
<style>
    .father {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

`css3`中了`flex`布局，可以非常简单实现垂直水平居中

这里可以简单看看`flex`布局的关键属性作用：

- display: flex时，表示该容器内部的元素将按照flex进行布局
- align-items: center表示这些元素将相对于本容器水平居中
- justify-content: center也是同样的道理垂直居中

### grid网格布局

```html
<style>
    .father {
            display: grid;
            align-items:center;
            justify-content: center;
            width: 200px;
            height: 200px;
            background: skyblue;

        }
        .son {
            width: 10px;
            height: 10px;
            border: 1px solid red
        }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

这里看到，`gird`网格布局和`flex`弹性布局都简单粗暴

### 小结

上述方法中，不知道元素宽高大小仍能实现水平垂直居中的方法有：

- 利用定位+margin:auto
- 利用定位+transform
- flex布局
- grid布局

## 三、总结

根据元素标签的性质，可以分为：

- 内联元素居中布局
- 块级元素居中布局

### 内联元素居中布局

水平居中

- 行内元素可设置：text-align: center
- flex布局设置父元素：display: flex; justify-content: center

垂直居中

- 单行文本父元素确认高度：height === line-height
- 多行文本父元素确认高度：display: table-cell; vertical-align: middle

### 块级元素居中布局

水平居中

- 定宽: margin: 0 auto
- 绝对定位+left:50%+margin:负自身一半

垂直居中

- position: absolute设置left、top、margin-left、margin-top(定高)
- display: table-cell
- transform: translate(x, y)
- flex(不定高，不定宽)
- grid(不定高，不定宽)，兼容性相对比较差



# 16. 如何实现两栏布局，右侧自适应？三栏布局中间自适应呢？

## 一、背景

在日常布局中，无论是两栏布局还是三栏布局，使用的频率都非常高

### 两栏布局

两栏布局实现效果就是将页面分割成左右宽度不等的两列，宽度较小的列设置为固定宽度，剩余宽度由另一列撑满，

比如 `Ant Design` 文档，蓝色区域为主要内容布局容器，侧边栏为次要内容布局容器

> 这里称宽度较小的列父元素为次要布局容器，宽度较大的列父元素为主要布局容器

![img](https://static.vue-js.com/fcb8ac50-976e-11eb-85f6-6fac77c0c9b3.png)

这种布局适用于内容上具有明显主次关系的网页

### 三栏布局

三栏布局按照左中右的顺序进行排列，通常中间列最宽，左右两列次之

大家最常见的就是`github`：

![img](https://static.vue-js.com/0bf016e0-976f-11eb-ab90-d9ae814b240d.png)

## 二、两栏布局

两栏布局非常常见，往往是以一个定宽栏和一个自适应的栏并排展示存在

实现思路也非常的简单：

- 使用 float 左浮左边栏
- 右边模块使用 margin-left 撑出内容块做内容展示
- 为父级元素添加BFC，防止下方元素飞到上方内容

代码如下：

```html
<style>
    .box{
        overflow: hidden; 添加BFC
    }
    .left {
        float: left;
        width: 200px;
        background-color: gray;
        height: 400px;
    }
    .right {
        margin-left: 210px;
        background-color: lightgray;
        height: 200px;
    }
</style>
<div class="box">
    <div class="left">左边</div>
    <div class="right">右边</div>
</div>
```

还有一种更为简单的使用则是采取：flex弹性布局

### flex弹性布局

```html
<style>
    .box{
        display: flex;
    }
    .left {
        width: 100px;
    }
    .right {
        flex: 1;
    }
</style>
<div class="box">
    <div class="left">左边</div>
    <div class="right">右边</div>
</div>
```

`flex`可以说是最好的方案了，代码少，使用简单

注意的是，`flex`容器的一个默认属性值:`align-items: stretch;`

这个属性导致了列等高的效果。 为了让两个盒子高度自动，需要设置: `align-items: flex-start`

## 三、三栏布局

实现三栏布局中间自适应的布局方式有：

- 两边使用 float，中间使用 margin
- 两边使用 absolute，中间使用 margin
- 两边使用 float 和负 margin
- flex实现
- grid网格布局

### 两边使用 float，中间使用 margin

需要将中间的内容放在`html`结构最后，否则右侧会臣在中间内容的下方

实现代码如下：

```html
<style>
    .wrap {
        background: #eee;
        overflow: hidden; <!-- 生成BFC，计算高度时考虑浮动的元素 -->
        padding: 20px;
        height: 200px;
    }
    .left {
        width: 200px;
        height: 200px;
        float: left;
        background: coral;
    }
    .right {
        width: 120px;
        height: 200px;
        float: right;
        background: lightblue;
    }
    .middle {
        margin-left: 220px;
        height: 200px;
        background: lightpink;
        margin-right: 140px;
    }
</style>
<div class="wrap">
    <div class="left">左侧</div>
    <div class="right">右侧</div>
    <div class="middle">中间</div>
</div>
```

原理如下：

- 两边固定宽度，中间宽度自适应。
- 利用中间元素的margin值控制两边的间距
- 宽度小于左右部分宽度之和时，右侧部分会被挤下去

这种实现方式存在缺陷：

- 主体内容是最后加载的。
- 右边在主体内容之前，如果是响应式设计，不能简单的换行展示

### 两边使用 absolute，中间使用 margin

基于绝对定位的三栏布局：注意绝对定位的元素脱离文档流，相对于最近的已经定位的祖先元素进行定位。无需考虑HTML中结构的顺序

```html
<style>
  .container {
    position: relative;
  }
  
  .left,
  .right,
  .main {
    height: 200px;
    line-height: 200px;
    text-align: center;
  }

  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    background: green;
  }

  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    background: green;
  }

  .main {
    margin: 0 110px;
    background: black;
    color: white;
  }
</style>

<div class="container">
  <div class="left">左边固定宽度</div>
  <div class="right">右边固定宽度</div>
  <div class="main">中间自适应</div>
</div>
```

实现流程：

- 左右两边使用绝对定位，固定在两侧。
- 中间占满一行，但通过 margin和左右两边留出10px的间隔

### 两边使用 float 和负 margin

```html
<style>
  .left,
  .right,
  .main {
    height: 200px;
    line-height: 200px;
    text-align: center;
  }

  .main-wrapper {
    float: left;
    width: 100%;
  }

  .main {
    margin: 0 110px;
    background: black;
    color: white;
  }

  .left,
  .right {
    float: left;
    width: 100px;
    margin-left: -100%;
    background: green;
  }

  .right {
    margin-left: -100px; /* 同自身宽度 */
  }
</style>

<div class="main-wrapper">
  <div class="main">中间自适应</div>
</div>
<div class="left">左边固定宽度</div>
<div class="right">右边固定宽度</div>
```

实现过程：

- 中间使用了双层标签，外层是浮动的，以便左中右能在同一行展示
- 左边通过使用负 margin-left:-100%，相当于中间的宽度，所以向上偏移到左侧
- 右边通过使用负 margin-left:-100px，相当于自身宽度，所以向上偏移到最右侧

缺点：

- 增加了 .main-wrapper 一层，结构变复杂
- 使用负 margin，调试也相对麻烦

### 使用flex实现

利用`flex`弹性布局，可以简单实现中间自适应

代码如下：

```html
<style type="text/css">
    .wrap {
        display: flex;
        justify-content: space-between;
    }

    .left,
    .right,
    .middle {
        height: 100px;
    }

    .left {
        width: 200px;
        background: coral;
    }

    .right {
        width: 120px;
        background: lightblue;
    }

    .middle {
        background: #555;
        width: 100%;
        margin: 0 20px;
    }
</style>
<div class="wrap">
    <div class="left">左侧</div>
    <div class="middle">中间</div>
    <div class="right">右侧</div>
</div>
```

实现过程：

- 仅需将容器设置为`display:flex;`，
- 盒内元素两端对其，将中间元素设置为`100%`宽度，或者设为`flex:1`，即可填充空白
- 盒内元素的高度撑开容器的高度

优点：

- 结构简单直观
- 可以结合 flex的其他功能实现更多效果，例如使用 order属性调整显示顺序，让主体内容优先加载，但展示在中间

### grid网格布局

代码如下：

```html
<style>
    .wrap {
        display: grid;
        width: 100%;
        grid-template-columns: 300px auto 300px;
    }

    .left,
    .right,
    .middle {
        height: 100px;
    }

    .left {
        background: coral;
    }

    .right {
        background: lightblue;
    }

    .middle {
        background: #555;
    }
</style>
<div class="wrap">
    <div class="left">左侧</div>
    <div class="middle">中间</div>
    <div class="right">右侧</div>
</div>
```

跟`flex`弹性布局一样的简单





















# 17. CSS用户界面样式

所谓的界面样式， 就是更改一些用户操作样式，以便提高更好的用户体验

## 鼠标样式cursor

设置或检索在对象上移动的鼠标指针采用何种系统预定义的光标形状。

| 属性值          | 描述       |
| --------------- | ---------- |
| **default**     | 小白  默认 |
| **pointer**     | 小手       |
| **move**        | 移动       |
| **text**        | 文本       |
| **not-allowed** | 禁止       |


鼠标放我身上查看效果哦：

```html
<ul>
  <li style="cursor:default">我是小白</li>
  <li style="cursor:pointer">我是小手</li>
  <li style="cursor:move">我是移动</li>
  <li style="cursor:text">我是文本</li>
  <li style="cursor:not-allowed">我是文本</li>
</ul>
```

## 轮廓线 outline

![](https://img-blog.csdnimg.cn/8fbcefd5b7dc4d75ba87e3d98bfd7be4.png#alt=%E5%9C%A8%E8%BF%99%E9%87%8C%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87%E6%8F%8F%E8%BF%B0)

是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。

```css
outline : outline-color ||outline-style || outline-width
```

但是我们都不关心可以设置多少，我们平时都是去掉的。 

最直接的写法是 ：  outline: 0;   或者  outline: none;

```html
<input  type="text"  style="outline: 0;"/>
```

## 防止拖拽文本域resize

![](https://img-blog.csdnimg.cn/6fe85cd8fedc47aa86c03925b4aef613.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_14,color_FFFFFF,t_70,g_se,x_16#alt=%E5%9C%A8%E8%BF%99%E9%87%8C%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87%E6%8F%8F%E8%BF%B0)

实际开发中，我们文本域右下角是不可以拖拽：

```html
<textarea  style="resize: none;"></textarea>
```

# 18. CSS精灵技术（sprite) 重点

## 为什么需要精灵技术

![](https://img-blog.csdnimg.cn/9fec2470b5354184a36a14b4acd4b007.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#alt=%E5%9C%A8%E8%BF%99%E9%87%8C%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87%E6%8F%8F%E8%BF%B0)

图所示为网页的请求原理图，当用户访问一个网站时，需要向服务器发送请求，网页上的每张图像都要经过一次请求才能展现给用户。

然而，一个网页中往往会应用很多小的背景图像作为修饰，当网页中的图像过多时，服务器就会频繁地接受和发送请求，这将大大降低页面的加载速度。

> **为了有效地减少服务器接受和发送请求的次数，提高页面的加载速度。**


出现了CSS精灵技术（也称CSS Sprites、CSS雪碧）。

## 精灵技术讲解

CSS 精灵其实是将网页中的一些背景图像整合到一张大图中（精灵图），然而，各个网页元素通常只需要精灵图中不同位置的某个小图，要想精确定位到精灵图中的某个小图。

![](https://img-blog.csdnimg.cn/0916c453b945411fb75141299f254839.png#alt=%E5%9C%A8%E8%BF%99%E9%87%8C%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87%E6%8F%8F%E8%BF%B0)

这样，当用户访问该页面时，只需向服务发送一次请求，网页中的背景图像即可全部展示出来。

我们需要使用CSS的

> background-image

> background-repeat

> background-position属性进行背景定位，

> 其中最关键的是使用background-position 属性精确地定位。

## 精灵技术使用的核心总结

首先我们知道，css精灵技术主要针对于背景图片，插入的图片img 是不需要这个技术的。

1. 精确测量，每个小背景图片的大小和 位置。
2. 给盒子指定小背景图片时， 背景定位基本都是 负值。

## 精灵图案例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>体会css精灵技术</title>
	<style>
		.icon1 {
			width: 23px;
			height: 23px;
			background: url(images/index.png) no-repeat  0 -107px;
			/*background-position: 0 -107px;*/
		}
		.icon2 {
			width: 23px;
			height: 23px;
			background: url(images/index.png) no-repeat -157px -107px;
			margin: 100px;
		}
	</style>
</head>
<body>
	<div class="icon1"></div>
	<div class="icon2"></div>
</body>
</html>
```

# 19. margin负值之美

## 1). 负边距+定位：水平垂直居中

咱们前面讲过， 一个绝对定位的盒子， 利用  父级盒子的 50%，  然后 往左(上) 走 自己宽度的一半 ，可以实现盒子水平垂直居中。

## 2). 压住盒子相邻边框

![](https://img-blog.csdnimg.cn/40f01ce01fe947edbfe637664d463c2e.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16#alt=%E5%9C%A8%E8%BF%99%E9%87%8C%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87%E6%8F%8F%E8%BF%B0)

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		div {
			/*浮动的盒子是紧贴在一起的*/
			float: left;
			width: 200px;
			height: 300px;
			border: 1px solid #ccc;
			margin-left: -1px;
			margin-top: -1px;
		}
	</style>
</head>
<body>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>margin负值之美-突出显示某个盒子</title>
	<style>
		div {
			position: relative;
			/*浮动的盒子是紧贴在一起的*/
			float: left;
			width: 200px;
			height: 300px;
			border: 1px solid #ccc;
			margin-left: -1px;
			margin-top: -1px;
		}
		/*鼠标经过div 的意思  p:hover */
		div:hover {
			/*我要让当前鼠标经过的这个div 升到最高处来就好了*/
			/*定位的盒子是最高层的  */
			border: 1px solid #f40;
			/*都是定位的盒子，我们通过z-index 来实现层级关系*/
			z-index: 1; 

		}
	</style>
</head>
<body>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
</body>
</html>
```





# 20. CSS3新增了哪些新特性？

## @supports

@supports是CSS3新引入的规则之一，主要用于检测当前浏览器是否支持某个CSS属性并加载具体样式，即css的特性检测。

我们要知道，在前端技术日新月异的今天，各种新技术新属性层出不穷；而 CSS 层面亦不例外，css的一些新属性能极大提升用户体验以及减少开发者的工作量，并且当下的前端氛围是如此的：

1、很多实验性的功能未成为标准就被大量的使用；

2、需要兼容多种终端，多种浏览器，而各种浏览器对某一新功能的实现效果天差地别；

在这种背景下，又想使用新的技术给用户提供更好的体验，又想做好回退机制保证低版本终端用户的基本体验，CSS 特性检测就应运而生了。

CSS 特性检测就是针对不同浏览器终端，通过条件判断当前浏览器对某个特性是否支持。运用 CSS 特性检测，我们可以在支持当前特性的浏览器环境下使用新的技术，而不支持的则做出某些回退机制。

**基本语法：**

```css
//如果通过了条件
@supports(运行条件) {
    /* 应用规则---想要实现的css语句*/
}

//如果没有通过条件
@supports not(运行的条件) {
    /* 应用规则---想要实现的css语句 */
}
```

例：

```css
/ *仅当支持'display：flex'时才在'@supports'规则中应用规则。* / 
@supports（display：flex）{    
    .el {         
       display：flex;        
       align-items：middle;        
       / * ...... * /
    }
}
```

**实现多个条件的多个检查**

在@supports中，我们可以使用and和or运算符创建复杂的测试，检查规则中的多个功能是否支持。

and和or运算符可以分开使用，也可以组合使用，例：

为避免由优先规则引起的混淆，现在允许组合and，使用or，但不使用括号图层。这意味着以下声明无效：

```css
@supports (transform: rotate3d(1, 1, 0, 30deg) and 
    
          (transition: transform 2s) or 

          (animation: my-3d-animation 2s alternate forwards) {    

          /* ... */

 }
```

我们需要使用括号组合条件，就像使用其他编程语言一样，这样可以使得优先级清晰。所以，上面的例子对你这样做是有效的：

```css
@supports   (transform: rotate3d(1, 1, 0, 30deg) and 

            ( (transition: transform 2s) or (animation: my-3d-animation 2s alternate forwards) ) {    

            /* ... */

}
```



# 21. css3动画有哪些？

## 一、是什么

CSS动画（CSS Animations）是为层叠样式表建议的允许可扩展标记语言（XML）元素使用CSS的动画的模块

即指元素从一种样式逐渐过渡为另一种样式的过程

常见的动画效果有很多，如平移、旋转、缩放等等，复杂动画则是多个简单动画的组合

`css`实现动画的方式，有如下几种：

- transition 实现渐变动画
- transform 转变动画
- animation 实现自定义动画

## 二、实现方式

### transition 实现渐变动画

`transition`的属性如下：

- property:填写需要变化的css属性
- duration:完成过渡效果需要的时间单位(s或者ms)
- timing-function:完成效果的速度曲线
- delay: 动画效果的延迟触发时间

其中`timing-function`的值有如下：

| 值                            | 描述                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| linear                        | 匀速（等于 cubic-bezier(0,0,1,1)）                           |
| ease                          | 从慢到快再到慢（cubic-bezier(0.25,0.1,0.25,1)）              |
| ease-in                       | 慢慢变快（等于 cubic-bezier(0.42,0,1,1)）                    |
| ease-out                      | 慢慢变慢（等于 cubic-bezier(0,0,0.58,1)）                    |
| ease-in-out                   | 先变快再到慢（等于 cubic-bezier(0.42,0,0.58,1)），渐显渐隐效果 |
| cubic-bezier(*n*,*n*,*n*,*n*) | 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值 |

注意：并不是所有的属性都能使用过渡的，如`display:none<->display:block`

举个例子，实现鼠标移动上去发生变化动画效果

```html
<style>
       .base {
            width: 100px;
            height: 100px;
            display: inline-block;
            background-color: #0EA9FF;
            border-width: 5px;
            border-style: solid;
            border-color: #5daf34;
            transition-property: width, height, background-color, border-width;
            transition-duration: 2s;
            transition-timing-function: ease-in;
            transition-delay: 500ms;
        }

        /*简写*/
        /*transition: all 2s ease-in 500ms;*/
        .base:hover {
            width: 200px;
            height: 200px;
            background-color: #5daf34;
            border-width: 10px;
            border-color: #3a8ee6;
        }
</style>
<div class="base"></div>
```

### transform 转变动画

包含四个常用的功能：

- translate：位移
- scale：缩放
- rotate：旋转
- skew：倾斜

一般配合`transition`过度使用

注意的是，`transform`不支持`inline`元素，使用前把它变成`block`

举个例子

```html
<style>
    .base {
        width: 100px;
        height: 100px;
        display: inline-block;
        background-color: #0EA9FF;
        border-width: 5px;
        border-style: solid;
        border-color: #5daf34;
        transition-property: width, height, background-color, border-width;
        transition-duration: 2s;
        transition-timing-function: ease-in;
        transition-delay: 500ms;
    }
    .base2 {
        transform: none;
        transition-property: transform;
        transition-delay: 5ms;
    }

    .base2:hover {
        transform: scale(0.8, 1.5) rotate(35deg) skew(5deg) translate(15px, 25px);
    }
</style>
 <div class="base base2"></div>
```

可以看到盒子发生了旋转，倾斜，平移，放大

### animation 实现自定义动画

`animation`是由 8 个属性的简写，分别如下：

| 属性                                   | 描述                                                         | 属性值                                        |
| -------------------------------------- | ------------------------------------------------------------ | --------------------------------------------- |
| animation-duration                     | 指定动画完成一个周期所需要时间，单位秒（s）或毫秒（ms），默认是 0 |                                               |
| animation-timing-function              | 指定动画计时函数，即动画的速度曲线，默认是 "ease"            | linear、ease、ease-in、ease-out、ease-in-out  |
| animation-delay                        | 指定动画延迟时间，即动画何时开始，默认是 0                   |                                               |
| animation-iteration-count              | 指定动画播放的次数，默认是 1                                 |                                               |
| animation-direction 指定动画播放的方向 | 默认是 normal                                                | normal、reverse、alternate、alternate-reverse |
| animation-fill-mode                    | 指定动画填充模式。默认是 none                                | forwards、backwards、both                     |
| animation-play-state                   | 指定动画播放状态，正在运行或暂停。默认是 running             | running、pauser                               |
| animation-name                         | 指定 @keyframes 动画的名称                                   |                                               |

`CSS` 动画只需要定义一些关键的帧，而其余的帧，浏览器会根据计时函数插值计算出来，

通过 `@keyframes` 来定义关键帧

因此，如果我们想要让元素旋转一圈，只需要定义开始和结束两帧即可：

```css
@keyframes rotate{
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
```

`from` 表示最开始的那一帧，`to` 表示结束时的那一帧

也可以使用百分比刻画生命周期

```css
@keyframes rotate{
    0%{
        transform: rotate(0deg);
    }
    50%{
        transform: rotate(180deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
```

定义好了关键帧后，下来就可以直接用它了：

```css
animation: rotate 2s;
```

## 三、总结

| 属性               | 含义                                                         |
| ------------------ | ------------------------------------------------------------ |
| transition（过度） | 用于设置元素的样式过度，和animation有着类似的效果，但细节上有很大的不同 |
| transform（变形）  | 用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系，就相当于color一样用来设置元素的“外表” |
| translate（移动）  | 只是transform的一个属性值，即移动                            |
| animation（动画）  | 用于设置动画属性，他是一个简写的属性，包含6个属性            |





# 22. 怎么理解回流(重排,reflow)跟重绘(repaint)？什么场景下会触发？

## 一、是什么

在`HTML`中，每个元素都可以理解成一个盒子，在浏览器解析过程中，会涉及到回流与重绘：

- 回流：布局引擎会根据各种样式计算每个盒子在页面上的大小与位置
- 重绘：当计算好盒模型的位置、大小及其他属性后，浏览器根据每个盒子特性进行绘制

具体的浏览器解析渲染机制如下所示：

![img](https://static.vue-js.com/2b56a950-9cdc-11eb-ab90-d9ae814b240d.png)

- 解析HTML，生成DOM树，解析CSS，生成CSSOM树
- 将DOM树和CSSOM树结合，生成渲染树(Render Tree)
- Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）
- Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素
- Display:将像素发送给GPU，展示在页面上

在页面初始渲染阶段，回流不可避免的触发，可以理解成页面一开始是空白的元素，后面添加了新的元素使页面布局发生改变

当我们对 `DOM` 的修改引发了 `DOM`几何尺寸的变化（比如修改元素的宽、高或隐藏元素等）时，浏览器需要重新计算元素的几何属性，然后再将计算的结果绘制出来

当我们对 `DOM`的修改导致了样式的变化（`color`或`background-color`），却并未影响其几何属性时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式，这里就仅仅触发了重绘

## 二、如何触发

要想减少回流和重绘的次数，首先要了解回流和重绘是如何触发的

### 回流触发时机

回流这一阶段主要是计算节点的位置和几何信息，那么当页面布局和几何信息发生变化的时候，就需要回流，如下面情况：

- 添加或删除可见的DOM元素
- 元素的位置发生变化
- 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
- 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代
- 页面一开始渲染的时候（这避免不了）
- 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

还有一些容易被忽略的操作：获取一些特定属性的值

> offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight

这些属性有一个共性，就是需要通过即时计算得到。因此浏览器为了获取这些值，也会进行回流

除此还包括`getComputedStyle`方法，原理是一样的

### 重绘触发时机

触发回流一定会触发重绘

可以把页面理解为一个黑板，黑板上有一朵画好的小花。现在我们要把这朵从左边移到了右边，那我们要先确定好右边的具体位置，画好形状（回流），再画上它原有的颜色（重绘）

除此之外还有一些其他引起重绘行为：

- 颜色的修改
- 文本方向的修改
- 阴影的修改

### 浏览器优化机制

由于每次重排都会造成额外的计算消耗，因此大多数浏览器都会通过队列化修改并批量执行来优化重排过程。浏览器会将修改操作放入到队列里，直到过了一段时间或者操作达到了一个阈值，才清空队列

当你获取布局信息的操作的时候，会强制队列刷新，包括前面讲到的`offsetTop`等方法都会返回最新的数据

因此浏览器不得不清空队列，触发回流重绘来返回正确的值

## 三、如何减少

我们了解了如何触发回流和重绘的场景，下面给出避免回流的经验：

- 如果想设定元素的样式，通过改变元素的 `class` 类名 (尽可能在 DOM 树的最里层)
- 避免设置多项内联样式
- 应用元素的动画，使用 `position` 属性的 `fixed` 值或 `absolute` 值(如前文示例所提)
- 避免使用 `table` 布局，`table` 中每个元素的大小以及内容的改动，都会导致整个 `table` 的重新计算
- 对于那些复杂的动画，对其设置 `position: fixed/absolute`，尽可能地使元素脱离文档流，从而减少对其他元素的影响
- 使用css3硬件加速，可以让`transform`、`opacity`、`filters`这些动画不会引起回流重绘
- 避免使用 CSS 的 `JavaScript` 表达式

在使用 `JavaScript` 动态插入多个节点时, 可以使用`DocumentFragment`. 创建后一次插入. 就能避免多次的渲染性能

但有时候，我们会无可避免地进行回流或者重绘，我们可以更好使用它们

例如，多次修改一个把元素布局的时候，我们很可能会如下操作

```js
const el = document.getElementById('el')
for(let i=0;i<10;i++) {
    el.style.top  = el.offsetTop  + 10 + "px";
    el.style.left = el.offsetLeft + 10 + "px";
}
```

每次循环都需要获取多次`offset`属性，比较糟糕，可以使用变量的形式缓存起来，待计算完毕再提交给浏览器发出重计算请求

```js
// 缓存offsetLeft与offsetTop的值
const el = document.getElementById('el')
let offLeft = el.offsetLeft, offTop = el.offsetTop

// 在JS层面进行计算
for(let i=0;i<10;i++) {
  offLeft += 10
  offTop  += 10
}

// 一次性将计算结果应用到DOM上
el.style.left = offLeft + "px"
el.style.top = offTop  + "px"
```

我们还可避免改变样式，使用类名去合并样式

```js
const container = document.getElementById('container')
container.style.width = '100px'
container.style.height = '200px'
container.style.border = '10px solid red'
container.style.color = 'red'
```

使用类名去合并样式

```html
<style>
    .basic_style {
        width: 100px;
        height: 200px;
        border: 10px solid red;
        color: red;
    }
</style>
<script>
    const container = document.getElementById('container')
    container.classList.add('basic_style')
</script>
```

前者每次单独操作，都去触发一次渲染树更改（新浏览器不会），

都去触发一次渲染树更改，从而导致相应的回流与重绘过程

合并之后，等于我们将所有的更改一次性发出

我们还可以通过通过设置元素属性`display: none`，将其从页面上去掉，然后再进行后续操作，这些后续操作也不会触发回流与重绘，这个过程称为离线操作

```js
const container = document.getElementById('container')
container.style.width = '100px'
container.style.height = '200px'
container.style.border = '10px solid red'
container.style.color = 'red'
```

离线操作后

```js
let container = document.getElementById('container')
container.style.display = 'none'
container.style.width = '100px'
container.style.height = '200px'
container.style.border = '10px solid red'
container.style.color = 'red'
...（省略了许多类似的后续操作）
container.style.display = 'block'
```





# 23. 什么是响应式设计？响应式设计的基本原理是什么？如何做？

## 一、是什么

响应式网站设计（Responsive Web design）是一种网络页面设计布局，页面的设计与开发应当根据用户行为以及设备环境(系统平台、屏幕尺寸、屏幕定向等)进行相应的响应和调整

描述响应式界面最著名的一句话就是“Content is like water”

大白话便是“如果将屏幕看作容器，那么内容就像水一样”

响应式网站常见特点：

- 同时适配PC + 平板 + 手机等
- 标签导航在接近手持终端设备时改变为经典的抽屉式导航
- 网站的布局会根据视口来调整模块的大小和位置

![img](https://static.vue-js.com/ae68be30-9dba-11eb-85f6-6fac77c0c9b3.png)

## 二、实现方式

响应式设计的基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理，为了处理移动端，页面头部必须有`meta`声明`viewport`

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no”>
```

属性对应如下：

- width=device-width: 是自适应手机屏幕的尺寸宽度
- maximum-scale:是缩放比例的最大值
- inital-scale:是缩放的初始化
- user-scalable:是用户的可以缩放的操作

实现响应式布局的方式有如下：

- 媒体查询
- 百分比
- vw/vh
- rem

### 媒体查询

`CSS3`中的增加了更多的媒体查询，就像`if`条件表达式一样，我们可以设置不同类型的媒体条件，并根据对应的条件，给相应符合条件的媒体调用相对应的样式表

使用`@Media`查询，可以针对不同的媒体类型定义不同的样式，如：

```css
@media screen and (max-width: 1920px) { ... }
```

当视口在375px - 600px之间，设置特定字体大小18px

```css
@media screen (min-width: 375px) and (max-width: 600px) {
  body {
    font-size: 18px;
  }
}
```

@media only screen and 

> only (限定某种设备)  
>
> screen 是媒体类型里的一种 
>
> and 被称为关键字，其他关键字还包括 not (排除某种设备)

类型 解释

> all 所有设备
> braille 盲文
> embossed 盲文打印
> handheld 手持设备
> print 文档打印或打印预览模式
> projection 项目演示，比如幻灯
> screen 彩色电脑屏幕
> speech 演讲
> tty 固定字母间距的网格的媒体，比如电传打字机
> tv 电视

screen一般用的比较多

通过媒体查询，可以通过给不同分辨率的设备编写不同的样式来实现响应式的布局，比如我们为不同分辨率的屏幕，设置不同的背景图片

比如给小屏幕手机设置@2x图，为大屏幕手机设置@3x图，通过媒体查询就能很方便的实现

### 百分比

通过百分比单位 " % " 来实现响应式的效果

比如当浏览器的宽度或者高度发生变化时，通过百分比单位，可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果

`height`、`width`属性的百分比依托于父标签的宽高，但是其他盒子属性则不完全依赖父元素：

- 子元素的top/left和bottom/right如果设置百分比，则相对于直接非static定位(默认定位)的父元素的高度/宽度
- 子元素的padding如果设置百分比，不论是垂直方向或者是水平方向，都相对于直接父亲元素的width，而与父元素的height无关。
- 子元素的margin如果设置成百分比，不论是垂直方向还是水平方向，都相对于直接父元素的width
- border-radius不一样，如果设置border-radius为百分比，则是相对于自身的宽度

可以看到每个属性都使用百分比，会照成布局的复杂度，所以不建议使用百分比来实现响应式

### vw/vh

`vw`表示相对于视图窗口的宽度，`vh`表示相对于视图窗口高度。 任意层级元素，在使用`vw`单位的情况下，`1vw`都等于视图宽度的百分之一

与百分比布局很相似，在以前文章提过与`%`的区别，这里就不再展开述说

### rem

在以前也讲到，`rem`是相对于根元素`html`的`font-size`属性，默认情况下浏览器字体大小为`16px`，此时`1rem = 16px`

可以利用前面提到的媒体查询，针对不同设备分辨率改变`font-size`的值，如下：

```css
@media screen and (max-width: 414px) {
  html {
    font-size: 18px
  }
}

@media screen and (max-width: 375px) {
  html {
    font-size: 16px
  }
}

@media screen and (max-width: 320px) {
  html {
    font-size: 12px
  }
}
```

为了更准确监听设备可视窗口变化，我们可以在`css`之前插入`script`标签，内容如下：

```js
//动态为根元素设置字体大小
function init () {
    // 获取屏幕宽度
    var width = document.documentElement.clientWidth
    // 设置根元素字体大小。此时为宽的10等分
    document.documentElement.style.fontSize = width / 10 + 'px'
}

//首次加载应用，设置一次
init()
// 监听手机旋转的事件的时机，重新设置
window.addEventListener('orientationchange', init)
// 监听手机窗口变化，重新设置
window.addEventListener('resize', init)
```

无论设备可视窗口如何变化，始终设置`rem`为`width`的1/10，实现了百分比布局

除此之外，我们还可以利用主流`UI`框架，如：`element ui`、`antd`提供的栅格布局实现响应式

### 小结

响应式设计实现通常会从以下几方面思考：

- 弹性盒子（包括图片、表格、视频）和媒体查询等技术
- 使用百分比布局创建流式布局的弹性UI，同时使用媒体查询限制元素的尺寸和内容变更范围
- 使用相对单位使得内容自适应调节
- 选择断点，针对不同断点实现不同布局和内容展示

## 三、总结

响应式布局优点可以看到：

- 面对不同分辨率设备灵活性强
- 能够快捷解决多设备显示适应问题

缺点：

- 仅适用布局、信息、框架并不复杂的部门类型网站
- 兼容各种设备工作量大，效率低下
- 代码累赘，会出现隐藏无用的元素，加载时间加长
- 其实这是一种折中性质的设计解决方案，多方面因素影响而达不到最佳效果
- 一定程度上改变了网站原有的布局结构，会出现用户混淆的情况





# 24. 如果要做优化，CSS提高性能的方法有哪些？

## 一、前言

每一个网页都离不开`css`，但是很多人又认为，`css`主要是用来完成页面布局的，像一些细节或者优化，就不需要怎么考虑，实际上这种想法是不正确的

作为页面渲染和内容展现的重要环节，`css`影响着用户对整个网站的第一体验

因此，在整个产品研发过程中，`css`性能优化同样需要贯穿全程

## 二、实现方式

实现方式有很多种，主要有如下：

- 内联首屏关键CSS
- 异步加载CSS
- 资源压缩
- 合理使用选择器
- 减少使用昂贵的属性
- 不要使用@import

### 内联首屏关键CSS

在打开一个页面，页面首要内容出现在屏幕的时间影响着用户的体验，而通过内联`css`关键代码能够使浏览器在下载完`html`后就能立刻渲染

而如果外部引用`css`代码，在解析`html`结构过程中遇到外部`css`文件，才会开始下载`css`代码，再渲染

所以，`CSS`内联使用使渲染时间提前

注意：但是较大的`css`代码并不合适内联（初始拥塞窗口、没有缓存），而其余代码则采取外部引用方式

### 异步加载CSS

在`CSS`文件请求、下载、解析完成之前，`CSS`会阻塞渲染，浏览器将不会渲染任何已处理的内容

前面加载内联代码后，后面的外部引用`css`则没必要阻塞浏览器渲染。这时候就可以采取异步加载的方案，主要有如下：

- 使用javascript将link标签插到head标签最后

```js
// 创建link标签
const myCSS = document.createElement( "link" );
myCSS.rel = "stylesheet";
myCSS.href = "mystyles.css";
// 插入到header的最后位置
document.head.insertBefore( myCSS, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling );
```

- 设置link标签media属性为noexis，浏览器会认为当前样式表不适用当前类型，会在不阻塞页面渲染的情况下再进行下载。加载完成后，将`media`的值设为`screen`或`all`，从而让浏览器开始解析CSS

```html
<link rel="stylesheet" href="mystyles.css" media="noexist" onload="this.media='all'">
```

- 通过rel属性将link元素标记为alternate可选样式表，也能实现浏览器异步加载。同样别忘了加载完成之后，将rel设回stylesheet

```html
<link rel="alternate stylesheet" href="mystyles.css" onload="this.rel='stylesheet'">
```

### 资源压缩

利用`webpack`、`gulp/grunt`、`rollup`等模块化工具，将`css`代码进行压缩，使文件变小，大大降低了浏览器的加载时间

### 合理使用选择器

`css`匹配的规则是从右往左开始匹配，例如`#markdown .content h3`匹配规则如下：

- 先找到h3标签元素
- 然后去除祖先不是.content的元素
- 最后去除祖先不是#markdown的元素

如果嵌套的层级更多，页面中的元素更多，那么匹配所要花费的时间代价自然更高

所以我们在编写选择器的时候，可以遵循以下规则：

- 不要嵌套使用过多复杂选择器，最好不要三层以上
- 使用id选择器就没必要再进行嵌套
- 通配符和属性选择器效率最低，避免使用

### 减少使用昂贵的属性

在页面发生重绘的时候，昂贵属性如`box-shadow`/`border-radius`/`filter`/透明度/`:nth-child`等，会降低浏览器的渲染性能

### 不要使用@import

css样式文件有两种引入方式，一种是`link`元素，另一种是`@import`

`@import`会影响浏览器的并行下载，使得页面在加载时增加额外的延迟，增添了额外的往返耗时

而且多个`@import`可能会导致下载顺序紊乱

比如一个css文件`index.css`包含了以下内容：`@import url("reset.css")`

那么浏览器就必须先把`index.css`下载、解析和执行后，才下载、解析和执行第二个文件`reset.css`

### 其他

- 减少重排操作，以及减少不必要的重绘
- 了解哪些属性可以继承而来，避免对这些属性重复编写
- cssSprite，合成所有icon图片，用宽高加上backgroud-position的背景图方式显现出我们要的icon图，减少了http请求
- 把小的icon图片转成base64编码
- CSS3动画或者过渡尽量使用transform和opacity来实现动画，不要使用left和top属性

## 三、总结

`css`实现性能的方式可以从选择器嵌套、属性特性、减少`http`这三面考虑，同时还要注意`css`代码的加载顺序







# 25. 如何实现单行／多行文本溢出的省略样式？

## 一、前言

在日常开发展示页面，如果一段文本的数量过长，受制于元素宽度的因素，有可能不能完全显示，为了提高用户的使用体验，这个时候就需要我们把溢出的文本显示成省略号

对于文本的溢出，我们可以分成两种形式：

- 单行文本溢出
- 多行文本溢出

## 二、实现方式

### 单行文本溢出省略

理解也很简单，即文本在一行内显示，超出部分以省略号的形式展现

实现方式也很简单，涉及的`css`属性有：

- text-overflow：规定当文本溢出时，显示省略符号来代表被修剪的文本
- white-space：设置文字在一行显示，不能换行
- overflow：文字长度超出限定宽度，则隐藏超出的内容

`overflow`设为`hidden`，普通情况用在块级元素的外层隐藏内部溢出元素，或者配合下面两个属性实现文本溢出省略

`white-space:nowrap`，作用是设置文本不换行，是`overflow:hidden`和`text-overflow：ellipsis`生效的基础

`text-overflow`属性值有如下：

- clip：当对象内文本溢出部分裁切掉
- ellipsis：当对象内文本溢出时显示省略标记（...）

`text-overflow`只有在设置了`overflow:hidden`和`white-space:nowrap`才能够生效的

举个例子

```html
<style>
    p{
        overflow: hidden;
        line-height: 40px;
        width:400px;
        height:40px;
        border:1px solid red;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
<p 这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本</p >
```

效果如下：

![img](https://static.vue-js.com/bb3048e0-a0e9-11eb-85f6-6fac77c0c9b3.png)

可以看到，设置单行文本溢出较为简单，并且省略号显示的位置较好

### 多行文本溢出省略

多行文本溢出的时候，我们可以分为两种情况：

- 基于高度截断
- 基于行数截断

#### 基于高度截断

#### 伪元素 + 定位

核心的`css`代码结构如下：

- position: relative：为伪元素绝对定位
- overflow: hidden：文本溢出限定的宽度就隐藏内容）
- position: absolute：给省略号绝对定位
- line-height: 20px：结合元素高度,高度固定的情况下,设定行高, 控制显示行数
- height: 40px：设定当前元素高度
- ::after {} ：设置省略号样式

代码如下所示：

```html
<style>
    .demo {
        position: relative;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
    }
    .demo::after {
        content: "...";
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0 20px 0 10px;
    }
</style>

<body>
    <div class='demo'>这是一段很长的文本</div>
</body>
```

实现原理很好理解，就是通过伪元素绝对定位到行尾并遮住文字，再通过 `overflow: hidden` 隐藏多余文字

这种实现具有以下优点：

- 兼容性好，对各大主流浏览器有好的支持
- 响应式截断，根据不同宽度做出调整

一般文本存在英文的时候，可以设置`word-break: break-all`使一个单词能够在换行时进行拆分

#### 基于行数截断

纯`css`实现也非常简单，核心的`css`代码如下：

- -webkit-line-clamp: 2：用来限制在一个块元素显示的文本的行数，为了实现该效果，它需要组合其他的WebKit属性）
- display: -webkit-box：和1结合使用，将对象作为弹性伸缩盒子模型显示
- -webkit-box-orient: vertical：和1结合使用 ，设置或检索伸缩盒对象的子元素的排列方式
- overflow: hidden：文本溢出限定的宽度就隐藏内容
- text-overflow: ellipsis：多行文本的情况下，用省略号“…”隐藏溢出范围的文本

```html
<style>
    p {
        width: 400px;
        border-radius: 1px solid red;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
<p>
    这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
    这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
</p >
```

可以看到，上述使用了`webkit`的`CSS`属性扩展，所以兼容浏览器范围是`PC`端的`webkit`内核的浏览器，由于移动端大多数是使用`webkit`，所以移动端常用该形式

需要注意的是，如果文本为一段很长的英文或者数字，则需要添加`word-wrap: break-word`属性

还能通过使用`javascript`实现配合`css`，实现代码如下所示：

css结构如下：

```css
p {
    position: relative;
    width: 400px;
    line-height: 20px;
    overflow: hidden;

}
.p-after:after{
    content: "..."; 
    position: absolute; 
    bottom: 0; 
    right: 0; 
    padding-left: 40px;
    background: -webkit-linear-gradient(left, transparent, #fff 55%);
    background: -moz-linear-gradient(left, transparent, #fff 55%);
    background: -o-linear-gradient(left, transparent, #fff 55%);
    background: linear-gradient(to right, transparent, #fff 55%);
}
```





# 26. 说说对Css预编语言的理解？有哪些区别?

## 一、是什么

`Css` 作为一门标记性语言，语法相对简单，对使用者的要求较低，但同时也带来一些问题

需要书写大量看似没有逻辑的代码，不方便维护及扩展，不利于复用，尤其对于非前端开发工程师来讲，往往会因为缺少 `Css` 编写经验而很难写出组织良好且易于维护的 `Css` 代码

`Css`预处理器便是针对上述问题的解决方案

#### 预处理语言

扩充了 `Css` 语言，增加了诸如变量、混合（mixin）、函数等功能，让 `Css` 更易维护、方便

本质上，预处理是`Css`的超集

包含一套自定义的语法及一个解析器，根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的 `Css` 文件

## 二、有哪些

`Css`预编译语言在前端里面有三大优秀的预编处理器，分别是：

- sass
- less
- stylus

### sass

2007 年诞生，最早也是最成熟的 `Css`预处理器，拥有 Ruby 社区的支持和 `Compass` 这一最强大的 `Css`框架，目前受 `LESS` 影响，已经进化到了全面兼容 `Css` 的 `Scss`

文件后缀名为`.sass`与`scss`，可以严格按照 sass 的缩进方式省去大括号和分号

### less

2009年出现，受`SASS`的影响较大，但又使用 `Css` 的语法，让大部分开发者和设计师更容易上手，在 `Ruby`社区之外支持者远超过 `SASS`

其缺点是比起 `SASS`来，可编程功能不够，不过优点是简单和兼容 `Css`，反过来也影响了 `SASS`演变到了`Scss` 的时代

### stylus

`Stylus`是一个`Css`的预处理框架，2010 年产生，来自 `Node.js`社区，主要用来给 `Node` 项目进行 `Css` 预处理支持

所以`Stylus` 是一种新型语言，可以创建健壮的、动态的、富有表现力的`Css`。比较年轻，其本质上做的事情与`SASS/LESS`等类似

## 三、区别

虽然各种预处理器功能强大，但使用最多的，还是以下特性：

- 变量（variables）
- 作用域（scope）
- 代码混合（ mixins）
- 嵌套（nested rules）
- 代码模块化（Modules）

因此，下面就展开这些方面的区别

### 基本使用

less和scss

```css
.box {
  display: block;
}
```

### 嵌套

三者的嵌套语法都是一致的，甚至连引用父级选择器的标记 & 也相同

区别只是 Sass 和 Stylus 可以用没有大括号的方式书写

less

```css
.a {
  &.b {
    color: red;
  }
}
```

### 变量

变量无疑为 Css 增加了一种有效的复用方式，减少了原来在 Css 中无法避免的重复「硬编码」

`less`声明的变量必须以`@`开头，后面紧跟变量名和变量值，而且变量名和变量值需要使用冒号`:`分隔开

```css
@red: #c00;

strong {
  color: @red;
}
```

`sass`声明的变量跟`less`十分的相似，只是变量名前面使用`$`开头

```css
$red: #c00;

strong {
  color: $red;
}
```

### 作用域

`Css` 预编译器把变量赋予作用域，也就是存在生命周期。就像 `js`一样，它会先从局部作用域查找变量，依次向上级作用域查找

`sass`中不存在全局变量

```css
$color: black;
.scoped {
  $bg: blue;
  $color: white;
  color: $color;
  background-color:$bg;
}
.unscoped {
  color:$color;
} 
```

编译后

```css
.scoped {
  color:white;/*是白色*/
  background-color:blue;
}
.unscoped {
  color:white;/*白色（无全局变量概念）*/
} 
```

所以，在`sass`中最好不要定义相同的变量名

`less`与`stylus`的作用域跟`javascript`十分的相似，首先会查找局部定义的变量，如果没有找到，会像冒泡一样，一级一级往上查找，直到根为止

```css
@color: black;
.scoped {
  @bg: blue;
  @color: white;
  color: @color;
  background-color:@bg;
}
.unscoped {
  color:@color;
} 
```

编译后：

```css
.scoped {
  color:white;/*白色（调用了局部变量）*/
  background-color:blue;
}
.unscoped {
  color:black;/*黑色（调用了全局变量）*/
} 
```

### 混入

混入（mixin）应该说是预处理器最精髓的功能之一了，简单点来说，`Mixins`可以将一部分样式抽出，作为单独定义的模块，被很多选择器重复使用

可以在`Mixins`中定义变量或者默认参数

在`less`中，混合的用法是指将定义好的`ClassA`中引入另一个已经定义的`Class`，也能使用够传递参数，参数变量为`@`声明

```css
.alert {
  font-weight: 700;
}

.highlight(@color: red) {
  font-size: 1.2em;
  color: @color;
}

.heads-up {
  .alert;
  .highlight(red);
}
```

编译后

```css
.alert {
  font-weight: 700;
}
.heads-up {
  font-weight: 700;
  font-size: 1.2em;
  color: red;
}
```

`Sass`声明`mixins`时需要使用`@mixinn`，后面紧跟`mixin`的名，也可以设置参数，参数名为变量`$`声明的形式

引入 mixins 需要 `@incluede`

```css
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}

.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```

### 代码模块化

模块化就是将`Css`代码分成一个个模块

`scss`、`less`、`stylus`三者的使用方法都如下所示

```css
@import './common';
@import './github-markdown';
@import './mixin';
@import './variables';
```







