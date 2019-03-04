---
title: javascript设计模式（十）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
keywords: 观察者模式
description: 观察者模式
photos: /img/pangrui.jpg
abbrlink: 34a83a79
date: 2019-01-23 13:51:43
tags:
- javascript
- 设计模式
---

## 观察者模式
- 发布 & 订阅（先订阅，触发发布操作）
- 1对N

## 示例
- 点吃的，等待
- 点喝的，等待

## UML 类图
![](./34a83a79/uml.jpg)

## 代码
```javascript
// 目标-主题，保存状态，状态变化后触发（通知）所有观察者对象更新
class Subject {
  constructor() {
    this.state = 0;
    this.observers = []
  }
  getState() {
    return this.state;
  }
  setState(state) { // 目标发生变化时，调度观察者的更新方法
    this.state = state;
    this.notifyAllObservers();
  }
  notifyAllObservers() {
    this.observers.forEach(observer => {
      observer.update();
    })
  }
  attach(observer) {
    this.observers.push(observer);
  }
}

// 观察者-提供更新接口
class Observer {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
    this.subject.attach(this); // 观察者把自己注册到具体目标里
  }
  update() {
    console.log(`${this.name} update, state: ${this.subject.getState()}`)
  }
}

// 测试
const s = new Subject();
const o1 = new Observer('o1', s);
const o2 = new Observer('o2', s);
const o3 = new Observer('o3', s);

s.setState(1);
s.setState(2);
s.setState(3);
```

## 场景
1.网页事件绑定
```javascript
// 1对3
var $btn1 = $('#btn1');
$btn1.click(function() {
  console.log('btn1 click:', 1);
});
$btn1.click(function() {
  console.log('btn1 click:', 2);
});
$btn1.click(function() {
  console.log('btn1 click:', 3);
});
```  

2.Promise- 绑定 then，一旦状态发生变化，then 中函数就执行。

```javascript
// 面向对象
function loadImg(src) {
  let promise = new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.onload = function(){
      resolve(img);
    }
    img.onerror = function(){
      reject('图片加载失败');
    }
    img.src = src;
  });
  return promise;
}

let imgUrl = 'http://ruizhengyun.cn/static/images/bg/bg_22.jpeg';

// 单一职责和
loadImg(imgUrl).then(function(img){
  alert(`width: ${img.width}`);
  return img;
}).then(function(img) {
  alert(`height: ${img.height}`);
}).catch(function(ex){
  alert(ex);
});


```

3.jQuery callbacks
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>观察者模式</title>
</head>
<body>
  <script src="https://cdn.bootcss.com/jquery/3.3.0/jquery.js"></script>
  <script>
    // 自定义事件，自定义回调
    var callbacks = $.Callbacks();

    // 添加观察者
    callbacks.add(function(info){
      console.log('fn1', info);
    });
    callbacks.add(function(info){
      console.log('fn2', info);
    });
    callbacks.add(function(info){
      console.log('fn3', info);
    });

    // 触发
    callbacks.fire('Are you ready?');
    callbacks.fire('gogogo');
  </script>
</body>
</html>
```

4.nodejs 自定义事件
```javascript
// 观察者- nodejs 自定义事件
const EventEmitter = require('events').EventEmitter;

class Dog extends EventEmitter {
  constructor(name){
    super();
    this.name = name;
  }
}

// 测试
const simon = new Dog('simon');
simon.on('dark', function() {
  console.log(`${this.name} barked`)
})

setTimeout(function() {
  simon.emit('dark');
}, 1000)
```

5.nodejs 自定义事件-读取文件 `observer-fs.js`
```javascript
// 观察者- fs
const fs = require('fs');
const readStream = fs.createReadStream('./data/file.txt');

var length = 0;
readStream.on('data', function(chunk) {
  length += chunk.toString().length
})

readStream.on('end', function() {
  console.log('length', length)
})
```

```nodejs
// 命令行
node observer-fs.js
```

6.nodejs 自定义事件-逐行读取文件 `observer-readline.js`
```javascript
// 观察者- readline
var readline = require('readline');
var fs = require('fs');

var rl = readline.createInterface({
  input: fs.createReadStream('./data/file.txt')
})

var lineNum = 0;
rl.on('line', function(line) {
  lineNum++;
  console.log(`lineNum ${lineNum < 10 ? '0' + lineNum : lineNum} content is: ${line}`)
})
rl.on('close', function() {
  console.log(`lineNum total: `, lineNum);
})
```

```nodejs
// 安装readline
npm install -S readline

// 命令行
node observer-readline.js
```

7.nodejs 中，处理 http 请求；
```javascript
// 观察者- http
function serverCallback(req, res) {
  var method = req.method.toLowerCase();
  if(method === 'get') {

  } 
  if(method === 'post') {
    // 接收 post 请求的内容
    var data = '';
    req.on('data', function(chunk) {
      data += chunk.toString()
    })
    req.on('end', function() {
      res.writeHead(200, {'Content-type': 'text/html'})
      res.write(data)
      res.end()
    })
  }
}
```

8.多进程通讯
```javascript
// parent.js
const cp = require('child_process');
const n = cp.fork('./sub.js');

n.on('message', m => {
  console.log('parent got message', m)
})
n.send({ hello: 'hello' })


// sub.js
process.on('message', m => {
  console.log('child got message', m)
})
process.send({ foo: 'foo' })
```

9.react 中应用
```javascript
// 监听生命周期（钩子）执行回调
class Login extends React.component {
  constructor(props, context) {
    super(props, context);
  }
  
  render() {
    return (
      <div>
        <Header title="登录" history={this.props.history} />
      </div>
    )
  }

  componentDidMount() {
    // 判断是否登录
    this.checkLogin();
  }
}
```

10.vue 中应用
```javascript
// 监听生命周期（钩子）执行回调
var vm = new Vue({
  el: '#root',
  data: {
    firstName: 'Foo',
    lastName: 'Far',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function(val) {
      this.firstName = val + ' ' + this.lastName;
    },
    lastName: function(val) {
      this.fullName = this.firstName + ' ' + val;
    }
  }
})
```

## 设计原则
- 主题和观察者分离，不是主动触发而是被动监听，两者解耦