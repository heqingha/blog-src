---
title: Promise与异步
author: 江湖再见
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /_posts/cli-cnr/cnr.png
tags:
  - promise
  - 异步
abbrlink: 822f60b3
date: 2016-03-14 09:46:02
---
## 前言
不知道promise，大家现在用了吗？如果还不了解的话，今天就来对了～基础的了解起来～

## 正文
接触过promise的的都知道它的应用场景和用途，`Promise`可以用来**避免异步操作函数里的嵌套回调**（`callback hell`）问题，因为解决异步最直接的方法是回调嵌套，将后一个的操作放在前一个操作的异步回调里，但如果操作多了，就会有很多层的嵌套。

`Promise`的实现方式比较多，有丰富的第三方库，`ES6`也已经原生支持了`Promise`，`jquery`中也有`$.Deferred()`等可以解决异步嵌套问题。

先给下`Promise`学术点的描述：
`promise`代表一个异步操作的执行返回状态，这个执行返回状态在`promise`对象创建时未必已知。它允许你为异步操作的**成功或失败**指定处理方法。

这使得异步方法可以像同步方法那样返回值：异步方法会返回一个包含了原返回状态的 `promise` 对象来替代原返回状态。

## Promise的适用场景
`Promise`并非适用于所有的异步场景，例如事件的绑定，某个程度上`Promise`有点类似事件的监听回调，当触发某个操作时进行后面特定的逻辑。但`Promise`只能执行一次，且需要前面特定的操作执行完成才会进行下一步，一般分成功和失败两种场景，成功或失败后会立即执行响应函数。这就很适合判断一个比较耗时的操作是否最终执行成功的场景，就如我们通常理解的`ajax网络请求`、读取`localstorage`等操作。


## Promise的表现
如果使用回调方法处理多个操作的异步场景，判断某个操作成功或失败的控制在于声明的匿名函数里面，使用`Promise`对象则可以重新定义异步执行的状态和控制逻辑。

`promises`的最重要的特点就是它把我们处理任何函数调用的成功或者失败的方式规范成了可预测的形式，特别是如果这个调用实际上的异步的。


Promise中有几个状态：
* **pending**: 初始状态。 非 `fulfilled` 或 `rejected`。
* **resolved**: 成功的操作。也有的成为 `fulfilled`。
* **rejected**: 失败的操作。


不同的Promise差异基本表现如下：
* 构造`Promise`对象 `new Promise().resolve()` 或者`newPomise(function(resolve, reject) {})`
* 是否有 `.done().fail().always()` 等方法
* 是否有`Promise.all()`方法
* 是否有`isRejected()isResolved()`
* `.then() return` 结果链式的

