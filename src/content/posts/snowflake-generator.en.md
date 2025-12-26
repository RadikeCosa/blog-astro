---
title: "Snowflake Generator - FreeCodeCamp Daily Challenge"
published: 2025-12-25T13:06:17.663Z
description: 'We solve the "Snowflake Generator" challenge from FreeCodeCamp: string manipulation to mirror text patterns. Includes explanation, code, edge cases, and analysis.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "snowflake-generator"
---

## Problem Statement

> Given a multiline string (separated by `\n`), return a new string where each line is concatenated with its horizontally mirrored version (reversed character by character, including spaces). Do not modify or remove any spaces or line breaks.

**Example:**

Input: `"_ \n _\n* "` (visualized as)

```text

*
 *
*
```

Expected output: `"* _\n ** \n_ *"` (visualized as)

```text
*  *
 **
*  *
```

## Initial Analysis

### What does the challenge ask?

- Take a string with line breaks (`\n`) representing a pattern.
- For each line, create its horizontal mirror (reverse all characters, including spaces).
- Concatenate the original line with its mirror, without modifying spaces or line breaks.

### Key Test Cases

- Input: `"_ \n _\n* "` → Output: `"* _\n ** \n_ *"`
- Input: `"X=~"` → Output: `"X=~~=X"`
- Input: `" X \n v \nX--=\n ^ \n X "` → Output: `" X X \n v v \nX--==--X\n ^ ^ \n X X "`
- Input: `"* _\n _ _ \n_ * _\n _ _ \n_ _"` → Output: `"_ ** _\n _ * * _ \n_ * ** * _\n _ * * _ \n_ ** *"`
- Input: `"_ -\n _ -\n* -"` → Output: `"* -- _\n _ -- _ \n_ -- *"`

These cover patterns with different characters, spaces, and line lengths.

### Strategy

1. **Split the string into lines:** Use `split('\n')`.
2. **Mirror each line:** Reverse with `split('')`, `reverse()`, `join('')`.
3. **Concatenate original and mirror:** For each line, join original + mirror.
4. **Rebuild the final string:** Join with `join('\n')`.

This preserves formatting and spaces.

## Implementation

```javascript
/**
 * FreeCodeCamp Problem: Snowflake Generator
 * @param {string} crystals - Multiline snowflake pattern string
 * @returns {string} String with each line mirrored and concatenated
 */
function generateSnowflake(crystals) {
  const lines = crystals.split('\n')
  return lines
    .map(line => line + line.split('').reverse().join(''))
    .join('\n')
}
export default generateSnowflake
```

## Complexity Analysis

- **Time:** If $n$ is the number of lines and $m$ is the maximum line length, complexity is $O(n \cdot m)$.
- **Space:** Also $O(n \cdot m)$, since each line is duplicated.

## Edge Cases and Considerations

- **Empty lines:** Duplicated correctly.
- **Spaces:** All spaces are preserved, even at the start/end.
- **No line breaks:** Treated as a single line and mirrored.
- **Special characters:** Mirrored as-is, no restrictions.

## Reflections and Learnings

- String and array manipulation in JavaScript.
- Key methods: `split`, `reverse`, `join`.
- Importance of respecting formatting and spaces in text problems.

## Resources

- [MDN: String.prototype.split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [MDN: Array.prototype.reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
- [MDN: Array.prototype.join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

---
