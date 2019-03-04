---
title: three.js教程及学习计划
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about/'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
tags: threejs
abbrlink: 1f643e94
date: 2017-11-30 15:15:47
---
> 最近公司业务需要，开始进入3d模型的应用的学习，首选还是three.js。

近年来web得到了快速的发展。随着HTML5的普及，网页的表现能力越来越强大。网页上已经可以做出很多复杂的动画，精美的效果。 而通过WebGL在网页中绘制高性能的3D图形。

## 三个概念- `OpenGL,WebGL到Three.js`
* `OpenGL`大概许多人都有所耳闻，它是最常用的跨平台图形库。 
* `WebGL`是基于`OpenGL`设计的面向`web`的图形标准，提供了一系列`JavaScript API`，通过这些API进行图形渲染将得以利用图形硬件从而获得较高性能。 
* `Three.js`是通过对`WebGL`接口的封装与简化而形成的一个易用的图形库。
简单来说：`WebGL`可以看成是浏览器给我们提供的接口，在`javascript`中可以直接用这些API进行3D图形的绘制；而`Three.js`就是在这些接口上又帮我们封装得更好用一些。
<!--more-->


## WebGL与Three.js对比
既然有了`WebGL`，我们为什么还需要`Three.js`？ 
这是因为`WebGL`门槛相对较高，需要相对较多的数学知识。虽然`WebGL`提供的是面向前端的API，但本质上`WebGL`跟前端开发完全是两个不同的方向，知识的重叠很少。相关性只是他们都在web平台上，都是用`javascript`而已。一个前端程序员或许还熟悉解析几何，但是还熟悉线性代数的应该寥寥无几了（比如求个逆转置矩阵试试？），更何况使用中强调矩阵运算中的物理意义，这在教学中也是比较缺失的。 
因此，前端工程师想要短时间上手`WebGL`还是挺有难度的。 
于是，`Three.js`对`WebGL`提供的接口进行了非常好的封装，简化了很多细节，大大降低了学习成本。并且，几乎没有损失`WebGL`的灵活性。 
因此，从`Three.js`入手是值得推荐的，这可以让你在较短的学习后就能面对大部分需求场景。



