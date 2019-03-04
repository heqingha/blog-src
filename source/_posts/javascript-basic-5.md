---
title: Javascript基础（五）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
keywords: Promise实现,Generator实现,Map、FlatMap 和 Reduce,async和await
description: Promise实现,Generator实现,Map、FlatMap 和 Reduce,async和await
photos: /img/2015/javascript.jpeg
abbrlink: 67a0248b
date: 2018-01-31 18:02:28
tags:
- javascript
---

## Promise实现
Promise 是 ES6 新增的语法，解决了回调地狱的问题。

可以把 Promise 看成一个状态机。初始是 `pending` 状态，可以通过函数 `resolve` 和 `reject`，将状态转变为 `resolved` 或者 `rejected` 状态，状态一旦改变就不能再次变化。

`then` 函数会返回一个 Promise 实例，并且该返回值是一个新的实例而不是之前的实例。因为 Promise 规范规定除了 `pending` 状态，其他状态是不可以改变的，如果返回的是一个相同实例的话，多个 `then` 调用就失去意义了。

对于 `then` 来说，本质上可以把它看成是 `flatMap`

```javascript
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn) {
  let _this = this;
  _this.currentSteate = PENDING;

  _this.resolvedCallbacks = [];
  _this.rejectedCallbacks = [];

  _this.resolve = function(){
    setTimeout(() => { // 异步执行
      if(_this.currentState === PENDING) {
        _this.currentState = RESOLVED;
      }
    })
  }
  _this.reject = function(){}

  // 执行
  try {
    fn(_this.resolve, _this.reject);
  } catch (e) {
    _this.reject(e);
  }
}

MyPromise.prototype.then = function(onResolved, onRejected){

}

new MyPromise().then()
```

## Generator实现


## Map、FlatMap 和 Reduce


## async和await


## 原文地址
https://yuchengkai.cn/docs/frontend