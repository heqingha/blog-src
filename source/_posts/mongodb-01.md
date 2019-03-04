---
title: mongoDB（一）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/2017/mongoDB.jpeg
abbrlink: 3a56da01
date: 2017-07-01 13:40:22
tags: 数据库
keywords:
description: 常用命令
---
## 启动
```
mongo 
```

## 显示
#### 显示数据库-当前数据库服务器上的
```
show dbs
```

#### 显示所有集合
```
show collections
```

#### 查看当前上下文
```
db
```



## 创建
#### 切换(创建)到指定数据库的上下文
```
use dbName
```

## 创建集合
```
db.collectionName.save({})
db.createCollection('collectionName', {})
```


## 删除
#### 删除数据库
```
db.dropDatabase()
```

#### 删除集合
```
db.collectionName.drop()
```


## 查询
#### 查询指定数据库包含的集合名称列表
```
db.getCollectionNames()
```

#### 查看数据库服务器的状态
```
db.serverStatus()
```

#### 查询指定数据库统计信息
```
db.stats()
```

#### 查询一条记录
```
db.collectionName.findOne({'version': '1.0.0'})
```



