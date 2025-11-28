---
title: "Reverse Parentheses - FreeCodeCamp Daily Challenge"
published: 2025-11-28T14:35:48.670Z
description: 'Solving the FreeCodeCamp daily challenge "Reverse Parentheses" to invert content inside parentheses in JavaScript.'
updated: ''
tags:
  - freeCodeCamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "reverse-parenthesis"
---

## Challenge: Reverse Parentheses (FreeCodeCamp Daily Challenge)

## Introduction

Today we tackle a classic programming challenge: reverse the content inside parentheses in a string. This problem often appears in interviews and on platforms like FreeCodeCamp and LeetCode, and is perfect for practicing **stacks** and handling nested structures.

## Problem Statement

> Given a string with well-balanced and nested parentheses, reverse the content inside each pair of parentheses. At the end, remove all parentheses.

**Examples:**

- `(abcd)` → `dcba`
- `(uoy)` → `you`
- `(f(b(dc)e)a)` → `abcdef`

## Analysis and First Steps

Before writing code, let's think about how to solve it:

1. **What does "reverse inside parentheses" mean?**
   - Every time we find a closing parenthesis, we need to reverse what is inside the last opened parenthesis.
2. **What if there are parentheses inside others?**
   - The innermost gets reversed first, then the outer ones.

This suggests we need a structure that lets us "stack" pending work and resolve it in reverse order: a **stack**!

## Strategy to Solve the Problem

Every time we find a `(`, we save what we have so far on the stack and start a new "layer." When we find a `)`, we reverse what's in that layer and join it with the previous one.

## Our Solution: Using a Stack

The clearest and most efficient way to solve this is with a stack. Here is the code, explained step by step:

```javascript
function decode(str) {
  // The stack stores strings at each parenthesis level
  const stack = []
  let current = ''

  for (let char of str) {
    if (char === '(') {
      stack.push(current)
      current = ''
    }
    else if (char === ')') {
      current = current.split('').reverse().join('')
      if (stack.length > 0) {
        const previous = stack.pop()
        current = previous + current
      }
    }
    else {
      current += char
    }
  }
  return current
}
```

### Step-by-step walkthrough

Let's take the example `(f(b(dc)e)a)`:

1. Start with `current = ""` and `stack = []`.
2. Read `f` → `current = "f"`
3. Find `(` → push "f", `current = ""`, `stack = ["f"]`
4. Read `b` → `current = "b"`
5. Find `(` → push "b", `current = ""`, `stack = ["f", "b"]`
6. Read `d` and `c` → `current = "dc"`
7. Find `)` → reverse "dc" → "cd", pop "b" → `current = "bcd"`, `stack = ["f"]`
8. Read `e` → `current = "bcde"`
9. Find `)` → reverse "bcde" → "edcb", pop "f" → `current = "fedcb"`, `stack = []`
10. Read `a` → `current = "fedcba"`
11. End → returns "abcdef"

## Test Cases and Edge Cases

- String without parentheses: returns as is.
- Empty parentheses `()` → ignored.
- Multiple levels of nesting: the stack handles them easily.

**Advanced example:**

`((is?)(a(t d)h)e(n y( uo)r)aC)` → `Can you read this?`

## Complexity Analysis

- **Time:** $O(n)$ (we traverse the string once, reversing is linear)
- **Space:** $O(n)$ (the stack can grow up to the size of the string)

## Reflections and Lessons Learned

- The **stack** is the ideal structure for problems with parentheses and nesting.
- Reversing strings in JavaScript: `str.split('').reverse().join('')`
- Thinking in layers and levels helps visualize the process.

## Resources and Related Problems

- [Visual explanation of stacks (YouTube)](https://www.youtube.com/watch?v=wjI1WNcIntg)
