---
title: "Message Validation - FreeCodeCamp Daily Challenge"
published: 2025-11-24T12:48:16.260Z
description: 'We solve the "Message Validator" problem from FreeCodeCamp using regular expressions in JavaScript.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "message-validator"
---

## Introduction

### Problem Statement

Given a message string and a validation string, determine if the message is valid.
A message is valid if each word in the message starts with the corresponding letter in the validation string, in order.
The comparison is case-insensitive.
Words in the message are separated by single spaces.

## Initial Analysis

### Understanding the Problem

- The message is split into words using spaces as separators.
- Each word must start with the corresponding letter in the validation string.
- The comparison is case-insensitive.
- The number of words in the message must match the length of the validation string.
- If any word does not meet the condition, the message is invalid.
- If all words meet the condition, the message is valid.
- Return `true` if the message is valid, `false` otherwise.

### Identified Test Cases

| Input                                                        | Expected Output | Passes |
| ------------------------------------------------------------ | --------------- | ------ |
| `"hello world", "hw"`                                        | `true`          | Yes    |
| `"ALL CAPITAL LETTERS", "acl"`                               | `true`          | Yes    |
| `"Coding challenge are boring.", "cca"`                      | `false`         | Yes    |
| `"The quick brown fox jumps over the lazy dog.", "TQBFJOTLD"`| `true`          | Yes    |
| `"The quick brown fox jumps over the lazy dog.", "TQBFJOTLDT"`| `false`         | Yes    |

## Solution Development

### Chosen Approach

- Split the message into words using spaces as separators.
- Compare the first letter of each word with the corresponding letter in the validation string.
- Ensure that the number of words matches the length of the validation string.
- Implement the comparison in a case-insensitive manner.
- Return `true` if all words meet the condition, `false` otherwise.

### Implementation in JavaScript

```javascript
/**
 * FreeCodeCamp Problem: Message Validator
 * Category: FreeCodeCamp
 *
 * @param {string} message - The message to validate
 * @param {string} validator - The validator string
 * @returns {boolean} Whether the message is valid according to the validator
 */
function isValidMessage(message, validator) {
  const words = message
    .replace(/[^a-z\s]/gi, '')
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0)

  if (words.length !== validator.length) {
    return false
  }

  for (let i = 0; i < words.length; i++) {
    if (words[i][0].toLowerCase() !== validator[i].toLowerCase()) {
      return false
    }
  }

  return true
}
```
