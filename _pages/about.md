---
layout: about
title: 首页
permalink: /
subtitle: <a href='https://xxgc.tjnu.edu.cn/info/1166/3643.htm'>天津师范大学 计算机与信息工程学院</a> · 副教授 · 硕士生导师

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>天津师范大学</p>
    <p>计算机与信息工程学院</p>
    <p>邮箱：superlee@tjnu.edu.cn</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: false
  limit: 3
---

{% assign p = site.data.profile %}
**{{ p.name }}**（{{ p.name_en }}），{{ p.affiliation }}{{ p.title }}，{{ p.degree }}。{{ p.societies | join: "、" }}。{{ p.bio }}

**研究方向**：{{ p.research_interests | join: "、" }}

**联系邮箱**：<a href="mailto:{{ p.email }}">{{ p.email }}</a>

欢迎对情感计算、脑机接口方向感兴趣的同学报考研究生！
