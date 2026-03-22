import { Routes, Route } from 'react-router-dom'
import { version }        from './version'
import { useTranslation } from './lib/i18n'
import styles             from './App.module.css'
import Layout             from './components/Layout'
import SEO               from './components/SEO'
import PageHeader         from './components/PageHeader'
import ImageDemo          from './components/ImageDemo'
import ContactForm        from './components/ContactForm'
import NotFound           from './components/NotFound'
import AboutPage          from './components/AboutPage'

console.log('[build]', version)

function Home() {
  const { t } = useTranslation()
  return (
    <div className={styles.wrapper}>
      <SEO title={t.homeMetaTitle} description={t.homeMetaDesc} />
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
        <Route path="/"      element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*"      element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
