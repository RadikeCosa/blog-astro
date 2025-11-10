---
title: 'Side-Project: Nutritional Tracker 3'
published: 2025-11-07T00:00:00.000Z
description: 'Third installment in the nutritional tracker side project. This part covers data model definition and initial validations.'
updated: ''
tags:
  - side-project
  - nutritional-tracker
  - react
  - vite
  - development
  - validations
  - data-model
draft: false
pin: 0
toc: true
lang: 'en'
abbrlink: 'nutritional-tracker-side-project-3'
---
## Introduction

## Recap of the previous installment

In the second part of the project, we focused on setting up the development environment and configuring the testing tools. The required dependencies were installed, Vitest was configured, and a mock for `localStorage` was implemented to ensure a reliable and robust testing setup. Key challenges encountered during the process were documented along with their solutions, leaving the project ready to move forward with data model definition and initial validations.

## Goals for this part

The main goal of this stage is to define and validate the core data model for nutritional records. This includes:

- Establishing the necessary TypeScript types and enums to represent each field in the record.
- Implementing the validation schema using Zod, ensuring all required and optional fields meet format and range requirements.
- Writing unit tests to verify that the schema accepts valid records and rejects incorrect or incomplete data.
- Documenting the conventions adopted (English naming, file locations) and the technical decisions made during the process.

By the end of this phase, you should have a robust, validated, and well-tested data model, ready to be integrated with the form and persistence layer in the next steps.

## Data model definition

The core data model of the project is designed to flexibly and accurately log each user's food consumption. From the first installment, the decision was made to unify foods and beverages under a single entity (`Register`), using English field names for consistency and easier future integrations.

The main structure includes the following required fields:

- `id`: Unique identifier (UUID) for each record.
- `userId`: ID of the user logging the record.
- `userName`: User's name.
- `food`: Name of the consumed food (free text).
- `amount`: Amount consumed (positive number).
- `unit`: Unit of measurement (enum: g, ml, unit, portion, small-portion, large-portion).
- `date`: Date of consumption (YYYY-MM-DD format).
- `time`: Time of consumption (HH:MM format).
- `mealType`: Meal type (enum: breakfast, lunch, snack, dinner, collation).
- `createdAt`: ISO timestamp when the record was created.

Optional fields are included for added flexibility:

- `sweetener`: Type of sweetener (`null`, "sugar", "sweetener").
- `notes`: Additional notes (free text).

This structure allows for varied consumption records, analysis of eating patterns, and future adaptation to features like automatic categorization or advanced reporting. The use of enums and strict validation ensures data quality and consistency from the start of the project.

## Conventions and technical decisions

To ensure consistency and facilitate future integrations, the following conventions were adopted:

- **English naming:** All fields and entities are defined in English, even in the Spanish code and tests.
- **Schema location:** Zod validation schemas are stored in `src/lib/schemas/`.
- **Test location:** Unit tests are placed in the `tests/` folder, following the project structure.
- **Type inference:** `z.infer<typeof RegisterSchema>` is used to derive the TypeScript type directly from the Zod schema, avoiding duplication and ensuring synchronization between validation and typing.
- **Strict validation:** Full validation coverage is prioritized before moving to the next development phase.

## Structure and TypeScript types

The data model is represented using TypeScript types and enums to guarantee safety and clarity in the code. The main `Register` type is inferred from the Zod schema, and enums define valid options for fields with fixed values.

```typescript
// filepath: src/types/register.ts
import { z } from 'zod'
import { RegisterSchema } from '../lib/schemas/registerSchema'

export type Register = z.infer<typeof RegisterSchema>

export enum Unit {
  GR = 'gr',
  ML = 'ml',
  UNIT = 'unit',
  PORTION = 'portion',
  SMALL_PORTION = 'small-portion',
  LARGE_PORTION = 'large-portion',
}

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  SNACK = 'snack',
  DINNER = 'dinner',
  COLLATION = 'collation',
}

export type Sweetener = null | 'sugar' | 'sweetener'
```

## Validation schema implementation with Zod

The validation schema is implemented with Zod, defining rules for each field:

- **UUIDs:** Format validation for `id` and `userId`.
- **Dates and times:** Regular expressions to ensure ISO format.
- **Amount:** Must be a positive number.
- **Enums:** Strict validation for `unit`, `mealType`, and `sweetener`.
- **Optional fields:** `notes` and `sweetener` can be absent or null.

```typescript
// filepath: src/lib/schemas/registerSchema.ts
import { z } from 'zod'

export const RegisterSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  userName: z.string().min(1),
  food: z.string().min(1),
  amount: z.number().positive(),
  unit: z.enum(['gr', 'ml', 'unit', 'portion', 'small-portion', 'large-portion']),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  mealType: z.enum(['breakfast', 'lunch', 'snack', 'dinner', 'collation']),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/),
  sweetener: z.enum(['sugar', 'sweetener']).nullable().optional(),
  notes: z.string().optional(),
})
```

## Examples of valid and invalid records

Here are practical examples to illustrate how validation works:

**Valid record:**

```typescript
const validRegister = {
  id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
  userId: 'b2c3d4e5-f6a7-8901-bcde-2345678901bc',
  userName: 'John',
  food: 'Apple',
  amount: 1,
  unit: 'unit',
  date: '2025-11-07',
  time: '08:30',
  mealType: 'breakfast',
  createdAt: '2025-11-07T08:31:00Z',
  sweetener: null,
  notes: 'No sweetener',
}
```

**Invalid record (negative amount and wrong date format):**

```typescript
const invalidRegister = {
  id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
  userId: 'b2c3d4e5-f6a7-8901-bcde-2345678901bc',
  userName: 'John',
  food: 'Apple',
  amount: -2, // Invalid
  unit: 'unit',
  date: '07-11-2025', // Invalid
  time: '08:30',
  mealType: 'breakfast',
  createdAt: '2025-11-07T08:31:00Z',
  sweetener: null,
  notes: 'No sweetener',
}
```

## Unit testing the data model

Unit tests were implemented with Vitest to ensure the robustness of the schema:

- The schema accepts valid records and rejects invalid ones.
- Cases of missing required fields, out-of-range values, and incorrect formats are tested.
- It is verified that optional fields are correctly accepted or ignored.

```typescript
// filepath: tests/registerSchema.test.ts
import { describe, expect, it } from 'vitest'
import { RegisterSchema } from '../src/lib/schemas/registerSchema'

describe('RegisterSchema', () => {
  it('accepts a valid record', () => {
    expect(() => RegisterSchema.parse(validRegister)).not.toThrow()
  })

  it('rejects negative amount', () => {
    expect(() => RegisterSchema.parse(invalidRegister)).toThrow()
  })

  it('rejects wrong date format', () => {
    const badDate = { ...validRegister, date: '07-11-2025' }
    expect(() => RegisterSchema.parse(badDate)).toThrow()
  })

  it('accepts missing optional fields', () => {
    const noOptional = { ...validRegister }
    delete noOptional.sweetener
    delete noOptional.notes
    expect(() => RegisterSchema.parse(noOptional)).not.toThrow()
  })
})
```

## Reflection on the process and next steps

Thorough definition and validation of the data model is key to the project's quality and maintainability. This approach allows early error detection, facilitates integration with the form and persistence layer, and lays the foundation for future extensions such as advanced reporting and categorization.

**Next steps:**

- Extend tests to cover edge cases and specific errors.
- Implement the persistence layer in `localStorage`.
- Integrate the model with the registration form and validate the user experience.
