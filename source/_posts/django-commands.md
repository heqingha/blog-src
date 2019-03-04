---
title: Django常用命令
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
tags: 
- python
- django
abbrlink: 7b101a85
date: 2017-12-07 10:37:32
photos: /img/2018/python.jpg
---
## 创建项目
```
django-admin startproject 项目名
```

## 创建应用
```
python3 manage.py startapp 应用名
```
<!--more-->
## 启动服务
```
python3 manage.py runserver
```

## 数据迁移及更新数据库
```
python3 manage.py makemigrations[应用名]
python3 manage.py migrate
# 此时查看SQLiteStudio，更新下就会看到[应用名_类]表
```

## 创建超级用户
```
python3 manage.py createsuperuser
```
