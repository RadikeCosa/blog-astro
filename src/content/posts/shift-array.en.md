---
title: "Shift Array - LeetCode Style"
published: 2025-11-14T00:30:00.000Z
description: "Explained solution for the Shift Array problem using modular normalization and tests. Strategies, edge cases, and visualizations."
tags:
  - array
  - rotation
  - leetcode
  - js
  - explanation
draft: false
toc: true
lang: "en"
abbrlink: "shift-array-leetcode"
---

# 🏆 Shift Array - Step-by-Step Explanation

## Problem Statement

> Write a function that, given an array and a number $n$, returns the array shifted $n$ positions to the right. Elements that go off the right end should re-enter from the left.

---

## 🧩 Quick Examples

| Input             | Output      |
| ----------------- | ----------- |
| ([1,2,3,4,5], 2)  | [4,5,1,2,3] |
| ([1,2,3,4,5], 5)  | [1,2,3,4,5] |
| ([1,2,3,4,5], 0)  | [1,2,3,4,5] |
| ([1,2,3,4,5], -3) | [3,4,5,1,2] |
| ([1,2,3,4,5], 7)  | [4,5,1,2,3] |

---

## 📐 Normalization and Modular Cycle

A shift can be very large (greater than the array length), negative, or zero.  
The key is to **normalize** the shift using modulo:

```math
n' = n \mod length
```

Visually, the cycle:

```mermaid
graph LR
    A[Shift] --> B[n > 0?]
    B -- Yes --> C[Shift n positions right]
    B -- No --> D[Shift |n| positions left]
    C --> E[Normalize with modulo]
    D --> E
    E --> F[Final Array]
```

- If $n < 0$, it’s equivalent to shifting left.

### Cycle Example (n = 7, length = 5)

- $7 \mod 5 = 2$ ⇒ shift 2 right (so 7 and 2 are equivalent for this array!)

---

## 💻 Implementation Explained

```js
function shiftArray(arr, n) {
  const length = arr.length;
  if (length === 0) return arr; // Edge case: empty array

  n = n % length; // Step 1: Normalize n within array range
  if (n < 0) n += length; // Step 2: If n negative, convert to positive rightward shift

  // Step 3: Reconstruct the array by slicing and concatenating
  const part1 = arr.slice(-n); // last n elements (to go first)
  const part2 = arr.slice(0, length - n); // the rest
  return part1.concat(part2); // put together for the "shift"
}
```

**Why this way?**

- Slice does the "rollover" for you—no manual loops needed.
- Normalization guarantees any number (negative, giant, zero...) fits the array’s cycle.
- Never mutates the original array.

---

## 🧪 Testing and Validation

Test coverage checks the solution against all relevant cases—edge and any type of array:

```js
describe("shiftArray", () => {
  it("handles positive, negative, and oversize shifts", () => {
    expect(shiftArray([1, 2, 3], 1)).toEqual([2, 3, 1]); // right
    expect(shiftArray([1, 2, 3], -1)).toEqual([3, 1, 2]); // left
    expect(shiftArray(["a", "b", "c"], 5)).toEqual(["c", "a", "b"]); // cycle
    expect(shiftArray(["a", "b", "c"], -11)).toEqual(["b", "c", "a"]); // negative cycle
    expect(shiftArray([1, 2, 3, 4, 5], 5)).toEqual([1, 2, 3, 4, 5]); // length
    expect(shiftArray([1, 2, 3, 4, 5], 0)).toEqual([1, 2, 3, 4, 5]); // zero
  });
});
```

### Why test like this?

- Proves that surprises from weird shifts **never** break the solution.
- Let's you refactor with confidence.

---

## ✍️ Edge Cases and Considerations

- Empty array: returns empty.
- Shift equal to length: returns original.
- Negative or oversized shifts: adjust automatically.
- Accepts any type of element.

---

## 🔍 Complexity

- **Time:** $O(n)$ per shift.
- **Space:** $O(n)$ for the new array.

---

## 🎓 Reflection / Takeaways

- The key in LeetCode-style problems: normalize indices and treat arrays as cyclic structures.
- Robust tests verify correct behavior for any case.
- If the array can be mutated, you could use in-place rotation for $O(1)$ space.

---

## 🔗 Resources

- [MDN slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [LeetCode 189: Rotate Array](https://leetcode.com/problems/rotate-array/)
