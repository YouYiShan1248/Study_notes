> 记录一下数组刷题目录和题解
>
> 具体题目和题解参考代码随想录和leetcode官方



# 刷题

## 二分查找

地址：https://leetcode-cn.com/problems/binary-search/

二分查找涉及的很多的边界条件，逻辑比较简单，但就是写不好。例如到底是 `while(left < right)` 还是 `while(left <= right)`，到底是`right = middle`呢，还是要`right = middle - 1`呢

写二分法，区间的定义一般为两种，左闭右闭即[left, right]，或者左闭右开即[left, right)。

我就主要掌握一种，左闭右闭。

代码：

```js
var search = function(nums, target) {
    // 定义target在左闭右闭的区间里，[left, right]
    let left = 0;
    let right = nums.length - 1;
    // 当left==right，区间[left, right]依然有效，所以用 <=
    while(left <= right) {
        // 防止溢出 等同于(left + right)/2
        let mid = left + Math.floor((right - left) / 2);
        if(nums[mid] > target) {
            // target 在左区间，所以[left, middle - 1]
            right = mid - 1;
        } else if(nums[mid] < target) {
            // target 在右区间，所以[middle + 1, right]
            left = mid + 1;
        } else {
            // 数组中找到目标值，直接返回下标
            return mid;
        }
    }
    return -1;
};
```





## 移除元素

地址：https://leetcode-cn.com/problems/remove-element/

数组的移除元素有两种方法：

* 暴力法：两层for循环，一个for循环遍历数组元素 ，第二个for循环更新数组。
* 双指针法：**通过一个前指针和后指针在一个for循环下完成两个for循环的工作。**

暴力法的时间复杂达到O(n*n) 就不展示了，详细看看双指针法。

删除过程图示：

