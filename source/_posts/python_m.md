---
title: python -m
author: 胖芮
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 学习
tags:
  - python
photos: /img/2018/python.jpeg
abbrlink: b2ca4589
date: 2017-02-02 10:31:31
---
## 一、问题
在命令行中启动 `python` 脚本的时候，经常会用到-m参数，那么`-m` 起什么作用呢？
```
python --help
```
你会发现 `-m` 后面备注是将库中的 `python` 模块用作脚本去运行
<!--more-->


## 二、常用例子
```
# python2中启动一个简单的http服务器
python -m SimpleHTTPServer

# python3中启动一个简单的http服务器
python3 -m http.server   

# 查看django版本
python -m django --version 
```
*注：这种加载py文件的方式叫做直接运行，相当于import，叫做当做模块来启动*


不同的加载 `py` 文件的方式，主要是影响 `sys.path` 这个属性。`sys.path` 相当于 `Linux` 中的 `PATH`.
```
>>> import sys
>>> sys.path
['', 'D:\\Python3\\lib\\site-packages\\django-1.10.1-py3.5.egg', 'D:\\Python3\\l
ib\\site-packages\\psycopg2-2.6.2-py3.5-win32.egg', 'D:\\Python3\\python35.zip',
 'D:\\Python3\\DLLs', 'D:\\Python3\\lib', 'D:\\Python3', 'D:\\Python3\\lib\\site
-packages']
```
这就是当前Python解析器运行的环境，`Python` 解析器会在这些目录下去寻找依赖库。
