---
title: npm笔记（一）
author: 胖芮
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/about/'
authorAbout: 'http://www.ruizhengyun.cn'
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
photos: /img/2016/nodejs.jpg
abbrlink: 835b9ed3
date: 2017-06-29 13:09:05
tags: nodejs
keywords:
description:
---

## 什么是 NPM
npm之于Node，就像pip之于Python,gem之于Ruby,composer之于PHP，鱼之于水。

npm是Node官方提供的包管理工具，他已经成了Node包的标准发布平台，用于Node包的发布、传播、依赖控制。npm提供了命令行工具，使你可以方便地下载、安装、升级、删除包，也可以让你作为开发者发布并维护包。

## 为什么要使用 NPM
npm是随同Node一起安装的包管理工具，能解决Node代码部署上的很多问题，常见的场景有以下几种：
* 允许用户从npm服务器下载别人编写的第三方包到本地使用。
* 允许用户从npm服务器下载并安装别人编写的命令行程序到本地使用。
* 允许用户将自己编写的包或命令行程序上传到npm服务器供别人使用。

npm的背后，是基于CouchDB的一个数据库，详细记录了每个包的信息，包括作者、版本、依赖、授权信息等。

**作用就是：将开发者从繁琐的包管理工作（版本、依赖等）中解放出来，更加专注于功能的开发。**

## NPM安装
npm不需要单独安装。在安装Node的时候，会连带一起安装npm。但是，Node附带的npm可能不是最新版本，最后用下面的命令，更新到最新版本。
```
$ sudo npm install npm@latest -g
```
如果是 Window 系统使用以下命令即可：
```
npm install -g npm
```
也就是使用npm安装自己。之所以可以这样，是因为npm本身与Node的其他模块没有区别。

然后，运行下面的命令，查看各种信息。
```
// 查看 npm 命令列表
$ npm help
// 查看各个命令的简单用法
$ npm -l
// 查看 npm 的版本
$ npm -v
// 查看 npm 的配置
$ npm config list -l
```

## 使用
### npm init
npm init用来初始化生成一个新的package.json文件。它会向用户提问一系列问题，如果你觉得不用修改默认配置，一路回车就可以了。 如果使用了-f（代表force）、-y（代表yes），则跳过提问阶段，直接生成一个新的package.json文件。
```
$ npm init -y (-f)
```

### npm set
npm set用来设置环境变量
```
$ npm set init.author.name "jianghu"
$ npm set init.author.email "jobrzy@qq.com"
$ npm set init.author.url "https://github.com/ruizhengyun"
$ npm set init.license "MIT"
```
上面命令等于为npm init设置了默认值，以后执行npm init的时候，package.json的作者姓名、邮件、主页、许可证字段就会自动写入预设的值。这些信息会存放在用户主目录的~/.npmrc文件，使得用户不用每个项目都输入。如果某个项目有不同的设置，可以针对该项目运行npm config。

### npm info
npm info命令可以查看每个模块的具体信息。比如，查看underscore模块的信息。
```
$ npm info underscore
```
上面命令返回一个JavaScript对象，包含了underscore模块的详细信息。这个对象的每个成员，都可以直接从info命令查询。
```
$ npm info underscore description
$ npm info underscore homepage
$ npm info underscore files
```


### npm search
npm search命令用于搜索npm仓库，它后面可以跟字符串，也可以跟正则表达式。
```
$ npm search <搜索词>
```

### npm list
npm list命令以树形结构列出当前项目安装的所有模块，以及它们依赖的模块。
```
// 加上 global 参数，会列出全局安装的模块
$ npm list -global
// 命令也可以列出单个模块
$ npm list underscore
```


### npm install
使用npm安装包的命令格式为：
```
$ npm [install/i] [package_name]
```


## 本地模式和全局模式
npm在默认情况下会从NPM搜索或下载包，将包安装到当前目录的node_modules子目录下。

如果你熟悉Ruby的gem或者Python的pip，你会发现npm与它们的行为不同，gem或pip总是以全局模式安装，使包可以供所有的程序使用，而npm默认会把包安装到当前目录下。这反映了npm不同的设计哲学。如果把包安装到全局，可以提供程序的重复利用程度，避免同样的内容的多分副本，但坏处是难以处理不同的版本依赖。如果把包安装到当前目录，或者说本地，则不会有不同程序依赖不同版本的包的冲突问题，同时还减轻了包作者的API兼容性压力，但缺陷则是同一个包可能会被安装许多次。

我们在使用supervisor的时候使用了npm install -g supervisor命令，就是以全局模式安装supervisor。

这里注意一点的就是，supervisor必须安装到全局，如果你不安装到全局，错误命令会提示你安装到全局。如果不想安装到默认的全局，也可以自己修改全局路径到当前路径npm config set prefix “路径”安装完以后就可以用supervisor来启动服务了。supervisor可以帮助你实现这个功能，它会监视你对代码的驱动，并自动重启Node。

