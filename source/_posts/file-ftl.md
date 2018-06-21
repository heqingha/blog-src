---
title: .ftl文件是什么文件
author: 胖芮
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/about/'
authorAbout: 'http://www.ruizhengyun.cn'
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
photos: /img/pangrui.jpg
abbrlink: 93023d39
date: 2013-01-17 12:32:08
tags: 面试
keywords:
description:
---

1、Freemarker模板的文件后缀名

2、Freemarker其实是一种比较简单的网页展示技术，说白了就是网页模板和数据模型的结合体。这种结合模式的好处就是，分离了网页界面设计人员和编程人员的工作，让他们各司其职。

据个人理解，Freemarker大致的工作方式是，网页模板里面嵌入了数据模型中的数据、Freemarker自定义流程控制语言、Freemarker自定义的操作函数等等，在装载网页的时候，Freemarker模板自动从数据模型中提取数据，并解释整个网页为我们熟知的HTML页面。

在B/S程式设计中，常常有美工和程序员二个角色，他们具有不同专业技能：美工专注于表现——创建页面、风格、布局、效果等等可视元素；而程序员则忙于创建程式的商业流程，生成设计页面要显示的数据等等。

很多时候，要显示的资料在设计的时候并不存在，它们一般是在运行时由程式产生的，比如执行“价格不高于800NT的USB Disk”查询的返回结果。这种技术需求产生了JSP等Scriptlet，JSP十分强大，但是也常常被滥用，并导致一些不良的后果,将逻辑和表现混合在一起。,破坏了美工和程序员职责的正常分解使JSP页面难以阅读和维护。

模板引擎就是为了解决上面的问题而产生的。在设计HTML的时候，我们加入一些特定指令来指定要插入哪些数据，这些加了特殊指令的HTML或者其他文本，我们称为模板(Template)。而模板引擎会在输出页面时，用适当的数据替代这些代码
模板和嵌入JSP的HTML是不同的，模板指令只有很有限的编程能力，可以避免混入商业逻辑。

总结
简单的说，FreeMarker就是一种用Java编写的模板引擎，它根据模板输出多种规格的文本。特别指出的是，FreeMarker与Web应用框架无关，它同样可以应用在非Web应用程序环境中，而且，FreeMarker并不是只能生成HTML页面，它也可以生成各种文本，如XML/RTF/Java源代码等。

Freemarker是一个非常优秀的模版引擎，这个模版引擎可用于任何场景，FreeMarker负责将数据模型中的数据合并到模版中，从而生成标准输出。
FreeMarker特别适应与MVC模式的Web应用，通常有Java程序准备要显示的数据，由FreeMarker模版引擎来生成页面，而FreeMarker模版则提供页面布局支持，从而能更好地规范MVC架构，保证视图逻辑和业务逻辑分离。