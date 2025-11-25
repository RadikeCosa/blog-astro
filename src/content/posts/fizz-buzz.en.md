---
title: "fizz-buzz"
published: 2025-11-25T11:11:11.354Z
description: ''
updated: ''
tags:
  - algoritmos
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "fizz-buzz"
---
## Introduction

FizzBuzz is one of the most popular problems in technical interviews and programming challenges. Although it seems simple, it's perfect for practicing logic, conditionals, and array manipulation.

## Problem Statement

Given an integer $n$, return an array with the numbers from 1 to $n$ (inclusive), but replacing:

- Multiples of 3 with "Fizz".
- Multiples of 5 with "Buzz".
- Multiples of both 3 and 5 with "FizzBuzz".

For example, for $n = 15$ the result would be:

```javascript
[1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']
```

## Approach & Analysis

The key is to identify multiples of 3 and 5 in the range and replace them with the corresponding strings. We use the modulo operator (%) to check if a number is a multiple: if `num % divisor === 0`, then it's a multiple.

### Test Cases

- fizzBuzz(2) → [1, 2]
- fizzBuzz(4) → [1, 2, "Fizz", 4]
- fizzBuzz(8) → [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8]
- fizzBuzz(15) → [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]

## Solution

The clearest and most direct solution is to iterate from 1 to $n$ and use conditionals to decide what to add to the array:

```javascript
function fizzBuzz(n) {
  const result = []
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push('FizzBuzz')
    }
    else if (i % 3 === 0) {
      result.push('Fizz')
    }
    else if (i % 5 === 0) {
      result.push('Buzz')
    }
    else {
      result.push(i)
    }
  }
  return result
}
```

## Complexity

- **Time:** $O(n)$, we traverse all numbers once.
- **Space:** $O(n)$, we store the result array.

## Reflections & Lessons Learned

FizzBuzz is an excellent exercise to practice conditionals, loops, and the modulo operator. It also reminds us of the importance of considering edge cases and writing clear, readable code.

## Resources

- [JavaScript documentation on the remainder operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)
