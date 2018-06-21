---
title: ASCII、Unicode、utf-8等之间的关系
author: 胖芮
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
tags: 编码
comments: true
abbrlink: f7dada25
date: 2012-03-23 10:44:58
---
## 美国ASCII
由于计算机是美国人发明的，因此，最早只有127个字符被编码到计算机里，也就是大小写英文字母、数字和一些符号，这个编码表被称为ASCII编码，ASCII编码是1个字节


## 中国GB2312
要处理中文显然一个字节是不够的，至少需要两个字节，而且还不能和ASCII编码冲突，所以，中国制定了GB2312编码，用来把中文编进去

## 其他国家
全世界有上百种语言，日本把日文编到Shift_JIS里，韩国把韩文编到Euc-kr里，各国有各国的标准，就会不可避免地出现冲突，结果就是，在多语言混合的文本中，显示出来会有乱码。

## Unicode
因此，Unicode应运而生。Unicode把所有语言都统一到一套编码里，这样就不会再有乱码问题了。Unicode编码通常是2个字节。
**问题**：
如果你写的文本基本上全部是英文的话，用Unicode编码比ASCII编码需要多一倍的存储空间，在存储和传输上就十分不划算。

|字符|ASCII|Unicode|UTF-8|
|-|-|-|-|
|A|01000001|00000000 01000001|01000001|
|中|x|01001110 00101101|11100100 10111000 10101101|

## UTF-8就是你了
计算机系统通用的字符编码工作方式：
在计算机内存中，统一使用Unicode编码，当需要保存到硬盘或者需要传输的时候，就转换为UTF-8编码。一句话：内存中Unicode编码，查看保存UTF-8编码。
* 用记事本编辑的时候，从文件读取的UTF-8字符被转换为Unicode字符到内存里，编辑完成后，保存的时候再把Unicode转换为UTF-8保存到文件：
![记事本](f7dada25/1.png)

* 浏览网页的时候，服务器会把动态生成的Unicode内容转换为UTF-8再传输到浏览器：所以你看到很多网页的源码上会有类似 `<meta charset="UTF-8" />`的信息，表示该网页正是用的UTF-8编码。
![浏览网页](f7dada25/2.png)


## 那么你，弄清楚了吗？
