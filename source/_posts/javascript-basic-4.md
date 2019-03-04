---
title: Javascript基础（四）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
keywords: 防抖,节流,继承,call、apply与bind区别
description: 防抖,节流,继承,call、apply与bind区别
photos: /img/2015/javascript.jpeg
abbrlink: 10a7141d
date: 2018-01-30 15:30:46
tags:
- javascript
---

## 防抖
你是否在日常的开发中遇到一个问题：在滚动事件中需要做个复杂计算或者实现一个按钮的防二次点击操作。

这些问题可通过 **函数防抖** 来实现。尤其是第一个需求，如果在频繁的事件回调中做复杂计算，很有可能导致页面卡顿，不如 **将多次计算合并为一次计算**，只在一个精确点做操作。

**注意**，防抖和节流的作用多事防止函数多次调用。区别在于，假设一个用户一直触发这个函数，且每次触发函数的间隔小于wait，防抖的情况下调用一次，节流的情况是隔一定时间（参数wait）调用函数。

1.袖珍版防抖实现

```javascript
// func是用户传入需要防抖的函数，wait是等待时间
const debounce = (func, wait = 50) => {
  // 缓存一个定时器id
  let timer = 0;
  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function(...args) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  }
  // 不难看出如果用户调用函数的间隔小于wait的情况下，上一次时间还未到就被清除了，并不会执行函数
} 
```
这是一个简单版本的防抖，很明显是有缺陷的，这个防抖只能在最后调用。一般的防抖会有immediate选项，表示是否立即调用。这两者区别在于：
- 例如在搜索引擎搜索问题的时候，我们当然是希望用户输入完最后一个字才调用查询接口，这个时候适用`延迟执行`的函数防抖，它总是在一连串（间隔小于wait的）函数触发之后调用。
- 例如用户给intervierMap点star的时候，我们希望用户点第一下的时候就去调用接口，并且成功之后改变star按钮的样子，用户就可以立马得到反馈是否star成功了吗，这个情况适用`立即执行`的防抖函数，它总是在第一次调用，并且下一次调用必须与前一次调用的时间间隔大于wait才会触发。

立即执行选项的防抖函数

```javascript
// 这个用来获取当前时间戳
function now(){
  return +new Date();
}

/**
 * 函数防抖，返回函数连续调用时，空闲时间必须大于或等于wait，func才会执行
 * @param   {function}   func        回调函数
 * @param   {number}     wait        表示时间的间隔
 * @param   {boolean}    immediate   设置为true时，是否立即调用函数
 * @return  {function}               返回客户调用函数
 */
function debounce(func, wait = 50， immediate = true){
  let timer, context, args

  // 延迟执行函数
  const later = () => setTimeout(() => {
    // 延迟函数执行完毕，清空缓存的定时器序号
    timer = null;
    // 延迟执行的情况下，函数会在延迟函数中执行
    // 使用到之前缓存的参数和上下文
    if(!immediate){
      func.apply(context, args);
      context = args = null;
    }
  }, wait);


  // 这里返回的函数是每次实际调用的函数
  return function(...params) {
    // 如果没有创建延迟执行函数（later）,就创建一个
    if(!timer) {
      timer = later();
      if(immediate) {
        func.apply(this, params);
      } else {
        context = this;
        args = params;
      }
    } else {
      // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
      // 这样做延迟函数会重新计时
      clearTimeout(timer);
      timer = later();
    }
  }
}
```

总结一下:

- 对于按钮防点击来说的实现：如果函数是立即执行的，就立即调用，如果函数是延迟执行的，就缓存上下文和参数，放到延迟函数中去执行。一旦我开始一个定时器，只要我定时器还在，你每次点击我都重新计时。一旦你点累了，定时器时间到，定时器重置为 `null`，就可以再次点击了。
- 对于延时执行函数来说的实现：清除定时器id，如果是延迟调用就调用函数


## 节流

防抖和节流的本质是不一样的。防抖是将多次执行变为 **最后一次执行**，节流是将多次执行变成 **每隔一段时间执行**。

