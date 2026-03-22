import { execSync } from 'child_process'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const dist = (file) => resolve('./dist', file)

const buildProd = (env = '') =>
  execSync(`${env} VITE_ENV=production npm run build`, { stdio: 'pipe' })

const buildPreview = () =>
  execSync('VITE_ENV=preview npm run build', { stdio: 'pipe' })

// ── Production build ──────────────────────────────────────────────────────────
describe('production build — sitemap.xml', () => {
  beforeAll(() => buildProd('VITE_APP_URL=https://mysite.com'), 30_000)

  it('is generated', () => {
    expect(existsSync(dist('sitemap.xml'))).toBe(true)
  })

  it('contains the home route', () => {
    const xml = readFileSync(dist('sitemap.xml'), 'utf8')
    expect(xml).toContain('<loc>https://mysite.com/</loc>')
  })

  it('contains the about route', () => {
    const xml = readFileSync(dist('sitemap.xml'), 'utf8')
    expect(xml).toContain('<loc>https://mysite.com/about</loc>')
  })

  it('does not contain the catch-all * route', () => {
    const xml = readFileSync(dist('sitemap.xml'), 'utf8')
    expect(xml).not.toContain('*')
  })
})

describe('production build — robots.txt', () => {
  it('allows all crawlers', () => {
    const txt = readFileSync(dist('robots.txt'), 'utf8')
    expect(txt).toContain('User-agent: *')
    expect(txt).toContain('Allow: /')
  })

  it('points Sitemap to VITE_APP_URL', () => {
    const txt = readFileSync(dist('robots.txt'), 'utf8')
    expect(txt).toContain('Sitemap: https://mysite.com/sitemap.xml')
  })
})

// ── Preview build ─────────────────────────────────────────────────────────────
describe('preview build', () => {
  beforeAll(() => buildPreview(), 30_000)

  it('robots.txt blocks all crawlers', () => {
    const txt = readFileSync(dist('robots.txt'), 'utf8')
    expect(txt).toContain('Disallow: /')
    expect(txt).not.toContain('Allow: /')
  })

  it('does not generate sitemap.xml', () => {
    expect(existsSync(dist('sitemap.xml'))).toBe(false)
  })
})
