---
title: 'Matrix Builder - FreeCodeCamp Daily Challenge'
published: 2025-11-05T14:04:58.646Z
description: 'Solution to the FreeCodeCamp daily challenge: building matrices with Array.from(). Comparison of approaches and analysis of when to use each one.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: 'en'
abbrlink: 'matrix-builder-freecodecamp-nov5'
---

Today's FreeCodeCamp challenge is "Matrix Builder". The goal is to create a function that generates a matrix (array of arrays) of a specified size, filling it with zeros.

## The Problem

We need to implement a function that takes two parameters:

- `rows`: number of rows (outer arrays)
- `cols`: number of columns (elements per row)

And returns a `rows x cols` matrix filled with zeros.

## Examples

Here are the provided test cases:

1. `buildMatrix(3, 2)` should return `[[0, 0], [0, 0], [0, 0]]`.
2. `buildMatrix(2, 4)` should return `[[0, 0, 0, 0], [0, 0, 0, 0]]`.
3. `buildMatrix(1, 5)` should return `[[0, 0, 0, 0, 0]]`.
4. `buildMatrix(4, 1)` should return `[[0], [0], [0], [0]]`.

## What is Array.from()?

Before looking at the solution, let's understand this key tool in modern JavaScript.

`Array.from()` creates a new array from something that "looks like" an array but isn't. It takes up to 3 parameters:

```javascript
Array.from(arrayLike, mapFunction, thisArg)
```

**Parameters:**

1. **`arrayLike`** (required): An iterable or array-like object you want to convert
2. **`mapFunction`** (optional): Function that transforms each element (like `.map()`)
3. **`thisArg`** (optional): Value to use as `this` in the mapping function

**The trick with `{ length: N }`:**

JavaScript treats `{ length: N }` as an array-like object, and `Array.from()` converts it into a real array:

```javascript
// Create array of 5 undefined elements
Array.from({ length: 5 }) // [undefined, undefined, undefined, undefined, undefined]

// Create array of 5 elements with indices
Array.from({ length: 5 }, (_, i) => i) // [0, 1, 2, 3, 4]

// Fill with a specific value
Array.from({ length: 3 }, () => 0) // [0, 0, 0]
```

## Solution with Array.from()

For this problem we use `Array.from()` twice: the first to create the outer array (the rows), and the second to create each inner array (the columns with zeros).

```javascript
function buildMatrix(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0))
}
```

### Step-by-Step Explanation

1. **First call**: `Array.from({ length: rows }, ...)` creates an array of `rows` elements.
2. **Outer mapping function**: For each element (row), we execute the function that returns an array.
3. **Second call**: `Array.from({ length: cols }, () => 0)` creates an array of `cols` elements, all with value 0.
4. We return the resulting matrix: an array of arrays.

## Approach Comparison

### Array.from() - Our Solution

**✅ More convenient when:**

- Using modern JavaScript (ES6+, Node.js 8+, current browsers)
- Preferring declarative/functional style
- Needing concise and expressive code: "create X rows of Y zeros"
- Working with multidimensional matrices (3D, 4D, etc.)
- Requiring complex initialization with different values per position

**❌ Less convenient when:**

- Needing compatibility with IE11 or very old Node.js
- Preferring more explicit code for debugging

### Nested Loops

**✅ More convenient when:**

- **Debugging**: Easy to add `console.log()` at each step
- **Compatibility**: Works in any JavaScript version
- **Fine control**: Need conditional logic during creation
- **Learning**: Easier to understand for beginners
- **Critical performance**: In some very old JS engines

**❌ Less convenient when:**

- The code becomes verbose (6–8 lines vs 1).
- There's a higher risk of "off-by-one" errors when handling indices manually — a classic bug caused by confusing zero-based indices with an array's length.

## Comparison Table by Scenario

| Scenario | Recommended | Reason |
|----------|-------------|--------|
| Legacy production | Loops | ✅ Maximum compatibility |
| Complex debugging | Loops | ✅ Easy to inspect each step |
| Critical performance | Loops | ✅ Less functional overhead |
| Academic code | `Array.from()` | ✅ Shows modern knowledge |
| 3D+ matrices | `Array.from()` | ✅ Natural nesting |

## Complexity

**All solutions have the same complexity:**

- **Time**: O(rows × cols) - We must create `rows × cols` elements
- **Space**: O(rows × cols) - The resulting matrix occupies that space

There's no significant performance difference between approaches for typical use cases.

## Conclusion

`Array.from()` is the most chosen option because:

1. **Clearly expresses intent**: "Create X rows, each with Y zeros"
2. **Less code**: One line vs 6-8 lines
3. **Fewer errors**: No loop variables or manual indices
4. **More maintainable**: Easy to change values or logic

However, knowing the alternatives provides a broader perspective. Loops remain valuable for debugging and compatibility, while `Array.from()` shines in modern, expressive code.

<!-- TODO: Personalize the article with your voice
- Add a personal introduction: Why do you enjoy doing these daily challenges?
- Include anecdotes: When did you learn Array.from()? Did something about the problem surprise you?
- Connect with other topics: Mention if you've worked with matrices in real projects
- Make it conversational: "At first it confused me..." or "I once made this mistake..."
- Add calls to action: Encourage readers to share their solutions
-->
