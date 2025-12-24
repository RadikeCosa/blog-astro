---
title: "Markdown Image Parser - FreeCodeCamp #136 Daily Challenge"
published: 2025-12-24T11:18:16.755Z
description: 'We solve FreeCodeCamp\'s "Markdown Image Parser": extract and convert Markdown image strings to HTML using JavaScript and regular expressions. Includes explanation, code, and analysis.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
category: "december"
lang: "en"
abbrlink: "markdown-image-parser"
draft: false
pin: 0
toc: true
---

## 1. Problem Statement

Given a string representing an image in Markdown format, return the equivalent HTML string.

Markdown format: `![alt text](image_url)`

- `alt text`: image description (HTML `alt` attribute)
- `image_url`: image URL (HTML `src` attribute)

Return the HTML string with attributes in the exact order and format:

```md
![Cute cat](cat.png)
```
should return:
```html
<img src="cat.png" alt="Cute cat">
```

> The order, spacing, and quotes must match the example exactly.

## 2. Test Cases

| Input | Expected Output |
|---|---|
| `![Cute cat](cat.png)` | `<img src="cat.png" alt="Cute cat">` |
| `![Rocket Ship](https://freecodecamp.org/cdn/rocket-ship.jpg)` | `<img src="https://freecodecamp.org/cdn/rocket-ship.jpg" alt="Rocket Ship">` |
| `![Cute cats!](https://freecodecamp.org/cats.jpeg)` | `<img src="https://freecodecamp.org/cats.jpeg" alt="Cute cats!">` |

These cover simple text, exclamation marks, and absolute/relative URLs.

## 3. Solution & Explanation

We use a regular expression to extract the alt text and URL, then format the HTML string:

```js
function parseImage(markdown) {
  // Extract alt text and URL using regex
  const regex = /!\[(.*?)\]\((.*?)\)/
  const match = markdown.match(regex)
  if (match) {
    const altText = match[1]
    const imageUrl = match[2]
    return `<img src="${imageUrl}" alt="${altText}">`
  }
  // If no match, return empty string
  return ''
}
```

## 4. Complexity Analysis

- **Time:** $O(n)$, where $n$ is the input string length (regex evaluation).
- **Space:** $O(1)$, only the captured groups and output string are stored.

## 5. Edge Cases & Considerations

- If the input does not match the exact format, returns an empty string.
- No handling of extra spaces, escapes, or multiple images (only the first match).

## 6. Reflections & Learnings

- Regex is ideal for fixed, delimited patterns.
- To support multiple images, use `matchAll`.
- For extra robustness, validate the URL or sanitize the alt text (not required here).

## 7. Resources

- [MDN: Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [MDN: String.prototype.match()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
- [HTML img element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)
