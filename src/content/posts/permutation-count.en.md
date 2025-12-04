---
title: Permutation Count - FreeCodeCamp Daily Challenge
published: 2025-12-04T14:08:29.981Z
description: 'We solve the "Permutation Count" problem from FreeCodeCamp Daily Challenge. We explain the mathematical formula and present an efficient solution in JavaScript.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "permutation-count"
---
## Introduction

Permutation counting is a classic topic in combinatorics and frequently appears in interviews and programming challenges. In this article, we solve the "Permutation Count" problem from FreeCodeCamp, where we must calculate how many unique ways there are to reorder the characters of a string, considering possible repetitions.

## Problem Statement

> Given a string, return the number of distinct permutations that can be formed with its characters. If there are repeated characters, duplicate permutations should only be counted once.

**Example:**

- Input: `"abb"`
- Output: `3` ("abb", "bab", "bba")

Suppose you have the letters `a`, `b`, `b`:

The permutations "abb", "bab", and "bba" are unique. If you tried to list all possible permutations (3! = 6), you would notice that some are repeated due to the presence of two 'b's.

## Mathematical Review: Permutations with Repetition

When there are repeated characters, we use the formula:

$$
	\text{Unique Permutations} = \frac{n!}{k_1! \cdot k_2! \cdot \ldots \cdot k_m!}
$$

where:

- $n$ is the total number of characters
- $k_i$ is the frequency of each repeated character

**Example:**

- For "aabb": $n = 4$, $k_1 = 2$ ('a'), $k_2 = 2$ ('b')
- $$\frac{4!}{2! \cdot 2!} = \frac{24}{4} = 6$$

## Strategy and Analysis

1. **Count the frequency of each character**
2. **Calculate the factorial of the total number of characters**
3. **Calculate the product of the factorials of the frequencies**
4. **Apply the formula for permutations with repetition**

## Implementation in JavaScript

```javascript
function countPermutations(str) {
  function factorial(n) {
    if (n === 0 || n === 1)
      return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }
  const freq = {}
  for (let char of str) {
    freq[char] = (freq[char] || 0) + 1
  }
  const n = str.length
  let numerator = factorial(n)
  let denominator = 1
  for (let key in freq) {
    denominator *= factorial(freq[key])
  }
  return numerator / denominator
}
```

## Test Cases and Edge Cases

| Input   | Output | Reasoning                          |
|---------|--------|------------------------------------|
| "abc"   | 6      | 3! = 6 (all unique)                |
| "aabb"  | 6      | 4!/(2!*2!) = 6                     |
| "aaaa"  | 1      | 4!/4! = 1 (all identical)          |
| "abcde" | 120    | 5! = 120 (all unique)              |
| ""      | 1      | Only the empty string              |

## Complexity

- **Time:** $O(n + m)$, where $n$ is the length of the string and $m$ is the number of unique characters.
- **Space:** $O(m)$, for the frequency object.

## Reflections and Learnings

- Using a HashMap to count frequencies is fundamental in string problems.
- The formula for permutations with repetition is key in combinatorics.
- Precomputing factorials or using memoization can optimize for long strings.

## Resources

- [Permutations with repetition - Wikipedia](https://en.wikipedia.org/wiki/Permutation#Permutations_with_repetition)
- [Factorial - Wikipedia](https://en.wikipedia.org/wiki/Factorial)
