# Agent Instructions

Rules for all AI coding agents — Claude Code, OpenAI Codex (web + CLI), and others.
To override locally without editing this file: create `AGENTS.override.md` or `CLAUDE.override.md` (both gitignored).

> **Start every session by reading [`MEMORY.md`](./MEMORY.md).** It records architecture decisions, known gotchas, and context that is not obvious from the code. Update it whenever you make a significant decision or discover something worth preserving.

---

## Project overview

Vite 5 + React 18 website template with automated CI/CD. No backend, no AI SDK packages.

- **Every push** → automatic deploy to Netlify via GitHub Actions
- **Every PR** → preview deploy with URL posted as a sticky comment
- **i18n** — EN / PL / UK, switchable in the UI
- **Contact form** — Netlify Forms (blocked on preview to save quota)
- **Build metadata** — branch, commit, env, build time visible in the UI footer
- **SEO** — per-page `<title>` + `<meta description>`; `sitemap.xml` + `robots.txt` auto-generated at build time (production only; previews are blocked from crawlers)
- **Toast notifications** — `useToast()` hook, available app-wide via `ToastProvider` in `main.jsx`
- **Cookie consent** — GDPR banner, disabled by default; enable with `VITE_COOKIE_CONSENT=true`

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite 5 |
| Routing | React Router v6 (`BrowserRouter` in `main.jsx`) |
| SEO | `react-helmet-async` — `<SEO title="" description="">` component per page |
| Styling | Tailwind CSS v4 + CSS Modules + CSS custom properties (`src/styles/global.css`) |
| Animations | GSAP + @gsap/react (ScrollTrigger included) |
| Tests | Vitest + jsdom + @testing-library/react |
| i18n | Custom context (`src/lib/i18n.jsx`) — EN / PL / UK |
| Deploy | Netlify via GitHub Actions |

---

## Folder structure

```
src/
  App.jsx               — route definitions only (Routes + Route), no logic
  App.module.css
  main.jsx              — entry point + BrowserRouter + providers
  version.js            — build metadata, do not modify
  components/
    Layout/             — persistent shell: Nav + <main> + Footer
    Nav/                — sticky top bar: site name, nav links, theme/language switchers
    Footer/             — copyright + BuildBadge
    NotFound/           — 404 page, rendered by the * catch-all route
    ErrorBoundary/      — catches React crashes; shows debug info in non-production only
    SEO/                — per-page <title> + <meta description> via react-helmet-async
    Toast/              — toast notification UI; logic in src/lib/toast.jsx
    CookieBanner/       — GDPR consent banner; logic in src/lib/cookieConsent.jsx
    Skeleton/           — shimmer loading placeholder for async data
    Modal/              — accessible dialog; wraps native <dialog> element
    AboutPage/          — example second page (copy this pattern when adding pages)
    PageHeader/         — home page hero section (GSAP animations)
    MyComponent/
      MyComponent.jsx        — one default export, one responsibility, max ~80 lines
      MyComponent.module.css — scoped styles, named after component
      MyComponent.test.jsx   — unit test co-located here
      index.js               — export { default } from './MyComponent'
  hooks/                — custom hooks (useXxx.js)
  lib/                  — context providers, non-UI utilities
  locales/              — en.js · pl.js · uk.js
  styles/
    global.css          — all design tokens as CSS custom properties + utility classes, imported once in main.jsx
  config/index.js       — app config from VITE_* env vars
test/
  setup.js                     — Vitest global setup
  *.integration.test.{js,jsx}  — integration tests only (unit tests live in component folders)
features/
  *.feature             — Gherkin BDD scenarios
  steps/                — Playwright step definitions
public/
  logo.svg · favicon.svg
  _redirects            — Netlify SPA rule: /* /index.html 200
  images/               — static images → /images/<file>
  images/placeholders/  — fallback SVGs for missing images
vite.plugins.js         — custom Vite plugins: sitemapPlugin + robotsPlugin (generated at build time)
.github/
  workflows/deploy.yml  — build + deploy only, no tests
  hooks/pre-commit      — test gate (npm run setup-hooks to install)
```

---

## Commands

```sh
npm run dev            # http://localhost:5173
npm test               # run once (required before every commit)
npm run test:watch     # watch mode
npm run test:coverage  # coverage → coverage/
npm run test:bdd       # BDD acceptance tests (Playwright + Gherkin)
npm run test:bdd:ui    # BDD tests in headed browser (for debugging)
npm run build          # production build → dist/ (also generates sitemap.xml + robots.txt)
npm run setup-hooks    # install pre-commit hook (once after clone)
```

---

## Environment variables

All `VITE_*` variables are embedded into the browser bundle at build time. See `.env.example` for the full list.

