// 主要用于函数调用的时候，将一个数组变为参数序列
function show(array, ...item) {
  array.push(...item);
  console.log(array);
}

show([1, 2, 3], [4, 5, 6]);

