import styles from './Skeleton.module.css'

/**
 * Skeleton loader — use while async data is loading.
 *
 * @param {'text'|'heading'|'avatar'|'image'|'card'} variant
 * @param {number}  lines   — repeat N lines (last line is 70% wide)
 * @param {string}  width   — override width  (CSS value)
 * @param {string}  height  — override height (CSS value)
 */
export default function Skeleton({ variant = 'text', lines = 1, width, height }) {
  if (lines > 1) {
    return (
      <div className={styles.stack}>
        {Array.from({ length: lines }, (_, i) => (
          <Skeleton
            key={i}
            variant={variant}
            width={i === lines - 1 ? '70%' : width}
            height={height}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`${styles.skeleton} ${styles[variant]}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}
