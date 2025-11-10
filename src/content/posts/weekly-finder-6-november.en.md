---
title: 'Weekly Finder: FreeCodeCamp Daily Challenge'
published: 2025-11-06T15:18:28.517Z
description: 'Full analysis of FreeCodeCamp Weekly Finder challenge: how to get the weekday from an ISO date string while avoiding timezone pitfalls, plus alternative approaches.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: 'en'
abbrlink: 'weekly-finder'
---

## The Challenge

Today\'s FreeCodeCamp daily challenge is **Weekly Finder**. The statement looks simple at first:

> **Weekday Finder**
> Given a string date in the format YYYY-MM-DD, return the day of the week.
>
> Valid return days are:
>
> - "Sunday"
> - "Monday"
> - "Tuesday"
> - "Wednesday"
> - "Thursday"
> - "Friday"
> - "Saturday"
>
> **Be sure to ignore time zones.**

At first that last line about "ignore time zones" wasn\'t obvious to me, but later I understood why it\'s crucial.

## First Approach

The initial idea was to create a `Date` object from the input string and use a formatting method to obtain the weekday name.

I didn\'t remember the exact method, but a quick search revealed `toLocaleDateString()`, which can return the weekday in long form when given the right options. The `Date` object in JavaScript represents a point in time and can be constructed from an ISO string (`YYYY-MM-DD`) or from individual components (year, month, day, hour, minute, second). In this challenge we receive an ISO string as input.

`toLocaleDateString()` formats a `Date` according to a locale. Passing `'en-US'` and `{ weekday: 'long' }` returns the full weekday name (for example: "Monday", "Tuesday").

```javascript
function getDayName(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}
```

The function takes a `dateString` in `YYYY-MM-DD` format, constructs a `Date`, and returns the weekday name in English. At first glance, the challenge appeared solved.

## The Timezone Problem

But the tests failed. After adding a few `console.log` statements I discovered the function returned the previous day for every test. Then I remembered the instruction **"Be sure to ignore time zones"** and realized this was the cause.

:::tip
**The issue**: When JavaScript creates a `Date` from a string like `"2025-11-06"`, it interprets it as UTC and then converts it to the local timezone — which can change the calendar day.
:::

How to ignore time zones? Very simple: append `'T00:00:00'` to the input string. That way we always create the date at midnight local/explicit time and avoid timezone shifts.

```javascript
function getDayName(dateString) {
  const date = new Date(`${dateString}T00:00:00`)
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}
```

## Alternative Approaches

### Option 2: Mathematical Algorithm (Zeller's Congruence)

Another approach would avoid creating a `Date` object altogether and compute the weekday using a formula and a weekdays array. It\'s more involved and less readable, but perfectly valid.

Zeller\'s congruence computes the day of the week for any date:

$$f = d + \left\lfloor \frac{13(m+1)}{5} \right\rfloor + y + \left\lfloor \frac{y}{4} \right\rfloor - \left\lfloor \frac{y}{100} \right\rfloor + \left\lfloor \frac{y}{400} \right\rfloor$$

Where:

- $d$ = day of month
- $m$ = adjusted month (March=3, ..., December=12, January=13, February=14)
- $y$ = year (subtract 1 if month is January or February)

```javascript
function getDayName(dateString) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const [year, month, day] = dateString.split('-').map(Number)
  const k = month < 3 ? month + 12 : month
  const m = month < 3 ? year - 1 : year
  const f = day + Math.floor((13 * (k + 1)) / 5) + m + Math.floor(m / 4) + Math.floor(m / 400) - Math.floor(m / 100)
  const dayOfWeek = f % 7
  return days[(dayOfWeek + 5) % 7] // Adjustment so 0 = Sunday
}
```

## Comparison of Approaches

| Method                | Simplicity | Readability | Efficiency |
|-----------------------|------------|-------------|------------|
| toLocaleDateString    | High       | High        | Medium     |
| Zeller's Congruence   | Low        | Medium      | High       |

This table summarizes pros and cons to help choose the right approach for your needs.

## Conclusion

I ended up using the first option because it\'s the simplest and most readable. The real challenge was not the algorithm but understanding how JavaScript handles dates and time zones.

:::note
**Lesson learned**: When working with dates in JavaScript, always be aware of time zones. A simple `T00:00:00` can save you a lot of headaches.
:::

-
