---
title: "Checkerboard - FreeCodeCamp #130 Daily Challenge"
published: 2025-12-18T22:03:36.307Z
description: 'We solve "Checkerboard", FreeCodeCamp challenge #130, by building a checkerboard using efficient JavaScript algorithms.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "checkerboard"
---

## Checkerboard - Analysis & Explanation

## Problem Statement

Given an array with two numbers, the first indicates the number of rows and the second the number of columns. You must return a matrix (array of arrays) filled with alternating "X" and "O", like a checkerboard. The top-left corner is always "X".

Example for [3, 3]:

```text
[
  ["X", "O", "X"],
  ["O", "X", "O"],
  ["X", "O", "X"]
]
```

## Initial Analysis

The challenge is to build a two-dimensional matrix that simulates a checkerboard, alternating "X" and "O" in each cell. The pattern must be maintained in both rows and columns, alternating characters in every position.

## Test Cases

- [3, 3]: [["X", "O", "X"], ["O", "X", "O"], ["X", "O", "X"]]
- [6, 1]: [["X"], ["O"], ["X"], ["O"], ["X"], ["O"]]
- [2, 10]: [["X", "O", ...], ["O", "X", ...]]
- [5, 4]: [["X", "O", "X", "O"], ["O", "X", "O", "X"], ...]

## Solution Approach

The key is to iterate through the matrix and decide the value of each cell based on the sum of its indices: if the sum is even, place "X"; if odd, place "O". This efficiently generates the alternating pattern.

### Why does it work?

By adding the row and column indices, we get a value that determines the parity of the position. Even sums correspond to "X" and odd sums to "O", creating the desired pattern. For example:

- (0,0) → 0 + 0 = 0 (even) → "X"
- (0,1) → 0 + 1 = 1 (odd) → "O"
- (1,0) → 1 + 0 = 1 (odd) → "O"
- (1,1) → 1 + 1 = 2 (even) → "X"

### Implementation

```javascript
function createBoard(dimensions) {
  // We use destructuring to get rows and columns
  const [rows, cols] = dimensions
  // Initialize an empty matrix with the given number of rows and columns
  const board = new Array(rows).fill(null).map(() => new Array(cols))
  // Iterate through each cell to assign "X" or "O"
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Assign "X" if the sum of indices is even, "O" if odd
      board[i][j] = (i + j) % 2 === 0 ? 'X' : 'O'
    }
  }
  return board
}
```

## Complexity

- Time: $O(n \times m)$, where $n$ is rows and $m$ is columns.
- Space: $O(n \times m)$, for the generated matrix.

## Edge Cases

- If any dimension is zero, return an empty matrix.
- For [1, 1], return [["X"]].
- Works for any positive size.

## Reflections

- Use of nested loops and modular arithmetic.
- Efficient initialization of 2D arrays in JavaScript.
- The solution is optimal: each cell is calculated in constant time.

## Resources

- [MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Wikipedia Checkerboard](https://en.wikipedia.org/wiki/Checkerboard)
