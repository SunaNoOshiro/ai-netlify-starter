import { createBdd } from 'playwright-bdd'
import { expect }    from '@playwright/test'

const { Given, Then } = createBdd()

Given('I open the home page', async ({ page }) => {
  await page.goto('/')
})

// ── Build badge ─────────────────────────────────────────────────────────────

Then('I should see the build badge', async ({ page }) => {
  await expect(page.locator('[data-env]')).toBeVisible()
})

Then('the badge shows a branch name', async ({ page }) => {
  const badge = page.locator('[data-env]')
  await expect(badge).toContainText('branch:')
  // branch value must be a non-empty string
  const text = await badge.innerText()
  expect(text).toMatch(/branch:\s*\S+/)
})

Then('the badge shows a commit hash', async ({ page }) => {
  const badge = page.locator('[data-env]')
  await expect(badge).toContainText('commit:')
  const text = await badge.innerText()
  expect(text).toMatch(/commit:\s*\S+/)
})

Then('the badge environment label is visible', async ({ page }) => {
  const badge = page.locator('[data-env]')
  const label = badge.locator('span').first()
  await expect(label).toBeVisible()
  const text = await label.innerText()
  expect(['PROD', 'PREVIEW', 'DEV']).toContain(text)
})
