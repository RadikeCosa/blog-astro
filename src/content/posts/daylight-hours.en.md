---
title: "Daylight Hours at the Solstice - FreeCodeCamp #133 Daily Challenge"
published: 2025-12-21T15:09:31.161Z
description: 'We solve the challenge of estimating daylight hours by latitude on the December solstice, using a reference table and nearest-value search.'
updated: ''
tags:
  - daily-challenge
  - freecodecamp
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "daylight-hours"
---

## Daylight Hours at the Solstice: Analysis and Explanation

## Problem Statement

December 21 marks the solstice: the longest day of the year in the southern hemisphere and the shortest in the north. Given a latitude between -90 and +90 degrees, we want to estimate how many hours of daylight there are on that day, using the following reference table:

| Latitude (degrees) | Daylight hours |
| ------------------ | -------------- |
| -90                | 24             |
| -75                | 23             |
| -60                | 21             |
| -45                | 15             |
| -30                | 13             |
| -15                | 12             |
| 0                  | 12             |
| 15                 | 11             |
| 30                 | 10             |
| 45                 | 9              |
| 60                 | 6              |
| 75                 | 2              |
| 90                 | 0              |

If the latitude does not match a value in the table exactly, use the closest value (by absolute distance).

## Initial Analysis

### What does the challenge ask?

For any valid latitude, we must return the daylight hours for the solstice according to the table. There are no formulas or astronomical calculations: just find the closest value in the table and return its hours.

### Key Test Cases

- Exact latitude: daylightHours(-90) → 24, daylightHours(0) → 12, daylightHours(45) → 9
- Between two values: daylightHours(-10) → 12 (closer to -15 and 0, both 12), daylightHours(23) → 10 (closer to 30), daylightHours(70) → 2 (closer to 75)
- Extremes: daylightHours(90) → 0, daylightHours(-90) → 24
- Equidistant: if exactly in the middle, either closest value is valid (the implementation returns the first it finds)

## Solution Development

### Strategy

1. Store the table as an array of objects or tuples.
2. For the given latitude, calculate the absolute distance to each latitude in the table.
3. Find the index with the smallest distance.
4. Return the associated daylight hours.

### Commented Code

```javascript
// Returns the estimated daylight hours for a given latitude at the December solstice
function daylightHours(latitude) {
  // Reference table: latitude → daylight hours
  const daylightTable = [
    { lat: -90, hours: 24 }, // South Pole: full day
    { lat: -75, hours: 23 },
    { lat: -60, hours: 21 },
    { lat: -45, hours: 15 },
    { lat: -30, hours: 13 },
    { lat: -15, hours: 12 },
    { lat: 0, hours: 12 }, // Equator
    { lat: 15, hours: 11 },
    { lat: 30, hours: 10 },
    { lat: 45, hours: 9 },
    { lat: 60, hours: 6 },
    { lat: 75, hours: 2 },
    { lat: 90, hours: 0 }, // North Pole: polar night
  ]
  // Find the closest value
  let closest = daylightTable[0]
  let minDiff = Math.abs(latitude - closest.lat)
  for (let i = 1; i < daylightTable.length; i++) {
    const diff = Math.abs(latitude - daylightTable[i].lat)
    if (diff < minDiff) {
      minDiff = diff
      closest = daylightTable[i]
    }
  }
  return closest.hours
}
```

## Complexity Analysis

### Time Complexity

We traverse the table once: $O(n)$, where $n$ is the number of rows (13). Since $n$ is fixed and small, it is instantaneous in practice.

### Space Complexity

Space is $O(1)$: the table is fixed and does not depend on the input.

## Edge Cases and Considerations

- If the latitude matches exactly, that value is returned.
- If equidistant between two, the first found is returned.
- Latitudes outside [-90, 90] are not validated (the problem statement excludes them).

## Reflections and Learnings

- Finding the closest value in a list is a useful pattern for direct mapping problems.
- Using reference tables simplifies problems that would otherwise require complex formulas.

## Resources and References

- [December solstice - Wikipedia](https://en.wikipedia.org/wiki/Solstice)
- [freeCodeCamp - Daily Coding Challenge](https://www.freecodecamp.org/learn/daily-coding-challenge/2025-12-21/)
