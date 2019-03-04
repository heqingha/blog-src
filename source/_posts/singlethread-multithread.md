---
title: 单线程和多线程区别
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about/'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
tags:
  - 进程
  - 线程
abbrlink: 84befb94
date: 2013-01-20 09:37:16
---

## 概念 
* 程序：由源代码生成的可执行的应用（例如：QQ-app）
* 进程：一个正在运行的程序可以看做一个进程（例如：正在运行的QQ），进程拥有独立运行所需要的全部资源
* 线程：程序中独立运行的代码段（例如：接收QQ消息的代码）
<!-- more -->
## 归总
* 一个进程是由于1或n个线程组成，进程只负责资源的调度和分配
* 线程是被调度和分配的，是程序真正的执行单元，负责代码的执行

## 单线程
每个正在运行的程序（即进程），至少包括一个线程，这个线程叫主线程。
主线程在程序启动时被创建，用于执行main函数
只有一个主线程的程序，称作单线程程序
主线程负责执行程序的所有代码（UI展现以及刷新、网络请求、本地存储等）。这些代码只能顺序执行，无法并行执行。

## 多线程
拥有多个线程的程序，称作为多线程
IOS允许用户开辟新的线程，相对于主线程来讲，这些线程，成为子线程
可以根据需要开辟若干子线程
子线程和主线程都是独立的运行单元，各自的执行互不影响，因此能够并发执行

## 单线程和多线程的区别
* 单线程：只有一个线程（主线程），代码顺序执行，容易出现代码阻塞（页面假死）
* 多线程：有多个线程，线程间独立运行，能有效地避免代码阻塞，并且提高程序的运行性能
注意：IOS中关于UI的添加和刷新必须在主线程中操作