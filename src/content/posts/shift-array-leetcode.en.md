---
title: "Rotate an Array - LeetCode #189 - Top-Interview Series 6/150"
published: 2025-11-21T21:45:52.387Z
description: "We solve the LeetCode 'Rotate Array' problem with three different approaches, including an optimized one with O(n) time and O(1) extra space."
updated: ""
tags:
  - leetcode
  - top-interview
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "rotate-array-leetcode"
---

## Rotate an Array - LeetCode #189

In this article, we tackle the **"Rotate Array"** problem from LeetCode, a classic challenge that tests your ability to efficiently manipulate arrays. This problem is common in technical interviews as it evaluates your ability to optimize both time and space in a solution. We will explore three different approaches, including an optimized one that uses only **O(1)** extra space.

---

## Problem Statement

Given an array of integers `nums`, rotate the array to the right by `k` steps, where `k` is a non-negative number.

### Example 1

```plaintext
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
```

### Example 2

```plaintext
Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
```

### Normalize K

Before implementing any solution, it is important to normalize the value of `k`. If `k` is greater than the length of the array, rotating the array `k` times is equivalent to rotating it `k % length` times. This ensures that we do not perform unnecessary operations.

---

## Solution 1: Using `splice` and `slice`

In this approach, we use the `slice` and `splice` methods to divide and reassign the array in-place.

### Code (Solution 1)

```typescript
function rotate(nums: number[], k: number): void {
  const n = nums.length
  k = k % n

  if (k === 0)
    return

  nums.splice(0, n, ...nums.slice(-k), ...nums.slice(0, -k))
}
```

### Visual Example (Solution 1)

Suppose we have the array `nums = [1, 2, 3, 4, 5, 6, 7]` and we want to rotate it 3 positions to the right (`k = 3`).

1. Use `splice` to extract the last `k` elements: `[5, 6, 7]`.
2. Then, concatenate these elements at the beginning of the original array: `[5, 6, 7, 1, 2, 3, 4]`.

This approach modifies the original array directly.

### Complexity (Solution 1)

- **Time**: `O(n)` due to the `slice` and `splice` operations.
- **Space**: `O(k)` for the sublists created with `slice`.

---

## Solution 2: Using an Auxiliary Array

In this approach, we create an auxiliary array to calculate the final positions of the elements. Then, we copy the values back to the original array.

### Code (Solution 2)

```typescript
function rotate(nums: number[], k: number): void {
  const n = nums.length
  k = k % n

  const result = Array.from({ length: n })

  for (let i = 0; i < n; i++) {
    const newPos = (i + k) % n
    result[newPos] = nums[i]
  }

  for (let i = 0; i < n; i++) {
    nums[i] = result[i]
  }
}
```

### Step-by-Step Example (Solution 2)

| Iteration | Original Index | Value | New Position | Partial Result |
|-----------|----------------|-------|--------------|----------------|
| 1         | 0              | 1     | 3            | `[ , , , 1, , , ]` |
| 2         | 1              | 2     | 4            | `[ , , , 1, 2, , ]` |
| 3         | 2              | 3     | 5            | `[ , , , 1, 2, 3, ]` |
| 4         | 3              | 4     | 6            | `[ , , , 1, 2, 3, 4]` |
| 5         | 4              | 5     | 0            | `[5, , , 1, 2, 3, 4]` |
| 6         | 5              | 6     | 1            | `[5, 6, , 1, 2, 3, 4]` |
| 7         | 6              | 7     | 2            | `[5, 6, 7, 1, 2, 3, 4]` |

This approach is intuitive but uses additional space proportional to the size of the array.

### Complexity (Solution 2)

- **Time**: `O(n)` for the two loops.
- **Space**: `O(n)` for the auxiliary array.

---

## Solution 3: The Three Reverses Technique

This optimized approach uses the technique of reversing parts of the array to achieve in-place rotation with **O(1)** extra space.

### Concept (Solution 3)

1. Reverse the entire array.
2. Reverse the first `k` elements.
3. Reverse the remaining elements.

### Step-by-Step Example (Solution 3)

Suppose we have the array `nums = [1, 2, 3, 4, 5, 6, 7]` and we want to rotate it 3 positions to the right (`k = 3`).

1. **Reverse the Entire Array**:

   ```plaintext
   [7, 6, 5, 4, 3, 2, 1]
   ```

2. **Reverse the First k Elements**:

   ```plaintext
   [5, 6, 7, 4, 3, 2, 1]
   ```

3. **Reverse the Remaining Elements**:

   ```plaintext
   [5, 6, 7, 1, 2, 3, 4]
   ```

### Code (Solution 3)

```typescript
function rotate(nums: number[], k: number): void {
  const n = nums.length
  k = k % n

  const reverse = (start: number, end: number) => {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]]
      start++
      end--
    }
  }

  reverse(0, n - 1) // Reverse the entire array
  reverse(0, k - 1) // Reverse the first k elements
  reverse(k, n - 1) // Reverse the rest
}
```

### Complexity (Solution 3)

- **Time**: `O(n)` for the three linear passes.
- **Space**: `O(1)` as no additional memory is used.

---

## Reflections and Learnings

- **In-place Manipulation**: We learned how to modify arrays without using extra space.
- **Modulo Operator**: Essential for handling circular indices in rotation problems.
- **Elegance of the Three Reverses**: This approach demonstrates how a mathematical solution can be the most efficient.

---

## Resources and References

- [MDN: Array.reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
- [GeeksforGeeks: Reverse Algorithm](https://www.geeksforgeeks.org/dsa/program-for-array-rotation-continued-reversal-algorithm/)
- [MDN: Array.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
