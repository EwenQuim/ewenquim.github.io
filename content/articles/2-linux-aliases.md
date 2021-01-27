---
date: 2020-04-01
lastmod: 2020-04-01
title: Efficient CLI aliases
authors: ["ewenquim"]
categories:
  - tech
tags:
  - git
  - cli
  - terminal
toc: true
---

![-](/images/2-aliases.png)

Setting aliases for commands is a very good way to save time at work. But setting them up always takes time -far more than it should! Moreover, you lose them all if you have to ssh on a server or change device. **Time to change this by building a very easy setup!**

You will see how to

- access your aliases **everywhere**
- create an **efficient** aliases system -with a _weird trick_
- easily **manage** aliases for everyday use and update

## 1. Use a remote repository

The main goal is to make your aliases available on every device you're connecting, so using a centralized system is recommended in this situation.

### Storing aliases - _2min_

We won't save our aliases in the classic .bashrc (or .zshrc.) It's better to store them in a .aliases file and add `source .aliases` to the .bashrc/.zshrc.

So for example type this:

```bash
cd ~
nano .aliases
```

and

```bash
# Usual Shell command (cd, ls...)
alias dirs="ls -al | grep '^d'"
alias l="ls -al"
alias lf="ls -aFG"
alias lm="ls -al|more"
alias lt='ls --human-readable --size -1 -S --classify'
alias h="history"
```

### Storing aliases online - _1min_

As we are using a single file to store them, you can use [Github Gists](https://gist.github.com/). You can download my template with useful aliases [here](https://gist.github.com/EwenQuim/b3ba203bdacb17bc1a15815cbc58792d) or create your own and clone it to your computer.

I suggest you to **fork my file** (copy it and add it to your personal gists), so you can create you own aliases without depending on mine, and still begin the setup easily.

It will behave like a git repository, excepted it's for a single file.

### Download them to a new device - _3s / device_

Now that you have you aliases stored online, learn how to use them on your devices ! Every time you create a new VM, set up a new raspberry pi or connect to a new server, just run this (don't forget to replace with _your_ gist id and username if you forked my gist or used your personal file!):

```bash
mkdir ~/.tools && cd $_
git clone https://gist.github.com/EwenQuim/b3ba203bdacb17bc1a15815cbc58792d.git .
source .aliases
echo "source ~/.tools/.aliases" >> ~/.bashrc
```

Change .bashrc to .zshrc if you use zsh, of course.

Now we can download our aliases to every device, yay!

But there are some issues : we _can't update_ (upload) easily the list of aliases ! And it's _not very handy_... Do you like typing `nano ~/.tools/.aliases` and then `source ~/.bashrc` every time you just want to change a simple alias ?

The system is not fully efficient here, so we'll se how to improve it in [part 3](#3-one-alias-to-rule-them-all). But before that, look at this **weird trick** in [part 2](#2-tip-start-your-aliases-with-a-comma) to boost your productivity.

## 2. Tip: Start your aliases with a comma

_'Why this monstrosity ? I've never seen a command beginning with a comma !'_

Absolutely, and that's why we will do this. It allows two things:

- Avoid collisions with existing commands
- Display your custom commands easily

As explained in this old but useful [article](https://rhodesmill.org/brandon/2009/commands-with-comma/), this little known trick allows to display every custom command/alias by typing the comma then typing `tab`. It looks like this:

![-](../.gitbook/assets/2-aliases%20%281%29%20%281%29.png)

Also, the comma is **easy to type** : it's a lowercase character, does not require weird combination of keys, exists on all keyboards...

Trust me, that's not _that_ odd to do so ;)

## 3. One alias to rule them all

Want to see, edit, and synchronise your aliases in only one command?

### See, change, update your aliases - _2s/update_

If you have forked my gist in [1](#1-use-a-remote-repository) :

Just type `,aliases`. It displays the list of commands, allows you to change them and synchronize everything. Easy, isn't it?

### What's inside

The command `,aliases` looks like this (already included in my gist in case you download/fork it).

```bash
alias ,aliases="cd ~.tools/ && git pull && nano .aliases && source .aliases && git commit -a -v ; git push origin master ; cd -"
```

When you type `,aliases`, this happens:

- download latest changes you've put online from your git repo
- see your aliases in nano
- you can edit them
- if it was edited, it will put everything online and apply them to the current device

This takes seconds, and is very handy to use.

### Thank you!

Don't hesitate to remove the `-S` option in the commit alias if you don't PGP sign your commits (I'll explain later why you should -and it's easy too!)

I hope it will be useful for you !

→ [All articles]()

## References
