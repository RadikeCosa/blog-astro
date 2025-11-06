---
title: 'Side-Project Nutritional Tracker: Part Two'
published: 2025-11-06T00:00:00.000Z
description: 'Continuation of the development of the side project for nutritional tracking. In this installment, we explore the implementation of persistent storage and validations.'
updated: ''
tags:
  - side-project
  - nutritional-tracker
  - react
  - vite
  - development
  - validations
  - storage

draft: false
pin: 0
toc: true
lang: 'en'
abbrlink: 'nutritional-tracker-side-project-2'
---

## Introduction

In this second part of the project, we will get our hands dirty and start building the foundation. We will prepare the development environment, configure the testing tools, and get everything ready to move forward with confidence.

In the previous article, we defined the project's goal, the main functionalities, and the general structure we will follow. Now, with a React project using Vite and a defined data structure, it's time to take the next step: setting up the testing environment.

## Why is testing important?

Testing not only helps us detect errors but also gives us the confidence that our code works as expected. Additionally, writing tests from the beginning forces us to think about how to structure the code in a cleaner and more modular way.

## Tools we will use

For our testing environment, we chose the following tools:

| Package                  | Purpose                                           |
|--------------------------|---------------------------------------------------|
| `vitest`                | Fast and modern test runner (alternative to Jest). |
| `@vitejs/plugin-react`  | Allows Vitest to understand JSX/TSX.              |
| `@testing-library/react`| Facilitates testing React components.             |
| `@testing-library/jest-dom` | Adds additional matchers like `toBeInTheDocument`. |
| `@testing-library/user-event` | Simulates user interactions.                     |
| `jsdom`                 | Simulates the browser DOM in Node.js.             |

These tools will allow us to write unit and integration tests efficiently.

## Installing dependencies

Open your terminal at the project's root and run:

```bash
npm install -D vitest @vitejs/plugin-react
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D jsdom
```

## Note on installing dependencies

When installing testing dependencies, we use the `-D` (or `--save-dev`) flag. This indicates that these dependencies are only needed for the development environment and not for the production application. It's a good practice to separate development dependencies from production ones to keep the project organized and optimize the final package size.

## Configuring Vitest

With the dependencies ready, we will configure Vitest to integrate it correctly into the project. This step is key to ensuring our tests run smoothly.

### Create the configuration file

Create a file named `vitest.config.ts` at the project's root with this content:

```typescript
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Simulates the browser
    globals: true, // Allows using describe/it/expect without importing them
    setupFiles: './tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '*.config.ts',
        '*.config.js',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Why this configuration?

- `globals: true` → Avoids importing `describe`, `it`, `expect` in every file.
- `setupFiles` → Centralizes common configuration.
- `coverage` → Enables coverage reports.
- `alias` → Simplifies absolute imports like `@/components/X`.

## Configuring the setup file

Now we will create a configuration file to prepare the testing environment. It will extend the matchers, clean the DOM between tests, and mock `localStorage`.

### Create the setup file

Create the `tests/` folder at the project's root and inside it, a `setup.ts` file with this content:

```typescript
import { cleanup } from '@testing-library/react'
import { afterEach, expect } from 'vitest'
import '@testing-library/jest-dom'

// Cleans the DOM after each test
afterEach(() => {
  cleanup()
})

// Mock localStorage
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

// Cleans localStorage before each test
beforeEach(() => {
  localStorage.clear()
})
```

### What does this file do?

- Extends `expect` with matchers like `toBeInTheDocument()` and `toHaveValue()`.
- Cleans the DOM after each test to avoid side effects.
- Mocks `localStorage` to work in Node.js.
- Restores its state before each test.

## Update `package.json` with testing scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch"
  }
}
```

### What does each script do?

- `test` → Runs the tests in interactive mode (reruns on save).
- `test:ui` → Opens Vitest's visual interface in the browser.
- `test:coverage` → Generates the coverage report.
- `test:watch` → Forces watch mode explicitly.

## Verify the testing environment works correctly

