---
title: 百度地图如何支持https
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/frontend.jpg
abbrlink: 6e4b694d
date: 2015-03-07 12:59:54
tags:
keywords:
description:
---
百度地图开放平台很早就支持https了，看下你的url，需要加上 s=1，格式如下：
```
// https://api.map.baidu.com/api?v=2.0&ak=你的秘钥& s=1
例如：<script src="https://api.map.baidu.com/api?v=2.0&ak=你的秘钥&s=1"></script>
```
