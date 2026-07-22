---
layout: page
title: 科研项目
permalink: /projects/
description: 主持与参与的科研项目。
nav: true
nav_order: 3
---

{% assign projects_sorted = site.projects | sort: "importance" %}

{% assign hosted = projects_sorted | where: "category", "主持" %}
{% assign participated = projects_sorted | where: "category", "参与" %}

{% if hosted.size > 0 %}
<h2 class="category">主持</h2>
<ol class="project-list">
{% for p in hosted %}
  <li>{{ p.description }}，<strong>{{ p.title }}</strong>，{{ p.period }}，{{ p.funding }}，{{ p.role }}</li>
{% endfor %}
</ol>
{% endif %}

{% if participated.size > 0 %}
<h2 class="category">参与</h2>
<ol class="project-list">
{% for p in participated %}
  <li>{{ p.description }}，<strong>{{ p.title }}</strong>，{{ p.period }}，{{ p.funding }}，{{ p.role }}</li>
{% endfor %}
</ol>
{% endif %}
