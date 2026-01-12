# 📋 Blog-Astro Skills Guide for GitHub Copilot

**Last Updated:** 2026-01-12

Welcome! This document serves as a comprehensive guide for GitHub Copilot to understand the structure, conventions, and workflows of the Blog-Astro project.

---

## 📝 Table of Contents

- [Project Information](#-project-information)
- [Project Architecture](#️-project-architecture)
- [Frontmatter Format](#-frontmatter-format)
- [Content Format](#-content-format)
- [Available Scripts](#-available-scripts)
- [Code Conventions](#-code-conventions)
- [Multilingual Flow](#-multilingual-flow)
- [Writing Improvement](#-writing-improvement)
- [Common Tasks](#-common-tasks)
- [Technical References](#-technical-references)
- [Important Rules](#️-important-rules)
- [Usage Examples](#-usage-examples)

---

## 🎯 Project Information

### Basic Info
- **Project Name:** Blog-Astro (based on Retypeset theme)
- **Owner:** RadikeCosa (Ramiro N. Cosa)
- **Repository:** https://github.com/RadikeCosa/blog-astro
- **Live Site:** https://ramirocosa.is-a.dev

### Tech Stack
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Astro** | 5.13.7 | SSG Framework with Islands Architecture |
| **TypeScript** | 5.9.2 | Type-safe development |
| **UnoCSS** | 66.5.10 | Atomic CSS engine |
| **pnpm** | 10.15.0 | Package manager |

### Supported Languages
- 🇪🇸 **Spanish (ES)** - Primary language, default locale
- 🇬🇧 **English (EN)** - Secondary language for translations

### Content Stats
- **50+ technical posts** covering:
  - LeetCode Top Interview 150 series
  - FreeCodeCamp daily challenges
  - Algorithm solutions with detailed explanations
  - Web development tutorials
  - Project documentation

---

## 🏗️ Project Architecture

### Complete Directory Structure

```
blog-astro/
├── src/
│   ├── assets/                 # Static assets
│   │   ├── images/            # Blog post images, optimized with Sharp
│   │   └── fonts/             # EarlySummer Serif custom font
│   ├── components/            # Reusable Astro/React components
│   │   ├── BaseHead.astro     # SEO meta tags, OpenGraph
│   │   ├── PostCard.astro     # Post preview cards
│   │   ├── Header.astro       # Site navigation
│   │   ├── Footer.astro       # Site footer with links
│   │   └── ...                # Other UI components
│   ├── content/               # Content collections (type-safe)
│   │   ├── posts/             # Blog posts (50+ articles)
│   │   │   ├── *.md           # Spanish posts (no lang suffix)
│   │   │   ├── *.en.md        # English translations
│   │   │   └── *.es.md        # Spanish posts (with suffix)
│   │   ├── drafts/            # Work-in-progress posts
│   │   │   └── README.md      # Drafts documentation
│   │   └── about/             # About pages (multilingual)
│   ├── layouts/               # Page layouts
│   │   ├── BaseLayout.astro   # Base HTML structure
│   │   ├── PostLayout.astro   # Blog post layout
│   │   └── ...                # Other layouts
│   ├── pages/                 # File-based routing
│   │   ├── index.astro        # Homepage
│   │   ├── posts/             # Post listing pages
│   │   │   ├── [page].astro   # Paginated post list
│   │   │   └── [slug].astro   # Individual post pages
│   │   ├── [lang]/            # Language-specific routes
│   │   └── ...                # Other pages
│   ├── styles/                # Global styles and themes
│   │   ├── global.css         # Base styles
│   │   └── ...                # Theme-specific styles
│   ├── i18n/                  # Internationalization
│   │   └── ui.ts              # Translation strings
│   ├── plugins/               # Custom Remark/Rehype plugins
│   │   └── ...                # Markdown processing plugins
│   ├── utils/                 # Helper functions
│   │   ├── date.ts            # Date formatting
│   │   ├── slug.ts            # URL slug generation
│   │   └── ...                # Other utilities
│   ├── config.ts              # Site configuration (themeConfig)
│   ├── content.config.ts      # Content collection schemas
│   └── env.d.ts               # TypeScript environment types
├── scripts/                   # CLI automation tools
│   ├── new-post.ts            # Create new single-language post
│   ├── new-bi-post.ts         # Create bilingual post pair
│   ├── format-posts.ts        # Batch format existing posts
│   ├── apply-lqip.ts          # Generate LQIP for images
│   └── update-theme.ts        # Update from upstream theme
├── public/                    # Static files (no processing)
│   ├── icons/                 # Favicons, app icons
│   ├── robots.txt             # Search engine crawler rules
│   └── ...                    # Other static assets
├── patches/                   # Package patches (pnpm)
│   └── @qwik.dev__partytown@0.11.1.patch
├── astro.config.ts            # Astro configuration
├── tsconfig.json              # TypeScript configuration
├── uno.config.ts              # UnoCSS configuration
├── eslint.config.mjs          # ESLint configuration
├── package.json               # Dependencies and scripts
├── pnpm-lock.yaml             # Lock file for dependencies
├── README.md                  # Project documentation
├── SEO_OPTIMIZATION_GUIDE.md  # SEO best practices
└── skills.md                  # This file (Copilot guide)
```

### File Naming Conventions

#### Posts
- **Spanish posts:** `filename.md` or `filename.es.md`
- **English posts:** `filename.en.md`
- **Drafts:** Same convention in `src/content/drafts/`

#### Components
- **Astro components:** `ComponentName.astro` (PascalCase)
- **TypeScript utilities:** `utilityName.ts` (camelCase)

#### Images
- **Location:** `src/assets/images/`
- **Format:** WebP preferred, PNG/JPEG acceptable
- **Naming:** Descriptive kebab-case (e.g., `algorithm-flow-diagram.png`)

---

## 📄 Frontmatter Format

### Required Fields (All Posts)

```yaml
---
title: "Post Title Here"
published: 2025-12-12T22:57:04.267Z
description: "Brief SEO-optimized description (150-160 chars)"
tags:
  - tag1
  - tag2
draft: false
pin: 0
toc: true
lang: "es"  # or "en"
abbrlink: "url-friendly-slug"
---
```

### Field Descriptions

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | String | Post title (SEO optimized) | `"Majority Element - LeetCode #169"` |
| `published` | ISO DateTime | Publication date/time | `2025-12-12T22:57:04.267Z` |
| `description` | String | Meta description for SEO | `"We solve the Majority Element problem..."` |
| `tags` | Array | Categories/topics | `[leetcode, algorithms]` |
| `draft` | Boolean | Draft status | `false` |
| `pin` | Number | Pin to top (0 = no) | `0` |
| `toc` | Boolean | Show table of contents | `true` |
| `lang` | String | Language code | `"es"` or `"en"` |
| `abbrlink` | String | URL slug (unique) | `"majority-element"` |

### Optional Fields

```yaml
updated: "2025-12-15T10:00:00.000Z"  # Last update timestamp
image: /images/post-cover.jpg         # Cover image path
imageAlt: "Image description"         # Alt text for cover
author: "Author Name"                 # Override default author
category: "algorithms"                # Primary category
```

### Conventions for Challenge Posts

For algorithm/challenge posts (LeetCode, FreeCodeCamp, etc.):

#### Spanish Version (`filename.md` or `filename.es.md`)
```yaml
---
title: "Nombre Traducido - Plataforma #Número Daily Challenge"
published: 2025-12-12T22:57:04.267Z
description: 'Analizamos y resolvemos el problema original-name-in-english: breve descripción en español.'
tags:
  - freecodecamp  # or leetcode
  - daily-challenge  # if applicable
  - algorithms
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "nombre-del-problema"
---
```

**Example:**
```yaml
title: "De A Pares - FreeCodeCamp #131 Daily Challenge"
description: 'Analizamos y resolvemos el problema pairwise: encontrar pares que suman un objetivo y sumar sus índices.'
```

#### English Version (`filename.en.md`)
```yaml
---
title: "Problem Name - Platform #Number - Series X/Total"
published: 2025-12-12T22:57:04.267Z
description: 'We solve the "Problem Name" problem from Platform (#Number) using TypeScript. Brief description.'
tags:
  - leetcode  # or freecodecamp
  - top-interview-150  # if applicable
draft: false
pin: 0
toc: true
lang: "en"
abbrlink: "problem-name"
---
```

**Example:**
```yaml
title: "Majority Element - LeetCode #169 - Top Interview Series 5/150"
description: 'We solve the "Majority Element" problem from LeetCode (#169) using TypeScript. Efficient solution with O(n) time.'
```

---

## 📝 Content Format

### Recommended Post Structure (7 Steps)

Use this structure for technical algorithm/problem-solving posts:

1. **📋 Introduction/Problem Statement**
   - Clear problem description
   - Constraints and requirements
   - Input/output examples

2. **🔍 Initial Analysis**
   - What does the problem ask?
   - Edge cases to consider
   - Initial observations

3. **💡 Solution Development**
   - Approach explanation
   - Why this method?
   - Alternative approaches considered

4. **⚙️ Implementation**
   - Code with detailed comments
   - TypeScript with proper typing
   - Step-by-step walkthrough

5. **📊 Complexity Analysis**
   - Time complexity with KaTeX notation
   - Space complexity with KaTeX notation
   - Trade-offs discussion

6. **🧪 Edge Cases**
   - Special scenarios
   - Boundary conditions
   - Error handling

7. **💭 Reflections/Learnings**
   - Key takeaways
   - Lessons learned
   - Related problems or concepts

### Mermaid Diagrams Guide

Use Mermaid for visualizing:
- Flowcharts (algorithm flow)
- Data structures (trees, graphs)
- Decision trees
- Process diagrams

#### Best Practices
- **Prefer vertical layouts:** Use `flowchart TD` or `flowchart TB` for better mobile readability
- **Protect special characters:** Wrap node text with `""` inside shape delimiters
- **Keep it simple:** Focus on clarity over complexity
- **Add context:** Include diagram before or after related code

#### Example: Algorithm Flow
```markdown
\`\`\`mermaid
flowchart TD
  A["Input: array of numbers"] --> B["Initialize variables"]
  B --> C["Loop through array"]
  C --> D{"Check condition"}
  D -- "True" --> E["Process element"]
  D -- "False" --> F["Skip element"]
  E --> C
  F --> C
  C --> G["Return result"]
\`\`\`
```

#### Common Patterns
```markdown
<!-- Two-pointer approach -->
\`\`\`mermaid
flowchart TD
  A["left = 0, right = n-1"] --> B{"left < right?"}
  B -- "Yes" --> C["Compare elements"]
  C --> D{"Condition met?"}
  D -- "Yes" --> E["Process pair"]
  D -- "No" --> F["Move pointers"]
  E --> F
  F --> B
  B -- "No" --> G["Done"]
\`\`\`
```

### KaTeX (Mathematical Notation) Guide

Use KaTeX for:
- Complexity notation ($O(n)$, $O(n \log n)$)
- Mathematical formulas
- Algorithm definitions
- Formal expressions

#### Syntax
- **Inline math:** `$expression$`
- **Block math:** `$$expression$$`

#### Examples
```markdown
<!-- Inline complexity -->
The time complexity is $O(n)$ and space is $O(1)$.

<!-- Block formula -->
$$
\text{Time Complexity} = O(n \times m)
$$

<!-- Mathematical definition -->
The majority element appears more than $\left\lfloor \frac{n}{2} \right\rfloor$ times.

<!-- Summation -->
$$
\sum_{i=0}^{n-1} arr[i]
$$
```

#### Common Complexity Notations
- $O(1)$ - Constant time
- $O(\log n)$ - Logarithmic time
- $O(n)$ - Linear time
- $O(n \log n)$ - Linearithmic time
- $O(n^2)$ - Quadratic time
- $O(2^n)$ - Exponential time

### Code Block Conventions

#### TypeScript Code
```markdown
\`\`\`typescript
function solutionName(input: number[]): number {
  // Clear comments explaining logic
  const result: number = 0
  
  // Step 1: Initial setup
  for (const num of input) {
    // Process each element
  }
  
  return result
}
\`\`\`
```

#### Best Practices
- **Type everything:** No `any` types
- **Comment strategically:** Explain why, not what
- **Name descriptively:** `targetSum` not `x`
- **Use const/let:** Never `var`
- **Functional style:** Prefer immutability

---

## 🚀 Available Scripts

### Development Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `pnpm dev` | Start dev server with type checking | Development |
| `pnpm build` | Build for production + LQIP generation | Production |
| `pnpm preview` | Preview production build locally | Testing |

### Content Creation Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `pnpm new-post` | Create new single-language post | Interactive CLI |
| `pnpm new-bi-post` | Create bilingual post pair (ES + EN) | Interactive CLI |
| `pnpm format-posts` | Batch format all existing posts | Maintenance |

### Quality Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `pnpm lint` | Run ESLint on all files | Pre-commit |
| `pnpm lint:fix` | Auto-fix ESLint issues | Quick fixes |
| `pnpm astro check` | Type check Astro files | Validation |

### Image Optimization

| Command | Description | Usage |
|---------|-------------|-------|
| `pnpm apply-lqip` | Generate LQIP placeholders for images | After adding images |

### Theme Management

| Command | Description | Usage |
|---------|-------------|-------|
| `pnpm update-theme` | Pull updates from upstream Retypeset | Theme updates |

---

## 🎨 Code Conventions

### TypeScript Rules

#### Type Safety
```typescript
// ✅ DO: Explicit typing
function calculateSum(nums: number[]): number {
  return nums.reduce((acc, num) => acc + num, 0)
}

// ❌ DON'T: Using any
function process(data: any): any {
  return data.map(x => x * 2)
}
```

#### Strict Mode
- **Always enabled:** `tsconfig.json` uses `"extends": "astro/tsconfigs/strict"`
- **No implicit any:** All parameters must be typed
- **Null checks:** Use optional chaining and nullish coalescing

#### Naming Conventions
```typescript
// ✅ DO
const userName = "John"              // camelCase for variables
function getUserData() {}            // camelCase for functions
interface UserProfile {}             // PascalCase for interfaces
type ResponseData = {}               // PascalCase for types
const MAX_RETRY_COUNT = 3           // UPPER_SNAKE_CASE for constants

// ❌ DON'T
const user_name = "John"             // snake_case
function GetUserData() {}            // PascalCase functions
interface userProfile {}             // camelCase interfaces
```

### Astro Component Conventions

#### Component Structure
```astro
---
// TypeScript at the top (component script)
interface Props {
  title: string
  description?: string
}

const { title, description } = Astro.props
---

<!-- HTML template below -->
<article>
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</article>

<style>
  /* Scoped styles */
  article {
    padding: 2rem;
  }
</style>
```

#### Props Typing
```typescript
// ✅ DO: Always type props
interface Props {
  posts: Post[]
  currentPage: number
  totalPages: number
}

// ❌ DON'T: Untyped props
const { posts, currentPage, totalPages } = Astro.props
```

#### Functional Components
- **Prefer:** Functional/stateless components
- **Hydration:** Use `client:load`, `client:visible`, `client:idle` strategically
- **Islands:** Keep interactive parts minimal

### CSS/UnoCSS Conventions

#### Utility-First Approach
```html
<!-- ✅ DO: Use utility classes -->
<div class="flex items-center gap-4 p-4 bg-background text-primary">
  <h2 class="text-2xl font-bold">Title</h2>
</div>

<!-- ❌ DON'T: Inline styles -->
<div style="display: flex; padding: 1rem;">
  <h2 style="font-size: 1.5rem;">Title</h2>
</div>
```

#### Mobile-First Design
```css
/* ✅ DO: Mobile first, then larger screens */
.card {
  @apply p-4;           /* Mobile */
  @apply md:p-6;        /* Tablet */
  @apply lg:p-8;        /* Desktop */
}

/* ❌ DON'T: Desktop first */
.card {
  @apply p-8 md:p-6 sm:p-4;
}
```

#### Color Usage
```typescript
// Use theme colors from config.ts
primary     // Main text color
secondary   // Secondary text
background  // Background color
highlight   // Selection/hover states

// Container colors
note        // Blue - informational
tip         // Green - helpful hints
important   // Purple - key points
warning     // Orange - caution
caution     // Red - danger
```

---

## 🌍 Multilingual Flow

### Translation Process (ES → EN)

#### Step 1: Write in Spanish
1. Create post in Spanish (primary language)
2. Use `lang: "es"` in frontmatter
3. File: `filename.md` or `filename.es.md`

#### Step 2: Improve & Review
1. Edit for clarity and conciseness
2. Add diagrams and visualizations
3. Ensure code examples are complete
4. Verify all sections are present

#### Step 3: Translate to English
1. Create English version: `filename.en.md`
2. Change `lang: "en"` in frontmatter
3. Translate all text content
4. Adapt expressions (avoid literal translation)
5. Keep technical terms consistent

#### Step 4: Maintain Consistency
- **Diagrams:** Keep identical (no translation needed)
- **Code:** Keep identical (variable names, comments)
- **Formulas:** Keep identical (mathematical notation)
- **Examples:** Keep identical (same test cases)

### Bilingual Conventions

#### File Naming
```
posts/
├── majority-element.en.md      # English version
├── majority-element.es.md      # Spanish version
├── pairwise.md                 # Spanish (no suffix)
└── pairwise.en.md              # English version
```

#### Frontmatter Differences
```yaml
# Spanish (filename.es.md)
---
title: "Elemento Mayoritario - LeetCode #169"
description: "Resolvemos el problema..."
lang: "es"
abbrlink: "elemento-mayoritario"
---

# English (filename.en.md)
---
title: "Majority Element - LeetCode #169"
description: "We solve the problem..."
lang: "en"
abbrlink: "majority-element"
---
```

#### What to Translate
✅ **Translate:**
- Post title and description
- All text paragraphs
- Section headings
- Image alt text (if applicable)
- Comments in Markdown (not in code)

❌ **Don't Translate:**
- Code (variable names, functions)
- Mathematical formulas
- Diagram content (Mermaid)
- URLs and links
- Technical terms (algorithm names, data structures)

---

## ✍️ Writing Improvement

### Quality Checklist

Use this checklist when improving or reviewing posts:

#### Content Quality
- [ ] **Direct sentences:** No filler words or circular explanations
- [ ] **No redundancy:** Each section adds new information
- [ ] **Beginner-friendly:** Step-by-step reasoning, clear explanations
- [ ] **Advanced insights:** Optimization notes, trade-offs, alternatives
- [ ] **Visual aids:** Diagrams clarify complex concepts
- [ ] **Correct grammar:** Proofread for typos and errors

#### Technical Accuracy
- [ ] **Code works:** Tested and verified
- [ ] **Types correct:** No `any`, proper TypeScript
- [ ] **Complexity accurate:** Time/space analysis is correct
- [ ] **Edge cases covered:** Boundary conditions addressed

#### Structure & Format
- [ ] **Frontmatter complete:** All required fields present
- [ ] **Headers hierarchical:** Proper H2, H3, H4 structure
- [ ] **Code blocks tagged:** Language specified for highlighting
- [ ] **Math formatted:** KaTeX used for formulas
- [ ] **Diagrams helpful:** Mermaid visualizes logic

#### SEO & Metadata
- [ ] **Title optimized:** Clear, descriptive, includes key terms
- [ ] **Description concise:** 150-160 characters, SEO-friendly
- [ ] **Tags relevant:** Accurate categorization
- [ ] **Slug clean:** URL-friendly abbrlink

### Writing Style Guidelines

#### Tone
- **Technical but approachable:** Explain concepts clearly
- **Personal voice:** First-person perspective okay
- **Encouraging:** Help readers understand and learn

#### Structure
- **Short paragraphs:** 2-4 sentences max
- **Lists and tables:** Break up dense text
- **Code comments:** Explain complex logic
- **Visual feedback:** Use emojis/symbols for quick scanning

#### Clarity
- **Avoid jargon:** Explain technical terms
- **Step-by-step:** Walk through logic progressively
- **Examples first:** Show, then explain
- **Context matters:** Why is this important?

---

## 🛠️ Common Tasks

### Task 1: Create a New Algorithm Post

#### Using CLI (Recommended)
```bash
# Single language
pnpm new-post "Majority Element - LeetCode #169"

# Bilingual pair
pnpm new-bi-post "Two Sum - LeetCode #1"
```

#### Manual Steps
1. Create file: `src/content/posts/problem-name.md`
2. Add frontmatter (see format section)
3. Write content following 7-step structure:
   - Problem statement
   - Analysis
   - Solution approach
   - Implementation
   - Complexity
   - Edge cases
   - Reflections
4. Add Mermaid diagram for flow
5. Add KaTeX for complexity
6. Test locally: `pnpm dev`
7. Verify in browser: `http://localhost:4321`

### Task 2: Improve an Existing Post

1. **Identify issues:**
   - Unclear explanations
   - Missing diagrams
   - Incomplete complexity analysis
   - Poor structure

2. **Apply improvements:**
   - Simplify sentences
   - Add visual aids (Mermaid)
   - Add math notation (KaTeX)
   - Complete missing sections

3. **Use checklist:**
   - Run through Writing Quality Checklist
   - Verify all items checked

4. **Test changes:**
   ```bash
   pnpm lint
   pnpm astro check
   pnpm dev
   ```

### Task 3: Translate a Post (ES → EN)

1. **Prepare source:**
   - Ensure Spanish version is complete
   - All diagrams and code finalized

2. **Create English version:**
   ```bash
   # Copy file
   cp src/content/posts/problem.es.md src/content/posts/problem.en.md
   ```

3. **Update frontmatter:**
   - Change `lang: "es"` to `lang: "en"`
   - Translate title and description
   - Update abbrlink if needed

4. **Translate content:**
   - Translate all text
   - Keep code identical
   - Keep diagrams identical
   - Keep formulas identical
   - Adapt expressions naturally

5. **Review:**
   - Proofread English version
   - Ensure consistency with Spanish
   - Test both versions locally

### Task 4: Optimize Images

1. **Add images to:** `src/assets/images/`

2. **Generate LQIP:**
   ```bash
   pnpm apply-lqip
   ```

3. **Reference in post:**
   ```markdown
   ![Alt text](../../assets/images/diagram.png)
   ```

4. **Best practices:**
   - Use WebP format when possible
   - Compress before adding
   - Descriptive alt text
   - Meaningful filenames

---

## 📚 Technical References

### Official Documentation

| Resource | URL | Purpose |
|----------|-----|---------|
| **Astro Docs** | https://docs.astro.build | Framework reference |
| **TypeScript Handbook** | https://www.typescriptlang.org/docs | Type system guide |
| **UnoCSS Documentation** | https://unocss.dev | Utility classes |
| **Mermaid Live Editor** | https://mermaid.live | Diagram testing |
| **KaTeX Documentation** | https://katex.org/docs | Math notation |

### Markdown Plugins Used

| Plugin | Purpose | Documentation |
|--------|---------|---------------|
| **remark-math** | Parse LaTeX math | https://github.com/remarkjs/remark-math |
| **rehype-katex** | Render math beautifully | https://github.com/remarkjs/remark-math |
| **rehype-mermaid** | Generate diagrams from code | https://github.com/remcohaszing/rehype-mermaid |
| **remark-directive** | Custom markdown directives | https://github.com/remarkjs/remark-directive |
| **rehype-slug** | Auto-generate heading IDs | https://github.com/rehypejs/rehype-slug |

### Development Tools

| Tool | Purpose | Command |
|------|---------|---------|
| **ESLint** | Code linting | `pnpm lint` |
| **Astro Check** | Type checking | `pnpm astro check` |
| **Sharp** | Image processing | Used in `apply-lqip.ts` |
| **tsx** | Run TypeScript scripts | Used in `scripts/` |

---

## ⚠️ Important Rules

### ❌ DON'T Do This

1. **Never change author's voice** - Maintain personal style and tone
2. **Don't oversimplify** - Keep technical depth for advanced readers
3. **No excessive formality** - Conversational tone is okay
4. **Don't add diagrams/math just for show** - Only when they clarify
5. **Never remove humor/personality** - Subtle comments add character
6. **Don't use `any` type** - Always use proper TypeScript types
7. **Never commit secrets** - Check for API keys, tokens
8. **Don't break existing tests** - Run tests before committing
9. **Never modify working code unnecessarily** - Surgical changes only
10. **Don't translate code** - Keep variable names, comments in English

### ✅ ALWAYS Do This

1. **Type everything** - Use strict TypeScript types
2. **Test locally** - Run `pnpm dev` and check browser
3. **Run linter** - Execute `pnpm lint` before committing
4. **Type check** - Run `pnpm astro check` to validate
5. **Use utilities** - Prefer atomic CSS classes from UnoCSS
6. **Comment strategically** - Explain why, not what
7. **Mobile-first** - Design for small screens first
8. **Optimize images** - Run `pnpm apply-lqip` after adding images
9. **Follow structure** - Use 7-step format for algorithm posts
10. **Update frontmatter** - Keep metadata accurate and complete
11. **Add alt text** - Describe images for accessibility
12. **Use semantic HTML** - Proper heading hierarchy
13. **Check complexity** - Verify time/space analysis is correct
14. **Test edge cases** - Consider boundary conditions
15. **Keep code DRY** - Don't repeat yourself

---

## 💡 Usage Examples

### Example 1: Create Algorithm Post

**Goal:** Document a LeetCode solution

**Steps:**

1. **Create post file:**
   ```bash
   pnpm new-post "Two Sum - LeetCode #1"
   ```

2. **Update frontmatter:**
   ```yaml
   ---
   title: "Suma de Dos - LeetCode #1 Daily Challenge"
   published: 2026-01-12T10:00:00.000Z
   description: 'Resolvemos el problema Two Sum: encontrar dos números que suman un objetivo usando hashmap.'
   tags:
     - leetcode
     - algorithms
   draft: false
   pin: 0
   toc: true
   lang: "es"
   abbrlink: "two-sum"
   ---
   ```

3. **Write content:**

```markdown
## Enunciado del Problema

Dado un arreglo de enteros `nums` y un entero `target`, retorna los índices de dos números que suman `target`.

## Análisis Inicial

Necesitamos encontrar dos números cuya suma sea igual al objetivo. La forma ingenua sería usar dos loops anidados ($O(n^2)$), pero podemos optimizar con un hashmap.

## Desarrollo de la Solución

\`\`\`mermaid
flowchart TD
  A["Input: nums, target"] --> B["Create hashMap"]
  B --> C["Loop through array"]
  C --> D{"complement in hashMap?"}
  D -- "Yes" --> E["Return [hashMap[complement], i]"]
  D -- "No" --> F["Store nums[i] -> i in hashMap"]
  F --> C
  E --> G["Done"]
\`\`\`

## Implementación

\`\`\`typescript
function twoSum(nums: number[], target: number): number[] {
  const hashMap: Map<number, number> = new Map()
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
    
    if (hashMap.has(complement)) {
      return [hashMap.get(complement)!, i]
    }
    
    hashMap.set(nums[i], i)
  }
  
  return []
}
\`\`\`

## Análisis de Complejidad

- **Tiempo:** $O(n)$ - Un solo recorrido del arreglo
- **Espacio:** $O(n)$ - Hashmap almacena hasta $n$ elementos
```

### Example 2: Add Flowchart Diagram

**Goal:** Visualize two-pointer algorithm

**Code:**
```markdown
\`\`\`mermaid
flowchart TD
  A["left = 0, right = n-1"] --> B{"left < right?"}
  B -- "Yes" --> C["sum = arr[left] + arr[right]"]
  C --> D{"sum == target?"}
  D -- "Yes" --> E["Return [left, right]"]
  D -- "No" --> F{"sum < target?"}
  F -- "Yes" --> G["left++"]
  F -- "No" --> H["right--"]
  G --> B
  H --> B
  B -- "No" --> I["Not found"]
\`\`\`
```

### Example 3: Add Complexity Analysis

**Goal:** Document algorithm efficiency

**Code:**
```markdown
## Análisis de Complejidad

### Complejidad Temporal

El algoritmo realiza un único recorrido del arreglo:

$$
T(n) = O(n)
$$

Donde $n$ es la longitud del arreglo de entrada.

### Complejidad Espacial

Utilizamos un hashmap que, en el peor caso, almacena todos los elementos:

$$
S(n) = O(n)
$$

### Trade-offs

- ✅ **Ventaja:** Solución óptima en tiempo
- ✅ **Ventaja:** Una sola pasada del arreglo
- ⚠️ **Desventaja:** Uso extra de memoria para el hashmap
```

---

## 🔄 Workflow Summary

### For New Posts
1. Run `pnpm new-post` or `pnpm new-bi-post`
2. Fill frontmatter with accurate data
3. Write content following 7-step structure
4. Add diagrams (Mermaid) and math (KaTeX)
5. Test locally: `pnpm dev`
6. Lint and type check: `pnpm lint && pnpm astro check`
7. Commit when validated

### For Improvements
1. Identify specific issues
2. Apply targeted fixes
3. Run quality checklist
4. Test locally
5. Verify no regressions

### For Translations
1. Complete and finalize source language
2. Create target language file
3. Update frontmatter (lang, title, description)
4. Translate text content only
5. Keep code/diagrams/formulas identical
6. Review both versions

---

## 🎯 Quick Reference

### File Locations
- **Posts:** `src/content/posts/`
- **Drafts:** `src/content/drafts/`
- **Images:** `src/assets/images/`
- **Components:** `src/components/`
- **Config:** `src/config.ts`
- **Scripts:** `scripts/`

### Common Commands
```bash
pnpm dev                 # Start dev server
pnpm build              # Build for production
pnpm new-post           # Create new post
pnpm new-bi-post        # Create bilingual post
pnpm lint               # Run ESLint
pnpm astro check        # Type check
pnpm apply-lqip         # Optimize images
```

### Key Conventions
- **Language:** Spanish primary, English secondary
- **Types:** Always use TypeScript, no `any`
- **CSS:** UnoCSS utility-first, mobile-first
- **Structure:** 7-step format for algorithms
- **Diagrams:** Mermaid for flows, KaTeX for math

---

**End of Skills Guide** 📚

This document should be updated whenever project conventions change or new patterns emerge.
