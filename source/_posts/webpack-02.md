---
title: webpack学习指南（二）
author: 胖芮
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/about/'
authorAbout: 'http://www.ruizhengyun.cn'
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
photos: /img/2017/webpack.jpeg
abbrlink: '60955e1'
date: 2017-03-02 10:20:27
tags: webpack
keywords:
description: Entry
---

## Entry理解
`Entry`（必填项）是配置模块的入口，可以抽象成输入。webpack构建的第一步就是从此开始**递归解析**出所有入口依赖的模块。


## Entry类型
1、string 
```
entry: './app/entry'
```

2、array 
```
entry: ['./app/entry1', './app/entry2']
```
搭配output.library配置项使用时，只有数组里的最后一个入口文件会被导出。

3、object 
```
entry: {
  a: './app/a', 
  b: ['./app/b1', './app/b2']
}
```
配置多个入口，每个入口生成一个Chunk。


## Chunk名称
webpack会为每个生成的Chunk取一个名称，Chunk的名称和Entry的配置有关：
1.如果entry是一个string或者array，就只会生成一个chunk，这个chunk的名称是main;
2.如果entry是一个object，就可能出现多个chunk，这时chunk的名称是object键值对里键的名称。


## 配置动态Entry
假如项目里有多个页面需要为每个页面的入口配置一个entry，但这些页面数量可能会不断增长，这时entry的配置会受到其他因素的影响导致不能写成静态的值。解决办法就是把entry设置成一个函数去动态返回上面所说的配置：
```
// 同步函数
entry: () => {
    return {
        a: './pages/a',
        b: './pages/b'
    }
}
// 异步函数
entry: () => {
    return new Promise((resolve) => {
        resolve({
            a: './pages/a',
            b: './pages/b'
        })
    })
}
```

