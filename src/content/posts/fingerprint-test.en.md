---
title: "Fingerprint Test - FreeCodeCamp Daily Challenge"
published: 2025-11-17T11:33:17.020Z
description: 'We solve the FreeCodeCamp daily challenge "fingerprint-test".'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "fingerprint-test"
---

## What's the challenge about?

In this FreeCodeCamp challenge, we have two strings (fingerprints) made only of lowercase letters. We want to know if they are similar enough to be considered "the same" using two simple rules:

1. **They must have the same length** (the same number of letters).
2. **They can't be too different**: up to 10% of the letters can be different.

## Simple examples

- `helloworld` and `jelloworld` → Only the first letter is different, so they match.
- `abc` and `xyz` → All letters are different, so they don't match.

## How do we solve it?

The idea is to compare letter by letter:
- If the strings don't have the same number of letters, return `false`.
- If they do, count how many letters are different.
- If the differences don't exceed 10% of the total, return `true`.

## Simple JavaScript code

```javascript
function isMatch(fingerprint1, fingerprint2) {
  if (fingerprint1.length !== fingerprint2.length)
    return false
  let differences = 0
  for (let i = 0; i < fingerprint1.length; i++) {
    if (fingerprint1[i] !== fingerprint2[i])
      differences++
  }
  return differences <= fingerprint1.length * 0.1
}
```

## Why does it work?
- It only compares what's needed.
- It's fast even for long strings.
- It's easy to understand and modify.

## Interesting cases
- If both strings are empty, they are considered a match.
- If only one letter is different and the total is 10 or more, they still match.

## Try it yourself

```javascript
isMatch('helloworld', 'jelloworld') // true
isMatch('abc', 'xyz') // false
isMatch('test', 'test') // true
isMatch('abc', 'abx') // true
```

That's it! This challenge is that simple. You can try your own examples or change the tolerance percentage to make it stricter or more flexible.
