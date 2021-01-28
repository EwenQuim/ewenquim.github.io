---
date: 2020-03-01
lastmod: 2021-01-26
title: My own git server
authors: ["ewenquim"]
categories:
  - memo
tags:
  - git
toc: true
---

You can find it [here](https://git.amethysts.studio)

Made with gitea, docker version.

I set up an nginx reverse proxy for pretty domain name (without port) + https with certbot.

> I learnt about _client_max_body_size_ in Nginx options which were limiting the maximum repo upload size.
