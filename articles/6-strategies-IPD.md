# **[Maths]** Strategies controlling the opponent in games <!-- omit in toc -->

<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

20 *min read*

10 *min testing (if you want to)*

- [1. Prisoner's dilemma](#1-prisoners-dilemma)
  - [The story](#the-story)
  - [Mathematical formalism](#mathematical-formalism)
  - [Equilibria](#equilibria)
  - [The paradox](#the-paradox)
- [2. Iterated Prisoner's dilemma](#2-iterated-prisoners-dilemma)
  - [New behaviors](#new-behaviors)
  - [New strategies](#new-strategies)
    - [Pure strategies](#pure-strategies)
    - [Mixed strategies](#mixed-strategies)
  - [Let's fight!](#lets-fight)
- [3. Appendix: Press & Dyson work](#3-appendix-press--dyson-work)
  - [Only one](#only-one)
- [References](#references)

A quick article about how to **control opponent's score in some games**, with the help of a nice part of mathematics called *Game Theory*.

This article is derived from [this paper](ref)[^original] from mathematicians Press & Dyson. The original work isn't very understandable for everyone, so I decided to work on it and publish it with very simple formulas and illustrations so **everybody can understand**!

After reading this article, you may want to **try your own strategies** with [these ressources](ref).

In this article, you will see:

- Basics of Game Theory
- The Prisoner's Dilemma and its Iterated version
- Winning strategies

## 1. Prisoner's dilemma

### The story

You stole the bank with your partner in crime. You just had the time to hide the money when the sirens sound. You see the police coming and you run. Too late: the police is coming for you! You fight with a policeman while trying to escape, but they manage to arrest you anyway. You are now at the police station. But they do not have any evidence that *you two* are the thieves!

A clever policeman takes you aside and says

> Here's the deal: you will decide the fate of your friend. You have two choices.
> If you lie and protect him, we will sue you for fighting with the police? You'll get 1 year in prison.
> But if you betray him, you're immediately free and he gets the maximal sentence: in jail for 10 years!
> Of course, it's the same deal for your partner...
> If you betray each other, you'll have 5 years each.

The prisoner thinks a few minute.

> If my friend betrays me, I better have to betray him too: I'll go to prison 5 years instead of 10.
> If he lies and protect me, I should betray too, because I'll never go to prison, instead of wasting my life during 1 year...
> In any case, it's better to betray.
> If he thinks the same, I have no reason to cooperate.

At the end, they both betray each other and go to prison 5 years, whereas they could have cooperated and go to prison only 1 year...

That is the prisoner's dilemma.

### Mathematical formalism

The prisoner's dilemma is one of the fundamentals of Game Theory.

As every game in "normal form", it's described by 3 things:

- a set $$\mathcal{N}= \{P_{1}, P_{2}, P_{3}, ..., P_{N}\}$$ of players
- a set $$S=\{S_{1}, S_{2}, S_{3},..., S_{N}\}$$ of strategies foreach player
  - the set $$S_{i}$$ of strategies of player $$P_{i}$$ can be anything: {heads, tails} or {bet 1\$, bet 5\$, bet 10\$}
- a utility function:

$$\mu:(s_{1}, ..., s_{N}) \in \prod_{i=1}^{N} \mapsto (g_{1}, ..., g_{N}) \in \mathbb{R}^N $$

It is often represented as a matrix, and especially a mere table for 2-player games. So it sums up like this for example:

|  X \ Y |   Ace   |  Queen  |
|:------:|:-------:|:-------:|
|**King**| (-1, 1) | (1, -1) |
|  **10**| (-3, 3) | (-1, 1) |

In this game, if X plays a 10 and Y plays the Ace, Y will get 3 points and X will lose 3 points. The mean value of utility for X is -0.5, his cards aren't good!

In Game Theory, the utility (the gain function) can be anything too. It can be expressed in euros, happiness, pastries, or a mix of all three!

*What about the prisoner's dilemma?*

It's a 2 players game with 2 strategies each: Cooperate (C) or Defect (D).

- Players $$N = \{X, Y\}$$
- Strategies $$S_{X} = \{Cooperate, Defect\} = S_{Y}$$
- The utility is:

|     X \ Y     | Cooperate | Defect |
|:-------------:|:---------:|:------:|
| **Cooperate** |   (3, 3)  | (0, 5) |
|    **Defect** |   (5, 0)  | (1, 1) |

Here we took the opposite situation described in the little story. It looks more like a loot sharing situation.

### Equilibria

The main goal of Game Theory in to find equilibria: these are special situations that allows one to guess what to do.

One of the most well-known is the **Nash Equilibrium**: it is a point which no one would deviate from, as it would reduce the utility.

For the prisoner's dilemma, it's the strategy {D, D} that lead to a utility of 1 to everyone.

As exposed in the story, a player which is rational have no reason to change its strategy!

Another Equilibrium is the **Pareto Optimum**. It is a situation where you can't increase the utility of a player without reducing the utility of another player. The strategies {C, C}, {C, D} and {D, C} are Pareto Optimums. For example, from {C, C} to increase the utility of player X, he can only do that by reducing the utility of Y.

### The paradox

The 'paradox' can be summarized in one sentence:

> In the Prisoner's Dilemma game, none of Nash Equilibria are Pareto Optimums.

The only Nash Equilibrium is the situation {D, D}.
And it isn't a Pareto Optimum: if both players cooperate, they can simultaneously increase their gain! But since it is a Nash equilibrium, neither player has any interest in doing that. Playing both Cooperate is sub-optimal as a player could easily betray to increase his winnings!

The strategy Cooperate is said "dominated" by the strategy "Defect", because whatever the opponent do, it is better to betray.

To be precise, the Prisoner's dilemma happen for every game like this:

| X \ Y |    C    |    D   |
|:-----:|:-------:|:------:|
| **C** |  (b, b) | (d, a) |
| **D** |  (a, d) | (c, c) |

With a > b > c > d $\geq$ 0

The situation {C, C} is called the "social optimum", as it is the highest total utility. But it will never be played.

*But what if the two players can talk to each other?*
There might be betrayals, it's just talk.

So what if they can't, but they can play repeatedly?

**Will it build trust or resentment?**

## 2. Iterated Prisoner's dilemma

### New behaviors

If one knows what the opponent have played during the last 50 rounds, it is more likely to know what to chose.

But it would induce very complicated algorithm to find the right strategy.

In fact, the mathematicians Press and Dyson have found that for infinite rounds (and it will work for an enough big number of rounds in practice), it is enough to know the action of the previous round to make a good strategy.

So we will adapt our strategies to the actions of the previous round!

### New strategies

#### Pure strategies

If we both cooperated, let's cooperate again.
If I cooperated but the opponent betrayed me, let's betray him next round.
If we betrayed him and he attempted to cooperate, let's betray him again, it works!
If we both betray, we'll try to both increase our gain by cooperating.

We just build the following strategy:

| X \ Y |     C     |     D     |
|:-----:|:---------:|:---------:|
| **C** | Cooperate |   Defect  |
| **D** |   Defect  | Cooperate |

We will simplify it as this:

| X \ Y | C | D |
|:-----:|:-:|:-:|
| **C** | 1 | 0 |
| **D** | 0 | 1 |

With 1 meaning 100% chance for X to cooperate the next round and 0 meaning 0% for X chance to cooperate the next round (100% chance of betrayal).

We can have other strategies:

*The naive*

| X \ Y | C | D |
|:-----:|:-:|:-:|
| **C** | 1 | 1 |
| **D** | 1 | 1 |

*The thief*

| X \ Y | C | D |
|:-----:|:-:|:-:|
| **C** | 0 | 0 |
| **D** | 0 | 0 |

*The copycat* (copies what the opponent played last turn)

| X \ Y | C | D |
|:-----:|:-:|:-:|
| **C** | 1 | 0 |
| **D** | 1 | 0 |

#### Mixed strategies

You can even randomize the chances to cooperate.

*The undecided* (0.5 meaning 50% chance to cooperate)

| X \ Y |  C  |  D  |
|:-----:|:---:|:---:|
| **C** | 0.5 | 0.5 |
| **D** | 0.5 | 0.5 |

*The cautious*

| X \ Y |  C   |  D  |
|:-----:|:----:|:---:|
| **C** | 0.99 | 0.5 |
| **D** | 0.9  | 0.1 |

You can invent your own!

We just need one thing more before comparing strategies: the initial situation! It doesn't depend on the "last round" because it's the first...

### Let's fight!

We will compare two strategies:

*The resentful*: betray him once, he will always betray!
He cooperates first.

| X \ Y | C | D |
|:-----:|:-:|:-:|
| **C** | 1 | 0 |
| **D** | 0 | 0 |

*The cautious*.
He cooperates first.

| X \ Y |  C   |  D  |
|:-----:|:----:|:---:|
| **C** | 0.99 | 0.5 |
| **D** | 0.9  | 0.1 |

Here's what happened when playing 2,000 rounds (blue for the *cautious* and red for the *resentful*)

![Graph](../assets/4-resentful-vs-cautious.png)

The mean gain was 3 while they both cooperate, and then it breaks down when the cautious betrays for the first time (he had 1% chance to betray in the {C, C} situation).
Then, the resentful always betrayed, even when the cautious tried to cooperate. That's why the gain of the cautious went down to 1 (as the Nash Equilibrium {D, D} utility is 1). Sometimes the cautious attempt to cooperates and gets 0 while the resentful gets 5 by defecting.

There are even more graphs than strategies, so try it out with my script [just here](todo)!

## 3. Appendix: Press & Dyson work

### Only one

Things

→ [All articles](../articles.md)

## References

[^original]: <https://dev.ewen.quimerch.com>
