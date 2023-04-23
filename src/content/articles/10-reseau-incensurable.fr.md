---
date: 2021-08-01
title: Un réseau incensurable 1 - Les enjeux
description: Truc
heroImage: https://images.theconversation.com/files/266208/original/file-20190327-139380-1kpdgoi.jpg?ixlib=rb-1.1.0&rect=55%2C654%2C4519%2C2259&q=45&auto=format&w=1356&h=668&fit=crop
categories:
  - tech
tags:
  - internet
  - reseau
  - horkruxes
toc: true
---

Droits de l'homme, **Art. 10** : "Nul ne doit être inquiété pour ses opinions..."

Droits de l'homme, **Art. 11** : "La libre communication des pensées et des opinions est un des droits les plus précieux de l'Homme : tout Citoyen peut donc parler, écrire, imprimer librement..."

Aujourd'hui, à l'ère de l'informatique, n'importe qui peut diffuser librement ses idées. Mais si l'informatique est le royaume de la transmission, il tend à devenir le lieu du contrôle. Loin du gadget de nerd passionné, on y fait maintenant de la vente, de la politique, de la finance. En fait, tout le domaine de l'information peut être automatisé. C'est pourquoi les puissances (qu'elles soient étatiques ou autre) ont rapidement compris les enjeux liés à ces plateformes, et commencent à y exercer un pouvoir bien trop pressant.

J'ai donc voulu créer un réseau incensurable et incontrôlable.

## Portée et définitions

### Incensurable vs. incensuré

Entendez-moi bien : je ne compte pas recréer Gab, Parler, 4chan ou Telegram. Ce sont des réseaux **non censurés**, mais **pas non-censurables**. La situation de ces réseaux peut changer du tout au tout, d'un jour à l'autre. Il suffit que l'entreprise responsable du réseau décide de changer de politique pour changer la face du réseau de tout au tout. Par exemple, Twitter et Twitch ont longtemps ignoré la pornographie sur leur réseau, avant de commencer à agir contre ces pratiques (bien que cela reste à débattre pour Twitch).

> Mais imaginons qu'une société fiable dont la politique ne change **jamais** crée un réseau incensuré. Cela serait suffisant, non ?

Non. Déjà car les décisions politiques ne sont pas seulement dues aux changements d'humeur des dirigeants, mais d'autres externalités interviennent (situation économique de l'entreprise, cadre légal national ou international).

Et puis l'entreprise n'est qu'un acteur minime de la censure. Elle peut venir d'autres acteurs, comme les États. N'importe quelle dictature a intérêt à censurer pour assurer la pérennité de son régime. N'importe quelle démocratie a intérêt à influencer ses citoyens pour faire passer des mesures allant dans l'intéret du pays en tant que nation (même si ses citoyens sont contre), ou de ses dirigeants dans le cas d'une démocratie corrompue. Et les États ont l'embarras du choix quant aux méthodes à employer pour arriver à leurs fins.

> Et peut-on faire confiance aux gens, de manière individuelle ?

C'est une question compliquée.

La censure peut également venir des gens, de manières plus ou moins directe. Sur beaucoup de réseaux, on peut "Signaler" un profil, ou un message que l'on considère offenssant. Ces signalements peuvent entrainer une exclusion automatique du réseau (une des entreprise dans lesquelles j'ai travaillé faisait comme cela à partir d'un certain nombre de signalements), ou alors provoquer une étude humaine de la personne/message en question, qui peut entrainer une exclusion/censure (qui repose alors sur le jugement de la personne qui censure autant que sur la reponsabilité de l'entreprise).

### Anonyme vs. pseudonyme

Aussi étonnant que cela puisse paraître, Telegram, duquel je peu dire le plus grand bien, n'est pas un réseau anonyme. C'est un réseau **pseudonyme**: il est possible pour l'entreprise derrière Telegram (pas pour les utilisateurs), bien que non-immédiat, de remonter à une identité derrière un compte. En effet, pour accéder à Telegram, il faut donner un numéro de téléphone, qui identifie une personne de manière unique. Bien que cela est discutable, car il est possible de se créer rapidement des numéros de téléphones grâce à des services comme On/Off, cela reste complexe -bien plus que de créer une nouvelle adresse mail à la volée, comme c'est le cas pour Facebook.

