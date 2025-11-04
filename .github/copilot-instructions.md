# Copilot Instructions for Retypeset Blog Theme

## Architecture Overview

This is **Retypeset**, a multilingual Astro blog theme focused on typography and paper-book-like reading experience. The architecture follows these patterns:

### Core Configuration Flow
- `src/config.ts` - Central theme configuration hub with typography, i18n, and feature settings
- `astro.config.ts` - Astro framework config with markdown processing pipeline
- `uno.config.ts` - UnoCSS utility styling with custom typography font stacks
- `src/content.config.ts` - Content collections schema for posts and about pages

### Internationalization (i18n) System
The site supports 11 languages with sophisticated routing:
- `src/i18n/config.ts` - Language mappings for different services (Giscus, Twikoo, Waline)
- `src/i18n/ui.ts` - Translated UI strings for each language
- Pages use `[...posts_slug].astro` pattern for localized routing
- Posts can specify `lang: ''` frontmatter to override default locale
- `abbrlink` frontmatter creates custom URL slugs independent of filename

### Content Processing Pipeline
Custom markdown plugins enhance content:
- `src/plugins/remark-reading-time.mjs` - Calculates reading time, stores in `remarkPluginFrontmatter.minutes`
- `src/plugins/rehype-image-processor.mjs` - Converts images to `<figure>` with captions from alt text
- `src/plugins/remark-container-directives.mjs` - Handles custom container syntax (:::note, :::tip)
- `src/plugins/rehype-code-copy-button.mjs` - Adds copy buttons to code blocks

## Development Workflows

### Creating Content
```bash
# Create new post with proper frontmatter template
pnpm new-post "Post Title"
pnpm new-post "nested/path/Post Title"  # Creates directory structure

# Format existing posts (applies autocorrect for CJK languages)
pnpm format-posts

# Apply LQIP (Low Quality Image Placeholders) after build
pnpm apply-lqip
```



### Build Process
```bash
pnpm dev     # Runs astro check + astro dev
pnpm build   # Runs astro check + astro build + apply-lqip
```

## Key Patterns & Conventions

### Post Frontmatter Schema
```yaml
title: string          # Required
published: date        # Required (YYYY-MM-DD format)
description: string    # Optional, defaults to ''
updated: date          # Optional
tags: string[]         # Optional, defaults to []
draft: boolean         # Optional, defaults to false
pin: number (0-99)     # Optional, pin priority (higher = more prominent)
toc: boolean          # Optional, inherits from themeConfig.global.toc
lang: string          # Optional, overrides default locale ('' = universal)
abbrlink: string      # Optional, custom URL slug (lowercase letters, numbers, hyphens only)
```

### Typography & Styling
- Custom font stacks defined in UnoCSS config: `font-title`, `font-navbar`, `font-time`, `font-serif`
- Color themes use OKLCH color space for better perceptual uniformity
- CJK language variant: Use `cjk:` prefix for Chinese/Japanese/Korean specific styles
- Responsive design uses custom UnoCSS shortcuts like `uno-desktop-column`, `uno-decorative-line`

### Component Architecture
- `src/layouts/Layout.astro` - Main layout with conditional comment system integration
- `src/components/Widgets/` - Reusable interactive components (TOC, ImageZoom, MediaEmbed)
- `src/components/Comment/` - Multi-provider comment system (Giscus, Twikoo, Waline)

### Routing & Pages
- `[...posts_slug].astro` - Dynamic post routing with language detection
- `[...tags_tag].astro` - Tag-based filtering pages
- `[...about].astro` - About pages with language variants
- `/og/` directory - Dynamic Open Graph image generation

### Content Organization
- `src/content/posts/` - Blog posts (supports nested directories)
- `src/content/about/` - About pages per language (`about-en.md`, `about-zh.md`)
- Posts can be universal (no `lang` specified) or language-specific

## Development Guidelines

### When Adding Features
1. Check `src/config.ts` for theme-level toggles before implementing
2. Consider i18n impact - add UI strings to `src/i18n/ui.ts` for all 11 languages
3. Use UnoCSS utilities; avoid custom CSS unless for complex interactions
4. Test with different `fontStyle` settings ('sans' vs 'serif')

### Content Migration
- Use `pnpm format-posts` after bulk content changes
- Ensure `abbrlink` uniqueness across all languages when specified
- Images should include meaningful alt text for automatic figure captions

### Performance Considerations
- LQIP system requires `pnpm apply-lqip` after adding images
- Remote images can use `themeConfig.preload.imageHostURL` for optimization
- Comment systems load via Partytown for better performance

This theme prioritizes reading experience, typography, and international accessibility while maintaining excellent performance.

## Personalization Guide for Programming Blog

### Step 1: Basic Site Configuration
Edit `src/config.ts` to customize:
```typescript
export const themeConfig: ThemeConfig = {
  site: {
    title: 'Your Name',                    // Your name or brand
    subtitle: 'Full Stack Developer',      // Your role/specialty
    description: 'Your bio and expertise', // SEO description
    author: 'Your Name',                   // Author name
    url: 'https://yourdomain.com',         // Your domain
    favicon: '/icons/favicon.svg',         // Your favicon
  },
  // Configure colors, fonts, and features
}
```

### Step 2: Content Structure Setup
- Replace `src/content/about/` files with your professional bio in supported languages
- Create your first post in `src/content/posts/` using `pnpm new-post "Hello World"`
- Update `public/icons/` with your brand assets (favicon, logo, etc.)

### Step 3: Social & SEO Configuration
Configure in `src/config.ts`:
- `footer.links` - Add your GitHub, LinkedIn, email, etc.
- `seo.twitterID` - Your Twitter/X handle
- `seo.verification` - Google Search Console, Bing verification codes
- `seo.googleAnalyticsID` or `seo.umamiAnalyticsID` - Analytics tracking

### Step 4: Comment System (Optional)
Choose and configure one in `src/config.ts`:
- **Giscus** (GitHub Discussions) - Best for developer blogs
- **Waline** - Self-hosted option
- **Twikoo** - Lightweight alternative

### Step 5: Styling Customization
- **Colors**: Modify `color.light` and `color.dark` in config
- **Typography**: Choose `fontStyle: 'sans'` or `'serif'`
- **Custom styles**: Add to `src/styles/extension.css`

### Development Workflow with Git Conventions
Use conventional commits (feat/fix/docs/style/refactor/chore):
```bash
# Configuration changes
git commit -m "feat: configure blog for [Your Name]"

# Content updates  
git commit -m "content: add professional bio and first post"

# Styling changes
git commit -m "style: customize color scheme and typography"

# Dependencies/tools
git commit -m "chore: update theme dependencies"
```

### Content Best Practices for Programming Blog
- Use meaningful tags: `['react', 'typescript', 'tutorial']`
- Include `toc: true` for technical posts
- Add `pin: 1-99` for important/featured posts
- Use `draft: true` while writing
- Leverage container directives: `:::tip`, `:::note`, `:::warning`