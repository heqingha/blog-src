---
title: 微信小程序开发(二)
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/2018/wx-sp.jpg
abbrlink: c08aaf2d
date: 2018-04-02 10:43:05
tags: 微信小程序
keywords: 微信小程序
description: 小程序开发准备工作
---
## 流程
* [注册小程序账号](https://mp.weixin.qq.com/ -> 小程序)
* 激活邮箱(pangrui2017@163.com -> 激活)
* 信息登录(江湖再见)
* 登录小程序管理后台(多人合作)
* 完善小程序信息
* 绑定开发者

## 工具
![工具下载](c08aaf2d/tool.png)
![开发界面](c08aaf2d/ide.png)
### 工具栏
* 编译
可自定义编译条件
* 远程调试
手机运行进行调试
* 切后台
切换不同场景
* 上传
把本地代码发送到管理后天
* ...

## 版本说明
* 预览版本
* 开发版本-体验版本
* 审核版本
* 线上版本

## 代码结构和基本配置
```r
├── app.js              # 脚本代码
├── app.json            # 全局配置
├── app.wxss            # 全局样式
├── project.config.json # 项目配置文件（个性化配置）
├── pages               # 小程序页面
│  ├── .js              # 页面逻辑和数据交互
│  ├── .json            # 页面配置信息
│  ├── .wxml            # 页面元素和内容(类似html)
│  └── .wxss            # 页面样式
├── util                # 工具函数集合
│  └── .js              # 工具函数(复用)
```

## app与page配置
`app`和`page`:
* navigationBarBackgroundColor
* navigationBarTextStyle
* navigationBarTitleText
* backgroundColor
* backgroundTextStyle
* onReachBottomDistance
* enablePullDownRefresh-下拉刷新表现

`app`:
* Pages-小程序所有页面
* tabBar-多标签
* networkTimeout-超时时间
* debug-调试模式
* navigationStyle-

`page`:
* disableScroll-是否开启滚动
页面与全局配置重复时，页面配置会覆盖全局配置。

## 官方教程
* [简易教程](https://developers.weixin.qq.com/miniprogram/dev/)
* [框架](https://developers.weixin.qq.com/miniprogram/dev/framework/MINA.html)
* [组件](https://developers.weixin.qq.com/miniprogram/dev/component/)
* [API](https://developers.weixin.qq.com/miniprogram/dev/api/)
* [工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html)
* [腾讯云支持](https://developers.weixin.qq.com/miniprogram/dev/qcloud/qcloud.html)