---
title: javascript设计模式（八）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/2015/javascript.jpeg
abbrlink: b0554ddb
date: 2019-01-16 13:19:59
tags: 
- javascript
- 设计模式
keywords: 外观模式
description: 外观模式
---

## 外观模式
- 为子系统的一组接口提供了一个高层接口
- 使用者使用高层接口（对外统一，对内调度）
- 黑盒操作（暗箱操作），不需要知道内部怎么调用

![](./b0554ddb/1.png)

## 示例
- 去医院看病，接待员去挂号、门诊、划价、取药
- 大学入学报到，学哥学姐带你新生接待处、领取宿舍钥匙、被子、交学费、办校园一卡通

## UML 类图
![](./b0554ddb/uml.jpg)

## 代码
```javascript
// 外观模式-参数少传也适用
/**
 * @param elem 绑定元素
 * @param type 事件类型
 * @param selector 代理目标
 * @param fn 绑定事件函数
 * 
 */ 
function bindEvent(elem, type, selector, fn) {
  if(fn === null) {
    fn = selector; 
    selector = null;
  }
}

// 测试
bindEvent(elem, 'click', '#btn1', fn);
bindEvent(elem, 'click', fn);
```

## 场景
无

## 设计原则验证
- 不符合单一职责原则和开放封闭原则，因此谨慎使用，不可滥用