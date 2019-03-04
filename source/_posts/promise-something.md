---
title: 关于Promise：你可能不知道的6件事
author: 江湖再见
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论码不码代码，都要做一枚快乐的前端
photos: /img/2015/es6.jpg
categories: 编程
tags: promise
abbrlink: 4f91e813
date: 2016-08-06 09:45:18
---
`Promise` 是一个非常简单的概念，即使你没有机会使用 `Promise`，你也可能阅读过一些关于 `Promise` 的文章。

`Promise` 的价值在于使得异步代码以一个更可读的风格结构化，而不是因异步函数嵌套显得混乱不堪。这篇文章会接触到 6 个你可能不知道的关于 `Promise` 的事。

开始列举之前，先看看怎么创建 `Promise`：
```
var p = new Promise(function(resolve, reject) {
  resolve("resolve");
});

p.then(function(str) {
  console.log(str);
});
```
## then() 返回一个 forked Promise(分叉的 Promise)
下面两段代码有什么不同？
```
// exhibit A
var p = new Promise (/*...*/);
p.then(fn1);
p.then(fn2);
```

```
// exhibit B
var p = new Promise (/*...*/);
p.then(fn1)
  .then(fn2);
```

如果你认为两段代码等价，那么你可能认为 `promise` 仅仅就是一维回调函数的数组。然而，这两段代码并不等价。p 每次调用 `then()` 都会返回一个 `forked promise`。因此，在A中，如果 func1 抛出一个异常，func2 依然能执行，而在B中，func2 不会被执行，因为第一次调用返回了一个新的 `promise`，由于 func1 中抛出异常，这个 `promise` 被 `rejected`了，结果 func2 被跳过不执行了。

## 回调函数应该传递结果
下面的代码会 log 什么？
```
var p = new Promise(function(resolve, reject) {
  resolve("resolve");
});

p.then(function(str) {}).then(function(str) {
  console.log(str);
});
```

第二个 `then()` 中的 log 不会显示任何东西，因为在 `promise` 的上下文中，回调函数像普通的回调函数一样传递结果。`promise` 期望你的回调函数或者返回同一个结果，或者返回其它结果，返回的结果会被传给下一个回调。

这和适配器传递结果的思想一样，看下面的示例：
```
var ret = function(n) {
  console.log("n", n);
  return n * 10;
};
var p = new Promise(function(resolve, reject) {
  resolve(ret(10));
});
p.then(ret).then(function(str) {
  console.log("str", str);
});
```

## 只能捕获来自上一级的异常
下面的两段代码有什么不同：
```
// exhibit A
new Promise(function(resolve, reject) {
  resolve("resolve");
})
  .then(function(str) {
    throw new Error("oh, no");
  }, undefined)
  .then(undefined, function(error) {
    console.log(error);
  });
```

```
// exhibit B
new Promise(function(resolve, reject) {
  resolve("resolve");
}).then(
  function(str) {
    throw new Error("oh, no");
  },
  function(error) {
    console.log(error);
  }
);
```

在A中，当第一个 `then` 抛出异常时，第二个 `then` 能捕获到该异常，并会弹出 'uh oh'。这符合只捕获来自上一级异常的规则。

在B中，正确的回调函数和错误的回调函数在同一级，也就是说，尽管在回调中抛出了异常，但是这个异常不会被捕获。事实上，B中的错误回调只有在 `promise` 被 `rejected` 或者 `promise` 自身抛出一个异常时才会被执行。

## 错误能被恢复
在一个错误回调中，如果没有重新抛出错误，`promise` 会认为你已经恢复了该错误，`promise` 的状态会转变为 `resolved`。在下面的例子中，会弹出’I am saved’ 是因为第一个 `then()` 中的错误回调函数并没有重新抛出异常。
```
var p = new Promise(function(resolve, reject) {
  reject(new Error("pebkac"));
});
p.then(undefined, function(error) {}).then(
  function() {
    console.log("I am saved");
  },
  function() {
    console.log("Bad computer!");
  }
);
```
`Promise` 可被视为洋葱的皮层，每一次调用 `then` 都会被添加一层皮层，每一个皮层表示一个能被处理的状态，在皮层被处理之后，`promise` 会认为已经修复了错误，并准备进入下一个皮层。

## Promise 能被暂停
仅仅因为你已经在一个 `then()` 函数中执行过代码，并不意味着你不能够暂停 `promise` 去做其他事情。为了暂停当前的 `promise`，或者要它等待另一个 `promise` 完成，只需要简单地在 `then()` 函数中返回另一个 `promise`。
```
var loggedIn = false;
var p = new Promise(function(resolve, reject) {
  resolve("resolve");
});

p.then(function(str) {
    if (!loggedIn) {
      return new Promise(function(resolve, reject) {
        resolve("not loggedIn");
      });
    }
  })
  .then(function(str) {
    console.log(str);
  });
```
在上面的代码中，直到新的 `promise` 的状态是 `resolved` 解析后，`alert` 才会显示。如果要在已经存在的异步代码中引入更多的依赖，这是一个很便利的方式。例如，你发现用户会话已经超时了，因此，你可能想要在继续执行后面的代码之前发起第二次登录。


## resolved 状态的 Promise 不会立即执行
运行下面的代码会弹出什么呢？
```
(function runme() {
  var i = 0;
  new Promise(function(resolve, reject) {
    resolve();
  }).then(function() {
    i += 2;
  });
  console.log("i", i); // 0
  setTimeout(function() {
    console.log("setTimeout", i); // 2
  }, 0);
})();
```
你可能会认为弹出2，因为 `promise` 已经是 `resolved` ，`then()` 会立即执行(同步)。然而，`promise` 规范要求所有回调都是异步的，因此，`alert` 执行时 i 的值还没有被修改。


## 推荐
[Promise 陷阱](/2016/04/18/promise_trap/)


## 本文来自公众号
前端早读课-第663期