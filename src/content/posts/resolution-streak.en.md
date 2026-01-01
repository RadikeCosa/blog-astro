---
title: "Resolution Streak - FreeCodeCamp #144 Daily Challenge"
published: 2026-01-01T23:12:42.550Z
description: 'We solve "Resolution Streak" from FreeCodeCamp #144 Daily Challenge using JS.'
updated: ''
tags:
  - algorithms
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "resolution-streak"
---

## Resolution Streak — Analysis and solution

### Problem statement

Receive an array of days; each day is an array with three numeric values: `[steps, screenMinutes, pagesRead]`.

A day is considered successful if all three conditions are met:

- Walked at least 10,000 steps.
- Had at most 120 minutes of screen time.
- Read at least 5 pages.

If every day in the input is successful, the function should return:

`Resolution on track: N day streak.`

If there is a day that fails to meet the goals, return the first failure indicating the day (1-based) and the streak up to that point:

`Resolution failed on day X: M day streak.`

### Approach

Iterate the days in order, validate each entry and keep a counter of successful days. Return early on the first failing day. If all days pass, return the "on track" message with the total successful days.

The solution runs in O(n) time and uses O(1) extra space.

### Implementation (JavaScript)

```javascript
/**
 * Determines the streak of successful days according to daily goals.
 * @param {Array<Array<number|string>>} days - Array of days, each as [steps, screenMinutes, pagesRead]
 * @returns {string} Message with the streak status
 */
function resolutionStreak(days) {
  if (!Array.isArray(days))
    throw new TypeError('Expected an array of days')

  let successfulDays = 0

  for (let i = 0; i < days.length; i++) {
    const day = days[i]

    if (!Array.isArray(day) || day.length < 3) {
      throw new TypeError(`Invalid day at index ${i}: expected [steps, screenMinutes, pagesRead]`)
    }

    const [steps, screenTime, pagesRead] = day.map(Number)

    if (!Number.isFinite(steps) || !Number.isFinite(screenTime) || !Number.isFinite(pagesRead)) {
      throw new TypeError(`Invalid numeric values on day ${i + 1}`)
    }

    const isSuccessful = steps >= 10000 && screenTime <= 120 && pagesRead >= 5

    if (isSuccessful) {
      successfulDays++
    }
    else {
      return `Resolution failed on day ${i + 1}: ${successfulDays} day streak.`
    }
  }

  return `Resolution on track: ${successfulDays} day streak.`
}

export default resolutionStreak
```

### Examples

```javascript
import resolutionStreak from './resolutionStreak'

console.log(resolutionStreak([[10000, 120, 5], [12000, 90, 10]]))
// → "Resolution on track: 2 day streak."

console.log(resolutionStreak([[10000, 120, 5], [9000, 80, 6]]))
// → "Resolution failed on day 2: 1 day streak."
```

### Complexity

- Time: $O(n)$, where $n$ is the number of days (each day processed once).
- Space: $O(1)$ additional.

### Edge cases and validation

- Empty input: returns `Resolution on track: 0 day streak.`.
- Invalid structure or non-numeric values: throws `TypeError`.
- Numeric strings (e.g. `"10000"`) are accepted because of `Number()` conversion; if conversion doesn't yield a finite number it's considered invalid.

### Remarks

An early-exit strategy allows detecting the first failing day without processing further days, which is optimal for this task. If the requirement was to find the longest successful streak anywhere in the input, a different algorithm that tracks consecutive subsequences would be necessary.

### Resources

- FreeCodeCamp Daily Coding Challenge
- Patterns: input validation, early exit
