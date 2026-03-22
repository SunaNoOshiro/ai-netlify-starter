import { Routes, Route } from 'react-router-dom'
import { version }       from './version'
import styles            from './App.module.css'
import Layout            from './components/Layout'
import PageHeader        from './components/PageHeader'
import ImageDemo         from './components/ImageDemo'
import ContactForm       from './components/ContactForm'
import NotFound          from './components/NotFound'

console.log('[build]', version)

function Home() {
  return (
    <div className={styles.wrapper}>
      <PageHeader />
      <ImageDemo />
      <ContactForm />
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="*"  element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
