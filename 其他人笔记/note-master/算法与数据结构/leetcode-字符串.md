# leetcode-字符串

## 反转字符串

地址：https://leetcode.cn/problems/reverse-string/

简单。。

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    for(let i = 0; i < Math.floor(s.length / 2); i++) {
        let temp = s[i];
        s[i] = s[s.length - i - 1];
        s[s.length - i -1] = temp
    }
    return s
};
```



## (*)反转字符串 ||

地址：https://leetcode.cn/problems/reverse-string-ii/

字符串不好处理，转成数组来解决，这题不难，就是要仔细考虑考虑边界的问题

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseString = function(arr, left, right) {
    while(left < right) {
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
};
var reverseStr = function(s, k) {
    let arr = Array.from(s);
    // 这个 = 会漏掉
    // i++ 是自增，会改变自身
    // i + 2 * k 必须要自身来接 i += 2 * k
    for(let i = 0; i < arr.length; i += 2 * k ) {
        reverseString(arr, i, Math.min(k - 1, s.length - i - 1) + i)
    }
    return arr.join('')
};
```





## 替换空格

地址：https://leetcode.cn/problems/ti-huan-kong-ge-lcof/

参考：代码随想录。

### 简单解法

正则就可以解决

```js
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
    return s.replace(/\s/g, '%20')
};
```



### 转换成数组解决

```js
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
    let arr = s.split(' ');
    for(let i = 1; i < arr.length; i += 2) {
        arr.splice(i, 0, '%20');
    }
    return arr.join('')
};
```



## 翻转字符串里的单词

地址：[151. 颠倒字符串中的单词 - 力扣（LeetCode）](https://leetcode.cn/problems/reverse-words-in-a-string/)

> 这题的要求
>
> **进阶：**如果字符串在你使用的编程语言中是一种可变数据类型，请尝试使用 `O(1)` 额外空间复杂度的 **原地** 解法。

显然， js的 字符串是不可变的。

这题就用数组和字符串API解决（先将字符串转换成数组）

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    return s.split(' ').filter(item => item != '').reverse().join(' ').trim();
};
```





## (*)实现 strStr()(KMP)

地址：https://leetcode.cn/problems/implement-strstr/

这题简答解决就是直接调用API解决，但这题往深了说是想考KMP算法，KMP思想其实不难，但在实现过程中有很多巧合（这一定有内在的数学联系，不过我理解不了，这能把他当成一种巧合），所以不要去理解它，去感受它。

在寻找这个规律的过程可以看看代码随想录的讲解：https://www.bilibili.com/video/BV1PD4y1o7nd/

JS实现KMP

```js
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle.length === 0)
        return 0;

    const getNext = (needle) => {
        let next = [];
        let j = 0;
        next.push(j);

        for (let i = 1; i < needle.length; i++) {
            while (j > 0 && needle[i] !== needle[j])
                j = next[j - 1];
            if (needle[i] === needle[j])
                j++;
            next.push(j);
        }
        return next;
    }

    let next = getNext(needle);
    let j = 0;
    for (let i = 0; i < haystack.length; i++) {
        while (j > 0 && haystack[i] !== needle[j])
            j = next[j - 1];
        if (haystack[i] === needle[j])
            j++;
        if (j === needle.length)
            return (i - needle.length + 1);
    }

    return -1;
};
```



## (*)重复的子字符串

地址：https://leetcode.cn/problems/repeated-substring-pattern/

简单解法：调用API，哈哈

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
    for(let i = 0; i < s.length; i++) {
        let str = s;
        let cstr = s.slice(0, i);
        let nstr = s.replaceAll(cstr, '');
        if(nstr == '') {
            return true
        }
    }
    return false
};
```

深入解法：

凡是遇到字串的问题，都看看是否可以用KMP算法解决，这题也可以用KMP解决。

参考代码随想录：

![image-20220528165206105](C:\Users\28318\AppData\Roaming\Typora\typora-user-images\image-20220528165206105.png)

> 很多时候，题目更高效率的解决都是规律的发现，但规律的背后都是数学原理（咱理解不了），所以感受它，不要理解。。。

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
    if (s.length === 0)
        return false;

    const getNext = (s) => {
        let next = [];
        let j = -1;

        next.push(j);

        for (let i = 1; i < s.length; i++) {
            while (j >= 0 && s[i] !== s[j + 1])
                j = next[j];
            if (s[i] === s[j + 1])
                j++;
            next.push(j);
        }

        return next;
    }

    let next = getNext(s);

    if (next[next.length - 1] !== -1 && s.length % (s.length - (next[next.length - 1] + 1)) === 0)
        return true;
    return false;
};
```

