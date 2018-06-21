---
title: javascript面向对象中继承实现？
author: 胖芮
avatar: /images/pangrui.png
authorLink: http://www.ruizhengyun.cn
authorAbout: http://www.ruizhengyun.cn
authorDesc: 不论我码不码代码，我都是一枚快乐的前端
categories: 前端
tags: 面试
abbrlink: 7bd8068
date: 2015-01-12 20:17:16
---
# 面向对象的基本特征
封闭、继承、多态


# JavaScript中实现继承的方法
* 原型链（prototype chaining）
* call()/apply()
* 混合方式(prototype和call()/apply()结合)
* 对象冒充
<!--more-->

## 1、prototype原型链方式
```
function Human(name, age) {
  this.name = name;
  this.age = age;
}
Human.prototype.sayName = function() {
  console.log("name is " + this.name + " , age is " + this.age);
};

function Student(name, age) {
  this.name = name;
  this.age = age;
}
Student.prototype = new Human();

var person = new Human("jianghu", 18);
person.sayName(); // name is jianghu , age is 18

var student1 = new Student("xiaoming", 20);
student1.sayName(); // name is xiaoming , age is 20
```


## 2、`call()/apply()`方法

```
function Human(name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function() {
    console.log("name is " + name + ", age is " + age);
  };
}

function Student() {
  var args = [].slice.apply(arguments);
  Human.apply(this, args);
}

var human1 = new Human("jianghu", 18);
human1.sayHi(); // name is jianghu, age is 18

var student1 = new Student("xiaoming", 20);
student1.sayHi(); // name is xiaoming, age is 20
```


##  3、混合方法 `prototype,call/apply`

```
function Human(name, age) {
  this.name = name;
  this.age = age;
}
Human.prototype.sayHi = function() {
  console.log("name is " + this.name + ", age is " + this.age);
};

function Student() {
  var args = [].slice.apply(arguments);
  Human.apply(this, args);
}
Student.prototype = new Human();


var human1 = new Human("jianghu", 18);
human1.sayHi(); // name is jianghu, age is 18

var student1 = new Student("xiaoming", 20);
student1.sayHi(); // name is xiaoming, age is 20
```


##  4、对象冒充

```
function Human(name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function(){
    console.log("name is " + this.name + " , age is " + this.age);
  }
}

function Student(name, age){
  this.student = Human; // 将Person类的构造函数赋值给this.student
  this.student(name, age); // js中实际上是通过对象冒充来实现继承的
  console.log(this.student); // [Function: Human]
  delete this.student; // 移除对Person的引用
}

var human1 = new Human("jianghu", 18);
human1.sayHi(); // name is jianghu , age is 18

var student1 = new Student("xiaoming", 20);
student1.sayHi(); // name is xiaoming , age is 20
```

