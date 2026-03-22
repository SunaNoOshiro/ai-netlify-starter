import { version } from '../../version'
import { useTranslation } from '../../lib/i18n'
import styles from './BuildInfo.module.css'

export default function BuildInfo() {
  const { t } = useTranslation()

  return (
    <section className={styles.section}>
      <h3 className="section-heading">{t.buildTitle}</h3>
      <table className={styles.table}>
        <tbody>
          {Object.entries(version).map(([k, v]) => (
            <tr key={k} className={styles.row}>
              <td className={styles.key}>{k}</td>
              <td className={styles.value}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
