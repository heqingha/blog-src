---
title: 免费搭博客之hexo(一)
author: 胖芮
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn'
authorAbout: 'http://www.ruizhengyun.cn'
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 学习
abbrlink: 6081e90e
date: 2014-07-01 13:35:12
tags: 博客
keywords:
description: 如果你在前进过程中学会了回头，那么你会看到更多东西。挤出更多的时间去记录和总结，在需要的时候进行补充和修改，会让问题在你的记忆里愈加深刻。今后遇到更难的问题的时候能够打开思路，或者说有更大的概率去解决。
photos: 
- /img/2014/hexo-blog.jpg
---


## 为什么要写博客？Why write a blog?
* 记录工作生活中的心得和体会。
如果你在前进过程中学会了回头，那么你会看到更多东西。挤出更多的时间去记录和总结，在需要的时候进行补充和修改，会让问题在你的记忆里愈加深刻。今后遇到更难的问题的时候能够打开思路，或者说有更大的概率去解决。

<!-- more -->
* 分享精神。 
如果说国内的程序员能够有更多的分享精神，那么整个行业的氛围就会受到影响，大家共同的探讨，解决能够相互帮助从而解决更多问题，毕竟一个人的能力是有限的，擅长的方面也各不一样。

* 一次很好的提升机会。 
平时解决问题的时候可能考虑进度问题没有更深刻地去理解，但是在写博客的时候，你会不知不觉中对一些内容进行思考，并有可能和评论者一起深入，这些都是难得的机会。同事也提升了文字组织能力和逻辑思维能力。



## 开始搭建之hexo
Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

```
$ npm install hexo-cli -g
$ hexo init blog
$ cd blog
$ npm install
$ hexo server
```

### 目录
```
.
├─ _config.yml      # 网站的配置信息
├─ package.json     # 应用程序的信息
├─ scaffolds/       # 模版文件夹
├─ source/          # 资源文件夹是存放用户资源的地方
│   ├─ _post/       # 文章内容
├─ db.json          # source解析所得到的
├── themes/         # 主题文件夹
├── public          # 存放的是生成的页面
├── .deploy_git     # 部署后Markdown 和 HTML 文件
├── node_modules    # 依赖包

```

#### 配置文件(_config.yml)
```
// 部署
deploy:
  type: git
  repo: https://github.com/yourGithubName/yourGithubName.github.io
  branch: master
  message: 部署成功了，赶紧看看吧
```
* 需要在你的github上建个仓库，其名是yourGithubName.github.io
* 安装`$ npm install hexo-deployer-git -S(--save)`


#### 命令
又叫指令。其实这些在hexo官网都有，列出来方便查找

1、init(新建一个网站)
```
$ hexo init [folder]
```

2、new(新建一篇文章)
```
$ hexo new [layout] <title>
```

3、generate(生成静态文件)
```
$ hexo generate
// 简写
$ hexo g
// 文件生成后立即部署网站
$ hexo g -d(--deploy)
$ hexo d --generate
// 监视文件变动
$ hexo g -w(--watch)
```

4、publish(发表草稿)
```
$ hexo publish [layout] <filename>
```

5、server(启动服务器)
```
$ hexo server
// 简写
$ hexo s
// 重设端口
$ hexo s -p(--port)	
// 只使用静态文件
$ hexo s -s(--static)
// 启动日记记录，使用覆盖记录格式	
$ hexo s -l(--log)	
```
* Hexo 3.0 把服务器独立成了个别模块，请安装`$ npm install hexo-server -S(--save)`

6、clean(清除缓存文件 (db.json) 和已生成的静态文件 (public))
```
$ hexo clean
```

7.list(列出网站资料)
```
// type => page, post, route, tag, category
$ hexo list <type>
```



## 相关链接
* [hexo](https://hexo.io)
* [主题next](http://theme-next.iissnan.com/)