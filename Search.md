---
layout: default # 使用您的默认布局，确保页面有完整的头部和底部
title: Search
permalink: /search/ # https://www.hegu.me/search/
---

<div class="search-page-container wrapper">
  <h1>博客搜索</h1>
  <p>请输入关键词来搜索本站文章：</p>

  <script async src="https://cse.google.com/cse.js?cx=074c567a6be944011">
</script>
<div class="gcse-search"></div>

</div>

<style>
  /* 简单的搜索页面样式，您可以将其添加到 assets/main.css 或其他您的 CSS 文件中 */
  .search-page-container {
    padding: 40px; /* 增加内边距 */
    margin-top: 30px; /* 顶部外边距 */
    margin-bottom: 30px; /* 底部外边距 */
    /* background 和 shadow 样式会继承自 .wrapper */
  }
  .search-page-container h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  .search-page-container p {
    text-align: center;
    margin-bottom: 30px;
  }
  /* 您可能需要根据您的主题调整 Google CSE 元素的样式 */
  .gsc-control-cse {
    margin-top: 20px;
  }
</style>