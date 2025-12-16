---
title: "Unique Characters - Daily Challenge"
published: 2025-12-16T16:45:42.925Z
description: "Solving the classic 'Unique Characters' problem: how do you know if a string has all unique characters? We analyze, optimize, and explain step by step."
updated: ''
tags:
- daily-challenge
- freecodecamp
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "unique-characters"
---

### Problem Statement

Given a string, determine if **all characters** are unique (no repetitions).

> ⚠️ **Note:** Uppercase and lowercase letters are considered different ("a" ≠ "A").

## Initial Analysis

### What are we looking for?

Check if a string has **all distinct characters**.

### Test Cases

| Input                | Expected Output |
|----------------------|-----------------|
| "abc"                | true            |
| "aA"                 | true            |
| "QwErTy123!@"        | true            |
| "~!@#$%^&*()_+"      | true            |
| "hello"              | false           |
| "freeCodeCamp"       | false           |
| "!@#_$%^&_()aA"      | false           |

## Solution Development

### Chosen Strategy

We use a `Set` to store the characters we've already seen. If we find a repeated character, we instantly return `false`. If we reach the end with no repetitions, we return `true`.

### JavaScript Code

```js
// Returns true if all characters are unique
function hasUniqueCharacters(str) {
  const seen = new Set()
  for (const char of str) {
    if (seen.has(char)) {
      // Found a duplicate
      return false
    }
    seen.add(char)
  }
  // All characters are unique
  return true
}

// Usage examples
console.log(hasUniqueCharacters('abc')) // true
console.log(hasUniqueCharacters('hello')) // false
console.log(hasUniqueCharacters('aA')) // true
```

## Complexity Analysis

- **Time:** $O(n)$, where $n$ is the length of the string (we traverse each character once).
- **Space:** $O(n)$ in the worst case (all characters are unique and stored in the Set).

## Edge Cases and Considerations

- Empty string: returns `true` (no repetitions).
- Special characters, numbers, and letters: all count as different.
- Uppercase and lowercase: considered different ("a" ≠ "A").
- Long strings with all unique characters: higher memory usage.

## Reflections and Learnings

### What did we learn?

- `Set` is ideal for efficiently detecting duplicates.
- Early detection of repetitions saves time.
- This pattern is useful in validations, passwords, and more.

## Resources and References

- [Set in JavaScript (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

---
