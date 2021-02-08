---
date: 2021-02-07
title: Microsoft Word is trash 🚮
type: draft
categories:
  - memo
tags:
  - git
toc: true
---

You can find it [here](https://git.amethysts.studio) if it is available.

![website status](https://img.shields.io/website?down_message=offline&label=git%20server&up_message=available&url=https%3A%2F%2Fgit.amethysts.studio)

Made with [gitea](https://gitea.io/), docker version.

I set up an nginx reverse proxy for pretty domain name (without port) + https with certbot.

## What I learnt

- **Nginx**: client _max_body_size_ in Nginx options which were limiting the maximum repo upload size.
- **Git**:
  - Uploading to **several git host** with a single line is possible
    - `git remote add all http://... ` just add a repo named _all_
    - `git remote set-url all --add` add another url to the _all_ reference ! A reference can have several urls
  - Why would I do that ?
    - We often add redundancies to running instances, but why not source code ?
    - Easy and add a lot of security
    - It's possible that this git instance disappears in the future