> Facebook est donc plus anonyme que Telegram ?

En ce sens, oui. Mais il y a un point commun entre les deux : Les données personnelles sont stockées sur leurs serveurs.

> Mais il faut bien qu'elles soient stockées quelque part, non ?

Oui ! Mais il y a d'autres solutions, dont nous parleront plus tard. Toujours est-il que si Telegram permet d'identifier une personne physique. Facebook est, quant à lui, un système anonyme. Un profil peut être identifiable de manière unique, c'est à dire que il est possible pour un utilisateur et pour Facecbook de savoir, pour 2 publications, de savoir si l'auteur est bien le même. Il n'est toutefois pas toujours possible de remonter à une personne réelle.

!["Kanard de bain", un utilisateur de Facebook qui utilise manifestement un pseudonyme](/images/10-kanard-pseudonyme.jpeg)

"Kanard de bain" peut critiquer son métier sans craindre de représailles de la part de son employeur, même si son employeur collabore avec Facebook. S'il avait posté ce message sur Telegram, même avec un pseudonyme, on peut imaginer que quelqu'un de motivé (par exemple, des services secrets) peuvent remonter la trace et retrouver la personne physique derrière ce message.

## Est-ce souhaitable ?

Les plus attentifs auront remarqué que je n'ai pas reporté l'entièreté des articles des droits de l'Homme. Les voici en entier :

**Art. 10.** Nul ne doit être inquiété pour ses opinions, même religieuses, _pourvu que leur manifestation ne trouble pas l'ordre public établi par la Loi_.

**Art. 11.** La libre communication des pensées et des opinions est un des droits les plus précieux de l'Homme : tout Citoyen peut donc parler, écrire, imprimer librement, _sauf à répondre de l'abus de cette liberté dans les cas déterminés par la Loi_.

Il n'est pas maladroit de penser qu'un réseau incensurable pourra aller à l'encontre de ces principes.

### L'anonymat ne rend pas plus dangereux, le réseau si

> L'anonymat rend les gens aggressifs, ils se croient tout permis.

L'anonymat rend les gens libres, ils se sentent en sécurité.

Vous ne me croyez pas ? Une des raisons pour lesquelles j'ai voulu créer ma plateforme est que l'anonymat ne change rien à la toxicité des débats. Une discussion sur Twitter est toujours dégueulasse. Personnellement, j'ai même quitté la plateforme à cause de cela. 140 (maintenant 280) caractères, c'est beaucoup trop peu pour qu'une pensée articulée en sorte. Et pourtant, sur Twitter, ceux qui participent à ce genre de logorhée via des "threads" illisibles sont rarement anonymes. De même que sur Telegram, le non-anonymat n'empêche pas les gens de dire de la merde, et ce même avec leur vrai nom !

Il faut donc former le réseau pour qu'il incite à la réflexion, contrairement à Telegram qui propose cette fonctionnalité de stickers ou Twitter et ses réponses trop courtes pour développer quelconque pensée.

### Inciter, ne pas censurer

Voici mes propositions.

- uniquement du texte : pas d'image, pas de stickers ou autre élément personnalisable
- noir et blanc : seulement des
- un minimum de 140 charactères
- mettre en valeur le contenu, pas les personnes : pas d'élément de personnalisation autre que le nom
- pas de "likes" ou autre élément addictif

Cela peut se résumer par : rendre le réseau **CHIANT** pour les personnes non-intellectuelles.

### Il sera utilisé par des terroristes et hors-la-loi

Oui.

Un journaliste qui dénonce le parti communiste chinois est aussi un dangereux hors-la-loi. Tout dépend du point de vue. Mais il est strictement impossible de protéger les lanceurs d'alerte tout en interdisant des personnes dangereuses de s'exprimer.

## Est-ce réalisable ?

### Faire un réseau anonyme

Pour faire un réseau anonyme, on va simplement ne pas stocker d'information sur les utilisateurs.

Aucune.

