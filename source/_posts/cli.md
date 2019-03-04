---
title: 如何构建cli工具
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/frontend.jpg
abbrlink: 3e7ad64a
date: 2017-04-04 09:43:14
tags: 脚手架
keywords: cli
description:
---
## 前言
CLI，command-line interface，命令行交互界面（接口），可在用户提示符下键入可执行指令的界面，它通常不支持鼠标，用户通过键盘输入指令，计算机接收到指令后，予以执行。

无论是在前端还是后端，都可以用于在构建时通过命令快速生成项目或模板等。例如前端的vue-cli（Vue前端开发脚手架），后端的dva-cli（Ant Design后端开发脚手架）等.

## 常用 npm 包
- [ntl]   通过选择的方式执行项目中 `package.json` 中 `scripts` 命令。
- [nud]   查看某个作者最近一个月node包下载情况 `nud author last-month --limit=10`
- [nrm]   镜像源管理工具，实测 `taobao > cnpm > npm`
- [n]     node 版本管理



## 列举

```javascript
npm ls -g --depth 0 // 列举node全局包
open /usr/local/lib/node_modules/ // 全局包安装位置
```

## 需求
构建CLI工具，项目开发时可以快速生成自己需要的代码模板。去除重复工作，并且还可以为其他的开发者提供快速入门。
- 通过执行命令，自动生成项目代码模板
- 项目代码模板可以自定义编辑
- CLI可以通过软件包形式分发，其他开发者可以简单使用


## 开发 -with nodejs
- 获得用户的输入，并且根据相应的输入，可以定制编程相应执行逻辑
- 模板代码有两种实现思路，一是采用代码生成，二是分离静态资源模板
- 使用包管理工具


## 常用包依赖
|模块名| 作者 | 描述 |
|:-   |:-   |:-|
|[commander](https://github.com/tj/commander.js) |tjholowaychuk|命令行工具|
|[chalk](https://www.npmjs.com/package/chalk)|sindresorhus|命令行彩色输出|
|[moment](https://www.npmjs.com/package/moment)|timrwood|日期时间输出|
|...| | | |


## 目录
```javascript
cli
├── bin
│   └── cli.js
├── lib
|   ├── utils
|       └── index.js
|   ├── command-a.js
|   └── command-b.js
├── .gitignore
├── node_modules
├── LICENSE
├── package.json
└── README.md
```

## npm报错解决方案
- 删掉项目中的 `package.json`文件 和 `node_modules`，然后重新 `npm install`;
- 运行 `npm cache clean --force` 或 `npm cache verify`，然后 `npm install`;
- 升级 `npm i -g npm` 或者通过node包【n】来管理node版本