To confirm everything is set up correctly, create an example test in `tests/example.test.ts`:

```typescript
// tests/example.test.ts
import { describe, expect, it } from 'vitest'

describe('Testing setup', () => {
  it('should pass this basic test', () => {
    expect(1 + 1).toBe(2)
  })

  it('should have access to jest-dom matchers', () => {
    const element = document.createElement('div')
    element.textContent = 'Hello'
    document.body.appendChild(element)

    expect(element).toBeInTheDocument()
  })

  it('should have mocked localStorage', () => {
    localStorage.setItem('test', 'value')
    expect(localStorage.getItem('test')).toBe('value')
  })
})
```

Then, run the tests:

```bash
npm run test
```

If everything is working, you should see a result like this:

```bash
✓ tests/example.test.ts (3)
  ✓ Testing setup (3)
    ✓ should pass this basic test
    ✓ should have access to jest-dom matchers
    ✓ should have mocked localStorage

Test Files  1 passed (1)
Tests       3 passed (3)
```

✅ With this confirmed, the testing environment is officially ready. The next step will be to install libraries for form handling and validations, and prepare the initial scaffolding.

## Configuration flow diagram

To better visualize the testing environment setup process, here is a flow diagram:

```mermaid
graph TD
    A[Start] --> B[Install dependencies]
    B --> C[Create vitest.config.ts]
    C --> D[Create tests/setup.ts]
    D --> E[Update package.json]
    E --> F[Create example test]
    F --> G[Run tests]
    G --> H[Environment ready]
```

This diagram summarizes the key steps to configure the testing environment clearly and visually.

## Lessons Learned and Problem Solving

During the testing environment setup, several challenges arose that required adjustments and solutions. Here is the process, the errors encountered, and how they were resolved.

### Problem 1: Compatibility with ES Modules

#### Problem Context (ES Modules)

The project uses `"type": "module"` in `package.json`, which disables the use of variables like `__dirname`.

#### Error Encountered (ES Modules)

When trying to configure `vitest.config.ts`, the use of `__dirname` caused errors because it is not available in ES Modules environments.

#### Solution Implemented (ES Modules)

`import.meta.url` was used along with `fileURLToPath` to obtain absolute paths:

```typescript
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
```

### Problem 2: Changes in the `@testing-library/jest-dom` API

#### Problem Context (jest-dom)

The `@testing-library/jest-dom` library updated its API, causing incompatibilities when extending the matchers.

#### Error Encountered (jest-dom)

The direct use of `expect.extend(matchers)` did not work as expected.

#### Solution Implemented (jest-dom)

A more consistent automatic import was used:

```typescript
import '@testing-library/jest-dom'
```

### Problem 3: Type Conflicts with Vitest and TypeScript

#### Problem Context (TypeScript)

Vitest has subtle differences with Jest in global types, which caused conflicts when using `jest-dom` matchers.

#### Error Encountered (TypeScript)

Type errors when compiling the project with TypeScript.

#### Solution Implemented (TypeScript)

A custom type declaration file was created:

```typescript
// tests/vitest.d.ts
declare global {
  namespace Vi {
    interface Assertion extends jest.Matchers<string> {}
    interface AsymmetricMatchers extends jest.Matchers<string> {}
  }
}
export {}
```

### Problem 4: Mocking `localStorage`

#### Problem Context (localStorage)

The `localStorage` mock did not work correctly in some modern environments.

#### Error Encountered (localStorage)

The use of `global.localStorage` caused warnings.

#### Solution Implemented (localStorage)

`globalThis.localStorage` was used for better compatibility:

```typescript
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
```

### Lessons Learned

1. **Verify Library Compatibility**:
   - Review changelogs and breaking changes before implementing.
2. **Incremental Configuration**:
   - Implement and verify each step before moving forward.
3. **Document Problems**:
   - Keep a record of the errors encountered and their solutions.
4. **Testing the Testing**:
   - Verify that the testing environment works correctly before using it.

### Current State

The development environment is fully functional and ready for the next phase: **Data Models and Validations**.
