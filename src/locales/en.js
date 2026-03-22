// Locale key naming convention:
//   <pageName><Section><Descriptor>  e.g. aboutHeroTitle, contactFormLabel
//   camelCase, always scoped to the page or feature — never generic names like "title" or "text"
//   Add every new key to en.js, pl.js, and uk.js at the same time.

const en = {
  // ── Shared / global ───────────────────────────────────────────────────────
  projectName: 'Your Project Name',

  // ── Home page ─────────────────────────────────────────────────────────────
  homeHeroTitle:    'Your Project Name',
  homeHeroSubtitle: 'Replace this page with your own content.\nCI/CD, preview deploys, and Netlify Forms are already wired up.',

  // Home page — SEO
  homeMetaTitle: 'Home',
  homeMetaDesc:  'Replace this description with your own — this text appears in Google search results.',

  // Home page — image placeholders section
  homeImagesTitle:        'Image placeholders',
  homeImageLabelFallback: 'Real image (missing → fallback)',
  homeImageLabelCard:     'Card placeholder (400×300)',

  // Home page — contact form
  homeFormTitle:   'Contact form (Netlify Forms)',
  homeFormName:    'Name',
  homeFormEmail:   'Email',
  homeFormMessage: 'Message',
  homeFormSend:    'Send',
  homeFormSuccess: 'Form submitted! (connect Netlify to see real submissions)',

  // ── About page ────────────────────────────────────────────────────────────
  aboutTitle:    'About',
  aboutLead:     'A short summary of what this project is about. Replace with your own tagline.',
  aboutBody:     'Replace this page with your own content. Describe your project, your team, or your story.',

  // About page — SEO
  aboutMetaDesc: 'Learn more about this project.',

  // ── Nav ───────────────────────────────────────────────────────────────────
  navHome:  'Home',
  navAbout: 'About',

  // ── Footer ────────────────────────────────────────────────────────────────
  footerCopyright: '© {year} Your Project Name',

  // ── 404 page ──────────────────────────────────────────────────────────────
  notFoundTitle:   'Page not found',
  notFoundMessage: 'The page you are looking for does not exist.',
  notFoundHome:    'Go back home',

  // ── Theme switcher ────────────────────────────────────────────────────────
  themeSwitchToDark:  'Switch to dark mode',
  themeSwitchToLight: 'Switch to light mode',
  themeSwitchToAuto:  'Switch to system mode',

  // ── Modal ─────────────────────────────────────────────────────────────────
  modalClose: 'Close',

  // ── Toast notifications ───────────────────────────────────────────────────
  toastDismiss: 'Dismiss notification',

  // ── Cookie consent banner ─────────────────────────────────────────────────
  cookieBannerLabel:   'Cookie consent',
  cookieBannerMessage: 'We use cookies to improve your experience. You can accept or decline non-essential cookies.',
  cookieBannerAccept:  'Accept',
  cookieBannerDecline: 'Decline',
}

export default en
