import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import process from 'node:process'
import { themeConfig } from '../src/config'

// Process file path
const rawPath = process.argv[2] ?? 'new-post'
const baseName = basename(rawPath).replace(/\.(md|mdx)$/, '')
const slug = baseName
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^a-z0-9-]/g, '')

// File paths
const esFile = join('src/content/posts', `${slug}.md`)
const enFile = join('src/content/posts', `${slug}.en.md`)

// Check if files already exist
if (existsSync(esFile)) {
  console.error(`❌ Spanish file already exists: ${esFile}`)
  process.exit(1)
}
if (existsSync(enFile)) {
  console.error(`❌ English file already exists: ${enFile}`)
  process.exit(1)
}

// Create directory structure
mkdirSync(dirname(esFile), { recursive: true })

// Prepare common content
const defaultTags = ['algoritmos']
const detectedTags: string[] = []

if (baseName.toLowerCase().includes('leetcode')) {
  detectedTags.push('leetcode')
}
if (baseName.toLowerCase().includes('freecodecamp')) {
  detectedTags.push('freecodecamp')
}
if (baseName.toLowerCase().includes('daily')) {
  detectedTags.push('daily')
}

const tags = [...new Set([...defaultTags, ...detectedTags])]

const publishedDate = new Date().toISOString()

// Function to generate frontmatter
function generateFrontmatter(lang: string) {
  return `---
title: "${baseName}"
published: ${publishedDate}
description: ''
updated: ''
tags:
${tags.map(tag => `  - ${tag}`).join('\n')}
draft: false
pin: 0
toc: ${themeConfig.global.toc}
lang: "${lang}"
abbrlink: "${slug}"
---
`
}

// Content for Spanish file
const esContent = generateFrontmatter('es')

// Content for English file
const enContent = generateFrontmatter('en')

// Write Spanish file
try {
  writeFileSync(esFile, esContent)
  console.log(`✅ Spanish post created: ${esFile}`)
}
catch (error) {
  console.error('❌ Failed to create Spanish post:', error)
  process.exit(1)
}

// Write English file
try {
  writeFileSync(enFile, enContent)
  console.log(`✅ English post created: ${enFile}`)
}
catch (error) {
  console.error('❌ Failed to create English post:', error)
  process.exit(1)
}
