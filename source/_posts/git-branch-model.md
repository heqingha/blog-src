---
title: git分支模型
author: 江湖再见
avatar: /images/pangrui.png
authorLink: 'http://www.ruizhengyun.cn/blog/about/'
authorAbout: 'http://www.ruizhengyun.cn/blog/about'
authorDesc: 不论码不码代码，都要做一枚快乐的前端
categories: 编程
keywords: git-branch-model
description: git-branch-model
photos: /img/2015/git.png
abbrlink: 510aee54
date: 2018-12-06 14:32:03
tags:
- javascript
---

利用git管理项目代码是件好事，说明有版本意识。既然用了git了，不妨更进一步，学会用分支模型来完善下，毕竟大项目（大产品）是有很多复杂情况的。

<img src="./510aee54/1.jpeg" alt="分支模型" style="max-width: 500px;" />

## 先说下分支模型
- **master**：发布到生产的代码
- **develop**：预发布到生产的代码
- **release**：新版本发布到生产的代码
- **feature**：新需求开发代码
- **hotfix**：紧急修复生产bug的代码


## 场景-时间线
当前分支状态_app+版本号_发版日期（年月日） => feature_app1.1.0_181001
1.新需求来了。这时候看下远程仓库有没有这个新需求的分支（feature_app1.1.0_190101-feature_app版本号_身份标识）。有的话checkout这个分支到本地开发，没有的话就从develop分支创建新的feature分支（feature_app1.1.0_190101）。

2.所有需求开发完了（此刻在feature_app1.1.0_190101分支）。高高兴兴提测，一会儿，测试MM给你提bug，这时你得继续在feature_app1.1.0_190101分支上改bug。

3.发版前一天。经过n轮测试，测试MM说准备上预发，这时，就得把feature_app1.1.0_190101分支合并到develop分支上，然后**从develop分支上创建新分支release_app1.1.0_190101**。

4.发版日一大早，测试MM又做了一次回归测试，发现一bug。不急，一切不是生产bug都是小问题，这时就在release_app1.1.0_190101分支上修复bug（不是feature_app1.1.0_190101分支，因为已经提测了，此刻feature_app1.1.0_190101分支除了看提交记录没啥用了）。

5.发版了。测试MM在生产上回归了下，发现一个bug。不急，这时继续在release_app1.1.0_190101分支修复bug，然后打包发版本。

6.发版总算成功了。这时别忘了把release_app1.1.0_190101分支合并到develop分支和master分支。**如果190101版本后面还有版本的话，记得把develop分支合并过去（这里代码有冲突可能性比较大，因为会涉及到同一文件多处修改，需要找到这个冲突文件的开发者，一同解决冲突问题）**

7.第二天一上班，线上报错了，翁的一声。这时，莫慌，先解决问题。从master分支创建一个分支hotfix_app1.1.1_190102，修复后打包上线，然后将hotfix_app1.1.1_190102分支合并到develop分支和master分支，别忘了还有190101后面的版本分支。

总体流程大致这样，不同公司在分支操作上略有差异，但是思路大体相同。这些小的差别无需计较太多。