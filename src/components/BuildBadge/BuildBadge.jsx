import { version } from '../../version'
import styles from './BuildBadge.module.css'

const ENV_LABELS = { production: 'PROD', preview: 'PREVIEW', development: 'DEV' }

export default function BuildBadge() {
  const label = ENV_LABELS[version.env] ?? 'DEV'

  if (version.env === 'production') {
    console.info(
      `[build] ${label} | branch: ${version.branch} | commit: ${version.commit} | built: ${version.buildTime}`
    )
    return null
  }

  return (
    <div className={styles.bar} data-env={version.env}>
      <span className={styles.badge}>{label}</span>
      <span>branch: <b>{version.branch}</b></span>
      <span>commit: <b>{version.commit}</b></span>
      <span>built: <b>{version.buildTime}</b></span>
    </div>
  )
}
