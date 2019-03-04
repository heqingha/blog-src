---
title: git入门
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
photos: /img/2015/git.jpg
abbrlink: 1cd96b33
date: 2015-01-01 12:37:02
tags: git
keywords:
description:
---
## 创建版本库
* 初始化
```
git init                    初始化一个Git仓库
```

* 添加/提交
```
git add <file>              添加文件，可反复多次使用（没消息就是最好的消息）
git commit -m "remark"      提交到Git仓库及其提交内容-m ""
```


## 版本回退
* 查看
```
git status                  查看仓库当前状态
git diff                    查看具体修改了哪些内容，顾名思义就是查看difference
git log                     查看提交历史（显示从最近到最远的提交日志）
git log --pretty=oneline    查看命令历史（如果嫌输出信息太多，看得眼花缭乱的）
git reflog                  记录你的每一次命令，用于回退之后后悔用
```

* 回退/撤回
```
git reset --hard HEAD^      回退到上一版本，回退2个版本就^^,100个就100个^,也可以~100
git reset --hard <commitId> 回退之后后悔了，可用commitId撤回，所以回退之前先git log下
```

* 删除
```
git rm <file>               删除一个文件
```

## 工作区和暂存区
```
.git 隐藏目录不算工作区，而是Git的版本库。
```


## 名词解释
state/index 暂存区
HEAD 指针
master 分支

![名词解释](1cd96b33/0.jpeg)

* 撤销修改
```
git reset HEAD <file>       撤销暂存区修改
git checkout -- <file>      用版本库里的版本替换工作区的版本（无论工作区修改还是删除， 都可以一键还原）
```

## github
由于你的本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，所以，需要一点设置：
1、创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：
```
$ ssh-keygen -t rsa -C "youremail@example.com"
```
你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。

如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。

2、登陆GitHub，打开“Account settings”，“SSH Keys”页面：
然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容：
![登陆GitHub](1cd96b33/1.png)
点“Add Key”，你就应该看到已经添加的Key：
![Add Key](1cd96b33/2.png)

为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。

当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。

最后友情提示，在GitHub上免费托管的Git仓库，任何人都可以看到喔（但只有你自己才能改）。所以，不要把敏感信息放进去。

如果你不想让别人看到Git库，有两个办法，一个是交点保护费，让GitHub把公开的仓库变成私有的，这样别人就看不见了（不可读更不可写）。另一个办法是自己动手，搭一个Git服务器，因为是你自己的Git服务器，所以别人也是看不见的。公司内部开发必备。

确保你拥有一个GitHub账号后，我们就即将开始远程仓库的学习。

## 远程仓库
```
git branch -r   远程仓库
git branch -a   所有仓库
```
### 添加远程库
在github上新建一个空白库

关联一个远程库，使用命令git remote add origin git@server-name:path/repo-name.git

关联后，使用命令git push -u origin master第一次推送master分支的所有内容；

此后，每次本地提交后，只要有必要，就可以使用命令git push origin master推送最新修改；

分布式版本系统的最大好处之一是在本地工作完全不需要考虑远程库的存在，也就是有没有联网都可以正常工作，而SVN在没有联网的时候是拒绝干活的！当有网络的时候，再把本地提交推送一下就完成了同步，真是太方便了！

### 克隆远程库
```
git clone git@github.com:michaelliao/gitskills.git
```


## 分支管理
HEAD指向当前分支，当前分支指向提交的。

每次提交，master分支在时间线上就会移动一步，然后HEAD也会跟着移动到最新那一步。

![分支管理](1cd96b33/study-feature-0.png)

当我们创建一个新分支dev时，git新建一个指针dev，指向master相同的提交，再把HEAD指向dev，就表示当前分支是dev
![分支管理](1cd96b33/study-feature-1.png)

这时，有一次提交，dev指针就往前一步，master指针不变。
![分支管理](1cd96b33/study-feature-2.png)

假如我们在dev 上的工作完成了，就可以把dev合并到master上。Git怎么合并呢？最简单的方法，就是直接把master指向dev的当前提交，就完成了合并：
![分支管理](1cd96b33/study-feature-3.png)

