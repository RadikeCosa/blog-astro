---
title: "Recipe Scale - FreeCodeCamp Daily Challenge"
published: 2025-11-22T23:47:21.909Z
description: 'We solve the "Recipe Scale" problem from FreeCodeCamp by applying string manipulation and data structures in JavaScript.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "recipe-scale"
---

## Introduction

Today's daily challenge is the **"Recipe Scale"** problem from FreeCodeCamp. We solve it using techniques like array destructuring, string manipulation, and loops in JavaScript. We will explore the problem statement, develop a step-by-step solution, analyze its complexity, and discuss special cases.

## Problem Statement

Given an array of recipe ingredients and a number to scale the recipe, return an array with the quantities adjusted accordingly. Each item in the array will be a string in the format: "quantity unit ingredient". For example: "2 C Flour".

Scale the quantity by the given number, maintaining the original format. Do not include unnecessary trailing zeros or convert any units. Return the scaled items in the same order as provided.

### Example

- `scaleRecipe(["2 C Flour", "1.5 T Sugar"], 2)` should return `["4 C Flour", "3 T Sugar"]`.
- `scaleRecipe(["4 T Flour", "1 C Milk", "2 T Oil"], 1.5)` should return `["6 T Flour", "1.5 C Milk", "3 T Oil"]`.
- `scaleRecipe(["3 C Milk", "2 C Oats"], 0.5)` should return `["1.5 C Milk", "1 C Oats"]`.
- `scaleRecipe(["2 C All-purpose Flour", "1 t Baking Soda", "1 t Salt", "1 C Butter", "0.5 C Sugar", "0.5 C Brown Sugar", "1 t Vanilla Extract", "2 C Chocolate Chips"], 2.5)` should return `["5 C All-purpose Flour", "2.5 t Baking Soda", "2.5 t Salt", "2.5 C Butter", "1.25 C Sugar", "1.25 C Brown Sugar", "2.5 t Vanilla Extract", "5 C Chocolate Chips"].`

## Solution Development

### Approach

To solve this problem, we will use the `map` method to iterate over each ingredient in the array, split the string into its components, scale the quantity, and then reconstruct the string with the new quantity.

### Implementation

```javascript
function scaleRecipe(ingredients, scale) {
  return ingredients.map((item) => {
    const [quantity, unit, ...ingredientParts] = item.split(' ')
    const ingredient = ingredientParts.join(' ')
    const scaledQuantity = Number.parseFloat(quantity) * scale
    return `${scaledQuantity} ${unit} ${ingredient}`
  })
}
```

### Code Explanation

1. **Destructuring**: Split each string into `quantity`, `unit`, and the rest of the ingredient description.
2. **Scaling**: Multiply the quantity by the provided scale factor.
3. **Reconstruction**: Combine the scaled values with the units and ingredient name to maintain the original format.

## Complexity

### Time Complexity

The time complexity of this solution is \(O(n)\), where \(n\) is the number of ingredients in the recipe. This is because we use the `map` method to iterate over the array once, performing constant-time operations for each element.

### Space Complexity

The space complexity is \(O(n)\), as we are creating a new array to store the scaled ingredients. Each element of the original array is transformed into a new element in the resulting array.

## Reflections and Learnings

### Concepts Applied

- **String Manipulation**: Using `split`, `join`, and template literals.
- **Data Structures**: Using arrays to store and modify ingredients.
- **Higher-Order Functions**: Using `map` to transform arrays concisely.
- **Array Destructuring**: Extracting multiple values from an array in a single statement.
- **Number Handling**: Converting strings to numbers and performing arithmetic operations to scale quantities.
- **Format Preservation**: Ensuring the output maintains the original format of the ingredients.
- **Modern JavaScript Methods**: Applying ES6+ features to write cleaner and more efficient code.

### Additional Resources

- [JavaScript Array Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [String Manipulation in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Higher-Order Functions in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
