---
title: "Least Common Multiple (LCM) - FreeCodeCamp Daily Challenge"
published: 2025-11-22T02:03:56.082Z
description: "We solve the Least Common Multiple (LCM) problem using the relationship between GCD and LCM in JavaScript."
updated: ""
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "least-common-multiple"
---

## Least Common Multiple (LCM)

In this article, we solve the **"Least Common Multiple (LCM)"** problem by applying the mathematical relationship between the GCD (Greatest Common Divisor) and the LCM. We will explore the mathematical idea, implement a solution in JavaScript, analyze its complexity, and discuss special cases.

---

## 📝 Problem Statement

Given two positive integers \(a\) and \(b\), return their **least common multiple (LCM)**, denoted as \(\operatorname{lcm}(a, b)\). The LCM of two integers is the smallest positive integer that is a multiple of both numbers.

### Example

- \(a = 4, b = 6 \rightarrow \operatorname{lcm}(4, 6) = 12\)
- \(a = 7, b = 5 \rightarrow \operatorname{lcm}(7, 5) = 35\)

---

## 💡 Mathematical Idea

The most efficient way to calculate the LCM is by using the relationship between the GCD and the LCM:

```math
\operatorname{lcm}(a, b) = \frac{|a \cdot b|}{\operatorname{gcd}(a, b)}
```

Where \(\operatorname{gcd}(a, b)\) is calculated using the **Euclidean Algorithm**. If you are not familiar with this algorithm, check out our article on the [Greatest Common Divisor (GCD)](/posts/gcd/).

---

## 🛠️ Implementation in JavaScript

Below is an efficient implementation of the LCM calculation in JavaScript:

```javascript
function lcm(a, b) {
  // Helper function to calculate the Greatest Common Divisor (GCD)
  function gcd(x, y) {
    while (y !== 0) {
      [x, y] = [y, x % y]
    }
    return Math.abs(x)
  }

  if (a === 0 || b === 0) {
    throw new Error('LCM is not defined for 0')
  }

  return Math.abs(a * b) / gcd(a, b)
}
```

### Code Explanation

1. **GCD Calculation**: We use the Euclidean Algorithm to calculate the GCD of \(a\) and \(b\).
2. **Input Validation**: If either number is 0, we throw an error since the LCM is not defined in this case.
3. **LCM Calculation**: We apply the formula \(\operatorname{lcm}(a, b) = \frac{|a \cdot b|}{\operatorname{gcd}(a, b)}\).

---

## 📊 Complexity Analysis

### Time Complexity

The GCD calculation using the Euclidean Algorithm has a time complexity of:

```math
O(\log(\min(a, b)))
```

Thus, the total complexity for calculating the LCM is also:

```math
O(\log(\min(a, b)))
```

since the multiplication and division are constant-time operations.

### Space Complexity

The space complexity is:

```math
O(1)
```

as we only use a few auxiliary variables for the calculation, regardless of the size of the input numbers.

---

## ⚠️ Edge Cases and Considerations

- **Input with zeros**: If \(a = 0\) or \(b = 0\), the LCM is not defined. In the implementation, this is handled by throwing an exception.
- **Negative numbers**: If the numbers are negative, the LCM is calculated using their absolute values.
- **One of the numbers is 1**: If \(a = 1\) or \(b = 1\), the LCM is simply the other number.
- **Both numbers are equal**: If \(a = b\), the LCM is that same number.

---

## Reflections and Learnings

- **Relationship between GCD and LCM**: The formula:

```math
\operatorname{lcm}(a, b) = \frac{|a \cdot b|}{\operatorname{gcd}(a, b)}
```

is a powerful tool for solving problems involving multiples and divisors.

- **Efficiency of the Euclidean Algorithm**: This algorithm is extremely efficient for calculating the GCD, making it the ideal foundation for calculating the LCM.

- **Input Validation**: It is important to handle special cases like zeros or negative numbers to avoid calculation errors.

---

## Resources and References

- [Wikipedia: Least Common Multiple](https://en.wikipedia.org/wiki/Least_common_multiple)
- [Wikipedia: Euclidean Algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm)
- [GCD on this Blog](/posts/gcd/)
