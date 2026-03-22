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
- Build output verified by `test/build.integration.test.js` (runs `npm run build`, checks `dist/` files)
- Both files use `hostname` from `VITE_APP_URL` (fallback: `https://example.com`)

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

*Last updated: 2026-03-22 — SEO complete: html[lang], og:image+twitter:card, robots.txt+sitemap auto-generated from App.jsx routes; unit + build integration tests added*
