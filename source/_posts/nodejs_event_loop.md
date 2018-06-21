---
title: node.js的事件机制
author: 胖芮
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 学习
photos: /img/2016/nodejs.jpg
tags: nodejs
abbrlink: 96ec4859
date: 2016-05-21 13:15:56
---

> 基于v8引擎实现的事件驱动IO（Evented I/O for V8 Javascript）

## 事件机制
Node.js之所以能够在众多的后端JavaScript技术之中脱颖而出，正是因其基于事件的特点。前端编程中，事件的应用十分广泛，DOM上的各种事件。Ajax大规模应用之后，异步请求更得到广泛的认同，而Ajax亦是基于事件机制的。在这类单线程的编程模型下，如果采用同步机制，无法与PHP之类的服务端脚本语言的成熟度媲美，性能也没有值得可圈可点的部分。直到Ryan Dahl在2009年推出Node.js后后端JavaScript才走出其迷局。Node.js的推出，我觉得该变了两个状况：
* 统一了前后端JavaScript的编程模型
* 利用事件机制，异步IO实现单线程编程，使得JavaScript在前后端达到实用价值
<!--more-->
因为第二次浏览器大战中的佼佼者V8的适时助力，使得Node.js在短短的两年内达到可观的运行效率，并迅速被大家接受。这一点从Node.js项目在Github上的流行度和NPM上的库的数量可见一斑。

## 事件机制的实现
Node.js中大部分的模块，都继承自[Event模块](https://github.com/nodejs/node/blob/master/doc/api/events.md)。Event模块是一个简单的事件监听器模式的实现。具有addListener/on，once，removeListener，removeAllListeners，emit等基本的事件监听模式的方法实现。它与前端DOM树上的事件并不相同，因为它不存在冒泡，逐层捕获等属于DOM的事件行为，也没有preventDefault()、stopPropagation()、 stopImmediatePropagation() 等处理事件传递的方法。
```
const EventEmitter = require('events');
class myEmitter extends EventEmitter {}
const myEmitter = new myEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');
```

从另一个角度来看，事件侦听器模式也是一种事件钩子（hook）的机制，利用事件钩子导出内部数据或状态给外部调用者。Node.js中的很多对象，大多具有黑盒的特点，功能点较少，如果不通过事件钩子的形式，对象运行期间的中间值或内部状态，是我们无法获取到的。这种通过事件钩子的方式，可以使编程者不用关注组件是如何启动和执行的，只需关注在需要的事件点上即可。
```
const options = {
  host: "www.google.com/",
  port: 80,
  path: "upload",
  method: "POST"
};

const req = http.request(options, res => {
  console.log("STATUS: " + res.statusCode);
  console.log("HEADERS: " + JSON.stringify(res.headers));
  res.setEncoding("utf8");
  res.on("data", function(chunk) {
    console.log("BODY: " + chunk);
  });
});

req.on("error", e => {
  console.log("problem with request: " + e.message);
});

// write data to request body
req.write("data\n");
req.write("data\n");
req.end();
```
在这段HTTP request的代码中，程序员只需要将视线放在error，data这些业务事件点即可，至于内部的流程如何，无需过于关注。

值得一提的是如果对一个事件添加了超过10个侦听器，将会得到一条警告，这一处设计与Node.js自身单线程运行有关，设计者认为侦听器太多，可能导致内存泄漏，所以存在这样一个警告。调用：
```
emitter.setMaxListeners(0);
```
可以将这个限制去掉。

其次，为了提升Node.js的程序的健壮性，EventEmitter对象对error事件进行了特殊对待。如果运行期间的错误触发了error事件。EventEmitter会检查是否有对error事件添加过侦听器，如果添加了，这个错误将会交由该侦听器处理，否则，这个错误将会作为异常抛出。如果外部没有捕获这个异常，将会引起线程的退出。

## 进阶应用
未完待续