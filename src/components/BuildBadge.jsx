import { version } from '../version'

const ENV_COLORS = {
  production:  { bg: '#166534', text: '#bbf7d0', label: 'PROD' },
  preview:     { bg: '#92400e', text: '#fef3c7', label: 'PREVIEW' },
  development: { bg: '#1e3a5f', text: '#bfdbfe', label: 'DEV' },
}

export default function BuildBadge() {
  const colors = ENV_COLORS[version.env] ?? ENV_COLORS.development

  const styles = {
    bar: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.bg,
      color: colors.text,
      fontSize: '11px',
      fontFamily: 'monospace',
      padding: '4px 12px',
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      zIndex: 9999,
    },
    badge: {
      fontWeight: 'bold',
      border: `1px solid ${colors.text}`,
      padding: '1px 6px',
      borderRadius: '3px',
    },
  }

  return (
    <div style={styles.bar}>
      <span style={styles.badge}>{colors.label}</span>
      <span>branch: <b>{version.branch}</b></span>
      <span>commit: <b>{version.commit}</b></span>
      <span>built: <b>{version.buildTime}</b></span>
    </div>
  )
}
