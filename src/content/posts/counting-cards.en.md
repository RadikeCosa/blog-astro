---
title: 'Counting Cards — November 7, 2025'
published: 2025-11-07T12:24:45.141Z
description: 'Solution to FreeCodeCamp daily challenge: Counting Cards. Step-by-step explanation and strategy analysis.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
  - javascript
draft: false
pin: 0
toc: true
lang: 'en'
abbrlink: 'counting-cards-freecodecamp'
---

Today’s FreeCodeCamp daily challenge is "Counting Cards." This is a great exercise to review basic combinatorics and practice JavaScript, particularly the handling of numeric types: `Number` (standard arithmetic and decimals) and `BigInt` (very large integers, beyond Number.MAX_SAFE_INTEGER). It’s also a good opportunity to review safe conversions between strings and numbers.

> ### Counting Cards
>
> **Problem.** A standard deck of playing cards contains 52 distinct cards. Given an integer `n` representing the number of cards to pick from the deck, return the number of unique combinations of `n` cards.
>
> Order does not matter: picking card A then B is the same as picking B then A. In combinatorics this is the binomial coefficient $C(52, n)$ ("52 choose n").

Examples:

- combinations(52) → 1
- combinations(1)  → 52
- combinations(2)  → 1326
- combinations(5)  → 2598960
- combinations(10) → 15820024220
- combinations(50) → 1326  (since C(52,50) = C(52,2))

Constraints:

- Deck size: 52 cards.
- Input: integer n in the range 0..52 (inclusive).

## Approach

After a quick review of the math fundamentals, the formula for combinations (the binomial coefficient) is:

$$
C(52, n) = \frac{52!}{n!\,(52 - n)!}
$$

Where "!" denotes factorial. This gives the number of ways to choose $n$ items from a set of 52 without regard to order.

In plain terms, computing the number of combinations means calculating 52! divided by (n! × (52 − n)!).

> **Note — numeric limits**
>
> JavaScript `Number` represents integers safely up to `Number.MAX_SAFE_INTEGER` (2^53 − 1, ≈ 9.007×10^15). For much larger values you can use `BigInt`. Example (precision loss with `Number`):
>
> ```javascript
> Number.MAX_SAFE_INTEGER // 9007199254740991
> Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2 // true  (precision lost)
> BigInt(Number.MAX_SAFE_INTEGER) + 1n // 9007199254740992n (precise with BigInt)
> ```
>
> For this exercise (n ≤ 52) all results fit comfortably in `Number`, so we choose an iterative implementation that avoids computing full factorials and works safely and efficiently with `Number`.

## Implementation

We start with input validation and quick cases, and we exploit the symmetry of the binomial coefficient to reduce work. The following function implements the multiplicative formula:

```javascript
function combinations(cards) {
  // Input validation
  if (!Number.isInteger(cards)) {
    throw new TypeError('cards must be an integer')
  }

  const N = 52
  const k = cards

  if (k < 0 || k > N) {
    throw new RangeError('cards must be between 0 and 52 inclusive')
  }

  // Quick cases
  if (k === 0 || k === N)
    return 1

  // Use symmetry: compute with m = min(k, N-k)
  const m = Math.min(k, N - k)

  // Multiplicative formula: C(N, m) = ∏_{i=1..m} (N - m + i) / i
  let result = 1
  for (let i = 1; i <= m; i++) {
    result = result * (N - m + i) / i
  }

  // As a precaution, round to the nearest integer
  return Math.round(result)
}

// Examples
console.log(combinations(52)) // 1
console.log(combinations(1)) // 52
console.log(combinations(2)) // 1326
console.log(combinations(5)) // 2598960
console.log(combinations(10)) // 15820024220
```

In this file I chose not to use `BigInt` to keep the implementation straightforward and focused on `Number`. As explained above, for the constraints of this problem (a standard 52-card deck) this implementation is correct and safe; if the problem domain changed to much larger numbers, switching to `BigInt` would be appropriate.

## Notes and extensions

- Symmetry: C(N, k) = C(N, N − k), hence using `m = min(k, N − k)` reduces computation.
- Performance: the multiplicative formula avoids full factorials and runs in O(k) time with O(1) space.
- Visualization: consider adding a plot of C(52, n) vs n (log scale) to illustrate growth and the peak near n = 26.

### About rounding (why we use Math.round)

During the multiplicative loop we perform floating-point multiplication and division. Mathematically the result should be an integer, but floating-point operations can introduce tiny inaccuracies (for example 2598959.9999998). Using `Math.round` at the end corrects these accumulated effects and ensures we return the exact integer expected. For the values we handle here (N ≤ 52) this correction is safe and does not hide logical errors.

> **Tip — Number.MAX_SAFE_INTEGER vs BigInt**
>
> JavaScript defines `Number.MAX_SAFE_INTEGER` as 9007199254740991 (2^53 − 1). Beyond that, `Number` can lose integer precision:
>
> ```javascript
> Number.MAX_SAFE_INTEGER // 9007199254740991
> Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2 // true  (precision lost)
> BigInt(Number.MAX_SAFE_INTEGER) + 1n // 9007199254740992n (precise with BigInt)
> ```
>
> In this exercise we don't need `BigInt`, but if the problem worked with much larger N (or large factorials), `BigInt` would be the correct choice.

## Complexity analysis

- Time: O(m) where m = min(k, N − k). In the worst case m ≈ N/2, so we can consider O(k). Each iteration performs one multiplication and one division.
- Space: O(1). We only keep an accumulator `result` and scalar variables.
- Precision: operations use `Number` (double-precision floating point). The multiplicative strategy reduces the need to handle enormous factorials and, together with `Math.round`, resolves the small final floating-point imprecision.

***
