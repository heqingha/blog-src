---
title: 异步编程
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: img/2016/nodejs.jpg
abbrlink: b15b5e9d
date: 2017-06-01 17:03:20
tags: nodejs
keywords:
description:
---
## 难点
- 异常处理
- 函数嵌套过深
- 阻塞代码
- 多线程编程
- 异步转同步

## 解决方案
- 事件发布/订阅模式
- Promise/Defered模式
- 流程控制库

1.事件发布/订阅模式

```javascript
// 订阅
emitter.on('event1', msg => {
  console.log(msg)
})

// 发布
emitter.emit('event1', 'I am a message.')
```
可看出订阅事件就是一个高阶函数的应用。

在一些典型的场景中，可通过事件发布/订阅模式进行组件封装，将不变的部分封装在组件内部；将容易变化、需自定义的部分通过暴露给外部处理，这是一种典型的逻辑分离方式。


2.雪崩问题：就是在高访问量、大并发量的情况下缓存失效的情景，此时大量的请求同时涌入数据库中，数据库无法同时承受如此大的查询请求，进而往前影响到网站整体的响应速度。
```javascript
const proxy = new events.EventEmitter()
const status = 'ready'
const select = callback => {
  proxy.once('selected', callback)
  if(status === 'ready') {
    status = 'pending'
    db.select('SQL', res => {
      proxy.emit('selected', res)
      status = 'ready'
    })
  }
}
```

2.解决嵌套过深
哨兵变量:用于检测次数的变量。
```javascript
let count = 0
const res = {}
const done = (key, value) => {
  res[key] = value
  count++
  if(count === 3) {
    render(res)
  }
} 

fs.readFile(template_path, 'utf8', (err, template) => {
  done('template', template)
})

db.query(sql, (err, data) => {
  done('data', data)
})

l10n.get((err, resources) => {
  done('resources', resources)
})
```
```javascript
const after = (times, callback) => {
  let count = 0
  const res = {}
  return (key, value) => {
    res[key] = value
    count++
    if(count === times) {
      callback(res)
    }
  }
}

const emitter = new events.Emitter()
const done = after(times, render)

emitter.on('done', done)
emitter.on('other', other)

fs.readFile(template_path, 'utf8' (err, template) => {
  emitter.emit('done', 'template', template)
})

db.query(sql, (err, data) => {
  emitter.emit('done', 'data', data)
})

l10n.get((err, resources) => {
  emitter.emit('done', 'resources', resources)
})
```
