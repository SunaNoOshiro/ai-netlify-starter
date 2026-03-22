import { useTranslation } from '../../lib/i18n'
import SEO    from '../SEO'
import styles from './AboutPage.module.css'

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <div className={styles.wrapper}>
      <SEO title={t.aboutTitle} description={t.aboutMetaDesc} />
      <h1 className="section-heading">{t.aboutTitle}</h1>
      <p className={styles.lead}>{t.aboutLead}</p>
      <p className={styles.body}>{t.aboutBody}</p>
    </div>
  )
}
