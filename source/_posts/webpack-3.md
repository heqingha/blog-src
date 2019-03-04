---
title: webpack学习指南（三）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/2017/webpack.jpg
abbrlink: '710e6577'
date: 2017-03-03 11:46:14
tags: webpack
keywords:
description: Output
---
## Output
是一个 object，配置如何输出最终想要的代码。

### filename
配置有入口（entry）输出文件的名称，string。
```
filename: 'bundle.js' // 单个文件
filename: '[name].js' // 多个chunk
```
其中[name]可用内置的变量去替换。内置变量有：
```
1、id,chunk的唯一标识，从0开始
2、name,chunk的名称
3、hash,chunk的唯一标识的hash值
4、chunkhash,chunk内容的hash值
hash和chunkhash长度可指定，[hash:8]，默认是20位（长的吓死你）
```
> 注意 ExtractTextWebpackPlugin 插件是使用 contenthash 来代表哈希值而不是 chunkhash， 原因在于 ExtractTextWebpackPlugin 提取出来的内容是代码内容本身而不是由一组模块组成的 Chunk。


### chunkFilename
配置无入口的chunk在输出时的文件名称。
chunkFilename和filename非常类似，但是chunkFilename只用于指定在运行过程中生成的chunk在输出的时的文件名称。常见的会在运行时生成chunk场景只有在使用CommonChunkPlugin，使用`import('path/to/module')`动态加载等时，chunkFilename支持和filename一致的内置变量。


### path
输出文件存放**本地目录**，必须是**string类型的u路径**。
```
path: path.resolve(__dirname, 'dist_[hash]');
```


### publicPath
配置发布到线上资源的URL前缀，为string类型，默认值是空字符串，即使用相对路径。
output.path和output.publicPath都支持字符串模板，内置变量只有一个：hash代表编译一次的hash值。


### crossOriginLoading
webpack输出的部门代码可能需要异步加载，而异步加载时通过jsonp方式实现。
jsonp的原理是动态的向HTML中插入一个script标签去异步加载资源。

output.crossOriginLoading则是用于配置这个异步插入标签的crossorigin值。crossorigin属性：
```
1. anonymous(默认)在加载此脚本资源时不会带上用户的cookie；
2. use-credentials 在加载此脚本资源时会带上用户的cookies；
```
通常设置crossorigin来获取异步加载的脚本执行时的详细错误信息。



