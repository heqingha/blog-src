---
title: DNS：为什么很重要&是如何工作的
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
tags: http
abbrlink: 486d6ee2
date: 2018-03-18 15:03:53
---
没看过《图解HTTP》的可以稍微过一下，属于基础篇。

域名系统(又称 DNS)被用来解析像 `www.ruizhengyun.cn` 这样的可读主机名, 将其转换为机器可读的 IP 地址, 如192.30.252.153。 DNS 还提供关于域名的其他信息, 例如邮件服务。

但是为什么 DNS 这么重要呢？ 它是如何工作的？ 你还应该知道什么？
<!--more-->
## 为什么 DNS 是重要的？
就像是互联网上的电话簿。 如果你知道一个人的名字但不知道他的电话号码, 你可以直接在电话簿上查查。 DNS为互联网提供了同样的服务。

当你访问 ``http://ruizhengyun.cn` 时, 你的电脑使用 DNS 检索网站的 IP 地址`192.30.252.153`。 如果没有 DNS, 你只能直接访问我们的网站(或任何网站) , 比如 `http://192.30.252.153`。

## DNS 是如何工作的？
当你访问像 `ruizhengyun.cn` 这样的域名时, 你的电脑会遵循一系列步骤, 将人可读的网址转化为机器可读的 IP 地址。 每次你使用域名时都会发生这种情况, 无论你是在浏览网站, 发送电子邮件, 还是听 `Pandora` 这样的网络电台。
![如何工作的](486d6ee2/1.jpeg)

* 1、请求信息
一开始当你要求计算机解析一个主机名, 例如访问 `http://ruizhengyun.cn`。 你的电脑首先看到的是它的本地 DNS 缓存, 该缓存存储计算机最近检索到的信息。如果你的计算机还是不知道答案, 那就需要执行一个 DNS 查询来找出答案。

* 2、询问递归式 DNS服务器
如果信息不存储在本地, 计算机联系您的 ISP（网络服务提供商） 的递归 DNS 服务器。 这些专用计算机为你执行一个DNS查询工作。 递归服务器有它们自己的缓存, 所以这个过程通常在这里完成, 并将信息被返回给用户。

* 3、询问根域名服务器
如果递归服务器没有答案, 他们就会查询根域名服务器。 根域名服务器是一种计算机，它可以回答相关域名的问题, 如 IP 地址。 13个根域名服务器扮演着一种 DNS 的电话接线员的角色。 他们不知道答案, 但可以将我们的疑问指向知道在哪里可以找到答案的人。

* 4、询问 TLD 域名服务器
根域名服务器将查看请求的第一部分, 按从右到左的顺序，从`www.ruizhengyun.cn`找到.cn, 并将请求指向.cn对应的顶级域服务器(TLD)`.cn`. 每个TLD, 例如`.cn，.org, .us`，拥有自己的顶级域名服务器, 就像每个 TLD 的接线员。 这些服务器没有我们需要的信息, 但是他们可以直接将我们引导到有信息的服务器。

* 5、询问权威的 DNS 服务器
TLD域名服务器会继续检查请求的下一部分（ruizhengyun）`www.ruizhengyun.cn`, 并将查询指向负责此特定域名的服务器。 这些权威的服务器将负责了解关于特定域的所有信息, 并将信息存储在 DNS 记录中。 有许多类型的记录, 每种记录都包含一种不同的信息。 在这个例子中, 我们想知道 `www.ruizhengyundns.cn` 的 IP 地址, 因此我们请求权威的域名服务器记录(a)。

* 6、找回记录
递归服务器从权威服务器中检索 `ruizhengyun.cn` 的记录, 并将记录存储在本地缓存中。 如果其他任何人请求 `ruizhengyun.cn` 的主机记录, 递归服务器将已经有了答案, 并且不需要再次进行查找。 所有的记录都有一个时间到现场的价值, 这就像一个过期日期。 一段时间后, 递归服务器将需要要求一个新的记录副本, 以确保信息不会过时。

* 7、接受答案
有了这个答案, 递归服务器将记录返回到计算机。 您的计算机将记录存储在其缓存中, 从记录中读取 IP 地址, 然后将这些信息传递给浏览器。 然后浏览器打开一个连接到网络服务器并接收网站。

整个过程, 从开始到结束, 只需要几毫秒就能完成。
