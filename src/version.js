// Build metadata injected at compile time via vite.config.js `define`.
// Falls back to import.meta.env for Netlify's own deploy context vars.
export const version = {
  branch:    (typeof __BRANCH__    !== 'undefined' ? __BRANCH__    : null) || import.meta.env.VITE_BRANCH    || 'local',
  commit:    (typeof __COMMIT__    !== 'undefined' ? __COMMIT__    : null) || import.meta.env.VITE_COMMIT    || 'dev',
  buildTime: (typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : null) || import.meta.env.VITE_BUILD_TIME || new Date().toISOString(),
  env:       (typeof __ENV__       !== 'undefined' ? __ENV__       : null) || import.meta.env.VITE_ENV       || 'development',
}
