---
title: "Missing Numbers - FreeCodeCamp #34 Daily Challenge"
published: 2025-12-24T01:34:16.986Z
description: 'We solve "Missing Numbers" from FreeCodeCamp, an algorithm challenge about finding missing numbers in a sequence.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "missing-numbers"
---

## Problem Statement

Given an array of integers from 1 to n (inclusive), return an array with all the numbers missing in the range [1, n], where n is the maximum value in the array.

- The array can be unsorted and contain duplicates.
- The result must be in ascending order.
- If no numbers are missing, return an empty array.

## Initial Analysis

The goal is to identify the absent numbers in the range [1, n], considering duplicates and disorder. The result should always be sorted.

### Test Cases

1. **No missing numbers:**
   - Input: [1, 2, 3, 4, 5]
   - Output: []
2. **Missing in the middle:**
   - Input: [1, 3, 5]
   - Output: [2, 4]
3. **Only extremes:**
   - Input: [1, 10]
   - Output: [2, 3, 4, 5, 6, 7, 8, 9]
4. **Duplicates and unsorted:**
   - Input: [10, 1, 10, 1, 10, 1]
   - Output: [2, 3, 4, 5, 6, 7, 8, 9]
5. **Scattered missing values:**
   - Input: [3, 1, 4, 1, 5, 9]
   - Output: [2, 6, 7, 8]
6. **One missing, many duplicates:**
   - Input: [1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 6, 8, 9, 3, 2, 10, 7, 4]
   - Output: [11]

## Solution and Explanation

The most direct method is:

1. Find the maximum value in the array (`n`).
2. Use an auxiliary array or a `Set` to mark present numbers.
3. Iterate through the range [1, n] and collect those not present.

This handles duplicates and disorder, and ensures the result is sorted.

## Final Code

```js
function findMissingNumbers(arr) {
  const max = Math.max(...arr)
  const count = new Array(max + 1).fill(0)
  for (const num of arr) count[num] = 1
  const missing = []
  for (let i = 1; i <= max; i++) {
    if (!count[i])
      missing.push(i)
  }
  return missing
}
```

## Complexity Analysis

- **Time:** $O(n + m)$, where $n$ is the length of the array and $m$ is the maximum value.
- **Space:** $O(m)$ for the auxiliary array.

## Edge Cases and Considerations

- If the array is empty, return [].
- If no numbers are missing, return [].
- Supports duplicates and unsorted input.

## Resources

- [Array documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Set in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

---
