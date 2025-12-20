---
title: "Reverse Integer - LeetCode #7 Daily Challenge"
published: 2025-12-20T11:37:36.852Z
description: 'We solve LeetCode`s "Reverse Integer": reverse the digits of a 32-bit integer, handling overflow and edge cases. Includes explanation, code, and analysis.'
updated: ''
tags:
  - leetcode
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "reverse-integer"
---

## Reverse Integer - Analysis and Explanation

### Problem Statement

Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing causes the value to go outside the 32-bit signed integer range $[-2^{31},\ 2^{31}-1]$, return 0.

## Initial Analysis

### What does the problem ask?

Reverse the digits of an integer, keeping the sign, and ensure the result stays within the 32-bit range. If it overflows, return 0.

#### Examples

- x = 123 → 321
- x = -123 → -321
- x = 120 → 21
- x = 0 → 0
- x = 1534236469 (overflow) → 0
- x = -2147483648 (min value) → 0

**Constraint:**

$-2^{31} \leq x \leq 2^{31} - 1$

## Solution and Explanation

### Mathematical Approach (No Strings)

1. Extract the last digit of `x` using modulo 10.
2. Build the reversed number by multiplying the partial result by 10 and adding the digit.
3. Repeat until `x` is 0.
4. Before each addition, check if the result will overflow. If so, return 0.

**Advantages:**
- Direct control of the range
- No string conversions
- Leading zeros are automatically removed

#### Pseudocode

```text
result = 0
sign = x < 0 ? -1 : 1
x = abs(x)
while x != 0:
  digit = x % 10
  x = x // 10
  if result > (2^31 - 1) // 10:
    return 0
  result = result * 10 + digit
return result * sign
```

### TypeScript Implementation

```typescript
export default function reverse(x: number): number {
  // Define 32-bit limits
  const INT_MAX = 2 ** 31 - 1
  const INT_MIN = -(2 ** 31)
  // Result variable
  let result = 0
  // Determine sign
  const sign = x < 0 ? -1 : 1
  // Work with absolute value
  x = Math.abs(x)
  // Reverse digits
  while (x !== 0) {
    // Extract last digit
    const digit = x % 10
    // Remove last digit from x
    x = Math.trunc(x / 10)
    // Check for overflow before updating result
    if (
      result > Math.trunc(INT_MAX / 10)
      || (result === Math.trunc(INT_MAX / 10) && digit > INT_MAX % 10)
    ) {
      return 0
    }
    // Build the reversed number
    result = result * 10 + digit
  }
  // Apply sign
  result *= sign
  // Final range check
  if (result < INT_MIN || result > INT_MAX) {
    return 0
  }
  return result
}
```

## Complexity Analysis

- **Time:** $O(k)$, where $k$ is the number of digits in $x$. For 32 bits, $k \leq 10$ (effectively constant).
- **Space:** $O(1)$, only auxiliary variables.

## Edge Cases and Considerations

- Negative numbers: sign is preserved.
- Leading zeros: automatically removed (e.g., 120 → 21).
- Overflow: if the result is out of range, returns 0.
- 0: returns 0.
- 32-bit min and max: checked at every step.

## Reflections and Learnings

- Mathematical digit manipulation and overflow control.
- Avoiding strings gives more efficiency and control.
- The while loop and arithmetic operators allow a clear and robust solution.
- If the domain were larger, overflow control would need to be adapted.

## Resources and References

- [LeetCode - Reverse Integer](https://leetcode.com/problems/reverse-integer/)
- [Overflow and integer limits in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)
