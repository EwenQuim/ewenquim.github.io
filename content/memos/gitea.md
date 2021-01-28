---
date: 2021-01-28
title: My own git server
authors: ["ewenquim"]
categories:
  - memo
tags:
  - git
toc: true
---

You can find it [here](https://git.amethysts.studio)

Made with [gitea](https://gitea.io/), docker version.

I set up an nginx reverse proxy for pretty domain name (without port) + https with certbot.

## What I learnt

- **Nginx**: client*max_body_size* in Nginx options which were limiting the maximum repo upload size.
- **Git**:
  - Uploading to **several git host** with a single line is possible
    - `git remote add all http://... ` just add a repo named _all_
    - `git remote set-url all --add` add another url to the _all_ reference ! A reference can have several urls
  - Why would I do that ?
    - We often add redundancies to running instances, but why not source code ?
    - Easy and add a lot of security
    - It's possible that this git instance disappears in the future
