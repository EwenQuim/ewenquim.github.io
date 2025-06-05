---
date: 2021-02-07
title: Ren'Py Graphviz
description: A popular vizualisation tool for the Ren'Py framework. It generates a graph of the project from its source code.
heroImage: https://raw.githubusercontent.com/EwenQuim/renpy-graphviz/master/data/example-ingames.png
website: https://renpy.amethysts.studio
type: draft
github: EwenQuim/renpy-graphviz
category: open-source
tags:
  - Go
  - visualization
  - renpy
---

Ren'Py is a tool to build interactive novels from code.

In these novels, the player/reader must choose between different choices. This leads to a tree structure. It is not easy to have an accurate and correct view of the story that is written from the pure code.

I needed a tool to organize my 10k+lines Ren'Py project.

So I created [my own tool](https://github.com/EwenQuim/renpy-graphviz) in #Go.

It is a text analyser that draws a graph of the project from its source code. Here is an extract of the graph that can be generated:

![Renpy Graph](https://raw.githubusercontent.com/EwenQuim/renpy-graphviz/master/data/CXVL_extract.png)

What I learned:

- Go data structures (`struct`, `map`) and methods over a type
- RegEx **a lot**
- Go cross-compilation
  - Cross-compilation is hard when using a C library
- [Graphviz](https://graphviz.org/), a graph library
- dot language, used along with graphviz

Learn more about the tool [on Github](https://github.com/EwenQuim/renpy-graphviz).
