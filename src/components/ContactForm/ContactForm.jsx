import { useTranslation } from '../../lib/i18n'
import { version } from '../../version'
import styles from './ContactForm.module.css'

const isProduction = version.env === 'production'

export default function ContactForm() {
  const { t } = useTranslation()

  function handleSubmit(e) {
    e.preventDefault()
    if (!isProduction) {
      alert('[preview] Form submission skipped — not counting against Netlify quota.')
      return
    }
    // Production: let the native POST go through to Netlify Forms
    e.currentTarget.submit()
  }

  return (
    <section className={styles.section}>
      <h3 className="section-heading">{t.formTitle}</h3>

      {!isProduction && (
        <p className={styles.warning}>
          ⚠ Preview mode — form submissions are blocked to save quota.
        </p>
      )}

      {/* data-netlify="true" — Netlify intercepts POST and stores submissions.
          Only fires in production. The matching hidden form in index.html
          lets Netlify detect it at build time. */}
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <input type="hidden" name="form-name" value="contact" />
        <input name="name"    type="text"  placeholder={t.formName}    required className={styles.input} />
        <input name="email"   type="email" placeholder={t.formEmail}            className={styles.input} />
        <textarea name="message"           placeholder={t.formMessage} rows={3} className={styles.textarea} />
        <button type="submit" className={styles.btn}>{t.formSend}</button>
      </form>
    </section>
  )
}
