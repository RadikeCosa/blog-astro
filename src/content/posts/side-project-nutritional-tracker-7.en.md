---
title: "Building a Nutritional Tracker: Part 7 – Migration to Next.js, Storybook, and Accessibility"
published: 2025-11-19T12:10:23.397Z
description: "In this post I share the process of migrating the app to Next.js, the challenges faced, and the solutions implemented."
tags:
  - nutritional-tracker
  - migration
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "nutritional-tracker-part7"
---

## Building a Nutritional Tracker: Part 7 — Migration to Next.js, Storybook, and Accessibility

## Introduction

The decision to migrate arose from the natural evolution of the project. Initially, Vite offered speed and simplicity for prototyping and frontend MVPs. However, as the application grew, typical needs of more complex systems emerged: simple routing, database interactions, server-side page generation.

## Why migrate to Next.js?

Next.js offers significant technical advantages and scalability capabilities that align perfectly with the project's emerging needs:

- **File-based routing system:** Simplifies route management without extra configuration.
- **API Routes and Server Actions:** Allows you to create backend endpoints and database calls directly in the frontend.
- **Automatic optimizations:** From images to code splitting, Next.js optimizes the bundle without manual configuration.
- **Mature ecosystem:** Extensive documentation, active community, and compatibility with modern tools.

## Migration process

### 1. Initial Next.js project setup

I started by creating a new Next.js project with TypeScript using the official CLI:

```bash
npx create-next-app@latest nutritional-tracker-nextjs --typescript --tailwind --app
```

This generated the base structure with the App Router, which uses the `app/` folder instead of the old `pages/` system.

### 2. Transferring components and tests

I copied the components and tests from the original project, reviewing imports, types, and styles to ensure compatibility. For example, components that previously used routes defined by React Router now had to integrate with Next's file-based routing system (`pages/` or `app/`).

The tests (unit and integration) were adjusted to run correctly in the new environment, maintaining the same coverage and quality.

> **Example**
>
> Before (React Router):
> ```tsx
> import { Link } from 'react-router-dom'
>
> <Link to="/profile">Profile</Link>
> ```
>
> After (Next.js):
> ```tsx
> import Link from 'next/link'
>
> <Link href="/profile">Profile</Link>
> ```

### 3. Adjusting dependencies and configuration

I updated the versions of **React**, **TypeScript**, **Testing Library**, and other key dependencies to avoid incompatibilities, modifying the `package.json` file.

I removed everything related to Vite and its plugins, adding the scripts recommended by Next.js:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "vitest run",
  "storybook": "storybook dev -p 6006"
}
```

It was also necessary to adjust the ESLint configuration and TypeScript files (`tsconfig.json`) to work correctly with Next.js.

## Storybook: Development, documentation, and visual testing

### What is Storybook and why use it?

Storybook is a tool for isolated UI component development. It allows you to work, visualize, and test each component independently, without relying on the backend or other parts of the application. This makes it easier to detect visual errors, create interactive documentation, and collaborate between developers and designers.

**Main advantages of Storybook:**

- **Isolated development:** You can create and test components in different states (e.g., error, disabled, loading, etc.) without mounting the entire app.
- **Interactive documentation:** Each component has examples (stories) showing its variants and uses, serving as living, up-to-date documentation.
- **Visual testing:** Lets you manually review the appearance and behavior of components, speeding up UI problem detection.
- **Collaboration:** The team can view and test components from a web interface, without needing to install the entire project.

**Why did I use it in this project?**

Although not strictly necessary for a small app, I decided to integrate Storybook to learn how it works and evaluate its real utility. At first, I faced some configuration difficulties, but after migrating to Next.js, those incompatibilities were greatly reduced. The official documentation and included examples helped me build the stories, even when I didn't fully understand the tool's scope.

In summary, Storybook adds value to professional frontend development, even in small projects, by enabling more robust, reusable, and maintainable components. Its interactive documentation and visual testing accelerate development and improve the final product's quality.

### Implementation in the project

Storybook implementation began in the previous version of the project with Vite, where I faced some compatibility and versioning issues. For example, certain addons and configurations didn't work correctly with Vite's structure, forcing me to research solutions and adapt the configuration manually.

After migrating to Next.js, the process became much simpler: Storybook has better support and documentation for Next, allowing quick adjustment of configuration files.

The structure of the stories remained clear and organized. Each component has its own `.stories.tsx` file in the corresponding folder, where variants like `Default`, `WithError`, and `Disabled` are defined.

The main configuration is done in the `main.js` file, where the stories' path and addons to use are specified. Thanks to having the stories already created in the previous version, migration only required minor adjustments to imports and some parameters.

### Example of a component story

To illustrate how Storybook works, here's a simple example of a story for a `Button` component. Stories let you show the component in different states and with different properties, making development and documentation easier.

Let's take a `Button.tsx` component. Its story is defined in a `Button.stories.tsx` file:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Reusable button with color and state variants.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Send',
    disabled: false,
    variant: 'primary',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Send',
    disabled: true,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Cancel',
    disabled: false,
    variant: 'secondary',
  },
}
```

