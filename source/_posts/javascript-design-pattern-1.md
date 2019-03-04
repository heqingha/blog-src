---
title: javascript设计模式（一）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/2015/javascript.jpeg
abbrlink: d52af810
date: 2019-01-05 12:47:23
tags: 
- javascript
- 设计模式
keywords: 搭建环境、面向对象、UML 类图
description: 为什么要学设计（模式）、惑解惑、搭建环境、面向对象、UML 类图
---

```mermaid
graph TD;
    Javascript设计模式-->为什么要学设计;
    Javascript设计模式-->惑解惑;
    Javascript设计模式-->搭建开发环境;
    Javascript设计模式-->面向对象;
    Javascript设计模式-->应用举例;
    Javascript设计模式-->UML类图;
```

## 为什么要学设计（模式）
- 3年工作经验，面试必考设计能力
- 成为项目技术负责人，设计能力是必要基础
- 从写好代码，到做好设计，设计模式是必经之路


## 惑解惑
- 网站资料针对java等后端语言比较多
- 看懂概念，不知道怎么用，看完就忘
- 现在的js框架（react、vue等），都用了哪些设计模式
 

## 搭建开发环境
1.准备工作
```nodejs
# 项目初始化
npm init -y

# 新建开发目录src
mkdir src

# 安装webpack
npm install webpack-cli webpack --save-dev

# 安装babel
npm install babel-loader babel-core babel-preset-env html-webpack-plugin babel-plugin-transform-decorators-legacy -D

# 安装开发服务环境
npm install webpack-dev-server -D

# 新建配置webpack
touch webpack.dev.config.js
```

2.编写`webpack.dev.config.js`
```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './release/bundle.js'  // release 会自动创建
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'  // bundle.js 会自动注入
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, './release'),  // 根目录
        open: true,  // 自动打开浏览器
        port: 8016,   // 端口
        historyApiFallback: true
    },
    module: {
        rules: [
            {
              test: /\.js?$/,
              exclude: /(node_modules)/,
              loader: 'babel-loader'
            }
        ]
    }
}
```

3.编辑`package.json`，在`script`添加`dev`任务
```javascript
{
  ...,
  "scripts": {
    ...,
    "dev": "webpack --config ./webpack.dev.config.js --mode development"
  },
  ...
}
```

## 面向对象
#### 面向对象三要素：
- 继承：子类继承父类（用的多）
- 封装：数据的权限和保密（将对象里面的某些属性和方法不想让别人看见。ES6 尚不支持，可用 typescript 演示）
- 多态：同一接口不同实现，简单来讲就是父类定义一个接口，子类实现不同的功能

#### 继承

```javascript
// 类，即模板
class People {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  getName() {
    alert(`名字: ${this.name}`)
  }
  getAge() {
    alert(`年龄: ${this.age}`)
  }
}

// 创建实例
const zhang = new People('张三', 27);
zhang.getName();
zhang.getAge();

// 创建实例
const li = new People('李四', 22);
zhang.getName();
zhang.getAge();


// 子类继承父类
class Student extends People{
  constructor(name, age, id) {
    super(name, age)
    this.id = id
  }
  getId(){
    alert(`${this.name}，年龄 ${this.age}，学号 ${this.id}`)
  }
}

// 创建实例
const li = new Student('李四', 22, '001')
li.getId();
```
总结：
- People 是父类，公共的，不仅仅服务于Student
- 可将公共方法抽离出来，提高复用，较少冗余，这是软件设计最基础和最高效的方式


#### 封装

```javascript
// 封装 public-开放   protected-对子类开放   private-对自己开放
// 在线编译地址 => http://www.typescriptlang.org/play/ 
// 父类
class People{
  public name
  age
  protected weight // 受保护属性，只有自己或子类可用

  constructor(name, age) {
    this.name = name
    this.age = age
    this.weight = 120
  }
  getName() {
    alert(`名字: ${this.name}`)
  }
  getAge() {
    alert(`年龄: ${this.age}`)
  }
}

// 继承
class Student extends People {
  id
  private girlFriend
  constructor(name, age, id) {
    super(name, age)
    this.id = id
    this.girlFriend = '赵雪'
  }
  getId(){
    alert(`${this.name}，年龄 ${this.age}，学号 ${this.id}`)
  }
  getWeight() {
    alert(`${this.weight}`)
  }
}

const xm = new Student('小明', 24, '002');
xm.getWeight();
// alert(xm.girlFriend)
```

