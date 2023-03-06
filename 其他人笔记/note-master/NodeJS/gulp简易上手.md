# Gulp



> 所有测试代码在gitee上
>
> 地址：https://gitee.com/gaohan888/node-js-learning/tree/master/gulp



基于node平台开发的前端构建工具

将机械化操作编写成任务, 想要执行机械化操作时执行一个命令行命令任务就能自动执行了，用机器代替手工，提高开发效率。



## 1. Gulp的功能

* 项目上线，HTML、CSS、JS文件压缩合并
* 语法转换（es6、less ...）
* 公共文件抽离
* 修改文件浏览器自动刷新





## 2. Gulp的使用

1.使用npm install gulp下载gulp库文件

2.在项目根目录下建立gulpfile.js文件

3.重构项目的文件夹结构 src目录放置源代码文件 dist目录放置构建后文件

4.在gulpfile.js文件中编写任务.

5.在命令行工具中执行gulp任务



### 

## 3. Gulp提供的方法

* gulp.src()：获取任务要处理的文件
* gulp.dest()：输出文件
* gulp.task()：建立gulp任务
* gulp.watch()：监控文件的变化





### 3.1 Gulp的第一个任务

```js
const gulp = require('gulp')
// 使用gulp.task()方法建立任务
gulp.task('first', () => {
    // 获取要处理的文件
    gulp.src('./src/css/base.css')
    // 将处理后的文件输出到dist目录
    .pipe(gulp.dest('./dist/css'))
})
```

> 使用gulp还需要装一个gulp的命令工具，gulp-cli



**安装这个工具**

```js
npm i gulp-cli -g
```



**使用这个命令**

```js
// 这就执行了第一个gulp命令
gulp first
```





## 4. Gulp插件

* gulp-htmlmin ：html文件压缩
* gulp-csso ：压缩css
* gulp-babel ：JavaScript语法转化
* gulp-less: less语法转化
* gulp-uglify ：压缩混淆JavaScript
* gulp-file-include 公共文件包含
* browsersync 浏览器实时同步





### 4.1 gulp-htmlmin

功能：压缩html文件



安装：

```js
npm install --save gulp-htmlmin
```





简单使用：

```js
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
 
gulp.task('minify', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});
```





### 4.2 gulp-file-include

功能：公共文件的包含



安装：

```js
npm install --save-dev gulp-file-include
```





使用：

1. 先将公共代码切割开来

   相同的html代码放入common/header.html中

2. 在article.html和default.html 中引入公共代码

   ```gulp
   @@include('./common/header.html')
   ```

3. 在gulpfile.js引入 gulp-file-include

   在html压缩插件前使用

   ```js
   const fileinclude = require('gulp-file-include');
   gulp.task('minify', () => {
     return gulp.src('src/*.html')
       // 在压缩前先引入公共代码 gulp-file-include
       .pipe(fileinclude())
       .pipe(htmlmin({ collapseWhitespace: true }))
       .pipe(gulp.dest('dist'));
   });
   ```

   



### 4.3 gulp-less gulp-csso

功能：将less转成css，压缩 gulp-csso



安装：

```js
npm install gulp-less
npm install gulp-csso --save-dev
```



使用：

```js
const less = require('gulp-less');
const csso = require('gulp-csso');
gulp.task('less', () => {
  return gulp.src(['src/css/*.less', 'src/css/*.css'])
    // 将less语法转换为css语法
    .pipe(less())
    // 将css代码进行压缩
    .pipe(csso())
    // 将处理的结果进行输出
    .pipe(gulp.dest('dist/css'))
})
```





### 4.4 gulp-babel gulp-uglify

功能：

将es6转换成es5， 压缩 js 文件





安装:

```
npm install --save-dev gulp-babel @babel/core @babel/preset-env
npm install --save-dev gulp-uglify
```



使用：

```js
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
gulp.task('jsmin', () =>
    gulp.src('src/js/*.js')
        .pipe(babel({
          // 它可以判断当前代码的运行环境，将代码转换成当前环境所需要的代码
            presets: ['@babel/env']
        }))
        // 压缩js代码
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
);
```





### 4.5 一条命令构建所有转换压缩任务

```js
// 构建任务
// gulp4指定写法
gulp.task('build', gulp.parallel('minify', 'less', 'jsmin', 'copy', () => {
  // build the website.
}));
```

> 执行这条命令在命令行执行 gulp build
