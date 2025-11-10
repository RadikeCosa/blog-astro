---
title: Get Extension - FreeCodeCamp Daily Challenge 10/11/2025
published: 2025-11-10T11:43:03.707Z
description: "Solving the FreeCodeCamp daily challenge: Get the file name extension."
updated: ""
tags:
  - algoritmos
  - daily
  - freecodecamp
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "get-extension"
---

## Extension Extractor - FreeCodeCamp Daily Challenge

This problem asks us to extract the file extension from a given filename. Let's analyze it step by step and create an efficient solution.

## 📋 Problem Statement

**Extension Extractor**
Given a string representing a filename, return the file extension.

The extension is the part of the filename that comes after the last dot (`.`).
If the filename contains no dot or ends with a dot, return `"none"`.
The extension should be returned as-is, preserving case.

## 🧠 Problem Analysis

### Understanding the Problem

We need to identify the file extension, which is everything after the last dot. But there are special cases:

- Files without extension: `"README"` → `"none"`
- Files with extension: `"document.txt"` → `"txt"`
- Files starting with dot: `".gitignore"` → `"gitignore"`
- Files with multiple dots: `"archive.tar.gz"` → `"gz"`
- Files ending with dot: `"final.draft."` → `"none"`

### Solution Strategy

The algorithm is simple: find the position of the last dot and extract what comes after, with validations.

```mermaid
flowchart TD
    A[Receive filename] --> B[Find last dot with lastIndexOf('.')]
    B --> C{Is there a dot?}
    C -->|No| D[Return 'none']
    C -->|Yes| E{Is dot at end?}
    E -->|Yes| D
    E -->|No| F[Extract substring from dot + 1]
    F --> G[Return extension]
```

## 🛠️ Solution Development

### JavaScript Implementation

```javascript
function getExtension(filename) {
  const lastDotIndex = filename.lastIndexOf(".");

  if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
    return "none";
  }

  return filename.substring(lastDotIndex + 1);
}
```

### Code Explanation

1. **Find the last dot**: We use `lastIndexOf('.')` to find the position of the last dot.
2. **Validate invalid cases**:
   - If no dot exists (`lastDotIndex === -1`)
   - If the dot is the last character (`lastDotIndex === filename.length - 1`)
3. **Extract the extension**: `substring(lastDotIndex + 1)` gives us everything from after the dot.

## 📊 Test Cases

Let's test our function with different cases:

| Case | Input              | Expected Output | Explanation                   |
| ---- | ------------------ | --------------- | ----------------------------- |
| 1    | `"document.txt"`   | `"txt"`         | Standard extension            |
| 2    | `"README"`         | `"none"`        | No extension                  |
| 3    | `"image.PNG"`      | `"PNG"`         | Preserves uppercase           |
| 4    | `".gitignore"`     | `"gitignore"`   | File starting with dot        |
| 5    | `"archive.tar.gz"` | `"gz"`          | Multiple dots, takes the last |
| 6    | `"final.draft."`   | `"none"`        | Ends with dot                 |

```javascript
console.log(getExtension("document.txt")); // "txt"
console.log(getExtension("README")); // "none"
console.log(getExtension("image.PNG")); // "PNG"
console.log(getExtension(".gitignore")); // "gitignore"
console.log(getExtension("archive.tar.gz")); // "gz"
console.log(getExtension("final.draft.")); // "none"
```

## 📈 Complexity Analysis

- **Time**: O(n) where n is the string length
- **Space**: O(1) additional

## 🤔 Final Thoughts

This problem teaches us efficient string manipulation. The `lastIndexOf` and `substring` methods are powerful tools in JavaScript.

Have you solved this challenge? Did you use a different approach? Share in the comments!

---

_This post is part of my FreeCodeCamp daily challenges series. Keep learning!_ 🚀
