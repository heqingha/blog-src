---
title: 什么是跨域？跨域请求资源的方法有哪些？
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
tags: 面试
abbrlink: '173679e0'
date: 2015-01-11 19:29:52
---
# 什么是跨域？
由于浏览器同源策略，凡是发送请求url的**协议、域名、端口**三者之间任意一个与当前页面地址不同即为跨域。
存在跨域的情况：
* 网络协议不同，如http协议访问https协议。
* 端口不同，如80端口访问8080端口。
* 域名不同，如qianduanblog.com访问baidu.com。
* 子域名不同，如abc.qianduanblog.com访问def.qianduanblog.com。
* 域名和域名对应ip,如www.a.com访问20.205.28.90。


<!--more-->
# 跨域请求资源的方法
## porxy代理
* 定义和用法
proxy代理用于将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给后端。
* 实现方法
通过nginx代理
* 注意点
如果你代理的是https协议的请求，那么你的proxy首先需要信任该证书（尤其是自定义证书）或者忽略证书检查，否则你的请求无法成功。

## CORS-Cross Origin Resource Sharing 跨源资源共享
* 定义和用法
是现代浏览器支持跨域资源请求的一种最常用的方式。
* 使用方法
一般需要后端人员在处理请求数据的时候，添加允许跨域的相关操作。如下：
```
res.writeHead(200, {
    "Content-Type": "text/html; charset=UTF-8",
    "Access-Control-Allow-Origin":'http://localhost',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'
});
```

## Jsonp
* 定义和用法 
通过动态插入一个`script`标签。浏览器对script的资源引用没有同源限制，同时资源加载到页面后会立即执行（没有阻塞的情况下）。
* 特点
通过情况下，通过动态创建`script`来读取他域的动态资源，获取的数据一般为`json`格式。
* 实例
```
<script>
    function testjsonp(data) {
       console.log(data.name); // 获取返回的结果
    }
</script>
<script>
    var _script = document.createElement('script');
    _script.type = "text/javascript";
    _script.src = "http://localhost:8888/jsonp?callback=testjsonp";
    document.head.appendChild(_script);
</script>
```
* 缺点
1、这种方式无法发送`post`请求（这里）
2、另外要确定`jsonp`的请求是否失败并不容易，大多数框架的实现都是结合超时时间来判定。