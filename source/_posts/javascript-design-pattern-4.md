---
title: javascript设计模式（四）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/2015/javascript.jpeg
abbrlink: b9e301f0
date: 2019-01-08 13:19:59
tags: 
- javascript
- 设计模式
keywords: 单例模式
description: 单例模式介绍、
---

## 单例模式
- 系统中被唯一使用的
- 一个类只有一个实例

注：另外一个方面不会有多个实例，提高性能


## UML类图
略...

## 代码
java代码
```java
public class SingleObject {
  // 注意，私有化构造函数，外部不能 new, 只能内部能 new
  private SingleObject() { } // javascript没有private

  // 唯一被 new 出来的对象
  private SingleObject instance = null;
  // 获取对象的唯一接口
  public SingleObject getInstance() {
    if(instance === null) {
      // 只 new 一次，这里不考虑多线程
      instance = new SingleObject();
    }
    return instance;
  }

  // 对象方法
  public void login(username, password) {
    System.out.println('login...')
  }
}

public class SingletonPatternDemo {
  public static void main(String[] args) {
    // 不合法的构造函数
    // 编译时错误：构造函数 SingleObject() 是不可见的
    // SingleObject obj = new SingleObject();

    // 获取唯一可用的对象
    SingleObject obj = SingleObject.getInstance();
    obj.login();
  }
}
```

javascript 中没有private，故使用闭包
```javascript
// 单例模式
class SingleObject {
  login() {
    console.log('login...')
  }
}

// 静态方法
SingleObject.getInstance = (function() {
  let instance
  return function() {
    if(!instance) {
      instance = new SingleObject();
    }
    return instance;
  }
})();

// 测试
let obj1 = SingleObject.getInstance();
obj1.login();

console.log('---分割线---');
let obj2 = SingleObject.getInstance();
obj2.login();

console.log('---分割线---');
let obj3 = new SingleObject();
obj2.login();

console.log('obj1 === obj2', obj1 === obj2); // true- 单例模式强相等
console.log('obj1 === obj3', obj1 === obj3); // false
```

## 场景

1.jQuery只有一个`$`

```javascript
// jQuery只有一个$
if(window.jQuery != null) {
  return window.jQuery;
} else {
  // 初始化
}
```

2.模拟登录框
```javascript
// 单例模式-模拟登录框
class LoginForm {
  constructor() {
    this.state = 'hide';
  }
  show() {
    if(this.state === 'show') {
      console.warn('登录框已经显示');
      return
    }
    this.state = 'show'
    console.log('登录框成功显示')
  }
  hide() {
    if(this.state === 'hide') {
      console.warn('登录框已经隐藏');
      return
    }
    this.state = 'show'
    console.log('登录框成功隐藏')
  }
}
// 静态方法
LoginForm.getInstance = (function() {
  let instance
  return function() {
    if(!instance) {
      instance = new LoginForm();
    }
    return instance;
  }
})();

// 测试
let login1 = LoginForm.getInstance();
login1.show();

console.log('---分割线---')
let login2 = LoginForm.getInstance();
login2.show();
login2.hide();

console.log('---分割线---')
console.log('login1 === login2', login1 === login2);  // true
```

3.vuex和redux中的`store`，就是一个单例模式（数据完全一样、共享、同步）

## 设计原则验证
- 符合单一职责原则，只实例化唯一的对象
- 没法具体开放封闭原则，但是绝对不违反开放封闭原则