import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '../../lib/theme'
import { I18nProvider } from '../../lib/i18n'
import SEO from './SEO'

function renderSEO(props) {
  return render(
    <HelmetProvider>
      <ThemeProvider>
        <I18nProvider>
          <SEO {...props} />
        </I18nProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

describe('SEO', () => {
  it('renders without crashing', () => {
    expect(() => renderSEO({ title: 'Test', description: 'Test desc' })).not.toThrow()
  })

  it('renders without crashing when no props provided', () => {
    expect(() => renderSEO({})).not.toThrow()
  })
})
