---
title: "Vowels and Consonants: FreeCodeCamp Daily Challenge"
published: 2025-11-11T14:29:33.550Z
description: 'Solving the FreeCodeCamp daily challenge: Vowels and Consonants. Step-by-step analysis and explanation of the solution.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "vowels-and-consonants"
---

## Introduction

In the FreeCodeCamp daily challenge, we are asked to analyze a string and determine how many vowels and consonants it contains. This exercise is useful for practicing string manipulation, regular expressions, and counting logic in JavaScript.

## Problem Statement

Given a string, return an array with the number of vowels and consonants it contains.

- **Vowels** are: a, e, i, o, u (both uppercase and lowercase)
- **Consonants** are all alphabetic letters that are not vowels (both uppercase and lowercase)
- Spaces and non-letter characters do not count as vowels or consonants

**Example:**

```text
Input: "Hello World!"
Output: [3, 7] // 3 vowels (e, o, o) and 7 consonants (H, l, l, W, r, l, d)
```

## Approach & Analysis

The most efficient solution uses **regular expressions** to identify vowels and consonants in the string. This allows for fast and clear pattern matching, avoiding manual iteration over each character.

### Test Cases

| Input                                           | Expected Output |
| ----------------------------------------------- | -------------- |
| "Hello World!"                                 | [3, 7]         |
| "JavaScript"                                   | [3, 7]         |
| "Python"                                       | [1, 5]         |
| "freeCodeCamp"                                 | [5, 7]         |
| "Hello, World!"                                | [3, 7]         |
| "The quick brown fox jumps over the lazy dog." | [11, 24]       |

## Solution

The JavaScript implementation is as follows:

```javascript
function count(str) {
  const vowels = str.match(/[aeiou]/gi)
  const consonants = str.match(/[b-df-hj-np-tv-z]/gi)
  return [vowels ? vowels.length : 0, consonants ? consonants.length : 0]
}
```

- Two regular expressions are defined: one for vowels and one for consonants.
- The `match()` method is used to find all vowels and consonants.
- An array with the respective counts is returned.

## Complexity Analysis

- **Time complexity:** $O(n)$, where $n$ is the length of the string.
- **Space complexity:** $O(k)$, where $k$ is the number of matches found (vowels and consonants).

## Edge Cases & Considerations

- Empty string: returns `[0, 0]`
- Only symbols or numbers: returns `[0, 0]`
- Uppercase and lowercase letters are counted equally
- Special characters and spaces are ignored

## Reflections & Learnings

This exercise reinforces the use of regular expressions and handling edge cases in strings. The solution is clear and efficient for most practical cases.

## Resources

- [MDN: String.match()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
- [MDN: Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

---

_💡 Clarity and simplicity in the solution are often the best optimization for counting problems._
