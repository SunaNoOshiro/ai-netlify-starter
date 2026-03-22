# AI Netlify Starter

A ready-made website template. Fork it, connect it to two free services, and your site is live — with automatic updates every time you save changes.

[![Netlify Status](https://api.netlify.com/api/v1/badges/2a37781c-5a89-4301-b9fc-53601a4e810b/deploy-status)](https://ai-netlify-starter.netlify.app)

**Live demo:** https://ai-netlify-starter.netlify.app

---

## What you get

- **Your site is live in minutes** — no servers to manage, no hosting bills (free tier)
- **Changes go live automatically** — push a change and it deploys itself
- **Safe previews before publishing** — every draft gets its own preview link so you can check it before it goes live
- **Contact form included** — visitors can message you, submissions land in your Netlify dashboard
- **Ukrainian / English / Polish** — language switcher built in, easy to add more
- **Placeholder images** — broken images show a clean fallback instead of a broken icon

---

## How it works (no tech required)

1. You write your content and push it to GitHub (like saving to the cloud)
2. GitHub automatically builds your site and sends it to Netlify
3. Netlify puts it online — instantly

---

## One-time setup (~15 minutes)

You need two free accounts: **GitHub** (stores your code) and **Netlify** (hosts your site).

### Step 1 — Copy this template

1. Click **Use this template → Create a new repository** at the top of this page
2. Give your repository a name (e.g. `my-website`)
3. Click **Create repository**

### Step 2 — Connect Netlify

1. Go to [app.netlify.com](https://app.netlify.com) and sign up (free)
2. Click **Add new site → Import from Git**
3. Choose GitHub and select your new repository
4. Click **Deploy** — Netlify reads the settings automatically

### Step 3 — Link GitHub to Netlify

This is the one technical step. It lets GitHub trigger deploys automatically.

**Get your Netlify tokens:**

| What you need | Where to find it |
|---|---|
| **Auth token** | Netlify → top-right avatar → User settings → Personal access tokens → New token |
| **Project ID** | Netlify → your site → Site configuration → General → Project ID |

**Add them to GitHub:**

1. In your GitHub repository, go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret** and add:
   - Name: `NETLIFY_AUTH_TOKEN` — paste your auth token
   - Name: `NETLIFY_SITE_ID` — paste your project ID

That's it. Push any change and your site updates automatically.

---

## Making it your own

- **Replace the placeholder images** in `public/images/` with your own photos
- **Edit the text** in `src/locales/en.js` (and `pl.js` / `uk.js` for other languages)
- **Change colors and fonts** in `src/styles/tokens.js`
- **Add your components** in `src/components/` — each section of the page is its own folder

---

## Working locally (optional)

If you want to preview changes on your own computer before pushing:

```bash
cp .env.example .env
npm install
npm run dev        # opens http://localhost:5173
```

---

## Need help?

- **Preview not updating?** — check the Actions tab in GitHub for errors
- **Form not working?** — the contact form only accepts submissions on the live production site, not previews
- **Something broken?** — open an issue in this repository
