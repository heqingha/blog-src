---
title: 如何获取浏览器URL中查询字符串中的参数
author: 胖芮
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
tags: 面试
abbrlink: aa0a66d8
date: 2015-01-05 13:10:07
---
```
var url = "http://www.ruizhengyun.cn/index.html?name=jianghu&id=27";
function showWindowHref(url) {
  if (!url) {
    url = window.location.href;
  }
  var args = url.split("?");
  if (args[0] === url) {
    return "";
  }
  var arr = args[1].split("&");
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i].split('=');
    obj[item[0]] = item[1] || "";
  }
  return obj;
}
var params = showWindowHref(url);
console.log(params['name']);  // jianghu
```