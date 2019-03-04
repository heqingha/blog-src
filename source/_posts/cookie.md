---
title: 顶级域名和二级域名间cookie共享、修改和删除
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/pangrui.jpg
abbrlink: 8d4cbf50
date: 2016-09-18 17:06:13
tags:
keywords:
description:
---

实操项目中总会碰到主域名和子域名间的共享、修改和删除，一起看看这几个场景吧

## 设置cookie

#### 顶级域名
顶级域名只能设置 `domain` 为顶级域名，不能设置为二级域名或三级域名等，否则 `cookie` 无法生成。

> 如 `example.com` 能设置 `domain` 为 `example.com` 或 `www.example.com`，但不能设置为 `login.example.com`

实例如下：
```javascript
setCookie('name1', 'example', time) // 私有，example.com自己能看到
setCookie('name2', 'example', time, '/', 'www.example.com') // *.www.example.com都可以看到
setCookie('name3', 'example', time, '/', 'example.com') // *.example.com都可以看到
setCookie('name4', 'example', time, '/', 'login.example.com') // 设置无效
```

1.访问 `www.example.com` 的 `cookie`情况如下：

| Name | Value | Domain | Path | Expires/Max-Age | Size | HTTP | Secure |
|:-|:-|:-|:-|:-|:-|:-|:-|
|name1|example|`www.example.com`|/|...|...|||
|name2|example|`.www.example.com`|/|...|...|||
|name3|example|`.example.com`|/|...|...|||

2.访问 `login.example.com` 的 `cookie` 情况如下：

| Name | Value | Domain | Path | Expires/Max-Age | Size | HTTP | Secure |
|:-|:-|:-|:-|:-|:-|:-|:-|
|name3|example|`.example.com`|/|...|...|||

总的来说，顶级域名设置的 `cookie` 可以共享（指定 `domain` 主域名的 `host`）给二级域名，也可以私有（不指定 `domain`）


#### 二级域名
还是以 `login.example.com` 为例，代码如下：

```javascript
setCookie('login', 'example') // 只有自己能看到
setCookie('login1', 'example', time, '/', 'example.com') // *.example.com都可以看到
setCookie('login2', 'example', '/', 'xxx.login.example.com') // 设置无效
```

1.访问 `login.example.com` 的 `cookie` 情况如下：

| Name | Value | Domain | Path | Expires/Max-Age | Size | HTTP | Secure |
|:-|:-|:-|:-|:-|:-|:-|:-|
|login|example|`login.example.com`|/|Session|...|||
|login1|example|`.example.com`|/|...|...|||
|name3|example|`.example.com`|/|...|...|||

> 总的来说，设置 `cookie` 只能在本域名或高于自身的域名下 **才会生效**。



## 读取cookie
通过设置 `cookie`的实操，可总结读取 `cookie` 规则如下：

#### 顶级域名
只可读取`domain` **顶级域名`cookie`**。

#### 二级域名
只可读取`domain` **自身`cookie`和顶级域名`cookie`**，不可读取 **其他二级域名的`cookie`**。所以若是 `cookie` 在多个二级域名下共享，只能设置 `domain`为 **顶级域名**。


## 修改cookie
#### 顶级域名
顶级域名的`cookie`在顶级域名或者非顶级域名【需要设置`domain`为 **顶级域名**才可以】都可以修改。代码如下：
```javascript
// 为所有二级域名设置一个cookie
setCookie('name', 'example', time, '/', 'example.com')
// 在login.example.com下面修改这个cookie值
setCookie('name', 'exampleUpdate', time, '/', 'example.com')
```

#### 二级域名
修改二级域名自身生成的`cookie`不需要设置`domain`，直接设置即可。
```javascript
setCookie('login', 'example', time)
```

## 删除域名
删除`cookie`理解为是修改`cookie`的一种特殊场景，只需将`expire`设置为过期、值设置为`null`即可，代码如下：

#### 顶级域名
```javascript
setCookie('name', null, time, '/', 'example.com')
```

#### 二级域名
```javascript
setCookie('login', null, time)
```