# **[Crypto]** Sign your commits with PGP

10 *min setup*

*Why do I need to sign my Github commits? I don't want to care about this while coding, and lose precious time!*

Don't panic:

- the setup is easy (10 min max.)
- the signing procedure is transparent (0s more /commit)
- always better to work safely
- vscode integration !

## 1. What is PGP

### What is PGP (tl;dr version)

[PGP](https://www.youtube.com/watch?v=kf_J-QAdH24) (Pretty Good Privacy) is a encryption program, used for encrypting, decrypting and signing. It is often used in communication (signing or encrypting mails), and other useful features where security is required. The original program is a proprietary software, but there exists free version of it, [GnuPG](https://www.gnupg.org/) (referred as GPG), that still follow the [OpenPGP](https://www.openpgp.org/) standard.

The name *'Pretty Good Privacy'* really is an euphemism, as the security ensured by this algorithm is **almost unbreakable**. It is easier for the police to make a suspect say their passphrase[^1] [^2] or directly infect his computer[^3] (and then inspecting keystrokes to get the passphrase) than attacking the algorithm itself...

### Setting up PGP

Linux enthusiasts often use GnuPG (referred as GPG), but we will use [this website](https://www.thechiefmeat.com/pgp/#) for this tutorial, as the interface is really intuitive.

Just fill in the blanks and the website will provide you 2 keys : a **public key** and a **private (or secret) key**.
To sum up quickly in which situation you will use them:

- sign thing A:
  - your private key (you are the only one to know it)
- verify thing A:
  - your public key (public so anyone can verify that you really are the author)
- encrypt thing B to send to someone:
  - your private key
  - the public key of the receiver (so only the receiver can read it)
- decrypt thing B that somebody sent to you
  - the public key of the sender (to decrypt his message)  
  - your public key

## 2. Use PGP in Git

### Why you must sign your work

Remember the first time you used git in your computer.
You have typed these instruction :

```bash
git config --global user.name "Chuck Norris"
git config --global user.email chuck.norris@example.com
```

Git remembers what you filled and indicates your name and email for every commit.

![Picture of Git history here](../assets/3-Git-history.png)

You know that git allows you to navigate through the history and modify older commits. What you probably don't know is that you can even modify the metadata (eg. the date or the author)!

Some funny guys even made a CLI to [blame someone else](https://github.com/jayphelps/git-blame-someone-else) for your bad code, or [claim some work you didn't do](https://github.com/SilasX/git-upstage). 

If you work seriously, for example on an open-source project, this can be quite scary, and you may want to protect your git history.

Luckily, git allows you to sign your work with PGP !

### How can I do this

Once you created your PGP key, add it to git (locally) with the following command:

```bash
git config --global user.signingkey your-public-PGP-key-fingerprint-here
```

Then, every time you commit, just add `-s` to `git commit`, and there it is! You just made your first PGP-signed commit.

You can go further by creating [custom aliases](2-linux-aliases.html) to make this operation transparent, and not losing time.

If you commit from a graphical interface, it is also possible to sign your commits!

For example, if you use Visual Studio Code, just go to the settings, type `git sign` and activate the option.

It is also important to add your public PGP key to your remote repository, so the git host can verify them (often represented with a nice green tick on your history).

Example on Github:

![Screenshot of Github PGP signing here](../assets/3-Github-GPG-key.png)

![Signed commit on Github](../assets/3-Github-signed.png)

Example on Gitlab:

![Screenshot of Gitlab PGP signing here]()

### Warnings

Beware of were you are committing something. Your signature depends on the PGP keys available on the device you use. Don't forget to copy your PGP key and link it to git when you use a new device.

Especially, it is highly not recommended to sign a commit from a server. Because it would mean thet either it wouldn't be signed, or that you have your PGP key on the server...

You shouldn't commit on a prod server anyway, whether you sign it or not.

## References

[^1]: <https://en.wikipedia.org/wiki/In_re_Boucher>
[^2]: <http://volokh.com/files/BoucherDCT.1.pdf>
[^3]: <https://www.cnet.com/news/feds-use-keylogger-to-thwart-pgp-hushmail/>