| Variable | Required | Description |
|---|---|---|
| `VITE_APP_NAME` | no | Display name used in Nav, page title, footer. Default: `AI Starter` |
| `VITE_APP_URL` | no | Production domain (e.g. `https://example.com`). Used for `og:image` and `sitemap.xml`. Netlify's `URL` env var is used as an automatic fallback — only set this if you have a custom domain |
| `VITE_COOKIE_CONSENT` | no | Set to `true` to show the GDPR cookie consent banner. Default: `false` (hidden) |
| `VITE_ENV` | CI only | One of `development` \| `preview` \| `production`. Injected by GitHub Actions |
| `VITE_BRANCH`, `VITE_COMMIT`, `VITE_BUILD_TIME` | CI only | Injected by GitHub Actions for the build badge |

---

## Workflow — follow this order for every change

1. Make your code changes
2. Run `npm test` — fix any failures before proceeding
3. If you changed `vite.config.js`, `main.jsx`, or any `src/styles/` file, also run `npm run build` to catch build errors
4. Review `MEMORY.md` before every commit — the pre-commit hook blocks if `Last updated` is not today's date:
   - Remove or update anything that is no longer accurate
   - Add new architecture decisions, patterns, providers, or gotchas introduced by the current changes
   - Update the last line to: `Last updated: YYYY-MM-DD — <short summary of what changed>`
   - If this commit changes nothing worth documenting, still update the date to confirm you reviewed
5. Commit only when all tests pass

CI does **not** run tests. You are the gate. Never commit if tests fail.

---

## Creating a new component

Follow these steps exactly for every new component:

1. Create folder: `src/components/MyComponent/`
2. Create `MyComponent.jsx` — one default export, one responsibility, max ~80 lines
3. Create `MyComponent.module.css` — use only `var(--token-name)` from `global.css`, no hardcoded values
4. Create `MyComponent.test.jsx` — test behaviour, not internals
5. Create `index.js`:
   ```js
   export { default } from './MyComponent'
   ```
6. Add any user-visible strings to **all three** locale files: `en.js`, `pl.js`, `uk.js`
7. Import in the parent via `from '../MyComponent'` (the folder, never the internal file)

---

## Adding a new page

Follow these steps exactly every time you add a page:

1. Create the page component: `src/components/AboutPage/AboutPage.jsx` (and `.module.css`, `.test.jsx`, `index.js`)
2. Add a `<Route>` in `App.jsx`:
   ```jsx
   <Route path="/about" element={<AboutPage />} />
   ```
3. Add a `<NavLink>` in `Nav.jsx`:
   ```jsx
   <li><NavLink to="/about">{t.navAbout}</NavLink></li>
   ```
4. Add the nav label to **all three** locale files: `navAbout` in `en.js`, `pl.js`, `uk.js`
5. Add any other page-specific strings to all three locale files
6. Run `npm test` — fix any failures before committing

No changes needed to `_redirects`, `BrowserRouter`, or `Layout` — they handle all routes automatically.

---

## Components

- One default export per file. No multi-component files.
- Logic in hooks (`src/hooks/useXxx.js`), not in JSX.
- No prop drilling more than 2 levels — use context.

**Design patterns:**

| Pattern | When |
|---|---|
| Container / Presenter | component fetches or transforms data |
| Custom Hook | logic used by 2+ components, or >10 lines |
| Compound Component | related UI group (Form + Field + Input + Error) |
| Provider Pattern | global state — see `I18nProvider` as reference |

---

## Styling

Three layers work together — apply them in this order of preference:

### Layer 1 — `global.css` (foundation)

`src/styles/global.css` is the single source of truth for design tokens.
Structure (order matters):
```css
@import "tailwindcss"           /* Tailwind base/utilities/reset — must be first */
@custom-variant dark (...)      /* wires dark: prefix to data-theme="dark" */

:root { --color-bg: #f8fafc; }  /* design tokens as CSS custom properties */
[data-theme="dark"] { ... }     /* dark mode token overrides */
body { ... }                    /* global element styles */
.section-heading { ... }        /* shared utility classes (3+ components only) */
```

### Layer 2 — CSS Modules (component-scoped)

`ComponentName.module.css` in the component folder. Use for:
- Component-specific styles that reference `var(--token-name)` tokens
- State-driven variants (`.active`, `.open`) — never use inline styles for these

Always use `var(--token-name)`. Never hardcode colors, spacing, or font sizes.

**Typography quick reference:**

