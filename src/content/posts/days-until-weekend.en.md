---
title: "Dias Hasta El Fin de Semana - FreeCodeCamp Daily Challenge"
published: 2025-11-14T13:10:00.000Z
description: "Solution analysis for the Days Until Weekend problem, with calendar visualization, step-by-step explanation and efficient date handling in JS."
tags:
  - freecodecamp
  - daily-challenge
draft: false
toc: true
lang: "en"
abbrlink: "days-until-weekend"
---

## Days Until Weekend — FreeCodeCamp Daily Challenge

One of the everyday programming problems is calculating how many days remain until the weekend. Let's explore how to solve it in JavaScript in a simple and didactic way.

---

## 📝 Problem Statement

> The weekend starts on Saturday.
>
> - If the given date is Saturday or Sunday, return `"It's the weekend!"`.
> - Otherwise, return `"X days until the weekend."`, where X is the number of days until Saturday.
> - Use `"day"` (singular) if X is 1.
> - Ignore local timezone in the calculation.

---

## 🧪 Test Cases

- daysUntilWeekend("2025-11-14") → `"1 day until the weekend."`
- daysUntilWeekend("2025-01-01") → `"3 days until the weekend."`
- daysUntilWeekend("2025-12-06") → `"It's the weekend!"`
- daysUntilWeekend("2026-01-27") → `"4 days until the weekend."`
- daysUntilWeekend("2026-09-07") → `"5 days until the weekend."`
- daysUntilWeekend("2026-11-29") → `"It's the weekend!"`

---

## 🔍 Analysis & Approach

The solution uses the Date object's `getUTCDay()` method, which returns the weekday in UTC (0 = Sunday, ..., 6 = Saturday).

General outline:

1. Create a Date object from the date string.
2. Get the weekday in UTC.
3. If it's Saturday or Sunday, return the weekend message.
4. Otherwise, calculate remaining days until Saturday and return the proper message (singular/plural).

---

## 💡 Solution in JavaScript

```js
function daysUntilWeekend(dateString) {
  const date = new Date(dateString)
  const dayOfWeek = date.getUTCDay()

  // Optional validation (recommended if input might be invalid)
  // if (isNaN(date.getTime())) return "Invalid date.";

  if (dayOfWeek === 6 || dayOfWeek === 0) {
    return 'It\'s the weekend!'
  }

  const daysUntilSaturday = 6 - dayOfWeek
  return daysUntilSaturday === 1
    ? '1 day until the weekend.'
    : `${daysUntilSaturday} days until the weekend.`
}
```

---

## 🛠️ Step-by-step Example (with console.log):

Suppose the date is `'2025-11-14'`:

```js
const dateString = '2025-11-14'
const date = new Date(dateString)
const dayOfWeek = date.getUTCDay()

console.log('Weekday (UTC):', dayOfWeek) // 5 → Friday

if (dayOfWeek === 6 || dayOfWeek === 0) {
  console.log('It\'s the weekend!')
}
else {
  const daysUntilSaturday = 6 - dayOfWeek
  if (daysUntilSaturday === 1) {
    console.log('1 day until the weekend.')
  }
  else {
    console.log(`${daysUntilSaturday} days until the weekend.`)
  }
}
// Output: "1 day until the weekend."
```

---

## 📊 Complexity

- **Time:** \( O(1) \) (constant operations).
- **Space:** \( O(1) \) (only scalars and a Date object).

---

## ⚠️ Edge Cases & Considerations

- Uses UTC, avoiding local timezone issues.
- If the date is Saturday (6) or Sunday (0), returns the weekend message.
- If Friday (5), returns "1 day until the weekend." (singular).
- If the date is invalid: returns "NaN days..." (not covered by tests, but can be improved).
- For extra robustness: add validation for invalid dates.

---

## 📑 Relationship & Differences with Weekday Finder

> If you're interested in date challenges, check out [my article on Weekday Finder](https://blog-astro-rouge.vercel.app/posts/weekly-finder/), where I show how to get the day name from a date using JavaScript and how to avoid timezone errors.

While both problems revolve around handling dates in JavaScript, and timezone issues can cause subtle errors, there's a key difference:

- **Days Until Weekend** only needs the day number in the week (0 to 6), achieved safely with `getUTCDay()`, which ignores the local timezone and always gives the correct result for days until Saturday.
- **Weekday Finder** needs the day name ("Monday", "Tuesday"...). If you use the default JavaScript method (`toLocaleDateString` on a "YYYY-MM-DD" string), you can get errors because the date is interpreted as UTC and then converted to the local timezone. On some systems, this makes the function return the previous day.

**Key lesson**:
When working with dates in JS, consider both format and how timezone affects interpretation.
In "Days Until Weekend", using UTC is enough. In "Weekday Finder", adding `"T00:00:00"` to the input string ensures it’s interpreted as local and the result is consistent.

🔗 [Read the full analysis of Weekday Finder](https://blog-astro-rouge.vercel.app/posts/weekly-finder/)

---

## 🧩 Reflections & Learnings

- `getUTCDay()` lets you work without worrying about the local timezone.
- The ternary operator allows clear singular/plural messaging.
- Visualizing the calendar helps understand the logic.
- If internationalization is needed, the logic adapts easily.

---

## 🔎 Key Resources

- [MDN Date.prototype.getUTCDay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDay)
- [MDN Date constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date)
- [LeetCode: Date problems](https://leetcode.com/tag/date/)
- [MDN Conditional Operator (Ternary)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
- - [Weekday Finder Analysis](https://blog-astro-rouge.vercel.app/posts/weekly-finder/)

---
