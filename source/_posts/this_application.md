---
title: 3个使用this的典型应用
author: 胖芮
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
tags: 面试
abbrlink: e1f16f4c
date: 2015-01-08 13:37:36
---
## 在html元素事件属性中使用

```
<input type="button" onclick="showInfo(this);" value="点击一下" />
```

## 构造函数
```
function Animal(name, color) {
  this.name = name;
  this.color = color;
}
```
<!--more-->
## input点击，获取值
```
<input type="button" id="btn" value="I am a button.">
<script>
  var btn = document.getElementById('btn');
  btn.onclick = function(){
    alert(this.value);
  }
</script>
```

## apply()/call()求数组最值
`ES3`给`Function`的原型定义了两个方法。`Function.prototype.call`和`Function.prototype.apply`。
在实际开发中，特别是在一些函数式代码编写中，`call和apply`方法尤其有用。在`javascript`的设计模式中，应用也十分广泛。能熟练应用这两个方法，是成为一名`javascript`程序员的重要一步。

```
var nums = [1, 3, 66, 6, 99, -4];
console.log(Math.max.apply(this, nums)); // 99
```