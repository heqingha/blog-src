---
title: javascript设计模式（六）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/2015/javascript.jpeg
abbrlink: 57ed60dc
date: 2019-01-12 13:19:59
tags: 
- javascript
- 设计模式
keywords: 装饰器模式
description: 装饰器模式
---
## 装饰器模式
- 为对象添加新功能
- 不改变其原有的结构和功能

## 生活用例
![手机装饰器](./57ed60dc/1.png)

## UML类图
![](./57ed60dc/uml.jpg)


## 代码

```javascript
// 装饰器模式
class Circle {
  draw() {
    console.log('画个圆')
  }
}

class Decorator {
  constructor(circle) {
    this.circle = circle;
  }
  draw() {
    this.circle.draw();
    this.setRedBorder(this.circle);
  }
  setRedBorder(circle) {
    console.log('圆的边设置为红色')
  }
}

// 测试
let circle1 = new Circle();
circle1.draw();

console.log('---分割线---')
let dec1 = new Decorator(circle1);
dec1.draw();
```

## 场景
#### ES7装饰器
第三方库 core-decorators
1.配置环境
```node
npm install babel-plugin-transform-decorators-legacy --save-dev
```

2.装饰类-简单运用
```javascript
// 装饰类
function decorator(...list) {
  return function(target) {
    Object.assign(target.prototype, ...list);
  }
}

const Foo = {
  foo() {
    console.log('foo');
  }
}

const Bar = {
  bar() {
    console.log('bar');
  }
}

@decorator(Foo, Bar)
class MyClass {
  say() {
    console.log('say')
  }
}

const mc1 = new MyClass();
mc1.foo();
mc1.bar();
mc1.say();
```

3.装饰方法-可读功能
```javascript
// 装饰器 方法 可读
function readonly(target, name, descriptor) {
  console.log('target', target)
  console.log('name', name)
  console.log('descriptor', descriptor)
  descriptor.writable = false
  return descriptor
}

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
  @readonly
  getName() {
    console.log(`${this.firstName} ${this.lastName}`)
  }
}

// 测试
let p1 = new Person('rui', 'zhengyun');
p1.getName();

console.log('-----分割线-----')
p1.getName = function() {
  console.log('江湖再见');
}
p1.getName();
```

4.装饰方法-日志功能
```javascript
// 装饰器 方法 日志
function log(str) {
  return function(target, name, descriptor) {
    let oldValue = descriptor.value;
    descriptor.value = function(){
      console.log(str);
      return oldValue.apply(this, arguments);
    }
    return descriptor
  }
}

class Math {
  @log('装饰器方法应用-a加b的结果是')
  add(a, b) {
    return a + b
  }
}

// 测试
const m1 = new Math()
const ret = m1.add(2, 8)
console.log(ret);
```

5.常用的第三方装饰器`core-decorators`

```npm
npm install -S core-decorators
```

```javascript
// 装饰器 方法 只读/废弃
import { readonly, deprecate } from 'core-decorators'

class Person {
  constructor(name) {
    this.name = name;
  }

  @deprecate('即将废用', { url: 'http://ruizhengyun.cn' })
  setName(name) {
    this.name = name;
  }

  @readonly
  getName() {
    return `${this.name}`
  }
}

// 测试
const p1 = new Person('江湖再见')
console.log(p1.getName())

p1.setName('ruizhengyun')
console.log(p1.getName())

p1.getName = function() {
  console.log('修改 getName 方法')
}
```

## 设计原则验证
- 将现有对象和装饰器进行分离，两者独立存在
- 符合开放封闭原则