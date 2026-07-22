---
layout: about
title: 首页
permalink: /
subtitle: <a href='https://xxgc.tjnu.edu.cn/info/1166/3643.htm'>天津师范大学 计算机与信息工程学院</a> · 副教授 · 硕士生导师

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false

selected_papers: true
social: true

announcements:
  enabled: true
  scrollable: true
  limit: 5

latest_posts:
  enabled: false
---

{% assign p = site.data.profile %}

<div class="bio-section">
  <p><strong>{{ p.name }}</strong>（{{ p.name_en }}），工学博士，{{ p.affiliation }}{{ p.title }}。{{ p.societies | join: "、" }}。{{ p.bio }}</p>

  <p>
    <strong>研究方向</strong>：{{ p.research_interests | join: "、" }}
    &nbsp;·&nbsp;
    <a href="mailto:{{ p.email }}">{{ p.email }}</a>
    &nbsp;·&nbsp;
    欢迎对情感计算、脑机接口方向感兴趣的同学报考研究生！
  </p>
</div>

<!-- 快速导航卡片 -->
<div class="section-nav-grid">
  <a href="{{ '/publications/' | relative_url }}" class="section-nav-card">
    <span class="nav-icon">📄</span>
    <span class="nav-title">论文发表</span>
    <span class="nav-desc">{{ site.data.awards.awards | size }} 篇期刊/会议论文</span>
    <span class="nav-more">more →</span>
  </a>
  <a href="{{ '/projects/' | relative_url }}" class="section-nav-card">
    <span class="nav-icon">🔬</span>
    <span class="nav-title">科研项目</span>
    <span class="nav-desc">主持国家级项目 3 项、省部级项目多项</span>
    <span class="nav-more">more →</span>
  </a>
  <a href="{{ '/teaching/' | relative_url }}" class="section-nav-card">
    <span class="nav-icon">📖</span>
    <span class="nav-title">教学课程</span>
    <span class="nav-desc">数据结构、Python、C 语言、C++</span>
    <span class="nav-more">more →</span>
  </a>
  <a href="{{ '/awards/' | relative_url }}" class="section-nav-card">
    <span class="nav-icon">🏆</span>
    <span class="nav-title">奖励荣誉</span>
    <span class="nav-desc">青教赛一等奖、教学创新大赛二等奖等</span>
    <span class="nav-more">more →</span>
  </a>
</div>
