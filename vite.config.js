import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Build metadata baked in at compile time via GitHub Actions env vars.
  // Falls back to local dev defaults.
  define: {
    __BRANCH__:    JSON.stringify(process.env.VITE_BRANCH     || 'local'),
    __COMMIT__:    JSON.stringify(process.env.VITE_COMMIT     || 'dev'),
    __BUILD_TIME__: JSON.stringify(process.env.VITE_BUILD_TIME || new Date().toISOString()),
    __ENV__:       JSON.stringify(process.env.VITE_ENV        || 'development'),
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.js',
    exclude: ['**/node_modules/**', '**/dist/**', '.features-gen/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
    },
  },
})
