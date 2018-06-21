---
title: 免费搭博客之hexo(二)
author: 胖芮
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn'
authorAbout: 'http://www.ruizhengyun.cn'
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 学习
abbrlink: ee710e43
date: 2014-07-02 15:35:12
tags: 博客
keywords:
description: 因为Hexo个人博客是托管在github之上，每次访问都要使用githubname.github.io这么一个长串的域名来访问，会显得非常繁琐。这个时候我们可以购买一个域名，设置DNS跳转，以达到通过域名即可访问我们的个人博客。通过查阅文档发现，github pages是支持域名绑定的。
photos: 
- /img/2014/hexo-blog.jpg
---

## 摘要
因为Hexo个人博客是托管在github之上，每次访问都要使用githubname.github.io这么一个长串的域名来访问，会显得非常繁琐。这个时候我们可以购买一个域名，设置DNS跳转，以达到通过域名即可访问我们的个人博客。通过查阅文档发现，github pages是支持域名绑定的。


## 购买域名
国内国外有很多的域名供应商，选择一个好的机构购买域名，会为自己的站点配置节约很多时间，也不会因为域名的出错，导致影响百度对我们个人博客的收录。近几年来，国内做的比较好的域名供应商有阿里的 *[万网](https://wanwang.aliyun.com/)*。 我就是在阿里的万网购买的域名。通过查找，找到自己喜欢的域名，后来为了解决成本，我选了.cn结尾的域名，10年只需要百来块钱，很便宜（当时有活动，以身份证名字作为域名），建议如果只是作为自己的博客使用建议不要购买.com的域名。(***注意：购买.cn域名之后，大概6个小时之内就会生效，5之内必须对域名进行认证，超过5天没有认证域名将会被锁定。***)

## 域名解析
<!-- more -->
### 登录进入万网，点击“控制台“，点击"域名与网站（万网）"中的"云解析DNS"，然后点击对应域名的"解析"
![blog-hexo](ee710e43/1.png)

![blog-hexo](ee710e43/2.png)

### 点击添加解析，记录类型选 `A或CNAME`，A记录的记录值就是 `ip地址`，github(官方文档)提供了两个IP地址，`192.30.252.153和192.30.252.154`，这两个IP地址为*github的服务器地址*，两个都要填上，解析记录 *设置两个www和@*，线路就默认就行了，CNAME记录值填你的github博客网址。如我的是 `ruizhengyun.github.io`。
![blog-hexo](ee710e43/3.png)

这些全部设置完成后，此时你并不能要申请的域名访问你的博客。接着你需要做的是在hexo根目录的 `source文件夹` 里创建 `CNAME文件`，不带任何后缀，里面添加你的域名信息，如：`ruizhengyun.cn`。实践证明如果此时你填写的是 `www.ruizhengyun.cn` 那么以后你只能用 `www.ruizhengyun.cn` 访问，而如果你填写的是 `ruizhengyun.cn`。那么用 `www.ruizhengyun.cn` 和 `ruizhengyun.cn` 访问都是可以的。重新清理hexo,并发布即可用新的域名访问。


## 搭建完成访问出现404 可能的原因是：
* 绑定了个人域名，但是域名解析错误。
* 域名解析正确但你的域名是通过国内注册商注册的，你的域名因没有实名制而无法访问。
* 你认为配置没有问题，那么可能只是你的浏览器在捣鬼，可尝试清除浏览器缓存再访问或者换个浏览器访问。
* 也有可能是你的路由器缓存导致的错觉，所以也可以尝试换个局域网访问你的网站。
* 最有可能的原因是你下载的hexo有问题，导致所有的东西都上传到了github,而导致index页面在主域名的下一级目录。你可以尝试查看上传的内容，找到index页面，在域名后面添加下一级目录。若能访问index页面（此时样式可能是乱的），则证明是hexo安装有问题，笔者当时遇到的就是这个问题。可卸载重新安装。
* 1，2默认你的CNAME文件配置没有问题，如果没有绑定个人域名，则不需要 `CNAME文件`。