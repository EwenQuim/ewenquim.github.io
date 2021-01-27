---
date: 2020-03-01
lastmod: 2021-01-26
title: Markdown website
authors: ["ewenquim"]
categories:
  - tech
tags:
  - markdown
toc: true
---

Explanations about the design of my website

## Why choosing a cheap interface

Some like their website to be impressive, full of colors and animations.

Some like their website to be functional, light-weighted and easy to edit.

That's why I don't need Wordpress, or any plugin. This website is **full markdown**. Here's the list of things I enjoy about that.

### Easy to edit

Markdown is the most easy to use WYSIWYG (What You See Is What You Get) editor. So I don't need any preview, or any framework to see what's going to happen after I did some modification. **No fuss**.

### Efficient

You don't really need those animations in your website, do you ? Just get clear and styled information.

### Fast

Access you website even with H+ or a bad 3G connexion.

## How to do that

This objective is a bit unique. When I'm writing an article, I only want to edit local markdown files and push changes.

_What follows may cause you heart attacks, it's really dirty. Be warned._

### Hosting

The code is hosted on Github.

The website in hosted on a personal server, a [Raspberry Pi](https://www.raspberrypi.org/).

The webserver is simply [nginx](https://kinsta.com/knowledgebase/what-is-nginx/) (I use it as a reverse proxy).

I use a personal domain name that points to the Raspy with a simple A field on the DNS zone.

### Markdown

Of course, as browsers cannot read directly markdown (what a shame!). I used the python package [md_to_html](https://pypi.org/project/md-to-html/) to convert them in html.

### Automatization

But I realized it wasn't optimal. Every time I made changes to the local markdown files, they needed to be done on the server html files too! So I (_don't judge me please_) scheduled md to html conversions with `cron` every 5 min. This cron also pull changes. Still not optimal. This looks like an ugly CI but it does the job.

### CSS

I added a simple CSS template to my main folder. But the CSS file needed to be included in all the html files. For that, I used a small python script that locates the `<head>` and insert the `<link rel="stylesheet" type="text/css" href="mystyle.css">` code snippet.

And added this to the cron.

### Edit: now

Now the webserver is hosted on Github Pages. The deployment is done every time I push changes, as it should be. **It's much better now.**
