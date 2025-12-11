---
title: "Array Duplicates - FreeCodeCamp Daily Challenge"
published: 2025-12-11T21:40:59.335Z
description: 'We solve "Array Duplicates", a FreeCodeCamp challenge that involves finding duplicate numbers in an array of integers. We analyze the problem, develop an efficient solution, and discuss its complexity.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "array-duplicates"
---

## Array Duplicates: Analysis and Solution

## Problem Statement

Given an array of integers, return a new array with the numbers that appear more than once, sorted in ascending order and without repetitions. If there are no duplicates, return an empty array.

## Initial Analysis

**Key points:**

- Only numbers that appear at least twice are considered duplicates.
- The result must not contain repetitions.
- The output array must be sorted in ascending order.
- If there are no duplicates, the result is an empty array.

### Test Cases

| Input | Expected Output | Explanation |
|---|---|---|
| `[1, 2, 3, 4, 5]` | `[]` | No duplicates |
| `[1, 2, 3, 4, 1, 2]` | `[1, 2]` | 1 and 2 appear more than once |
| `[2, 34, 0, 1, -6, 23, 5, 3, 2, 5, 67, -6, 23, 2, 43, 2, 12, 0, 2, 4, 4]` | `[-6, 0, 2, 4, 5, 23]` | Several duplicates, including negatives and zeros |

## Solution Development

### Strategy

1. Use a `Map` to count the frequency of each number (supports negatives and zeros).
2. Filter numbers whose frequency is greater than 1.
3. Sort the result in ascending order.
4. Return the array (empty if there are no duplicates).

### Final Commented Code

```javascript
/**
 * Returns the duplicate numbers from an array, sorted and without repetitions.
 * @param {number[]} arr - Array of integers
 * @returns {number[]} Array of sorted duplicates
 */
function findDuplicates(arr) {
  const frequencyMap = new Map() // Stores the frequency of each number
  const result = []

  // Count frequencies
  for (const num of arr) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1)
  }

  // Filter duplicates
  for (const [num, count] of frequencyMap.entries()) {
    if (count > 1)
      result.push(num)
  }

  // Sort ascending
  result.sort((a, b) => a - b)
  return result
}

export default findDuplicates
```

## Complexity Analysis

### Time

- Counting frequencies: $O(n)$
- Filtering duplicates: $O(n)$
- Sorting duplicates: $O(k \log k)$, where $k$ is the number of duplicates
- **Total:** $O(n + k \log k)$

### Space

- Frequency `Map`: up to $O(n)$
- Result array: up to $O(n)$
- **Total:** $O(n)$

## Edge Cases and Considerations

- Empty array → returns `[]`
- All unique → returns `[]`
- All equal → returns `[value]`
- Negative numbers, zeros, and positives → supported
- Large arrays → efficient

## Reflections and Learnings

- Efficient use of `Map` for counting
- Filtering and numeric sorting
- Edge case validation

## Resources

- [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN: Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
