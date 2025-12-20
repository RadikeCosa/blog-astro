---
title: "Purge Most Frequent - FreeCodeCamp #132 Daily Challenge"
published: 2025-12-20T12:08:54.082Z
description: 'We solve "Purge Most Frequent": remove all most frequent elements from an array, handling ties and various types. Includes explanation, code, and analysis.'
updated: ''
tags:
  - daily-challenge
  - freecodecamp
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "purge-most-frequent"
---

## Purge Most Frequent - Analysis and Explanation

### Problem Statement

Given an array, remove all occurrences of the most frequent element(s) and return the resulting array.

- If there is a tie for highest frequency, remove all such elements.
- The order of the remaining elements must not change.

## Initial Analysis

### What does the problem ask?

Identify the most frequent element(s) in the array and remove all their occurrences, keeping the order of the rest.

#### Examples

1. `[1, 2, 2, 3]` → `[1, 3]`  (most frequent is `2`)
2. `["a", "b", "d", "b", "c", "d", "c", "d", "c", "d"]` → `["a", "b", "b", "c", "c", "c"]`  (most frequent is `d`)
3. `["red", "blue", "green", "red", "blue", "green", "blue"]` → `["red", "green", "red", "green"]`  (most frequent is `blue`)
4. `[5, 5, 5, 5]` → `[]`  (all are most frequent)

**Edge cases:**

- Empty array: `[]` → `[]`
- All with same frequency: `[1, 2, 3, 4]` → `[]`
- Non-primitive elements: `[{a:1}, {a:1}, {b:2}]` (each object is unique by reference)
- Booleans: `[true, false, true, false, true]` → `[false, false]`

## Solution and Explanation

### Proposed Approach

1. Count the frequency of each element using a `Map`.
2. Identify the maximum frequency and all values that reach it (there may be ties).
3. Filter the original array, excluding the most frequent elements, keeping the order.

This method is efficient, clear, and handles ties and any primitive type.

### JavaScript Implementation

```javascript
function purgeMostFrequent(arr) {
  const frequencyMap = new Map()
  // Count frequencies
  for (const item of arr) {
    frequencyMap.set(item, (frequencyMap.get(item) || 0) + 1)
  }
  // Find the maximum frequency
  const maxFrequency = Math.max(...frequencyMap.values())
  // Identify the most frequent elements
  const mostFrequent = new Set(
    [...frequencyMap.entries()]
      .filter(([_, freq]) => freq === maxFrequency)
      .map(([item]) => item)
  )
  // Filter the original array
  return arr.filter(item => !mostFrequent.has(item))
}
```

## Complexity Analysis

- **Time:** $O(n + k)$, where $n$ is the array length and $k$ is the number of unique elements. In the worst case, $O(n)$.
- **Space:** $O(k)$, for the `Map` and `Set` of unique elements.

## Edge Cases and Considerations

- Empty array: returns empty array.
- All with same frequency: result is empty.
- Non-primitive elements: each object is unique by reference.
- Booleans, null, undefined: handled correctly.
- Immutability: the original array is not modified.

## Reflections and Learnings

- Use of `Map` and `Set` for efficient counting and filtering.
- Clear separation of phases: counting, identification, and filtering.
- The pattern of filtering by a global property is very useful in arrays.
- If the data is always primitive, a plain object could be used instead of `Map`.
- One-pass algorithms are not viable here, since you need to know the max frequency before filtering.

## Resources and References

- [MDN Web Docs: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
