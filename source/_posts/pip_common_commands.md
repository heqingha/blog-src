---
title: pip常用命令
author: 江湖再见
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 学习
tags:
  - python
  - pip
photos: /img/2018/python.jpg
abbrlink: 5de0445d
date: 2017-01-26 10:26:09
---
>pip是python的一个非常好用的包管理工具，可以用来很方便地安装和管理各种三方库，本文对其基本用法进行介绍。

## 安装软件包
```
# 注：这里的包名，也可以是已经下载好的whl文件或tar.gz压缩包文件路径，或者包所在的URL地址。
pip install 包名
```

## 升级pip自身
```
pip install --upgrade pip
```
<!--more-->

## 查看已经通过pip安装的包
```
pip list
```

## 显示当前已经通过pip安装的包及版本号
```
pip freeze
```

## 快速解决不同电脑相同配置
1）重定向到 `requirements.txt` 文件中： `pip freeze > requirements.txt` 使用已有的 `requirements.txt` 文件在另一个环境上安装各种包（比如在一台新电脑上）： `pip install -r requirements.txt`。
*注：这个命令的好处就是，如果换了一个新的环境需要安装一个相同的 `python` 环境，那么只需要有 `requirements.txt` 文件即可快速安装，就不需要再思考要安装哪些包了。*

## 查看某个已经安装的包的详情
```
pip show 包名
```

## 查看过期的包
```
pip list --outdated
```

## 安装包到用户目录
```
pip install 包名 --user
```

## 安装本地的安装包
```
pip install 目录|文件名
```

## 卸载包
```
pip uninstall 包名
```

## 升级包
```
pip install 包名 --upgrade
```

## 显示包所在目录
```
pip show -f 包名
```

## 搜索包
```
pip search 关键字
```

## 查询可升级的包
```
pip list -o
```

## 下载包但不安装
```
pip install 包名 -d 目录
```

## 打包
```
pip wheel 包名
```