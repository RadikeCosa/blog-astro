---
title: "Building a Nutritional Tracker: Part 2 - Testing Environment Setup"
published: 2025-11-06T00:00:00.000Z
description: "Practical guide to configuring Vitest, Testing Library, and automating testing in React + Vite. Includes diagrams, best practices, explanations for beginners, and troubleshooting."
series: "nutritional-tracker"
seriesOrder: 2
tags:
  - nutritional-tracker
  - testing
  - vitest
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "nutritional-tracker-part2"
---

## Part 2: Testing Environment Setup — Nutrition Tracker

## Introduction

In Part 1 we defined the data model and core architecture. Now it’s time to set up the testing environment so we can develop with confidence and agility.

## Why Testing from the Start?

Automated tests provide:

1. **Confidence:** Every code change can be instantly verified.
2. **Living documentation:** Tests show how the system should behave.
3. **Safe refactoring:** You can improve code without fear of breaking anything.

---

## 1. Chosen Tools (Quick Explanations)

| Package                       | Purpose                        | What does it do?                                                   |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------ |
| `vitest`                      | Fast, modern test runner       | Automatically runs and organizes your tests; very fast and simple. |
| `@testing-library/react`      | User-centric component testing | Simulates user interactions with your components.                  |
| `@testing-library/jest-dom`   | Extra readable matchers        | Adds clearer comparisons/validations (e.g., "is in the DOM").      |
| `@testing-library/user-event` | Real interaction simulation    | Lets you "type" in inputs or "click" buttons in code.              |
| `jsdom`                       | DOM simulation in Node         | Emulates the browser so you can run tests outside a real browser.  |

**Why are these useful?**

- They automate frontend tests and ensure your components behave as expected—without needing a real browser.

---

## 2. Installation & Setup

Install the dependencies:

```bash
npm install -D vitest @vitejs/plugin-react
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D jsdom
```

---

## 3. Vitest Configuration (Beginner Guide)

Create the file `vitest.config.ts` at the root of your project:

```typescript
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()], // Allows reading JSX and TSX files
  test: {
    environment: 'jsdom', // Simulates the browser DOM during tests
    globals: true, // Lets you use "describe", "it", "expect" without importing them
    setupFiles: './tests/setup.ts', // Runs setup code before all tests (mocks, cleanup, etc.)
    coverage: {
      provider: 'v8', // Tracks what lines of code are tested (coverage percentage)
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/', '*.config.ts', '*.config.js'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Enables absolute imports with "@"
    },
  },
})
```

**Why each line?**

- _plugins_: To make Vitest understand modern React code.
- _environment_: Emulates browser features.
- _globals_ and _setupFiles_: Makes tests easier to write and organize.
- _coverage_: Visualizes which parts of code are well-tested.
- _alias_: Saves time on imports and avoids long/complex paths.

---

## 4. Test Setup File (What are localStorage mocks?)

Create `tests/setup.ts` to prepare the environment and necessary mocks:

```typescript
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'
import '@testing-library/jest-dom'

// Cleans the DOM after every test
afterEach(() => {
  cleanup()
})

// Mock localStorage for Node
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

globalThis.localStorage = localStorageMock as Storage

beforeEach(() => {
  localStorage.clear()
})
```

### What is a "mock" and what is it for?

A **mock** is a function or variable that "pretends" to work like the real thing. In tests, since Node doesn’t have `localStorage` like a browser, we create a mock that imitates this functionality in memory.

**Why use mocks?**

- Tests can work as if there was a browser, storing and reading data in localStorage, but without affecting the real browser or disk.
- Lets you verify your storage logic works and gets cleared between tests (preventing residual data).

**Why clean up the DOM and storage before/after each test?**

- Guarantees each test starts fresh, without interference from previous runs.
- Prevents false positives and makes your tests robust.

---

## 5. Automation Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest", // Runs tests interactively (re-run on save)
    "test:ui": "vitest --ui", // Opens a visual interface to analyze tests and coverage
    "test:coverage": "vitest run --coverage", // Shows code coverage report
    "test:watch": "vitest --watch" // Automatically runs tests when files change
  }
}
```

---

## 6. Verification Test

Create the file `tests/example.test.ts` to check your setup:

```typescript
import { describe, expect, it } from 'vitest'

describe('Basic Testing', () => {
  it('simple arithmetic', () => {
    expect(1 + 1).toBe(2)
  })
  it('jest-dom matcher is active', () => {
    const el = document.createElement('span')
    document.body.appendChild(el)
    expect(el).toBeInTheDocument()
  })
  it('localStorage is mocked', () => {
    localStorage.setItem('test', 'value')
    expect(localStorage.getItem('test')).toBe('value')
    localStorage.clear()
    expect(localStorage.getItem('test')).toBeNull()
  })
})
```

Run the test:

```bash
npm run test
```

---

### Expected Output

```bash
✓ tests/example.test.ts (3)
  ✓ Basic Testing (3)
    ✓ simple arithmetic
    ✓ jest-dom matcher is active
    ✓ localStorage is mocked
PASS  Waiting for file changes...
```

---

## 7. Diagram: Setup and Execution Flow

```mermaid
graph TD
    A[Install dependencies] --> B[Configure vitest.config.ts]
    B --> C[Define tests/setup.ts]
    C --> D[Add scripts in package.json]
    D --> E[Create verification test]
    E --> F[Run tests]
    F --> G{All tests passing?}
    G -->|Yes| H[Environment ready ✓]
    G -->|No| I[Troubleshoot]
    I --> F
    style H fill:#A3F7BF
    style I fill:#F7BFD7
```

---

## 8. Common Troubleshooting

- **`__dirname` undefined:** Use `import.meta.url` and `fileURLToPath` as shown above.
- **jest-dom matchers unavailable:** Check the import in `setup.ts`.
- **localStorage not defined:** Make sure the mock is set on `globalThis`.
- **Tests not detected:** Check the file name and location (`tests/`, `.test.ts` extension).

---

## 9. What's Next?

You now have a solid foundation for TDD. Next step: define validation schemas with Zod and write unit tests for the data model.

**Continue reading:**

- [Part 3: Data Validation with Zod →](./side-project-nutritional-tracker-3.en.md)- [← Part 1: Data Model Design](./side-project%20nutritional%20tracker.en.md)## Series Navigation------

## Series Navigation

- [← Part 1: Data Model Design](./side-project%20nutritional%20tracker.en.md)
- [Part 3: Data Validation with Zod →](./side-project-nutritional-tracker-3.en.md)
