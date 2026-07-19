---
layout: page
permalink: /awards/
title: 奖励荣誉
nav: true
nav_order: 5
description: 教学与科研奖励
---

<ul class="awards">
{% for a in site.data.awards.awards %}
  <li><strong>{{ a.year }}</strong> · {{ a.title }}</li>
{% endfor %}
</ul>
