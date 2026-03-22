# Agent Instructions

This file is read automatically by AI coding agents (OpenAI Codex, etc.).
It defines the rules and workflow for working in this repository.

---

## Project overview

Vite + React frontend deployed to Netlify via GitHub Actions.
No backend. No AI SDK inside the app — the app itself is consumed by AI agents externally.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | Inline styles (no CSS framework) |
| Tests | Vitest + jsdom + @testing-library/react |
| Deploy | Netlify (via GitHub Actions) |
| CI/CD | `.github/workflows/deploy.yml` |

## Folder structure

```
src/
  App.jsx               — root component
  version.js            — exposes build metadata (branch, commit, env, buildTime)
  components/
    BuildBadge.jsx      — UI badge showing build metadata
  config/
    index.js            — app-level config (VITE_* env vars)
test/
  setup.js              — global Vitest setup, stubs compile-time constants
  version.test.js       — unit tests for version.js
  BuildBadge.test.jsx   — component tests
public/
  logo.svg              — served at /logo.svg (no import needed)
  images/               — drop static images here, access at /images/<file>
.github/
  workflows/
    deploy.yml          — CI/CD pipeline (build + deploy only, no tests)
  hooks/
    pre-commit          — test gate script (must be installed locally)
```

## Key rules

### Before every commit — MANDATORY

**Always run tests before committing.** The CI pipeline does NOT run tests.
You are the test gate.

```sh
npm test
```

If any test fails: fix it before committing. Do not skip or bypass.

### Installing the pre-commit hook (one-time)

```sh
npm run setup-hooks
```

This copies `.github/hooks/pre-commit` into `.git/hooks/` so the test gate
runs automatically on every `git commit`.

### Modifying components

- `version.js` reads compile-time constants (`__BRANCH__`, `__COMMIT__`, etc.)
  injected by `vite.config.js` via `define`. Do not read them anywhere else.
- `test/setup.js` stubs these constants for the test environment — update it
  if you add new compile-time constants.
- Files in `public/` are served at the root path. Reference them as `/filename`,
  never import them.

### Environment variables

- `VITE_*` vars are exposed to the browser. Set them in `.env.local` for local dev.
- Never commit `.env` or `.env.local`.
- See `.env.example` for the full list.

### What NOT to do

- Do not add AI SDK packages to this project (it is used BY agents, not WITH them).
- Do not add a backend or Netlify Functions unless explicitly asked.
- Do not run `npm test` in CI — tests are a pre-commit responsibility only.
- Do not commit `coverage/`, `dist/`, or `node_modules/`.

## Commands reference

```sh
npm run dev            # local dev server (http://localhost:5173)
npm test               # run tests once
npm run test:watch     # run tests in watch mode
npm run test:coverage  # generate coverage report → coverage/
npm run build          # production build → dist/
npm run setup-hooks    # install git pre-commit hook
```
