---
layout: page # 确保这里是您博客的页面布局，通常是 'page' 或 'default'
title: Tags
permalink: /tags/ # 这是标签页面的 URL，例如 https://www.hegu.me/tags/
description: 这里是何故小站的标签归档页面，按标签浏览所有文章。
---

<h1>标签归档</h1>

<p>
  {% assign sorted_tags = site.tags | sort %}
  {% for tag_item in sorted_tags %}
    <a href="#{{ tag_item[0] | slugify }}" style="margin-right:12px;">
      {{ tag_item[0] }} <span style="color:#888;">({{ tag_item[1].size }})</span>
    </a>
  {% endfor %}
</p>
<hr>

{% for tag_item in sorted_tags %}
  {% assign tag_name = tag_item[0] %}
  {% assign posts_for_tag = tag_item[1] %}
  <h2 id="{{ tag_name | slugify }}">{{ tag_name }} <span style="color:#888;">({{ posts_for_tag.size }})</span></h2>
  <ul>
    {% for post in posts_for_tag %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <span style="color:#aaa;font-size:0.9em;">{{ post.date | date: "%Y-%m-%d" }}</span>
      </li>
    {% endfor %}
  </ul>
{% endfor %}


