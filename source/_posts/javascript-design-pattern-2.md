---
title: javascript设计模式（二）
author: 胖芮
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/about/'
authorAbout: 'http://www.ruizhengyun.cn'
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
photos: /img/2015/javascript.jpeg
abbrlink: 5080a4c5
date: 2015-01-12 13:19:59
tags: 
- javascript
- 设计模式
keywords:
description: 封装|继承
---
可被继承的方法和属性无外乎两种：
1、在构造函数中，这类属性和方法在对象实例化时被复制一遍；
2、类的原型对象中，这类属性和方法在对象实例化时被所有实例化对象共用;

## 封装-创建一个类
[示例](https://github.com/ruizhengyun/javascript-design-patterns/blob/master/day-02/01.js)


## 封装-利用闭包实现
[示例](https://github.com/ruizhengyun/javascript-design-patterns/blob/master/day-02/02.js)

## 封装-创建对象安全模式
[示例](https://github.com/ruizhengyun/javascript-design-patterns/blob/master/day-02/03.js)


## 类式继承
`instanceof` 的作用是判断前面的对象是否是后面类（对象）的实例，并不表示两者的继承，不要弄混。

**类式继承有2个缺点：**
1、子类通过其原型prototype对父类实例化，继承了父类。若父类的共有属性是引用类型，子类所有实例共用，若子类的一个实例更改了该共有属性（引用类型），就会影响其他子类的实例。
2、由于子类实现的继承是靠其原型prototype对父类的实例化实现的，因此在创建父类的时候，是无法向父类传递参数的，因而在实例化父类的时候也无法对父类构造函数内的属性进行初始化。

[示例](https://github.com/ruizhengyun/javascript-design-patterns/blob/master/day-02/04.js)

## 构造函数继承
[示例](https://github.com/ruizhengyun/javascript-design-patterns/blob/master/day-02/05.js)

## 组合继承
[示例](https://github.com/ruizhengyun/javascript-design-patterns/blob/master/day-02/06.js)

缺点：构造函数继承执行了一边父类的构造函数，实现子类原型的类式继承时又调用了一遍父类构造函数。


## 原型式继承
[示例](https://github.com/ruizhengyun/javascript-design-patterns/blob/master/day-02/07.js)


## 寄生式继承
[示例](https://github.com/ruizhengyun/javascript-design-patterns/blob/master/day-02/08.js)


## 寄生组合式继承
[示例](https://github.com/ruizhengyun/javascript-design-patterns/blob/master/day-02/09.js)


## 单继承
[示例](https://github.com/ruizhengyun/javascript-design-patterns/blob/master/day-02/10.js)

## 多继承
[示例](https://github.com/ruizhengyun/javascript-design-patterns/blob/master/day-02/11.js)
