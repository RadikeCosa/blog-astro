---
title: 'Counting Cards — FreeCodeCamp Daily Challenge'
published: 2025-11-07T12:24:45.141Z
description: 'Solution to FreeCodeCamp daily challenge: Counting Cards. Step-by-step explanation and strategy analysis.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: 'en'
abbrlink: 'counting-cards-freecodecamp'
---

> ### Counting Cards
>
> A standard deck contains 52 distinct cards. Given an integer `n` representing how many cards to pick from the deck, return the number of unique combinations of `n` cards.

Order does not matter: picking card A then card B is the same as picking B then A.

For example, given 52 the result is 1 (there's only one way to choose all 52 cards). Given 2 the result is 1326 — there are 1326 unique 2-card combinations from a 52-card deck.

Examples:

- combinations(52) → 1
- combinations(1)  → 52
- combinations(2)  → 1326
- combinations(5)  → 2598960
- combinations(10) → 15820024220
- combinations(50) → 1326  (since C(52,50) = C(52,2))

## Approach

Because order does not matter, we can use the binomial coefficient to compute the number of combinations. The formula is:

$$
C(52, n) = \frac{52!}{n!\,(52 - n)!}
$$

Where "!" denotes factorial. In plain terms, compute 52! divided by (n! × (52 − n)!).

> **Note — numeric limits**
>
> Factorials grow very quickly, so it is prudent to consider numeric limits in JavaScript. For that reason we implement an iterative approach that avoids computing full factorials. For the constraints of this exercise (n ≤ 52) results fit comfortably in `Number`, so `BigInt` is not required.
>
> JavaScript `Number` represents integers exactly up to `Number.MAX_SAFE_INTEGER` (2^53 − 1, ≈ 9.007×10^15). For larger values consider `BigInt`.

We also exploit symmetry: C(N, k) = C(N, N − k). That allows computing with `m = min(k, N − k)` and reducing the amount of work for k > N/2.

## Implementation

Start with input validation and quick cases. The implementation below uses the multiplicative formula:

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
```

Examples:

```javascript
console.log(combinations(52)) // 1
console.log(combinations(1)) // 52
console.log(combinations(2)) // 1326
console.log(combinations(5)) // 2598960
console.log(combinations(10)) // 15820024220
```

The implementation intentionally avoids `BigInt` to keep the code focused on `Number`. If the problem domain required much larger N, switching to `BigInt` would be appropriate.

## Notes and extensions

- Symmetry: C(N, k) = C(N, N − k), so using `m = min(k, N − k)` reduces computation.
- Performance: the multiplicative formula avoids full factorials and runs in O(k) time with O(1) space.
- Visualization: consider plotting C(52, n) vs n (log scale) to illustrate growth and the peak near n = 26.

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

- Time: O(m) where m = min(k, N − k). In the worst case m ≈ N/2, so we can consider O(k).
- Space: O(1). We only keep an accumulator `result` and scalar variables.
- Precision: operations use `Number` (double-precision floating point). The multiplicative strategy reduces the need to handle enormous factorials and, together with `Math.round`, resolves the small final floating-point imprecision.

***
