---
title: "Character Count - FreeCodeCamp Daily Challenge"
published: 2025-11-24T12:41:48.247Z
description: 'We solve the "Character Count" problem from FreeCodeCamp using arrays and string manipulation in JavaScript.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "character-count"
---
## Character Count

### Problem Statement

Given a string containing a sentence, return an **array of strings** with the count of each letter present, in **alphabetical order**.

**Rules**:

- Uppercase and lowercase letters count as the same letter.
- Ignore spaces, numbers, punctuation, and any non-alphabetic characters.
- Only include letters that appear at least once.
- Output in lowercase and in the format `"letter count"` → example: `"a 5"`

### Initial Analysis

The problem requires counting the frequency of each letter in a given sentence, ignoring case, spaces, and non-alphabetic characters. The output must be an array sorted alphabetically in the specified format.

### Chosen Approach

To solve this problem, we will use a fixed array of 26 positions to count the occurrences of each letter in the alphabet. Then, we will construct the result in the required format.

### Step-by-Step Implementation

```javascript
/**
 * Counts the letters in a sentence (ignoring case, numbers, spaces, and punctuation)
 * and returns an alphabetically sorted array in the format "letter count".
 * Complexity: O(n) time → O(1) auxiliary space
 * @param {string} sentence
 * @returns {string[]}
 */
function countCharacters(sentence) {
  // Fixed array of 26 positions: index 0 = 'a', 1 = 'b', ..., 25 = 'z'
  const counts = Array.from({ length: 26 }).fill(0)
  // Normalize the string once
  const lower = sentence.toLowerCase()
  // Phase 1: Count letters (O(n))
  for (const char of lower) {
    if (char >= 'a' && char <= 'z') {
      const index = char.charCodeAt(0) - 97 // 'a' → 0
      counts[index]++
    }
  }
  // Phase 2: Build the result (natural order, O(26) = O(1))
  const result = []
  for (let i = 0; i < 26; i++) {
    if (counts[i] > 0) {
      const letter = String.fromCharCode(97 + i)
      result.push(`${letter} ${counts[i]}`)
    }
  }
  return result
}
```
