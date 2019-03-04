---
title: 比较typeof与instanceof
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about/'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
tags: 面试
abbrlink: a82d56ca
date: 2015-01-09 17:54:29
---
## 相同点
`JavaScript` 中 `typeof` 和 `instanceof` 常用来判断一个变量是否为空，或者是什么类型的。

### typeof的定义和用法
返回值是一个字符串，用来说明变量的数据类型。
<!--more-->
* `typeof` 一般只能返回如下几个结果：`number,boolean,string,function,object,undefined`
* `typeof` 来获取一个变量是否存在，如 `if(typeof a !== "undefined"){ alert("ok") }`，而不要去使用 `if(a)` 因为如果 `a` 不存在（未声明）则会出错
* 对于 Array,Null 等特殊对象使用 typeof 一律返回 object，这正是 typeof 的局限性

### Instanceof定义和用法
`instanceof` 用于判断一个变量是否属于某个对象的实例。
```
a instanceof b ? alert("true") : alert("false"); // a是b的实例 ? 真 : 假
```

```
var a = new Array(); 
alert(a instanceof Array);  // true
alert(a instanceof Object)  // true
```

如上，会返回 `true`，同时 `alert(a instanceof Object)` 也会返回 `true`; 这是因为 `Array` 是 `object` 的子类。

```
function test(){};
var a = new test();
alert(a instanceof test)   // true
```