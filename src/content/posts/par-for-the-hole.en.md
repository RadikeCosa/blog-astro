---
title: "Par For The Hole - FreeCodeCamp #154 Daily Challenge"
published: 2026-01-12T16:48:01.606Z
description: 'We solve "Par For The Hole" (FreeCodeCamp Daily Challenge): how to map golf scores to classic terms. Analysis, commented code, and reflections.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
  - algorithms
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "par-for-the-hole"
---

## Par For The Hole: Analysis & Explanation

### Problem Statement

Given the par for a golf hole and the number of strokes taken, return the score using classic golf terms:

- "Hole in one!" if done in a single stroke.
- "Eagle" if done in two strokes less than par.
- "Birdie" if done in one stroke less than par.
- "Par" if done in the same number of strokes as par.
- "Bogey" if done in one stroke more than par.
- "Double bogey" if done in two strokes more than par.

## Initial Analysis

### Understanding the Problem

The problem requires comparing two integers and returning the appropriate term according to the difference between strokes and par, following golf rules.

### Test Cases

- golfScore(3, 3) → "Par"
- golfScore(4, 3) → "Birdie"
- golfScore(3, 1) → "Hole in one!"
- golfScore(5, 7) → "Double bogey"
- golfScore(4, 5) → "Bogey"
- golfScore(5, 3) → "Eagle"

## Solution Development

### Approach

The approach consists of a series of conditionals that compare the two integers and return the corresponding string according to golf rules.

### Step-by-Step Implementation

1. Define the function `golfScore` that takes two parameters: `par` and `strokes`.
2. Use conditionals to compare `strokes` with `par` and return the appropriate string.

### Final Code

```javascript
/**
 * Determines the golf score based on par and strokes taken.
 * @param {number} par - The par for the hole.
 * @param {number} strokes - The number of strokes taken.
 * @returns {string} The score in golf terms.
 */
function golfScore(par, strokes) {
  if (strokes === 1)
    return 'Hole in one!'
  if (strokes <= par - 2)
    return 'Eagle'
  if (strokes === par - 1)
    return 'Birdie'
  if (strokes === par)
    return 'Par'
  if (strokes === par + 1)
    return 'Bogey'
  if (strokes === par + 2)
    return 'Double bogey'
  // Optional: handle other cases
  return 'Out of range'
}
```

## Complexity Analysis

### Time Complexity

The function performs simple conditional comparisons, all in constant time. Therefore, the time complexity is $O(1)$.

### Space Complexity

Space usage is $O(1)$, as no additional structures are used.

## Edge Cases & Considerations

- If strokes are less than par - 2 (e.g., par 5 and 2 strokes), the function returns "Eagle".
- If strokes are greater than par + 2, it now returns "Out of range" for clarity.

## Reflections & Learnings

### Concepts Applied

- Use of chained conditionals to map simple business rules
- Simulation of scoring logic based on domain rules (golf)

### Possible Optimizations

- The function can be extended to include other golf terms if required.

## Resources & References

- [Wikipedia: Par (score)](https://en.wikipedia.org/wiki/Par_(score))
- [Wikipedia: Glossary of golf](https://en.wikipedia.org/wiki/Glossary_of_golf)

---

Would you like to see more solved challenges or have questions? Leave a comment below! ⛳
