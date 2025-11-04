import type { Preset } from 'unocss'
import {
  defineConfig,
  presetAttributify,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetTheme from 'unocss-preset-theme'
import { themeConfig } from './src/config.ts'

const { light, dark } = themeConfig.color

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetTheme({
      theme: {
        dark: {
          colors: {
            ...dark,
            // Updated container colors for dark mode - more muted and professional
            note: 'oklch(65% 0.08 240 / 0.8)', // muted blue
            tip: 'oklch(65% 0.08 160 / 0.8)', // muted green
            important: 'oklch(65% 0.08 280 / 0.8)', // muted purple
            warning: 'oklch(65% 0.08 60 / 0.8)', // muted orange
            caution: 'oklch(65% 0.08 20 / 0.8)', // muted red
          },
        },
      },
    }) as Preset<object>,
  ],
  theme: {
    colors: {
      ...light,
      // Updated container colors for light mode - subtle and professional
      note: 'oklch(55% 0.12 240 / 0.8)', // subtle blue
      tip: 'oklch(55% 0.12 160 / 0.8)', // subtle green
      important: 'oklch(55% 0.12 280 / 0.8)', // subtle purple
      warning: 'oklch(55% 0.12 60 / 0.8)', // subtle orange
      caution: 'oklch(55% 0.12 20 / 0.8)', // subtle red
    },
    fontFamily: {
      // Simplified font stack for tech blog - clean and modern
      title: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      navbar: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      time: ['ui-monospace', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'source-code-pro', 'Menlo', 'Consolas', 'DejaVu Sans Mono', 'monospace'],
      serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    },
  },
  rules: [
    ['scrollbar-hidden', {
      'scrollbar-width': 'none',
      '-ms-overflow-style': 'none',
    }],
  ],
  shortcuts: {
    'uno-desktop-column': 'fixed right-[max(5rem,calc(50vw-35rem))] w-14rem',
    'uno-decorative-line': 'mb-4.5 h-0.25 w-10 bg-secondary/25 lg:(mb-6 w-11)',
    'uno-round-border': 'border border-secondary/5 rounded border-solid',
  },
  variants: [
    (matcher) => {
      if (!matcher.startsWith('cjk:')) {
        return matcher
      }
      return {
        matcher: matcher.slice(4),
        selector: s => `${s}:is(:lang(zh), :lang(ja), :lang(ko))`,
      }
    },
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
