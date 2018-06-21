---
title: 微信小程序开发(三)
author: 胖芮
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn'
authorAbout: 'http://www.ruizhengyun.cn'
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
photos: /img/2018/wx-sp-1.jpg
abbrlink: b78d9fbb
date: 2018-04-03 07:41:27
tags: 微信小程序
keywords: 微信小程序
description: 主要介绍小程序环境、WXSS、WXS、运行机制、生命周期、路由、事件
---
## 小程序、Nodejs、浏览器中的Javascript
### 小程序中的Javascript
* ECMAScript
* 小程序框架
* 小程序API

### Nodejs中的Javascript
* ECMAScript
* Native
* NPM(包管理)

### 浏览器中Javascript
* ECMAScript
* DOM
* BOM


## ECMAScript
* 语法
* 类型
* 语句
* 关键字
* 操作符
* 对象


## 小程序宿主环境
* IOS-JavascriptCore
* android-X5内核
* IDE-nwjs


## 开发框架
### WXSS优先级
`!important > style > #element > .element > element`

### WXS
* 模块
* 变量
* 注释
* 运算符
基本运算符、一元运算符、位运算符、比较运算符、等值运算符、赋值运算符、二元逻辑运算符
* 语句
* 数据类型
number、string、boolean、object、array、function、date、regexp
* 基础类库
console、Math、JSON、Number、Date、Global


### MINA框架
![开发框架-MINA框架](b78d9fbb/1.jpg)

### 运行机制-启动
* 热启动
* 冷启动

### 运行机制-加载
![运行机制-加载](b78d9fbb/2.jpg)

### 程序生命周期
* onLaunch
* onShow
* onHide
* onError
globalData 全局数据

### 页面生命周期
* onLoad
* onShow
* onReady
* onHide
* onUnload
data 页面数据
![生命周期](b78d9fbb/3.jpg)


### 路由
|路由方式|触发时机|路由前页面|路由后页面|
|:-|:-|:-|:-|
|初始化|小程序打开的第一个页面||onLoad, onShow|
|打开新页面|调用API `wx.navigateTo` 或使用组件 `<navigator open-type="navigateTo" />`|onHide|onLoad, onShow|
|页面重定向|调用API `wx.redirectTo` 或使用组件 `<navigator open-type="redirectTo" />`|onUnload|onLoad, onShow|
|页面返回|调用API `wx.navigateBack` 或使用组件 `<navigator open-type="navigateBack" />` 或用户按左上角返回按钮|onUnload|onShow|
|Tab切换|调用API `wx.switchTab` 或使用组件 `<navigator open-type="switchTab" />` 或用户切换Tab||...|
|重启动|调用API `wx.reLaunch` 或使用组件 `<navigator open-type="reLaunch" />`|onUnload|onLoad, onShow|


### 事件
* 事件是视图层到逻辑层的通讯方式
* 事件可以将用户的行为反馈到逻辑层进行处理
* 事件可以绑定在组件上，触发事件后，就会执行逻辑层中对应的事件处理函数
* 事件对象可以携带额外的信息

### 事件捕获和事件冒泡
![时间捕获和事件冒泡](b78d9fbb/4.jpg)
* 可捕获事件
`touchstart、touchmove、touchcancel、touchend、tap、longpress、longtap`
* 可冒泡事件
`touchstart、touchmove、touchcancel、touchend、tap、longpress、longtap、transitionend、animationstart、animationiteration、animationend、touchforcechange`

### 组件
* 组件是视图层的基本组成单元
* 组件自带一些功能与微信风格的样式
* 一个组件通常包括：开始标签和结束标签、属性用来修饰这个组件、内容在两个标签之间

### 组件应用
* 视图容器
`view、scroll-view、swiper、moveable-view、cover-view`
* 基础内容
* 表单组件
* 导航
* 媒体组件
* 地图
* 开放功能
* 画布
