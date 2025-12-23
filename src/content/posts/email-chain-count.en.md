---
title: "Email Chain Count - FreeCodeCamp #135 Daily Challenge"
published: 2025-12-23T21:58:37.053Z
description: 'We solve "Email Chain Count", a FreeCodeCamp challenge about counting prefixes in email subjects. Includes analysis, code, visuals, and reflections.'
updated: ''
tags:
   - freecodecamp
   - daily-challenge
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "email-chain-count"
---

## 📨 Problem Statement

Given a string representing the subject of an email, determine how many times it was forwarded or replied to.
We count as forwarded or replied if the string contains any of these prefixes (case-insensitive):

- `FWD:`
- `FW:`
- `RE:`

---

## 🔎 Initial Analysis

The challenge is to identify and count how many times the typical reply or forward prefixes appear in an email subject.

### Test Cases

| Subject                                 | Output | Explanation                                      |
|------------------------------------------|--------|--------------------------------------------------|
| RE: Meeting Tomorrow                    | 1      | Replied once                                     |
| FWD: RE: Fw: Project Update             | 3      | Two forwards, one reply                          |
| Project Update                          | 0      | No prefixes                                      |
| fWd: rE: fW: Important Notice           | 3      | Case-insensitive                                 |

---

## 🛠️ Solution Development

### Approach

We'll use a regular expression to search for the prefixes, leveraging case-insensitivity and global search.

### Commented Code

```javascript
function emailChainCount(subject) {
  // Search for FWD:, FW: or RE: prefixes, case-insensitive
  const regex = /(FWD:|FW:|RE:)/gi
  // Find all matches
  const matches = subject.match(regex)
  // Return the number of matches, or 0 if none
  return matches ? matches.length : 0
}
```

---

## 📊 Complexity Analysis

- **Time:** $O(n)$, where $n$ is the length of the string.
- **Space:** $O(k)$, where $k$ is the number of matches (typically small).

---

## ⚠️ Edge Cases and Considerations

- Prefixes with spaces between letters and colon (e.g., `FW :`) **do not** count.
- Nested or repeated prefixes (`RE: RE: RE:`) are all counted.
- Prefixes in any position of the subject are valid.
- Incomplete prefixes or with other characters (`FW`, `RE-`) **do not** count.
- Counting is case-insensitive.

---

## 💡 Reflections and Learnings

- Regular expressions for pattern matching.
- Case-insensitivity with the `i` flag.
- Native JavaScript string methods.

---

## 📚 Resources

- [MDN Web Docs: String.prototype.match()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
- [MDN Web Docs: Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
