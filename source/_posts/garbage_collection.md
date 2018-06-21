---
title: 垃圾回收机制方式及内存管理
author: 胖芮
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
tags: 面试
abbrlink: 478139c0
date: 2015-01-13 09:47:03
---

# 回收机制方式
## 定义和用法
垃圾回收机制(GC:Garbage Collection),执行环境负责管理代码执行过程中使用的内存。

## 原理
垃圾收集器会定期（周期性）找出那些不在继续使用的变量，然后释放其内存。但是这个过程不是实时的，因为其开销比较大，所以垃圾回收器会按照固定的时间间隔周期性的执行。

## 实例
```
function fn1() {
  var obj = { name: "fn1", age: 18 };
}

function fn2() {
  var obj = { name: "fn2", age: 18 };
  return obj;
}

var a = fn1();
var b = fn2();
```
fn1中定义的obj为局部变量，而当调用结束后，出了fn1的环境，那么该块内存会被js引擎中的垃圾回收器自动释放；在fn2被调用的过程中，返回的对象被全局变量b所指向，所以该块内存并不会被释放。

## 垃圾回收策略
### 标记清除(较为常用)
* 定义和用法
当变量进入环境时，将变量标记"进入环境"，当变量离开环境时，标记为："离开环境"。某一个时刻，垃圾回收器会过滤掉环境中的变量，以及被环境变量引用的变量，剩下的就是被视为准备回收的变量。
到目前为止，`IE、Firefox、Opera、Chrome、Safari` 的js实现使用的都是标记清除的垃圾回收策略或类似的策略，只不过垃圾收集的时间间隔互不相同。
### 引用计数