```javascript
/**
  * underscore节流函数，返回函数连续调用时，func执行评率限为 次/wait
  * @param  {function}  func     回调函数
  * @param  {number}    wait     表示时间窗口的间隔
  * @param  {object}    options  如果想忽略开始函数的调用，传入{leading: false}。
  *                              如果想忽略结尾函数的调用，传入{trailing: false}.
  *                              两者不能共存，否则函数不能执行
  * @return  {function}          返回客户调用函数
  */
_.throttle = function(func, wait, options) {
  var context, args, result;
  var timeout = null;
  // 之前的时间戳
  var previous = 0;
  // 如果 options 没传则设为空对象
  if(!options) options = {};

  // 定时器回调函数
  var later = function() {
    // 如果设置了 leading，就将 previous 设为 0
    // 用于下面函数的第一个 if 判断
    previous = options.leading === false ? 0 : _.now();
    // 置空一是为了防止内存泄露，二是为了下面的定时器判断
    timeout = null;
    result = func.apply(context, args);
    if(!timeout) context = args = null;
  };

  return function (){
    //获得当前时间戳
    var now = _.now();
    // 首次进入前者肯定为true
    // 如果需要第一次不执行
    // 就将上次时间戳设为当前的
    // 这样在接下来计算 remaining 的值时会大于0
    if(!previous && options.leading === false) previous = now;
    // 计算剩余时间，取决于 (now - previous)
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 如果当前调用已经大于上次调用时间 + wait
    // 或者用户手动调了时间
    // 如果设置了 trailing，只会进入这个条件
    // 如果没有设置leading,那么第一次会进入这个条件
    // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个if条件了
    // 其实还是会进入的，因为定时器的延迟
    // 并不是准确的时间，很可能你设置了2s
    // 但是它需要2.2才触发，这个时候就会进入这个条件
    if(remaining <=0 || remaining > wait) {
      // 如果存在定时器就清理掉否在会调用二次回调
      if(timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if(!timeout) context = args = null;
    } else if(!timeout && options.trailing !== false){
      // 判断是否设置了定时器和trailing
      // 没有的话就开启一个定时器
      // 并且不能同时设置leading和trailing
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
```


## 继承
在ES5中，可以使用下面方式解决继承问题

```javascript
function Super() {}
Super.prototype.getNumber = function() {
  console.log(1);
  return 1;
}

function Sub(){}
Sub.prototype = Object.create(Super.prototype, {
  constructor: {
    value: Sub,
    enumerable: false,
    writeable: true,
    configurable: true
  }
});
let s = new Sub();
s.getNumber();
```

以上继承实现思路就是将 **子类的原型设置为父类的原型**。

在ES6中，可通过`class`语法解决这个问题

```javascript
function Super() {}
Super.prototype.getNumber = function() {
  console.log(2);
  return 2;
}
class Sub extends Super {
  getNumber() {
    console.log(3);
    return 3;
  }
}
let s = new Sub();
s.getNumber();
```

继承Date

```javascript
class MyDate extends Date{
  test(){
    console.log(this.getTime());
    return this.getTime();
  }
}

let myDate = new MyDate();
myDate.test();
```

但是 ES6 不是所有浏览器都兼容，所以我们需要使用 Babel 来编译这段代码。在调用`myDate.test()`过程中报错了`this is not a Date object.`

因为在 JS 底层有限制，如果不是由`Date`构造出来的实例，是不能直接调用`Date`里的函数的。所以这也侧面说明：**ES6中的`class`继承与ES5中的一般继承写法是不同的**。

既然底层限制了实例必须由`Date`构造出来，那可以改变思路实现继承：

```javascript
function MyDate(){}
MyDate.prototype.test = function(){
  return this.getTime();
}
let d = new Date();
Object.setPrototypeOf(d, MyDate.prototype);
Object.setPrototypeOf(MyDate.prototype, Date.prototype);
```
以上继承思路：
- 先创建父类实例
- 改变实例(d)原先的`__proto__`转而连接子类(MyDate)的`prototype`
- 子类(MyDate)的`prototype`的`__proto__`转而连接父类(Date)的`prototype`

这样完美解决 JS 底层的这个限制。


## call,apply,bind区别
`call`和`apply`都是为了解决改变`this`的指向。
前两者区别在于第二个参数形式，`call`接收一个参数列表，`apply`只接收一个参数数组。

```javascript
let a = {
  value: 2
};

function getValue(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}
getValue('rzy', 27); // rzy, 27, undefined
getValue.call(a, 'rzy', 27); // rzy, 27, 2
getValue.apply(a, ['rzy', 27]); // rzy, 27, 2
```

模拟实现`call`和`apply`，思路：
- 不传入第一个参数，那么默认为`window`
- 改变了`this`指向，让新的对象可以执行该函数，那么思路是否可以变成给新的对象添加一个方法，然后执行完再删除
- 函数对象上的一个方法，所以自定义的方法写在`Function.prototype`上

```javascript
// 模拟call
Function.prototype.myCall = function(context) {
  var context = context || window;
  // getValue(a, 'rzy', 27) => a.fn = getValue
  context.fn = this;

  // 获取context后面的参数
  var args = [...arguments].slice(1);
  // getValue(a, 'rzy', 27) => a.fn('rzy', 27)
  var result = context.fn(...args);

  // 删除fn
  delete context.fn;
  return result;
}
```

```javascript
// 模拟apply
Function.prototype.myApply = function(context) {
  var context = context || window;
  // getValue(a, 'rzy', 27) => a.fn = getValue
  context.fn = this;
  // getValue(a, 'rzy', 27) => a.fn('rzy', 27)
  
  var result
  if(arguments[1]){
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }

  // 删除fn
  delete context.fn;
  return result;
}
```

再说`bind`，该方法只返回一个函数，且可通过`bind`实现 **柯里化**。

```javascript
Function.prototype.myBind = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error');
  } 
  var _this = this;
  var args = [...arguments].slice(1);

  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if(this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  }
}
```

## 原文地址
https://yuchengkai.cn/docs/frontend