`public` 完全开发；`portected` 对子类开放；`private` 对自己开放；(ES6 尚不支持，可用 typescript 演示)
总结：
- 较少耦合，不该外露的不外露
- 利于数据、接口的权限管理
- ES6目前不支持，一般认为 _开头的属性是 private ，比如var _num = 20


#### 多态

```javascript
class A extends People {
  constructor(name) {
    super(name)
  }
  getName() {
    alert(`A名字: ${this.name}`)
  }
}

class B extends People {
  constructor(name) {
    super(name)
  }
  getName() {
    alert(`B名字: ${this.name}`)
  }
}

// 创建实例
const a1 = new A('张依依')
a1.getName();

// 创建实例
const b1 = new B('李尔尔')
b1.getName();
```

总结：
- 保持子类的开放性和灵活性
- 面向接口编程(不用管子类如何实现，就看父类有多少接口)   
- js应用极少
- 需要结合 java 等语言的接口、重写、重载等功能

#### 为什么使用面向对象
> 关于抽象：抽取事物的共同特征就是抽取事物的本质特征，舍弃非本质的特征。所以抽象的过程也是一个裁剪的过程。在抽象时，同与不同，决定于从什么角度上来抽象。抽象的角度取决于分析问题的目的。

- 程序的执行离不开 **顺序、判断、循环** 操作，也就是将其结构化
- 面向对象就是将零散的数据结构化
- 对于计算机而言，结构化的才是最简单的（松本行弘的程序世界）
- 编程应该是**简单&抽象，简单的前提是抽象，抽象后才简单**


## 应用举例
```javascript
class jQuery {
  constructor(selector) {
    let slice = Array.prototype.slice;
    let dom = slice.call(document.querySelectorAll(selector));
    let len = dom ? dom.length : 0;
    for (let i = 0; i < len; i++) {
      this[i] = dom[i];
    }
    this.length = len
    this.selector = selector || ''
  }
  append(node) {
    // ....
  }
  addClass(name) {
    // ....
  }
  html(data) {
    // ....
  }
  // 省略多个 API
}

window.$ = function(selector) {
  // 工厂模式
  return new jQuery(selector);
}

const $li = $('li') 
console.log($li);
console.log($li.addClass);
```


## UML类图
- UML，统一建模语言（Unified Modeling Language）
- 类图，UML 包含很多类图，和 javascript 设计模式相关的是类图。展现了一组对象、接口、协作和它们之间的关系。类图描述的是一种静态关系，在系统的整个生命周期都是有效的，是面向对象系统的建模中最常见的图。
- 关系，主要讲解泛化（继承）和关联（引用）

```mermaid
graph TD;
  UML-->类图;
  UML-->对象图;
  UML-->用例图;
  UML-->交互图;
  UML-->状态图;
  UML-->活动图;
  UML-->组件图;
  UML-->部署图;
```

1.画图工具
- MS Office visio
- https://www.processon.com/

2.举例：一个简单类
![UML类图](./d52af810/uml.jpg)

```javascript
class People {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  getName() {
    alert(`名字: ${this.name}`)
  }
  getAge() {
    alert(`年龄: ${this.age}`)
  }
}
```

3.举例：继承与引用
![UML类图](./d52af810/uml-people-house.jpg)
```javascript
class House{
  constructor(city) {
    this.city = city;
  }
  showCity() {
    alert(`城市：${this.city}`)
  }
}

class People{
  constructor(name, house) {
    this.name = name
    this.house = house
  }
  getInfo() {
    alert(`我是${this.name}，有房在【${this.house.city}】`)
  }
}

class Student extends People{
  constructor(name, house) {
    super(name, house)
  }
  getInfo() {
    alert(`我是${this.name}，一名学生，有房在【${this.house.city}】`)
  }
}

class Engineer extends People{
  constructor(name, house) {
    super(name, house)
  }
  getInfo() {
    alert(`我是${this.name}，一名工程师，有房在【${this.house.city}】`)
  }
}

// 实例化
const h1 = new House('杭州');
const p1 = new People('张三', h1)
p1.getInfo();

const s1 = new Student('李四', h1)
s1.getInfo();

const e1 = new Engineer('王五', h1)
e1.getInfo();
```
