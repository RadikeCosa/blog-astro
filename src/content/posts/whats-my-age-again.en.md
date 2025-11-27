---
title: "What's My Age Again? - FreeCodeCamp Daily Challenge"
published: 2025-11-27T10:31:20.681Z
description: "Solving 'What's My Age Again?' from FreeCodeCamp Daily Challenge using JavaScript."
updated: ""
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "whats-my-age-again"
---

## What's My Age Again? – Solving the Daily Challenge with a Blink-182 Twist

### “What’s My Age Again?”

> “And that’s about the time that she walked away from me…
> Nobody likes you when you’re 23!”

Yes, today’s challenge is named after the most iconic **Blink-182** song from *Enema of the State* (1999). It’s an exercise to calculate your age, inspired by a song about not wanting to grow up.

## The Problem Statement

Given a string with a birth date in the format `YYYY-MM-DD`, return the exact age **as of today (November 27, 2025)**.
And yes, you have to consider whether you’ve already had your birthday in 2025.

## My First Impulse (the classic mistake)

```js
2025 - birthYear
```

Done. Time to play some bass.

…But no, because someone born on November 28th is still a year younger. I thought I knew my age… until we have to program how to figure it out.

## The Solution

```js
function getAge(birthday) {
  const [y, m, d] = birthday.split('-').map(Number)
  const today = new Date()
  const age = today.getFullYear() - y

  const hasHadBirthdayThisYear
    = (today.getMonth() + 1) > m
      || ((today.getMonth() + 1) === m && today.getDate() >= d)

  return hasHadBirthdayThisYear ? age : age - 1
}
```

## Key Concepts

- **Array destructuring**: We extract year, month, and day directly from the string.
- **Date object**: We use `new Date()` to get the current date.
- **No Date object for the birth date**: We only need the individual components.
- **Age calculation**: We subtract years and adjust depending on whether the birthday has already occurred this year.

> “No one should take themselves so seriously…”
> — Blink-182, *What’s My Age Again?*

### Additional Resources

- [MDN Date Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Enema of the State - Blink-182](https://en.wikipedia.org/wiki/Enema_of_the_State)
- [What's My Age Again? - Lyrics & Video](https://www.youtube.com/watch?v=9Ht5RZpzPqw)
