import { parseRoutePaths } from '../vite.plugins.js'

describe('parseRoutePaths', () => {
  it('extracts a single route', () => {
    const src = `<Route path="/about" element={<AboutPage />} />`
    expect(parseRoutePaths(src)).toEqual(['/about'])
  })

  it('extracts multiple routes', () => {
    const src = `
      <Route path="/"      element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
    `
    expect(parseRoutePaths(src)).toEqual(['/', '/about'])
  })

  it('skips the catch-all * route', () => {
    const src = `
      <Route path="/"  element={<Home />} />
      <Route path="*"  element={<NotFound />} />
    `
    expect(parseRoutePaths(src)).toEqual(['/'])
  })

  it('handles multi-line Route declarations', () => {
    const src = `
      <Route
        path="/contact"
        element={<ContactPage />}
      />
    `
    expect(parseRoutePaths(src)).toEqual(['/contact'])
  })

  it('returns empty array when no routes present', () => {
    expect(parseRoutePaths('<div>no routes here</div>')).toEqual([])
  })

  it('handles deeply nested paths', () => {
    const src = `<Route path="/blog/posts" element={<Blog />} />`
    expect(parseRoutePaths(src)).toEqual(['/blog/posts'])
  })
})
