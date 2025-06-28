---
layout: page # 确保这里是您博客的页面布局，通常是 'page' 或 'default'
title: Tags
permalink: /tags/ # 这是标签页面的 URL，例如 https://www.hegu.me/tags/
---

<h1>所有标签</h1>

{# 获取所有标签，并按标签名称排序 #}
{% assign sorted_tags = site.tags | sort %}

{# 遍历每个标签 #}
{% for tag_item in sorted_tags %}
  {# tag_item 是一个数组，例如 ["Github", [post1, post2]] #}

  {% assign tag_name = tag_item[0] %} {# 获取标签的实际名称字符串，例如 "Github" #}
  {% assign posts_for_tag = tag_item[1] %} {# 获取该标签下的文章列表 #}

  <h2 id="{{ tag_name | slugify }}">{{ tag_name }}</h2> {# 对标签名称字符串使用 slugify 过滤器 #}
  <ul>
    {% for post in posts_for_tag %}
      <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %} 