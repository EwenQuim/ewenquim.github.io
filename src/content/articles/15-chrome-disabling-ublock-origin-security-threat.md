---
date: 2024-12-06
title: "Chrome disabling uBlock Origin is a serious security threat"
description: "Google's decision to disable uBlock Origin on Chrome leaves millions of users vulnerable to malicious ads and security threats, especially affecting elderly and non-tech-savvy users"
heroImage: /UBlock_Origin.png
categories:
  - tech
  - security
tags:
  - Chrome
  - uBlock Origin
  - Security
  - Privacy
  - Ad Blocking
  - Manifest V3
toc: true
---

**TL;DR:** Google's recent decision to disable the popular ad-blocking extension uBlock Origin on Chrome is raising significant concerns about user security. This move has left many users vulnerable to a sudden influx of malicious ads that they weren't accustomed to seeing. We tech-savvy folks need to educate our friends and family about the dangers of the internet, but it would be nice if Google provided a more user-friendly solution for installing alternative ad-blockers.

> Shameless personal ad: Building an API? Try [Fuego](https://github.com/go-fuego/fuego), the FastAPI-like framework for the Go programming language!

## When it happens for real

Let me share a story that hits close to home. My _relative_ (I'll withhold her identity for her safety), who isn't very tech-savvy, had been using uBlock Origin for years to browse the web ad-free. Recently, she saw a tooltip in Chrome suggesting she disable uBlock Origin. Trusting the recommendation, she did so without realizing the consequences.

Shortly after, while browsing, she encountered a pop-up that looked like a Windows warning, claiming her computer was compromised. It was the first time in her life she had seen something like this—uBlock had always protected her from such ads. Panicked, she followed the instructions, which included pressing Windows+R to open the Run command and pasting a command that had been automatically copied to her clipboard from the malicious website.

The command installed malware/adware, but fortunately, I was able to quickly remove it from her computer.

## Unforeseen Consequences

For millions of elderly users and those less familiar with technology, uBlock Origin has been a lifesaver. I installed it on all my relatives' browsers. It blocks ads, cookies, warnings, and overlays, providing a crucial layer of protection against malicious and deceptive content. With Chrome disabling uBlock Origin, however, these users are suddenly exposed to a barrage of ads, some of which can be both deceptive and harmful.

## Next Steps

There are a few alternatives available. Unfortunately, moving to Firefox may not be a viable option for her, because she's 80 yo and so used to the Chrome UI. However, users can install other ad-blocking applications that are compatible with Manifest V3. It is important to note that these alternatives may not be as effective as uBlock Origin, as they are designed to comply with Google's new standards—which are more lenient toward ads, especially Google's ads, of course.

I understand that I should educate my relative about the dark side of the internet, but that takes time, and even then, it isn't foolproof, whereas uBlock was.

It would be nice if Google proposed a method for installing alternative ad-blockers instead of leaving our elders unprotected.

> Sorry for my bad English—here's a happy gopher for you. And please try [Fuego](https://github.com/go-fuego/fuego)!

![Gopher](/dancing-gopher.gif)
