---
title: 当打开页面发生了哪些事情
author: 胖芮
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
tags: http
abbrlink: ba70fe55
date: 2014-05-01 15:30:38
---

## 发生了什么
有这么一个场景，当在网页的地址栏输入***[网址url](#url)***，然后回车后，到底发生了哪些事情尼？
这个问题没有一固定的答案，你可以回答的很简单，也可以解释的很深入。
我的给出是5步：查询-发送-处理-发送-渲染
1、【查询】浏览器查找域名[domain]的IP，从不同的缓存直至***[DNS服务器](#dns)***；
2、【发送】浏览器给web服务器发送一个HTTP请求；
3、【处理】服务器收到请求后得*处理*吧；
4、【发送】处理完成后，服务器发回一个HTTP响应（礼尚往来嘛）；
5、【渲染】浏览器渲染HTML到页面；
<!-- more -->

### 举个栗子
浏览器从url: *http://www.example.com:80/about.html* 获取到资源后，整个过程如下：
1）浏览器解析出主机名；
2）浏览器查询这个主机名的IP地址(DNS)-*http://www.example.com:80（xxx.xx.xx.x）*；
3）浏览器获得端口号（*80*）；
4）浏览器发起到IP地址（*xxx.xx.xx.x*）端口（*80*）的链接；
5）浏览器向服务器发送一条HTTP GET 报文；
6）服务器处理；
7）服务器发回一个HTTP响应；
8）浏览器读取从服务器读取的HTTP响应报文并渲染；
其实就比上面的多了1、2、3这3个步骤





## 名字注释
### <span id="dns">DNS服务器</span>
DNS（Domain Name System，域名系统），因特网上作为域名和IP地址相互映射的一个分布式数据库，能够使用户更方便的访问互联网，而不用去记住能够被机器直接读取的IP数串。通过主机名，最终得到该主机名对应的IP地址的过程叫做域名解析（或主机名解析）。
[百度百科DNS出的解释](https://baike.baidu.com/item/dns/427444?fr=aladdin)

### URI/<span id="url">URL</span>
上面我们在地址栏输入的URI[Uniform Resource Identifier]（统一资源标识符），现实生活中用的比较多的是URL[Uniform Resource Locator]（统一资源定位符），它是URI下的一个子集。

网址是URL的一个俗称。大多数URL都建立在这个通用格式
```
<scheme>://<user>:<password>@<host>:<port>/<path>;<params>?<query>#<frgs>
```
![各个部分的介绍](ba70fe55/0.jpeg)

### ...未完待续

## 参考书目
* [HTTP权威指南](https://book.douban.com/subject/10746113/)


