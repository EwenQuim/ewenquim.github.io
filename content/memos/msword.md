---
date: 2021-02-07
title: Microsoft Word is trash
type: draft
categories:
  - memo
tags:
  - foss
toc: true
---

Microsoft Word is a software that everyone knows. It was designed to edit text a fancy way.

But most people use it the wrong way. It is so popular that whatever you need to edit 

## The problem with Word

It's overkilled.

`.docx` files are a binary and proprietary format that shouldn't be used.

Did you know ? .docx files are in reality a zipped folder. Using mac or Linux, the command `unzip document.docx` will reveal everything used by Word. And these are `.xml` files and media files mainly.

## Bring Your Own Client

If you don't already know it, Bring Your Own Client is a philosophy that a file (and by extend, a format, like .docx) must not depend on an software.

But only Microsoft Word can read `.docx`

## A solution
### Binary vs. text files
There are plenty of extensions. `.docx`, `.pdf`, `.txt`, `.png`... But for your computer, only 2 types of file exists. Text files, and binary files. Binary files aren't meant to be read by humans. 

> Extensions are only a way for computers to indicate how to handle a file (which software to use). It is completely unrelated to the content. But here, we talked about `.docx` as a format, not about the file extension.

**Binary** are often "optimized" to be run by your computer or by a piece of software. There are just a list of zeros and ones that only makse sense for the computer.

**Text files** are meant to be read by humans. They are easy to read and write, and usually contains information.

We just said that `.docx` are a binary file... Why not using a text file ?

### Markdown
If you just want to type information, open a `.txt`. It is the easiest way to write information. But you might want to add **structure** to your document. 

Markdown is a great idea. It doesn't depend on an editor -there are plenty Markdown editors out there.

If you want to write down structured information, create a `.md`.

### The added value of MS Word

Markdown might be a little too minimalist.

The _styles_ -meaning, the way to show elements- is a great feature of word. But this remains messy and not intuitive. And most of the time, it is useless...
