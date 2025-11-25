---
title: "Best Time to Buy and Sell Stock - LeetCode #121 Top-Interview 7/150"
published: 2025-11-25T11:45:49.663Z
description: ''
updated: ''
tags:
- top-interview-150
- leetcode
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "best-time-to-buy-and-sell-stock"
---
## Introduction

Today we tackle LeetCode #121: **Best Time to Buy and Sell Stock**. This is the seventh challenge in the LeetCode Top Interview 150 set.

## Problem Statement

You are given an array `prices` where `prices[i]` represents the price of a stock on day `i`. Your goal is to maximize profit by choosing **one day** to buy and a later day to sell. If no profit is possible, return `0`.

**Example 1:**

```text
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 1 (price = 1), sell on day 4 (price = 6) → 6-1 = 5
```

**Example 2:**

```text
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: Prices only decrease, no profit possible.
```

**Example 3:**

```text
Input: prices = [2,4,1]
Output: 2
```

**Constraints:**

- $1 \leq prices.length \leq 10^5$
- $0 \leq prices[i] \leq 10^4$

## Identified Test Cases

| Case                   | Input           | Output | Comment                    |
| ---------------------- | --------------- | ------ | -------------------------- |
| Classic case           | `[7,1,5,3,6,4]` | 5      | Multiple ups and downs     |
| Decreasing prices      | `[7,6,4,3,1]`   | 0      | No profit                  |
| Only 2 days (up)       | `[1,5]`         | 4      | Minimum case with profit   |
| Only 2 days (down)     | `[5,1]`         | 0      | Minimum case, no profit    |
| Single day             | `[10]`          | 0      | Impossible to trade        |
| All prices equal       | `[3,3,3,3]`     | 0      | No variation               |
| Best profit at end     | `[1,2,3,4,5]`   | 4      | Buy day 0, sell day 4      |

## Approach & Analysis

### Strategy: One Pass

The optimal solution is to traverse the array once, keeping track of the lowest price seen so far and calculating the maximum possible profit at each step. This pattern is known as **greedy** because we always make the best local decision.

```typescript
export function maxProfit(prices: number[]): number {
  let maxProfit = 0
  let minPrevPrice = prices[0]

  for (let i = 1; i < prices.length; i++) {
    const maxProfitThatDay = prices[i] - minPrevPrice
    maxProfit = Math.max(maxProfit, maxProfitThatDay)
    minPrevPrice = Math.min(minPrevPrice, prices[i])
  }
  return maxProfit
}
```

## Step-by-Step Explanation

1. Initialize `maxProfit` to 0 and `minPrevPrice` to the first price.
2. Iterate from the second day:
   - Calculate the profit if selling that day: `prices[i] - minPrevPrice`.
   - Update `maxProfit` if this profit is higher.
   - Update `minPrevPrice` if a lower price is found.
3. At the end, return the maximum profit found.

## Step-by-step example with `[7,1,5,3,6,4]`

| Day | Price | minPrice | Profit if sold today | maxProfit | Action              |
| --- | ----- | -------- | -------------------- | --------- | ------------------- |
| 0   | 7     | 7        | -                    | 0         | Start               |
| 1   | 1     | **1**    | -                    | 0         | New minimum         |
| 2   | 5     | 1        | 5-1=4                | **4**     | Update profit       |
| 3   | 3     | 1        | 3-1=2                | 4         | No improvement      |
| 4   | 6     | 1        | 6-1=5                | **5**     | New record!         |
| 5   | 4     | 1        | 4-1=3                | 5         | No improvement      |

## Complexity

- **Time:** $O(n)$
- **Space:** $O(1)$

## Edge Cases & Considerations

| Case                | Code behavior                                   |
| ------------------- | ----------------------------------------------- |
| Empty array or null | `prices.length < 2` → returns `0`               |
| Single element      | Same handling → `0`                             |
| Equal prices        | `maxProfit` never updates → `0`                 |
| Minimum at end      | Never sells for profit → `0`                    |
| Multiple peaks      | Only the largest jump from a previous minimum   |

## Reflections & Lessons

- **Greedy:** Always keep the best local option (lowest price seen).
- **Minimal state:** Only two values need to be tracked at all times.

## Conclusion

This problem is a great example of how a greedy approach and minimal state analysis can lead to optimal and elegant solutions. The pattern of keeping the minimum and calculating the maximum profit appears in many array and optimization problems.

## Additional Resources

- [Greedy Algorithms - GeeksforGeeks](https://www.geeksforgeeks.org/greedy-algorithms/)
