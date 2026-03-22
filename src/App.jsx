import { version } from './version'
import BuildBadge from './components/BuildBadge'

export default function App() {
  console.log('[build]', version)

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 600, margin: '60px auto', padding: '0 20px' }}>
      {/* Logo from public/ — referenced by root-relative path, no import needed */}
      <img src="/logo.svg" alt="logo" width={64} height={64} />

      <h1>Hello AI Project</h1>
      <p>Your production-ready starter is deployed and working.</p>

      <h3>Build Info</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          {Object.entries(version).map(([k, v]) => (
            <tr key={k} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '6px 12px 6px 0', fontWeight: 'bold', width: 120 }}>{k}</td>
              <td style={{ padding: '6px 0', fontFamily: 'monospace' }}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <BuildBadge />
    </div>
  )
}
