import type { APIRoute } from 'astro'
import { base } from '@/config'

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site)

  const robotsTxt = [
    '# Robots.txt for Ramiro N. Cosa - Full Stack Developer Blog',
    '# Generated automatically by Astro',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    '# Block crawling of technical/admin directories',
    `Disallow: ${base}/_astro/`,
    `Disallow: ${base}/feeds/`,
    `Disallow: ${base}/giscus/`,
    `Disallow: ${base}/og/`,
    `Disallow: ${base}/~partytown/`,
    '',
    '# Block crawling of draft content',
    `Disallow: ${base}/drafts/`,
    `Disallow: ${base}/admin/`,
    `Disallow: ${base}/private/`,
    '',
    '# Allow access to important files',
    'Allow: /favicon.ico',
    'Allow: /robots.txt',
    'Allow: /sitemap*.xml',
    '',
    '# Crawl delay for respectful crawling',
    'Crawl-delay: 1',
    '',
    '# Sitemap location',
    `Sitemap: ${sitemapURL.href}`,
    '',
    '# Additional sitemaps for RSS feeds',
    `Sitemap: ${new URL('rss.xml', site).href}`,
    `Sitemap: ${new URL('atom.xml', site).href}`,
  ].join('\n')

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  })
}
