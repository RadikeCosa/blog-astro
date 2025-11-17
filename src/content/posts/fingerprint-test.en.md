---
title: "Fingerprint Test - FreeCodeCamp Daily Challenge"
published: 2025-11-17T11:33:17.020Z
description: 'Solving the FreeCodeCamp daily challenge "fingerprint-test".'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "fingerprint-test"
---

## Introduction

In this article we solve the FreeCodeCamp daily challenge **"Fingerprint Test"**. The task is practical and straightforward: given two strings that represent fingerprints (only lowercase letters), determine whether they "match" according to two criteria:

1. **Identical length**: Both strings must have exactly the same length.
2. **Difference tolerance**: The number of differing characters must not exceed 10% of the total length.

Below is an efficient JavaScript solution, the reasoning step by step, algorithmic complexity, and test cases and implementation notes.

## Problem statement

Given two strings `fingerprint1` and `fingerprint2`, determine whether they match under the following rules:

**Rule 1 – Identical length:**
$$
\text{length}(\text{fingerprint1}) = \text{length}(\text{fingerprint2})
$$

**Rule 2 – Difference tolerance:**
$$
\frac{d}{n} \leq 0.10
$$

Where $d$ is the number of positions with different characters and $n$ is the string length.

## Examples

### Example 1: Valid match

```bash
fingerprint1 = "helloworld"
fingerprint2 = "jelloworld"
```

- Length: $n = 10$
- Differences: $d = 1$ (position 0: 'h' vs 'j')
- Ratio: $\frac{1}{10} = 0.1 \leq 0.10$ ✓ → Match

### Example 2: No match

```bash
fingerprint1 = "abc"
fingerprint2 = "xyz"
```

- Length: $n = 3$
- Differences: $d = 3$
- Ratio: $\frac{3}{3} = 1.0 > 0.10$ ✗ → No match

## Proposed solution

```javascript
/**
 * FreeCodeCamp Problem: Is Match
 *
 * @param {string} fingerprint1 - The first fingerprint string
 * @param {string} fingerprint2 - The second fingerprint string
 * @returns {boolean} True if the fingerprints match according to the rules, otherwise false
 */
function isMatch(fingerprint1, fingerprint2) {
  const len1 = fingerprint1.length
  const len2 = fingerprint2.length

  // If lengths differ, they don't match
  if (len1 !== len2) {
    return false
  }

  let differences = 0

  for (let i = 0; i < len1; i++) {
    if (fingerprint1[i] !== fingerprint2[i]) {
      differences++
    }
  }

  // Compare against the 10% threshold
  return differences <= len1 * 0.1
}

export default isMatch
```

## Analysis and strategy

The approach is a straightforward linear comparison with three main steps:

### 1. Length validation

If $|\text{fingerprint1}| \neq |\text{fingerprint2}|$, return `false`.

### 2. Count differences

Traverse both strings and count positions with differing characters:

$$
d = \sum_{i=0}^{n-1} \mathbb{1}[\text{fingerprint1}[i] \neq \text{fingerprint2}[i]]
$$

### 3. Threshold evaluation

Compare $d$ with 10% of the length:

$$
\text{match} \iff d \leq 0.1 \cdot n
$$

### Integer variant (avoiding floating point)

To avoid floating point arithmetic, the equivalent condition is:

$$
10 \cdot d \leq n
$$

or in code:

```javascript
return differences * 10 <= len1;
```

This removes rounding concerns.

## Implementation notes

- Precision: Using `differences <= len1 * 0.1` is acceptable; alternatively use `differences * 10 <= len1` to stay in integers.
- Empty strings: If both are empty ($n = 0$), then $d = 0$ and the function returns `true`.
- Input guarantee: The challenge states lowercase letters only; otherwise normalize or validate.

## Complexity

- Time: O(n), with n = length of strings.
- Space: O(1).

## Test cases (Vitest)

The repository tests cover relevant scenarios:

```javascript
expect(isMatch('helloworld', 'helloworld')).toBe(true)
expect(isMatch('helloworld', 'helloworlds')).toBe(false)
expect(isMatch('helloworld', 'jelloworld')).toBe(true)
expect(isMatch('thequickbrownfoxjumpsoverthelazydog', 'thequickbrownfoxjumpsoverthelazydog')).toBe(true)
```

### Run tests

```bash
npm install
npm test
```

## Optimizations and variants

- Use `Math.floor(n * 0.1)` or `Math.ceil(n * 0.1)` if the domain requires explicit rounding.
- Return diagnostic object when debugging: `{ match, differences, threshold, diffPositions }`.
- If insertions/deletions are allowed, use Levenshtein distance (more expensive).

## Edge cases

- ("", "") → true
- ("a", "b") → false
- For small n, consider whether to use floor/ceil when interpreting the 10% threshold.

---
