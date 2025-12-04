---
title: "Rotate Image - LeetCode #48 Top Interview 11/150"
published: 2025-12-04T16:41:51.394Z
description: 'Solving the "Rotate Image" problem from LeetCode (Top Interview 150). We explain the transpose and reverse approach.'
updated: ''
tags:
  - leetcode
  - top-interview-150
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "rotate-image"
---

## Introduction

Rotating a square matrix 90° clockwise is a classic interview and algorithm problem. The key is to do it **in-place**, meaning without using extra memory. In this post, we break down the solution pattern, visualize the process, and analyze its efficiency.

## Problem Statement

> Given an `n x n` square matrix, rotate the matrix 90 degrees clockwise **in-place** (without creating another matrix).

**Example:**

Before:
```
1 2 3
4 5 6
7 8 9
```

After:
```
7 4 1
8 5 2
9 6 3
```

## Strategy: Transpose and Reverse

1. **Transpose the matrix**: Swap rows with columns.
2. **Reverse each row**: Reverse every row to complete the rotation.

### Why does this work?

- Transposing turns rows into columns.
- Reversing each row places the elements in the correct position for a 90° rotation.

## Step-by-Step Implementation

```javascript
function rotate(matrix) {
  const n = matrix.length
  // Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }
  // Reverse rows
  for (let i = 0; i < n; i++) {
    matrix[i].reverse()
  }
}
```

## Complexity Analysis

- **Time:** $O(n^2)$ (two full traversals)
- **Space:** $O(1)$ (in-place, no extra memory)

## Reflections and Takeaways

- The transpose + reverse pattern is useful for rotations and matrix manipulation.
- In-place manipulation is key for optimizing space.
- Visualizing the movement helps understand the algorithm.

## Resources

- [Matrices (Wikipedia)](https://en.wikipedia.org/wiki/Matrix_(mathematics))
- [Matrix Transpose](https://en.wikipedia.org/wiki/Transpose)
