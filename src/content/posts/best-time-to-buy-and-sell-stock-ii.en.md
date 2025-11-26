---
title: "Best Time to Buy and Sell Stock II - LeetCode #122 Top-Interview 8/150"
published: 2025-11-26T12:07:57.898Z
description: 'Solving the LeetCode Top-Interview problem "Best Time to Buy and Sell Stock II" using a profit-summing approach.'
updated: ''
tags:
  - top-interview-150
  - leetcode
  - greedy
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "best-time-to-buy-and-sell-stock-ii"
---

## Best Time to Buy and Sell Stock II - LeetCode #122 (Top-Interview 8/150)

Yesterday we solved **#121 – Best Time to Buy and Sell Stock** (only one transaction allowed). The approach was: keep track of the minimum price seen so far and calculate the maximum profit possible with a single buy-sell.

Today, the difficulty goes up a notch: **now we can buy and sell as many times as we want!**

## What is the key difference from yesterday's problem?

| Feature                      | #121 (yesterday)             | #122 (today)                          |
|------------------------------|------------------------------|---------------------------------------|
| Number of transactions       | Maximum 1                    | Unlimited                             |
| Holding restriction          | One stock at a time          | One stock at a time (but can buy and sell on the same day) |
| Optimal approach             | Min price + max profit       | **Sum all price increases!**          |

## The Key: Sum All Price Increases

Imagine this price array:

```text
Day:     0  1  2  3  4  5
Price:   7  1  5  3  6  4
```

If you buy at $1 and sell at $5 → +4
Then buy at $3 and sell at $6 → +3
**Total: 7**

Now look at the day-to-day differences:

```text
1→5 : +4
5→3 : -2 (ignore)
3→6 : +3
6→4 : -2 (ignore)
```

Sum of positive differences = 4 + 3 = 7!
Exactly the same maximum profit.

**Magic conclusion**:
When you can make as many transactions as you want, the maximum profit is simply **the sum of all daily price increases**.

## One-Pass Solution (Greedy)

```typescript
function maxProfit(prices: number[]): number {
  let profit = 0

  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1]
    if (diff > 0) {
      profit += diff
    }
  }

  return profit
}
```

That's it! 7 lines of code.

### Complexity

- **Time**: O(n) – single pass
- **Space**: O(1) – just one variable

## Step-by-Step Examples

| Prices            | Daily Differences        | Accumulated Profit | Final Result |
|-------------------|-------------------------|--------------------|--------------|
| `[7,1,5,3,6,4]`   | -6, +4, -2, +3, -2      | +4 → +7            | 7            |
| `[1,2,3,4,5]`     | +1, +1, +1, +1          | +1+1+1+1           | 4            |
| `[7,6,4,3,1]`     | -1, -2, -1, -2          | (none positive)    | 0            |

## Why does this trick work?

Because any optimal strategy can be "broken down" into a series of buys just before a price increase and sells just after. In the end, those small individual profits add up to exactly the sum of all price increases.

## Edge Cases (all covered automatically)

- Only one day → returns 0
- Constant prices → 0
- Prices only decrease → 0
- Prices only increase → maximum possible profit

## Key Takeaway

Yesterday we needed to track the minimum price.
Today we just need to look at the neighbor to the right and say:
**"Did it go up? Perfect, I'll take it!"**
