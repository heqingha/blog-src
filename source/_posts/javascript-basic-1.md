---
title: Javascript基础（一）
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
keywords: javascript
description: 内置类型，Typeof，类型转换
photos: /img/2015/javascript.jpeg
abbrlink: 17cad004
date: 2018-01-27 10:28:47
tags:
- javascript
---

## 内置类型
js中内置类型一共7种（包括es6），7种内置类型可分为两大类型：**基本类型** 和 **引用类型（对象Object)**。

1.基本类型包括：`null`、`undefined`、`string`、`number`、`boolean`、`symbol`。

重点说下数字类型`number`：
- js中数字类型是浮点类型的，没有 **整型**。浮点类型基于 IEEE 754标准实现，在使用中会有bug；
- `NaN`也属于`number`类型，并且`NaN`不等于自身；

2.对象（Object）是引用类型，在使用过程中会遇到 **浅拷贝** 和 **深拷贝** 的问题。

```javascript
const x = { name: 'x'};
const y = x;
y.name = 'y';
console.log(x.name); // y
```

## Typeof

1.对于基本类型，除了`null`都可以显示正确类型

```javascript
typeof x;        // 'undefined'
typeof '1';      // 'string'
typeof 1;        // 'number'
typeof true;     // 'boolean'
typeof Symbol(); // 'symbol'
```

2.对于对象，除了函数都显示`object`

```javascript
typeof [];          // 'object'
typeof {};          // 'object'
typeof console;     // 'object'
typeof console.log; // 'function'
```

3.说说`null`，一个遗留bug，明明是基本类型，可是就显示`object`

```javascript
typeof null ;   // 'object'
```
那为什么会出现这种情况呢？
js最初版本中，使用的是32位系统，为了性能考虑使用低位存储变量的类型信息，`000`开头表示对象，而`null`表示全零，所以将它错判为`object`了。虽然现在内部类型的判断代码变了，但是这个bug却一直流传下来。

4.正确获取变量类型可使用`Object.prototype.toString.call(xx)`，获得类似 `[object Type]` 的字符串

```javascript
Object.prototype.toString.call(111)
```


## 类型转换
1.转Bollean
除了`undefined`、`null`、`false`、`NaN`、`''`、`0`、`-0`，其他都为`true`，包括对象。

2.对象转基本类型
对象转基本类型时，会调用`valueOf`、`toString`两个方法，也可以重写`Symbol.toPrimitive`(优先级最高)

```javascript
let p = {
  valueOf(){
    return 0;
  },
  toString(){
    return '1';
  },
  [Symbol.toPrimitive] (){
    return 2;
  }
}
console.log(1 + p);  // 3
console.log('1' + p);  // 12
```


3.四则运算符
- 只有加法运算符时，一方是字符串类型，就会把另一方也转为字符串类型。
- 其他运算只要其中一方是数字，那么另一方就转为数字。
- 加法运算符会触发3钟类型转换：将值转换为原始值，转换为数字，转换为字符串。

```javascript
console.log(1 + '1'); // 11
console.log(1 * '1'); // 1
console.log([1, 2] + [1, 2]); // [1, 2].toString() => '1, 2' => '1, 2' + '2, 1' => '1, 22, 1'
```
加号有个需要主要的表达式`'a' +  + 'b'`

```javascript
console.log('a' + + 'b'); //  + 'b' => NaN
```


4.`==`操作符
比较运算符 x == y
1.type(x)与type(y)相同，则
  - type(x)为undefined，返回true;
  - type(x)为null，返回true;
  - type(x)为number，则
      - x为NaN，返回false;
      - y为NaN，返回false;
      - x与y相等数值， 返回true;
      - x为+0，y为-0，返回true;
      - x为-0，y为+0，返回true;
      - 返回false;
  - type(x)为string，则当x与y为完全相同的字符序列（长度相等且相同字符在相同位置）时返回true，否则false。
  - type(x)为boolean，x与y同为true或同为false，返回true;
2.x为null且y为undefined，返回true;
3.x为undefined且y为null，返回true;
4.若type(x)为number且type(y)为string，返回comparison x = toNumber(y)的结果；
5.若type(x)为string且type(y)为number，返回comparison toNumber(x) = y的结果；
6.type(x)为boolean，返回toNumber(x) = y;
7.type(y)为boolean，返回x = toNumber(y);
8.type(x)为string或number，且type(y)为object，返回x = toPrimitive(y)的结果；
9.type(x)为object，且type(y)为string或number，返回toPrimitive(x) = y的结果；
**注**：`toPrimitive`对象转基本类型

有个烧脑的例子：

```javascript
console.log( [] == ![] ); // true
// 从右往左解析， [] => true => 取反 => false => [] = false
// 根据第7条，toNumber(false) => 0
// 根据第9条，toPrimitive([]) == 0 => [].toString() => ''
// 根据第5条，toNumber('') == 0 =>  0 == 0
```

5.运算符
- 如果是对象，通过`toPrimitive`转为对象；
- 如果是字符串，通过`unicode`字符索引来比较；



## 原文地址
https://yuchengkai.cn/docs/frontend