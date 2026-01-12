---
title: "Tic Tac Toe - FreeCodeCamp #153 Daily Challenge"
published: 2026-01-12T15:36:18.816Z
description: 'We solve "Tic Tac Toe" (FreeCodeCamp Daily Challenge): how to determine the state of a Tic Tac Toe game. Analysis, commented code, visuals, and reflections.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "tic-tac-toe"
---

## Tic Tac Toe: Analysis & Explanation

### Problem Statement

Given a 3x3 matrix (array of arrays) representing a complete Tic Tac Toe board, determine the winner.

- Each element of the matrix can be "X" or "O".
- A player wins if they have three of their symbols in a row, column, or diagonal.

Return:

- "X wins" if X is the winner
- "O wins" if O is the winner
- "Draw" if there is no winner

## Initial Analysis

### Understanding the Problem

The goal is to analyze a Tic Tac Toe board and determine the winner based on the positions of "X" and "O". A player wins if they have three of their symbols in a line (horizontal, vertical, or diagonal). If neither player meets this condition, the result is a draw.

### Test Cases

- ticTacToe([["X", "O", "X"], ["O", "X", "O"], ["O", "X", "X"]]) → "X wins" (X wins diagonally)
- ticTacToe([["O", "O", "O"], ["X", "X", "O"], ["X", "O", "X"]]) → "O wins" (O wins horizontally)
- ticTacToe([["X", "O", "X"], ["O", "X", "O"], ["O", "X", "O"]]) → "Draw" (draw)
- ticTacToe([["X", "X", "X"], ["O", "O", "X"], ["O", "X", "O"]]) → "X wins" (X wins horizontally)
- ticTacToe([["O", "X", "X"], ["O", "X", "O"], ["O", "X", "O"]]) → "O wins" (O wins vertically)

## Solution Development

### Approach

1. Check all rows to see if any have three "X" or three "O".
2. Check all columns to see if any have three "X" or three "O".
3. Check both diagonals to see if any have three "X" or three "O".
4. If a winner is found, return the corresponding result.
5. If there is no winner, return "Draw".

### Step-by-Step Implementation

1. Create a function `ticTacToe` that receives a 3x3 matrix.
2. Implement checks for rows, columns, and diagonals.
3. Return the result as appropriate.

### Final Code

```javascript
/**
 * FreeCodeCamp Problem: Tic Tac Toe
 * Determines the state of a 3x3 Tic Tac Toe board.
 * @param {string[][]} board - 3x3 matrix with "X" and "O"
 * @returns {string} "X wins", "O wins" or "Draw"
 */
function ticTacToe(board) {
  // Checks if a player has a winning line
  const check = (a, b, c) => a === b && b === c && a !== ''

  // Check rows
  for (let i = 0; i < 3; i++) {
    if (check(board[i][0], board[i][1], board[i][2]))
      return `${board[i][0]} wins`
  }
  // Check columns
  for (let j = 0; j < 3; j++) {
    if (check(board[0][j], board[1][j], board[2][j]))
      return `${board[0][j]} wins`
  }
  // Check diagonals
  if (check(board[0][0], board[1][1], board[2][2]))
    return `${board[0][0]} wins`
  if (check(board[0][2], board[1][1], board[2][0]))
    return `${board[0][2]} wins`
  // If no one wins
  return 'Draw'
}
```

## Complexity Analysis

### Time Complexity

The function checks all rows, columns, and diagonals. Each check is $O(1)$ because the matrix size is fixed (3x3). Therefore, the time complexity is $O(1)$ (constant).

### Space Complexity

Space usage is also $O(1)$, as only scalar variables are used.

## Edge Cases & Considerations

- Boards where both players have a winning line: according to the implementation, the first winner found is returned (rows, then columns, then diagonals).
- Boards with only one type of symbol: the algorithm returns the winner if there is a line, or "Draw" if not.
- Boards with multiple winning lines for the same player: the result is still correct.

## Reflections & Learnings

### Concepts Applied

- Board game simulation
- Systematic matrix traversal
- Separation of logic into helper functions for readability

### Possible Optimizations

For a 3x3 board, the solution is optimal and needs no improvements. If the board were variable-sized, the function could be generalized to accept any dimension and number of symbols in a row to win.

## Resources & References

- [Wikipedia: Tic-tac-toe (es)](https://es.wikipedia.org/wiki/Tres_en_l%C3%ADnea)
- [Wikipedia: Tic-tac-toe (en)](https://en.wikipedia.org/wiki/Tic-tac-toe)

---
