---
title: 'Solving the Weekly Finder: How to Get the Day of the Week in JavaScript'
published: 2025-11-06T15:18:28.517Z
description: 'A complete analysis of the Weekly Finder challenge from FreeCodeCamp: how to get the day of the week from a date string, avoiding timezone issues, and exploring multiple solution approaches.'
updated: ''
tags:
  - javascript
  - freecodecamp
  - algorithms
  - dates
  - problem-solving
draft: false
pin: 0
toc: true
lang: 'en'
abbrlink: 'weekly-finder-javascript-timezone-solution'
---

## The Challenge

Today's daily challenge on FreeCodeCamp is called **Weekly Finder**. The prompt is seemingly simple:

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

At first, that last line about "ignoring time zones" wasn't clear to me, but later I understood perfectly why it was crucial.

## First Approach

The first thing I thought of was using a `Date` object with the string I received as a parameter and finding a method to get the day of the week with the full name.

I didn't remember the exact method, but I quickly searched and found `toLocaleDateString()`, which takes the locale as the first parameter and an options object as the second. I used `'en-US'` as the locale and set `weekday: 'long'` in the options to get the day of the week in long format.

```javascript
function getDayName(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}
```

In theory, the `toLocaleDateString()` method handles returning the day of the week in the correct format.

## The Timezone Problem

But when I ran the tests, they failed. I debugged with a `console.log` and in all the tests, it returned one day earlier than expected. Then I remembered the prompt said **"Be sure to ignore time zones"**, and I immediately knew that was the cause of the error.

:::tip
**The problem**: When JavaScript creates a `Date` object from a string like `"2025-11-06"`, it interprets it as UTC and then converts it to the local timezone, which can shift the day.
:::

How could I ignore time zones? Very simple: just add `'T00:00:00'` to the string I received as a parameter. This way, the date would always be created at midnight, avoiding timezone issues.

```javascript
function getDayName(dateString) {
  const date = new Date(`${dateString}T00:00:00`)
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}
```

## Alternative Approaches

### Option 2: Using getUTCDay()

I could also have used the `getUTCDay()` method to get the day of the week in numeric format (0-6) and then used an array to map the numbers to the days of the week, but I found it simpler to use `toLocaleDateString()`.

```javascript
function getDayName(dateString) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const date = new Date(`${dateString}T00:00:00`)
  return days[date.getUTCDay()]
}
```

### Option 3: Mathematical Algorithm (Zeller's Formula)

Another approach could have been to avoid creating a `Date` object altogether, simply using an array with the days of the week and a formula to calculate the day of the week from the given date. But I found it more complicated and less readable.

**Zeller's Formula** allows calculating the day of the week for any date:

$$f = d + \left\lfloor \frac{13(m+1)}{5} \right\rfloor + y + \left\lfloor \frac{y}{4} \right\rfloor - \left\lfloor \frac{y}{100} \right\rfloor + \left\lfloor \frac{y}{400} \right\rfloor$$

Where:

- $d$ = day of the month
- $m$ = adjusted month (March=3, April=4, ..., December=12, January=13, February=14)
- $y$ = year (subtract 1 if January or February)

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

## Approach Comparison

| Method             | Simplicity | Readability | Efficiency |
|--------------------|------------|-------------|------------|
| toLocaleDateString | High       | High        | Medium     |
| getUTCDay         | Medium     | High        | High       |
| Zeller's Formula  | Low        | Medium      | High       |

This table summarizes the advantages and disadvantages of each approach, helping to choose the most appropriate one based on the use case.

## Conclusion

In the end, I stuck with the first option because it is the simplest and most readable. The key to the challenge wasn't so much the algorithm but understanding JavaScript's behavior with dates and time zones.

:::note
**Lesson learned**: Whenever you work with dates in JavaScript, keep time zones in mind. A simple `T00:00:00` can save you a lot of headaches.
:::
