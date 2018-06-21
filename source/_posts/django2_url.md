---
title: Django2.0的URL路由语法
author: 胖芮
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 学习
tags: 
- python
- django
abbrlink: 822806a7
date: 2017-12-14 16:05:54
photos: /img/2018/python.jpeg
---
> 2017年12月2日，Django官方发布了2.0版本，成为多年来的第一次大版本提升，增加了许多新的特性。2.0无疑是一个里程碑版本，因为这是第一个只支持Python3.X的版本，和1.x是不兼容的。

## 案例一
比如 `urls.py`内容：
```
from django.urls import path
from . import views

urlpatterns = [
  path('', views.index, name = 'index'),
  path(r'^(?P<qustion_id>[0-9]+)/$',views.detail,name = 'detail'),
  path('^(?P<qustion_id>[0-9]+)/vote/$',views.vote,name = 'vote'),
]
```

运行之后就报错，问题出在2.0正则这块规则改了。正确的方式如下：
<!--more-->
```
from django.urls import path
from . import views

urlpatterns = [
  path('', views.index, name = 'index'),
  path('<int:question_id>',views.detail,name = 'detail'),
  path('<int:question_id>/vote/',views.vote,name = 'vote'),
]
```