所以Git合并分支也很快！就改改指针，工作区内容也不变！合并完分支后，甚至可以删除dev分支。删除分支就是把dev指针给删掉，删掉后，我们就剩下了一条master分支：
![分支管理](1cd96b33/study-feature-4.png)


## 实践
### 切换分支
```
git checkout -b dev // 其实是下面两条命令 $ git branch dev $ git checkout dev
```

### 查看分支
```
git branch
```
文件改动下，然后切换到master分支
![分支管理](1cd96b33/study-feature-5.png)


### 合并分支
现在，我们把dev分支的工作成果合并到master分支上：
```
git merge dev
```
注意到上面的Fast-forward信息，Git告诉我们，这次合并是“快进模式”，也就是直接把master指向dev的当前提交，所以合并速度非常快。

当然，也不是每次合并都能Fast-forward，我们后面会讲其他方式的合并。

合并完成后，就可以放心地删除dev分支了：
```
git branch -d dev
```
删除后，查看branch，就只剩下master分支了：
```
git branch
```
因为创建、合并和删除分支非常快，所以Git鼓励你使用分支完成某个任务，合并后再删掉分支，这和直接在master分支上工作效果是一样的，但过程更安全。


### 解决冲突
在feature1分支和master分支上在同一文件改动，master分支和feature1各自都分别有新的提交，变成了这样：
![分支管理](1cd96b33/study-feature-6.png)

手动解决冲突后再提交。git status也可以告诉我们冲突的文件：
```
git status
```
再提交：
```
git add readme.txt 
git commit -m "conflict fixed"
```

现在，master分支和feature1分支变成了下图所示：
![分支管理](1cd96b33/study-feature-7.png)

用带参数的git log也可以看到分支的合并情况：
```
git log --graph --pretty=oneline --abbrev-commit

```
用git log --graph命令可以看到分支合并图。


### 分支管理策略
新建分支dev做个改动，然后切换到master，准备合并dev分支，请注意–no-ff参数，表示禁用Fast forward。合并分支时，加上–no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并
```
// --no-ff 禁止fast-forward
$  git merge --no-ff -m "merge with no-ff" dev
```

因为本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去。合并后，我们用git log看看分支历史：
```
// graph 图表
// pretty 排版
// abbrev 缩写
$ git log --graph --pretty=online --abbrev-commit
```
可以看到，不使用Fast forward模式，merge后就像这样：
![分支管理](1cd96b33/study-feature-8.png)

分支策略总结

在实际开发中，我们应该按照几个基本原则进行分支管理：

首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；

那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；

你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。

所以，团队合作的分支看起来就像这样：
![分支管理](1cd96b33/study-feature-9.png)

### bug分支
软件开发中，bug就像家常便饭一样。有了bug就需要修复，在Git中，由于分支是如此的强大，所以，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

当你接到一个修复一个代号101的bug的任务时，很自然地，你想创建一个分支issue-101来修复它，但是，等等，当前正在dev上进行的工作还没有提交：
```
git status
```

并不是你不想提交，而是工作只进行到一半，还没法提交，预计完成还需1天时间。但是，必须在两个小时内修复该bug，怎么办？

幸好，Git还提供了一个stash功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：
```
// 暂存
$ git stash
```

现在，用git status查看工作区，就是干净的（除非有没有被Git管理的文件），因此可以放心地创建分支来修复bug。

首先确定要在哪个分支上修复bug，假定需要在master分支上修复，就从master创建临时分支：
```
git checkout master
git checkout -b issue-1
```

修复完成后，切换到master分支，并完成合并，最后删除issue-101分支.现在，是时候接着回到dev分支干活了！工作区是干净的，刚才的工作现场存到哪去了？用git stash list命令看看：
```
git stash list
```
工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：
1、用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；
2、另一种方式是用git stash pop，恢复的同时把stash内容也删了：
```
git stash pop
```
再用git stash list查看，就看不到任何stash内容了


### Feature分支
多人合作新建分支，开发完成后，合并到dev分支上。
没有被合并的分支强行删除$ git breanch -D feature-name


### 多人协作
查看远程库的信息，用
```
$ git remote
// 显示更详细的信息
$ git remote -v
```
上面显示了可以抓取和推送的origin的地址。如果没有推送权限，就看不到push的地址。

