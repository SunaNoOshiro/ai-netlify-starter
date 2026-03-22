// Global test setup for Vitest + jsdom.
// Add any global mocks or matchers here.

// Stub out Vite compile-time constants so tests don't blow up on undefined globals.
global.__BRANCH__    = 'test-branch'
global.__COMMIT__    = 'abc1234'
global.__BUILD_TIME__ = '2024-01-01T00:00:00Z'
global.__ENV__       = 'test'

// jsdom does not implement matchMedia — stub it out.
window.matchMedia = window.matchMedia || function (query) {
  return {
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }
}
