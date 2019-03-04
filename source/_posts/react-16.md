---
title: react v16.0 发布了
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/2016/react.jpg
keywords: 'https://zhuanlan.zhihu.com/p/29715711'
abbrlink: 6bbae9a1
date: 2017-09-27 09:13:20
tags: react
description:
---

2017 年 7 月 26 日，react 发布了 `16.0.0-beta.1` 版本。[原文地址](https://reactjs.org/blog/2017/09/26/react-v16.0.html)。先睹为快。

## 新的 `render()` 返回类型

现在可以在 `render` 方法中返回一个 **元素数组** 了，但是 `key` 还是要有的。

```javascript
class Demo extends Component {
  render() {
    // 不需要将列表包含在一个元素中了
    return [
      // 不要忘了 key
      <li key="user_1">张三</li>
      <li key="user_2">李四</li>
    ]
  }
}
```

未来我们可能会向 JSX 添加一种不需要带有 `key` 属性的特殊的 `fragments`。

除了支持返回 **元素素组**，还可以返回一个 **字符串**：

```javascript
class Demo extends Component {
  render() {
    return 'Hello, react 16!';
  }
}
```

## 更好的错误处理机制
以前，渲染过程中的运行错误可能会使 React 处于崩溃状态，还会产生隐藏的错误消息，并需要页面刷新才能恢复。为了解决这个问题，React 16 使用了一种更灵活的错误处理机制。默认情况下，假如组件的 `render` 或生命周期的其他方法中
