# 二叉树的基础知识

![二叉树大纲](https://img-blog.csdnimg.cn/20210219190809451.png)

> 基础知识看代码随想录上的就行了



# 二叉树的递归遍历

递归的三要素

1. **确定递归函数的参数和返回值：** 确定哪些参数是递归的过程中需要处理的，那么就在递归函数里加上这个参数， 并且还要明确每次递归的返回值是什么进而确定递归函数的返回类型。
2. **确定终止条件：** 写完了递归算法, 运行的时候，经常会遇到栈溢出的错误，就是没写终止条件或者终止条件写的不对，操作系统也是用一个栈的结构来保存每一层递归的信息，如果递归没有终止，操作系统的内存栈必然就会溢出。
3. **确定单层递归的逻辑：** 确定每一层递归需要处理的信息。在这里也就会重复调用自己来实现递归的过程。



好了，我们确认了递归的三要素，接下来就来练练手：

**以下以前序遍历为例：**

**确定递归函数的参数和返回值**：因为要打印出前序遍历节点的数值，所以参数里需要传入cur在放节点的数值和要记录数据的数组result，除了这一点就不需要在处理什么数据了也不需要有返回值，代码如下：

```js
var traversal = function (cur, result) {}
```

**确定终止条件**：在递归的过程中，如何算是递归结束了呢，当然是当前遍历的节点是空了，那么本层递归就要要结束了，所以如果当前遍历的这个节点是空，就直接return，代码如下：

```cpp
if (cur == NULL) return;
```

**确定单层递归的逻辑**：前序遍历是中左右的循序，所以在单层递归的逻辑，是要先取中节点的数值，代码如下：

```js
// 先中间节点
result.push(cur.val)
// 然后左子树
traversal(cur.left, result);
// 右子树
traversal(cur.right, result)
```

单层递归的逻辑就是按照中左右的顺序来处理的，这样二叉树的前序遍历，基本就写完了，再看一下完整代码：

前序遍历：

```JS
var traversal = function (cur, result) {
    // 判断递归结束条件
    if(cur === null) return;
    // 先中间节点
    result.push(cur.val)
    // 然后左子树
    traversal(cur.left, result);
    // 右子树
    traversal(cur.right, result)
}
var preorderTraversal = function(root) {
    // 用来存结果
    let result = []
    traversal(root, result)
    return result
};
```

那么前序遍历写出来之后，中序和后序遍历就不难理解了，代码如下：

**中序遍历**

```js
var traversal = function (cur, result) {
    if(cur === null) return
    // 中序遍历先左子树
    traversal(cur.left, result)
    // 再中间节点
    result.push(cur.val)
    // 再右子树
    traversal(cur.right, result)
}
var inorderTraversal = function(root) {
    let result = []
    traversal(root, result)
    return result
};
```

**后序遍历**

```js
var traversal = function (cur, result) {
    if(cur === null) return
    // 先左子树
    traversal(cur.left, result)
    // 右子树
    traversal(cur.right, result)
    result.push(cur.val)
}
var postorderTraversal = function(root) {
    let result = []
    traversal(root, result)
    return result
};
```

