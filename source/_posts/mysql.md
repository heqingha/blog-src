---
title: mac安装mysql
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
tags: 工具
abbrlink: 7639256e
date: 2017-12-18 10:32:36
---
## 软件下载
### MySQL
进入 [MySQL官方下载地址](https://dev.mysql.com/downloads/mysql/) ，如图点击“Download”
![MySQL下载](7639256e/mysql.png)
<!--more-->
进入下载页面后，会让你注册或登录，不要在意它，选择下方的“No thanks, just start my download.”
![Mysql下载](7639256e/mysql2.png)


## 软件安装（重点来了）
1、和传统安装软件步骤一样，“下一步”-“下一步”，在“安装”这步注意：系统会有消息通知信息，***复制消息中的初始随机密码，粘贴在一个记事本中，对于后面来说很重要***
2、启动mysql
![Mysql启动](7639256e/mysql3.png)
![Mysql启动](7639256e/mysql4.png)
2、打开终端，配置环境变量
```
cd ~
ls -a (查看有没.bash_profile文件)
sudo vim .bash_profile
```
在 `.bash_profile`中写入
```
# Setting PATH for mysql
export PATH=${PATH}:/usr/local/mysql/bin
```
然后在终端输入
```
source .bash_profile(刷新下环境变量)
mysql -u root -p(这会需要输数据库初始随机密码，就是刚才让你复制的)
这会你会进入mysql>，恭喜，这会你肯定想改掉密码(反人类密码)
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '你的密码' 
     ->;(继续输入英文状态下分号)
mysql> exit;(退出mysql)
再进入mysql
mysql -u root -p(此刻输入的密码就是自己设置的密码)
mysql> show databases;
```

## 说下卸载mysql吧
一段时间没用MySQL，有时突然发现启动不了了，怎么点start都没用，或者输入密码了，还是没用...，只能使用大招了。
1、先卸妆MySQL，终端执行：
```
sudo rm /usr/local/mysql
sudo rm -rf /usr/local/mysql*
sudo rm -rf /Library/StartupItems/MySQLCOM
sudo rm -rf /Library/PreferencePanes/My*
sudo rm -rf /Library/Receipts/mysql*
sudo rm -rf /Library/Receipts/MySQL*
sudo rm -rf /var/db/receipts/com.mysql.*
```
2、然后再去下载mysql软件，看上面。