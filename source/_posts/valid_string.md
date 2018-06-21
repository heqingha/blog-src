---
title: JavaScript中如何检测一个变量是一个String类型
author: 胖芮
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
tags: 面试
abbrlink: eaec44c7
date: 2015-01-03 12:42:20
---
```
typeof("name") === "string";
typeof "name" === "string";
"name".constructor === String;
```
