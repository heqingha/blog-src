---
title: babel到底该如何配置
author: 胖芮
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
tags:
abbrlink: ce65e99a
date: 2017-10-25 08:51:37
---

## 背景
说起ES6，webpack，打包，模块化总是离不开babel，babel作为一个js的编译器已经被广泛使用。在babel的官网是这样介绍它的：

> Babel is a JavaScript compiler.Use next generation JavaScript, today.

大家都知道js作为宿主语言，很依赖执行的环境（浏览器、node等），不同环境对js语法的支持不尽相同，特别是ES6之后，ECMAScrip对版本的更新已经到了一年一次的节奏，虽然每年更新的幅度不大，但是每年的提案可不少。babel的出现就是为了解决这个问题，把那些使用新标准编写的代码转译为当前环境可运行的代码，简单点说就是把ES6代码转译（转码+编译）到ES5。
<!-- more -->
经常有人在使用babel的时候并没有弄懂babel是干嘛的，只知道要写ES6就要在webpack中引入一个babel-loader，然后胡乱在网上copy一个.babelrc到项目目录就开始了（ps: 其实我说的是我自己）。理解babel的配置很重要，可以避免一些不必要的坑，比如：代码中使用Object.assign在一些低版本浏览器会报错，以为是webpack打包时出现了什么问题，其实是babel的配置问题。



## ES6
正文之前先谈谈ES6，ES即ECMAScript，6表示第六个版本(也被称为是ES2015，因为是2015年发布的)，它是javascript的实现标准。
* Stage 0: strawman
* Stage 1: proposal
* Stage 2: draft - 必须包含2个实验性的具体实现，其中一个可以是用转译器实现的，例如Babel。
* Stage 3: candidate - 至少要有2个符合规范的具体实现。
* Stage 4: finished
可以看到提案在进入stage3阶段时就已经在一些环境被实现，在stage2阶段有babel的实现。所以被纳入到ES标准的语法其实在大部分环境都已经是有了实现的，那么为什么还要用babel来进行转译，因为不能确保每个运行代码的环境都是最新版本并已经实现了规范。



## Babel的版本变更
写这篇文章时babel版本已经到了`v7.0.0-beta.3`,也就是说7.0的正式版就要发布了，可喜可贺。但是今天不谈7.0，只谈babel6，在我知道并开始使用的babel的时候babel已经到了版本6，没有经历过5的时代。

在babel5的时代，babel属于全家桶型，只要安装babel就会安装babel相关的所有工具，

即装即用。

但是到了babel6，具体有以下几点变更：

![babel6变更](ce65e99a/1.jpg)

* 移除babel全家桶安装，拆分为单独模块，例如：babel-core、babel-cli、babel-node、babel-polyfill等；可以在babel的github仓库看到babel现在有哪些模块。
* 新增 .babelrc 配置文件，基本上所有的babel转译都会来读取这个配置；
* 新增 plugin 配置，所有的东西都插件化，什么代码要转译都能在插件中自由配置；
* 新增 preset 配置，babel5会默认转译ES6和jsx语法，babel6转译的语法都要在perset中配置，preset简单说就是一系列plugin包的使用。


## babel各个模块介绍
babel6将babel全家桶拆分成了许多不同的模块，只有知道这些模块怎么用才能更好的理解babel。
下面的一些示例代码已经上传到了github，欢迎访问，欢迎star。

### 安装方式：
```
#通过npm安装
npm install babel-core babel-cli babel-node

#通过yarn安装
yarn add babel-core babel-cli babel-node

```

#### babel-core
看名字就知道，babel-core是作为babel的核心存在，babel的核心api都在这个模块里面，比如：transform。
下面介绍几个babel-core中的api
* babel.transform：用于字符串转码得到 AST
```
/*
 * @param {string} code 要转译的代码字符串
 * @param {object} options 可选，配置项
 * @return {object} 
*/
babel.transform(code: string, options?: Object)

//返回一个对象(主要包括三个部分)：
{
    generated code, //生成码
    sources map, //源映射
    AST  //即abstract syntax tree，抽象语法树
}
```


