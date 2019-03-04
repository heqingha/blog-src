---
title: Javascript基础（三）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
keywords: 闭包,深拷贝与浅拷贝,模块化
description: 闭包,深拷贝与浅拷贝,模块化
photos: /img/2015/javascript.jpeg
abbrlink: 8ec381be
date: 2018-01-29 11:09:31
tags:
- javascript
---


## 闭包
闭包的定义很简单：函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包。

```javascript
function A(){
  var a = 1;
  function B(){
    console.log(a);
  }
  return B;
}
```
**问**：为什么函数 A 已经弹出调用栈了，为什么函数 B 还能应用到函数 A 中的变量？
**解**：这是因为函数 A 中的变量这时是存在堆上的，js引擎可通过逃逸分析辨别出哪些变量需要存储在 **堆** 上，哪些需要存储在 **栈** 上。

**例问** 循环中使用闭包解决`var`定义函数的问题。

```javascript
for(var i = 0; i < 10; i++) {
  setTimeout(function timer(){
    console.log(i)
  }, i*1000)
}
```
首先`setTimeout`是个异步函数，所以会把循环全部执行完毕，这个时候`i`是 **10**，随意会输出 **10** 个 `10`。

**例解1**：使用闭包

```javascript
for(var i = 0; i < 10; i++) {
  (function(i){
    setTimeout(function timer(){
      console.log(i)
    }, i*1000);
  })(i);
}
```

**例解2**：使用`setTimeout`

```javascript
for ( var i = 0; i < 10; i++) {
	setTimeout( function timer(j) {
		console.log(j);
	}, i*1000, i);
}
```

**例解3**：使用`let`（块级作用域）0

```javascript
for(var i = 0; i < 10; i++) {
  setTimeout(function timer(){
    console.log(i)
  }, i*1000)
}
```


## 深拷贝与浅拷贝

```javascript
let a = {
  age: 20
};
let b = a;
a.age = 26;
console.log(b.age); // 26
```

上述，给一个变量赋值一个对象，那么两者的值会是同一个引用。

通常开发中，我们不希望如此，可以通过 **浅拷贝** 解决此问题。

#### 浅拷贝
1.通过`Object.assign`来解决

```javascript
let a = {
  age: 20
}
let b = Object.assign({}, a);  // 也可以通过展开运算符 let b = {。。。a};
a.age = 26；
console.log(b.age); // 20
```

通常浅拷贝就能解决大部分问题，但是当我们遇到以下情况就需要使用 **深拷贝** 

```javascript
let a = {
  age: 20,
  jobs: {
    first: 'Frontend'
  }
}
let b = {...a};
a.jobs.first = 'Backend';
console.log(b.jobs.first); // backend
```

可见，浅拷贝只是解决了第一层问题，如果接下去的值中还有对象的话，那么又回到刚开始的话题，两者享有相同的引用。要解决这个问题，**深拷贝** 得上场了。

#### 深拷贝

1.通常可通过`JSON.parse(JSON.stringify(object))`来解决

```javascript
let a = {
  age: 20,
  jobs: {
    first: 'Frontend'
  }
}
let b = JSON.parse(JSON.stringify(a));
a.jobs.first = 'Backend';
console.log(b.jobs.first); // Frontend
```

2.是不是很帅气，但是这个方法也是有缺陷的
- 会忽略`undefined`和`symbol`
- 不能序列化函数
- 不能解决循环引用对象的问题

问题：循环引用对象的问题

```javascript
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3
  }
}
obj.c = obj.b;
obj.e = obj.a;
obj.b.c = obj.c;
let newObj = JSON.parse(JSON.stringify(obj)); // 报错
```

问题：`undefined`和`symbol`忽略问题和不能序列化函数

```javascript
let a = {
  age: undefined,
  sex: Symbol('male'),
  jobs: function(){},
  name: 'frontend'
}
let b = JSON.parse(JSON.stringify(a));
console.log(b); // {name: "frontend"}
```

3.如果你的数据中含有上面3中情况，可使用[lodash的深拷贝函数](https://lodash.com/docs#cloneDeep)


## 模块化

#### 在没有Babel的情况下，可使用ES6的模块化

```javascript
// file1.js
export function a(){}
export function b(){}

// file2.js
export default function() {}

// file3.js
import { a, b } from './file1.js';
import xxx from './file2.js';
```

#### Commonjs
`Commonjs`是nodejs独有的规范，浏览器中使用就需要用到`Browserify`解析了。

```javascript
// file1.js
module.exports = {
  a: 1
}
// 或
exports.a = 1;

// file2.js
var file = require('./file1.js');
console.log(file.a); // 1
```

上述代码中，`module.exports`和`exports`容易混淆，其实内部实现很简单

```javascript
var file = require('./file1.js');
file.a
// 这里其实就是包装了一层立即执行函数，这样就不会污染全局变量了
// 重要的是module这里，module是nodejs独有的一个变量
module.exports = {
  a: 1
}

// 基本实现
var module = {
  exports : {}
}
// 这个是为什么exports和module.exports用法相似的原因
var exports = module.exports;
var load = function(module) {
  var a = 1;
  module.exports = a;
  return module.exports;
}
```
`module.exports`和`exports`用法很相似，但是不能对`exports`直接赋值，不会有任何效果。


#### Commonjs和ES6中的模块化两种的区别
1.前者支持动态导入，也就是`require(${path}/xx.js)`，后者目前不支持，但已有提案。
2.前者是同步导入，因为用于服务器端，文件都在本地，同步导入及时卡住主线程影响也不大。后者是异步导入，用于浏览器端，需要下载文件，如果也采用同步导入会对渲染有很大影响。
3.前者导出时时值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。后者采用实时绑定的方式，导入导出的值都指向同一内存地址，所以导入值会随导出值变化。
4.后者会编译成`require/exports`来执行。


#### AMD
是有`Requirejs`提出

```javascript
// AMD
defined(['./file1.js', 'file2.js'], function(a, b){
  a.do();
  b.do();
});

define(function(require, exports, module) {
  var a = require('file1.js');
  a.do();
  var b = require('file2.js');
  b.do();
});
```

## 原文地址
https://yuchengkai.cn/docs/frontend