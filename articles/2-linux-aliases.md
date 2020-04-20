# [Tech] **Efficient linux aliases setup**

5 *min setup*

Setting aliases for commands is a very good way to save time at work. But setting them up always takes time, and you lose them all if you have to ssh on a server or change device.

We will see how to

- access our aliases **everywhere**
- create an **efficient** aliases system -with a *weird trick*
- easily **manage** aliases for everyday use and update

- [[Tech] **Efficient linux aliases setup**](#tech-efficient-linux-aliases-setup)
  - [1. Using remote repository](#1-using-remote-repository)
  - [2. Start your aliases with a comma](#2-start-your-aliases-with-a-comma)
  - [3. An alias to rule them all](#3-an-alias-to-rule-them-all)

First of all, we need to **create an independent file** to store aliases, for example `.aliases`

In your `.bashrc` or `.zshrc`, add the automatic execution of this file (`source .aliases`) every time you will launch a terminal.

## 1. Using remote repository

The main goal is to make your aliases available on every device you're connecting, so using a centralized system is recommended in this situation.

As we are using a single file, you can use [Github Gists](https://gist.github.com/).

You can download my template with useful commands [here](https://gist.github.com/EwenQuim/b3ba203bdacb17bc1a15815cbc58792d) or create your own and clone it to your computer.

It will behave like a git repository, excepted it's for a single file.

## 2. Start your aliases with a comma

*Why this monstrosity ? I've never seen a command beginning with a comma !*

Absolutely, and that's why we will do this. It allows two things:

- Avoid collisions with existing commands
- Display your custom commands easily

As explained in this old but useful [article](https://rhodesmill.org/brandon/2009/commands-with-comma/), this little known trick allows to display every custom command/alias by typing the comma then typing `tab`.

## 3. An alias to rule them all

This is **the ultimate alias**.

```bash
alias ,aliases="cd ~/folder/where/you/store/your/aliases/file/ && git pull && nano .aliases && git commit -a -S -v && git push origin master && source .aliases && cd -"
```

By typing `,aliases`, you will download the latest aliases you set on other devices, edit your aliases as you like, applying it for immediate use, and then putting it back online -with a commit message!

Don't hesitate to remove the `-S` option if you don't PGP sign your commits (I'll explain later why you should -and it's easy!)
