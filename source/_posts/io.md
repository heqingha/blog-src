---
title: IO中的阻塞、非阻塞、同步、异步
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
keywords: 阻塞,非阻塞,同步,异步
description: 阻塞,非阻塞,同步,异步
photos: /img/pangrui.jpg
abbrlink: bd6f9a7a
date: 2018-12-07 13:47:27
tags:
- javascript
---

提到阻塞、非阻塞、同步和异步就离不开IO（输入输出）。

## 同步和异步
是针对【被调用方】的执行方式和返回时机。

- 同步是被调用方做完事后再返回。A调用B，B开始处理，处理完之前不通知A。（A不知道B什么情况，不放心）
- 异步是被调用方先返回，然后做事，做完事再通知调用方。A调用B，B收到请求后通知A我收到请求了，然后做事，处理完后通过回调等方式再通知A。（A高兴啊，一切都在A掌控下）

## 阻塞和非阻塞
在被调用方返回结果之前的这段时间，【调用方】是否一直等待。

- 阻塞是调用方发送请求后一直等待被调用方返回结果。
- 非阻塞是调用方发送请求后继续做别的事。


综上，同步和异步与阻塞和非阻塞是以组合场景的方式出现的。比如：同步场景的阻塞与非阻塞、异步场景的阻塞与非阻塞。不知你可有明白?