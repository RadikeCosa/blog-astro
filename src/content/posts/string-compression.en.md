---
title: "String Compression - FreeCodeCamp Daily-Challenge"
pubDate: 2025-12-07
description: 'We solve the FreeCodeCamp daily challenge "String Compression", explore alternatives, and analyze its complexity.'
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "string-compression"
---

## String Compression - Analysis and Explanation

## Problem Statement

Given a string, return a compressed version where consecutive duplicate words are replaced by the word followed by the number of repetitions in parentheses.

Only consecutive duplicates are compressed.
Words are separated by a single space.
For example, given "yes yes yes please", you should return "yes(3) please".

How can we compress text strings efficiently and readably? 🤔

## Initial Analysis

### Understanding the Problem

To solve this problem, we first need to split the string into words, using spaces as separators. This can be done with the `split(" ")` method, although if we want to ignore punctuation we could use a regular expression.

Then, we iterate through the array of words, comparing each word to the previous one. If they are the same, we increment a counter; if not, we add the word (and the counter if greater than 1) to the result and reset the counter.

There are several ways to implement this:

- Use a classic loop (`for` or `while`), which is very readable and efficient in terms of complexity ($O(n)$).
- Use the `reduce` method, which can be more functional and compact, but sometimes less intuitive for those unfamiliar with this pattern.

Both approaches are efficient ($O(n)$), but the classic loop is usually clearer and easier to maintain, especially for problems where consecutive elements need to be compared.

### Test Cases Identified

#### Test Case Table

| Input                                    | Output                   |
|------------------------------------------|--------------------------|
| yes yes yes please                       | yes(3) please            |
| I have have have apples                  | I have(3) apples         |
| one one three and to the the the the     | one(2) three and to the(4) |
| route route route ... tee tee tee ...    | route(6) tee(6)          |
| a b c d                                  | a b c d                  |
| hello                                    | hello                    |
| ""                                       | ""                       |
| a b a a                                  | a b a(2)                 |

## Solution Development

### Chosen Approach

Although the statement does not explicitly mention what to do with punctuation, I consider it most consistent to remove it before processing the string, to avoid treating words like "hello" and "hello," as different. For this, I use a regular expression to remove common punctuation marks.

Then, I convert the string into an array of words using `split(" ")`. To compress consecutive words, you can use either a classic loop or the `reduce` method. Both approaches are equally efficient ($O(n)$), but I opt for `reduce` because it allows you to write the accumulation logic in a more compact and functional way, while maintaining readability if properly commented.

### Step-by-Step Implementation

1. **Remove punctuation:**
   We use a regular expression to remove common punctuation marks from the string, ensuring that words like "hello" and "hello," are treated the same.

2. **Split the string into words:**
   We use `split(" ")` to get an array of words, and `filter(Boolean)` to remove possible empty elements.

3. **Iterate through the array with reduce:**
   We apply the `reduce` method to accumulate the compressed result.

   - If the current word is the same as the previous, increment the counter.
   - If different, add the previous word (and the counter if greater than 1) to the result and reset the counter.

4. **Add the last word:**
   At the end of the reduce, make sure to add the last processed word with its corresponding counter.

5. **Join the result:**
   Finally, join the result array with spaces to get the compressed string.

**Example code:**

```javascript
function compressString(sentence) {
  // 1. Remove punctuation and split into words
  const words = sentence
    .replace(/[.,!?;:]/g, '')
    .split(' ')
    .filter(Boolean)

  if (words.length === 0)
    return ''

  // 2. Use reduce to compress consecutive words
  const compressed = words.reduce(
    (acc, word, idx, arr) => {
      if (word === acc.prev) {
        acc.count++
      }
      else {
        if (acc.prev !== null) {
          acc.result.push(
            acc.count > 1 ? `${acc.prev}(${acc.count})` : acc.prev
          )
        }
        acc.prev = word
        acc.count = 1
      }
      // At the end, add the last word
      if (idx === arr.length - 1) {
        acc.result.push(acc.count > 1 ? `${acc.prev}(${acc.count})` : acc.prev)
      }
      return acc
    },
    { result: [], prev: null, count: 0 }
  )

  // 3. Join the result
  return compressed.result.join(' ')
}
```

## Complexity Analysis

### Time Complexity

The time complexity of the solution is $O(n)$, where $n$ is the number of words in the string.

- The process of removing punctuation and splitting the string into words is linear with respect to the size of the string.
- The reduce traversal is also linear, as each word is processed only once.

### Space Complexity

The space complexity is $O(n)$, since an array of words and another array for the compressed result are created, both proportional to the number of words in the original string.

## Edge Cases and Considerations

- **Empty string:** If the input is an empty string, the result should be an empty string.
- **Single word:** If the string contains only one word, it should be returned unchanged.
- **No repeated words:** If there are no consecutive repeated words, the string is returned as is.
- **Non-consecutive repeated words:** Only consecutive repetitions are compressed, not those separated by other words.
- **Punctuation:** Removed before processing to avoid affecting comparison.
- **Multiple spaces:** Empty elements are removed after split to avoid errors due to extra spaces.

### Edge Cases

- ✔️ Empty string → ""
- ✔️ Single word → "hello"
- ✔️ No repeated words → "a b c d"
- ❌ Non-consecutive repeated words → only compresses consecutive

## Reflections and Learnings

### Concepts Applied

- String and array manipulation in JavaScript.
- Use of regular expressions to clean strings.
- Use of the `reduce` method for accumulation and data transformation.

### Possible Optimizations

Although the solution with `reduce` is efficient and compact, a simpler and more readable approach can be used with a classic loop. This method makes the code easier to understand and maintain, especially for those not familiar with functional programming.

**Example of optimized and readable code:**

```javascript
function compressString(sentence) {
  // 1. Remove punctuation and split into words
  //    - Replaces common punctuation marks with empty string
  //    - Splits the string into words using space
  //    - Removes possible empty elements (multiple spaces)
  const words = sentence
    .replace(/[.,!?;:]/g, '')
    .split(' ')
    .filter(Boolean)

  // 2. If there are no words, return empty string
  if (words.length === 0)
    return ''

  let result = [] // Array to store the compressed result
  let count = 1 // Counter for consecutive repetitions

  // 3. Iterate through the array of words from the second position
  for (let i = 1; i <= words.length; i++) {
    // If the current word is equal to the previous, increment the counter
    if (words[i] === words[i - 1]) {
      count++
    }
    // If different (or at the end), add the previous to the result
    else {
      // If there were repetitions, add "word(n)", otherwise just the word
      result.push(count > 1 ? `${words[i - 1]}(${count})` : words[i - 1])
      count = 1 // Reset the counter
    }
  }

  // 4. Join the result array into a space-separated string
  return result.join(' ')
}
```

What other functional approaches could be applied to this problem? 💡

## Resources and References

- [Array.prototype.reduce documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Regular expressions in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Original FreeCodeCamp challenge](https://www.freecodecamp.org/learn/coding-interview-prep/)
