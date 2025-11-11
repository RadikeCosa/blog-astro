---
title: 'Smallest Number With All Set Bits - LeetCode #3360'
published: 2025-11-07T15:15:20.003Z
description: 'Solving the LeetCode problem "Smallest Number With All Set Bits" (#3360). Analysis, strategy and TypeScript solution.'
updated: ''
tags:
  - leetcode
draft: false
pin: 0
toc: true
lang: 'en'
abbrlink: 'smallest-number-all-set-bits'
---
## The Smallest Number of All Ones — LeetCode #3360

> **Problem:**
> Given a positive number $n$, find the smallest number $x \geq n$ whose binary representation consists only of 1 bits (for example: 1, 3, 7, 15, …).

## 📝 Summary

This exercise is useful for practicing **bit manipulation** techniques and recognizing patterns in binary representation of numbers.

## 📋 Problem Statement

- **Input:** A positive number $n$.
- **Output:** The smallest number $x \geq n$ such that the binary representation of $x$ contains only ones.

**Constraints:**
$1 \leq n \leq 1000$

## 📊 Examples

| $n$  | bin($n$) | result | bin(result) |
|------|:--------:|-------:|:-----------:|
| 5    | 0101     | 7      | 111         |
| 10   | 1010     | 15     | 1111        |
| 3    | 11       | 3      | 11          |

## 💡 Key Observations

Numbers with all bits set to 1 have the form $2^k - 1$ (for example: 1, 3, 7, 15, 31, …).
**The problem reduces to finding the smallest $k$ such that $2^k - 1 \geq n$.**

## 🧠 Strategy

1. **Calculate $k$:**
   $k = \lceil \log_2(n + 1) \rceil$
2. **Obtain the result:**
   $x = 2^k - 1$

## 🛠️ Implementation (TypeScript / JavaScript)

```typescript
export function smallestNumber(n: number): number {
  // Find the exponent k such that 2^k - 1 >= n
  const k = Math.ceil(Math.log2(n + 1))
  // Calculate 2^k - 1
  return (1 << k) - 1
}
```

## ▶️ Execution Example

```typescript
console.log(smallestNumber(5)) // 7
console.log(smallestNumber(10)) // 15
console.log(smallestNumber(3)) // 3
console.log(smallestNumber(1000)) // 1023
```

## ⏱️ Complexity Analysis

- **Time:** $O(1)$
- **Space:** $O(1)$

## ⚠️ Edge Cases and Additional Tests

- $n = 1$ → output: 1
- $n = 1000$ → output: 1023 ($2^{10} - 1$)

## 🛎️ Implementation Details

- `Math.log2` is used to calculate the base-2 logarithm of $(n + 1)$.
- `Math.ceil` rounds up to the nearest integer.
- The left bit shift operator (`<<`) calculates $2^k$.
- 1 is subtracted to obtain the number with all bits set.

## ✅ Conclusion

This approach leverages the structural property of numbers composed only of ones in binary and allows calculating the solution in **constant time**.

---
