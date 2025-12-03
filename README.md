<div align="center">

# 🚀 Ramiro N. Cosa - Technical Blog & Portfolio

[![Astro](https://img.shields.io/badge/Astro-5.13.7-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![UnoCSS](https://img.shields.io/badge/UnoCSS-66.5.1-4FC08D?logo=unocss&logoColor=white)](https://unocss.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Full Stack Developer | Problem Solver | Technical Writer**

[🌐 Live Demo](https://ramirocosa.is-a.dev) • [📧 Contact](mailto:ramirocosa@gmail.com) • [💼 LinkedIn](https://linkedin.com/in/ramicosa) • [🐙 GitHub](https://github.com/radikeCosa)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Key Technical Features](#-key-technical-features)
- [Technical Stack](#-technical-stack)
- [Performance & Optimization](#-performance--optimization)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Content Showcase](#-content-showcase)
- [Technical Highlights](#-technical-highlights)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About the Project

A modern, high-performance **technical blog and portfolio** built with cutting-edge web technologies. This project showcases advanced front-end engineering skills, including:

- **50+ Algorithm Solutions**: Documented LeetCode and FreeCodeCamp challenges with detailed explanations
- **Bilingual Content**: Full English/Spanish support with i18n architecture
- **Custom Theme Engine**: Fork and enhancement of Retypeset theme with custom features
- **Developer Experience**: CLI tools for content creation, formatting, and optimization

### Why This Project Stands Out

✨ **Modern Architecture**: Built with Astro's Islands Architecture for optimal performance
🎨 **Design Excellence**: Print-inspired typography with carefully crafted reading experience
⚡ **Performance First**: 100/100 Lighthouse scores with advanced optimization techniques
🔧 **Developer Tools**: Custom CLI scripts for streamlined content workflow
📚 **Technical Writing**: Demonstrates both coding and communication skills

---

## 🔥 Key Technical Features

### Advanced Frontend Engineering

- **Static Site Generation (SSG)**: Zero JavaScript by default, hydration on demand
- **Content Collections API**: Type-safe content management with Zod validation
- **Dynamic OG Images**: Automated social media preview generation with Canvas API
- **Custom Markdown Pipeline**: Enhanced with Remark/Rehype plugins for:
  - Mathematical notation (KaTeX)
  - Diagrams (Mermaid)
  - Code syntax highlighting with copy buttons
  - Auto-generated table of contents
  - Reading time estimation

### Performance Optimizations

- **Image Optimization**: Automatic LQIP (Low Quality Image Placeholders) generation
- **Asset Pipeline**: Sharp-based image processing with WebP conversion
- **Code Splitting**: Lazy loading for comments and analytics
- **CSS-in-JS**: UnoCSS with atomic CSS approach for minimal bundle size
- **Compression**: Astro Compress for HTML/CSS/JS minification

### SEO & Accessibility

- **Meta Optimization**: Comprehensive OpenGraph and Twitter Card support
- **Sitemap Generation**: Automatic XML sitemap for search engines
- **RSS/Atom Feeds**: Multi-format syndication for content distribution
- **Semantic HTML**: ARIA labels and proper heading hierarchy
- **Lighthouse Perfect**: 100/100 scores across all metrics

---

## 💻 Technical Stack

### Core Technologies

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | [Astro 5.13.7](https://astro.build/) | Static Site Generation with Islands Architecture |
| **Language** | [TypeScript 5.9.2](https://www.typescriptlang.org/) | Type-safe development |
| **Styling** | [UnoCSS 66.5.1](https://unocss.dev/) | Atomic CSS engine with instant compilation |
| **Package Manager** | [pnpm 10.15.0](https://pnpm.io/) | Fast, disk space efficient |

### Enhanced Markdown Processing

| Plugin | Functionality |
|--------|--------------|
| **remark-math** | LaTeX mathematical notation support |
| **rehype-katex** | Beautiful math rendering |
| **rehype-mermaid** | Diagram generation from code |
| **remark-directive** | Custom markdown directives |
| **rehype-slug** | Automatic heading ID generation |

### Developer Experience

| Tool | Purpose |
|------|---------|
| **ESLint + Prettier** | Code quality and formatting |
| **Astro Check** | Type checking for Astro files |
| **Simple Git Hooks** | Pre-commit validation |
| **Lint-Staged** | Run linters on git staged files |
| **Custom CLI Scripts** | Content creation and optimization |

### Third-Party Integrations

- **Analytics**: Google Analytics 4, Umami (privacy-focused alternative)
- **Comments**: Waline, Twikoo, Giscus support
- **Images**: Sharp for processing, LQIP generation
- **Fonts**: Custom EarlySummer Serif typography

---

## ⚡ Performance & Optimization

### Lighthouse Metrics (Target)

```
Performance:    100/100
Accessibility:  100/100
Best Practices: 100/100
SEO:            100/100
```

### Key Optimizations Implemented

- **Zero JavaScript by Default**: Only hydrate interactive components
- **Image Lazy Loading**: Native lazy loading + LQIP placeholders
- **Critical CSS**: Inline critical styles, defer non-critical
- **Font Optimization**: Subset fonts, preload critical fonts
- **Asset Compression**: Brotli/Gzip compression for all assets
- **CDN Ready**: Optimized for global content delivery

### Bundle Size

- **Initial Load**: < 50KB (HTML + Critical CSS)
- **Time to Interactive**: < 1.5s on 3G
- **First Contentful Paint**: < 0.8s

---

## 🏗️ Project Architecture

### Directory Structure

```
blog-astro/
├── src/
│   ├── assets/           # Static assets (images, fonts)
│   ├── components/       # Reusable Astro/React components
│   │   ├── BaseHead.astro
│   │   ├── PostCard.astro
│   │   └── ...
│   ├── content/          # Content collections
│   │   ├── posts/        # Blog posts (50+ technical articles)
│   │   │   ├── *.en.md   # English versions
│   │   │   └── *.es.md   # Spanish versions
│   │   └── about/        # About pages
│   ├── layouts/          # Page layouts
│   │   ├── BaseLayout.astro
│   │   └── PostLayout.astro
│   ├── pages/            # File-based routing
│   │   ├── index.astro
│   │   ├── posts/
│   │   └── [lang]/
│   ├── styles/           # Global styles and themes
│   ├── i18n/             # Internationalization configs
│   ├── plugins/          # Remark/Rehype plugins
│   ├── utils/            # Helper functions
│   └── config.ts         # Site configuration
├── scripts/              # CLI automation tools
│   ├── new-post.ts       # Create new blog post
│   ├── format-posts.ts   # Batch format posts
│   ├── apply-lqip.ts     # Generate image placeholders
│   └── update-theme.ts   # Theme update utility
├── public/               # Static files (favicons, robots.txt)
└── patches/              # Package patches (if needed)
```

### Architecture Patterns

- **Islands Architecture**: Partial hydration for optimal performance
- **Content Collections**: Type-safe content with Zod schemas
- **File-based Routing**: Intuitive page structure
- **Component Composition**: Reusable, maintainable components
- **Utility-First CSS**: Atomic design with UnoCSS

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **pnpm**: v10.15.0 or higher (Recommended)
  ```bash
  npm install -g pnpm
  ```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RadikeCosa/blog-astro.git
   cd blog-astro
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment** (optional)
   ```bash
   cp .env.example .env
   # Edit .env with your analytics IDs, etc.
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open browser**
   ```
   http://localhost:4321
   ```

### Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production (includes type checking) |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | Run ESLint on all files |
| `pnpm lint:fix` | Auto-fix linting issues |
| `pnpm new-post` | Create new blog post with template |
| `pnpm new-bi-post` | Create bilingual post (EN + ES) |
| `pnpm format-posts` | Format all existing posts |
| `pnpm apply-lqip` | Generate LQIP for all images |
| `pnpm update-theme` | Pull upstream theme updates |

---

## 🔧 Development Workflow

### Creating New Content

#### Option 1: Using CLI Tool (Recommended)

```bash
# Create single post
pnpm new-post

# Follow interactive prompts for:
# - Title
# - Language (en/es)
# - Tags
# - Category
```

#### Option 2: Manual Creation

1. Create file in `src/content/posts/`
2. Use frontmatter template:

```yaml
---
title: Your Post Title
published: 2025-12-03T20:00:00.000Z
description: Brief description for SEO
tags: [javascript, tutorial]
draft: false
lang: en
---
```

### Content Best Practices

- **Frontmatter**: Always include title, published, description, tags
- **Images**: Place in `src/assets/images/`, reference with relative paths
- **Code Blocks**: Include language tag for syntax highlighting
- **Math Notation**: Use `$inline$` or `$$block$$` with KaTeX
- **Diagrams**: Use mermaid code blocks for visualizations

### Testing Changes

```bash
# Type check
pnpm astro check

# Lint code
pnpm lint

# Build test
pnpm build

# Preview
pnpm preview
```

---

## 📚 Content Showcase

### Technical Writing Portfolio

This blog features **50+ technical articles** covering:

#### Algorithm & Data Structures Series
- **LeetCode Top Interview 150**: Step-by-step solutions with complexity analysis
- **Array Manipulation**: Two pointers, sliding window, prefix sum techniques
- **Dynamic Programming**: Memoization, tabulation, optimization strategies
- **String Algorithms**: Pattern matching, parsing, transformations

#### Web Development Articles
- **JavaScript Deep Dives**: Closures, async patterns, performance optimization
- **React Patterns**: Hooks, context, state management best practices
- **TypeScript Tips**: Advanced types, generics, utility types
- **CSS Techniques**: Modern layout, animations, responsive design

#### Problem-Solving Approach

Each article demonstrates:
- ✅ Clear problem statement and constraints
- ✅ Intuition and approach explanation
- ✅ Step-by-step solution walkthrough
- ✅ Complexity analysis (Time & Space)
- ✅ Code with detailed comments
- ✅ Visual diagrams (Mermaid)
- ✅ Mathematical notation (KaTeX)
- ✅ Alternative solutions comparison

### Bilingual Content

All major articles available in:
- 🇪🇸 **Spanish** (Primary): Native technical writing
- 🇬🇧 **English** (Secondary): Professional translations

---

## 🎯 Technical Highlights

### Code Quality

- ✅ **Type Safety**: 100% TypeScript with strict mode
- ✅ **Linting**: ESLint with Astro + TypeScript rules
- ✅ **Git Hooks**: Pre-commit validation with lint-staged
- ✅ **Code Formatting**: Consistent style with ESLint
- ✅ **Type Checking**: Astro Check + TypeScript compiler

### Performance Monitoring

- 📊 **Google Analytics 4**: User behavior and engagement tracking
- 📊 **Umami Analytics**: Privacy-focused alternative metrics
- 📊 **Lighthouse CI**: Automated performance audits (target: 100/100)

### SEO Implementation

- 🔍 **Meta Tags**: Comprehensive OpenGraph and Twitter Cards
- 🔍 **Structured Data**: JSON-LD for rich search results
- 🔍 **XML Sitemap**: Auto-generated with changefreq and priority
- 🔍 **RSS/Atom Feeds**: Multi-format content syndication
- 🔍 **Semantic HTML**: Proper heading hierarchy and landmarks

### Accessibility Features

- ♿ **ARIA Labels**: Comprehensive screen reader support
- ♿ **Keyboard Navigation**: Full site accessible via keyboard
- ♿ **Color Contrast**: WCAG AA compliant (4.5:1 minimum)
- ♿ **Focus Management**: Visible focus indicators
- ♿ **Alt Text**: All images include descriptive alt text

---

## 🗺️ Roadmap

### Completed ✅
- [x] Initial blog setup with Astro
- [x] Custom theme implementation
- [x] Bilingual support (ES/EN)
- [x] 50+ algorithm posts
- [x] Image optimization pipeline
- [x] SEO optimization
- [x] Dark/light mode toggle
- [x] RSS/Atom feeds

### In Progress 🚧
- [ ] Search functionality (Algolia/Pagefind)
- [ ] Related posts algorithm
- [ ] Newsletter subscription
- [ ] Advanced analytics dashboard

### Future Plans 🔮
- [ ] Interactive code playgrounds
- [ ] Video content integration
- [ ] Podcast episodes
- [ ] Community contributions
- [ ] API documentation section

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style (ESLint config)
- Add tests for new features (if applicable)
- Update documentation as needed
- Ensure all checks pass before submitting

---

## 📄 License

This project is based on the [Retypeset Theme](https://github.com/radishzzz/astro-theme-retypeset) and is available under the MIT License. See [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Professional Links

**Ramiro N. Cosa**
Full Stack Developer | Problem Solver | Technical Writer

- 🌐 **Website**: [ramirocosa.is-a.dev](https://ramirocosa.is-a.dev)
- 💼 **LinkedIn**: [linkedin.com/in/ramicosa](https://linkedin.com/in/ramicosa)
- 🐙 **GitHub**: [@radikeCosa](https://github.com/radikeCosa)
- 📧 **Email**: [ramirocosa@gmail.com](mailto:ramirocosa@gmail.com)
- 🐦 **Twitter/X**: [@ramiro_cosa](https://twitter.com/ramiro_cosa)

---

## 🙏 Acknowledgments

### Based On
- **[Retypeset Theme](https://github.com/radishzzz/astro-theme-retypeset)** - Beautiful print-inspired design

### Built With
- **[Astro](https://astro.build/)** - The web framework for content-driven websites
- **[UnoCSS](https://unocss.dev/)** - Instant on-demand atomic CSS engine
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript with syntax for types
- **[Sharp](https://sharp.pixelplumbing.com/)** - High-performance image processing

### Typography
- **[EarlySummer Serif](https://github.com/GuiWonder/EarlySummerSerif)** - Custom font for elegant reading experience

---

<div align="center">

### ⭐ If you find this project useful, please consider giving it a star!

**Made with ❤️ by [Ramiro N. Cosa](https://github.com/radikeCosa)**

</div>
