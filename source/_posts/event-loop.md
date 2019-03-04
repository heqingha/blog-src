---
title: 总是一知半解的Event Loop
description: JavaScript中的事件循环一直都是一个很多人都或多或少了解，但说不清楚的知识点，停留在一知半解的层面。以前只需要使用回调函数、定时器还好说，但是自从有了Promise之后，对事件循环的透彻了解就比较重要了。
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
tags: event-loop
abbrlink: 7f55d16a
date: 2018-03-30 12:37:12
---
JavaScript中的事件循环一直都是一个很多人都或多或少了解，但说不清楚的知识点，停留在一知半解的层面。以前只需要使用回调函数、定时器还好说，但是自从有了Promise之后，对事件循环的透彻了解就比较重要了。

本篇文章不打算从头开始叙述，那样篇幅太长，略过最基本的概念，我们简单粗暴的把事件循环说清楚。

## 理论：关于MacroTask和MicroTask
一张图展示JavaScript中的事件循环：
![关于MacroTask和MicroTask](7f55d16a/1.png)

一次事件循环：先运行macroTask队列中的一个，然后运行microTask队列中的所有任务。接着开始下一次循环（只是针对macroTask和microTask，一次完整的事件循环会比这个复杂的多）。
<!--more-->
其中macroTask和microTask是两种任务队列，相比而言，大家更熟悉的一个词是任务队列（task queue,其实就是macroTask）,大家更熟悉的关于事件循环的机制说法大概是：主线程执行完了之后，每次从任务队列里取一个任务执行。但是promise出现之后，这个说法就不太准确了。

JavaScript引擎对这两种队列有不同的处理，简单的说就是引擎会把我们的所有任务分门别类，一部分归为macroTask，另外一部分归为microTack，下面是类别划分：

* **macroTask:** setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering

* **microTask:** process.nextTick, Promise, Object.observe, MutationObserver

我们所熟悉的定时器就属于macroTask，但是仅仅了解macroTask的机制还是不够的。

上面这些都是理论啊，我们怎么直观的感受两种队列的区别呢？说的再多也不如来一段实践，我们感知这种区别最好的方式就是通过任务的执行顺序。


## 实践：小二，上代码
我们以setTimeout、process.nextTick、promise为例直观感受下两种任务队列的运行方式。

```
// mainTask
console.log("1、main1");

// macroTask
setTimeout(function() {
  console.log("6、setTimeout");
  // microTask
  process.nextTick(function() {
    console.log("7、process.nextTock2");
  });
}, 0);

new Promise(function(resolve, reject) {
  console.log("2、promise");
  resolve();
}).then(function() {
  // microTask
  console.log("5、promise then");
});

// microTask
process.nextTick(function() {
  console.log("4、process.nextTick1");
});

// mainTask
console.log("3、main2");

```

别着急看答案，先以上面的理论自己想想，运行结果会是啥？

最终结果是这样的：
```
1、main1
2、promise
3、main2
4、process.nextTick1
5、promise then
6、setTimeout
7、process.nextTock2
```

`process.nextTick` 和 `promise then`在 `setTimeout` 前面输出，已经证明了 `macroTask` 和 `microTask` 的执行顺序。但是有一点必须要指出的是。上面的图容易给人一个错觉，就是主进程的代码执行之后，会先调用 `macroTask`，再调用 `microTask`，这样在第一个循环里一定是 `macroTask` 在前，`microTask` 在后。

但是最终的实践证明：在第一个循环里，`process.nextTick1`和`promise then`这两个`microTask`是在`setTimeout`这个`macroTask`里之前输出的，这是为什么呢？

因为主进程的代码也属于`macroTask`（这一点我比较疑惑的是主进程都是一些同步代码，而`macroTask`和`microTask`包含的都是一些异步任务，为啥主进程的代码会被划分为`macroTask`，不过从实践来看确实是这样，而且也有理论支撑：【翻译】`Promises/A+`规范）。

主进程这个`macroTask`（也就是`main1、promise和main2`）执行完了，自然会去执行`process.nextTick1`和`promise then`这两个`microTask`。这是第一个循环。之后的`setTimeout`和`process.nextTick2`属于第二个循环

别看上面那段代码好像特别绕，把原理弄清楚了，都一样 ~

`requestAnimationFrame`、`Object.observe`(已废弃) 和 `MutationObserver`这三个任务的运行机制大家可以从上面看到，不同的只是具体用法不同。重点说下`UI rendering`。在`HTML`规范：`event-loop-processing-model`里叙述了一次事件循环的处理过程，在处理了`macroTask`和`microTask`之后，会进行一次`Update the rendering`，其中细节比较多，总的来说会进行一次`UI`的重新渲染。

## 后续
不知道大家有没有发现一个现象，在学习技术点的时候，如果太浅，得来的知识点可能不完整甚至是错的，如果追究的太深，又会给人一种太偏学究的感觉，其中的平衡点，大家自己留心把握。


## 推荐
[关于Promise：你可能不知道的6件事](/post/4f91e813.html)
[Promise与异步](/post/822f60b3.html)

## 本文来自公众号
前端早读课-第993期