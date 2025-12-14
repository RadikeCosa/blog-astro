---
title: "Capitalize It - FreeCodeCamp #126 Daily Challenge"
published: 2025-12-14T21:03:24.789Z
description: 'We solve "Capitalize It", FreeCodeCamp daily challenge #126. We analyze the problem, develop a JavaScript solution, and explain the algorithm complexity.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "capitalize-it"
---

## Problem Statement

Given a string representing a title, return a new string in "title case" following these rules:

- The first letter of each word in uppercase.
- The rest of the letters in lowercase.
- Words separated by a single space.

## Initial Analysis

The goal is to transform any input string so that each word starts with an uppercase letter and the rest are lowercase, regardless of the original format. Words must be separated by a single space.

### Test Cases

Some relevant cases:

1. titleCase("hello world") → "Hello World"
2. titleCase("the quick brown fox") → "The Quick Brown Fox"
3. titleCase("JAVASCRIPT AND PYTHON") → "Javascript And Python"
4. titleCase("AvOcAdO tOAst fOr brEAkfAst") → "Avocado Toast For Breakfast"
5. titleCase("") → ""
6. titleCase("a") → "A"
7. titleCase("A") → "A"
8. titleCase("multiple   spaces") → "Multiple Spaces"
9. titleCase("  leading and trailing  ") → "Leading And Trailing"

## Solution Development

### Approach

The key is to transform the string to lowercase, split it into words, capitalize the first letter of each, and join them with a single space.

### Step-by-step Implementation

1. Convert the entire string to lowercase.
2. Split into words.
3. Capitalize the first letter of each word.
4. Join with spaces.

```javascript
function titleCase(title) {
  return title
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
```

## Complexity Analysis

### Time Complexity

The function iterates over the string for lowercase, then splits, then maps, all in $O(n)$ where $n$ is the input string length.

### Space Complexity

Intermediate arrays and strings are created, so it is also $O(n)$.

## Edge Cases and Considerations

- Empty string → returns "".
- Multiple spaces → split(" ") creates empty words, but the result follows the expected format.
- Leading or trailing spaces → empty words are generated, but the result is correct.
- Single-character word → capitalized correctly.

## Reflections and Learnings

### Concepts Applied

- String methods: toLowerCase, split, map, charAt, slice, join.
- Higher-order functions (map).
- Function composition for step-by-step transformation.

### Optimizations

To avoid empty words due to multiple spaces, use a regular expression and filter:

```javascript
function titleCase(title) {
  return title
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
```

You can also use trim() to remove leading and trailing spaces:

```javascript
function titleCase(title) {
  return title
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
```

## Resources

- [String.prototype.toLowerCase() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)
- [String.prototype.split() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [Array.prototype.map() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [String.prototype.charAt() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)
- [String.prototype.slice() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
- [String.prototype.join() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

---

Did you find this useful? What other challenges would you like to see solved? 🚀
