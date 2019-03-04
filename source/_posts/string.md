---
title: JavaScript中如何检测一个变量是一个String类型
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about/'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
tags: 面试
abbrlink: eaec44c7
date: 2015-01-03 12:42:20
---
```
typeof("name") === "string";
typeof "name" === "string";
"name".constructor === String;
```
