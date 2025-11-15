---
title: "Remove Element - LeetCode #27 - Top Interview Series 2/150"
published: 2025-11-15T19:18:08.890Z
description: "Didactic explanation of the in-place Remove Element solution (LeetCode 27) using Two Pointers, with examples, tests and visualizations."
updated: ""
tags:
  - top-interview-150
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "remove-element"
---

## Remove Element — LeetCode 27 (Top Interview 2/150)

Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` in-place and return the number of elements that are not equal to `val`. Important: "remove" here doesn't mean shrinking the array's memory — we only rearrange elements so that the first `k` positions contain the valid elements.

This post explains a clear and efficient Two Pointers solution, with diagrams and examples to show what happens to the array.

---

## Problem (brief)

- Input: `nums` (int[]), `val` (int)
- Requirement: modify `nums` in-place so the first `k` elements are those != `val`.
- Return `k`.
- Order of the first `k` elements does not matter.
- Constraints: `0 <= nums.length <= 100`.

---

## Idea (Two Pointers)

Use two indices:

- `i` (read pointer): scans the array.
- `write` (write pointer): next position to write a valid element.

When `nums[i] !== val` copy `nums[i]` to `nums[write]` and increment `write`. At the end `write` equals `k`.

---

## Flowchart (Mermaid - vertical)

```mermaid
flowchart TB
    Start["Inicio: nums, val"]
    Loop["For i = 0..nums.length-1"]
    Check["nums[i] === val?"]
    Skip["Sí → i++ (no escribir)"]
    Write["No → nums[write] = nums[i]; write++; i++"]
    End["Fin → return write (k)"]

    Start --> Loop
    Loop --> Check
    Check -->|"Sí"| Skip
    Check -->|"No"| Write
    Skip --> Loop
    Write --> Loop
    Loop --> End
    ```

---

## Implementation (TypeScript / JavaScript)

The repository implementation:

```ts
export function removeElement(nums: number[], val: number): number {
  let write = 0; // next write position for a valid element

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[write] = nums[i];
      write++;
    }
  }

  return write; // k: number of valid elements
}
```

---

## Step-by-step example

Input: `nums = [3,2,2,3]`, `val = 3`

- write = 0
- i=0: nums[0]=3 → skip
- i=1: nums[1]=2 → nums[0]=2, write=1
- i=2: nums[2]=2 → nums[1]=2, write=2
- i=3: nums[3]=3 → skip

Return `k = 2`, first 2 elements `[2,2]`.

---

## Tests

The tests included verify correct behavior:

- `removeElement([3,2,2,3], 3) → 2` and `nums.slice(0,2) === [2,2]`
- `removeElement([0,1,2,2,3,0,4,2], 2) → 5` and `nums.slice(0,5) === [0,1,3,0,4]`
- Edge cases:
  - empty array → returns 0
  - all elements equal to val → returns 0
  - no elements equal to val → returns nums.length

---

## Complexity

- Time: O(n) — one pass.
- Space: O(1) — in-place.

---

## Notes & Patterns

- Important: "remove" ≠ physically deleting elements; we overwrite and ignore elements after `k`.
- Pattern: Two Pointers (read/write), ideal for in-place filtering and partitioning.
- This approach is simple, easy to reason about and satisfies the problem constraints.

---
