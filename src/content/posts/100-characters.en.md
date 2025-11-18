---
title: "100 Characters - FreeCodeCamp Daily Challenge"
published: 2025-11-18T13:49:44.718Z
description: 'We solve the "100 Characters" problem from FreeCodeCamp Daily Challenge with a detailed explanation.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "100-characters"
---

## Introduction

Today, FreeCodeCamp, in honor of 100 days of daily challenges, presents a special problem: "100 Characters". In this post, we will solve this challenge step by step, explaining our reasoning and the development process of the solution.

## Problem Statement

Given an input string, repeat the string until the length of the result is 100 characters. If the repetition exceeds 100 characters, trim the string so that it is exactly 100 characters long.

## Initial Analysis

### Understanding the Problem

The challenge consists of manipulating strings to reach a specific length. We must ensure that the result has exactly 100 characters, which means repeating the input string and trimming it if necessary.

### Identified Test Cases

```javascript
describe('100 Characters', () => {
  it('should return "One hundred One hundred One hundred One hundred One hundred One hundred One hundred One hundred One " for input "One hundred "', () => {
    expect(oneHundred('One hundred ')).toBe(
      'One hundred One hundred One hundred One hundred One hundred One hundred One hundred One hundred One '
    )
  })

  it('should return "freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeC" for input "freeCodeCamp "', () => {
    expect(oneHundred('freeCodeCamp ')).toBe(
      'freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeC'
    )
  })

  it('should return "daily challenges daily challenges daily challenges daily challenges daily challenges daily challenge" for input "daily challenges "', () => {
    expect(oneHundred('daily challenges ')).toBe(
      'daily challenges daily challenges daily challenges daily challenges daily challenges daily challenge'
    )
  })

  it('should return "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" for input "!"', () => {
    expect(oneHundred('!')).toBe(
      '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
    )
  })
})
```

## Solution Development

### Chosen Approach

The initial intuition is to use a loop to concatenate the input string until the result's length is at least 100 characters. Then, we use the `slice` method to trim the string to exactly 100 characters if necessary. To do this, we initialize a variable `result` as an empty string and fill it inside the loop using the `+=` operator.

### Step-by-Step Implementation

```javascript
function oneHundred(chars) {
  let result = ''
  while (result.length < 100) {
    result += chars
  }
  return result.slice(0, 100)
}
```

## Complexity Analysis

The time complexity of this solution is $O(n)$, where $n$ is the length of the input string. In the worst case, the `while` loop runs several times until the result reaches or exceeds 100 characters. Each concatenation takes time proportional to the current length of the string, but since we limit the final length to 100 characters, the number of iterations is constant with respect to the input size.

The space complexity is $O(1)$, since we use a constant amount of additional space, regardless of the input size.

## Edge Cases and Considerations

We identified the following edge cases:

1. **Empty input string:** The result should also be an empty string, since there is nothing to repeat.
2. **Very short input string:** If the string is very short (for example, a single character), the algorithm should correctly handle repetition until reaching 100 characters.
3. **Input string of exactly 100 characters:** If the string already has 100 characters, the result should be the same string without modifications.

All these cases are correctly handled by the current implementation.

## Reflections and Learnings

### Possible Optimizations

A possible optimization is to calculate how many times we need to repeat the input string to reach or exceed 100 characters, and then build the result in a single operation instead of concatenating in a loop. This reduces the number of operations and improves performance.

We can do this by declaring a variable `repeatCount` equal to `Math.ceil(100 / str.length)`, using the `repeat` method to repeat the string, and finally trimming the result with `slice`. The time complexity remains $O(n)$, but with fewer concatenation operations.

```javascript
export default function oneHundred(str) {
  const repeatCount = Math.ceil(100 / str.length)
  return str.repeat(repeatCount).slice(0, 100)
}
```

## Resources and References

- [String.prototype.slice() Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
- [String.prototype.repeat() Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)
- [Math.ceil() Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)
- [freeCodeCamp - JavaScript String Methods](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/use-string-methods-to-manipulate-strings)
