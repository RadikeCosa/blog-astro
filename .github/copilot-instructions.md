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

### Component Communication
- Components in `src/components/` follow a modular design, enabling reuse and customization.
- Comment systems (Giscus, Twikoo, Waline) are integrated via `src/components/Comment/`.
- Widgets like TOC, ImageZoom, and MediaEmbed are in `src/components/Widgets/`.

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

### Debugging Tips
- Use `pnpm dev` for a live development server with hot-reloading.
- Check `src/plugins/` for custom markdown and rehype plugins if content rendering issues arise.
- Logs for image processing and LQIP generation are in `scripts/apply-lqip.ts`.

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

## Drafting Posts

### Workflow for Drafting Posts
When creating a new post, the initial workflow involves pasting your raw notes into the newly created markdown file. These notes may be unordered or loosely structured. The AI agent's role is to:

1. **Organize Content**: Rearrange the notes into a logical structure with clear sections (e.g., introduction, body, conclusion).
2. **Enhance Readability**: Ensure the post is easy to read by improving sentence flow, grammar, and clarity.
3. **Add Comments**: Provide inline comments or suggestions for areas that need further elaboration or clarification.
4. **Ensure Coherence**: Verify that the post has a consistent tone and style, and that ideas are presented in a coherent manner.
5. **Optimize Structure**: Suggest or implement headings, subheadings, and formatting to make the post visually appealing and easy to navigate.

### Tips for Effective Collaboration
- Paste your notes as comprehensively as possible, even if they are unordered.
- Highlight any specific points or sections you want the agent to focus on.
- **Iterative Editing**: When editing posts, provide suggestions one at a time and implement them individually rather than making multiple changes at once. This allows for better review and refinement of each improvement.
- Review the AI's edits and suggestions, and iterate as needed to finalize the post.

This workflow aims to streamline the drafting process, ensuring high-quality, well-structured blog posts with minimal effort.

### Enhancing Posts with Visual and Educational Elements

To make posts more engaging and educational, the following resources should be utilized whenever possible:

1. **Mathematical Notation**:
   - Use KaTeX for rendering mathematical expressions. KaTeX is already integrated into the project via `rehype-katex` and `remark-math` plugins.
   - Inline math can be written as `$...$`, and block math as `$$...$$`.
   - Example:
     ```markdown
     The quadratic formula is given by:
     $$
     x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
     $$
     ```

2. **Diagrams and Flowcharts**:
   - Use Mermaid for creating diagrams, flowcharts, and other visualizations. Mermaid is supported via the `rehype-mermaid` plugin.
   - Example:
     ```markdown
     ```mermaid
     graph TD
     A[Start] --> B{Is it working?}
     B -- Yes --> C[Great!]
     B -- No --> D[Fix it]
     D --> B
     ```
     ```

3. **Other Visual Enhancements**:
   - Include images with meaningful alt text to ensure accessibility and automatic figure captions.
   - Use tables, lists, and code blocks to structure information clearly.

By incorporating these elements, posts can be made more interactive, visually appealing, and easier to understand.

### Language Guidelines

- The primary language for posts is Spanish (Castellano).
- Once a post is finalized, it should be translated into English to ensure accessibility for a broader audience.
- Maintain consistency in tone and style between the Spanish and English versions, adapting idiomatic expressions as needed for clarity and cultural relevance.

### Post Internationalization (i18n) Setup

When creating multilingual posts, follow this specific pattern to ensure proper i18n functionality:

**Spanish version** (`post-name.md`):
```yaml
lang: 'es'
abbrlink: 'unique-post-identifier'
```

**English version** (`post-name.en.md`):
```yaml
lang: 'en'
abbrlink: 'unique-post-identifier'  # Same as Spanish version
```

Both versions must share the **same `abbrlink`** but have **different `lang` values**. This allows the i18n system to recognize them as translations of the same post. The `lang` field is required for proper routing and language detection.