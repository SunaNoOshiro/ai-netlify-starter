import { execSync } from 'child_process'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const dist = (file) => resolve('./dist', file)

// Run once before all tests in this file.
beforeAll(() => {
  execSync('npm run build', { stdio: 'pipe' })
}, 30_000)

describe('build output — sitemap.xml', () => {
  it('is generated', () => {
    expect(existsSync(dist('sitemap.xml'))).toBe(true)
  })

  it('contains the home route', () => {
    const xml = readFileSync(dist('sitemap.xml'), 'utf8')
    expect(xml).toContain('<loc>https://example.com/</loc>')
  })

  it('contains the about route', () => {
    const xml = readFileSync(dist('sitemap.xml'), 'utf8')
    expect(xml).toContain('<loc>https://example.com/about</loc>')
  })

  it('does not contain the catch-all * route', () => {
    const xml = readFileSync(dist('sitemap.xml'), 'utf8')
    expect(xml).not.toContain('*')
  })

  it('uses VITE_APP_URL when set', () => {
    execSync('VITE_APP_URL=https://mysite.com npm run build', { stdio: 'pipe' })
    const xml = readFileSync(dist('sitemap.xml'), 'utf8')
    expect(xml).toContain('<loc>https://mysite.com/</loc>')
  }, 30_000)
})

describe('build output — robots.txt', () => {
  it('is generated', () => {
    expect(existsSync(dist('robots.txt'))).toBe(true)
  })

  it('allows all crawlers', () => {
    const txt = readFileSync(dist('robots.txt'), 'utf8')
    expect(txt).toContain('User-agent: *')
    expect(txt).toContain('Allow: /')
  })

  it('points Sitemap to the correct hostname', () => {
    const txt = readFileSync(dist('robots.txt'), 'utf8')
    expect(txt).toContain('Sitemap: https://mysite.com/sitemap.xml')
  })
})
