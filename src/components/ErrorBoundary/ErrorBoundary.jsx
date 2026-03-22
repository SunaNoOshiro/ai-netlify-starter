import { Component } from 'react'
import { version } from '../../version'
import styles from './ErrorBoundary.module.css'

const isProd = version.env === 'production'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, componentStack: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    this.setState({ componentStack: info.componentStack })
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.message}>
            An unexpected error occurred. Please reload the page.
          </p>
          <button className={styles.button} onClick={() => window.location.reload()}>
            Reload page
          </button>

          {!isProd && this.state.error && (
            <details className={styles.debug}>
              <summary className={styles.summary}>
                🐛 Debug info (non-production only)
              </summary>
              <pre className={styles.pre}>{String(this.state.error)}</pre>
              {this.state.componentStack && (
                <pre className={styles.pre}>{this.state.componentStack}</pre>
              )}
            </details>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
