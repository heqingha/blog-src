---
title: react，你知多少-虚拟dom和diff算法（二）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
keywords: 虚拟dom和diff算法
description: 虚拟dom和diff算法
photos: /img/pangrui.jpg
abbrlink: c9949a5
date: 2018-12-11 10:13:17
tags:
---
如果你还没了解react一些概念，请看[react，你知多少-基本概念（一）](/blog/post/9590181f.html)

用过react的童鞋多多少少都了解过这两个概念（虚拟dom和diff算法）。其实这里的**虚拟dom**就是前面介绍的**element纯对象**，为什么这么说呢？我们知道element是dom节点或组件实例的一种纯对象描述，并不是真正的dom节点，因此是虚拟dom。

react给我们提供了声明式的组件写法，当组件`props`或`state`变化时组件自动更新。整个页面其实就是对应到一颗**dom节点树**，每次组件`props`或`state`变更首先会反映到**虚拟dom树**，然后才到页面的节点树的渲染。

## 再看看diff算法，它和虚拟dom什么关系呢？
1.其实吧，没有diff算法也能运转。每次组件的`props`或`state`变化后，所有相关dom节点删除再重新创建，就是效率低、非常低。diff算法就是为了提升渲染效率而生的。
2.react内部存在两颗虚拟dom树，分别表示现状以及下一状态。`setState`调用后就会触发diff算法的执行，好的diff算法会尽可能复用已有的dom节点，避免产生重新创建的开销。

![](./c9949a5/1.jpg)

react组件最初渲染到页面生成第一帧虚拟dom，这是current指针指向该第一帧，`setState`调用后会生成第2帧虚拟dom，这时next指针指向第二帧，接下来就是diff算法通过比较第二帧和第一帧的异同将更新并应用到真正的dom树以完成页面更新。

那`setState`怎么生成虚拟dom，其实就是`setState`调用触发了`render`方法返回**element纯对象**

![](./c9949a5/2.jpg)


react官方对diff算法有另外一个称呼，叫**reconciliation**（消除分歧、核对），就是对比虚拟dom异同的意思。也可以说**reconcile函数就是diff算法**。

![](https://juejin.im/post/5c0c7304f265da613e22106c#heading-14)