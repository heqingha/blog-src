---
title: 高阶函数
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/2015/javascript.jpeg
abbrlink: 47f3f95c
date: 2016-05-18 18:15:37
tags: 函数
keywords: 
description: 
---

![高阶函数](47f3f95c/1.png)

## 概念
高阶函数 Higher-order function，简而言之就是将一个函数作为参数的函数或将函数作为返回值的函数。

在数学和计算机科学中，高阶函数是至少满足下列一个条件的函数：

- 接受一个或多个函数作为输入
- 输出一个函数

##  条件一：接受一个或多个函数作为输入

javascript 的函数其实都指向某个变量。函数的参数能接收变量，那么也能接收一个函数，能接收函数作为参数的函数可称为高阶函数。

```javascript
const sum = (x, y, f) => {
  return f(x) + f(y);
};
```

调用 sum(-1, 1, Math.abs)时，推导过程

```javascript
x = -1; y = 1; f = Math.abs; f(x) + f(y) ==> Math.abs(-1) + Math.abs(1) ==> 1 + 1; return 2
```

用代码验证一下

```javascript
sum(-1, 1, Math.abs); // 2
```

再举个例子，Array.prototype.sort 方法，接收一个参数作为参数，函数里面封装的是对数组进行排序的规则。

```javascript
const arr = [1, 3, 5, 2, 4, 9, 0];
const desc = function(a, b) {
  return b - a;
};
arr.sort(desc);
```

编写高阶函数，就是让函数的参数能够接收别的函数。还有常见的事件绑定回调函数，ajax 回调函数等都属于高阶函数。

## 条件二：返回值输出

函数既可以作为参数传递输入，也可以作为其他函数的返回值输出。

高阶函数还可作为一种模式的构造器，比如若干排序算法（快排、冒泡、希尔等），就可以生成一个排序器。

```javascript
const desc = (a, b) => {
  return b - a;
};

const sortGenerator = desc => {
  return (...args) => {
    return args.sort(desc);
  };
};

console.log(sortGenerator(desc)(1, 2, 3)); // [ 3, 2, 1 ]
```

或许你会好奇可以调用一次函数，为嘛多此一举？多包装一层就可以干很多额外的事。比如测试每个排列算法的耗时。

再举个 ajax 封装的例子，接收两个参数 method 和 callback，即请求类型和回调。每次都传入请求类型很麻烦，那么生成两个新的函数 ajaxGet 和 ajaxPost.

```javascript
const ajaxGenerator = method => {
  return (url, callback) => {
    ajax(method, url, callback);
  };
};

const ajaxGet = ajaxGenerator("GET");
const ajaxPost = ajaxGenerator("POST");

ajaxGet("/v1/api/getUser", myCallback);
ajaxPost("/v1/api/getUser", myCallback);
```

以上像不像函数的柯里化，是的它属于高阶函数的降级。

## 推荐

- [函数柯里化](/blog/post/dc7a41e4.html)
- [偏函数](/blog/post/72cd8a39.html)
