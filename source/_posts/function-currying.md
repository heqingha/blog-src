---
title: 函数柯里化
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/2015/javascript.jpeg
abbrlink: dc7a41e4
date: 2016-07-25 09:25:58
tags: 函数
keywords: http://www.cnblogs.com/zztt/p/4152147.html
description: 
---

## 概念

因为是美国数理逻辑学家哈斯凯尔·加里(Haskell Curry)发明了这种函数使用技巧，所以这样用法就以他的名字命名为 Currying，中文翻译为“柯里化”。

柯里化通常也称部分求值，其含义是给函数分步传递参数，每次传递参数后部分应用参数，并返回一个更具体的函数接收剩下的参数，这中间可嵌套多层这样的接收部分参数的函数，直至返回最后的结果。

因此柯里化的过程是逐步传参，逐步缩小函数的适用范围，逐步求解的过程。

## 解决问题

如果我们有几个 **单参数** 函数，并且这是一种支持一等函数(first-class)的语言，如何去实现一个多参数函数？函数柯里化是一种实现多参数函数的方法。

## 示例

要实现以下加法函数：

```javascript
add(1, 2, 3)(4)(5)(6)(7, 8, 9)() === 45;
```

- 这个函数只有参数为空的时候，才执行所有数值的加法；
- 当有参数的时候返回值应该是一个函数，这个函数把参数存储下来

```javascript
function add1() {
  var args = [].slice.call(arguments);

  return function _add() {
    if (arguments.length === 0) {
      return args.reduce(function(a, b) {
        return a + b;
      });
    } else {
      [].push.apply(args, arguments);
      return _add;
    }
  };
}

function add2() {
  var args = [].slice.call(arguments);
  return function() {
    if (arguments.length === 0) {
      return args.reduce(function(a, b) {
        return a + b;
      });
    } else {
      [].push.apply(args, arguments);
      return arguments.callee;
    }
  };
}

console.log("add1:", add1(1, 2, 3)(4)(5)(6)(7, 8, 9)()); // 45
console.log("add2:", add2(1, 2, 3)(4, 5)(6)(7, 8, 9)()); // 45
```

实现原理:

- 闭包保存 args，存储之前的参数；
- 新建一个 `_add` 函数，参数的长度为 0，就执行加法，否则存储参数到 args，然后返回函数自身（arguments.callee, 严格模式下不能用）

## 柯里化的基础

通过以上示例，可看出函数颗粒话特点：

- 闭包 - 保存参数；
- 函数作为函数的返回值 - 进行递归，；
- （函数作为参数传递-高阶函数）

```javascript
function curry(func) {
  var _args = [];

  return function _func() {
    if (arguments.length === 0) {
      return func.apply(this, _args);
    } else {
      [].push.apply(_args, [].slice.call(arguments));
      return _func;
    }
  };
}

function add() {
  return [].reduce.call(arguments, function(a, b) {
    return a + b;
  });
}

console.log("curry:", curry(add)(1)(2, 3, 4, 5, 6, 7, 8, 9)());

var sum = curry(add);
sum(1)(2)(3);
sum(4, 5, 6, 7, 8, 9);
console.log("sum:", sum()); // 45
```

上面代码定义了一个 add 函数，完成参数相加的功能，通过 curry(add)，使该函数能够进行柯里化，实现延迟执行。也可以采用 `arguments.callee` 来实现，原理相同，只是严格模式下不能使用而已。

事实上，我在看 **函数节流** 以及 **函数消抖** 的大神写法的时候，其实应该把函数执行的上下文也保存下来，才能更加完善，有待后续更正。

## 作用

- 延迟计算
- 参数复用
- 动态创建函数

## 示例

时间浏览器添加事件的辅助方法：

```javascript
var addEvent = function(el, type, fn, capture) {
  if (window.addEventListener) {
    el.addEventListener(
      type,
      function(e) {
        fn.call(el, e);
      },
      capture
    );
  } else if (window.attachEvent) {
    el.attachEvent("on" + type, function(e) {
      fn.call(el, e);
    });
  }
};

// 每次添加事件处理都要执行一遍 if...else...，其实在一个浏览器中只要一次判定就可以了，把根据一次判定之后的结果动态生成新的函数，以后就不必重新计算。
var addEvent1 = (function() {
  if (window.addEventListener) {
    return function(el, type, fn, capture) {
      el.addEventListener(
        type,
        function(e) {
          fn.call(el, e);
        },
        capture
      );
    };
  } else if (window.attachEvent) {
    return function(el, type, fn, capture) {
      el.attachEvent("on" + type, function(e) {
        fn.call(el, e);
      });
    };
  }
})();
```

这个例子，第一次 if...else... 判断之后，完成了部分计算，动态创建新的函数来处理后面传入的参数，这是一个典型的柯里化。

## Function.prototype.bind 方法也是柯里化应用

与 `call/apply` 方法直接执行不同，`bind` 方法将第一个参数设置为函数执行的上下文，其他参数依次传递给调用方法（函数本身不执行，只是绑定，可看做延迟执行），并动态创建返回一个新的函数，符合柯里化特点。

```javascript
var foo = { x: 666 };
var bar = function() {
  console.log(this.x);
}.bind(foo); // 绑定，延迟执行

bar(); // 执行
```

模拟 `bind`

```javascript
var foo = { x: 666 };
var bar = function() {
  return this.x;
}.bind(foo); // 绑定，延迟执行
console.log("bar with bind:", bar()); // 执行


Function.prototype.myBind = function(scope) {
  var that = this;
  return function() {
    return that.apply(scope);
  };
};

var myBar = function() {
  return this.x;
}.myBind(foo);
console.log("bar with myBind", myBar()); // 执行
```

## 推荐

- [高阶函数](/blog/post/47f3f95c.html)
- [偏函数](/blog/post/72cd8a39.html)