---
layout: page # 或者其他适合独立页面的布局
title: Tags
permalink: /tags/
---

{% for tag in site.tags %}
  <h2 id="{{ tag | first | slugify }}">{{ tag | first }}</h2>
  <ul>
    {% for post in tag | last %}
      <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}