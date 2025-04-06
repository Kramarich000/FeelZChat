import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppWithMeta from './metadata/AppWithMeta.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithMeta />
  </StrictMode>,
)
