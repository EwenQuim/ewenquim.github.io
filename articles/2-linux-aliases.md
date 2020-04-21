# [Tips] **Efficient linux aliases setup** <!-- omit in toc -->

5 *min setup*

- [1. Use a remote repository](#1-use-a-remote-repository)
- [2. Start your aliases with a comma](#2-start-your-aliases-with-a-comma)
- [3. An alias to rule them all](#3-an-alias-to-rule-them-all)

Setting aliases for commands is a very good way to save time at work. But setting them up always takes time, and you lose them all if you have to ssh on a server or change device. **Time to change this by building a very easy setup!**

We will see how to

- access our aliases **everywhere**
- create an **efficient** aliases system -with a *weird trick*
- easily **manage** aliases for everyday use and update

![-](../assets/2-aliases.png)

First of all, we need to **create an independent file** to store aliases, for example `.aliases`

In your `.bashrc` or `.zshrc`, add the automatic execution of this file (`source .aliases`) every time you will launch a terminal.

## 1. Use a remote repository

The main goal is to make your aliases available on every device you're connecting, so using a centralized system is recommended in this situation.

### Storing aliases online

As we are using a single file, you can use [Github Gists](https://gist.github.com/).
You can download my template with useful commands [here](https://gist.github.com/EwenQuim/b3ba203bdacb17bc1a15815cbc58792d) or create your own and clone it to your computer.
I recommand you to fork my file, so you can create you own aliases without depending on mine.

It will behave like a git repository, excepted it's for a single file.

### Download it to a new device

Everytime you create a new VM, set up a new raspberry pi or connect to a new server, just run this (don't forget to replace with *your* gist id and username if you have forke my gist!):

```bash
mkdir ~/.tools && cd $_
git clone https://gist.github.com/EwenQuim/b3ba203bdacb17bc1a15815cbc58792d.git .
source .aliases
echo "source ~/.tools/.aliases" >> ~/.bashrc
```

Change .bashrc to .zshrc if you use zsh, of course.

But there is a problem : if you make local changes, you want them to be effective everywhere!
The system is not fully efficient here, so we'll se how to improve it in part 3.
But before that, look at this old trick in part 2.

## 2. Tip: Start your aliases with a comma

*Why this monstrosity ? I've never seen a command beginning with a comma !*

Absolutely, and that's why we will do this. It allows two things:

- Avoid collisions with existing commands
- Display your custom commands easily

As explained in this old but useful [article](https://rhodesmill.org/brandon/2009/commands-with-comma/), this little known trick allows to display every custom command/alias by typing the comma then typing `tab`.
It looks like this:

![-](../assets/2-aliases.png)

Also, the comma is **easy to type** : it's a lowercase character, does not require weird combination of keys, exists on all keyboards...

Trust me, that's not *that* odd ;) 

## 3. One alias to rule them all

### Usual use 

If you have forked my gist in [1](#1-use-a-remote-repository) :
Just type `,aliases`. Easy, isn't it?

### More details

The command `,aliases` is is **the ultimate alias** (already included in my gist in case you download/fork it).

```bash
alias ,aliases="cd ~.tools/ && git pull && nano .aliases && source .aliases && git commit -a -v && git push origin master && cd -"
```

When you type `,aliases`, this happends:

- download latest changes you've put online
- see your aliases in nano
- you can edit them
- if it was edited, it will put everything online

## Thank you !

Don't hesitate to remove the `-S` option in the commit alias if you don't PGP sign your commits (I'll explain later why you should -and it's easy too!)

I hope it will be useful for you !
