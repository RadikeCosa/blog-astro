---
title: "Left-Handed Seat at the Table - FreeCodeCamp #146 Daily Challenge"
published: 2026-01-03T14:24:21.033Z
description: 'We solve "Left Handed Seat at the Table", a FreeCodeCamp Daily Challenge where we model seat orientation and count how many seats a left-handed person can occupy.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "left-handed-seat-at-the-table"
---

## Introduction

In this FreeCodeCamp Daily Challenge ("Left Handed Seat at the Table") we are given a table with occupied and empty seats. The task is to count how many empty seats can be taken by a left-handed person, following a simple rule with an important detail: the notion of "left" depends on which side of the table the person is facing.

## Problem Statement

Given a 2×4 matrix (array of arrays) that represents the seating arrangement at a dining table, determine **how many empty seats can be occupied by a left-handed person**.

### Rules

A left-handed person **cannot sit** where there is a right-handed person in the seat **immediately to their left**.

### Matrix Representation

In the input matrix:

- **`R`** (Right-handed): Seat occupied by a right-handed person
- **`L`** (Left-handed): Seat occupied by a left-handed person
- **`U`** (Unoccupied): Empty seat

### Important Constraints

- Only empty seats (`U`) are available to be taken
- Seats in the **top row** are oriented **downwards**
- Seats in the **bottom row** are oriented **upwards** (as in a real table)
- Therefore, **left and right are relative to the seat orientation**
- Corner seats have only one neighbor on one side

### Example

Consider this matrix:

```js
[
  ['U', 'R', 'U', 'L'],
  ['U', 'R', 'R', 'R'],
]
```

**Analysis:**

- In the **top row** (row 0), a seat's left corresponds to the **next column** (`col + 1`). So seat **(0,0)** cannot be taken: its immediate left neighbor is **(0,1)** and it's `R`.
- The other two empty seats (`U`) can be taken because they don't have an `R` immediately to their left (according to their row orientation).

**Result:** `2` seats available for a left-handed person

## Initial Analysis

### Understanding the Problem

We must find empty seats (`U`) that do not have a right-handed neighbor (`R`) immediately to their left, taking into account the seat orientation. Because seats are facing each other across the table, the direction of "left" depends on the row:

- **Top row (index 0):** Seats look down (↓), so their left points to **higher indices** (→)
- **Bottom row (index 1):** Seats look up (↑), so their left points to **lower indices** (←)

### Table Visualization

```
        Indices:   0    1    2    3
                  ┌────┬────┬────┬────┐
Top row (↓):      │    │    │    │    │
                  └────┴────┴────┴────┘
                  ════════════════════════ TABLE
                  ┌────┬────┬────┬────┐
Bottom row (↑):   │    │    │    │    │
                  └────┴────┴────┴────┘
```

### Test Cases Identified

**Case 1 - Basic:**

```js
[
  ['U', 'R', 'U', 'L'],
  ['U', 'R', 'R', 'R'],
]
// Result: 2
// - Row 0[0]U: blocked by R in [1]
// - Row 0[2]U: valid (left is L)
// - Row 1[0]U: valid (corner)
```

**Case 2 - All Empty:**

```js
[
  ['U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U'],
]
// Result: 8 (all seats available)
```

**Case 3 - None Available:**

```js
[
  ['U', 'R', 'U', 'R'],
  ['L', 'R', 'R', 'U'],
]
// Result: 0 (all empty seats blocked by right-handed neighbors)
```

**Case 4 - Corners:**

```js
[
  ['L', 'U', 'R', 'R'],
  ['L', 'U', 'R', 'R'],
]
// Result: 1
// - Row 0[1]U: blocked by R at [2]
// - Row 1[1]U: valid (left is L)
```

**Case 5 - Mixed:**

```js
[
  ['U', 'R', 'U', 'U'],
  ['U', 'U', 'L', 'U'],
]
// Result: 5
```

## Solution Development

### Chosen Approach

We use a straightforward iterative approach with conditional logic based on the row to determine the direction of "left". The solution handles corner cases by checking array bounds before accessing neighbors.

### Step-by-Step Implementation

1. Initialize a counter: `count = 0` to track valid seats.
2. Iterate each row and column with nested loops.
3. Process only positions with value `'U'`.
4. Direction logic by orientation:

   Top row (row === 0):

   ```js
   // Physical left = next index (seat + 1)
   if (seat === table[row].length - 1 || table[row][seat + 1] !== 'R') {
     count++
   }
   ```

   - If it's the **last column** (right corner): it's valid
   - If the seat to the right in the array **is not `'R'`**: it's valid

   Bottom row (row === 1):

   ```js
   // Physical left = previous index (seat - 1)
   if (seat === 0 || table[row][seat - 1] !== 'R') {
     count++
   }
   ```

   - If it's the **first column** (left corner): it's valid
   - If the seat to the left in the array **is not `'R'`**: it's valid

5. Return the final counter.

### Complete Code

```javascript
function findLeftHandedSeats(table) {
  let count = 0

  for (let row = 0; row < table.length; row++) {
    for (let seat = 0; seat < table[row].length; seat++) {
      if (table[row][seat] === 'U') {
        if (row === 0) {
          // Top row (facing down): physical left = next index
          if (seat === table[row].length - 1 || table[row][seat + 1] !== 'R') {
            count++
          }
        }
        else {
          // Bottom row (facing up): physical left = previous index
          if (seat === 0 || table[row][seat - 1] !== 'R') {
            count++
          }
        }
      }
    }
  }
  return count
}
```

## Complexity Analysis

### Time Complexity: O(n × m)

Where `n` is the number of rows and `m` is the number of columns in the matrix.

- We visit each element once using nested loops
- Inner operations are O(1)
- For a 2×4 matrix we perform 8 iterations in total
- **In general:** O(n × m) (usually n=2 and m=4 here)

### Space Complexity: O(1)

- We only use a `count` variable to store the result
- No additional data structures that scale with input size
- Constant extra space

## Reflections and Learnings

### Applied Concepts

1. **Modeling spatial orientation:** The key is to understand that "left" is relative to the direction each person faces.
2. **Context-based conditional logic:** The same question ("is there a right-handed person to the left?") is answered differently depending on the row.
3. **Edge case handling:** Corner seats require explicit boundary checks.

### Key Lessons

1. **Visualization helps:** Drawing the table clarifies relative directions.
2. **Corner cases matter:** Pay attention to edges.
3. **Keep it simple:** A direct solution is sufficient here.
4. **Test thoroughly:** The 5 test cases cover critical scenarios.

### Possible Optimizations

- For this specific problem the current solution is optimal in time and space; further optimization would add unnecessary complexity.
