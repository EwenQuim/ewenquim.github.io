---
date: 2021-01-01
title: Solving sudokus in a millisecond (Go ⚡️ vs Python 🐌 benchmark)
authors: ["ewenquim"]
categories:
  - memo
tags:
  - maths
toc: true
---

```bash
· · · │ · · · │ 1 · ·
3 · 1 │ 7 9 · │ · · ·
· 4 · │ · · · │ · · 7
──────┼───────┼──────
· · 5 │ · · 7 │ 3 · ·
7 · · │ 5 · 2 │ · · ·
· · 8 │ · 1 · │ 2 · ·
──────┼───────┼──────
6 · 7 │ · · 9 │ · 3 ·
· 1 · │ 2 · · │ · 5 ·
· · 9 │ · · · │ · · 8
```

Ok so this basically is a sudoku. Try to solve it by hand if you want !

We will solve it **in a millisecond** thanks to the new programming language [Go](https://golang.org/).

## The story

My grandmother loves sudoku, so I wanted to make a tool to help her find the answer.

The first step is to design an algorithm. Then, ideally one should try to create an application with computer vision to identify the numbers and then apply the algorithm.

So I wrote an algorithm for the first time 5 years ago, in Python. It was able to solve a sudoku in a few seconds. Now, I have improved and rewritten it in Go, in order to learn this language and explore its possibilities.

Here is how to solve a sudoku in a millisecond.

## The algorithm

The goal is to fill the grid with numbers. For a given number, there must be only one occurrence for each line, each column and each 3x3 cell.

There are many ways to solve a sudoku.

### The brute-force

Simply trying every number from 1 to 9 in each cell, independently of other cells. And when every cell is filled, verify that the rules are respected.

```bash
· · · │ · · · │ 1 · ·    ₁ ₁ ₁ │ ₁ ₁ ₁ │ 1 ₁ ₁
3 · 1 │ 7 9 · │ · · ·    3 ₁ 1 │ 7 9 ₁ │ ₁ ₁ ₁
· 4 · │ · · · │ · · 7    ₁ 4 ₁ │ ₁ ₁ ₁ │ ₁ ₁ 7
──────┼───────┼──────    ──────┼───────┼──────
· · 5 │ · · 7 │ 3 · ·    ₁ ₁ 5 │ ₁ ₁ 7 │ 3 ₁ ₁
7 · · │ 5 · 2 │ · · ·    7 ₁ ₁ │ 5 ₁ 2 │ ₁ ₁ ₁
· · 8 │ · 1 · │ 2 · ·    ₁ ₁ 8 │ ₁ 1 ₁ │ 2 ₁ ₁
──────┼───────┼──────    ──────┼───────┼──────
6 · 7 │ · · 9 │ · 3 ·    6 ₁ 7 │ ₁ ₁ 9 │ ₁ 3 ₁
· 1 · │ 2 · · │ · 5 ·    ₁ 1 ₁ │ 2 ₁ ₁ │ ₁ 5 ₁
· · 9 │ · · · │ · · 8    ₁ ₁ 9 │ ₁ ₁ ₁ │ ₁ ₁ 8
```

First, try to fill every thing with ones. This isn't a valid sudoku, so let's change one number, the last "2".

```bash
₁ ₁ ₁ │ ₁ ₁ ₁ │ 1 ₁ ₁
3 ₁ 1 │ 7 9 ₁ │ ₁ ₁ ₁
₁ 4 ₁ │ ₁ ₁ ₁ │ ₁ ₁ 7
──────┼───────┼──────
₁ ₁ 5 │ ₁ ₁ 7 │ 3 ₁ ₁
7 ₁ ₁ │ 5 ₁ 2 │ ₁ ₁ ₁
₁ ₁ 8 │ ₁ 1 ₁ │ 2 ₁ ₁
──────┼───────┼──────
6 ₁ 7 │ ₁ ₁ 9 │ ₁ 3 ₁
₁ 1 ₁ │ 2 ₁ ₁ │ ₁ 5 ₁
₁ ₁ 9 │ ₁ ₁ ₁ │ ₁ ₂ 8
```

And so on. For a game with 20 hints at the beginning, there is 9^(81-20) possibilities to explore, so... 16,173,092,699,229,880,893,718,618,465,586,445,357,583,280,647,840,659,957,609 combinations possible. Even with a 4GHz processor, it'll take like 10^39 centuries to compute everything. Quite a long time. Let's reduce this number.

### The smart brute-force: backtracking

Basically, this is the labyrinth algorithm.

> Just go right again and again. When you get stuck, go back to the previous crossroads and turn left instead of right. Then continue with the same strategy.

We start at the top left and with the smallest number possible.

```bash
₂ · · │ · · · │ 1 · ·
3 · 1 │ 7 9 · │ · · ·
· 4 · │ · · · │ · · 7
──────┼───────┼──────
· · 5 │ · · 7 │ 3 · ·
7 · · │ 5 · 2 │ · · ·
· · 8 │ · 1 · │ 2 · ·
──────┼───────┼──────
6 · 7 │ · · 9 │ · 3 ·
· 1 · │ 2 · · │ · 5 ·
· · 9 │ · · · │ · · 8
```

The 1 doesn't fit, but the 2 is okay. We'll try the next cell.

```bash
₂ ₅ · │ · · · │ 1 · ·
3 · 1 │ 7 9 · │ · · ·
· 4 · │ · · · │ · · 7
──────┼───────┼──────
· · 5 │ · · 7 │ 3 · ·
7 · · │ 5 · 2 │ · · ·
· · 8 │ · 1 · │ 2 · ·
──────┼───────┼──────
6 · 7 │ · · 9 │ · 3 ·
· 1 · │ 2 · · │ · 5 ·
· · 9 │ · · · │ · · 8
```

The smallest number possible to write is 5. Let's continue, until we're stuck.

```bash
₂ ₅ ₆ │ ₃ ₄ ₈ │ 1 ₉ ?
3 · 1 │ 7 9 · │ · · ·
· 4 · │ · · · │ · · 7
──────┼───────┼──────
· · 5 │ · · 7 │ 3 · ·
7 · · │ 5 · 2 │ · · ·
· · 8 │ · 1 · │ 2 · ·
──────┼───────┼──────
6 · 7 │ · · 9 │ · 3 ·
· 1 · │ 2 · · │ · 5 ·
· · 9 │ · · · │ · · 8
```

At the end of the line, it is impossible to place a number. So let's go back to the previous cell, with the 9. We will increase this number by one unit. Since this is not possible either, we go back to the 8 and erase the 9. For the 8, it is not possible to increase, so we delete the 8 and go back to the 4. Here it is possible to increase the 4. The next available number is 8, because 5, 6 and 7 are impossible to insert.

```bash
₂ ₅ ₆ │ ₃ ₈ · │ 1 · ·
3 · 1 │ 7 9 · │ · · ·
· 4 · │ · · · │ · · 7
──────┼───────┼──────
· · 5 │ · · 7 │ 3 · ·
7 · · │ 5 · 2 │ · · ·
· · 8 │ · 1 · │ 2 · ·
──────┼───────┼──────
6 · 7 │ · · 9 │ · 3 ·
· 1 · │ 2 · · │ · 5 ·
· · 9 │ · · · │ · · 8
```

This is called _backtracking_. Repeat the same algorithm until a solution is found.

### Let's do better

The algorithm is quite fast, but is not optimized. Indeed, it is not a good idea to start at the top left and continue in the reading direction. We can **define a custom order**! A good idea could be to count the number of possible digits to fit in each cell at the beginning (when the grid is empty). For example, the top left cell has 4 possibilities: 2, 5, 8 and 9. We can see that some cells have only one number available!

```bash
4 6 2 │ 4 6 5 │ · 5 6
· 4 · │ · · 4 │ 4 4 4
4 · 2 │ 4 5 5 │ 4 4 ·
──────┼───────┼──────
4 3 · │ 4 3 · │ · 5 4
· 3 3 │ · 4 · │ 4 5 4
2 3 · │ 4 · 3 │ · 4 4
──────┼───────┼──────
· 3 · │ 3 3 · │ 1 · 3
2 · 2 │ · 5 4 │ 4 · 3
3 3 · │ 4 5 5 │ 3 5 ·
```

Then, we apply the previous algorithm, beginning by the cells where there are the fewer possibilities.

```bash
· · · │ · · · │ 1 · ·
3 · 1 │ 7 9 · │ · · ·
· 4 · │ · · · │ · · 7
──────┼───────┼──────
· · 5 │ · · 7 │ 3 · ·
7 · · │ 5 · 2 │ · · ·
· · 8 │ · 1 · │ 2 · ·
──────┼───────┼──────
6 · 7 │ · · 9 │ ₄ 3 ·
· 1 · │ 2 · · │ · 5 ·
· · 9 │ · · · │ · · 8
```

_There is only one digit available : this one won't have to change and won't block the other numbers !_

### Time vs Space tradeoffs

This is a classical Computer Science thing.

Remember when I said that it is a good idea to count the number of possible digits to fit in each cell ? In fact, we can not only keep this number but the numbers themselves. We do not need to do a useless +1 and check if it is correct : just jump from 2 to 5 directly !

This will increase matrix complexity from 9x9 to 9x9x9 maximum, but honestly this is nothing compared to the time we'll gain.

## Python vs. Go benchmark

Basically Go is 1000x faster than the original Python 3.9 (I haven't tested CPython yet but honestly, this is kinda cheating + ugly).

You can see my algorithm for Python [here](https://github.com/EwenQuim/sudoku-solver/blob/master/solver.py) and Go [here](https://github.com/EwenQuim/sudoku-solver-go/blob/master/solver.go).

WIP graphs.
