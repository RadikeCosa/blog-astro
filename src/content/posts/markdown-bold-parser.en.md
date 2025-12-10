---
title: "Markdown Bold Parser - FreeCodeCamp Daily Challenge"
published: 2025-12-10T13:14:33.022Z
description: 'We solve "Markdown Bold Parser", the FreeCodeCamp daily challenge, explaining the analysis, solution, and implementation in detail.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "markdown-bold-parser"
---

## Markdown Bold Parser

### Problem Statement

Given a string that may include bold text using Markdown syntax, return the equivalent HTML string.

Bold text in Markdown is any text that starts and ends with two asterisks (**) or two underscores (__). There must be no spaces between the text and the asterisks or underscores, although spaces are allowed inside the text. Convert all valid bold occurrences to HTML `<b>` tags and return the resulting string.

For example, given "**This is bold**", you should return `"<b>This is bold</b>"`.

## Identified Test Cases

```text
- "**This is bold**" → "<b>This is bold</b>"
- "**This is also bold**" → "<b>This is also bold</b>"
- "**This is not bold **" → "**This is not bold **" (invalid because there is a space before the closing asterisks)
- "** This is also not bold**" → "** This is also not bold**" (invalid because there is a space after the opening underscores)
- "The **quick** brown fox **jumps** over the **lazy** dog." → "The <b>quick</b> brown fox <b>jumps</b> over the <b>lazy</b> dog."
```

## Initial Analysis

### Understanding the Problem

The function must identify if the input contains fragments of text that meet the Markdown bold conditions (i.e., text delimited by ** or __, with no spaces between the text and the delimiters). If these conditions are met, those fragments should be replaced by the equivalent HTML version using the <b> tag. To identify these patterns, a regular expression (regex) can be used to correctly detect the delimiters and valid text between them.

## Solution Development

### Chosen Approach

To solve the problem, we use a regular expression (regex) that correctly identifies bold text fragments according to Markdown syntax. The regex should look for sequences that start and end with two asterisks (**) or two underscores (__), ensuring there are no spaces between the delimiters and the text. Once these fragments are identified, they are replaced by the corresponding HTML `<b>` tag, keeping the rest of the string unchanged. This approach allows processing multiple occurrences in the same string and avoids false positives where the delimiters do not meet the rules.

### Step-by-Step Implementation

1. Define a regular expression that correctly detects bold text fragments, i.e., those surrounded by ** or __, with no spaces between the delimiters and the text.
2. The expression should capture the opening delimiter (** or __), the content (allowing internal spaces, but not at the start or end), and the corresponding closing delimiter.
3. Use JavaScript's `replace` method with the global regular expression to find all occurrences in the string.
4. For each match, replace the fragment with `<b>content</b>`, keeping the original text inside the tag.
5. Return the resulting string, where all valid Markdown bold occurrences have been converted to HTML.
6. Ensure that invalid cases (e.g., malformed delimiters or improper spaces) remain unchanged.

### Final Code

```javascript
function parseBold(markdown) {
  // Regular expression to match bold text in Markdown
  const boldRegex = /(\*\*|__)(\S(?:.*?\S)?)\1/g

  // Replace Markdown bold with HTML <b> tags
  markdown = markdown.replace(boldRegex, (_, delimiter, content) => {
    return `<b>${content}</b>`
  })

  return markdown
}
```

#### Explanation of the Regular Expression and the replace Method

The core of the solution is the combined use of a regular expression and JavaScript's `replace` method to transform Markdown bold text to HTML.

This allows processing multiple occurrences and ensures that only valid patterns are converted.

The regular expression `/(**|__)(.*?)\1/g` works as follows:

- `(**|__)` captures the opening delimiter, which can be two asterisks (`**`) or two underscores (`__`).
- `(.*?)` is a capture group that takes any sequence of characters (including empty), non-greedy, allowing empty bold and multiple occurrences in the same string.
- `\1` ensures that the closing delimiter matches exactly the opening one (i.e., if it opened with `**`, it must close with `**`; same for `__`).
- The `g` flag allows searching for all occurrences in the string.

The `replace` method is used with this regular expression and a replacement function. For each match found:

- The function receives the full match, the delimiter, and the captured content as parameters.
- It returns a new string where the captured content is wrapped in the <b> tag, thus replacing the original Markdown fragment with its HTML equivalent.

In this way, the process goes through the entire string and transforms each valid Markdown bold fragment into its HTML version, leaving the rest of the text unchanged and correctly handling cases like empty bold or multiple occurrences on the same line.

## Complexity Analysis

### Time Complexity

The time complexity of the function is O(n), where n is the length of the input string. This is because the `replace` method with a global regular expression goes through the string once to find all matches and perform the replacements. Processing each match (wrapping the content in <b>) is a constant-time operation.

### Space Complexity

The space complexity is also O(n), since the `replace` method generates a new string based on the original, and in the worst case, the size of the resulting string will be proportional to the size of the input string.

## Edge Cases and Considerations

- Non-matching delimiters: for example, `**bold__` is not transformed, since the opening and closing delimiters must match.
- Improper spaces: if there are spaces between the delimiter and the text, such as `** bold**` or `__ bold __`, no conversion is performed.
- Multiple occurrences: the function correctly handles several bolds on the same line.
- Nesting: if there are nested delimiters, only the valid outer delimiter is processed.

## Reflections and Learnings

### Concepts Applied

- Use of regular expressions for text processing.
- Application of the `replace` method with a replacement function to transform complex patterns.
- Handling edge cases and validation of Markdown syntax.

## Resources and References

- [MDN String.prototype.replace() documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
- [Regular expressions in JavaScript (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
