---
title: 性能之网络（一）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
keywords: 网络
description: 网络
photos: /img/pangrui.jpg
abbrlink: 5373596e
date: 2018-10-01 15:37:52
tags:
- 性能
---

## DNS预解析
DNS Prefetch，即DNS预解析，是前端优化的一部分。
一般来说，在前端优化中与 DNS 有关的有两点： **一个是减少DNS的请求次数，另一个就是进行DNS预解析** 。
预解析是预先获得域名所对应的 IP。

```html
<link rel="dns-prefetch" href="//ruizhengyun.cn" />
```

## 缓存
良好的缓存策略可以降低资源的重复加载提高网页的整体加载速度。

#### 1.强缓存
通过两种响应头实现：`Expires` 和 `Cache-Control` 。强缓存表示在缓存期间不需要请求，`state code` 为 200

```javascript
Expires: Wed, 27 Oct 2018 08:41:00 GMT
```
`Expires` 是 HTTP / 1.0 的产物，表示资源会在 `Wed, 27 Oct 2018 08:41:00 GMT` 后过期，需要再次请求。
注意 `Expires` 是受限于**本地时间**的，也就是说修改了本地时间，可能会造成缓存**失效**。

```javascript
Cache-control: max-age=30
```

`Cache-Control` 出现于 `HTTP / 1.1`，**优先级高于** `Expires` 。该属性表示资源会在 `30` 秒后过期，需要再次请求。


#### 2.协商缓存

## 缓存策略

## HTTP/2.0

## 预加载

## 与渲染


1.数据接口平台