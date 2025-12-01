---
title: "Miles to Kilometers - FreeCodeCamp Daily Challenge"
published: 2025-12-01T12:00:08.152Z
description: "Solving the miles to kilometers conversion challenge, analyzing the process and presenting an optimal JavaScript solution."
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "miles-to-kilometers"
---

## Miles to Kilometers Conversion: A Classic Algorithm Problem

Today we tackle FreeCodeCamp's daily challenge: convert a given distance in miles to its equivalent in kilometers, rounding the result to two decimal places. These exercises help us practice mathematical operations and decimal number manipulation.

## Problem Statement

> Given a distance in miles (non-negative number), return the equivalent distance in kilometers.
> 1 mile equals 1.60934 kilometers.
> Round the result to two decimal places.

### Examples

| Input   | Expected Output |
|---------|-----------------|
| 1       | 1.61            |
| 21      | 33.8            |
| 3.5     | 5.63            |
| 0       | 0               |
| 0.621371| 1               |

## Approach & Analysis

The key is to apply the conversion rate correctly and round the result. The process can be summarized in three steps:

1. Multiply the number of miles by 1.60934.
2. Round the result to two decimal places.
3. Return the final value.

### Why are these exercises useful?

- Reinforces basic arithmetic operations.
- Practices rounding and formatting decimal numbers.

## JavaScript Implementation

Let's translate this process into code:

```js
function convertToKm(miles) {
  const kilometersPerMile = 1.60934
  let result = miles * kilometersPerMile
  result = Number.parseFloat(result.toFixed(2))
  return result
}
```

### Step-by-step Explanation

- The constant `kilometersPerMile` is declared for clarity and maintainability.
- The input is multiplied by the conversion rate.
- `toFixed(2)` is used to round to two decimals, and `parseFloat` returns a number.

## Complexity Analysis

The function performs simple arithmetic and rounding:

$$
T(n) = O(1)
$$

Space complexity is also $O(1)$, as no additional structures are used.

## Edge Cases & Considerations

- If the input is 0, the result is 0.
- If the input is a decimal, conversion and rounding work correctly.
- Negative or non-numeric inputs are not handled, as the statement guarantees valid inputs.

## Reflections & Learnings

- Importance of declaring constants for conversion rates.
- Correct use of rounding functions.
- Validating test cases and edge cases.

## Resources & References

- [MDN: Number.prototype.toFixed()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)
- [Unit conversion on Wikipedia](https://en.wikipedia.org/wiki/Conversion_of_units)