| Token | Value | Use for |
|---|---|---|
| `--font-size-h1` | 48px | Page hero / display |
| `--font-size-h2` | 36px | Page title |
| `--font-size-h3` | 28px | Section heading |
| `--font-size-h4` | 20px | Sub-heading |
| `--font-size-md` | 16px | Large body / comfortable reading |
| `--font-size-base` | 14px | Default body copy |
| `--font-size-sm` | 12px | Helper text, secondary labels |
| `--font-size-xs` | 11px | Captions, badges, fine print |
| `--line-height-tight` | 1.2 | Headings |
| `--line-height-normal` | 1.5 | Body (default) |
| `--line-height-relaxed` | 1.75 | Long-form reading |
| `--letter-spacing-tight` | -0.025em | Large headings |
| `--letter-spacing-wide` | 0.05em | Labels, ALL CAPS |

```css
/* correct */
color: var(--color-text-muted);
padding: var(--space-md);
font-size: var(--font-size-h2);

/* wrong */
color: #64748b;
padding: 16px;
font-size: 36px;
```

Use `@apply` to compose Tailwind utilities inside a module when inline classes would be too verbose:
```css
.btn {
  @apply px-4 py-2 rounded-md font-medium transition-colors;
  background-color: var(--color-primary); /* token for brand color */
}
```

### Layer 3 — Tailwind utilities (inline on JSX)

Use directly in `className` for layout, spacing, responsive, and dark variants:
```jsx
<div className="flex items-center gap-4 dark:bg-slate-900 md:flex-row">
```

### Decision rule — which layer to use

| Situation | Use |
|---|---|
| Layout, flexbox, grid, padding, margin | Tailwind utility class |
| Dark mode variants | Tailwind `dark:` prefix |
| Colors, type sizes, shadows from the token system | `var(--token-name)` in CSS Module |
| State-driven variants (`.active`, `.open`) | CSS Module class |
| Pattern repeated in 3+ components | Global utility class in `global.css` |
| Truly dynamic values (`width: progress + '%'`) | Inline `style={{}}` |

### Other rules

- **Global utility classes** (defined in `global.css`) for patterns used in 3+ components — e.g. `.section-heading`.
  Use with `className="section-heading"` (no import needed).

- **Inline styles only for truly dynamic values** — e.g. `style={{ width: progress + '%' }}`.
  State-driven variants (active/inactive) go in CSS module classes, not inline styles.

- **No additional CSS frameworks** (no MUI, Bootstrap, styled-components, emotion).
  Tailwind CSS v4 utility classes are allowed alongside CSS Modules.

---

## Internationalisation

Every user-visible string must go through i18n:

```js
const { t } = useTranslation()
<h1>{t.pageTitle}</h1>   // not: <h1>My Title</h1>
```

Add new keys to **all three** locale files at once: `en.js`, `pl.js`, `uk.js`. Never one without the others.
Keys: `camelCase`, feature-scoped — e.g. `contactFormTitle`.

---

## SEO

Every page must include the `SEO` component to set the `<title>` and `<meta description>`:

```jsx
import SEO from '../SEO'

export default function MyPage() {
  const { t } = useTranslation()
  return (
    <div>
      <SEO title={t.myPageTitle} description={t.myPageMetaDesc} />
      {/* page content */}
    </div>
  )
}
```

- `title` is combined with the site name automatically: `"My Page | Site Name"`
- If `title` is omitted, only the site name is shown (use on the home page)
- Add `myPageTitle` and `myPageMetaDesc` to **all three** locale files
- Tests that render a component using `SEO` must wrap with `<HelmetProvider>` (from `react-helmet-async`)

---

## Toast notifications

Use `useToast()` to show success, error, warning, or info messages from any component:

```jsx
import { useToast } from '../lib/toast'

export default function MyComponent() {
  const { toast } = useToast()

  function handleSave() {
    toast.success('Saved!')           // auto-dismisses after 4 s
    toast.error('Something failed')   // auto-dismisses after 6 s
    toast.warning('Check your input') // auto-dismisses after 5 s
    toast.info('Loading...')          // auto-dismisses after 4 s
  }
}
```

Pass a custom duration (ms) as a second argument: `toast.success('Done', { duration: 2000 })`.

- `ToastProvider` is already mounted in `main.jsx` — no setup needed in individual components
- Toast messages are plain strings passed by the caller — localise them at the call site with `t.keyName`
- Tests that use `useToast()` must wrap with `<ToastProvider>` (inside `<I18nProvider>`)

---

## Cookie consent (GDPR)

The banner is **disabled by default**. To enable it, set `VITE_COOKIE_CONSENT=true` in your environment.

Gate analytics or tracking scripts behind the consent check:

```jsx
import { useCookieConsent } from '../lib/cookieConsent'

export default function Analytics() {
  const { hasConsented } = useCookieConsent()
  if (!hasConsented) return null
  // load analytics only after explicit acceptance
}
```

---

