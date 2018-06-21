---
title: webpack学习指南（一）
author: 胖芮
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/about/'
authorAbout: 'http://www.ruizhengyun.cn'
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
photos: /img/2017/webpack.jpeg
abbrlink: 9f00045b
date: 2017-03-01 09:37:39
tags: webpack
keywords:
description: 核心概念，运行机制
---

## 核心概念（6）
* **Entry**: 入口。可以理解成输入。
* **Output**: 出口。可以理解成输出。在webpack经过一系列处理并得到最终想要的代码。
* **Module**: 模块。在webpack中，一切皆模块。一个模块对应一个文件。webpack会从Entry开始递归找出所有依赖的模块。
* **Chunk**: 代码块。一个chunk由多个模块组成，用于代码合并与分割。
* **Loader**: 加载器，模块转换器。用于把模块原内容按照需求装换成新内容。
* **Plugin**: 扩展插件。在webpack构建流程中的特定实际注入扩展逻辑来改变构结果。


## 运行机制
1、启动后进入`Entry`里配置的`Module`开始递归解析；
2、对`Module`根据配置的`loader`找对应规则并转换；
3、解析当前`Module`依赖的`Module`;
4、以`Entry`为单位分组，一个`Entry`和其他所有依赖的`Module`被分到一个组(就是一个`chunk`);
5、把所有`chunk`转换成文件输出；
6、整个流程中`webpack`会在恰当时机执行`plugin`中的逻辑。

