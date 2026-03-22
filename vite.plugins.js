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

// Hostname for sitemap.xml and robots.txt.
// Source: VITE_APP_URL repo variable → injected by deploy.yml as an env var.
// Set it in GitHub → Settings → Variables → Actions → PRODUCTION_URL.
// Falls back to a placeholder so the build never fails — but sitemap/robots
// will contain example.com until the variable is set.
export const hostname = process.env.VITE_APP_URL || 'https://example.com'

if (process.env.VITE_ENV === 'production' && !process.env.VITE_APP_URL) {
  console.warn(
    '[vite-plugins] VITE_APP_URL is not set — sitemap and robots.txt will use "https://example.com".\n' +
    '               Add PRODUCTION_URL to GitHub → Settings → Variables → Actions.'
  )
}

// true only when building the production deploy
const isProduction = process.env.VITE_ENV === 'production'

/**
 * Generates dist/sitemap.xml by parsing routes from src/App.jsx.
 * Only emitted on production builds — previews don't need a sitemap.
 */
export function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    generateBundle() {
      if (!isProduction) return
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
 * Generates dist/robots.txt.
 * Production: allows all crawlers + points to sitemap.
 * Preview / development: blocks all crawlers (Disallow: /).
 */
export function robotsPlugin() {
  return {
    name: 'generate-robots-txt',
    generateBundle() {
      const source = isProduction
        ? `User-agent: *\nAllow: /\n\nSitemap: ${hostname}/sitemap.xml\n`
        : `# Preview deploy — do not index\nUser-agent: *\nDisallow: /\n`

      this.emitFile({ type: 'asset', fileName: 'robots.txt', source })
    },
  }
}
