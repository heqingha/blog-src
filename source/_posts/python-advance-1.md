---
title: python进阶（一）
author: 胖芮
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/about/'
authorAbout: 'http://www.ruizhengyun.cn'
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 学习
photos: /img/2018/python.jpeg
abbrlink: f019ff8c
date: 2018-02-08 13:54:22
tags: python
keywords:
description: anaconda简介，数据分析基础模块
---

## Anaconda简介
* [anaconda官网](https://www.anaconda.com/)
最受欢迎的Python数据科学平台

## Anaconda命令行
```
// 列出所有环境
conda env list

// 进入某个环境
source activate root[环境名] 

// 退出某个环境
source deactivate

// 查看当前环境所有的包
conda list

// 创建一个环境
conda create -n prpy3[自定义环境名，然后选"y"]

// 创建包
conda install python[包名[=版本]]
```

## 创建一个项目
* 创建一个conda环境，比如pjpy3(project-python3)
* 选择Pure Python
* location选择项目目录
* interpreter选择pjpy3环境bin下python3.6.x
* 最后点击 Create
* 在项目文件夹下创建.py文件，测试下能否运行

## pjpy3环境下
* 进入pjpy3环境，后面安装包都在改环境下
```
source activate pjpy3
```

* 安装numpy、scipy、pandas
```
conda install numpy
conda install scipy
conda install pandas
```

## 学习笔记
* [numpy.py](https://github.com/ruizhengyun/python-advance/blob/master/day-01/numpy.py)
* [pandas.py](https://github.com/ruizhengyun/python-advance/blob/master/day-01/pandas.py)
* [scipy.py](https://github.com/ruizhengyun/python-advance/blob/master/day-01/scipy.py)





