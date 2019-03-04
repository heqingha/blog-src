---
title: 前端安全
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
keywords: XSS,CSRF,密码安全
description: XSS,CSRF,密码安全
photos: /img/pangrui.jpg
abbrlink: a6fa22b1
date: 2019-01-03 18:31:57
tags:
- 安全
---
## XSS
> 跨站指令码（Cross-site Scripting，简称XSS）是一种网站应用程式的安全漏洞攻击，是 **代码注入** 的一种。它允许恶意使用者将程式码注入网页上，其他使用者在观看网页时就会收到影响。这类攻击通常包含HTML以及使用者端脚本语言。

XSS分为3种：反射型，存储型和DOM-based。

#### 1.如何攻击
XSS通过修改HTML节点或者执行JS代码来攻击网站。
1.1反射型攻击或DOM-based攻击

```javascript
// url: http://www.domain.com?name=<script>alert(1)</script>
<div class="name">{{name}}</div>
```
上述url中可能会改为`<div class="name"><script>alert(1)</script></div>`，页面中就多了一段可执行的脚本。这种类型的攻击称为**反射型**攻击，也可以说是**DOM-based**攻击。

1.2存储型攻击或DOM-based攻击
比如一篇文章中含有`<script>alert(1)</script>`，那么浏览这篇文章的用户都会被攻击到。这种类型称为**存储型**攻击，也可以说是**DOM-based**攻击。


#### 2.如何防御
常见做法就是**转义输入输出的内容**，对于**引号、尖括号、斜杠等**进行转义。

```javascript
function escape(str) {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/"/g, '&quto;');
  str = str.replace(/'/g, '&#39;');
  str = str.replace(/`/g, '&#96;');
  str = str.replace(/\//g, '&@x2F;');
  return str;
}
```

这样上面攻击代码就会转为

```javascript
escape('<script>alert(1);</script>');
// &lt;script&gt;alert(1);&lt;&#x2F;script&gt;
```

看上去那么完美，但是...对于富文本来说，就不能这么做了，因为这样会吧需要的格式也过滤掉了，这可不是我们所希望的。这种情况下，采用**白名单**过滤（也可以通过**黑名单**过滤）的方法，考虑到需要过滤**标签和标签属性**的数量，还是推荐**白名单**来过滤。

```javascript
var xss = require('xss');
var str = '<h1 id="title">XSS防御</h1><script>alert(1);</script>'
var html = xss(str);
console.log(html); // <h1>XSS防御</h1>&lt;script&gt;alert(1);&lt;/script&gt;
```

上面使用了[`jsxss`](https://jsxss.com/zh/index.html)来实现，结果是标签`h1`保留，标签`script`过滤。

#### 3.CSP
> 内容安全策略（CSP）是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本（XSS）和数据注入攻击等。无论是数据盗取、网站内容污染还是散发恶意软件，这些攻击都是主要的手段。

可以通过CSP来尽量减少XSS攻击。CSP本质上也是建立白名单，规定了浏览器只是能够执行特定来源的代码。

通常可通过HTTP Header中的`Content-Security-Policy`来开启CSP。

- 只允许加载本站资源

```javascript
Content-Security-Policy: default-src 'self'
```

- 只允许加载HTTPS协议图片

```javascript
Content-Security-Policy: img-src https://*
```

- 允许加载任何来源框架

```javascript
Content-Security-Policy: child-src 'none'
```


## CSRF
> 跨站请求伪造（Cross-site request Forgery）,也称为one-click attack或session riding，通常缩写为CSRF或XSRF，是一种挟制用户在当前已登录的web应用程序上执行非本意的操作攻击方法。和上面XSS（跨站指令码）相比，XSS利用的是用户对指定网站的信任，CSRF利用的是网站对用户网页浏览器的信任。

简单来说，CSRF就是利用用户的登录状态发起恶意请求。

#### 1.如何攻击
有个通过`GET`请求提交用户评论的接口，那么攻击者就可以在钓鱼网站中加入一个图片，图片地址就是这个评论接口

```html
<img src="http://www.domain.com/xxx?comment='attack'" />
```

如果请求方式是`POST`，那就相对麻烦点，需要用表单来提交

```html
<form action="http://www.domian.com/xxx" id="CSRF" method="post">
  <input name="comment" value="attack" type="hidden" />
</form>
```

#### 2.如何防御
- `GET`请求不对数据进行修改；
- 不让第三方网站访问到用户`Cookie`;
- 阻止第三方网站请求接口；
- 请求时附带验证信息，比如**验证码或`token`**;

2.1 SameSite
可以对`Cookie`设置`SameSite`属性。该属性设置`Cookie`不随跨域请求发送，该属性可以很大程度减少`CSRF`的攻击，但是该属性目前不是被所有浏览器所兼容。

2.2 验证Referer
可通过验证`Referer`来判断该请求是否为第三方网站发起的。

2.3 Token
服务器下发一个随机`Token`，每次发起请求时将Token携带上，服务器验证`Token`是否有效。


## 密码安全
虽说这块是后端的事情，但是对于一名优秀的前端也要熟悉这块知识。

#### 1.加盐
对于密码存储来说，必然不能明文存储在数据库中，否则一旦数据库泄露，会对用户造成很大的损失，并且**不建议只对密码单纯通过加密算法加密**，因为存在**[彩虹表的关系](https://baike.baidu.com/item/%E5%BD%A9%E8%99%B9%E8%A1%A8/689313?fr=aladdin)**。

通常需要对密码加盐，然后进行几次不同加密算法的加密。

```javascript
// 加盐简单来说就是给原密码添加字符串，增加原密码的长度
sha256(sha1(md5(salt + password + salt)));
```

看似完美，但是并不能阻止别人盗取账号，只能确保**即使数据库泄露**，也不会暴露用户的真实密码。一旦攻击者得到用户的账号，可通过暴力破解的方式破解密码。

对于这种暴力破解的情况，通常**使用验证码增加延迟或限制尝试次数的方式**，并且用户一旦输入了错误密码，也不能直接提示用户输错密码，而应该提示**账号或密码错误**（原来觉得这种交互不精确，现在明白了）。


## 资料参考
- [jsxss](https://jsxss.com/zh/index.html)
- [Content-Security-Policy](https://content-security-policy.com/)
- [彩虹表的关系](https://baike.baidu.com/item/%E5%BD%A9%E8%99%B9%E8%A1%A8/689313?fr=aladdin)


