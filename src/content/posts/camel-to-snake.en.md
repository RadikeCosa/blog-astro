---
title: "Camel to Snake - FreeCodeCamp Daily Challenge"
published: 2025-12-02T11:31:38.756Z
description: "Solving the FreeCodeCamp daily challenge: 'Camel To Snake'. It sounds like a circus act, but it's a string manipulation problem."
updated: ''
tags:
  - freecodecamp
  - daily challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "camel-to-snake"
---

## Camel to Snake

Although the title sounds like a circus act, today's challenge is to convert strings written in camelCase to snake_case.

**Camel Case** is a style where words are joined without spaces and each word (except the first) starts with a capital letter, for example: `camelCaseExample`.
**Snake Case** uses only lowercase letters and separates words with underscores, for example: `snake_case_example`.

### Problem Statement

Given a camelCase string, return its snake_case version following these rules:

- The string contains only letters (A-Z and a-z) and always starts with a lowercase letter.
- Each uppercase letter marks the start of a new word.
- Convert all letters to lowercase.
- Separate words with underscores (`_`).

### Solution Approach

The first intuition is to iterate through the string and detect uppercase letters. Each time we find one, we convert it to lowercase and precede it with an underscore in the result.
To identify uppercase letters in JavaScript, we can compare `char === char.toUpperCase()` or use `char >= 'A' && char <= 'Z'`.

Another option is to use regular expressions with `replace`, searching for all uppercase letters and replacing them with an underscore followed by the lowercase letter. The `replace` method allows passing a function to transform the match.

### Implementation

#### Loop Solution

```javascript
function toSnakeLoop(camelCaseStr) {
  let snakeCaseStr = ''
  for (let char of camelCaseStr) {
    if (char >= 'A' && char <= 'Z') {
      snakeCaseStr += `_${char.toLowerCase()}`
    }
    else {
      snakeCaseStr += char
    }
  }
  return snakeCaseStr
}
```

#### Regular Expression Solution

```javascript
function toSnakeRegex(camelCaseStr) {
  return camelCaseStr.replace(/([A-Z])/g, (match) => {
    return `_${match.toLowerCase()}`
  })
}
```

### Complexity Analysis

- **Time:** $O(n)$, where $n$ is the length of the string. Both solutions traverse the string once.
- **Space:** $O(n)$, since a new string proportional to the input size is generated.

### Final Thoughts

Both solutions are efficient and meet the requirements. The choice between loop or regular expression depends on personal preference and context. Regular expressions are usually more concise, while the loop may be clearer for those unfamiliar with regex.

### Additional Resources

- [Learn Regex](https://regexlearn.com/en/)
- [MDN String.replace() Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
