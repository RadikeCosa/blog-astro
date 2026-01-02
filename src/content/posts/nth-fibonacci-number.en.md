---
title: "Nth Fibonacci Number - FreeCodeCamp #145 Daily Challenge"
published: 2026-01-02T14:08:46.995Z
description: 'Solving "Nth Fibonacci Number" (FreeCodeCamp #145): explanation, JavaScript implementation and precision considerations.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "nth-fibonacci-number"
---

## Problem statement

Given a positive integer `n`, return the nth number in the Fibonacci sequence. The sequence starts like this (1-based indices):

1 → 0
2 → 1
3 → 1
4 → 2
5 → 3
6 → 5

Reference examples:

- `nthFibonacci(4)` → `2`
- `nthFibonacci(10)` → `34`
- `nthFibonacci(15)` → `377`
- `nthFibonacci(40)` → `63245986`
- `nthFibonacci(75)` → `1304969544928657`

## Analysis

Input `n` is interpreted as 1-based: `n = 1` corresponds to `0`, `n = 2` to `1`. The goal is to return the value at position `n`.

Requirements and considerations:

- Accept `n` as a positive integer.
- Keep the solution efficient for moderate `n` (e.g. up to tens of thousands if using `BigInt`).
- Handle JavaScript numeric precision limits for very large results.

## Solution (Approach)

The simplest space-efficient approach is iterative: keep the two latest values and advance until position `n`. Time complexity is O(n) and space complexity is O(1).

### Implementation (JavaScript, 1-based)

```javascript
function nthFibonacci(n) {
  if (n <= 0)
    throw new Error('n must be a positive integer (1-based)')
  if (n === 1)
    return 0
  if (n === 2)
    return 1

  let a = 0
  let b = 1
  for (let i = 3; i <= n; i++) {
    const next = a + b
    a = b
    b = next
  }
  return b
}

// Example usage
console.log(nthFibonacci(4)) // 2
console.log(nthFibonacci(10)) // 34
```

## Complexity

- Time complexity: O(n).
- Space complexity: O(1).

## Edge cases and notes

- `n <= 0`: throw an error (invalid input).
- `n = 1` and `n = 2`: base cases return `0` and `1` respectively.
- Precision: use `BigInt` if the result may exceed `Number.MAX_SAFE_INTEGER`.
- Faster alternatives (O(log n)) include matrix exponentiation or fast doubling; these are useful for extremely large `n`.

## Conclusion

The iterative solution is clear, efficient and adequate for most practical uses. For applications requiring exact results for very large indices, use `BigInt` or logarithmic-time algorithms.

## Resources

- [Fibonacci sequence - Wikipedia](https://en.wikipedia.org/wiki/Fibonacci_number)
- [freeCodeCamp - Daily Coding Challenge](https://www.freecodecamp.org/learn/daily-coding-challenge/)