On ne va stocker que les "messages" (on va appeler "message" les contenus, un peu comme des Tweets, des Posts ou des Messages selon le réseau).

Cela a pour effet direct de ne pas avoir à stocker d'information sensibles, comme les mots de passe et les informations personnelles. On ne va stocker sur les serveurs que des informations publiques et disponibles à tout le monde. Pas de soucis du coté des RGPD, ni des hackers : vous pouvez prendre toutes les informations, tout est publique !

### Anonyme, mais signé

Le soucis avec un réseau 100% anonyme, c'est que lorsque l'on poste un message, on ne pourra pas réclamer par la suite le fait d'être auteur de ce message. Puisque tout le monde est anonyme, et qu'aucune information personnelle n'est stockée, il est impossible de dire "C'est moi qui ai écrit ça !".

À moins que l'on s'y connaisse en cryptographie, et en réseau.

Il est possible de générer des _signatures_ identifiant de manière unique chaque auteur. Voici le fonctionnement détaillé :

- On génère une paire de clés sur une application ou un logiciel, localement (c'est à dire directement sur le terminal), pas en demandant au serveur d'en générer puis de les envoyer. L'une est secrète, l'autre est publique.
  - Ex de clé secrète : f3wfs3fvqedw==
  - Ex de clé publique : 3rce3=
- On utilise un algorithme qui génère une signature à partir du texte, de la clé publique (donc de l'auteur) et potentiellement d'autres paramètres.
  - Ex de texte à signer : "Salut !"
  - Ex de signature générée pour ce texte avec cette paire de clé : 56fuawd==
- Lorsqu'on a la signature, le texte et la clé publique, il est impossible de remonter à la clé secrète, mais il est possible de vérifier que la signature est bien issue de la clé publique.

On se retrouve donc avec un système dans lequel

- il faut stocker une signature pour chaque message
- il est possible pour un utilisateur de dire : "C'est mon message" si il le désire
- l'authentification ne se fait PAS sur un serveur mais du coté des utilisateurs
- un utilisateur peut créer autant de clés (donc, d'identités virtuelles) qu'il le désire, et qu'il utilisera de la façon qu'il veut (de manière éphémère s'ils veulent être anonymes ou de façon régulière pour les messages qu'ils veulent revendiquer)
- Les utilisateurs sont responsables de la gestion de leurs clés (d'un point de vue sécurité)

Dans ce système, tout le pouvoir est dans les mains des utilisateurs. Ils contrôlent parfaitement leur(s) identité(s).

### Les risques

Les principaux risques liés à un réseau anonyme sont les risques de spam : un grand nombre d'inconnu va vouloir créer du contenu, pas forcément pertinent ou utile.

### Incensurable

Si l'on résume mon paragraphe sur la censurabilité, les acteurs pouvant censurer sont:

- les entreprises (gérant des réseaux comme Facebook, ou exerçant des pression sur les réseaux/messageries)
- les États
- les individus

Où devrait-on placer sa confiance, pour gérer un tel réseau ?

Il est dur de choisir : cela dépend des États (je fais plus confiance à mon État que un État voisin par exemple), et des individus (je fais confiance à mes proches).

La solution que j'ai retenu, c'est les **proches**, et **moi**.

**Les proches** : il ne faut pas qu'une seule société ait accès aux données. Les messages doivent être stockés sur différents serveurs, appartenant à différentes personnes. Pour cela, il va falloir développer un serveur facilement déployable partout dans le monde. Le but est que des milliers d'individus différents, et capables techniquement, fassent tourner leur serveur. Aussi, il ne faut pas de communication entre serveurs, contrairement à des réseaux fédérés comme Mastodont.

**Moi** : il faut que tous les messages me soient accessibles, même si les serveurs ont tous été détruits de quelconque manière. Il faut aussi que je puisse accéder aux messages de n'importe quels serveurs. Il va falloir pour cela développer une application qui demande repidement au serveur les derniers messages, et qui les stocke indéfiniement. Un messages existera donc sur 1 serveur mais transmis à tous les clients abonnés au serveur.

Assez parlé, passons maintenant à la réalisation.
