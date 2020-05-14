# **[Crypto]** [Sign your commits with PGP](articles/2-pgp.md)

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

The name *'Pretty Good Privacy'* really is an euphemism, as the security ensured by this algorithm is **almost unbreakable**. It is easier for the police to make a suspect say their passphrase[^(1)] [^(2)] or directly infect his computer [^(3)] (and then inspecting keystrokes to get the passphrase) than attacking the algorithm itself...

### Setting up PGP

Linux enthusiasts often use GnuPG (referred as GPG), but we will use [this website](https://www.thechiefmeat.com/pgp/#) for this tutorial, as the interface is really intuitive.

Just fill in the blanks and the website will provide you 2 keys : a public key and a private (or secret) key.

## 2. Use PGP in Git

### Why doing it

Exemple avec linux
EZ

### 

### Warnings

Not from a server (keyring)

## References

[^1]: <https://en.wikipedia.org/wiki/In_re_Boucher>
[^2]: <http://volokh.com/files/BoucherDCT.1.pdf>
[^3]: <https://www.cnet.com/news/feds-use-keylogger-to-thwart-pgp-hushmail/>