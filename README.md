# AI Netlify Starter

Production-ready Vite + React starter with automated CI/CD on GitHub + Netlify (free tier).

[![Netlify Status](https://api.netlify.com/api/v1/badges/2a37781c-5a89-4301-b9fc-53601a4e810b/deploy-status)](https://ai-netlify-starter.netlify.app)

**Production:** https://ai-netlify-starter.netlify.app

---

## Architecture

```
GitHub Push / PR
       │
       ▼
GitHub Actions (.github/workflows/deploy.yml)
  1. npm ci
  2. Inject build metadata as VITE_* env vars
  3. npm run build  ←── vite.config.js embeds metadata as compile-time constants
  4. Deploy to Netlify via nwtgck/actions-netlify
       │
       ├── PR?  → Deploy Preview URL  → sticky PR comment
       └── main → Production deploy
```

**Build metadata flow:**

```
GitHub Actions env            vite.config.js define          Runtime (browser)
─────────────────────         ───────────────────────────    ──────────────────
VITE_BRANCH=feat/foo    →     __BRANCH__ = "feat/foo"    →   version.branch
VITE_COMMIT=abc1234     →     __COMMIT__ = "abc1234"     →   version.commit
VITE_BUILD_TIME=...     →     __BUILD_TIME__ = "..."     →   version.buildTime
VITE_ENV=preview        →     __ENV__ = "preview"        →   version.env
```

---

## Project Structure

```
ai-netlify-starter/
├── .github/
│   ├── hooks/
│   │   └── pre-commit          ← test gate hook (install with: npm run setup-hooks)
│   └── workflows/
│       └── deploy.yml          ← CI/CD pipeline
├── public/
│   ├── logo.svg                ← served at /logo.svg
│   └── images/                 ← static images served at /images/<file>
├── src/
│   ├── components/
│   │   └── BuildBadge.jsx      ← footer showing env/branch/commit
│   ├── config/
│   │   └── index.js            ← app config from env vars
│   ├── App.jsx
│   ├── main.jsx
│   └── version.js              ← build metadata accessor
├── test/
│   ├── setup.js                ← vitest global setup
│   ├── version.test.js
│   └── BuildBadge.test.jsx
├── AGENTS.md                   ← instructions for Codex / AI agents
├── .env.example
├── .gitignore
├── index.html
├── netlify.toml
├── package.json
└── vite.config.js
```

---

## Setup

### 1. GitHub

```bash
git clone <your-fork>
cd ai-netlify-starter
npm install
```

### 2. Netlify

**Option A — Netlify UI (recommended for first-time)**

1. Go to app.netlify.com → **Add new site** → **Import from Git**
2. Select your GitHub repo
3. Build settings are read from `netlify.toml` automatically
4. Click **Deploy site**
5. Copy your **Site ID** from **Site settings → General → Site details**

**Option B — CLI**

```bash
npm install -g netlify-cli
netlify login
netlify init          # links repo, creates site
netlify sites:list    # get your Project ID (used as NETLIFY_SITE_ID)
```

### 3. GitHub Secrets

In your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Where to find it |
|---|---|
| `NETLIFY_AUTH_TOKEN` | Netlify → User settings → Personal access tokens |
| `NETLIFY_SITE_ID` | Netlify → Project configuration → General → **Project ID** (also shown as "Site ID") |

---

## CI/CD Flows

### PR → Preview

```
git checkout -b feat/my-feature
# make changes
git push origin feat/my-feature
# open PR on GitHub
#   → Actions builds & deploys preview
#   → Bot comments: 🚀 https://deploy-preview-42--yoursite.netlify.app
#   → Every new push to the PR updates the same comment
```

### Merge → Production

```
# Merge PR to main on GitHub
#   → Actions triggers on push to main
#   → production-deploy: true  →  deploys to https://yoursite.netlify.app
```

---

## Local Development

```bash
cp .env.example .env     # set VITE_APP_NAME if needed
npm run setup-hooks      # install pre-commit test gate (one-time)
npm run dev              # http://localhost:5173
```

The `BuildBadge` footer will show `branch: local`, `commit: dev`, `env: development`.

---

## Optional Improvements

### Multi-environment (dev / staging / prod)

Add to `netlify.toml`:

```toml
[context.staging.environment]
  VITE_ENV = "staging"
```

Create a `staging` branch — Netlify treats it as a branch deploy with its own URL.

### Monorepo

```
apps/
  web/          ← this starter
  api/          ← separate backend
packages/
  shared/       ← shared types / utils
```

Use Turborepo with `turbo.json` to share the build cache.

### Rollbacks

In Netlify UI: **Deploys → click any past deploy → Publish deploy**

Or via CLI:

```bash
netlify deploy --prod --dir=dist    # re-deploy any local build
```
