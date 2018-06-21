---
title: Mongoose介绍和入门
author: 胖芮
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/about/'
authorAbout: 'http://www.ruizhengyun.cn'
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
photos: /img/2016/nodejs.jpg
abbrlink: 60bf16db
date: 2016-05-27 14:06:38
tags: 
  - nodejs
  - 数据库
keywords:
description: Mongoose简介、Mongoose安装
---

## Mongoose简介
Mongoose是在node.js异步环境下对mongodb进行便捷操作的对象模型工具

对于mongoDB的安装和操作可参考：
* [Github地址](https://github.com/Automattic/mongoose)
* [API Docs](http://mongoosejs.com/docs/guide.html)


## Mongoose安装
```
npm install mongoose
```

## 连接字符串
创建一个 [day-01/db.js](https://github.com/ruizhengyun/mongoose-lesson/blob/master/day-01/db.js)

查看[其他事件](http://mongoosejs.com/docs/api.html#connection_Connection)


## Schema
schema是mongoose里会用到的一种数据模式，可以理解为表结构的定义；
每个schema会映射到mongodb中的一个collection，它不具备操作数据库的能力。
我们先改造一下db.js，导出mongoose对象: [day-02/db.js](https://github.com/ruizhengyun/mongoose-lesson/blob/master/day-02/db.js)

下面我们定义一个user的Schema，命名为: [day-02/user.js](https://github.com/ruizhengyun/mongoose-lesson/blob/master/day-02/user.js)

定义一个Schema就这么简单，指定字段名和类型。Schema Types内置类型如下：
* String
* Number
* Boolean | Bool
* Array
* Buffer
* Date
* ObjectId | Oid
* Mixed

**Schema中还可以做一些常用事，后面再讲！**


## Modal
model是由schema生成的模型，可以对数据库的操作。
对定义的user的schema生成一个User的model并导出，修改后代码：[day-03/user.js](https://github.com/ruizhengyun/mongoose-lesson/blob/master/day-03/user.js)


## 常用数据库操作
### 插入/新增 `Model#save([fn])`
[day-04/insert.js](https://github.com/ruizhengyun/mongoose-lesson/blob/master/day-04/insert.js)

### 更新 `Model.update(conditions, update, [options], [callback])`
[day-04/update.js](https://github.com/ruizhengyun/mongoose-lesson/blob/master/day-04/update.js)

指定性（根据_id）
[day-04/findByIdAndUpdate.js](https://github.com/ruizhengyun/mongoose-lesson/blob/master/day-04/findByIdAndUpdate.js)

其它更新方法（找到一条记录并更新）
```
Model.findOneAndUpdate([conditions], [update], [options], [callback])
```

### 删除 `Model.remove(conditions, [callback])`

[day-04/remove.js](https://github.com/ruizhengyun/mongoose-lesson/blob/master/day-04/remove.js)

其它常用方法还有： 
```
Model.findByIdAndRemove(id, [options], [callback])å
Model.findOneAndRemove(conditions, [options], [callback])
```

### 查询 `Model.find(conditions, [fields], [options], [callback])`
[day-04/find.js](https://github.com/ruizhengyun/mongoose-lesson/blob/master/day-04/find.js)
输出只会有username字段，设置方法如上，1表示查询输出该字段，0表示不输出

比如我要查询年龄范围条件应该怎么写呢？
```
// 这表示查询年龄大于等21而且小于等于65岁
User.find({userage: {$gte: 21, $lte:65 }}, callback);
```
其实类似的还有：　
* $or　　　　或关系
* $nor　　　 或关系取反
* $gt　　　　大于
* $gte　　　 大于等于
* $lt　　　　 小于
* $lte　　　  小于等于
* $ne            不等于
* $in             在多个值范围内
* $nin           不在多个值范围内
* $all            匹配数组中多个值
* $regex　　正则，用于模糊查询
* $size　　　匹配数组大小
* $maxDistance　　范围查询，距离（基于LBS）
* $mod　　   取模运算
* $near　　　邻域查询，查询附近的位置（基于LBS）
* $exists　　  字段是否存在
* $elemMatch　　匹配内数组内的元素
* $within　　范围查询（基于LBS）
* $box　　　 范围查询，矩形范围（基于LBS）
* $center       范围醒询，圆形范围（基于LBS）
* $centerSphere　　范围查询，球形范围（基于LBS）
* $slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素）
* ...

### 数量查询 `Model.count(conditions, [callback])`
[day-04/count.js](https://github.com/ruizhengyun/mongoose-lesson/blob/master/day-04/count.js)


### 根据_id查询 `Model.findById(id, [fields], [options], [callback])`
[day-04/fondById.js](https://github.com/ruizhengyun/mongoose-lesson/blob/master/day-04/fondById.js)

这个还是比较常用，要据ID得到数据！　　

### 模糊查询
[day-04/getByRegex.js](https://github.com/ruizhengyun/mongoose-lesson/blob/master/day-04/getByRegex.js)

上面示例中查询出所有用户名中有'm'的名字，且不区分大小写，模糊查询比较常用，正则形式匹配，正则方式就是javascript正则，用到的比较多！

### 分页查询
[day-04/getByPager.js](https://github.com/ruizhengyun/mongoose-lesson/blob/master/day-04/getByPager.js)

分页是用得比较多的查询，分页原理用过其它数据库的都知道，分页用到的函数和mysql的比较类似。上面我用到sort(),这个是排序规则，就不单讲了！

### 索引和默认值
[day-05/user.js](https://github.com/ruizhengyun/mongoose-lesson/blob/master/day-05/user.js)

### LBS地址位置
```
// 地理位置
lbs : { type: Array, index: '2d', sparse: true }   
```
上面有介绍过很多基于LBS的条件查询，Schema中定义时如上

LBS查询对于一些基于LBS应用会用得比较多。

### 其它常用方法
```
Model.distinct(field, [conditions], [callback])　　// 去重
Model.findOne(conditions, [fields], [options], [callback])　// 查找一条记录
Model.findOneAndRemove(conditions, [options], [callback])　// 查找一条记录并删除
Model.findOneAndUpdate([conditions], [update], [options], [callback])　// 查找一条记录并更新
```

[](http://www.cnblogs.com/zhongweiv/p/mongoose.html)