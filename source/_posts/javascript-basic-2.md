---
title: Javascript基础（二）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
keywords: 原型, new, instanceof, this, 执行上下文
description: 原型, new, instanceof, this, 执行上下文
photos: /img/2015/javascript.jpeg
abbrlink: f9c4b128
date: 2018-01-28 14:43:37
tags:
- javascript
---


## 原型
![](./f9c4b128/1.png)

- 每个 **函数** 都有`prototype`属性，除了`Function.prototype.bind()`，它指向原型。
- 每个 **对象** 都有`__proto__`属性，它指向创建这个对象的构造函数的原型。其实这个属性指向了`[[prototype]]`，但是`[[prototype]]`是内部属性，我们访问不到，所以用`__proto__`来访问。
- 对象可以通过`__proto__`来寻找部署改对象的属性，`__proto__`将对象连接起来组成 **原型链**。

## new
- 新生成一个对象
- 链接到原型
- 绑定this
- 返回新对象

在调用`new`的过程中会发生以上4件事：

```javascript
function create(){
  // 创建一个空的对象
  let obj = new Object();
  // 获得构造函数
  let Con = [].shift.call(arguments);
  // 链接到原型
  obj.__proto__ = Con.prototype;
  // 绑定 this，执行构造函数
  let result = Con.apply(obj, arguments);
  // 确保 new 出来的是个对象
  return typeof result === 'object' ? result : obj;
}
```

对于实例化对象来说，都是通过`new`产生的，无论是`function Foo()`还是`let x = { y: 1 }`。

对于创建一个对象来说，推荐使用字面量的方式创建对象（无论性能还是可读性）。因为你使用`new Object()`的方式创建对象需要通过作用域链一层层找到`Object`，但是你使用字面量的方式就没这个问题了。

```javascript
function Foo();
// function 就是个语法糖，内部等同与 new Function()

let x = { y: 1 };
// 这个字面量内部也是使用了new Object();
```

对于`new`来说，还需注意下运算符优先级

```javascript
function Foo(){
  return this;
}
Foo.getName = function(){
  console.log('name');
}
Foo.prototype.getName = function(){
  console.log('prototypeName');
}

new Foo.getName();   // name
new Foo().getName(); // prototypeName
```

`new Foo()`的优先级高于`new Foo`，所以上面最后2行代码可划分执行顺序

```javascript
new (Foo.getName());

(new Foo()).getName();
```


## instanceof
`instanceof`可正确判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的`prototype`。

```javascript
function instanceof(left, right) {
  // 获得类型的原型
  let prototype = right.prototype;
  // 获得对象的原型
  left = left.__protp__;
  // 判断对象类型是否等于类型的原型
  while(true) {
    if(left === null) {
      return false
    }
    if(prototype === left){
      return true
    }
    left = left.__proto__;
  }
}
```


## this
一个很多人会混淆的概念，其实只需要记住几个规则就可以了。

```javascript
// 情况一
function foo(){
  console.log(this.a);
}
var a = 1;
foo();

// 情况二
var obj = {
  a: 2,
  foo: foo
};
obj.foo();

// 以上两种情况 `this` 只依赖于调用函数前的对象，优先级是第二个情况大于第一个勤快

// 情况三 
// 以下代码是优先级最高的， `this`只会绑定在 `c`上，不会被任何方式修改`this`指向
var c = new foo();
c.a = 3;
console.log(c.a);

// 情况四 
// 就是利用call、apply、bind改变this，这个优先级仅次于 new
```

以上几种情况弄清楚了，很多代码中的`this`就不是问题了。

```javascript
function a() {
  return () => {
    return () => {
      console.log(this);
    }
  }
}
console.log(a()()()); // window
```

箭头函数中其实是没有`this`的，这个函数中的`this`只取决于它外面的第一个不是箭头函数的函数的`this`。在这个例子中，因为调用`a`符合前面代码中的第一个情况，所以`this`是`window`。并且`this`一旦绑定了上下文，就不会被任何代码改变。


## 执行上下文

当执行javascript代码时，会产生3钟执行上下文（作用域）
- 全局
- 函数
- eval

**每个执行上下文都有3个重要的属性**
- 变量对象(VO)，包含变量、函数声明和函数的形参，该属性只能在全局上下文中访问
- 作用域链（js采用采用词法作用域，也就是说变量的作用域是在定义时就决定了）
- this

```javascript
var a = 10;
function obj(i){
  var b = 20;
}
foo();
```

上述代码，执行栈中有2个上下文：**全局上下文和函数`foo`上下文**。

```javascript
stack = [
  globalContext,
  fooContext
];
```

1.对于全局上下文，VO如下：

```javascript
globalContext.VO === globe
globalContext.VO = {
  a: undefined,
  foo: <Function>
}
```

2.对于函数`foo`来说，VO不能访问，只能访问到活动对象（AO）:

```javascript
fooContext.VO === foo.AO
fooContext.AO {
  i: undefined,
  b: undefined,
  arguments: <>
}
// arguments 是函数独有的对象（箭头函数没有）
// 该对象是一个伪数组，有`length`属性且可以通过下标访问元素
// 该对象中`callee`属性代表函数本身
// `caller`属于代表函数的调用者
```

对于作用域链，可以把它理解成包含自身变量对象和上级变量对象的列表，通过`[[Scope]]`属性查找上级变量：

```javascript
fooContext.[[Scope]] = [
  globalContext.VO
]
fooContext.Scope = fooContext.[[Scope]] + fooContext.VO
fooContext.Scope = [
  fooContext.VO,
  globalContext.VO
]
```

接下来，看个例子（老生常谈的那种）：

```javascript
b();  // It is b!
console.log(a); // undefined

var a = 'Hello, world!';
function b () {
  console.log('It is b!');
}
```
出现上述情况原因在于 **函数和变量提升**。通常提升的解释是说将声明的代码移动到了顶部。更准确的解释是：**在生成执行上下文时，会有两个阶段，第一阶段是创建阶段（创建VO）,js解释器会找出需要提升的变量和函数，且给他们提前在内存中开辟好空间，函数的话会将整个函数存在内存中，变量只声明且赋值undefined；第二阶段是执行阶段**。

在提升过程中，相同的函数会覆盖上一个函数，并且函数优先于变量提升。

```javascript
b(); // call b second

function b() {
  console.log('call b fist');
}
function b() {
  console.log('call b second');
}
var b = 'Hello world';
```

`var`会产生很多错误，所以在ES6中引入`let`。`let`不能在声明前使用，并不是说`let`不会提升，`let`提升可声明单没有复制，因为临时死区导致了并不能在声明前使用。


3.对于非匿名的立即执行函数需要注意：

```javascript
var foo = 1;
(function foo(){
  foo = 10;
  console.log(foo);
})(); // ƒ foo() { foo = 10; console.log(foo); }
```

js解释器在遇到非匿名的立即执行函数时，会创建一个辅助的特定对象，然后将函数名称作为这个对象属性，因为函数内部才能访问到`foo`，但是这个值又是只读的，所以对它的赋值并不生效，所以打印的结果还是这个函数，并且外部的值也没有发生更改。

```javascript
specialObject = {};
Scope = specialObject + Scope;

foo = new FUnctionExoression();
foo.[[Scope]] = Scope;
specialObject.foo = foo;

delete Scope[0];
```

## 原文地址
https://yuchengkai.cn/docs/frontend