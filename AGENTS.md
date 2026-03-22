# Agent Instructions

Rules for all AI coding agents — Claude Code, OpenAI Codex (web + CLI), and others.
To override locally without editing this file: create `AGENTS.override.md` or `CLAUDE.override.md` (both gitignored).

---

## Project overview

Vite 5 + React 18 website template with automated CI/CD. No backend, no AI SDK packages.

- **Every push** → automatic deploy to Netlify via GitHub Actions
- **Every PR** → preview deploy with URL posted as a sticky comment
- **i18n** — EN / PL / UK, switchable in the UI
- **Contact form** — Netlify Forms (blocked on preview to save quota)
- **Build metadata** — branch, commit, env, build time visible in the UI footer

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | CSS Modules + CSS custom properties (`src/styles/global.css`) |
| Tests | Vitest + jsdom + @testing-library/react |
| i18n | Custom context (`src/lib/i18n.jsx`) — EN / PL / UK |
| Deploy | Netlify via GitHub Actions |

---

## Folder structure

```
src/
  App.jsx               — composition root only, no logic
  App.module.css
  main.jsx              — entry point + providers
  version.js            — build metadata, do not modify
  components/
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
  setup.js              — Vitest global setup
  *.integration.test.jsx — integration tests only (unit tests live in component folders)
public/
  logo.svg · favicon.svg
  images/               — static images → /images/<file>
  images/placeholders/  — fallback SVGs for missing images
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
npm run build          # production build → dist/
npm run setup-hooks    # install pre-commit hook (once after clone)
```

---

## Workflow — follow this order for every change

1. Make your code changes
2. Run `npm test` — fix any failures before proceeding
3. If you changed `vite.config.js`, `main.jsx`, or any `src/styles/` file, also run `npm run build` to catch build errors
4. Commit only when all tests pass

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

`src/styles/global.css` is the single source of truth — all values live there as CSS custom properties.

1. **CSS Modules** for component styles — `ComponentName.module.css` in the component folder.
   Always use `var(--token-name)` from `global.css`. Never hardcode colors, spacing, or font sizes.
   ```css
   /* correct */
   color: var(--color-text-muted);
   padding: var(--space-md);

   /* wrong */
   color: #64748b;
   padding: 16px;
   ```

2. **Global utility classes** (defined in `global.css`) for patterns used in 3+ components — e.g. `.section-heading`.
   Use with `className="section-heading"` (no import needed).

3. **Inline styles only for truly dynamic values** — e.g. `style={{ width: progress + '%' }}`.
   State-driven variants (active/inactive) go in CSS module classes, not inline styles.

4. **No CSS frameworks** (no Tailwind, MUI, Bootstrap, styled-components, emotion).

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

## Testing

- Unit tests: co-located — `ComponentName/ComponentName.test.jsx`.
- Integration tests: `test/` folder only.
- Test behaviour, not internals. Use `@testing-library/react`.
- Never mock project modules. Mock only external I/O (fetch, localStorage).
- Update `test/setup.js` when adding compile-time constants (`__FOO__`).

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

- Hardcode colors, spacing, or font sizes — use `var(--token-name)` from `global.css`.
- Write inline styles for static values — use CSS module classes.
- Put logic (data fetching, transformations, state) in JSX — extract to a custom hook.
- Create files with more than one component.
- Put unit tests in `test/` — they belong in the component folder.
- Import from internal component paths — always import from the folder (`../MyComponent`).
- Add new locale keys to only one or two locale files — always update all three.
- Run `npm test` in CI — it runs only via the pre-commit hook.
- Modify `src/version.js` — it is auto-generated at build time.