## 几种规范的promise
### `Promise`的`Promise/A` 规范和`Promise/A+`规范
[先看下规范的地址](http://wiki.commonjs.org/wiki/Promises/A https://promisesaplus.com/)

什么是`A+`规范的`Promise`?
`Promises/A+`是在`Promises/A`的基础上对原有规范进行修正和增强。

`Promise A+`与`Promise A`的主要区别:
* 符合`Promise/A+`规范的`promise`实现均以`then`方法为交互核心。`Promises/A+`组织会因新发现的问题以向后兼容的方式修改规范，因此`Promises/A+`规范相对来说还是比较稳定的。
* `A+`规范强调了不同实现之间的互操作和混用，通过术语`thenable`来区分`promise`对象，当一个对象拥有`then`函数就认为是`promise`对象
* `A+`定义当`onFulfilled`或者`onRejected`返回`promise`时后的处理过程，他们必须是作为函数来调用，而且调用过程必须是异步的
* `A+`严格定义了`then`方法链式调用时`onFulfilled`或者`onRejected`的调用顺序

目前判断是否为`Promise/ A+`规范主要看`Promiise`的方法含有`new Pomise(function(resolve,reject){})、then、resolve、all`等方法。`ES6 Promise`的实现严格遵循了`Promise/A+`规范。例如`Defferd`就不是`Promise/ A+`的规范。

## Defferd实现规范
比较典型的是`jquery`的`Defferd`方法实现的`Promise`，另外`jquery`还有一个`Promise`的类型，实现的原理相同，但是不遵循`Promise/A+`规范，相对于`Promise`没有那么稳定。

我们先来看看`jquery`的`Promise`是怎样实现的。我们看下`jquery`的`Deferred`实现源码：

![Deferred实现源码](822f60b3/1.jpeg)

可见，`jquery`的`Deferred`是个工厂类，返回的是内部构建的`deferred`对象；`tuples` 含有三个`$.Callbacks`对象，分别表示**成功，失败，处理中**三种状态；创建的`promise`对象，具有`state、always、then、primise`方法；扩展`primise`对象生成最终的`Deferred`对象，返回该对象；没有`resolve、reject、all`等`Promise/A+` 规范的常用方法。

## 兼容性
目前使用需要使用`polyfill`，也就是原生实现一个`Promise`支持较低浏览器，第三方实现库很多后面给了个学习的较好例子。


## generator的异步
`Promise`处理异步问题相信都了解了。`ES6`里的`generator`还有另一个处理异步的方法，那`ES6`定义这两个特性岂不是重复了？

单独地介绍`Generator`没有太大价值，因为它除了更复杂外，功能与普通函数没有太大差别。真正让`Generator`具有价值的是`yield`关键字，这个`yield`关键字让`Generator`内部的逻辑能够切割成多个部分。并且可以灵活控制内部的执行情况。
```
var c = function*(a, b) {
  yield console.log(a + b);
  yield console.log(a - b);
  yield console.log(a * b);
  yield console.log(a / b);
};
var g = c(4, 2);
g.next(); // 6
g.next(); // 2
g.next(); // 4
g.next(); // 2
```
运行时使用`node–harmony-generatorstest.js`

不难发现它的运行过程，`generator`函数运行到`yield`时会停止，等待下一个`next()`方法调用让它继续执行。我们改下成为异步方法，异步我们需要借助**高阶函数**
```
var helper = function(fn) {
  return function() {
    // 类数组转数组
    var args = [].slice.call(arguments);
    var pass;
    args.push(function() {
      // 在回调函数中植入收集逻辑
      if (pass) {
        pass.apply(null, arguments);
      }
    });
    fn.apply(null, args);

    return function(fn) {
      // 传入一个搜集函数
      pass = fn;
    };
  };
};

var sum = helper(function sum(a, b) {
  console.log("sum result:", a + b);
});

var minus = helper(function minus(a, b) {
  console.log("minus result:", a - b);
});

var muti = helper(function minus(a, b) {
  console.log("muti result:", a * b);
});

var devide = helper(function minus(a, b) {
  console.log("devide result:", a / b);
});

var c = function *(a,b){
  yield sum(a, b);
  yield minus(a, b);
  yield muti(a, b);
  yield devide(a, b);
}

var g = c(5, 2);
var state = g.next();

setTimeout(function(){
  while(!state.done){
    state = g.next();
  }
}, 100);
```

`generator`实现异步的方法也有比较完整的封装方式，实现先可以看：`https://github.com/ouvens/co` 可以看个简单版的：
```
var co = function(flow) {
  var generator = flow();
  var next = function(data) {
    var result = generator.next();
    if (!result.done) {
      result.value(function(err, data) {
        if (err) {
          throw err;
        }
        next(data);
      });
    }
  };
  next();
};

```
我们小结一下通过Generator进行流程控制的特点。 
* 每个异步方法都需要标准化为`yield`关键字能接受的方法，使我们有机会注入特殊逻辑，这个过程被称为`thunkify`。 * 需要巧妙地将异步调用执行完成得到的结果通过`.next()`传递给下一段流程。 
* 需要递归地将业务逻辑执行完成。

需要注意的是`yield`只能暂停`Generator`内部的逻辑，它并不是真正暂停整个线程，`Generator`外的业务逻辑依然会继续执行下去。


## 总结
实现异步的方法目前有:
* 自定义嵌套
* Promise
* generator
* Defferd
* ES7的async（其实是`generator`的封装），不同场景可以选择不同的方式去实现


## 推荐
[简单的Promise实现样例](https://github.com/ouvens/promise)
[generator异步实现](https://github.com/tj/co)


## 本文来自公众号
前端早读课-第519期