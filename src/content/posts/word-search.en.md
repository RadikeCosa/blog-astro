---
title: "Word Search: FreeCodeCamp Daily Challenge November 9, 2025"
pubDate: 2025-11-09
description: "Implementation of an algorithm to search for words in a 2D matrix, exploring in the four main directions."
tags: ["algorithms", "data-structures", "matrix", "search", "javascript"]
category: "coding-challenges"
lang: "en"
---

## Introduction

In this post, we will explore a classic algorithm problem: searching for a specific word in a 2D grid of letters. This type of challenge is common in programming exercises like LeetCode or FreeCodeCamp, allowing us to practice fundamental concepts such as matrix handling, directional traversals, and boundary checking.

The challenge is to find the start and end positions of a word that appears in a straight line (horizontal or vertical, including reversed directions) within a grid of lowercase letters.

## Problem Statement

Given a 2D matrix `matriz` of lowercase letters (a-z) and a target word `palabra`, we must return the start and end positions of that word if it appears exactly once in the matrix. The word can be oriented in any of the four main directions:

- Right (horizontal)
- Left (horizontal reversed)
- Down (vertical)
- Up (vertical reversed)

If the word is not found, we return `null`.

### Example

Consider the following matrix:

```text
[
  ["a", "c", "t"],
  ["t", "a", "t"],
  ["c", "t", "c"]
]
```

For the word `"cat"`, the function should return `[[0, 1], [2, 1]]`, as the word appears vertically from position `[0, 1]` ("c") to `[2, 1]` ("t").

## Approach and Analysis

### Initial Strategy

A straightforward approach is to traverse the entire matrix cell by cell. When we find a cell that matches the first letter of the word, we explore the four possible directions to check if the complete word forms along that path.

This approach ensures we find the word if it exists, as we cover all possible starting positions and valid orientations.

### Complexity Analysis

- **Time**: O(N × M × L), where N is the number of rows, M the number of columns, and L the word length. In the worst case, we visit each cell and, for each, check up to L letters in 4 directions.
- **Space**: O(1), as we only use constant auxiliary variables.

### Special Considerations

- The matrix may not be square.
- The word may be at the edges or corners.
- We must check boundaries at each step to avoid out-of-range accesses.

## Implemented Solution

The JavaScript implementation uses a helper function `verificarDireccion` that, given a starting position and a direction, checks if the word forms completely in that direction.

```javascript
export default function findWord(matriz, palabra) {
  // Define the 4 possible directions
  const direcciones = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
  ]

  function verificarDireccion(filaInicio, colInicio, deltaFila, deltaCol) {
    let fila = filaInicio
    let col = colInicio

    for (let i = 0; i < palabra.length; i++) {
      if (
        fila < 0
        || fila >= matriz.length
        || col < 0
        || col >= matriz[0].length
        || matriz[fila][col] !== palabra[i]
      ) {
        return false
      }
      fila += deltaFila
      col += deltaCol
    }
    return true
  }

  // Traverse the matrix
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      if (matriz[i][j] === palabra[0]) {
        for (const [deltaFila, deltaCol] of direcciones) {
          if (verificarDireccion(i, j, deltaFila, deltaCol)) {
            const filaFin = i + deltaFila * (palabra.length - 1)
            const colFin = j + deltaCol * (palabra.length - 1)
            return [[i, j], [filaFin, colFin]]
          }
        }
      }
    }
  }

  return null
}
```

### Execution Diagram

To illustrate the process, let's see how "cat" is found in the example:

```mermaid
graph TD
  A[Start: [0,1] 'c'] --> B[[1,1] 'a']
  B --> C[[2,1] 't']
  C --> D[Success: return [[0,1], [2,1]]]
```

## Optimization and Improvements

Although the current solution is efficient for most cases, we can consider some optimizations:

1. **Pre-boundary check**: Before exploring a direction, calculate if there is enough space for the complete word.
2. **DFS/BFS Search**: For more complex problems allowing direction changes, we could use depth-first or breadth-first search.
3. **Preprocessing**: If searching for multiple words, we could index the positions of each letter.
4. **Sufficient space check**: Before exploring a direction, check if the word length fits in the remaining positions to the matrix boundary in that direction. For example, for the right direction from [i,j], check if `j + palabra.length - 1 < matriz[0].length`.

However, for this specific problem, the brute-force solution is adequate and clear.

## Conclusion

This algorithm teaches us to handle directional traversals in matrices, a common pattern in search and graph problems. The key is to systematically check all possibilities while maintaining efficiency.

The applied concepts include:

- **Matrix index and boundary handling**: In the `verificarDireccion` function, we check in each iteration that `fila` and `col` are within valid limits (`fila >= 0 && fila < matriz.length && col >= 0 && col < matriz[0].length`) before accessing `matriz[fila][col]`, avoiding index errors.
- **Multi-directional exploration**: We define a `direcciones` array with the offsets for the four possible directions (right, left, down, up) and, from each position matching the first letter, test each direction to form the complete word.
- **Incremental condition verification**: In the `verificarDireccion` loop, we advance step by step checking each letter of the word, stopping immediately if there's a mismatch or boundary reached, optimizing the process with fast failure.
