---
title: 脚手架-cnr
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/frontend.jpg
abbrlink: 666a78c4
date: 2018-07-19 14:41:23
tags: 脚手架
keywords: cnr 
description: cnr, 全称create new repository 创建新的仓库。可以收藏喜欢的一些仓库，需要时一条命令进行下载。
---
![cnr Logo](666a78c4/cnr.png)

# cnr
create new repository. cnr is a tool to create a projects by an easy way.

# Installation
```
sudo npm install cnr -g
```
or
```
git clone https://github.com/ruizhengyun/cnr.git
cd cnr && npm install
npm link
```

# Usage
Open your terminal and type `cnr` or `cnr -h` , you'll see the help infomation below:
```
  Usage: cnr <command>

  Commands:
    create|c       Create a new repository powered by cnr-service
    remove|r       Remove the repository in repositories
    init|i         Init a new project powered by cnr-service
    list|l         List all repositories

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

> Note that if you are using `MacOS`, `sudo` was required while using commands `create` and `remove`.

# Commands
### create | c
This command would help you to create a new repository to the `lib/repositories/index.json`, which will be used by `cnr` to generate projects.
```
$ cnr create

? Make a name of the repository: use-github
? Tell me the url of the repository: github:ruizhengyun/use-github
? Make the branch of the repository: master
? Write something for repository: nothing
┌────────────┬───────────────────────────────┬────────┬──────────┬─────────────┐
│ repo-name  │ repo-url                      │ branch │ time     │ description │
├────────────┼───────────────────────────────┼────────┼──────────┤─────────────┤
│ use-github │ github:ruizhengyun/use-github │ master │ 18/07/19 │ nothing     │
└────────────┴───────────────────────────────┴────────┴──────────┴─────────────┘
✔ use-github repository has been created successfully!!
```
`cnr` use [download-git-repo](https://github.com/flipxfx/download-git-repo) to down load git repos. After answering 3 questions, you'll create a new repository to `cnr`.

### list | l
It shows you the repositories list.
```
$ cnr list
┌────────────┬───────────────────────────────┬────────┬──────────┬─────────────┐
│ repo-name  │ repo-url                      │ branch │ time     │ description │
├────────────┼───────────────────────────────┼────────┼──────────┤─────────────┤
│ use-github │ github:ruizhengyun/use-github │ master │ 18/07/19 │ nothing     │
└────────────┴───────────────────────────────┴────────┴──────────┴─────────────┘
```

### init | i
After creating a new repositories, you could use this command to generate your own project by choosing repository.
```
$ cnr init

? Tell me the repository name: use-github
? Make a name for your project: my-use-github
? Make the place for your project: ../
⠹ use-github repository is downloading now......

my-use-github project with use-github repository has been initialized successfully!
```

So easy!

### remove | r
To remove a repository, you could use this command:
```
$ cnr remove

? Tell me the repository name you want to remove: use-github
┌────────────┬───────────────────────────────┬────────┬──────────┬─────────────┐
│ repo-name  │ repo-url                      │ branch │ time     │ description │
├────────────┼───────────────────────────────┼────────┼──────────┤─────────────┤
└────────────┴───────────────────────────────┴────────┴──────────┴─────────────┘
✔ use-github repository has been removed successfully!
```

# repository
The most important part of cnr is `repository`. All repositories' infomation were list in the `lib/repositories/index.json`.
A repository means a project sample, which has a simple or complex file structure.

You can create your own repositories repository, and push your repositories in different branches. All you need to do then is to add the repositories into cnr's `lib/repositories/index.json`.

# License
MIT.