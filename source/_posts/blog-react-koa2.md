---
title: 前后端分离搭建博客之koa2实现后端接口
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
keywords: blog-react-koa2
description: blog-react-koa2
photos: /img/pangrui.jpg
abbrlink: 348007d5
date: 2018-12-13 10:14:42
tags:
---

## 项目搭建
1.全局安装koa-generator
```javascript
sudo npm install koa-generator -g
```

2.生成项目
```javascript
koa2 koa2-project
```

3.安装依赖包
```javascript
cd koa2-project
npm install
```

4.启动服务
```javascript
npm start
```
打开浏览器：http://localhost:3000/ 就会看到“Hello Koa2!”，nice！！！


## 了解koa2的核心对象(v2.2.0)
- **Application**：服务类（248行代码）。
  - 创建对象
  - 传入中间件 (use(fn)) 
  - 生成一个HTTP服务器 (const Server = http.crateServer(this.callback()))
  - 处理响应 (handleRequest)
  - 返回实例
- [**Context**：上下文（242行代码）](https://github.com/demopark/koa-docs-Zh-CN/blob/master/api/context.md)
- [**Request**：请求对象（727行代码）](https://github.com/demopark/koa-docs-Zh-CN/blob/master/api/request.md)
- [**Response**：响应对象（558行代码）](https://github.com/demopark/koa-docs-Zh-CN/blob/master/api/response.md)
- [**Middleware**：中间件（自己添加的）](https://github.com/demopark/koa-docs-Zh-CN#%E4%B8%AD%E9%97%B4%E4%BB%B6)


## 安装和配置Sequelize
[Sequelize Doc 中文版](https://github.com/demopark/sequelize-docs-Zh-CN)

Sequelize是一个基于promise的nodejs ORM，目前支持postGres、MySQL、SQLite和SQL Server。具有强大的事务支持、关联支持、读取和复制等功能。

1.安装sequelize、mysql、mysql2
```javascript
npm install sequelize -S
npm install mysql mysql2 -S
```
mysql2是mysql的模块扩展，更加人性化（后期单独拿出来讲）

2.根目录下新建文件夹`config`，在`config`下创建`db.js`文件，用来连接`mysql`的信息。
```javascript
// 配置Sequelize
import Sequelize from 'sequelize';

const db = {
  "dbName": "stack",         // 数据库名字
  "userName": "root",        // 本地数据库用户名
  "password":"ruizhengyun",  // 本地数据库密码
  "dialect": 'mysql',
  "host": "",
  "port": 3306,
  "ssl": false,
  "timezone": "+08:00"
};

const sequelize = new Sequelize(db.dbName, db.userName, db.password, {
  host: db.host,
  dialect: db.dialect,
  protocol: db.dialect,
  port: db.port,
  // 字段以下划线（_）来分割（默认是驼峰命名风格）
  // underscored: true,
  dialectOptions: {
    // 字符集
    ssl: db.ssl
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: db.timezone // 东八区
});

module.exports = sequelize;
```

## 梳理项目结构
新增文件夹：`schema(数据表模型)、modules(模型)、controllers(控制器)`，以文章接口为例：
```
├── schema
    └── article.js
└── modules
    └── article.js
└── controllers
    └── article.js
```

1.数据表模型`schema/article.js`

```javascript
import moment from 'moment';
import Sequelize from 'sequelize';
import sequelizeConfig from '../config/db';

const Article = sequelizeConfig.define('article', {
  id: { 
    type: Sequelize.INTEGER(11),
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
    comment: '文章id'
  },
  authorId: { 
    type: Sequelize.INTEGER(11),
    allowNull: false,
    field: 'authorId',
    comment: '作者id'
  },
  authorName: { 
    type: Sequelize.STRING(55),
    allowNull: false,
    field: 'authorName',
    comment: '作者'
  },
  title: { 
    type: Sequelize.STRING(55),
    allowNull: false,
    field: 'title',
    comment: '标题'
  }, 
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    field: 'content',
    comment: '内容'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    field: 'description',
    comment: '摘要'
  },
  // 分类
  category: {
    type: Sequelize.STRING(55),
    allowNull: false,
    defaultValue: '',
    field: 'category',
    comment: '分类'
  },
  tag: {
    type: Sequelize.JSON,
    allowNull: false,
    defaultValue: '',
    field: 'tag',
    comment: '标签'
  },
  pv: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 0,
    field: 'pv',
    comment: '浏览次数'
  },
  zan: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 0,
    field: 'zan',
    comment: '赞'
  },
  attention: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 0,
    field: 'attention',
    comment: '关注'
  },
  replyCount: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 0,
    field: 'replyCount',
    comment: '回复数'
  },
  allowComment: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 1,
    field: 'allowComment',
    comment: '是否允许评论'
  },
  isPublic: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 1,
    field: 'isPublic',
    comment: "是否公开"
  },
  isTop: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 0,
    field: 'isTop',
    comment: '是否置顶'
  },
  createdAt: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue('createdAt')).format('YYYY/MM/DD HH:mm');
    },
    comment: '创作时间'
  },
  updatedAt: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY/MM/DD HH:mm');
    },
    comment: '更新时间'
  }
}, {
  // true 则表的名称和 model 相同，即 user
  // false MySQL创建的表名称会是复数 users
  // 如果指定的表名称本就是复数形式则不变
  freezeTableName: true
});

Article.sync(); // 创建表

module.exports = Article;
```

2.模型`module/article.js`

```javascript
import Article from '../schema/article';
import { print, validateFields } from '../utils';

// 获取文章列表
exports.findArticleList = async ({ current = 1, pageSize = 20, category = '', sort = 'desc', authorId }) => {
  current = parseInt(current, 10);
  pageSize = parseInt(pageSize, 10);
  if((current <=0 )|| (pageSize <= 0)) {
    return {
      data: [],
      total: 0,
      meta: {
        current: 0,
        pageSize: 0,
        totalPage: 0
      }
    }
  }

  // 条件
  const where = {};
  if(category) {
    where.category = category;
  }
  if(authorId) {
    where.authorId = authorId;
  } else {
    where.isPublic = 1;
  }
  const ret = await Article.findAndCountAll({
    offset: (current - 1) * pageSize,
    limit: pageSize, // 每页多少
    where: where,
    order: [
      ["isTop", sort],
      ["updatedAt", sort]
    ]
  })

  return {
    data: ret.rows,
    total: ret.count,
    meta: {
      current,
      pageSize,
      total: ret.count,
      totalPage: Math.ceil(ret.count / pageSize)
    }
  }
}
```
3.控制器（负责功能处理部分）`controller/article.js`
- 收集、验证请求参数并绑定到命令对象
- 将命令对象交给业务对象，由业务对象处理并返回模型数据

```javascript
import { articleModel } from '../models';
import { print } from '../utils';

// 获取文章列表
exports.findArticleList = async (ctx) => {
  try {
    const data = ctx.request.body;
    const ret = await articleModel.findArticleList(data);
    if(!ret) {
      return ctx.body = {
        code: 1,
        data: [],
        total: 0,
        msg: '获取文章失败',
      }
    }
    return ctx.body = {
      code: 0,
      data: ret.data,
      total: ret.total,
      meta: ret.meta,
      msg: `本页获取${ret.data.length}篇文章，一共有${ret.total}篇文章`,
    }
  } catch(err) {
    print('获取文章列表', err);
  }
}
```

## [路由（接口）](https://koa.bootcss.com/)
路由管理，大部分是接收不同的api请求，返回数据的。例如一个 /api/v1/article的请求，得到响应，中间件处理，返回数据。

1.根目录下创建文件夹`routes`，创建`index.js`和`article.js`

```javascript
// article.js
import Router from 'koa-router';
import ctrl from '../controller/article'
const router = new Router();

// 创建文章
router.post('/create', ctrl.createArticle)
// 更新文章
router.post('/update', ctrl.updateArticle);
// 置顶、取消置顶
router.post('/switchTop', ctrl.switchTopArticle);
// 获取文章详情
router.post('/detail', ctrl.findOneArticle)
// 获取文章列表
router.post('/list', ctrl.findArticleList)
// 获取我的文章列表
router.post('/my', ctrl.findMyArticleList)
// 删除文章
router.post('/delete', ctrl.deleteOneArticle)

export default router;
```

```javascript
// index.js
import Router from 'koa-router';
import Article from './article';
const router = new Router();

export default app => {
  router.use('/article', Article.routes(), Article.allowedMethods());

  app.use(router.routes(), router.allowedMethods())
}
```


## 跨域配置
CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。它允许浏览器向跨源(协议 + 域名 + 端口)服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。

CORS需要浏览器和服务器同时支持。它的通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

- [github koa-cors](https://github.com/koajs/cors)
- [npm koa-cors](https://www.npmjs.com/package/koa-cors)

```javascript
npm install koa-cors --save
```

在根目录app.js文件下引入koa-cors

```javascript
const cors = require('koa-cors');

// 使用koa-cors
app.use(cors());
```

## 权限接口
使用session来管理会话，用一个sessionId来表明用户已登录。session结合cookie管理会话在web应用中是很常见的。

登录成功之后可以把用户信息存入session中。koa-session2会将sessionId写入cookie，再把session对象写入redis,键值为sessionId，这样每次客户端的请求带上sessionId我们就可以从redis中取登录用户信息。也可以通过是否有sessionID来做会话拦截。而退出的时候只要将ctx.session置为{}就可以了。


## 启动服务

```javascript
npm start
```


## 接口测试
使用postman来测试接口