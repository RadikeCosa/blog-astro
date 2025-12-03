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
            // Enhanced container colors for dark mode - balanced vibrancy
            note: 'oklch(62% 0.10 240 / 0.85)', // refined blue with depth
            tip: 'oklch(62% 0.10 160 / 0.85)', // fresh green
            important: 'oklch(62% 0.10 280 / 0.85)', // elegant purple
            warning: 'oklch(62% 0.10 50 / 0.85)', // warm orange
            caution: 'oklch(62% 0.10 15 / 0.85)', // alert red
          },
        },
      },
    }) as Preset<object>,
  ],
  theme: {
    colors: {
      ...light,
      // Enhanced container colors for light mode - vibrant but professional
      note: 'oklch(52% 0.14 240 / 0.85)', // clear blue
      tip: 'oklch(52% 0.14 160 / 0.85)', // vibrant green
      important: 'oklch(52% 0.14 280 / 0.85)', // rich purple
      warning: 'oklch(52% 0.14 50 / 0.85)', // bright orange
      caution: 'oklch(52% 0.14 15 / 0.85)', // strong red
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
