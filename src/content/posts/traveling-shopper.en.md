---
title: "Traveling Shopper - FreeCodeCamp #134 Daily Challenge"
published: 2025-12-22T14:08:41.744Z
description: 'We solve "Traveling Shopper" from FreeCodeCamp, a daily challenge exploring optimization algorithms and efficient routes for shoppers visiting multiple stores.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "traveling-shopper"
---

## 🛒 Problem Summary

Given an initial amount and a list of items to buy (both in the format `["Amount", "Currency"]`), how many can you buy in order, using the following conversion table?

| Currency | Equivalent in USD |
| -------- | ----------------- |
| USD      | 1.00 USD          |
| EUR      | 1.10 USD          |
| GBP      | 1.25 USD          |
| JPY      | 0.0070 USD        |
| CAD      | 0.75 USD          |

- If you can buy all, return **"Buy them all!"**
- Otherwise, return **"Buy the first x items"** (x = number of items you can buy in order).

---

## 🔎 Analysis & Strategy

The key is to convert everything to USD before comparing. This avoids errors and simplifies the calculation. The process is:

1. Convert the initial amount to USD.
2. Iterate through the item list, converting each price to USD.
3. Simulate sequential purchases: if you can afford it, subtract; if not, stop and return how many you could buy.

**Why not convert to the original currency?** Because all rates are given relative to USD, and converting everything to a single currency is more direct and less error-prone.

---

## 🧪 Key Test Cases

- The amount is enough for some but not all items → should return the maximum possible.
- The amount is exactly enough for all → "Buy them all!"
- Amount and items in mixed currencies → must convert correctly.
- Less common currencies (JPY, CAD) → robustness.
- Not enough for even the first item → "Buy the first 0 items."
- Money left after buying everything → still, "Buy them all!"

---

## 💡 Commented Implementation

```js
const rates = {
  USD: 1.0,
  EUR: 1.1,
  GBP: 1.25,
  JPY: 0.007,
  CAD: 0.75,
}

export default function buyItems(amount, items) {
  // Convert initial amount to USD
  let budget = Number.parseFloat(amount[0]) * rates[amount[1]]
  let count = 0

  for (const [price, currency] of items) {
    const priceUSD = Number.parseFloat(price) * rates[currency]
    if (budget >= priceUSD) {
      budget -= priceUSD
      count++
    }
    else {
      return `Buy the first ${count} items.`
    }
  }
  return 'Buy them all!'
}
```

---

## ⏱️ Complexity

- **Time:** $O(n)$ (single pass through the list)
- **Space:** $O(1)$ (no structures proportional to input)

---

## ⚠️ Edge Cases & Tips

- Not enough for even the first item → "Buy the first 0 items."
- Exactly enough or money left over → "Buy them all!"
- Always convert to USD before comparing.
- Use `parseFloat` to handle decimals and integers.

---

## 🤔 Reflections & Learnings

- Array destructuring.
- Currency conversion with a fixed table.
- Sequential greedy simulation.
- Simple, clear, and optimal code for this case.

What would you improve? What if rates were dynamic? 💬

---

## 📚 Resources

- [Exchange rate - Wikipedia](https://en.wikipedia.org/wiki/Exchange_rate)
- [parseFloat (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)
- [Greedy Algorithms - GeeksforGeeks](https://www.geeksforgeeks.org/greedy-algorithms/)
