---
title: "Circular Primes - FreeCodeCamp #152 Daily Challenge"
published: 2026-01-12T14:54:17.169Z
description: 'We solve "Circular Prime" (FreeCodeCamp Daily Challenge): how to detect if a number is a circular prime? Analysis, commented code, visuals, and reflections.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "circular-prime"
---

## Circular Primes: Analysis & Explanation

### Problem Statement

Given an integer, determine if it is a circular prime.
A circular prime is a number where **all rotations of its digits** are also prime numbers.
For example, 197 is a circular prime because 197, 971, and 719 are all prime.

## Initial Analysis

### Understanding the Problem

The function must determine if a given number is a "circular prime". That is, by rotating its digits in all possible positions, **all** variants must be prime numbers. If any rotation is not prime, the number is not a circular prime.

### Test Cases

- isCircularPrime(197) → true (197, 971, 719 are all prime)
- isCircularPrime(1193) → true (1193, 1931, 9311, 3119 are all prime)
- isCircularPrime(23) → false (23 is prime, but 32 is not)
- isCircularPrime(2) → true (single-digit prime)
- isCircularPrime(101) → false (101 is prime, but 110 is not)

## Solution Development

### Approach

1. Check if the number and all its rotations are prime.
2. For each rotation, use a helper function to rotate the digits and another to check primality.
   If any rotation is not prime, return false immediately. If all are prime, return true.

### Step-by-Step Implementation

1. Define a helper function `isPrime` that checks if a number is prime (divisibility up to its square root).
2. Define a helper function `rotateNumber` that rotates the digits to the left.
3. Iterate over all possible rotations:
   - If any rotation is not prime, return false.
   - If all rotations are prime, return true.

### Final Code

```javascript
/**
 * FreeCodeCamp Problem: Circular Prime
 * Determines if a number is a circular prime.
 * A circular prime remains prime when its digits are rotated in any position.
 * For example, 197 is circular prime because 197, 971, and 719 are all prime.
 * @param {number} n - Number to check
 * @returns {boolean} True if circular prime, false otherwise
 */
function isCircularPrime(n) {
  // Checks if a number is prime
  const isPrime = (num) => {
    if (num < 2)
      return false
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0)
        return false
    }
    return true
  }

  // Rotates digits to the left
  const rotateNumber = (num) => {
    const str = num.toString()
    return Number(str.slice(1) + str[0])
  }

  let rotated = n
  do {
    if (!isPrime(rotated))
      return false
    rotated = rotateNumber(rotated)
  } while (rotated !== n)
  return true
}
```

## Complexity Analysis

### Time Complexity

Let $d$ be the number of digits in $n$ and $k$ the value of the number:

- `isPrime` is $O(\sqrt{k})$.
- There are $d$ rotations, and for each, primality is checked.
- Total complexity: $O(d \cdot \sqrt{k})$.

In practice, for small numbers, the algorithm is efficient. For large numbers, primality checking can be costly. Since the largest known circular prime has 4 digits, this approach is sufficient for most practical cases.

### Space Complexity

Space usage is $O(1)$, as only scalar variables are stored.

## Edge Cases & Considerations

- Single-digit numbers: just check if it's prime.
- Numbers with repeated digits: all rotations may be equal or different, but each is checked.
- Numbers with zeros: rotating may lead to a leading zero (e.g., 101 → 011 → 11), which can affect checking.

## Reflections & Learnings

### Concepts Applied

- Basic primality (trial division)
- String manipulation and digit rotation

### Possible Optimizations

- Use a more efficient primality test for large numbers.
- Quickly filter numbers containing even digits or 5 (except 2 and 5), since some rotation will be divisible by 2 or 5.

## Resources & References

- [Wikipedia: Circular prime](https://en.wikipedia.org/wiki/Circular_prime)
- [OEIS: Circular primes](https://oeis.org/A068652)

---

Would you like to see more solved challenges or have questions? Leave a comment below! 🚀
