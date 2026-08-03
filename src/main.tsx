import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'modern-normalize/modern-normalize.css'
import './index.css'

const App = () => (
  <main>
    <h1>04-react-query</h1>
    <p>Application ready for development.</p>
  </main>
)

const container = document.getElementById('app')
if (!container) {
  throw new Error('Root element not found')
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
