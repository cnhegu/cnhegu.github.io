---
layout: home
title: Home # 或者你的博客标题
---

<div class="posts">
  {% for post in paginator.posts %}
    <article class="post-item">
      <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
      <h2>
        <a class="post-link" href="{{ post.url | relative_url }}">
          {{ post.title | escape }}
        </a>
      </h2>
      <div class="post-excerpt">
        {{ post.excerpt | strip_html | truncate: 150 }}
        <p><a href="{{ post.url | relative_url }}">阅读更多...</a></p>
      </div>
    </article>
  {% endfor %}

  {% if paginator.total_pages > 1 %}
    <div class="pagination">
      {% if paginator.previous_page %}
        <a href="{{ paginator.previous_page_path | relative_url }}" class="previous">上一页</a>
      {% else %}
        <span class="previous">上一页</span>
      {% endif %}

      <span class="page_number ">第 {{ paginator.page }} 页，共 {{ paginator.total_pages }} 页</span>

      {% if paginator.next_page %}
        <a href="{{ paginator.next_page_path | relative_url }}" class="next">下一页</a>
      {% else %}
        <span class="next">下一页</span>
      {% endif %}
    </div>
  {% endif %}
</div>