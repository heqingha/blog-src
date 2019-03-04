---
title: 偏函数
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/2015/javascript.jpeg
abbrlink: 72cd8a39
date: 2016-05-19 09:25:01
tags: 函数
keywords:
description:
---
## 概念
通过指定部分参数来产生一个新的定制函数的形式就是 **偏函数**。

## 解决问题
如果我们有函数是多个参数的，我们希望能固定其中某几个参数的值。

## 示例

```javascript
// 函数定义
const isType = type => { // 函数A
  return obj => { // 产生的新函数 - 函数B - 偏函数
    return toString.call(obj) == "[object " + type + "]";
  };
};

// 产生的新函数 - 函数B - 偏函数
const isUndefined = isType('Undefined');
const isNull = isType('Null');
const isString = isType("String");
const isNumber = isType("Number");
const isBoolean = isType("Boolean");
const isArray = isType("Array");
const isObject = isType("Object");
const isFnction = isType("Function");

// 测试
console.log('isUndefined: ', isUndefined(undefined)); // true
console.log('isUndefined: ', isUndefined(1)); // false
console.log('isNull: ', isNull(null)); // true
console.log('isNull: ', isNull(2)); // false
console.log('isString: ', isString('1')); // true
console.log('isString: ', isString(1)); // false
console.log('isNumber: ', isNumber(1)); // true
console.log('isNumber: ', isNumber('1')); // false
console.log('isBoolean: ', isBoolean(false)); // true
console.log('isBoolean: ', isBoolean(1)); // false
console.log('isArray: ', isArray([])); // true
console.log('isArray: ', isArray('')); // false
console.log('isObject: ', isObject({})); // true
console.log('isObject: ', isObject('')); // false
console.log('isFnction: ', isFnction(function() {})); // true
console.log('isFnction: ', isFnction('')); // false
```

`isType` 函数是预置了判断类型的函数，函数中产生新函数B（`isString、isArray、isObject...`）,这些新生成的函数就是偏函数。其实 jquery 的 `$.ajax, $.get 和 $.post` 也是类似原理。

## 推荐
- [高阶函数](/blog/post/47f3f95c.html)
- [函数柯里化](/blog/post/dc7a41e4.html)