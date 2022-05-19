---
layout: project
title: Worker News
date: 16 Feb 2022
image:
  path: /assets/img/projects/worker-news.jpg
  srcset:
    2559w: /assets/img/projects/worker-news.jpg
    1280w: /assets/img/projects/worker-news@0,5x.jpg
    640w:  /assets/img/projects/worker-news@0,25x.jpg
links:
  - title: Website
    url: https://worker-news.deno.dev
  - title: GitHub
    url: https://github.com/worker-tools/worker-news
caption: A drop-in replacement* for Hacker News
description: >
  Worker News is a drop-in replacement* for Hacker News with support for dark mode and block quotes.
invert_sidebar:        true
---

A drop in replacement for Hacker News with support for dark mode, quotes in comments, user identicons and submission favicons. 

## What's cool about this?
- Developed against a generic [Worker Runtime](https://workers.js.org) so that it can run on Cloudflare Workers, Deno Deploy and even the browser's Service Worker.
- Can be installed + offline support: Same code that runs on the edge powers the PWA.
- Everything is stream/async generator-based: API calls, HTML scraping, HTML responses, even JSON stringification and parsing.
- Supports 3 API backends: HTML scraping from news.ycombinator.com, HTTP requests to HN API and HN API via Firebase.
- Built using my own web framework, [Worker Tools](https://workers.tools), which is specifically developed to run across CF Workers, Deno and Service Workers.