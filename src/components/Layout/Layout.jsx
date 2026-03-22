import Nav    from '../Nav'
import Footer from '../Footer'
import styles  from './Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.shell}>
      <header>
        <Nav />
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
