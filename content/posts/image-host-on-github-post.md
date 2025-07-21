---
title: "使用GitHub仓库作为免费图床的详细指南"
date: 2025-07-21T12:35:00+08:00
draft: false
tags: ["图床","github","CDN加速"]
categories: ["HugoTips"]
---

### **第一步：创建一个新的、公开的图床仓库**

1. 登录您的 GitHub 账号。  
2. 点击页面右上角的 \+ 号，选择 **New repository**。  
3. **仓库命名**：给这个新仓库起一个清晰的名字，例如 blog-assets 或者 my-images。  
4. **设置为公开（关键）**：确保仓库的属性被设置为 **Public**。  
5. **初始化仓库**：建议勾选 "Add a README file"，这样创建出来的就是一个可以直接使用的仓库。  
6. 点击 **Create repository**。

现在，您就有了一个专门用来存放图片的云端空间了。

<!--more-->

### **第二步：上传图片到图床仓库**

上传图片最简单的方式就是直接使用 GitHub 的网页界面。

![我的github图床截图] https://cdn.jsdelivr.net/gh/cnhegu/my-images@main/posts/image-host-on-github-post/image-host-on-github-post.jpg

1. 进入您刚刚创建的 blog-assets 仓库。  
2. 您可以直接把图片文件拖拽到文件列表区域，也可以点击 **Add file** \-\> **Upload files**。  
3. **（可选但推荐）组织文件夹**：为了方便管理，建议您在仓库里也创建文件夹。例如，您可以创建一个 posts 文件夹，然后在里面再为每篇文章创建对应的文件夹来存放图片。  
4. 上传完成后，点击 **Commit changes** 保存。

### **第三步：获取图片的公开链接（最关键的一步）**

直接复制 GitHub 仓库里图片的地址是无法在博客中正常显示的。我们需要使用一个免费的 CDN 加速服务（例如 **jsDelivr**）来生成稳定、高速的图片链接。

链接格式非常固定：  
https://cdn.jsdelivr.net/gh/您的用户名/您的图床仓库名@分支名/图片的路径  
**操作流程**：

1. **您的用户名**：cnhegu  
2. **您的图床仓库名**：假设是 my-images  
3. **分支名**：通常是 main  
4. **图片的路徑**：就是您在仓库中存放图片的完整路径，例如 posts/my-first-post/cat.jpg

将以上信息拼接起来，您得到的最终图片链接就是：  
https://cdn.jsdelivr.net/gh/cnhegu/my-images@main/posts/my-first-post/cat.jpg

### **第四步：在博客文章中引用图片**

现在，您可以在您的 .md 文章文件中，使用标准的 Markdown 语法，插入您刚刚得到的 jsDelivr 链接。

\!\[我的猫\](https://cdn.jsdelivr.net/gh/cnhegu/my-images@main/posts/my-first-post/cat.jpg)

### **优点与注意事项**

* **优点**：完全免费、无限容量、所有图片都享受版本控制、全球 CDN 加速。  
* **注意事项**：  
  * 图床仓库**必须**是公开的。  
  * 强烈推荐使用 **jsDelivr** 生成的链接，它比直接使用 GitHub 的 raw 链接更稳定、速度更快。  
  * 上传到图床的图片，建议先在本地压缩一下，可以提升加载速度。

完成以上步骤后，您就拥有了一个强大、免费且完全在您自己掌控之下的博客图床了。