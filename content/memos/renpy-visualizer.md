---
date: 2021-02-07
title: Ren'Py Visualizer
type: draft
categories:
  - project
tags:
  - go
  - visualization
toc: true
---

I needed a tool to organize my Ren'Py project.

So I created my own tool in Go (see [the repo](https://github.com/EwenQuim/renpy-graphviz))

It is a text analyser that draws a graph of the project.

## What I learned

- Go data structures (`struct`, `map`) and methods over a type
- RegEx **a lot**
- Go cross-compilation
  - Cross-compilation is hard when using a C library
- [Graphviz](https://graphviz.org/), a graph library
- dot language, used along with graphviz
