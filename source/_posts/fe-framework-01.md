---
title: 框架（一）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
keywords: 框架
description: 框架
photos: /img/pangrui.jpg
abbrlink: 1f87ecba
date: 2018-10-02 15:02:28
tags:
- 框架
---

## MVVM

#### 1.jQuery时期
如果要刷新UI（页面），需要取到DOM再更新UI，这样数据和业务逻辑与 UI 有**强耦合**。

#### 2.MVVM
组成：
- Model：数据模型
- View：界面
- ViewModel：作为桥梁沟通View和Model

UI 是通过数据驱动的，数据变动刷新UI，UI 改变数据就会变动。这种交互方式只要关系数据的流转，无需和页面打交道。

ViewModel 只关心数据和业务处理，不关心 View 如何处理数据，也就是说 View 和 Model 都独立出来。另外可以将一些复用的逻辑放在一个 ViewModel 中，让多个 View 复用这个 ViewModel。

在MVVM中，最核心的就是数据双向绑定，Angular 的脏数据检测，Vue 的数据劫持。


## 脏数据检测
触发指定事件后，进入脏数据检测，就会调用 `$digest` 循环遍历所有的数据观察者，判断当前值是否和先前值有出入。如果有变化，会调用 `$watch` 函数，然后再次调用 `$digest` 循环，直到发现没有变化。其中，循环至少2次，至多10次。

脏数据检测虽然存在低效问题，但是不关心数据是通过什么方式改变，但在 Vue 中的双向绑定是存在问题的。脏数据检测可以批量检测出更新的值，再去统一更新 UI，大大减少操作 DOM 的次数，所以低效是相对的。

## 数据劫持
Vue 内部使用 `Object.defineProperty()` 来实现双向绑定，通过这个函数可以监听到 `set` 和 `get` 的事件。
```javascript
var data = { name: 'vue' }
observe(data)
let name = data.name
data.name = 'AAA'

function observe(obj) {
  if(!obj || typeof obj !== 'object') {
    return 
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key]);
  })
}

defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get value')
      return val
    },
    set: function reactiveSetter(newValue) {
      console.log('set value')
      val = newValue
    }
  })
}
```

上面代码简单实现了如何监听数据的 `set` 和 `get` 事件，还需要在适当的时候给属性添加发布订阅

```html
<div>{{name}}</div>
```

在解析模板代码时，遇到 `{{name}}` 就会给属性 `name` 添加发布订阅

```javascript
class Dep { 
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    // sub 是 Watcher 的实例
    this.subs.push(sub); // 5
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    })
  }
}

Dep.target = null
// 通过 DOM 改变 name 的值
function render(value) {
  document.querySelector('div').innerText = value
}

class Watcher {
  constructor(obj, key, cb) {
    // 将 Dep.target 指向自己
    // 然后触发属性的 getter 添加监听
    // 最后将 Dep.target 置空
    Dep.target = this // 3
    this.obj = obj
    this.key = key
    this.cb = cb
    this.value = obj[key]
    Dep.target = null
  }
  // 等待触发
  update() {
    // 获取新值
    this.value = this.obj[this.key]
    // 调用 render 方法更新 DOM
    this.cb(this.value)
  }
}
var data = { name: 'vue' }
observe(data) // 1

// 模拟解析到 `{{name}}` 触发的操作
new Watcher(data, 'name', render)

// 触发操作
data.name = 'AAA'
```

同时，`defineReactive` 函数要配合改造
```javascript
function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  let dp = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() { // 2
      console.log('get value')
      // 将 Watcher 添加到订阅
      if(Dep.target) {
        dp.addSub(Dep.target) // 4 将自己注册到目标中
      }
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('set value')
      val = newVal
      // 执行 watcher 的 update 方法
      dp.notify()
    }
  })
}
```

以上实现了一个简易的双向绑定，核心思路就是手动触发一次属性的 getter 来实现发布订阅的添加


## `Proxy` 与 `Object.defineProperty` 对比

`Object.defineProperty` 虽然能实现双向数据绑定，可还有缺陷
- 只能对属性进行数据劫持，所以需要深度遍历整个对象
- 对于数组不能监听到数据的变化

虽然 Vue 中确实能检测到数组数据的变化，但是其实是使用了 hack 的办法，并且也是有缺陷的。