## Skeleton loader

Use `<Skeleton>` while async data is fetching to prevent blank UI:

```jsx
import Skeleton from '../Skeleton'

// Single elements
<Skeleton />                          // full-width text line (default)
<Skeleton variant="heading" />        // 60% wide, thicker
<Skeleton variant="avatar" />         // 40×40 circle
<Skeleton variant="image" />          // full-width 200px block
<Skeleton variant="card" />           // full-width 120px block

// Multiple text lines (last line is 70% wide)
<Skeleton lines={3} />

// Custom size
<Skeleton width="120px" height="80px" />
```

No provider, no context — import and use directly. `aria-hidden="true"` is set automatically.

---

## Modal / Dialog

Use `<Modal>` for popups, confirmations, and forms:

```jsx
import { useState } from 'react'
import Modal from '../Modal'

export default function MyComponent() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm delete">
        <p>This action cannot be undone.</p>
        <button onClick={() => setOpen(false)}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
      </Modal>
    </>
  )
}
```

- Closes on: ✕ button, Escape key, backdrop click
- Locks body scroll while open; restores on close
- `title` is optional — omit for a bare container
- Tests must mock `HTMLDialogElement.prototype.showModal` and `.close` (jsdom does not implement them)

---

- `CookieConsentProvider` is already mounted in `main.jsx`
- `consent`: `'accepted'` | `'declined'` | `null` (null = not yet decided)
- `hasConsented`: `true` only when explicitly accepted — use this as the gate
- Choice is persisted to `localStorage` key `cookie-consent`
- Tests must mock `../../config` to set `cookieConsentEnabled: true`

---

## Testing

- Unit tests: co-located — `ComponentName/ComponentName.test.jsx`.
- Integration tests: `test/` folder only.
- Test behaviour, not internals. Use `@testing-library/react`.
- Never mock project modules. Mock only external I/O (fetch, localStorage).
- Update `test/setup.js` when adding compile-time constants (`__FOO__`).

### BDD acceptance tests (Playwright + Gherkin)

BDD tests live in `features/`:
```
features/
  *.feature          — Gherkin scenarios (one file per user-facing feature)
  steps/
    *.steps.js       — step definitions (shared across features)
```

**Rule: every UI bug fix must include a BDD scenario before committing.**

When fixing a UI bug:
1. Write a `.feature` scenario that reproduces the bug (it should fail before your fix).
2. Apply the fix.
3. Run `npm run test:bdd` — the scenario must pass.
4. Only then run `npm test` and commit.

The Gherkin scenario goes in the relevant `features/*.feature` file (or a new one if none fits).
Step definitions go in `features/steps/` — reuse existing steps where possible, add new ones in a new file named after the feature area.

**Adding a new BDD scenario:**
1. Write the `Scenario:` block in the `.feature` file in plain English.
2. Run `npm run test:bdd` — `bddgen` will print missing step definitions.
3. Implement missing steps in `features/steps/`.
4. Run `npm run test:bdd` until green.

---

## Commit messages

Use the format: `type: short description` (imperative, lowercase, no period)

| Type | When |
|---|---|
| `feat` | new feature or component |
| `fix` | bug fix |
| `style` | CSS / visual changes only |
| `refactor` | restructuring without behaviour change |
| `test` | adding or fixing tests |
| `docs` | README, AGENTS.md, comments |
| `chore` | config, deps, tooling |

Examples: `feat: add hero image component` · `fix: block form on preview` · `style: update badge env colors`

---

## Security

- Never commit `.env`, `.env.local`, or any file containing secrets or API keys.
- Never add backend code or Netlify Functions unless explicitly asked.
- Never add AI SDK packages — the app is used BY agents, not WITH them.
- The contact form blocks submissions outside production — do not remove this guard.
- Do not commit `coverage/`, `dist/`, `node_modules/`.

---

## Do not

- Hardcode colors, spacing, or font sizes — use `var(--token-name)` from `global.css` or Tailwind utilities.
- Write inline styles for static values — use CSS module classes.
- Put logic (data fetching, transformations, state) in JSX — extract to a custom hook.
- Create files with more than one component.
- Put unit tests in `test/` — they belong in the component folder.
- Import from internal component paths — always import from the folder (`../MyComponent`).
- Add new locale keys to only one or two locale files — always update all three.
- Run `npm test` in CI — it runs only via the pre-commit hook.
- Modify `src/version.js` — it is auto-generated at build time.
- Add `robots.txt` or `sitemap.xml` to `public/` — both are generated at build time by `vite.plugins.js`.
- Modify the robots/sitemap behaviour without understanding the env logic — production gets `Allow: /` + sitemap; preview/dev gets `Disallow: /` and no sitemap.
