# Project Memory

Shared context for all AI agents working on this repo.
**Read this at the start of every session. Update it when you make a significant decision or change.**

---

## Architecture decisions

- **CSS-only tokens** — `tokens.js` and `shared.js` were deleted. `src/styles/global.css` is the single source of truth for all design values (CSS custom properties). Never re-introduce a JS token file.
- **Component co-location** — every component lives in its own folder (`ComponentName/`) with `.jsx`, `.module.css`, `.test.jsx`, `index.js`. No exceptions.
- **Single agent instructions file** — `AGENTS.md` contains all rules. `CLAUDE.md` is a one-line redirect to it.
- **No AI SDK** — this project is used *by* AI agents as a template, not *with* AI. Do not add AI/LLM packages.
- **Tailwind CSS v4** — added via `@tailwindcss/vite` plugin. `@import "tailwindcss"` is at the top of `global.css`. Dark mode uses `@custom-variant dark` pointing to `[data-theme="dark"]` to match `ThemeProvider`. Use Tailwind utilities for layout/spacing; CSS Modules for component-specific token-based styles.
- **GSAP + @gsap/react** — animation library. Always use `useGSAP` (not `useEffect`) for GSAP code; it handles cleanup automatically. Register plugins at module level (`gsap.registerPlugin(...)`). Three animated components serve as reference patterns:
  - `PageHeader` — entrance timeline (spin-scale logo, blur-fade title, desc stagger) + perpetual float loop
  - `ImageDemo` — ScrollTrigger card stagger (start: `top 85%`)
  - `ContactForm` — ScrollTrigger slide-in from right (start: `top 85%`)

## Theme system

- Three-state cycle: `auto` (follows system) → `light` → `dark` → `auto`
- `auto` = no localStorage entry; system `prefers-color-scheme` is followed live
- Manual overrides (`light`/`dark`) are saved to `localStorage` key `theme`
- Flash prevention: inline `<script>` in `index.html` applies theme before React mounts
- Provider: `src/lib/theme.jsx` — `ThemeProvider` + `useTheme`

## i18n system

- Three locales: `en.js`, `pl.js`, `uk.js` in `src/locales/`
- Every user-visible string (including `aria-label`, `placeholder`, `title`) must use `useTranslation()` → `t.keyName`
- When adding a key: add to **all three** locale files at once. Never one without the others.
- **Key naming convention:** `<pageName><Section><Descriptor>` camelCase — e.g. `homeHeroTitle`, `homeFormName`, `pricingPlanBasicLabel`. Never generic names like `title` or `label`.
- Provider: `src/lib/i18n.jsx` — `I18nProvider` + `useTranslation`

## CI/CD

- Tests run **only** via pre-commit hook — CI does not run tests
- Preview deploy on every PR; PR comment posts the deploy-id-based Netlify URL (e.g. `https://abc123--site.netlify.app`) via `actions/github-script`
- Comment uses a hidden `<!-- netlify-preview -->` HTML marker to find and update the existing bot comment instead of posting a new one each push
- Production URL comes from the repository variable `vars.PRODUCTION_URL` (Settings → Variables → Actions)
- Production deploy on merge to `main`
- Build metadata injected at compile time: `__BRANCH__`, `__COMMIT__`, `__BUILD_TIME__`, `__ENV__`

## SEO