## Three.js的学习问题
Three.js的入门是相对简单的，但是当我们真的去学的时候，会发现一个很尴尬的问题：相关的学习资料很少。 
通常这种流行的库都有很完善的文档，很多时候跟着官方的文档或官方的入门教程学习就是最好的路线。但Three不是的，它的文档对初学者来说太过简明扼要。 
不过官方提供了非常丰富的examples，几乎所有你需要的用法都在某个example中有所体现。但这些example不太适合用来入门，倒是适合入门之后的进一步学习。
### 推荐学习文档和网址
[Three.js入门指南](http://www.ituring.com.cn/book/1272)
[Three.js开发指南(第一版中文版)](https://book.douban.com/subject/26349497/)
[Learning Three.js](https://book.douban.com/subject/26363542/)
是现在不多的也是最好的Three.js入门书，比较全面地讲解了Three.js的各种功能。如果有能力的话，建议阅读英文版第二版，出版于2015年，与现在的Three.js区别很小。 
中文版翻译自出版于2012年的原书第一版，大部分概念是适用的，但很多细节已经有所改变。 
[Three.js入门教程](http://www.cnblogs.com/yiyezhai/category/447410.html)
这是对国外一份教程的翻译，一共六篇文章。讲解不多，更多的是展示各个基本功能怎么用。更适合有一些图形基础的同学。


## Three.js中的一些概念
Three中称之为`场景(Scene)`选择一个观察点，并确定观察方向/角度等 
Three中称之为`相机(Camera)`在场景中添加供观察的物体 
Three中的物体有很多种，包括`Mesh,Line,Points`等，它们都继承自`Object3D类`将观察到的场景渲染到屏幕上的指定区域 
Three中使用`Renderer`完成这一工作

### Scene
场景是所有物体的容器，也对应着我们创建的三维世界。

### Camera 坐标系
`Camera`是三维世界中的观察者，为了观察这个世界，首先我们要描述空间中的位置。
![Camera 坐标系](1f643e94/1.png)
`Three`中使用采用常见的右手坐标系定位。

### 三维投影
`Three`中的相机有两种，分别是正投影相机`THREE.OrthographicCamera`和透视投影相机`THREE.PerspectiveCamera`。 
![三维投影](1f643e94/2.png)
正交投影与透视投影的区别如上图所示，左图是正交投影，物体发出的光平行地投射到屏幕上，远近的方块都是一样大的；右图是透视投影，近大远小，符合我们平时看东西的感觉。 

### 正交投影相机
![正交投影相机](1f643e94/3.png)
注：图中的”视点”对应着Three中的Camera。
这里补充一个视景体的概念：视景体是一个几何体，只有视景体内的物体才会被我们看到，视景体之外的物体将被裁剪掉。这是为了去除不必要的运算。 
正交投影相机的视景体是一个长方体，OrthographicCamera的构造函数是这样的：OrthographicCamera( left, right, top, bottom, near, far ) 
Camera本身可以看作是一个点，left则表示左平面在左右方向上与Camera的距离。另外几个参数同理。于是六个参数分别定义了视景体六个面的位置。
可以近似地认为，视景体里的物体平行投影到近平面上，然后近平面上的图像被渲染到屏幕上。


### 透视投影相机
![透视投影相机](1f643e94/4.png)
透视投影相机的视景体是个四棱台，它的构造函数是这样的：`PerspectiveCamera(fov, aspect, near, far)`。
fov对应着图中的视角，是上下两面的夹角。`aspect`是近平面的宽高比。在加上近平面距离`near`，远平面距离`far`，就可以唯一确定这个视景体了。 
透视投影相机很符合我们通常的看东西的感觉，因此大多数情况下我们都是用透视投影相机展示3D效果。


### Objects
有了相机，总要看点什么吧？在场景中添加一些物体吧。 
Three中供显示的物体有很多，它们都继承自Object3D类，这里我们主要看一下Mesh和Points两种。


### Mesh
我们都知道，计算机的世界里，一条弧线是由有限个点构成的有限条线段连接得到的。线段很多时，看起来就是一条平滑的弧线了。 
计算机中的三维模型也是类似的，普遍的做法是用三角形组成的网格来描述，我们把这种模型称之为Mesh模型。 

这是那只著名的斯坦福兔子。它在3D图形中的地位与数字图像处理领域中著名的lena是类似的。 
看这只兔子，随着三角形数量的增加，它的表面越来越平滑/准确。
在Three中，Mesh的构造函数是这样的：Mesh( geometry, material ) 
geometry是它的形状，material是它的材质。 
不止是Mesh，创建很多物体都要用到这两个属性。下面我们来看看这两个重要的属性。

#### Geometry
Geometry，形状，相当直观。Geometry通过存储模型用到的点集和点间关系(哪些点构成一个三角形)来达到描述物体形状的目的。 
Three提供了立方体(其实是长方体)、平面(其实是长方形)、球体、圆形、圆柱、圆台等许多基本形状； 
你也可以通过自己定义每个点的位置来构造形状； 
对于比较复杂的形状，我们还可以通过外部的模型文件导入。

#### Material
Material，材质，这就没有形状那么直观了。 
材质其实是物体表面除了形状以为所有可视属性的集合，例如色彩、纹理、光滑度、透明度、反射率、折射率、发光度。 
这里讲一下材质(Material)、贴图(Map)和纹理(Texture)的关系。 
材质上面已经提到了，它包括了贴图以及其它。 
贴图其实是‘贴'和‘图'，它包括了图片和图片应当贴到什么位置。 
纹理嘛，其实就是‘图'了。 
Three提供了多种材质可供选择，能够自由地选择漫反射/镜面反射等材质。

### Points
讲完了Mesh，我们来看看另一种Object——Points。 
Points其实就是一堆点的集合，它在之前很长时间都被称为ParticleSystem(粒子系统)，r68版本时更名为PointCloud,r72版本时才更名为Points。更名主要是因为，Mr.doob认为，粒子系统应当是包括粒子和相关的物理特性的处理的一套完整体系，而Three中的Points简单得多。因此最终这个类被命名为Points。 
Points能够用来实现的典型效果是这样的：官方example

### Light
神说：要有光！ 
光影效果是让画面丰富的重要因素。 
Three提供了包括环境光AmbientLight、点光源PointLight、 聚光灯SpotLight、方向光DirectionalLight、半球光HemisphereLight等多种光源。 
只要在场景中添加需要的光源就好了。

### Renderer
在场景中建立了各种物体，也有了光，还有观察物体的相机，是时候把看到的东西渲染到屏幕上了。这就是Render做的事情了。 
Renderer绑定一个canvas对象，并可以设置大小，默认背景颜色等属性。 
调用Renderer的render函数，传入scene和camera，就可以把图像渲染到canvas中了。


## 让画面动起来
现在，一个静态的画面已经可以得到了，怎么才能让它动起来？ 
很简单的想法，改变场景中object的位置啊角度啊各种属性，然后重新调用render函数渲染就好了。 
那么重新渲染的时机怎么确定？ 
HTML5为我们提供了requestAnimFrame，它会自动在每次页面重绘前调用传入的函数。 
如果我们一开始这样渲染：
```
function render() {
 renderer.render(scene, camera);
}
```
只需要改成这样：
```
function render() {
 requestAnimationFrame(render);
 object.position.x += 1;
 renderer.render(scene, camera);
}
```
object就可以动起来了！举个栗子
下面我们用一个简单的例子来梳理一下这个过程。 
首先写一个有Canvas元素的页面吧。
```
<!DOCTYPE html>
<html>
<head>
 <meta charset="UTF-8">
 <title>立方体</title>
 <script src="http://sqimg.qq.com/qq_product_operations/mma/javanli_test/lib/three.min.js"></script>
 <style type="text/css">
 html, body {
 margin: 0;
 padding: 0;
 }
 #three_canvas {
 position: absolute;
 width: 100%;
 height: 100%;
 }
 </style>
</head>
<body>
 <canvas id="three_canvas"></canvas>
</body>
</html>
```
下面来做Javascript的部分，首先初始化`Renderer`
```
function initRenderer() {
 width = document.getElementById('three_canvas').clientWidth;
 height = document.getElementById('three_canvas').clientHeight;
 renderer = new THREE.WebGLRenderer({
 //将Canvas绑定到renderer
 canvas: document.getElementById('three_canvas')
 });
 renderer.setSize(width, height);//将渲染的大小设为与Canvas相同
 renderer.setClearColor(0xFFFFFF, 1.0);//设置默认颜色与透明度
}
```
初始化场景:
```
function initScene() {
 scene = new THREE.Scene();
}
```
初始化相机：
```
function initCamera() {
 //简单的正交投影相机，正对着视口的中心，视口大小与Canvas大小相同。
 camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
 //设置相机的位置
 camera.position.x = 0;
 camera.position.y = 0;
 camera.position.z = 200;
 //设置相机的上方向
 camera.up.x = 0;
 camera.up.y = 1;
 camera.up.z = 0;
 //设置相机聚焦的位置(其实就是确定一个方向)
 camera.lookAt({
 x: 0,
 y: 0,
 z: 0
 });
}
```
要唯一确定一个相机的位置与方向，position、up、lookAt三个属性是缺一不可的。 
这里我们创建了一个正交投影相机，这里我将视景体大小与屏幕分辨率保持一致只是为了方便，这样坐标系中的一个单位长度就对应屏幕的一个像素了。 
我们将相机放在Z轴上，面向坐标原点，相机的上方向为Y轴方向，注意up的方向和lookAt的方向必然是垂直的（类比自己的头就知道了）。
下面添加一个立方体到场景中：
```
function initObject() {
 //创建一个边长为100的立方体
 var geometry = new THREE.CubeGeometry(100, 100, 100);
 object = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
 scene.add(object);
}
```
注意我们使用了法向材质MeshNormalMaterial，这样立方体每个面的颜色与这个面对着的方向是相关的，更便于观察/调试。
在这个简单的demo里我不打算添加光影效果，而法向材质对光也是没有反应的。 
最后来创建一个动画循环吧
```
function render() {
 requestAnimationFrame(render);
 object.rotation.x += 0.05;
 object.rotation.y += 0.05;
 renderer.render(scene, camera);
}
```
每次重绘都让这个立方体转动一点点。 
当页面加载好时，调用前面这些函数就好了
```
function threeStart() {
 initRenderer();
 initCamera();
 initScene();
 initObject();
 render();
}
window.onload = threeStart();
```
完整的demo是这个样子的：
```
<!DOCTYPE html>
<html>
<head>
 <meta charset="UTF-8">
 <title>立方体</title>
 <script src="http://sqimg.qq.com/qq_product_operations/mma/javanli_test/lib/three.min.js"></script>
 <style type="text/css">
 html, body {
 margin: 0;
 padding: 0;
 }
 
 #three_canvas {
 position: absolute;
 width: 100%;
 height: 100%;
 }
 </style>
</head>
<body>
<canvas id="three_canvas"></canvas>
<script>
 var renderer, camera, scene, light, object;
 var width, height;
 function initRenderer() {
 width = document.getElementById('three_canvas').clientWidth;
 height = document.getElementById('three_canvas').clientHeight;
 renderer = new THREE.WebGLRenderer({
 canvas: document.getElementById('three_canvas')
 });
 renderer.setSize(width, height);
 renderer.setClearColor(0xFFFFFF, 1.0);
 }
 
 function initCamera() {
 camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
 camera.position.x = 0;
 camera.position.y = 0;
 camera.position.z = 200;
 camera.up.x = 0;
 camera.up.y = 1;
 camera.up.z = 0;
 camera.lookAt({
 x: 0,
 y: 0,
 z: 0
 });
 }
 function initScene() {
 scene = new THREE.Scene();
 }
 function initObject() {
 var geometry = new THREE.CubeGeometry(100, 100, 100);
 object = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
 scene.add(object);
 }
 function render() {
 requestAnimationFrame(render);
 object.rotation.x += 0.05;
 object.rotation.y += 0.05;
 renderer.render(scene, camera);
 }
 function threeStart() {
 initRenderer();
 initCamera();
 initScene();
 initObject();
 render();
 }
 window.onload = threeStart();
</script>
</body>
</html>
```
保存为html后打开，在屏幕中央会显示这样一个转动的立方体 
![一个转动的立方体](1f643e94/5.png)


## 小结
对`Three.js`的介绍就到这里了，本文对Three中的重要组件基本上都有提到。其实想要总结的东西还有很多，但写在这一篇里可能会显得很累赘，这篇文章的初衷是想要读者读后对`Three.js`有一个直观的大体上的理解，并不打算牵涉太多细节。