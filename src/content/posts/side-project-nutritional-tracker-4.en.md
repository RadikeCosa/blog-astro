---
title: "Building a Nutritional Tracker: Part 4 - Persistence Layer Implementation"
published: 2025-11-10T17:18:33.385Z
description: "How to save and retrieve validated records in localStorage, handling errors and tolerating corrupt data. Includes commented code, diagrams, and practical tests."
series: "nutritional-tracker"
seriesOrder: 4
tags:
  - nutritional-tracker
  - persistence
  - localStorage
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "nutritional-tracker-part4"
---

## Part 4: Persistence Layer Implementation — Nutrition Tracker

## Introduction

The data model already validates inputs: now it's time to save and retrieve them, leveraging the browser's native **localStorage** capabilities. The goal is for users not to lose their records (even if they close the app) and for any corrupt data not to break the application.

---

## Strategy and Principles

- **Tolerant reading:** Try to recover as many valid records as possible.
- **Strict validation on save:** Do not allow incorrect data in storage.
- **Explicit error handling:** Problems are reported to the user and/or logged to the console.
- **Performance and simplicity:** Instant operations with no external dependencies.

---

## Types and Standard Result

This snippet defines the types and the result returned by persistence functions:

```typescript
// src/lib/storage/localStorage.ts

import { Register } from './register'

// NewRegisterInput is the input type for new records (does not include id or createdAt)
export type NewRegisterInput = Omit<Register, 'id' | 'createdAt'>

// Result is a generic type indicating success or error (clear response structure)
export type Result<T>
  = | { success: true, data: T, message?: string }
    | { success: false, error: { code: string, message: string } }

// ErrorCodes is an object with possible error codes used by the API
export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  STORAGE_ERROR: 'STORAGE_ERROR',
  SECURITY_ERROR: 'SECURITY_ERROR',
  NOT_FOUND: 'NOT_FOUND',
} as const
```

These types help structure the response: any storage call forces you to handle success or errors, problems are never silenced.

---

## Persistence API Functions

| Function                    | Description                                   |
| --------------------------- | --------------------------------------------- |
| `getAllRegisters()`         | Gets all records                              |
| `saveRegister(input)`       | Saves a record after validating               |
| `getRegistersByUserId(id)`  | Filters records by user                       |
| `deleteRegister(id)`        | Deletes a record by id                        |
| `clearAllRegisters()`       | Deletes all records                           |
| `getRegisteredFoods()`      | Lists unique names of registered foods        |

---

## Basic Flow Diagram

This diagram shows how the process of saving and reading records flows, and how validation and error handling are part of the system:

```mermaid
graph TD
    A[Save record] --> B{Validate data}
    B -- valid --> C[Generate id and date]
    C --> D[Add to list]
    D --> E[Save in localStorage]
    B -- invalid --> F[Show error to user]

    G[Read records] --> H[Retrieve JSON from localStorage]
    H --> I{Parse with schemas}
    I -- valid --> J[Add to results]
    I -- invalid --> K[Log warning, skip]
```

---

## Example: Tolerant Reading and Strict Validation

This function converts information stored in localStorage to valid records, ignoring corrupt entries:

```typescript
function parseRegisters(raw: string | null): Register[] {
  if (!raw)
    return [] // If no data is stored, return empty array
  let arr: unknown
  try {
    arr = JSON.parse(raw) // Try to convert stored text to JS array
  }
  catch (e) {
    console.warn('[parseRegisters] Invalid JSON')
    return []
  }
  if (!Array.isArray(arr))
    return []
  return arr
    .map((item, idx) => {
      const result = RegisterSchema.safeParse(item) // Validate each element with Zod
      if (!result.success) {
        // If validation fails, log warning and discard element
        console.warn(
          `[parseRegisters] Error in record (${idx})`,
          result.error.issues,
        )
        return null
      }
      return result.data // Return only valid data
    })
    .filter(Boolean) // Remove nulls (corrupt elements)
}
```

**Why this way?**
If one element is corrupt, the others are saved. Prevents the entire read from breaking due to a single error.

---

## Saving Records with Validation

This function creates a complete record, validates it, and saves it to localStorage only if correct:

```typescript
function saveRegister(input: NewRegisterInput): Result<Register> {
  const newRegister = {
    ...input,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }
  // Strict validation
  const validation = RegisterSchema.safeParse(newRegister)
  if (!validation.success) {
    return {
      success: false,
      error: {
        code: ErrorCodes.VALIDATION_ERROR,
        message: validation.error.issues.map(i => i.message).join('; '),
      },
    }
  }
  try {
    const all = getAllRegisters() // Get current records
    all.push(validation.data) // Add new valid record
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all)) // Save everything to storage
    return { success: true, data: validation.data }
  }
  catch (e) {
    return {
      success: false,
      error: {
        code: ErrorCodes.STORAGE_ERROR,
        message: 'Could not save the record.',
      },
    }
  }
}
```

---

## Example Usage in a Component

This snippet shows how you might interact with the persistence layer from the form, including error and success handling:

```typescript
function handleSubmit(input: NewRegisterInput) {
  const result = saveRegister(input)
  if (result.success) {
    // Update UI, show success message
  }
  else {
    // Show error message to user
    alert(result.error.message)
  }
}
```

---

## Key Unit Tests

Here's how you can test that your system actually validates, saves, and retrieves data correctly:

```typescript
import { beforeEach, describe, expect, it } from 'vitest'
import {
  clearAllRegisters,
  getAllRegisters,
  saveRegister,
} from './localStorage'

describe('Persistence with localStorage', () => {
  beforeEach(() => clearAllRegisters())

  it('saves and retrieves a valid record', () => {
    const input = {
      userId: 'abc',
      userName: 'Juan',
      food: 'Orange',
      amount: 1,
      unit: 'unit',
      date: '2025-11-12',
      time: '08:00',
      mealType: 'breakfast',
    }
    const result = saveRegister(input)
    expect(result.success).toBe(true)
    expect(getAllRegisters().length).toBe(1)
    expect(getAllRegisters()[0].food).toBe('Orange')
  })

  it('fails on invalid data validation', () => {
    const invalid = { ...input, amount: -5 }
    const result = saveRegister(invalid)
    expect(result.success).toBe(false)
    expect(result.error.code).toBe('VALIDATION_ERROR')
  })
})
```

---

## Resilience and Best Practices

- Validate all user data before saving.
- Do not interrupt the flow due to isolated errors: show warnings and keep working.
- Always return a clear success/error structure to make UI integration easier.

---

## What's Next?

You now have a robust and safe persistence layer. The next step will be to build the registration form and connect everything with the UI and end-to-end tests.

**Continue reading:**
_Part 5: Registration Form Implementation_ → How to build the main visual component and tie together all previous concepts.

---

## Series Navigation

- [← Part 3: Data Validation with Zod](/posts/nutritional-tracker-part3/)
- [Part 5: The Registration Form →](/posts/nutritional-tracker-part5/)

### Additional Resources

- [localStorage Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Zod: TypeScript Schema Validation](https://zod.dev/)