- `SEO` component wraps `react-helmet-async` — place it at the top of every page component
- `HelmetProvider` is mounted in `main.jsx` (outermost provider)
- Tests that render a component using `SEO` must wrap with `<HelmetProvider>` from `react-helmet-async`
- Title format: `"Page Title | Site Name"` (auto-combined in `SEO.jsx`)
- `og:image` and `twitter:image` only render when `VITE_APP_URL` is set (absolute URL required by social scrapers)
- `<html lang>` is set dynamically by `I18nProvider` via `useEffect` whenever the locale changes
- `sitemap.xml` and `robots.txt` are both **auto-generated** at build time — never create static versions in `public/`
- Plugin logic lives in `vite.plugins.js`; the core parser `parseRoutePaths(src)` is a pure function tested in `test/vite-plugins.test.js`
- Routes are parsed from `<Route path="...">` in `src/App.jsx` automatically — no manual list to maintain; supports multi-line Route declarations
- Build output verified by `test/build.integration.test.js` (runs production + preview builds, checks `dist/` files)
- Hostname priority: `VITE_APP_URL` → `URL` (Netlify's built-in) → `https://example.com`
- **Production only**: `sitemap.xml` generated + `robots.txt` with `Allow: /`
- **Preview / dev**: no `sitemap.xml`; `robots.txt` blocks all crawlers (`Disallow: /`)

## Modal / Dialog

- `src/components/Modal/` — wraps native `<dialog>` element; no provider needed
- Props: `isOpen`, `onClose`, `title` (optional), `children`
- Closes on: ✕ button, Escape key, backdrop click; locks body scroll while open
- Tests must mock `HTMLDialogElement.prototype.showModal` and `.close` — jsdom does not implement them

## Skeleton loader

- `src/components/Skeleton/` — no provider needed, import directly
- Props: `variant` (`text`|`heading`|`avatar`|`image`|`card`), `lines`, `width`, `height`
- `lines > 1` renders a stack; last line is always 70% wide for realism
- Shimmer uses `--color-skeleton-base` / `--color-skeleton-shine` tokens (light + dark mode)
- Always sets `aria-hidden="true"` — invisible to screen readers

## Cookie consent (GDPR)

- `CookieConsentProvider` + `useCookieConsent` in `src/lib/cookieConsent.jsx`; mounted in `main.jsx`
- **Disabled by default** — set `VITE_COOKIE_CONSENT=true` to show the banner (`config.cookieConsentEnabled`)
- `consent`: `'accepted'` | `'declined'` | `null`; persisted to `localStorage` key `cookie-consent`
- `hasConsented`: `true` only when explicitly accepted — gate all analytics/tracking behind this
- Tests must `vi.mock('../../config', () => ({ config: { cookieConsentEnabled: true } }))` to show the banner

## Toast notifications

- `ToastProvider` + `useToast` in `src/lib/toast.jsx`; visual component in `src/components/Toast/`
- `ToastProvider` is mounted in `main.jsx` inside `I18nProvider` — available app-wide
- API: `const { toast } = useToast()` → `toast.success/error/warning/info(message, { duration? })`
- Default durations: success/info = 4 s, warning = 5 s, error = 6 s; pass `{ duration: ms }` to override
- Toast messages are plain strings — localise at the call site with `t.keyName`
- Tests using `useToast()` must wrap with `<ToastProvider>` inside `<I18nProvider>`

## ErrorBoundary

- Class component in `src/components/ErrorBoundary/` — wraps the entire app in `main.jsx`
- Shows user-friendly fallback on any React crash
- Shows collapsible `<details>` debug block (error + componentStack) only when `version.env !== 'production'`
- Do not remove the `version.env` production guard — debug info must stay hidden in production

## BuildBadge

- Hidden in production: returns `null` and `console.info`s the build metadata instead
- Visible in preview and development environments
- Lives in `Footer` — do not move it to `PageHeader` or any other component

## Known gotchas

- `window.matchMedia` is not available in jsdom — mocked in `test/setup.js`
- `ThemeSwitcher` needs both `ThemeProvider` and `I18nProvider` in test wrappers
- `PageHeader` test wrapper must include both providers
- Components using `SEO` need `<HelmetProvider>` in their test wrappers
- `src/version.js` is auto-generated — do not modify

---

*Last updated: 2026-03-23 — scoped locale key naming convention (homeHeroTitle, etc.); AboutPage expanded with aboutLead; ContactForm + ImageDemo updated to new keys; AGENTS.md "Adding a new page" checklist rewritten*
