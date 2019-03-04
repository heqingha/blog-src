---
title: 请用js去除字符串空格
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about/'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
tags: 面试
abbrlink: a0f816c0
date: 2015-01-04 12:47:39
---
## 方法一：使用`replace`正则匹配的方法
```
去除所有空格: str = str.replace(/\s*/g,"");      

去除两头空格: str = str.replace(/^\s*|\s*$/g,"");

去除左空格： str = str.replace( /^\s*/, “”);

去除右空格： str = str.replace(/(\s*$)/g, ""); 
```

## 方法二：使用`str.trim()`方法
`str.trim()`局限性：无法去除中间的空格，实例如下：
```
var str = "   jiang  hu   ";
var str2 = str.trim();
console.log(str2);   // jiang  hu
```
同理，`str.trimLeft()，str.trimRight()`分别用于去除字符串左右空格。


## 方法三：使用`jquery,$.trim(str)`方法
`$.trim(str)`局限性：无法去除中间的空格，实例如下：
```
var str = "   jiang  hu   ";
var str2 = $.trim(str)
console.log(str2);   //  jiang  hu
```