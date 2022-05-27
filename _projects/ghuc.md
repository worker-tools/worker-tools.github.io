---
layout: project
title: ghuc.cc
date: 16 Feb 2022
image:
  path: /assets/img/projects/ghuc.jpg
  srcset:
    2559w: /assets/img/projects/ghuc.jpg
    1280w: /assets/img/projects/ghuc@0,5x.jpg
    640w:  /assets/img/projects/ghuc@0,25x.jpg
links:
  - title: Website
    url: https://ghuc.cc
  - title: Source
    url: https://github.com/worker-tools/ghuc.cc
caption: Your friendly neighborhood redirection service
description: >
  Your friendly neighborhood redirection service for **Deno** 🦕 to import code directly from GitHub.
accent_image:
  background:          'linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(to bottom, #e9bc4b, #f38020)'
  overlay:             false
accent_color:          rgb(243,128,32)
theme_color:           '#ee9b33'
invert_sidebar:        true
---

# ghuc.cc
Your friendly neighborhood redirection service for **Deno** 🦕 to import code directly from GitHub.

> ghuc.cc = GitHub User Content Carbon Copy

Use the concise and familiar API you know and love from unpkg, skypack and esm.sh for any GitHub repository, e.g.:

<https://ghuc.cc/worker-tools/middleware@0.1.0-pre.10/index.ts>

redirects to `https://raw.githubusercontent.com/worker-tools/middleware/v0.1.0-pre.10/index.ts`[^1]. 

Because GHUC.cc _keeps it simple_ and uses redirects you don't have to worry about it reaching GH API rate limits, etc.

GHUC.cc accepts any GitHub tag or branch as a version specifier. For example, to redirect to the `dev` branch use `worker-tools/middleware@dev/index.ts`

You can also leave out the version suffix, in which case GHUC.cc will redirect to the repository's default branch:

<https://ghuc.cc/worker-tools/router/index.ts>


[^1]: Note that the version suffix was interpreted as a git tag starting with `v`, which is common practice for JS repositories.
      If a repository uses bare version tags, you can append a `!` to prevent this behavior.
      E.g. `https://ghuc.cc/user/repo@1.0.0!/index.ts` redirects to a tag with the name `1.0.0`.
