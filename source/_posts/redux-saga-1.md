---
title: Redux-saga（一）
author: 胖芮
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/about/'
authorAbout: 'http://www.ruizhengyun.cn'
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
photos: /img/2016/redux-saga-compact.png
abbrlink: 89a9d8b3
date: 2017-02-06 09:27:33
tags: 
- react
- redux
- redux-saga
keywords:
description: redux-saga 是一个用于管理 Redux 应用异步操作（Side Effects。译注：直译成 “副作用” 不太通顺，所以这里译为 “异步操作” 更好理解）的中间件（又称异步 action）。
---
## 简介 Intro
redux-saga 是一个用于管理 Redux 应用异步操作（Side Effects。译注：直译成 “副作用” 不太通顺，所以这里译为 “异步操作” 更好理解）的中间件（又称异步 action）。


## 应用的逻辑
* Reducers 负责处理 action 的 state 更新
* Sagas 负责协调那些复杂或异步的操作


## Sagas 与 Thunks
* Thunks 在 action 被创建时调用
* Sagas 在应用启动时调用（但初始启动的 Sagas 可能会动态调用其他 Sagas）


## 如何应用
在 redux-saga 的世界里，所有的任务都通用 yield Effects 来完成（译注：Effect 可以看作是 redux-saga 的任务单元）。redux-saga 为各项任务提供了各种 Effect 创建器：
* 调用一个异步函数
* 发起一个 action 到 Store
* 启动一个后台任务
* 等待一个满足某些条件的未来的 action

因为使用了 Generator，redux-saga 让你可以用同步的方式写异步代码。如果不懂Generator，出门请走右边[阮一峰 Generator 函数的语法](http://es6.ruanyifeng.com/#docs/generator)

## 安装 Install
* npm安装 
```
npm install --save redux-saga
```
* yarn安装
```
yarn add redux-saga
```


## 本文lesson
* [github-code](https://github.com/ruizhengyun/redux-saga-lesson)


## 本文参考
* [Redux-saga中文文档](https://redux-saga-in-chinese.js.org/)


