---
title: "Building a Nutritional Tracker: Part 7 – Migration to Next.js, Storybook, and Accessibility"
published: 2025-11-19T12:10:23.397Z
description: "In this post I share the process of migrating the app to Next.js, the challenges faced, and the solutions implemented."
updated: ""
tags:
  - nutritional-tracker
  - migration
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "side-project-nutritional-tracker-7"
---

## Building a Nutritional Tracker: Part 7 – Migration to Next.js, Storybook, and Accessibility

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

It