一般来说，全局安装只适用于工具模块，比如eslint和gulp。关于使用全局模式，多数时候并不是因为许多程序都有可能用到了它，为了减少多重副本而使用全局模式，而是因为本地模式不会注册PATH环境变量。 “本地安装”指的是将一个模块下载到当前项目的node_modules子目录，然后只有在项目目录之中，才能调用这个模块。

本地模式和全局模式的特点如下：

|模式|模式可通过 require|使用注册 PATH|
|:-|:-|:-|
|本地模式|是|否|
|全局模式|否|是|

```
// 本地安装
$ npm install
// 全局安装
$ sudo npm install -global
或 $ sudo npm install -g
```
npm install也支持直接输入Github代码库地址。

```
$ npm install git://github.com/package/path.git
$ npm install git://github.com/package/path.git#0.1.0
```

安装之前，npm install会先检查，node_modules目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。

如果你希望，一个模块不管是否安装过，npm都要强制重新安装，可以使用-f或–force参数。
```
$ npm install--force
```

## 安装不同版本
install命令总是安装模块的最新版本，如果要安装模块的特定版本，可以在模块名后面加上@和版本号。
```
$ npm install sax@latest
$ npm install sax@0.1.1
$ npm install sax@">=0.1.0 <0.2.0"
```

还记得查看模块的版本号么？复习下我们熟悉的jquery
```
$ npm info jquery versions
```

install命令可以使用不同参数，指定所安装的模块属于哪一种性质的依赖关系，即出现在packages.json文件的哪一项中。

* –save：模块名将被添加到 dependencies，可以简化为参数-S。
```
$ npm i jqeury --save
$ npm i jquery -S
```

* –save-dev：模块名将被添加到 devDependencies，可以简化为参数-D。
```
$ npm i jqeury --save-dev
$ npm i jquery -D
```

## dependencies 依赖
这个可以说是我们npm核心一项内容，依赖管理，这个对象里面的内容就是我们这个项目所依赖的js模块包。下面这段代码表示我们依赖了lodash这个包，版本是^4.17.4，代表最小依赖版本是4.17.4，如果这个包有更新，那么当我们使用npm install命令的时候，npm会帮我们下载最新的包。当别人引用我们这个包的时候，包内的依赖包也会被下载下来。
```
"dependencies": {
    "lodash": "^4.17.4"
}
```

devDependencies 开发依赖
在我们开发的时候会用到的一些包，只是在开发环境中需要用到，但是在别人引用我们包的时候，不会用到这些内容，放在devDependencies的包，在别人引用的时候不会被npm下载。
```
"devDependencies": {
    "autoprefixer": "^7.1.1",
    "babel-preset-es2015": "^6.24.1"
}
```

当你有了一个完整的package.json文件的时候，就可以让人一眼看出来，这个模块的基本信息，和这个模块所需要依赖的包。我们可以通过npm install就可以很方便的下载好这个模块所需要的包。

npm install默认会安装dependencies字段和devDependencies字段中的所有模块，如果使用–production参数，可以只安装dependencies字段的模块。
```
$ npm install --production
或
$ NODE_ENV=production npm install
```
一旦安装了某个模块，就可以在代码中用require命令加载这个模块。
test.js 文件
```
const lodash = require('lodash');
console.log('lodash version: ', lodash.VERSION);
```

进入
```
$ node test.js // lodash version:  4.17.4
```


## npm run
npm不仅可以用于模块管理，还可以用于执行脚本。package.json文件有一个scripts字段，可以用于指定脚本命令，供npm直接调用。package.json文件内容：
```
{
  "name": "npm-lesson",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts":{
      "lint": "jshint src/js/**.js",
      "test": "mocha test/"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ruizhengyun/npm-lesson.git"
  },
  "keywords": [],
  "author": "jianghu <jobrzy@163.com> (https://github.com/ruizhengyun)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/ruizhengyun/npm-lesson/issues"
  },
  "homepage": "https://github.com/ruizhengyun/npm-lesson#readme",
  "dependencies": {
    "lodash": "^4.17.4"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.1",
    "babel-preset-es2015": "^6.24.1"
  }
}
```


## scripts 脚本
顾名思义，就是一些脚本代码，可以通过npm run script-key来调用，例如在这个package.json的文件夹下使用npm run dev就相当于运行了node build/dev-server.js这一段代码。使用scripts的目的就是为了把一些要执行的代码合并到一起，使用 npm run 来快速的运行，方便省事。npm run是npm run-script的缩写，一般都使用前者，但是后者可以更好的反应这个命令的本质。

## …未完待续
