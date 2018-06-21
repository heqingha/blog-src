---
title: nodejs之events事件
author: 胖芮
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 学习
photos: /img/2016/nodejs.jpg
tags: nodejs
abbrlink: 45efacb9
date: 2016-01-21 13:15:56
---

## nodejs之events事件
* events是node.js 最重要的模块，events模块只提供了一个对象`events.EventEmitter`
* EventEmitter 的核心是***事件发射与事件监听器***
* 与DOM树上事件不同，不存在事件冒泡、逐层捕获等行为
* EventEmitter 支持***若干个事件监听器***。当事件发射时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递

## 一睹为快 
```
const EventEmitter = require('events').EventEmitter
const ee = new EventEmitter();
```
<!-- more -->

| 操作                                 | 含义                                               |
|:------------------------------------|:------------------------------------------------- | 
| ee.on(event, listener)              | [注册时间监听](https://github.com/ruizhengyun/node-lesson/blob/master/lesson/events/01-on.js) |
| ee.once(event, listener)            | [监听一次并解除](https://github.com/ruizhengyun/node-lesson/blob/master/lesson/events/02-once.js) |
| ee.emit(event, [arg1], [...])       | [按参数的顺序执行每个监听器，若事件有注册监听返回true/false](https://github.com/ruizhengyun/node-lesson/blob/master/lesson/events/03-emit.js)|
| ee.setMaxListeners(n)               | [设置监听限制数量，默认监听器超过10就警告](https://github.com/ruizhengyun/node-lesson/blob/master/lesson/events/04-setMaxListeners.js)|
| ee.removelistener(event, listener)  | [移除指定事件的某个监听器（监听器必须注册过）](https://github.com/ruizhengyun/node-lesson/blob/master/lesson/events/05-removeListener.js)|
| ee.removeAllListener([event])       | [移除所有[指定]事件的监听器](https://github.com/ruizhengyun/node-lesson/blob/master/lesson/events/05-removeListener.js)|
| ee.listeners(event)                 | [返回事件的监听器的数组](https://github.com/ruizhengyun/node-lesson/blob/master/lesson/events/06-listeners.js)|

## 访问
```
const EventEmitter = require('events').EventEmitter;
const ee = new EventEmitter();
```

