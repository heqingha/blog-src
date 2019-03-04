---
title: javascript设计模式（三）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/2015/javascript.jpeg
abbrlink: '27879453'
date: 2019-01-07 13:19:59
tags: 
- javascript
- 设计模式
keywords: 工厂模式
description: 工厂模式介绍、UML类图、编码、场景、阅读源码（lib）意义
---

## 工厂模式
- 将`new`操作单独封装
- 遇到`new`时，就要考虑是否该使用工厂模式

## UML类图
![](./27879453/1.jpg)


## 编码
```javascript
class Product {
  constructor(name) {
    this.name = name
  }
  init() {
    console.log(this.name)
  }
  fn1() {
    console.log('fn1')
  }
  fn2() {
    console.log('fn2')
  }
}

class Creator {
  create(name) {
    return new Product(name)
  }
}

// 测试
let creator = new Creator();
let p1 = creator.create('p1');
p1.init()
p1.fn1()

console.log('---分割线---')
let p2 = creator.create('p2');
p2.init()
p2.fn1()
```

## 场景
1.jQuery源码-工厂模式

```javascript
// 工厂模式
class jQuery {
  constructor(selector) {
    let slice = Array.prototype.slice;
    let dom = slice.call(document.querySelectorAll(selector));
    let len = dom ? dom.length : 0;
    for (let i = 0; i < len; i++) {
      this[i] = dom[i];
    }
    this.length = len
    this.selector = selector || ''
  }
  append(node) {

  }
  addClass(name) {
    this.selector
    alert(name)
  }
  html(data) {

  }
  // 省略多个 API
}

// 工厂模式
window.$ = function(selector) {
  return new jQuery(selector);
}

// 实例
const $li = $('li') 
$li.addClass('item');
```

2.React.createElement实现
```javascript
// jsx
var profile = (
  <div>
    <img src='http://ruizhengyun.cn/avatar.png' className="profile" />
    <h3>{[user.firstName, user.lastName].join(' ')}</h3>
  </div>
);

// 实现
var profile = React.createElement('div', null, 
  React.createElement('img', { src: 'http://ruizhengyun.cn/avatar.png', className: 'profile' }),
  React.createElement('h3', null, [user.firstName, user.lastName].join(' '))
);

// 源码
class Vnode(tag, attrs, children) {
  // ...
}

React.createElement = function(tag, attrs, children) {
  return new Vnode(tag, attrs, children);
}
```

## 设计原则验证
- 构造函数与创建者分离
- 符合开放封闭原则


## 阅读源码（lib）意义
- 学习如何实现功能（招式）
- 学习设计思路（心法）
- 刻意模拟学习
- 写出愉悦的代码