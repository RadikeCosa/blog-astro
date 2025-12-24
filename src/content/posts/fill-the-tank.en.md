---
title: "Fill The Tank - FreeCodeCamp #39 Daily Challenge"
published: 2025-12-24T23:03:07.000Z
description: 'We solve "Fill The Tank", a FreeCodeCamp challenge involving simple math to determine the cost of filling a fuel tank.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "fill-the-tank"
---

## Fill The Tank - Analysis & Explanation 🚗⛽

### Problem Statement

Given a fuel tank size, the current fuel level, and the price per gallon, return the cost to fill the tank.

- `tankSize`: Total tank capacity (gallons)
- `fuelLevel`: Current fuel in the tank (gallons)
- `pricePerGallon`: Price per gallon
- The result must be a string in monetary format, with two decimals: "$d.dd"

## Initial Analysis

The challenge is to calculate how many gallons are needed to fill the tank and multiply that value by the price per gallon. The result should be formatted as a dollar amount with two decimals.

### Test Cases

| tankSize | fuelLevel | pricePerGallon | Expected Output |
|----------|-----------|----------------|-----------------|
| 15       | 5         | 3.50           | "$35.00"        |
| 10       | 10        | 4.00           | "$0.00"         |
| 20       | 0         | 2.75           | "$55.00"        |
| 15       | 5         | 0.00           | "$0.00"         |
| 10       | 12        | 3.00           | "$0.00"         |
| 12.5     | 7.3       | 4.20           | "$21.84"        |
| 15.75    | 10.5      | 3.80           | "$19.95"        |
| 20       | 5         | 2.95           | "$44.25"        |
| 18.5     | 9.75      | 3.65           | "$31.19"        |

---

## Solution Development

### Strategy

1. Calculate missing gallons: $missing = tankSize - fuelLevel$
2. If $missing \leq 0$ or $pricePerGallon = 0$, return "$0.00"
3. Calculate $cost = missing \times pricePerGallon$
4. Format the result to two decimals with a dollar sign

### JavaScript Implementation

```js
function fillTheTank(tankSize, fuelLevel, pricePerGallon) {
  // Calculate missing gallons
  const missing = tankSize - fuelLevel
  // If no fuel needed or price is zero
  if (missing <= 0 || pricePerGallon === 0)
    return '$0.00'
  // Calculate total cost
  const cost = missing * pricePerGallon
  // Format to two decimals
  return `$${cost.toFixed(2)}`
}
```

#### Usage Example

```js
fillTheTank(15, 5, 3.50) // "$35.00"
fillTheTank(10, 10, 4.00) // "$0.00"
fillTheTank(12.5, 7.3, 4.20) // "$21.84"
```

---

## Complexity Analysis

- **Time:** $O(1)$ (simple arithmetic operations)
- **Space:** $O(1)$ (only scalar variables)

---

## Edge Cases & Considerations

- If `fuelLevel >= tankSize` → "$0.00"
- If `pricePerGallon === 0` → "$0.00"
- Supports decimal values
- Assumes valid, non-negative inputs

---

## Reflections & Learnings

- Practice with basic arithmetic and string formatting
- Robustness through edge case validation
- The problem is straightforward and needs no optimizations

---

## Resources

- [Number.toFixed() in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)
- [Currency formatting in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

---
