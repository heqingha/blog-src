---
title: 怎样添加、移除、移动、复制、创建和查找节点
author: 胖芮
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
tags: 面试
abbrlink: c704e58c
date: 2015-01-07 13:21:00
---
## 创建新节点
```
createDocumentFragment(); // 创建一个DOM片段
createElement(); // 创建一个具体元素
crateTextNode(); // 创建一个文本节点
```
<!--more-->
## 添加、移除、替换、插入

```
appendChild(); // 添加
removeChild(); // 移除
replaceChild(); // 替换
insertBefore(); // 插入
```

## 查找
```
getElementByTagName(); // 通过标签名称
getElementByName(); // 通过元素的Name属性值
getElementById(); // 通过元素id，唯一性
```