### 推送分支
推送分支，就是把该分支上的所有本地提交推送到远程库。
```
git push origin master

```

如果要推送其他分支，比如dev，就改成：
```
git push origin dev

```
但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？

master分支是主分支，因此要时刻与远程同步；

dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；

bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；

feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

总之，就是在Git中，分支完全可以在本地自己藏着玩，是否推送，视你的心情而定！


### 抓取分支
其他人开发，首先clone一下
```
git clone git@github.com:ruizhengyun/git-demo.git
```

目前分支只有master。而现在，你的小伙伴要在dev分支上开发，就必须创建远程origin的dev分支到本地，于是他用这个命令创建本地dev分支：
```
git checkout -b dev origin/dev
```

做了一些修改然后推送到远程dev分支，如此反复多次提交
```
git push origin dev
```

此时，你也改了很多，然后提交dev
推送失败，因为你的小伙伴的最新提交和你试图推送的提交有冲突，解决办法也很简单，Git已经提示我们，先用git pull把最新的提交从origin/dev抓下来，然后，在本地合并，解决冲突，再推送：
```
git pull
```

git pull也失败了，原因是没有指定本地dev分支与远程origin/dev分支的链接，根据提示，设置dev和origin/dev的链接：

```
git branch --set-upstream dev origin/dev
```
再pull：
```
git pull
```
这回git pull成功，但是合并有冲突，需要手动解决，解决的方法和分支管理中的解决冲突完全一样。解决后，提交，再push：
```
git commit -m "merge & fix conflict"
git push origin dev
```
因此，多人协作的工作模式通常是这样：

首先，可以试图用git push origin branch-name推送自己的修改；

如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；

如果合并有冲突，则解决冲突，并在本地提交；

没有冲突或者解决掉冲突后，再用git push origin branch-name推送就能成功！

如果git pull提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令git branch –set-upstream branch-name origin/branch-name。

这就是多人协作的工作模式，一旦熟悉了，就非常简单。

## 标签管理 
### 创建标签
首先，切换到需要打标签的分支上：
```
git branch
```
然后，敲命令git tag 就可以打一个新标签：
```
git tag -a v0.0.1 -m"your description"
git push origin v0.0.1 
```

默认标签是打在最新提交的commit上的。有时候，如果忘了打标签，怎么办？方法是找到历史提交的commit id，然后打上就可以了：
```
git log --pretty=oneline --abbrev-commit
```

比方说要对add merge这次提交打标签，它对应的commit id是6224937，敲入命令：
```
git tag v0.9 6224937
```

再用命令git tag查看标签：
```
git tag
```

注意，标签不是按时间顺序列出，而是按字母排序的。可以用git show 查看标签信息：
```
git show v0.9
```

### 操作标签
命令`git push origin <tagname>`可以推送一个本地标签；

命令`git push origin --tags`可以推送全部未推送过的本地标签；

命令`git tag -d <tagname>`可以删除一个本地标签；

命令`git push origin :refs/tags/<tagname>`可以删除一个远程标签。


## 配置别名
–global参数是全局参数，也就是这些命令在这台电脑的所有Git仓库下都有用。
```
$ git config --global alias.st status
$ git config --global alias.co checkout
$ git config --global alias.ci commit
$ git config --global alias.br branch
$ git config --global alias.last 'log -1'
```

甚至还有人丧心病狂地把lg配置成了：
```
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

在撤销修改一节中，我们知道，命令git reset HEAD file可以把暂存区的修改撤销掉（unstage），重新放回工作区。既然是一个unstage操作，就可以配置一个unstage别名：
```
git config --global alias.unstage 'reset HEAD'
```


## 配置文件

配置Git的时候，加上–global是针对当前用户起作用的，如果不加，那只针对当前的仓库起作用。

配置文件放哪了？每个仓库的Git配置文件都放在.git/config文件中：
```
cat .git/config
```
别名就在[alias]后面，要删除别名，直接把对应的行删掉即可。

而当前用户的Git配置文件放在用户主目录下的一个隐藏文件.gitconfig中：
```
cat .gitconfig
```
