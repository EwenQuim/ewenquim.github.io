---
date: 2021-01-28
title: My own git server
categories:
  - memo
tags:
  - git
toc: true
---

You can find it [here](https://git.amethysts.studio) if it is available.

![website status](https://img.shields.io/website?down_message=offline&label=git%20server&up_message=available&url=https%3A%2F%2Fgit.amethysts.studio)

## How it is made

I used [gitea](https://gitea.io/), docker version. It runs on my own VM hosted by OVH.

I set up an nginx reverse proxy + https with certbot.

## Why I made that

I think it is really cool to have my own git server. Plus, setup was interesting and I learnt some things!

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
