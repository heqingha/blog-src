---
title: react，你知多少-基本概念（一）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
keywords: Component(组件)、instance(组件实例)、element(组件描述)、jsx、dom
description: 基本概念
photos: /img/pangrui.jpg
abbrlink: 9590181f
date: 2018-12-10 08:45:55
tags:
- react
---

前段日子看react源码，掉了一地头发还是无法读下去，虽然加上注释就2000行，确实太难了。但是看了一些自己动手实现**简版react**的文章，死磕完文章后，发现对react内部实现原理有了更多了解。接下来先从几个概念入手：

## Component(组件)
就是我们经常实现的组件，可以是 **类组件（class component）** 或 **函数式组件（functional component）**。

1.类组件可分为：
- 普通类组件 `React.Component`
- 纯类组件 `React.PureComponent`
区别在于`PureComponent`基于`shouldComponentUpdate`做了一些优化

2.函数式组件是用来简化一些组件的时间，用起来就是写一个函数。入参是组件属性`props`，出参与类组件的`render`方法返回值一样，是`react element`（一个很重要的东东）

下面是通过类组件和函数式组件实现的Welcome组件：
```javascript
// 普通类 Component
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.title}</h1>;
  }
}

// 纯类组件 PureComponent
class Welcome extends React.PureComponent {
  render() {
    return <h1>Hello, {this.props.title}</h1>;
  }
}

// 函数式组件 functional component
function Welcome(props) {
  return <h1>Hello, {props.title}</h1>;
}
```

## instance(组件实例)
熟悉**面向对象编程**的人都知道类和实例的关系。套用下格式，组件实例就是组建类实例化的结果。理论和你简单，但是在react中却容易弄不明白，为什么这么说呢？...
在react应用过程中，不需要我们自己去实例化一个组件实例，你肯定才到了，是react内部帮助我们做了这件事。因此，我们真正接触组件实例的机会并不多。而实际应用中，接触更多的是即将登场的`element`，因为我们通常写的jsx其实就是`element`的一种表示方式。
虽然，组件实例用的不多，但是偶尔也会用到，就是`ref`。`ref`可以指向一个dom节点或一个类组件（class component）的实例，但是**不能用于函数式组件（因为函数式组件不能实例化）**。简单来说`ref`可以指向一个**组件实例**。


## element(组件描述)
来自类组件的`render`方法以及函数式组件的返回值。
1.简单来说element就是一个**纯对象（plain object）,不是组件实例**。
2.它含有两个属性**type:(string|ReactClass)**和**props:Object**。
3.和组件实例的关系是：它是对组件实例或dom节点的描述。
- `type`为`string`，则表示dom节点
- `type`为`function或ReactClass`，则表示组件实例

看下面例子，秒懂：
```javascript
// type: string  描述dom节点
{
  type: 'button',
  props: {
    className: 'button button-primary',
    children: {
      type: 'span',
      props: {
        children: '我是一个按钮，戳我'
      }
    }
  }
}

// type: function|ReactClass 描述组件实例
function Button(props) {
  // ....
}

{
  type: Button,
  props: {
    color: 'primary',
    children: '我是另一个按钮，戳我'
  }
}
```

## jsx
弄明白element了，那**jsx**就简单了，只是换了一种写法，便于创建element。
```javascript
// jsx写法
const foo = <div id="foo">Hello, foo!</div>;

// element写法
{
  type: 'div',
  props: {
    id: 'foo',
    children: 'Hello, foo!'
  }
}
```

你可能会问react怎么将**jsx**转为**element纯对象**？其实就是利用**Babel编译**，只要在使用`jsx`的代码上价格编译指示（pragma）即可。
比如将编译指示设置为`createElement`函数，`/** @jsx createElement */`，那么前面代码就会编译为：

```javascript
var foo = createElement('div', {id: 'foo'}, 'Hello, foo!');
```
不难看出，jsx的编译过程其实就是从`<`、`>`这种标签式写法到函数调用式写法的一种转换。那**简版react**的`createElement`函数可以这样写：

```javascript
function createElement(type, props, ...children) {
  props = Object.assign({}, props);
  props.children = [].concat(...chilren)
    .filter(child => child != null && child !== false)
    .map(child => child instanceof Object ? child : createTextElement(child));
  
  return { type, props };
}
```

## dom
说道dom，作为一名前端开发人员肯定都熟悉了，
```javascript
const divDomNode = window.document.createElement('div');
```

其实所有dom节点都是`window.HTMLElement`的实例
```javascript
window.document.createElement('div') instanceof window.HTMLElement; // true
```

重复下关系，**dom节点是`HTMLElement`的实例，组件实例是组件类的实例（react中），element是对组件实例或dom节点的描述**。

![](./9590181f/1.jpg)


到此，几个基本概念介绍完了，后面说[虚拟dom和diff算法](/blog/post/c9949a5.html)