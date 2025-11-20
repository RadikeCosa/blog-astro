---
title: "Building a Nutritional Tracker: Part 6 — Visual Architecture & Accessibility"
published: 2025-11-17T20:58:05.580Z
description: "How to design a mobile-first, accessible, and scalable UI using TailwindCSS v4, reusable components, and visual testing with Storybook."
updated: 2025-11-17T22:38:20Z
tags:
  - nutritional-tracker
  - tailwindcss
series: "nutritional-tracker"
seriesOrder: 6
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "nutritional-tracker-part6"
---

## Building a Nutritional Tracker: Part 6 — Visual Architecture & Accessibility

## Introduction

After completing a form with validation and persistence, the inevitable question arose: how does this look in the user's hands?

The honest answer: not great. Raw HTML produces frustrating interfaces—small touch targets, low contrast, and unclear navigation. In this chapter, I document how I took the UI from "barebones" to a consistent, mobile-first, accessible, and maintainable visual layer.

Here you'll find key decisions, implementation snippets, and tests that gave me confidence to deliver a usable experience on mobile and desktop.

(Place here screenshot of the form BEFORE styling — raw, misaligned HTML)

(Place here screenshot of the form AFTER styling — mobile, clean, and modern)

---

## My Design Guidelines

Before touching a Tailwind class, I defined guiding principles that informed every decision. These are summarized from my `style-guidelines.md` file:

### Core Principles

- Mobile-first by default (high % of mobile usage).
- Touch targets ≥ 48 px (better usability and accessibility).
- Minimum WCAG AA contrast.
- Labels always visible—never use placeholder as the only label.
- Immediate feedback: inline validation and clear messages.

### Input-Specific Decisions

- Short forms: ideally 3–5 fields per screen.
- Avoid selects for very short lists → prefer radios.
- Use native types: `type="number"`, `type="date"`, etc.
- On mobile: single-column layout for easier scrolling and focus.

---

## Why TailwindCSS v4

The choice was pragmatic: rapid prototyping and consistency without the overhead of custom CSS.

Quick comparison:

- CSS Modules: total control, but lots of boilerplate.
- Styled Components: React integration, but adds weight.
- Vanilla CSS: zero dependencies, but slow to iterate.
- Tailwind v4: ultra-fast iteration, small bundle, mobile-first mindset.

### Essential Configuration (tailwind.config.cjs)

```javascript
// tailwind.config.cjs (excerpt)
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0ea5e9', light: '#38bdf8', dark: '#0369a1' },
        secondary: { DEFAULT: '#f59e42', light: '#fbbf24', dark: '#b45309' },
        error: { DEFAULT: '#ef4444', bg: '#fee2e2' },
        success: { DEFAULT: '#22c55e', bg: '#dcfce7' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
      },
    },
  },
}
```

---

## Reusable UI Components

The most repeated problem: duplicating the same label + input + error pattern seven times. The solution was to create single-responsibility components.

Before: duplication and risk of inconsistencies

```tsx
<label className="block text-sm font-medium text-gray-700">
  Food <span className="text-red-600">*</span>
</label>
<input className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md" />
<span className="text-sm text-red-600">Required field</span>
```

After: components with a clear API

- Label.tsx — shows the label, accessible asterisk, and sr-only for screen readers:

```tsx
<label className="block text-sm text-gray-700 font-medium">
  {children}
  {required && (
    <>
      <span aria-hidden="true" className="text-red-600"> *</span>
      <span className="sr-only"> required</span>
    </>
  )}
</label>
```

- Input.tsx — with forwardRef, state handling (default, error, focus), and shared classes.

- RadioGroup — replaced selects in many cases; better for mobile due to large touch targets:

```tsx
<RadioGroup
  name="mealType"
  options={mealTypeOptions.map(type => ({
    value: type,
    label: MEAL_TYPE_LABELS[type],
  }))}
  layout="grid"
/>
```

---

## Accessibility: Applied Theory and Automated Testing

It's not enough to think "it's accessible"; you have to measure it. I integrated axe-core into unit tests to validate accessibility in dynamic states.

Example test (Jest + Testing Library + axe):

```ts
it('form with visible errors remains accessible', async () => {
  // ... simulate empty submit and show errors
  const results = await runAxe(container)
  expect(results.violations).toHaveLength(0)
})
```

Actual CI result: 0 violations even with visible errors.

I also tested keyboard navigation and visible focus in DevTools.

---

## Storybook: Visual QA and Living Documentation

Storybook let me explore concrete states and automate interactions:

- addons: a11y and interactions.
- useful stories I keep maintained:
  - Button: Primary / Secondary / Loading / Disabled
  - Input: Default / Error / Typing (with play function)
  - RadioGroup: Vertical / Grid / Error
  - RegistrationForm: MinimalSubmit (happy path automated)

---

## Current Project Status

What works today:

- ✅ 100% mobile-first form with proper touch targets
- ✅ Contrast automatically validated (axe-core = 0 violations)
- ✅ Components documented and tested in Storybook

Next steps:

- Data visualization (charts and reports)
- Search and filtering in history

---

## Final Thoughts

Next part → Part 7: Data visualization and reports.

---

## Series Navigation

- [← Part 5: The Registration Form](/posts/nutritional-tracker-part5/)
- [Part 7: Migration to Next.js, Storybook, and Accessibility →](/posts/nutritional-tracker-part7/)

### Additional Resources

- [Official TailwindCSS v4 Documentation](https://tailwindcss.com/docs/installation)
- [WCAG Accessibility Guide](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Storybook for UI Components](https://storybook.js.org/docs/react/get-started/introduction)
- [Axe-core for Accessibility Testing](https://github.com/dequelabs/axe-core)
