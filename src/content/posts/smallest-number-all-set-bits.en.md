---
title: "Smallest Number With All Set Bits"
published: 2025-11-07T15:15:20.003Z
description: "LeetCode-style exercise: find the smallest integer that satisfies a condition about set bits. Solution outline and drafting skeleton."
updated: ''
tags:
  - leetcode
  - bit-manipulation
  - math
  - exercise
draft: false
pin: 0
toc: true
lang: 'en'
abbrlink: 'smallest-number-all-set-bits'
---
## Summary

Given a positive integer n, find the smallest integer x ≥ n whose binary representation consists only of ones (for example: 1, 3, 7, 15, …). This is a concise bit-manipulation exercise commonly seen in platforms like LeetCode.

## Problem statement

Given a positive integer n, return the smallest integer x ≥ n such that the binary representation of x contains only set bits.

Constraints:

- 1 ≤ n ≤ 1000

## Examples

| n   | bin(n) | result | bin(result) |
|-----:|:------:|-------:|:-----------:|
| 5   | 0101   | 7      | 0111        |
| 10  | 1010   | 15     | 1111        |
| 3   | 11     | 3      | 11          |

## Observations and bit properties

Numbers composed only of ones in binary have the form 2^k − 1 (for example: 1, 3, 7, 15, 31, …). Thus the problem reduces to finding the smallest k such that 2^k − 1 ≥ n.

## Strategy / Main idea

Find the exponent k such that 2^k − 1 ≥ n. This is equivalent to computing k = ceil(log2(n + 1)). The answer is then 2^k − 1.

## Implementation (TypeScript / JavaScript)

```typescript
export function smallestNumber(n: number): number {
  // Find exponent k such that 2^k - 1 >= n
  // Equivalent to ceil(log2(n + 1))
  const k = Math.ceil(Math.log2(n + 1))

  // Compute 2^k - 1
  return (1 << k) - 1
}
```

## Example run

```typescript
console.log(smallestNumber(5)) // 7
console.log(smallestNumber(10)) // 15
console.log(smallestNumber(3)) // 3
console.log(smallestNumber(1000))// 1023
```

## Complexity analysis

Time: O(1)  Space: O(1).

## Edge cases & tests

- n = 1 → result: 1
- n = 1000 → result: 1023
