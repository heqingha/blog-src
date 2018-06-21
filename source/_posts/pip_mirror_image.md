---
title: pip镜像
author: 胖芮
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 学习
tags:
  - python
  - pip
photos: /img/2018/python.jpeg
abbrlink: 28dd4784
date: 2017-01-19 10:21:11
---
## 一、来源（镜像url）
* 豆瓣：[http://pypi.douban.com/simple](http://pypi.douban.com/simple)
* 阿里云：[http://mirrors.aliyun.com/pypi/simple/](http://mirrors.aliyun.com/pypi/simple/)
* 中科大：[http://pypi.mirros.ustc.edu.cn/simple](http://pypi.mirros.ustc.edu.cn/simple)
* 清华大学：[https://pypi.tuna.tsinghua.edu.cn/simple/](https://pypi.tuna.tsinghua.edu.cn/simple/)
*注：使用国内的镜像源，安装各种包速度会快一些*
<!--more-->


## 二、设置
#### 1、单次设置
```
pip install 包名 -i 镜像url
```

#### 2、全局设置
（1）pip配置文件：
Unix、Mac OS的pip配置文件位于：`$HOME/.pip/pip.conf`
Windows的pip配置文件位于：`%HOME%\pip\pip.ini`
注：Windows下%HOME%路径一般为：`C:\Users\<UserName>\`
2）往pip配置文件写入如下内容（如果没有配置文件则在相应路径新建一个），这里以豆瓣的镜像为例：
```
[global]
trusted-host=pypi.douban.com
timeout=6000
index-url=http://pypi.douban.com/simple
```
