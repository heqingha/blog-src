---
title: node 调试入门
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
keywords: node-debug-01
description: Inspetor 调试 nodejs 优势、演示、Inspector 的构成以及原理、如何激活调试、调试客户端
photos: /img/pangrui.jpg
abbrlink: ae0f25e1
date: 2019-02-20 16:26:37
tags:
---

## Inspetor 调试 nodejs 优势
- 可查看当前上下文的变量
- 可观察当前函数调用堆栈
- 不侵入代码
- 可在暂停状态下执行指定代码

## 演示
1.新建文件目录，进入编写环境
```node
mkdir node-debug
code node-debug # code 是 vscode 自带全局变量，ctrl+shif+p 安装 code 命令
```

2.新建调试文件 `01.js`
```javascript
var a = 0;

function fn1(num) {
  var a1 = 10;
  num += a1;
}

function fn2(){
  fn1(a);
}

fn2();
```

3.打个断点，F5 进入调试阶段
在**进入调试控制台**，复制 Websocket 地址（含端口），在浏览器端访问，去掉 ws:// 协议，然后在后面加上 json


## Inspector 的构成以及原理
- WebSockets服务（监听命令）
- Inspectpr 协议
- HTTP协议（元信息）


## 如何激活调试
```node
node --inspect app.js
node --inspect-brk app.js
```

## 调试客户端
- Chrome DevTools 55+
- VS Code
- 其他

#### Chrome DevTools
- 访问 chorme://inspect，点击配置按钮，确保 Host 和 Port 对应
- 访问元信息中的 devtoolsFrontendUrl
- 点击绿色小图标

#### VS Code
1.启动方式：F5
2.配置 launch.json
3.调试动作
4.数据展现
5.Log Point
6.REPL