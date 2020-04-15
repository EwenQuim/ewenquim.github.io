# [Tech] **Efficient linux aliases setup**

Setting aliases for commands is a very good way to save time at work. But setting them up always takes time, and you lose them all if you have to ssh on a server or change device.

We will see how to

- access our aliases **everywhere**
- create an efficient aliases system
- easily manage aliases

## What should I do?

First of all, we need to **create an independant file**, for example `.aliases`

In you `.bashrc` or `.zshrc`, add the execution of this file (`source .aliases`).

## Advice : start your command begin with a comma

*Why this monstrosity ? I've never seen a command beginning with a comma !*

Absolutely, and that's why we will do this. It allows two things:

- Avoid collisions with existing commands
- Display your custom commands easily

As explained in this old but useful [article](https://rhodesmill.org/brandon/2009/commands-with-comma/), this little known trick allows to display

## Using remote repository

The main goal is to make your aliases available on every device you're connecting, so using a centralized system is recommended in this situation.

As we are using a single file, you can use [Github Gists](https://gist.github.com/).

You can download my template with useful commands here.

## An alias to rule them all

This is the ultimate command.

```bash
alias ,aliases="cd ~/where/you/store/your/aliases/ && git pull && nano .aliases && git commit -a -S -v && git push origin master && source .aliases && cd -"
```

Don't hesitate to remove the `-S` option if you don't PGP sign your commits (I'll explain later why you should -and it's easy!)

