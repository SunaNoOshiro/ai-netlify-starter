import { readFileSync } from 'fs'
import { resolve } from 'path'

/**
 * Parses <Route path="..."> values from a JSX source string.
 * Handles single-line and multi-line Route declarations.
 * Skips the catch-all '*' route — it is not a real URL.
 */
export function parseRoutePaths(src) {
  return [...src.matchAll(/<Route[\s\S]*?path="([^"*][^"]*)"/g)]
    .map(m => m[1])
}

/** Reads App.jsx and returns its route paths. */
function getRoutesFromApp() {
  const src = readFileSync(resolve('./src/App.jsx'), 'utf8')
  return parseRoutePaths(src)
}

/**
 * Generates dist/sitemap.xml by parsing routes from src/App.jsx.
 * Uses VITE_APP_URL as the hostname (fallback: https://example.com).
 */
export function sitemapPlugin(hostname) {
  return {
    name: 'generate-sitemap',
    generateBundle() {
      const now = new Date().toISOString()
      const urls = getRoutesFromApp()
        .map(path => `\n  <url>\n    <loc>${hostname}${path}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`)
        .join('')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}\n</urlset>\n`,
      })
    },
  }
}

/**
 * Generates dist/robots.txt pointing to the correct sitemap URL.
 * Uses VITE_APP_URL as the hostname (fallback: https://example.com).
 */
export function robotsPlugin(hostname) {
  return {
    name: 'generate-robots-txt',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${hostname}/sitemap.xml\n`,
      })
    },
  }
}
