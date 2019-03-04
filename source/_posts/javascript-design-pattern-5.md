---
title: javascript设计模式（五）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/2015/javascript.jpeg
abbrlink: cee43166
date: 2019-01-10 13:19:59
tags: 
- javascript
- 设计模式
keywords: 适配器模式
description: 适配器模式
---

## 适配器模式（不改变之前的方法，添加新方法供第三方使用）
- 旧接口格式和使用者不兼容
- 中间加一个设配转换接口

## 生活用例
![](./cee43166/1.png)

## UML类图
![](./cee43166/uml.jpg)

## 代码
```javascript
// 适配器模式
class Adaptee {
  specificRquest() {
    return '他国标准插头'
  }
}

class Target {
  constructor() {
    this.adaptee = new Adaptee();
  }
  request() {
    let info = this.adaptee.specificRquest();
    return `${info} - 转换器 - 中国标准插头`
  }
}

// 测试
let target = new Target();
let res = target.request();
console.log(res);
```

## 场景
1.ajax封装旧接口

```javascript
// 历史原因(之前用的是jquery)，代码全都是,现在把jquery去掉了，但是$.ajax()替换麻烦
$.ajax({
  // ...
});

// 想要替换成自己封装的接口
ajax({
  url: '/getData',
  type: 'POST',
  dataType: 'json',
  data: {
    id: '111'
  }
}).done(funciton() { });

// 这个时候做一层适配(ajax封装旧接口)，全文替换不知道会有什么坑
var $ = {
  ajax: function(options) {
    return ajax(options);
  }
}
```

2.vue computed
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>vue computed</title>
</head>
<body>
  <div id="app">
    <p>顺序：{{message}}</p>
    <p>倒序：{{reversedMessage}}</p>
  </div>
  <script src="https://cdn.bootcss.com/vue/2.5.16/vue.js"></script>
  <script>
    var vm = new Vue({
      el: '#app',
      data: {
        message: 'hello'
      },
      computed: {
        reversedMessage: function() {
          return this.message.split('').reverse().join('')
        }
      }
    })
  </script>
  <pre>
  本地起服务可用http-server
  若没有安装
  npm install http-server -g
  sudo npm install http-server -g

  使用
  http-server -p 8001
  </pre>
</body>
</html>
```

## 设计原则验证
- 将旧接口和使用者进行分离
- 符合开放封闭原则