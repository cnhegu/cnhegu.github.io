---
layout: page
title: Tags
permalink: /tags/
---

<h1>所有标签</h1>

{% assign tags = site.tags | sort %}
{% for tag in tags %}
  <h2 id="{{ tag | slugify }}">{{ tag }}</h2>
  <ul>
    {% for post in site.tags[tag] %}
      <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %} 