![27.移除元素-双指针法](https://tva1.sinaimg.cn/large/008eGmZEly1gntrds6r59g30du09mnpd.gif)

```js
//  简化版双指针法 O(n)
var removeElement = function(nums, val) {
    let left = 0;
    for(let right = 0; right < nums.length; right++) {
        if(nums[right] !== val) {
            nums[left] = nums[right];
            left++;
        }
    }
    return left;
};
```





## 有序数组的平方

地址：https://leetcode-cn.com/problems/squares-of-a-sorted-array/

这题也是两个方法解决

* 暴力法：每个数平方之后，排个序
* 双指针法

详细讲解双指针法：

数组其实是有序的， 只不过负数平方之后可能成为最大数了。

那么数组平方的最大值就在数组的两端，不是最左边就是最右边，不可能是中间。

此时可以考虑双指针法了，i指向起始位置，j指向终止位置。

定义一个新数组result，和A数组一样的大小，让k指向result数组终止位置。

如果`A[i] * A[i] < A[j] * A[j]` 那么`result[k--] = A[j] * A[j];` 。

如果`A[i] * A[i] >= A[j] * A[j]` 那么`result[k--] = A[i] * A[i];` 。

如动画所示：

![img](https://code-thinking.cdn.bcebos.com/gifs/977.%E6%9C%89%E5%BA%8F%E6%95%B0%E7%BB%84%E7%9A%84%E5%B9%B3%E6%96%B9.gif)

代码：

```js
var sortedSquares = function(nums) {
    let result = [];
    let index = nums.length - 1;
    let left = 0;
    let right = nums.length - 1;
    while(left <= right) {
        if(nums[left] * nums[left] <= nums[right] * nums[right]) {
            result[index--] = nums[right] * nums[right];
            right--;
        } else {
            result[index--] = nums[left] * nums[left];
            left++;
        }
    }
    return result;
};
```



## 长度最小的子数组

地址：https://leetcode-cn.com/problems/minimum-size-subarray-sum/

代码随想录上讲解的滑动窗口讲的非常好。

地址：https://www.programmercarl.com/0209.%E9%95%BF%E5%BA%A6%E6%9C%80%E5%B0%8F%E7%9A%84%E5%AD%90%E6%95%B0%E7%BB%84.html#_209-%E9%95%BF%E5%BA%A6%E6%9C%80%E5%B0%8F%E7%9A%84%E5%AD%90%E6%95%B0%E7%BB%84

接下来就开始介绍数组操作中另一个重要的方法：**滑动窗口**。

所谓滑动窗口，**就是不断的调节子序列的起始位置和终止位置，从而得出我们要想的结果**。

这里还是以题目中的示例来举例，s=7， 数组是 2，3，1，2，4，3，来看一下查找的过程：

![209.长度最小的子数组](https://code-thinking.cdn.bcebos.com/gifs/209.%E9%95%BF%E5%BA%A6%E6%9C%80%E5%B0%8F%E7%9A%84%E5%AD%90%E6%95%B0%E7%BB%84.gif)

最后找到 4，3 是最短距离。

其实从动画中可以发现滑动窗口也可以理解为双指针法的一种！只不过这种解法更像是一个窗口的移动，所以叫做滑动窗口更适合一些。

在本题中实现滑动窗口，主要确定如下三点：

- 窗口内是什么？
- 如何移动窗口的起始位置？
- 如何移动窗口的结束位置？

窗口就是 满足其和 ≥ s 的长度最小的 连续 子数组。

窗口的起始位置如何移动：如果当前窗口的值大于s了，窗口就要向前移动了（也就是该缩小了）。

窗口的结束位置如何移动：窗口的结束位置就是遍历数组的指针，窗口的起始位置设置为数组的起始位置就可以了。

**代码**

```js
var minSubArrayLen = function(target, nums) {
    // 长度为 len, res 为子数组的长度
    let len = nums.length;
    // 如果所有子数组相加都没有超过 target,就返回 0
    // 所以就设置 res 的初始长度为 len + 1
    let res = len + 1;
    // 滑动窗口的 两个指针 left right
    let left = 0;
    // 累加的和
    let sum = 0;
    // 开始窗口滑动
    for(let right = 0; right < len; right++) {
        sum += nums[right];
        // 注意这里使用while，每次更新 left（起始位置），并不断比较子序列是否符合条件
        while(sum >= target) {
            // 取更短的序列
            res = res < right - left + 1? res : right - left + 1;
            // 这里体现出滑动窗口的精髓之处，不断变更left（子序列的起始位置）
            sum -= nums[left++];
        }
    }
    // 如果res超过len，就返回0，说明没有符合条件的子序列
    return res > len ? 0 : res;
};
```





## 螺旋矩阵(多记忆)

地址：https://leetcode-cn.com/problems/spiral-matrix-ii/

画个图就能理解了。

模拟顺时针画矩阵的过程:

- 填充上行从左到右
- 填充右列从上到下
- 填充下行从右到左
- 填充左列从下到上

由外向内一圈一圈这么画下去。

![螺旋矩阵](https://img-blog.csdnimg.cn/2020121623550681.png)

**代码：**

```js
var generateMatrix = function(n) {
    // js 创建二维数组的方式
    let matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
    // 定义每循环一圈的起始位置
    let startx = 0;
    let starty = 0;
    // 每个圈循环几次，例如n为奇数3，那么loop = 1只是循环一圈，矩阵中间的值需要单独处理
    let loop = Math.floor(n / 2);
    // 矩阵中间的位置，例如 n 为 3，中间的位置为(1,1) n 为 5，中间的位置为(2,2)
    let mid = Math.floor(n / 2);
    // 用来给矩阵每一个空格赋值
    let count = 1;
    // 每一圈循环，需要控制每一条边遍历的长度
    let offset = 1;
    let i,j;
    while(loop--) {
        i = startx;
        j = starty;
        // 下面开始的四个for就是循环模拟转了一圈
        // 模拟填充上行从左到右(左闭右开)
        for(j = starty; j < starty + n - offset; j++) {
            matrix[i][j] = count++;
        }
        // 模拟填充右列从上到下(左闭右开)
        for(i = startx; i < startx + n - offset; i++) {
            matrix[i][j] = count++;
        }
        // 模拟填充下行从右到左（左闭右开）
        for(; j > starty; j--) {
            matrix[i][j] = count++;
        }
        // 模拟填充左列从下到上(左闭右开)
        for(; i > startx; i--) {
            matrix[i][j] = count++;
        }

        // 第二圈开始的时候，起始位置要各自加1， 例如：第一圈起始位置是(0, 0)，第二圈起始位置是(1, 1)
        startx++;
        starty++;

        // offset 控制每一圈里每一条边遍历的长度
        offset += 2;
    }

    // 如果n为奇数的话，需要单独给矩阵最中间的位置赋值
    if(n % 2) {
        matrix[mid][mid] = count;
    }
    return matrix
};
```

