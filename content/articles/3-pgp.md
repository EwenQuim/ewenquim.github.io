---
date: 2020-03-29T09:00:00+06:00
lastmod: 2020-08-10T22:00:00+06:00
title: Sign your commits with PGP
authors: ["ewenquim"]
categories:
  - tech
tags:
  - pgp
  - git
toc: true
---

# Sign your commits with PGP

15 _min setup_

- [1. The git history issue](3-pgp.md#1-the-git-history-issue)
  - [Git structure](3-pgp.md#git-structure)
  - [Having fun... messing up everything!](3-pgp.md#having-fun-messing-up-everything)
  - [A possible solution](3-pgp.md#a-possible-solution)
- [2. What is PGP](3-pgp.md#2-what-is-pgp)
  - [Quick Definition](3-pgp.md#quick-definition)
  - [More about PGP - History and Challenges](3-pgp.md#more-about-pgp---history-and-challenges)
  - [Setting up PGP](3-pgp.md#setting-up-pgp)
- [3. Use PGP in Git](3-pgp.md#3-use-pgp-in-git)
  - [How can I do this](3-pgp.md#how-can-i-do-this)
  - [Warnings](3-pgp.md#warnings)
- [References](3-pgp.md#references)

Git history can be modified. **Time to protect your project!**

In this article, you will see:

- an overview of PGP
- **quick PGP setup**
- git **signing procedure** with PGP
- **vscode** integration

## 1. The git history issue

### Git structure

Remember the first time you used git in your computer. You typed these instructions :

```bash
git config --global user.name "Chuck Norris"
git config --global user.email chuck.norris@example.com
```

Git remembers what you filled and indicates your **name** and email for every commit.

![Picture of Git history here](../.gitbook/assets/3-Git-history.png)

You know that git allows you to navigate through the history and modify older commits.

### Having fun... messing up everything!

What you probably don't know is that you can even modify the metadata (eg. the date or the author)! Anyone can do that, just play with the .git folder at the root of your repository...

As everything in IT ~~and especially things that shouldn't be done~~, some guys automated it.

So, funny guys even made a CLI to [blame someone else (for your bad code)](https://github.com/jayphelps/git-blame-someone-else), or [claim some good work (you didn't do)](https://github.com/SilasX/git-upstage).

But if you work seriously, for example on an open-source project or in a company, this can be quite scary, and you may want to protect your git history.

### A possible solution

If everyone sign their commit with a private key, it would be impossible to usurp one another.

Luckily, git have a tool to sign with PGP!

## 2. What is PGP

### Quick Definition

**PGP** (Pretty Good Privacy) is a encryption program, used for encrypting, decrypting and signing emails and documents. It is as far as we know one of the _best encryption algorithm_.

### More about PGP - History and Challenges

**PGP** is often used in communication and especially mail exchange: [Mailvelope](https://www.mailvelope.com) and [Enigmail](https://enigmail.net) extensions allows you to integrate PGP encryption into your mails. PGP is also useful for a lot of other situations where security is required.

The original program is a proprietary software, but there exists free version of it, [GnuPG](https://www.gnupg.org/) (referred as GPG), that follows the [OpenPGP](https://www.openpgp.org/) standard.

The name _Pretty Good Privacy_ really is an euphemism, as the security ensured by this algorithm is **almost unbreakable**. Flaws were discovered not in PGP itself but in emails clients for example. Also, it is easier for the police to make a suspect say their passphrase or directly infect his computer (and then inspecting keystrokes to get the passphrase) than attacking the algorithm itself... The problems always revolved around PGP but not the strong algorithm.

You may ask _'Why do I need PGP? I don't need this much privacy!'_

This is what Philip Zimmermann, creator of PGP, said:

> If privacy is outlawed, only outlaws will have privacy. Intelligence agencies have access to good cryptographic technology. So do the big arms and drug traffickers. So do defense contractors, oil companies, and other corporate giants. But ordinary people and grassroots political organizations mostly have not had access to affordable military grade public-key cryptographic technology. Until now.
>
> PGP empowers people to take their privacy into their own hands. There's a growing social need for it. That's why I wrote it.

The PGP was not made for outlaws. Like [Tor](https://www.torproject.org/), it was conceived to protect everyone's privacy. Because outlaws will always find a way to protect themselves, whereas the general public is weak in dealing with these technically complex concerns.

Why isn't it better known to the general public? There are some reasons I imagine:

- Complicated use (even if we will see easy ways to approach PGP)
- No promotion...
- ...or even discourage by some governments
- Rising use of mobile devices, not very PGP-friendly (even if there are some projects integrating PGP for Android and Apple)
- No benefits for GAFAM (since it contradicts their business models)

### Setting up PGP

Linux enthusiasts often use GnuPG (referred as GPG), but we will use [this website](https://www.thechiefmeat.com/pgp/#) for this tutorial, as the interface is really intuitive. Just fill in the blanks!

Remember that creating keys online is never secure : you must protect your traffic, and you'll never be sure whether you can trust the website or not. We're just doing it for testing purposes here. Also, it is important to ask for a RSA key with minimum 2048 bits!

The website will provide you 2 keys : a **public key** and a **private (or secret) key**.

To sum up quickly in which situation you will use the **private key** and the **secret key**:

- if _you_ sign something:
  - your secret key _(you are the only one to know it)_
- if _others_ want to verify something signed by _you_:
  - your public key _(public so anyone can verify that you really are the author)_
- if _you_ encrypt something to send to _someone_:
  - your secret key
  - the public key of the receiver _(so only the receiver can read it)_
- if _you_ want to decrypt something that _someone_ sent to you
  - the public key of the sender _(to decrypt his message)_
  - your secret key

It makes sense, doesn't it? Just try it with a friend!

[Go to the website](https://www.thechiefmeat.com/pgp/)

You can also try to send me an encrypted message (if you know how to contact me of course!). You can find my public PGP key [here](../documents/pgp-public-key.md).

You can use any message service, as the message is encrypted! Don't forget to send me your public PGP key if you want me to answer ;)

## 3. Use PGP in Git

### How can I do this

Once you created your PGP key, add it to git (locally) with the following command:

```bash
git config --global user.signingkey your-public-PGP-key-fingerprint-here
```

Then, every time you commit, just add `-s` to `git commit`, and there it is! You just made your first PGP-signed commit.

You can go further by creating [custom aliases](https://github.com/EwenQuim/ewenquim.github.io/tree/3681f5c59cfe5912907fc8f04ea7e1e37e5a8cb8/articles/2-linux-aliases.html) to make this operation transparent, and not losing time.

You can also enable PGP signing by default with this command:

```bash
git config --global commit.gpgSign true
```

If you commit from a graphical interface, it is also possible to sign your commits!

For example, if you use Visual Studio Code, just go to the settings, search `git sign` and activate the corresponding option.

It is also important to add your public PGP key to your remote repository, so the git host can verify them (often represented with a nice green tick on your history).

Here the example on Github (it's similar on Gitlab):

Insert your PGP key here

![(Screenshot of Github PGP signing here)](../.gitbook/assets/3-Github-GPG-key.png)

And here is the result : a 'verified' mention on your git history!

![(Signed commit on Github)](../.gitbook/assets/3-Github-signed.png)

When you work, try to remember to verify the little tick ✅ before accepting Merge/Pull Requests!

### Warnings

Beware of where you are committing something. Your signature depends on the PGP keys available on the device you use. Don't forget to copy your PGP key and link it to git when you use a new device.

Especially, it is highly not recommended to sign a commit from a server. Because it would mean that either it wouldn't be signed, or that you have your PGP key on the server...

You shouldn't commit on a prod server anyway, whether you sign it or not.

→ [All articles]()

## References
