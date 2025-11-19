---
title: "Markdown Heading Converter - FreeCodeCamp Daily-Challenge"
published: 2025-11-19T20:23:45.843Z
description: 'Solving the "Markdown Heading Converter" challenge from FreeCodeCamp, converting Markdown headings to HTML.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "markdown-heading-converter"
---

## Introduction

In this post, we tackle the FreeCodeCamp Daily-Challenge "Markdown Heading Converter", which consists of converting a Markdown heading into its corresponding HTML format. This exercise is a great opportunity to practice regular expressions and error handling in JavaScript.

## Problem Statement

Given a string representing a Markdown heading, convert it to the corresponding HTML heading.
A valid Markdown heading must:

- Start with zero or more spaces,
- Followed by one or more '#' characters (from 1 to 6) indicating the heading level,
- At least one space after the '#',
- And finally, the heading text.

If the string does not match the correct format, the function should return `"Invalid format"`.

**Examples:**

- `convert("# My level 1 heading")` should return `"<h1>My level 1 heading</h1>"`
- `convert("My heading")` should return `"Invalid format"`
- `convert("##### My level 5 heading")` should return `"<h5>My level 5 heading</h5>"`
- `convert("#My heading")` should return `"Invalid format"`
- `convert(" ### My level 3 heading")` should return `"<h3>My level 3 heading</h3>"`
- `convert("####### My level 7 heading")` should return `"Invalid format"`
- `convert("## My #2 heading")` should return `"<h2>My #2 heading</h2>"`

## Approach & Analysis

### Initial Thoughts

The main challenge is to accurately validate the Markdown heading format and extract the heading level and text. Regular expressions are ideal for this task, as they allow us to match patterns and capture groups efficiently.

### Key Insights

- The number of '#' characters determines the heading level (from 1 to 6).
- There must be at least one space after the '#' characters.
- The heading text must be present and can include any character.

### Chosen Approach

We use a regular expression to validate and extract the necessary parts:

- `^(\s*)` captures leading spaces.
- `(#{1,6})` captures between 1 and 6 '#' characters.
- `\s+` ensures at least one space after the '#'.
- `(.+)$` captures the heading text.

If the string matches, we extract the heading level and text, then construct the HTML string. If not, we return `"Invalid format"`.

## Solution

```javascript
function convert(heading) {
  const regex = /^(\s*)(#{1,6})\s+(.+)$/
  const match = heading.match(regex)

  if (!match) {
    return 'Invalid format'
  }

  const level = match[2].length // Number of '#' determines the level
  const text = match[3] // Heading text

  return `<h${level}>${text}</h${level}>`
}
```

## Complexity Analysis

- **Time Complexity:** $O(n)$, where $n$ is the length of the input string. The main operation is the regular expression match, which scans the string.
- **Space Complexity:** $O(n)$, due to storing the match result and constructing the output string.

## Edge Cases & Considerations

- Headings with more than 6 '#' characters are invalid.
- Headings without a space after the '#' are invalid.
- Headings with only spaces and no text are invalid.
- Headings with special characters in the text are valid.

All these cases are handled by the regular expression.

## Concepts Applied

- **Regular Expressions:** For validation and extraction.
- **Template Literals:** For constructing the HTML output.
- **Error Handling:** To return a clear message when the format is invalid.

## Possible Optimizations

For this problem, the current solution is efficient and readable. If processing a large number of headings, precompiling the regular expression could offer minor performance benefits, but it's not necessary for this scope.

## References

- [JavaScript Regular Expressions Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [JavaScript Template Literals Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
