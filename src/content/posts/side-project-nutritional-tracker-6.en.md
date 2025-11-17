---
title: "Building a Nutritional Tracker: Part 6 — Visual Architecture & Accessibility"
published: 2025-11-17T20:58:05.580Z
description: "How to design a mobile-first, accessible, and scalable UI using TailwindCSS v4, reusable components and visual testing with Storybook."
updated: 2025-11-17T22:38:20Z
tags:
  - nutritional-tracker
  - react-project
  - tailwindcss
  - accessibility
  - ui-components
series: "nutritional-tracker"
seriesOrder: 6
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "side-project-nutritional-tracker-6"
---

## Building a Nutritional Tracker: Part 6 — Visual Architecture & Accessibility

## Introduction

After completing a robust form with validation and persistence, the inevitable question emerged: how does this look and feel for users?

Short answer: not great. Raw HTML without styles yields frustrating UX: small touch targets, low contrast, and confusing navigation. In this chapter I document how I transformed the UI into a consistent, mobile-first, accessible and maintainable layer.

Below are the key decisions, implementation snippets and tests that gave me confidence to ship a usable experience on mobile and desktop.

(Place capture here: form BEFORE styling — raw HTML)

(Place capture here: form AFTER styling — mobile, clean and modern)

---

## My design guidelines (the style bible)

Before touching Tailwind, I defined guiding principles stored in `style-guidelines.md`:

### Core principles

- Mobile-first by default (majority of traffic)
- Touch targets ≥ 48 px
- WCAG AA minimum contrast
- Labels always visible — never use placeholder as the only label
- Immediate feedback: inline validation and clear messages

### Input-specific decisions

- Keep forms short: ideal 3–5 fields per screen
- Avoid selects for short lists → prefer radio buttons
- Use native input types: `type="number"`, `type="date"`, etc.
- Single-column layout on mobile for easier scrolling and focus

(Place a snippet or screenshot of `style-guidelines.md` here)

---

## Why TailwindCSS v4

This was a pragmatic choice: fast prototyping with consistent utilities.

Quick tradeoffs:

- CSS Modules: full control, lots of boilerplate
- Styled Components: clean API, adds runtime weight
- Plain CSS: no deps, slow iteration
- Tailwind v4: super-fast iteration, small bundle, mobile-first mindset

### Theme configuration (tailwind.config.cjs)

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

(Place here a screenshot of `tailwind.config.cjs` open in the editor)

---

## Reusable UI components

The biggest pain point was repeating the same label + input + error pattern. The solution: single-purpose components.

Before: duplicated markup and inconsistencies

```tsx
<label className="block text-sm font-medium text-gray-700">
  Food <span className="text-red-600">*</span>
</label>
<input className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md" />
<span className="text-sm text-red-600">Required</span>
```

After: components with clear APIs

- Label.tsx — shows label, accessible asterisk and sr-only for screen readers:

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

(Place here Storybook capture → Label → Required)

- Input.tsx — forwardRef, error handling, focus and shared classes:
(Place here Storybook capture → Input → Default / Error / Focus)

- RadioGroup — replaced many selects; better UX on mobile with larger targets:

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

(Place two side-by-side captures: native mobile select vs custom RadioGroup grid)

(Place here Storybook capture → RadioGroup → Grid layout + error)

---

## Accessibility: from theory to automated tests

Thinking accessible is not enough — measure it. I integrated axe-core into unit tests to prevent regressions.

Sample test (Jest + Testing Library + axe):

```ts
it('form with visible errors remains accessible', async () => {
  // ... simulate empty submit and show errors
  const results = await runAxe(container)
  expect(results.violations).toHaveLength(0)
})
```

CI result: 0 violations even with visible errors.

(Place here a screenshot of axe-core report or green test in CI)

I also verified keyboard navigation and visible focus via DevTools:

(Place here Chrome DevTools → Accessibility → focus order screenshot)

---

## Storybook: visual QA and living documentation

Storybook enabled exploring states and automating interactions:

- addons: a11y and interactions
- stories I keep maintained:
  - Button: Primary / Secondary / Loading / Disabled
  - Input: Default / Error / Typing (with play function)
  - RadioGroup: Vertical / Grid / Error
  - RegistrationForm: MinimalSubmit (happy path automated)

(Place here collage/screenshots of Storybook Canvas with states, Interactions panel, RegistrationForm → MinimalSubmit)

(Place here screenshot of Storybook sidebar with the component list)

---

## Current project status

What works today:

- ✅ 100% mobile-first form with proper touch targets
- ✅ Contrast automatically validated (axe-core = 0 violations)
- ✅ Components documented and tested in Storybook
- ✅ Design system centralized in Tailwind config
- ✅ MealType options derived from Zod schema (no hardcoding)

Next steps:

- Data visualization (charts and reports)
- Search and filtering in history
- CSV/PDF export
- PWA + offline caching

(Place here final responsive screenshot: mobile + desktop form)

---

## Final thoughts

This chapter was not about "making it pretty" — it was about building a maintainable visual architecture. Tailwind shortened iteration loops, Storybook reduced manual QA time, and accessibility tests forced me to consider dynamic states. Side projects are great laboratories: experiment, fail, learn and iterate.

Next part → Part 7: Data visualization and reports (simple charts, aggregations and trends).
