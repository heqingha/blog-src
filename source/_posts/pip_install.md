---
title: pip安装
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
abbrlink: 93a0f72a
date: 2017-01-05 10:06:00
---

## 一、脚本安装
#### 1、下载 get-pip.py
```
wget https://bootstrap.pypa.io/get-pip.py
```

#### 2、运行python get-pip.py即可
如果`setuptools`和`wheel`没有安装，`get-pip.py`会安装`setuptools`和`wheel`
Options:
```
--no-setuptools（不安装setuptools）
--no-wheel（不安装wheel）
```
<!--more-->



## 二、源码安装
从 *[http://pypi.python.org/pypi/pip#downloads](http://pypi.python.org/pypi/pip#downloads)* 下载最新的pip包

#### 解压
```
tar xvf pip-x.x.x.tar.gz
```


## 三、easy_install安装
```
easy_install pip
```