---
title: 如何理解闭包
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
tags: 面试
abbrlink: 235a99cf
date: 2015-01-10 19:17:48
---
# 定义和用法
当一个函数的返回值是另外一个函数，而返回的那个函数如果调用了其父函数内部的其它变量，如果返回的这个函数在外部被执行，就产生了闭包。

# 表现形式
使函数外部能够调用函数内部定义的变量。
<!--more-->
# 实例如下
根据作用域链的规则，底层作用域没有声明的变量，会向上一级找，找到就返回，没找到就一直找，直到window的变量，没有就返回 `undefined`。这里明显 `count` 是函数内部的 `flag2` 的那个 `count`。
```
var count = 10; // 全局作用域 标记为flag1
function add(){
  var count = 0; // 函数全局作用域 标记为flag2
  return function(){
    count += 1;
    console.log(count);
  }
}
var s = add();
s(); // 1
s(); // 2
```

# 变量的作用域
要理解闭包，首先必须理解Javascript特殊的变量作用域。

分类：
* 全局变量
* 局部变量

特点：
* 1、函数内部可以读取函数外部的全局变量；在函数外部无法读取函数内的局部变量。
* 2、函数内部声明变量的时候，一定要使用var命令。如果不用的话，你实际上声明了一个全局变量！

# 使用闭包的注意点
* 滥用闭包，会造成内存泄漏：由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
* 会改变父函数内部变量的值。所以，如果你把父函数当作对象 `(object)` 使用，把闭包当作它的公用方法 `(Public Method)`，把内部变量当作它的私有属性 `(private value)`，这时一定要小心，不要随便改变父函数内部变量的值。