**Explanation:**

- The `.stories.tsx` file defines how the component is displayed in Storybook.
- Each export (`Default`, `Disabled`, `Secondary`) is a "story" representing a different button state.
- The `args` let you change the component's properties visually and quickly from the Storybook interface.
- This way, you can see and test the button with different texts, styles, and states without modifying the main app code.

This approach helps detect visual errors, test variants, and document the correct use of each component.

### The value Storybook adds

In a small personal project like this, Storybook might be considered unnecessary or even "overhead." However, integrating it was a strategic decision to experiment and learn how it works in a real environment. Testing it in this context made its true value clear for larger, collaborative projects, where visual documentation, isolated development, and manual component testing are essential for maintaining code quality and scalability.

## Accessibility tests with axe-core

### Why have accessibility tests?

While not strictly necessary for a personal project, implementing accessibility tests from the start instills good development practices and ensures components are inclusive. So, like Storybook, I included them for educational and learning purposes.

### What are they and why do they matter?

Web accessibility means designing interfaces that can be used by everyone, including people with visual, auditory, or motor disabilities. Meeting accessibility standards (like WCAG 2.1 AA) is not only good practice, but also improves user experience and broadens the app's reach. Axe-core is a library that automates the detection of accessibility issues in components, helping identify common errors like lack of contrast, missing labels, or poor keyboard navigation.

### Implementing accessibility tests

Accessibility tests are placed alongside component tests, using Testing Library and axe-core integration. Every time a component is rendered in tests, axe runs to check for accessibility violations. This ensures components meet standards before being integrated into the app.

### Example accessibility test

```tsx
// Button.test.tsx
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from './Button'

expect.extend(toHaveNoViolations)

test('Button is accessible', async () => {
  const { container } = render(<Button>Send</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

**Explanation:**
This test renders the `Button` component and runs axe on the result. If any accessibility issue is detected, the test fails and shows a detailed report, allowing you to fix the error before publishing the component.

### Good practices applied

- **Label association:** All form fields have correctly associated labels for screen reader navigation.
- **Accessible messages:** Error and validation messages are clear and linked to the corresponding fields.
- **Contrast:** Text and background colors are checked for sufficient contrast to be readable.
- **Dynamic states:** Components correctly inform their states (active, disabled, error) both visually and via accessible attributes (`aria-*`).

These practices, along with automated tests, help ensure the app is usable and accessible for all users.

---

## Series Navigation

- [← Part 6: Visual Architecture & Accessibility](/posts/nutritional-tracker-part6/)

### Additional Resources

- [Official Next.js Documentation](https://nextjs.org/docs)
- [Storybook for UI Components](https://storybook.js.org/docs/react/get-started/introduction)
- [Axe-core for accessibility testing](https://github.com/dequelabs/axe-core)
- [Project repository on GitHub](https://github.com/RadikeCosa/nutritional-tracker)
