---
title: javascript设计模式（七）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/2015/javascript.jpeg
abbrlink: 20ea504a
date: 2019-01-14 13:19:59
tags: 
- javascript
- 设计模式
keywords: 代理模式
description: 代理模式
---

## 代理模式
- 使用者无权访问目标对象
- 中间加代理，通过代理做授权和控制

## 示例
- 访问 google

![](./20ea504a/1.png)
- 明星经纪人

## UML类图
![](./20ea504a/uml.jpg)

## 代码

```javascript
// 代理模式
class ReadImg {
  constructor(fileName) {
    this.fileName = fileName;
    this.loadFromDisk(); // 初始化从硬盘中加载
  }
  loadFromDisk() {
    console.log('loading ... ' + this.fileName);
  }
  display() {
    console.log('display ... ' + this.fileName);    
  }
}

class ProxyImg {
  constructor(fileName) {
    this.realImg = new ReadImg(fileName);
  }

  display() {
    this.realImg.display();
  }
}

// 测试
const proxyImg = new ProxyImg('1.png');
proxyImg.display()
```

## 场景
1.网页事件代理
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>proxy addEventListener</title>
</head>
<body>
  <ul id="wrap">
    <li><a href="#">a1</a></li>
    <li><a href="#">a2</a></li>
    <li><a href="#">a3</a></li>
    <li><a href="#">a4</a></li>
    <li><a href="#">a5</a></li>
    <li><a href="#">a6</a></li>
    <li><a href="#">a7</a></li>
    <li><a href="#">a8</a></li>
    <li><a href="#">a9</a></li>
  </ul>
 
  <script>
    var wrap = document.querySelector('#wrap');
    wrap.addEventListener('click', function(e) {
      var target = e.target;
      if(target.nodeName === 'A') {
        console.log(target.innerHTML)
      }
    })
  </script>
</body>
</html>
```

2.jQuery $.proxy
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>proxy jQuery</title>
  <style>
  #btn {
    display: block;
    margin: 0 auto;
    font-size: 16px;
    padding: 10px 45px;
    border: 1px solid #ddd;
  }
  </style>
</head>
<body>
  <button id="btn">戳我</button>
  
  <script src="https://cdn.bootcss.com/jquery/3.3.0/jquery.js"></script>
  <script>
    var $btn = $('#btn');
    $btn.click(function() {
      $(this).css('color', 'red');
    });

    // this 不符合预期
    $btn.click(function() {
      setTimeout(function() {
        $(this).css('backgroundColor', 'green');
      }, 1000)
    });
    
    // 可定义 _this 中转下
    $btn.click(function() {
      var _this = this;
      setTimeout(function() {
        $(_this).css('backgroundColor', 'orange');
      }, 1000)
    });

    // 推荐使用 $.proxy() 解决，这样就少定义一个变量
    $btn.click(function() {
      setTimeout($.proxy(function() {
        $(this).css('backgroundColor', 'blue');
        $(this).css('color', 'white');
      }, this), 2000)
    });
  </script>
</body>
</html>
```

3.ES6 Proxy-明星经纪人
```javascript
// 代理模式
let star = {
  name: '刘xx',
  age: 27,
  phone: 'star: 13666668888'
}

// 经纪人
const agent = new Proxy(star, {
  get: function(target, key) {
    if(key === 'phone') {
      // 返回经纪人电话
      return 'agent: 15899998888'
    }
    if(key === 'price') {
      // 明星不报价，经纪人报价
      return 120000
    }
    return target[key];
  },
  set: function(target, key, val) {
    if(key === 'customPrice') {
      if(val < 100000) {
        throw new Error('价格太低');
      } else {
        target[key] = val
        return true
      }
    }
  },
});

// 测试
console.log(agent.name)
console.log(agent.age)
console.log(agent.phone)
console.log(agent.price)

console.log('---分割线---')
agent.customPrice = 180000
console.log(agent.customPrice)
```


## 设计原则验证
- 代理类和目标类分离，隔离开目标类和使用者（不操作目标类）
- 符合开放封闭原则

## 代理模式 vs 适配器模式
代理模式：提供一模一样的接口
适配器模式：提供一个不同的接口
相同点：都不可以直接使用

## 代理模式 vs 装饰器模式
代理模式：显示原有功能，但是有所限制
装饰器模式：可直接使用，扩展功能
