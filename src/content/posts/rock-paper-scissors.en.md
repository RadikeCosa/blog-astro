---
title: "Rock Paper Scissors - FreeCodeCamp #139 Daily Challenge"
published: 2025-12-27T20:04:58.915Z
description: 'We solve "Rock Paper Scissors" (FreeCodeCamp) with clear and efficient logic in JavaScript. Includes analysis, code, and visuals.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "rock-paper-scissors"
---

## Rock Paper Scissors - Analysis and Explanation

### Problem Statement

Given a game of "Rock, Paper, Scissors", receive two strings representing each player's choice: "Rock", "Paper", or "Scissors". Determine the result according to the classic rules:

- Rock beats Scissors
- Paper beats Rock
- Scissors beats Paper

Return:

- "Player 1 wins" if player one wins
- "Player 2 wins" if player two wins
- "Tie" if it's a draw

---

## Initial Analysis

You only need to compare the choices and decide the result. Input validation is not necessary, as all inputs are guaranteed to be valid.

---

## Test Cases

```js
rockPaperScissors('Rock', 'Rock') // "Tie"
rockPaperScissors('Rock', 'Paper') // "Player 2 wins"
rockPaperScissors('Scissors', 'Paper') // "Player 1 wins"
rockPaperScissors('Rock', 'Scissors') // "Player 1 wins"
rockPaperScissors('Scissors', 'Scissors') // "Tie"
rockPaperScissors('Scissors', 'Rock') // "Player 2 wins"
```

These cover all possible combinations.

---

## Solution Development

### Approach

A direct conditional structure is used:

- If both choose the same, it's a tie.
- If the combination is one of the three where player one wins, return "Player 1 wins".
- In any other case, player two wins.

### Step by Step

1. If player1 === player2 → "Tie"
2. If (player1, player2) is one of:

- ('Rock', 'Scissors')
- ('Paper', 'Rock')
- ('Scissors', 'Paper')
  → "Player 1 wins"

3. Otherwise, "Player 2 wins"

---

## Final Code

```javascript
/**
 * FreeCodeCamp: Rock Paper Scissors
 * @param {string} player1 - "Rock", "Paper" or "Scissors"
 * @param {string} player2 - "Rock", "Paper" or "Scissors"
 * @returns {string} Result: "Player 1 wins", "Player 2 wins" or "Tie"
 */
function rockPaperScissors(player1, player2) {
  if (player1 === player2)
    return 'Tie'
  if (
    (player1 === 'Rock' && player2 === 'Scissors')
    || (player1 === 'Paper' && player2 === 'Rock')
    || (player1 === 'Scissors' && player2 === 'Paper')
  ) {
    return 'Player 1 wins'
  }
  return 'Player 2 wins'
}

export default rockPaperScissors
```

## Complexity Analysis

### Time

The function is $O(1)$: it only compares strings and evaluates conditionals.

### Space

No auxiliary structures are used: $O(1)$.

---

## Edge Cases and Considerations

There are no edge cases beyond those covered, as the inputs are always valid and limited.

---

## Reflections and Learnings

**Concepts applied:**

- String comparison
- Conditionals
- Game logic

---
