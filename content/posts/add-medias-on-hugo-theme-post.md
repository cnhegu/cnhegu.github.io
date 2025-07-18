---
title: "在Hugo中添加图片和视频的方式"
date: 2025-07-17T19:35:00+08:00
draft: false
tags: ["hugo","媒体内容","Tips"]
categories: ["HugoTips"]
---

在 Hugo 中添加图片和视频，主要有两种方式：一种是简单直接的“静态资源”方法，另一种是更规范、更推荐的“页面捆绑”方式。对于视频，最好的方式是嵌入外部平台的播放器。

---

## 一、添加图片

### 方法一：放在 static 文件夹（最简单）

这是最直接的方法，适合存放一些全站通用的图片，比如你的头像、logo 等。

**存放图片步骤：**

1. 在博客根目录下找到 `static` 文件夹。
2. 建议在其中创建一个名为 `images` 的子文件夹。
3. 将图片（例如 `my-cat.jpg`）放入 `static/images/` 文件夹中。

最终路径为：

```
static/images/my-cat.jpg
```

**在文章中引用图片：**

使用标准 Markdown 语法，并从根目录开始写路径：

```markdown
![我的猫](/images/my-cat.jpg)
```

说明：

- `[]` 中的是图片的替代文字（alt text），当图片无法显示时会显示这段文字，对 SEO 也有帮助。
- 路径从 `/` 开头，代表网站根目录。

---

### 方法二：使用“页面捆绑”（Page Bundles）【推荐】

此方法更整洁，特别适合存放只属于某篇文章的图片，能将文章与资源打包在一起，便于管理和迁移。

**文件结构示例：**

假设你要写一篇名为 `my-trip` 的文章：

```
content/
└── posts/
    └── my-trip/
        ├── index.md           （文章内容）
        └── trip-photo-1.jpg   （相关图片）
```

步骤如下：

1. 在 `content/posts/` 下创建一个名为 `my-trip` 的文件夹。
2. 把文章文件命名为 `index.md` 并放入该文件夹。
3. 把相关图片一同放入该文件夹。

**引用图片：**

在 `index.md` 文件中，直接写文件名即可：

```markdown
![旅途中的风景](trip-photo-1.jpg)
```

Hugo 会自动寻找当前文章目录下的资源。

---

### 小结：选择哪种方式？

- **方法一（static）：** 适合用于网站通用资源，如头像、Logo 等。
- **方法二（页面捆绑）：** 推荐用于特定文章所需的图片，让项目结构更有条理。

---

## 二、添加视频

直接上传视频文件到仓库并不可取，因为体积大，不利于管理和加载。

### 推荐方式：使用外部平台嵌入播放器

如 YouTube、Bilibili、Vimeo 等。

**获取嵌入代码（以 YouTube 为例）：**

1. 打开视频页面，点击“分享”按钮。
2. 选择“嵌入”，复制生成的 `<iframe>` 代码。

**将 HTML 粘贴到 Markdown 中：**

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID"
title="YouTube video player" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>
```

你可以修改 `width` 和 `height` 调整视频大小。

---

### 进阶技巧：使用 Hugo Shortcode（简码）

很多主题（包括 `hugo-theme-meme`）支持使用简码方式插入视频，更简洁、响应式更好。

**示例：**

```markdown
{{< youtube VIDEO_ID >}}
```

其中 `VIDEO_ID` 是视频地址中那一串独特字符。

> 如果主题不支持简码，也可以直接使用 `<iframe>` 插入 HTML 视频代码。

最后git push的完整流程及需要注意的地方：
{{< figure src="/images/git-tips.jpg" title="截屏" >}}

_欢迎来到我的数字小屋。_



