import { defineConfig, devices } from '@playwright/test'
import { defineBddConfig } from 'playwright-bdd'

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps:    'features/steps/**/*.js',
})

export default defineConfig({
  testDir,
  timeout: 30_000,
  use: {
    baseURL:     'http://localhost:5173',
    headless:    true,
    screenshot:  'only-on-failure',
    video:       'off',
  },
  webServer: {
    command:            'npm run dev',
    url:                'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout:            20_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  reporter: [['list'], ['html', { open: 'never' }]],
})
